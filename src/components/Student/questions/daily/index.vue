<template>
 
  <div>
      <div class="container-fluid p-5" v-if="question">
        <div class="row d-flex justify-content-center my-2" id="tooltip-target-1">
           
            <b-button id="tooltip-question" variant="white">
                 <h1>{{ data.question }}</h1>
            </b-button>
            
        </div>
        <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="!select">
            <strong>No selecciono una respuesta</strong>, por favor seleccione una alternativa.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="row d-flex justify-content-center my-2">
            <div class="col-md-6 col-sm-12  d-flex justify-content-center" v-for="(res,index) in data.answer" :key="index">
                <input type="radio" :id=res :value=res v-model="picked" />
                <label  :class="[{'active': picked === res}, 'text-center', 'answer']" :for=res ><b-button id="tooltip-res" variant="white">{{res}} </b-button></label>
                <b-tooltip target="tooltip-res"   :show="isShowToll" >
                        Click aqui!
                </b-tooltip>
            </div>   
        </div>
        <div class="row d-flex justify-content-center mt-4">
            <button class="btn-send" @click="check()">
                 <i class="fas fa-check-circle" ></i> 
            </button>
        </div>  
      </div>
      <div class="container-fluid p-5" v-else>
          <div class="row d-flex justify-content-center my-2">
              <i class="far fa-smile-wink happy" v-if="isCorrect"></i>
              <h1 class="text-center g" v-if="isCorrect">Felicidades, respuesta correcta</h1>

              <i class="far fa-frown sad" v-if="!isCorrect"></i>
              <h1 class="text-center" v-if="!isCorrect" >Buen intento, puede intentarlo de nuevo el día siguiente</h1>
              <span class="mt-4" v-if="!isCorrect">La respuesta correcta es: {{ data.correctAnswer }}</span>
          </div>
      </div>
        <div class="guide">
        </div>
        <b-tooltip target="tooltip-question"  placement="topright" :show="isShowToll" >
                Responder preguntas te hará ganar puntos.
            </b-tooltip>
     
        <!-- <h1 style="background: black; position: absolute; opacity: 100%; color: white" >Hola soy la guía</h1> -->
  </div>
</template>

<script>
export default {
    name: "QuestionDaily",
    data() {
        return {
            isShowToll: false,
            question: true,
            isCorrect: false,
            select: true,
            data:{
                question:"",
                answer:[],
                correctAnswer: ""
            },
            picked:""
        };
    },
    methods: {
        getQuestion(){
            let array;
            this.axios.get(`course/exam/daily`).then((res)=>{
                this.data.question=res.data[0].question
                this.data.correctAnswer=res.data[0].correctAnswer
                array = res.data[0].incorrectAnswers.concat(res.data[0].correctAnswer);
                this.data.answer =array.sort(()=>{return Math.random()-0.5})
            });
        },

        check(){
            if(this.picked===''){
                this.select = false
            }else{
                if(this.picked===this.data.correctAnswer){
                    this.isCorrect = true;
                }else{
                    this.isCorrect = false;
                }
                this.question=false;
            }
        },
        setToll(){

            const item = localStorage.getItem('item') || 0

            if( item == 0) {
                localStorage.setItem('item', 1)
                console.log('Mostrar una unica vez al ingresar');
            }else{
                return
            }
            
        }

    },
    created(){
        this.getQuestion()
        this.setToll() 
    },
}
</script>

<style scoped>
input[type="radio"]{
    display: none;
}
label{
    border-radius: 1rem;
    background: rgba(221, 221, 221, 0.287);
    width: 70%;
    height: 100%;
    cursor: pointer;
    transition: 1s;
}
.answer{
    font-size: 1.4rem;
}
label:hover{
    background: rgba(77, 170, 0, 0.342);
}
.active{
    background: #78ff66;
    color: #ffff;
    font-weight: bolder;
}
.btn-send{
    color: #35424A;
    border: none;
    font-size: 3rem;
    transition: 1s;
}

.btn-send:hover{
    color: #78ff6691;
}

.sad{
    font-size: 10rem;
    margin-bottom: 15px;
    color: rgba(243, 109, 109, 0.424);
}

.happy{
    font-size: 10rem;
    margin-bottom: 15px;
    color: rgba(101, 207, 39, 0.424);
}
.g{
    width: 100%;
}
.guide {
  position: fixed;
  background: rgb(189, 189, 189);
  opacity: 10%;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1050;
  overflow: auto;
}

@media(max-width: 780px) {
    h1{
        font-size: 20px;
    }
}

</style>