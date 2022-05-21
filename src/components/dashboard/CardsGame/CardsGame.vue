<template>
  <div>

      <div class="title-cards">
          Juego de Cartas
      </div>
      <div class="d-flex flex-row justify-content-center py-1">
        <div class="turns p-3"><span class="btn btn-success">Turnos : <span class="badge" :class="finish ? 'badge-success' : 'badge-light'">{{turns}}</span> </span></div>
        <div class="totalTime p-3"><span class="btn btn-success">Tiempo Total : <span class="badge" :class="finish ? 'badge-success' : 'badge-light'">{{min}} : {{sec}}</span></span></div>
    </div>
     <div class="contenedor-cards">
        <div  :key="index" v-for="(card, index) in memoryCards" class=" flip-container" :class="{ 'flipped': card.isFlipped, 'matched' : card.isMatched }" @click="flipCard(card)">
                <div class="memorycard" style="position: relative">
                            <div class="front border rounded shadow item"><i class="fas fa-question"></i></div>
                            <div class="back rounded border item">{{card.name}}</div>
                </div>
        </div>
    </div>
  <div class="botton-start">
            <button class="btn btn-success mx-2" @click="_gettingStart" :disabled="isActiveReady"  >
                Empezar
            </button>
            <button class="btn btn-primary" @click="resetGame"   >
                Reiniciar
            </button>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash'
export default {
    data(){
        return {
            cards: [
                {
                    name: 1,
                },
                {
                    name: 2,
                },
                {
                    name: 3,
                },
                {
                    name: 4,
                },
                {
                    name: 5,
                },
                {
                    name: 6,
                },
            ],
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
        }
    },
    computed:{
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
    created(){
        this.cards.forEach((card) => {
            Vue.set(card,'isFlipped',false);
            Vue.set(card,'isMatched',false);
        });
       this.memoryCards = _.shuffle(this.memoryCards.concat(_.cloneDeep(this.cards), _.cloneDeep(this.cards)));
    },

    methods:{
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
        _match(  ){
                 this.turns++;
                 if(this.flippedCards[0].name === this.flippedCards[1].name){
                     setTimeout(() => {

                        this.flippedCards.forEach(card => card.isMatched = true);
                        this.flippedCards = [];

                        if(this.memoryCards.every(card => card.isMatched === true)){
                            this.finish = true;
                            clearInterval(this.interval);
                            console.log( { tiempo: this.totalTime, turnos: this.turns});
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
        _startGame(){
            this._tick();
            this.interval = setInterval(this._tick,1000);
            this.start = true;
            this.isActiveReady = true
        },
        _tick(){
            if(this.totalTime.seconds !== 59){
                this.totalTime.seconds++;
                return
            }

            this.totalTime.minutes++;
            this.totalTime.seconds = 0;
        },
        _gettingStart(){
            this.gettingStart = true
            this._startGame()
        },
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
    }
}
</script>

<style scoped>
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
        color: #000000;
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
</style>