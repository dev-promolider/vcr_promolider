<template>
    <div style="height: 100%; background: white;">
        <div v-if="isLoadingQuestions" class="text-center" style="margin-top: 100px">
            <b-spinner type="grow" label="Spinning"></b-spinner>
        </div>

        <div v-else>
  
                    <Transition name="bounce">
                        <div v-if="mostrar" class="caja-texto" :class="[ this.respExam.message.toLowerCase() === 'aprobado' ? 'success-texto' : 'danger-texto'] ">
                            <p class="texto" style="margin-bottom: 0px;" >
                                <strong  style="font-size: 18px" >

                                    <div><i :class="[  this.respExam.message.toLowerCase() === 'aprobado' ? 'fas fa-smile': 'fas fa-frown']" style="font-size: 55px; padding-bottom: 1rem "></i></div>

                                    {{ this.respExam.message.toLowerCase() === 'aprobado' ? `¡Felicitaciones!`  : '' }} 
                                    <div> Ústed ah {{this.respExam.message.toLowerCase()}} y
                                    ha conseguido {{this.respExam.score}} puntos.
                                    </div>
                                </strong>
                            </p>
                        </div>
                    </Transition>
                        <div class="wrapper-stepper"  v-if="mostrar === false">
                            <div class="stepper">
                                <div class="stepper-progress">
                                    <div class="stepper-progress-bar" :style="'width:' + stepperProgress "></div>
                                </div>

                                <div class="stepper-item" :class="{ 'current': step == index , 'success': step > index  }" v-for="(question , index ) in questions" :key="index">
                                    <div class="stepper-item-counter">
                                        <img class="icon-success" src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png" alt="">
                                        <span class="number">
                                            {{ index + 1}}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="stepper-content" v-for="(question, index ) in questions" :key="index">
                                <div class="stepper-pane" v-if="step  == index ">
                                        <div class="contenedor">
                                            <div></div>
                                            <div class="title-question">
                                                {{question.title}} 
                                            </div>
                                            <div class="puntos">
                                                5 Pts.
                                            </div>
                                        </div>
                                
                                        <div v-for="(q , i) in question.options" :key="i" >
                                        

                                            <div class="options-questions"  v-if="question.question_type_id == 1 ">
                                                <input :id="q" type="radio" class="input-opciones" :checked="checked" @click="selectOption" :value="i" v-model="form[index].option">
                                                <label :for="q" class="opciones" > {{q}} </label>
                                            </div>

                                            <div class="options-questions"  v-else-if="question.question_type_id  == 3 ">
                                                <input :id="q" type="radio" class="input-opciones" :checked="checked" @click="selectOption" :value="i === 0 ? true : false " v-model="form[index].option">
                                                <label :for="q" class="opciones" > {{q}} </label>
                                            </div>

                                            <div v-else-if="question.question_type_id  == 4"  class="textarea">
                                            <textarea placeholder="Responda aquí..." maxlength="200" cols="50" rows="10" class="opciones " v-model.trim="form[index].option">  </textarea>
                                            
                                            </div>
                                            <div class="options-questions" v-else>
                                                    <input type="checkbox" :id="q"  :value="i" v-model="form[index].option">
                                                    <label class="opciones" :for="q" >{{q}}</label>
                                            </div>
                                        </div>
                                </div>
                            </div>
                                <div v-if="step === Object.keys(this.questions).length" class="sendAnswers stepper-pane ">
                                    Has llegado al final del examén, si está seguro de sus respuestas seleccione enviar.
                                </div>

                            <div class="controls">
                                <button class="btn " @click="sustractStep" :disabled="step == 0">
                                    Anterior
                                </button>
                                <button class="btn btn--green-1" @click="addStep" :disabled="isDisabled" v-if="step !== Object.keys(questions).length" >
                                    Siguiente
                                </button>
                                
                                <button  class="btn btn--green-1 open" @click="sendAnswers" v-else >
                                    Enviar
                                </button>

                            </div>     
                        
                        </div>
            
            

        </div>   

      </div> 

</template>

<script >
import { mapActions, mapMutations } from 'vuex'
export default {
    data(){
        return {
            step: 0,
            questions: [],
            options: [],
            form:  [ ] ,
            isDisabled: true,
            checked: true,
            exam_id:this.$route.params.id,
            respExam: null,
            mostrar: false,
            isLoadingQuestions: true
        }
    },
    computed:{
        stepperProgress() {
            return ( 100 / Object.keys(this.questions).length ) * ( (this.step + 1 ) - 1 ) + '%'
        }
    },
    methods:{
        ...mapMutations('course', [ 'sumPoints' ]),
        ...mapActions('course',{
            getExam: 'getExam'
        }),

        async setExam(){
            const resp_exam = await this.getExam(this.$route.params.id)
            if(resp_exam.status === 200){
                const {  questions } = resp_exam.data.data
                this.questions = questions
                this.splitQuestions( questions )
                this.isLoadingQuestions = false
            }

        },
        splitQuestions( questions ){
            
            questions.forEach(  e => {
                this.form.push({ option : [] })
                return e
            });
            
        },
        addStep(){
            
            if( this.form[this.step].option.length <= 0 ){
                this.isDisabled = false
                return false
            }else{
                this.step++
            }
        },
        sustractStep(){
            this.checked ? this.isDisabled = false : this.isDisabled = true
            this.step--
        },
        selectOption(){
            this.isDisabled = false
        },
        sendAnswers(){
            
              if( this.form.length < this.options.length ){
                return false
             }else{
                this.axios.post('course/exam/answers',{
                    "id_exam": this.exam_id,
                    "answers":this.form})
                .then( resp =>{
                    console.log(resp.data);
                    this.mostrar = true
                    this.respExam = resp.data
                    this.sumPoints(resp.data.score);
                })
             }
           
        }
        
    },
    created(){
        this.setExam()
        //Validación si tiene comprado el curso
    }

}
</script>

<style lang="scss" scoped>
$default    :   #C5C5C5;
$green-1    :   #65DA3C;
$green-2    :   #65DA3C;
$green-3    :   #dfffe0 ;
$black-2    :   #0a1012;
$black-1    :    #000000;
$red-1    :    #e7837c;
$transiton  :   all 500ms ease;
$font-anksans-regular : fon;
    
.sendAnswers{
    padding: 35px 15% !important;
    font-weight: 600;
    text-align: center;
    font-size: 17px;
    color: $black-1;
    height: 200px;
}
.opciones{
    text-align: left;
    margin-left: 10px !important;
}
.contenedor{
    display: grid;
    grid-template-columns: 20% 60% 20%;
    align-items: center;
    margin-bottom: 2.5rem;
    margin-top: 50px;
}

.puntos{
    font-weight: bold;
    font-size: 16px;
}

.title-question{
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    padding: 0 auto;
}
.options-questions{
    
    margin-bottom: 10px;
}
label{
    margin: 0 !important;
    padding: 0 ;
}
.tx-green-1{
    color:  $green-1;
    font-weight: 600;
}

.wrapper-stepper{
    background-color: #fff;
    padding: 70px 10%;
    box-shadow: rgba($color: #000000, $alpha: 0.09);
}

.stepper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 0;
    margin-bottom: 24px;

    &-progress{
        position: absolute;
        background-color: $default;
        height: 2px;
        z-index: -1;
        left: 0;
        right: 0;
        margin: 0 auto;

        &-bar{
            position: absolute;
            left: 0;
            height: 100%;
            width: 0%;
            background-color: $green-1;
            transition: $transiton;
        }
    }
}

.stepper-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $default;
    transition: $transiton;

    &-counter{
        height: 30px;
        width: 30px;
        display: grid;
        place-items: center;
        background-color: #fff;
        border-radius: 100%;
        border: 2px solid $default;
        position: relative;

        .icon-success{
            position: absolute;
            opacity: 0;
            transform: scale(0);
            width: 14px;
            transition: $transiton;
        }

        .number{
            font-size: 15px;
            transition: $transiton;
        }
    }

    &-title{
        position: absolute;
        font-size: 14px;
        bottom: -24px;
    }
}
.stepper-item.success{
    .stepper-item-counter{
        border-color: $green-1;
        background-color: $green-3 ;
        color: #fff;
        font-weight: 600;

        .icon-success{
            opacity: 1;
            transform: scale(1);
        }

        .number{
            opacity: 0;
            transform: scale(0);
        }
    }

    .stepper-item-title{
        color: $green-1;
    }
}
//items-title - Paso 1 - Paso 2 - Paso 3
.stepper-item.current{
    .stepper-item-counter{
        border-color: $green-1;
        background-color: $green-1;
        color: #fff;
        font-weight: 600;
    }

    .stepper-item-title{
        color: #818181;
    }
}
//Panel donde se muestra el contenido
.stepper-pane{
    color: rgb(0, 0, 0);
    text-align: center;
    
    padding: 5px 15px 50px 14px;
    box-shadow: 0 8px 12px rgba($color: #000000, $alpha: 0.09);
    margin: 100px 15%;
}

//Separación de los botones
.controls{
    
    display: flex;
}

//Botones 
.btn{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 15px;
    border: 1px solid;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    line-height: 1.5;
    transition: all 150ms;
    border-radius: 4px;
    width: fit-content;
    font-size: 16px;
    font-weight: 500;
    color: rgb(255, 255, 255);
    background-color: $green-2;
    border-color: $green-2;

    &:hover{
        color: #fff;
    }

    &:disabled{
        opacity: 0.5;
        pointer-events: none;
    }

    &--green-1{
        margin-left: auto;
    }
}
   
input[type="checkbox"] {
     position: initial;
     height: 40px;
     
}
.options-questions input[type="radio"], input[type="checkbox"] {
     display: none;
     
}
.options-questions label{
    color: #ffffff;
    background: $green-1;
    padding: 5px 40px; 
    display: inline-block;
    position: relative;
    font-size: 1.1rem;
    border-radius: 16px;
    cursor: pointer;
}
.options-questions label:hover{
    background: $green-2;
}
.options-questions label::before{
    content: "";
    width: 17px;
    height: 17px;
    display: inline-block;
    background: none;
    border: 3px solid white;
    border-radius: 50%;
    position: absolute;
    left: 17px;
    top: 8px;
}
.options-questions input[type=radio]:checked + label, 
.options-questions input[type=checkbox]:checked  + label{
        padding: 5px 40px; 
        background: #3bc023;
        border-radius: 16px;
        color: #fff;
}
.options-questions input[type=radio]:checked + label:before, 
.options-questions input[type=checkbox]:checked  + label:before{
     display: none;
     border-radius: 16px;
}
textarea{
    color: #000000;
    border-radius: 5px; 
    border: 1px solid rgb(63, 63, 63) !important;
    height: 120px;
    padding: 5px 10px;
}



@media (max-width: 1200px){
    .title-question{
        font-size: 17px;
    }
    .puntos{
        font-size: 15px;
    }
    .wrapper-stepper{
        padding: 10% 3%;
    }
    .stepper-pane{
        margin:  50px 15px 30px;
    }
}
.caja-texto{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 200px;
    padding: 0 5px;
    margin: 50px auto;
    min-width: 100px;
    max-width: 440px;
}
.success-texto{

    background: $green-2;
}
.danger-texto{
    background: $red-1;
}

/*************** Animation message*/
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>