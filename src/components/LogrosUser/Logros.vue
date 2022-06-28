<template>
  <div class="row">
    <div class="col-md-9">
      <div class="caja-principal m-4 overflow-hidden">
        <div class="encabezado d-flex justify-content-star">

          <div class="m-4 d-flex texto-logro">
            <img src="@/assets/logo-inicial.png" alt="" class="img-logo mx-4" />
            <small class="text-white flex"
              >Bienvenido a la seccion de Logros!!!</small
            >
          </div>
        </div>

        <div class="cuerpo">

          <div class="cuerpo-caja d-flex flex-wrap justify-content-around p-2 text-capitalize">

            <div class="caja d-flex m-3" v-for="(logro, index) in logros" :key="index">
             
              <div class="cajita2 d-flex flex-fill align-items-center position-relative">
                <div class="container text-white">
                  <!-- <div class="row row-cols-2">
                    <div class="col-4 px-0">N° {{logro.id}}</div>
                    <div class="col-8 px-0">{{logro.name}}</div>
                  </div>
                  <div class="row row-cols-2">
                    <div v-if="logro.level == 1" class="col-4 px-0">
                      <v-icon>mdi-star</v-icon>
                    </div>
                    <div v-if="logro.level == 2" class="col-4 px-0">
                      <v-icon>mdi-star</v-icon><v-icon>mdi-star</v-icon>
                    </div>
                    <div v-if="logro.level == 3" class="col-4 px-0">
                      <v-icon>mdi-star</v-icon><v-icon>mdi-star</v-icon><v-icon>mdi-star</v-icon>
                    </div>

                    <div class="col-8 px-0">{{logro.description}}</div>
                  </div> -->
                  <div class="row center">
                    <img :src="logro.icon" alt="">
                  </div>
                  <div class="row center">
                    <p>{{logro.name}}</p>
                  </div>
                  <div class="row center">
                    <p>Nivel {{logro.level}}</p>
                  </div>
                  
                </div>
                <div v-if="logro.obtained == false" class="opacar">
                <div class="h-100 d-flex align-items-center justify-content-center">
                  <p><strong>{{logro.description}}</strong></p>
                </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 col-md-3 d-flex align-items-start justify-content-center">
      <img class="img-curso" src="@/assets/logro.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Logros",

  data() {
    return {
      logros:null,
    };
  },

  mounted() {
    this.getLogros();
  },

  methods: {
    getLogros(){
      this.axios('badges/my-progress')
      .then((res) => {
        this.logros = res.data;
        console.log(this.logros);
      });
    }
  },
  
  
};
</script>

<style scoped>
p{color:#fff}
.view {
  backdrop-filter: initial;
}
.row {
  margin: 0px;
  padding: 0px;
}
.caja-principal {
  height: 100%;
}
.encabezado {
  background: rgb(0, 0, 0);
  background: radial-gradient(
    circle,
    rgb(19, 98, 23) 10%,
    rgb(21, 39, 48) 45%
  );
  border-radius: 10px 10px 0px 0px;
}
.cuerpo {
  background: rgb(231, 230, 230);
  border-radius: 0px 0px 10px 10px;
}

.navbar-toggler {
  margin: 10px;
}
.texto-logro {
  font-size: 20px;
}
.caja {
  flex: 0 1 300px;
  box-shadow: 2px 2px 4px  rgba(255, 255, 255, 0.459);
  border-radius: 5px;
  cursor: pointer;
  transition: transform .5s;
}
.caja:hover{
  transform: scale(1.1,1.1);
}


.cajita2 {
  border-radius: 5px;
  background: rgb(20, 48, 62);
  font-size: 10px;
}
.img-curso {
  width: 100%;
}
@media screen and (min-width: 1200px) {
  .img-curso {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  .img-curso {
    width: 40%;
  }
}

.opacar{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.836);
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  border-radius: 5px;
}
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
