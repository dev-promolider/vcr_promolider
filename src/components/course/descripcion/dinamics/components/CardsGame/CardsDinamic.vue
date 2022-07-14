<template>
  <div>
      <template  v-if="!loadingCardGame">
            <template v-if="!isGameFinish">
                <div class="title-cards">
                    Juego de Cartas
                </div>
                <div class="d-flex flex-row justify-content-center py-1">
                    <div class="turns p-3"><span class="btn btn-cards">Turnos : <span class="badge" :class="finish ? 'badge-cards' : 'badge-light'">{{turns}}</span> </span></div>
                    <div class="totalTime p-3"><span class="btn btn-cards">Tiempo Total : <span class="badge" :class="finish ? 'badge-cards' : 'badge-light'">{{min}} : {{sec}}</span></span></div>
                </div>
                <div class="contenedor-cards">
                    <div  :key="index" v-for="(card, index) in memoryCards" class=" flip-container" :class="{ 'flipped': card.isFlipped, 'matched' : card.isMatched }" @click="flipCard(card)">
                            <div class="memorycard" style="position: relative">
                                        <div class="front border rounded shadow item"><i class="fas fa-question"></i></div>
                                        <div class="back rounded border item">
                                            <img width="130px"  height="100%" :src="card.img" :alt="card.alt" srcset="">
                                        </div>
                            </div>
                    </div>
                </div>
                <div class="botton-start">
                            <button class="btn btn-cards mx-2" @click="_gettingStart" :disabled="isActiveReady"  >
                                Empezar
                            </button>
                            <button class="btn btn-dark" @click="resetGame"   >
                                Reiniciar
                            </button>
                </div>
            </template>
               <Transition name="bounce" >
                    <template v-if="isGameFinish">
                                    <template >
                                            <v-card elevation="10" color="success" class="m-auto mt-10 text-center fade-in" width="500px">
                                                <v-icon class="ma-5" size="100" color="white" icon>mdi-check-circle-outline</v-icon>
                                                <v-card-text class="text-h3 font-weight-bold white--text">Ganaste <span v-if="sumPoint" >{{sumPoint}}</span> <v-progress-circular v-if="!sumPoint" indeterminate ></v-progress-circular> puntos</v-card-text>
                                                <v-row align="center" justify="center">
                                                    <v-card-actions>
                                                    <v-btn color="black" class="white--text" @click="comeBack">
                                                        Regresar
                                                    </v-btn>
                                                    </v-card-actions>
                                                </v-row>
                                            </v-card>
                                    </template>

                    </template>
                </Transition>
        </template>
        
        <template v-else >
                    <div class="text-center mt-5" >
                        <v-progress-circular indeterminate color="success" size="52">

                        </v-progress-circular>
                    </div>
        </template>

  </div>



</template>

<script>
import Vue from 'vue';
import _ from 'lodash'
import { mapActions, mapState } from 'vuex';
export default {
    data(){
        return {
            cards: [],
            isGameFinish: false,
            isActiveReady: false,
            gettingStart: false,
            memoryCards:[],
            flippedCards: [],
            finish: false,
            turns: 0,
            totalTime: {
                minutes: 0,
                seconds: 0,
            },
            loadingCardGame: true,
            data: {},
            productor_id: null,
            course_game_id: this.$route.params.id
        }
    },
    computed:{
        ...mapState('course', ['sumPoints']),
        sumPoint(){
            return this.sumPoints
        },

        sec(){
            if(this.totalTime.seconds < 10){
                return '0'+this.totalTime.seconds;
            }
            return this.totalTime.seconds;
        },
        min(){
            if(this.totalTime.minutes < 10){
                return '0'+this.totalTime.minutes;
            }
            return this.totalTime.minutes;
        }
    },
    async created(){
        await this.createCards(  )
        /*Settear en el arreglo cartas las variables voltear y igualdad de cartas en estado false*/
        this.cards.forEach((card) => {
            Vue.set(card,'isFlipped',false);
            Vue.set(card,'isMatched',false);
        });

        /*Clonar y combinar cartas*/ 
       this.memoryCards = _.shuffle(this.memoryCards.concat(_.cloneDeep(this.cards), _.cloneDeep(this.cards)));

       this.getActiveCourse(  )
    },

    methods:{
        ...mapActions('course', ['getDataDinamic', 'sendAnswersCards', 'getCourseActive']),
        comeBack(){
            this.$router.back()
        },
        async getActiveCourse(){
           const {data} = await this.getCourseActive(this.$route.query.c)
           this.productor_id =  data[0].user_id
        },
        /*Crear cartas*/
        async createCards(){
          const {ok , data} = await this.getDataDinamic( +this.$route.params.id)
          
          if(!ok) return

            this.data = data 

            let numeroCartas = this.data.detail.length  
              
            let detailGame = this.data.detail

            for (let i = 0; i < numeroCartas; i++) {
              this.cards.push( { img: detailGame[i].img, alt: detailGame[i].name, name: i} )
            }
            this.loadingCardGame = false
        },
        /*Voltear Carta*/
        flipCard( card ){

                if( this.gettingStart ){

                    
                    if(card.isMatched || card.isFlipped || this.flippedCards.length === 2)
                        return;
                    if(!this.start){
                        
                        this._startGame();
                    }
                        
                    card.isFlipped = true;

                    if(this.flippedCards.length < 2)
                        this.flippedCards.push(card)
                    if(this.flippedCards.length === 2)    
                        this._match(card)

                }

        },
         /*Verificar igualdad*/
        _match(  ){
                 this.turns++;
                 if(this.flippedCards[0].name === this.flippedCards[1].name){
                     setTimeout(() => {

                        this.flippedCards.forEach(card => card.isMatched = true);
                        this.flippedCards = [];

                        if(this.memoryCards.every(card => card.isMatched === true)){
                            this.finish = true;
                            clearInterval(this.interval);
                            this.sendAnswersCards( { tiempo: this.totalTime , game_type:  'cartas', productor_id : this.productor_id, course_game_id: this.course_game_id } ) 
                            this.isGameFinish = true
                            this.totalTime =  {minutes: 0,seconds: 0}
                            this.turns = 0
                        }

                    }, 400);
                }
                else{
                    setTimeout(() => {
                        this.flippedCards.forEach((card) => {card.isFlipped = false});
                        this.flippedCards = [];
                    }, 800);
                }
        },
        /*Empezar Juego*/
        _startGame(){
            this._tick();
            this.interval = setInterval(this._tick,1000);
            this.start = true;
            this.isActiveReady = true
        },
        /*Calcular Tiempo*/ 
        _tick(){
            if(this.totalTime.seconds !== 59){
                this.totalTime.seconds++;
                return
            }

            this.totalTime.minutes++;
            this.totalTime.seconds = 0;
        },
        /*Boton empezar*/ 
        _gettingStart(){
            this.gettingStart = true
            this._startGame()
        },
        /*Reiniciar el juego*/ 
        resetGame(){
            clearInterval(this.interval);

            this.cards.forEach((card) => {
                Vue.set(card, 'isFlipped',false);
                Vue.set(card, 'isMatched',false);
            });

            setTimeout(() => {  
                this.memoryCards = [];
                this.memoryCards = _.shuffle(this.memoryCards.concat(_.cloneDeep(this.cards), _.cloneDeep(this.cards)));
                this.totalTime.minutes = 0;
                this.totalTime.seconds = 0;
                this.start = false;
                this.finish = false;
                this.turns = 0;
                this.flippedCards = [];
                this.isActiveReady = false
                }, 600);
            
        },
        sendAnswers( value ){
            this.sendAnswersData( value )
        }
    }
}
</script>

<style scoped>
    .btn-cards{
        background: var(--bg-btn);
    }
    .btn-cards:hover{
        background: #4cac40;
    }
    .turns{
        color: var(--sixth-color-green)
    }
    .totalTime{
        color: var(--sixth-color-green);
    }
    .botton-start{
        display: flex;
        justify-content: center;
        padding-top: 2%;
    }
    .matched{
    opacity: 0.3;
    }
    .title-cards{
        padding-top: 15px;
        font-size: 35px;
        color: var(--sixth-color-green);
        text-align: center;
    }
    .contenedor-cards{
        display: grid;
        grid-template-columns:  repeat( 4 , 1fr);
        grid-gap: 10px;
        margin: 0 25%;
    }
    .item{
        background: rgb(22, 22, 22);
        color: white;
        cursor: pointer;
        max-width: 150px;
        height: 150px;
    }
    @media (max-width: 1262px) {
        .contenedor-cards{
            grid-template-columns: repeat(4 , 1fr);
            grid-gap: 15px;
            margin: 0 10%;
        }
        .item{
            min-width: 50px;
        }
    }


    @media (max-width: 479px) {
        .contenedor-cards{
            grid-template-columns: repeat(3 , 1fr);
            margin: 0;
            grid-gap: 8px;
            margin: 0 15px;
        }
        .item{
            height: 100px;
            min-width: 80px;
        }
        .title-cards{
            font-size: 27px;
        }
    }

    flip-container {
        -webkit-perspective: 1000;
        -moz-perspective: 1000;
        -o-perspective: 1000;
        perspective: 1000;
        min-height: 120px;
        cursor: pointer;
    }
    .front,
    .back {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -o-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transition: 0.6s;
        -webkit-transform-style: preserve-3d;
        -moz-transition: 0.6s;
        -moz-transform-style: preserve-3d;
        -o-transition: 0.6s;
        -o-transform-style: preserve-3d;
        -ms-transition: 0.6s;
        -ms-transform-style: preserve-3d;
        transition: 0.6s;
        transform-style: preserve-3d;
        top: 0;
        left: 0;
        width: 100%;
    }
    .front{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        font-size: 45px;
    }
    .back {
        -webkit-transform: rotateY(-180deg);
        -moz-transform: rotateY(-180deg);
        -o-transform: rotateY(-180deg);
        -ms-transform: rotateY(-180deg);
        transform: rotateY(-180deg);
        position: absolute;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        font-size: 45px;
    }
      .flip-container.flipped .back {
        -webkit-transform: rotateY(0deg);
        -moz-transform: rotateY(0deg);
        -o-transform: rotateY(0deg);
        -ms-transform: rotateY(0deg);
        transform: rotateY(0deg);
    }
    .flip-container.flipped .front {
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -o-transform: rotateY(180deg);
        -ms-transform: rotateY(180deg);
        transform: rotateY(180deg);
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