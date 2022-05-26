<template>
 <div>
     <div class="wrapper-stepper" >
        <div class="stepper">
            <div class="stepper-progress">
                <div class="stepper-progress-bar" :style="'width:' + stepperProgress "></div>
            </div>

            <div class="stepper-item" :class="{ 'current': step == index, 'success': step > index }" v-for="(question , index ) in questions" :key="index">
                <div class="stepper-item-counter">
                    <img class="icon-success" src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png" alt="">
                    <span class="number">
                        {{ index + 1}}
                    </span>
                </div>
            </div>
        </div>

        <div class="stepper-content" v-for="(question, index ) in questions" :key="index">
            <div class="stepper-pane" v-if="step == index">
                <div class="title-question mb-5">{{question.title}}</div>
               
                     <div v-for="(q , i) in question.options" :key="i" >
                         <div class="options-questions"  v-if="question.type == 1 ">
                           <input :id="q" type="radio" class="input-opciones" :checked="checked" @click="selectOption" :value="i" v-model="form[index].option">
                           <label :for="q" class="opciones" > {{q}} </label>
                         </div>
                         <div class="options-questions"  v-else-if="question.type == 3 ">
                           <input :id="q" type="radio" class="input-opciones" :checked="checked" @click="selectOption" :value="i === 0 ? true : false " v-model="form[index].option">
                           <label :for="q" class="opciones" > {{q}} </label>
                         </div>
                         <div v-else-if="question.typer == 4"  class="textarea">
                           <textarea placeholder="Responda aquí..." maxlength="200" cols="50" rows="10" class="opciones " v-model.trim="form[index].option">  </textarea>
                          
                         </div>
                         <div class="options-questions" v-else>
                                <input type="checkbox" :id="q"  :value="i" v-model="form[index].option">
                                <label class="opciones" :for="q" >{{q}}</label>
                         </div>
                    </div>
            </div>
        </div>

        <div class="controls">
            <button class="btn " @click="sustractStep" :disabled="step == 0">
                Anterior
            </button>
            <button class="btn btn--green-1" @click="addStep" :disabled="isDisabled" v-if="step != Object.keys(questions).length - 1" >
                Siguiente
            </button>
            <button  class="btn btn--green-1 open" @click="sendAnswers" v-else >
                Enviar
            </button>
        </div>     
     
    </div>



            <div v-if="this.mostrar">
                <div class="caja-texto">
                    <p class="texto" style="margin-bottom: 0px;">
                    <strong>
                    Usted ah {{this.respExam.message}} y logro obtener {{this.respExam.score}} Puntos
                    </strong>
                    </p>
                </div>
            </div>
      </div> 

  
</template>

<script >
import { mapActions } from 'vuex'
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
            respExam:null,
            mostrar:null,
        }
    },
    computed:{
        stepperProgress() {
            return ( 100 / Object.keys(this.questions).length ) * ( this.step - 1 ) + '%'
        }
    },
    methods:{
        ...mapActions('course',{
            getExam: 'getExam'
        }),

        async setExam(){
            const resp_exam = await this.getExam(this.$route.params.id)
            const {  questions } = resp_exam.data.data
            this.questions = questions
            this.splitQuestions( questions )
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
              if( this.form[this.step].option.length <= 0 ){
                return false
            }else{
                let resp = true
                if( resp ){
                    console.log('send Answers', this.form);
                   
                }
            }
           
           this.axios.post('course/exam/answers',{
            "id_exam": this.exam_id,
            "answer":this.form})
           .then( resp =>{
               console.log(resp.data);
               this.mostrar = true
                this.respExam = resp.data
           })
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
$green-1    :   #68b46e;
$transiton  :   all 500ms ease;

.opciones{
    text-align: left;
    margin-left: 10px !important;
}
.title-question{
    font-weight: bold;
    font-size: 18px;
}
.options-questions{
    display: flex;
    align-items: center;
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
    padding: 30px;
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
        background-color: #c8ebc1;
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
    padding: 5px 60px 50px;
    box-shadow: 0 8px 12px rgba($color: #000000, $alpha: 0.09);
    margin: 30px 0;
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
    padding: 6px 16px;
    border: 1px solid;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    line-height: 1.5;
    transition: all 150ms;
    border-radius: 4px;
    width: fit-content;
    font-size: 0.75rem;
    color: #333;
    background-color: #e2e2e2;
    border-color: #bedcff;

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
    background: #75CC65;
    padding: 5px 15px 5px 51px; 
    display: inline-block;
    position: relative;
    font-size: 1em;
    border-radius: 3px;
    cursor: pointer;
}
.options-questions label:hover{
    background: #66bd57;
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
        padding: 5px 15px ;
        background: #3bc023;
        border-radius: 2px;
        color: #fff;
}
.options-questions input[type=radio]:checked + label:before, 
.options-questions input[type=checkbox]:checked  + label:before{
     display: none;
}
textarea{
    color: #000000;
    border-radius: 5px; 
    border: 1px solid rgb(63, 63, 63) !important;
    height: 120px;
    padding: 5px 10px;
}



@media (max-width: 780px){
    .title-question{
        font-size: 16px;
        padding-bottom: 20px;
    }
    .stepper-pane{
        padding: 20px 25px;
    }
}
.caja-texto{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 50px;
    background: rgb(52, 149, 60);
    margin: auto;
    border-radius: 15px;
}
</style>