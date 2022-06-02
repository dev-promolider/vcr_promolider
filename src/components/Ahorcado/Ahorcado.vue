<template>
  <div id="ga" class="text-center mt-4">
	  <div class="row justify-content-md-center m-2">
    <div v-if="win" class="bg-success p-2 mt-5" style="border-radius: 15px;">
      <p  style="font-size: 20px;"><strong> ¡ GANASTE ! </strong></p>
    </div>
    <div v-if="lost" class="bg-danger p-2 mt-5" style="border-radius: 15px;">
      <p style="font-size: 20px;"><strong> ¡ PERDISTE ! </strong></p>
    </div>

	</div>
    <div class="row">
      <div class="col-sm-12">
        <h1 class="text-center text-info">AHORCADO</h1>
		<P class="text-center mb-5">RECUERDA QUE SOLO TIENES 5 INTENTOS</P>
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
          <button></button>
        </ul>
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
    </div>
    <!-- End row -->

    <div class="row d-flex justify-content-center ">
      <!-- <div class="col-xs-8 col-sm-8 col-md-8">
        <br />
        <div>
          <img v-bind:src="'@/components/Ahorcado/imagenes/'+contador_errores+'.png'" alt=""/>
        </div>
      </div> -->
      <!-- End tercera columna -->

      <div class="co-xs-8 col-sm-8 col-md-8 m-3">
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
        <button class="btn btn-success" @click="generarAleatorio">
          NUEVO JUEGO
        </button>
      </div>
      <!-- En cuarta columna -->
    </div>
    <!-- End row -->
  </div>
</template>

<script>
export default {
  name: "Ahorcado",

  data() {
    return {
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
      frutas: [
        "manzana",
        "pera",
        "melon",
        "cereza",
        "ciruela",
        "naranja",
        "mandarina",
        "fresa",
        "sandia",
        "durazno",
      ],
      contadorFlag: 0,
    };
  },

  methods: {
    generarAleatorio: function () {
      this.game = true;
      this.win = false;
      this.lost = false;
      this.palabra_escrita = [];
      this.contador_aciertos = 0;
      this.contador_errores = 0;
      this.botones = [];
      this.color_botones = [];
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
        }

        if (this.contador_errores == 5) {
          this.lost = true;
          this.game = false;
        }
      } //	End If Game
    }, //	End comparar
  },
  computed: {
    palabra_generada: function () {
      return this.frutas[this.aleatorio];
    }, //	End palabra_generada
  }, //	End computed
  created: function () {
    this.generarAleatorio();
  },
};
</script>

<style lang="scss" scoped>
#ga {
  background:rgb(253, 253, 253);
  border-radius: 15px;
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