<template>
  <div >
    <Transition name="bounce">
      <template v-if="isGameFinish">
        <template>
          <v-card
            elevation="10"
            color="success"
            class="m-auto mt-10 text-center fade-in"
            width="500px"
          >
            <v-icon class="ma-5" size="100" color="white" icon
              >mdi-check-circle-outline</v-icon
            >
            <v-card-text class="text-h3 font-weight-bold white--text"
              >Ganaste <span v-if="sumPoint">{{ sumPoint }}</span>
              <v-progress-circular
                v-if="!sumPoint"
                indeterminate
              ></v-progress-circular>
              puntos</v-card-text
            >
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
    <div
      class="text-center mt-4"
      :class="{pre:!gameStarted,started:gameStarted}"
      v-if="!isGameFinish"
    >
      <v-btn v-if="!gameStarted" @click="_gettingStart">Empezar</v-btn>
      <div class="row" v-if="gameStarted">
        <div class="col-sm-12">
          <div class="totalTime p-3"><span class="btn btn-cards">Tiempo Total : <span class="badge" :class="isGameFinish ? 'badge-cards' : 'badge-light'">{{min}} : {{sec}}</span></span></div>
          <P
            class="text-center mb-5 subtitle-1 font-weight-bold text--secondary"
            >RECUERDA QUE SOLO TIENES 5 INTENTOS</P
          >
          <ul id="horizontal-list centrado">
            <!-- Aca va la lista de las letras digitadas -->
            <button
              v-for="(item, index) in palabra_escrita"
              :key="index"
              type="button"
              class="btn btn-success cuadro text-center"
            >
              <span class="badge">{{ item }}</span>
            </button>
          </ul>
          <div
            class="text-capitalize subtitle-1 font-weight-bold text--secondary"
          >
            Pista: {{ datos.detail.description }}
          </div>
        </div>
        <!-- End primera columna -->

        <div class="container text-center d-flex justify-content-center">
          <div class="col-sm-10">
            <!-- Aca va el teclado -->
            <span v-for="(letra, index) in letras" :key="index">
              <button
                v-on:click="comparar(letra, index)"
                class="teclado"
                v-bind:key="letra"
                v-bind:disabled="botones[index]"
                v-bind:class="{
                  verde: color_botones[index] == 'verde',
                  rojo: color_botones[index] == 'rojo',
                }"
              >
                {{ letra }}
              </button>
            </span>
          </div>
          <!-- End segunda columna -->
        </div>
        <!-- End container text-center -->
        <div class="row d-flex justify-content-center">
        <!-- <div class="col-xs-8 col-sm-8 col-md-8">
          <br />
          <div>
            <img v-bind:src="'@/components/Ahorcado/imagenes/'+contador_errores+'.png'" alt=""/>
          </div>
        </div> -->
        <!-- End tercera columna -->

        <div class="col-xs-8 col-sm-8 col-md-8">
          <br />
          <label class="text-primary">Aciertos:</label>
          <input
            type="text"
            class="form-control text-center"
            v-model="contador_aciertos"
            disabled
          />
          <br />
          <label class="text-primary">Errores:</label>
          <input
            type="text"
            class="form-control text-center"
            v-model="contador_errores"
            size="3"
            disabled
          />
          <br />
          <!-- <button class="btn btn-success" @click="generarAleatorio">
            NUEVO JUEGO
          </button> -->
        </div>
        <!-- En cuarta columna -->
      </div>
      </div>
      <!-- End row -->

     
      <!-- End row -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Ahorcado",
  props: {
    datos: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isGameFinish: false,
      gameStarted:false,
      gettingStart:false,
      totalTime: {
                minutes: 0,
                seconds: 0,
            },
      mostrar: true,
      game: true,
      win: false,
      lost: false,
      contador_aciertos: 0,
      contador_errores: 0,
      aleatorio: 0,
      palabra_escrita: [],
      botones: [],
      color_botones: [],
      letras: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      frutas: [],
      contadorFlag: 0,
      productor_id: 1,
      course_game_id: this.$route.params.id
    };
  },
  methods: {
    ...mapActions("course", ["sendAnswersCards"]),
        /*Empezar Juego*/
        _startGame(){
            this._tick();
            this.interval = setInterval(this._tick,1000);
           
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
            this.gameStarted=true;
            this.gettingStart = true
            this._startGame()
        },
    comeBack() {
      this.$router.back();
    },
    senAnswers(value) {
      this.sendAnswersCards(value);
    },
    async generarAleatorio() {
      this.game = true;
      this.win = false;
      this.lost = false;
      this.palabra_escrita = [];
      this.contador_aciertos = 0;
      this.contador_errores = 0;
      this.botones = [];
      this.color_botones = [];
      this.frutas[0] = this.datos.detail.word.toLowerCase();

      this.aleatorio = Math.floor(Math.random() * this.frutas.length);
      //	Crea un array de la misma longitud de
      for (var i = 0; i < this.frutas[this.aleatorio].length; i++) {
        this.palabra_escrita.push(" ");
      }

      return this.aleatorio;
    },
    comparar: function (caracter, posicion) {
      if (this.game) {
        this.contadorFlag = 0;

        this.botones[posicion] = true;

        for (let i = 0; i <= this.palabra_generada.length; i++) {
          //	Si la letra se encuentra en la palabra
          if (caracter.toLowerCase() == this.palabra_generada[i]) {
            //app.$set(this.palabra_escrita, i, caracter)
            this.palabra_escrita[i] = caracter;
            this.contadorFlag++;
            this.contador_aciertos++;
          } //	End if
        } //	End For

        //	No se encontró la letra
        if (this.contadorFlag == 0) {
          this.color_botones[posicion] = "rojo";
          this.contador_errores++;
        } else {
          this.color_botones[posicion] = "verde";
        }

        if (this.contador_aciertos == this.palabra_generada.length) {
          this.win = true;
          this.game = false;
          const timeInSeconds=this.totalTime.minutes*60 + this.totalTime.seconds;
          this.senAnswers({
            data: true,
            tiempo: timeInSeconds,
            productor_id: this.productor_id,
            game_type: "ahorcado",
            course_game_id: this.course_game_id
          });
          this.totalTime =  {minutes: 0,seconds: 0}
          this.isGameFinish = true;
          
        }

        if (this.contador_errores == 5) {
          this.lost = true;
          this.game = false;
          this.senAnswers({
            data: false,
            productor_id: this.productor_id,
            game_type: "ahorcado",
            course_game_id: this.course_game_id
          });
          this.isGameFinish = true;
        }
      } //	End If Game
    },
  },
  computed: {
    ...mapState("course", ["sumPoints"]),
    sumPoint() {
      return this.sumPoints;
    },
    palabra_generada: function () {
      return this.frutas[this.aleatorio];
    }, //	End palab//	End comparar

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
  }, //	End computed

  created: function () {
    this.generarAleatorio();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.started {
  background: rgb(253, 253, 253);
  border-radius: 15px;
}
.pre{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-radius: 15px;
  height: 50vh;
}
.totalTime{
        color: var(--sixth-color-green);
    }
    .btn-cards{
        background: var(--bg-btn);
    }
    .btn-cards:hover{
        background: #4cac40;
    }
.teclado {
  margin-top: 5px;
  margin-left: 4px;
  width: 35px;
  display: inline-grid;
  border: 2px solid green;
  border-radius: 100px;
  background-color: #ebf5fb;
  text-align: center;
  cursor: pointer;
}
.linea {
  margin-left: 10px;
}
ul#horizontal-list li {
  display: inline;
}
ul#horizontal-list button {
  margin-left: 10px;
  width: 40px;
}

.cuadro {
  width: 30px;
  margin-left: 6px;
  text-align: center;
  padding-left: 3px;
  font-size: 1em;
  border-bottom: double;
}
.rojo {
  background-color: red;
}
.verde {
  background-color: green;
}
</style>
