<template>
<div class="row">
  
  <div class="col-md-9  ">
    <div class="caja-principal m-4 overflow-hidden">
      <div class="encabezado d-flex justify-content-star">
        <!-- <div class="">
          <b-navbar toggleable="lg" type="dark" variant="">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-img href="#" class="m-3"
                ><img src="@/assets/logo-inicial.png" alt="" class="img-logo"
              /></b-navbar-img>
              <b-navbar-nav>
                <b-nav-item href="#" class="ml-3"
                  ><small>Bienvenido a la seccion de Logros!!!</small>
                </b-nav-item>
                <b-nav-item href="#" class="ml-3"
                  ><small>MISIONES DE BIENVENIDA</small>
                </b-nav-item>
                <b-nav-item href="#" class="ml-3"
                  ><small>MISIONES ESTACIONALES</small></b-nav-item
                >
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div> -->
        
        <div class="m-4 d-flex texto-logro">
          <img src="@/assets/logo-inicial.png" alt="" class="img-logo mx-4"
              />
          <small class="text-white flex"
            >Bienvenido a la seccion de Logros!!!</small
          >
        </div>
      </div>
  
      <div class="cuerpo">
  
        <!-- <div class="d-flex justify-content-between text-white">
          <div class="d-flex ml-3 my-3 bd-highlight">
            Obten hasta 1000 medallas a lo largo del curso
          </div>
          <div class="d-flex m-3 bd-highlight">Completado</div>
        </div> -->
  
  
  
        <div class="cuerpo-caja d-flex flex-wrap justify-content-around p-2">
  
          <div class=" caja d-flex  m-3">
            <div class="cajita1 d-flex align-items-center p-1 ">
              <img src="./../../assets/examen-1.svg" alt="" />
            </div>
            <div class="cajita2 d-flex flex-fill align-items-center ">
              <div class="container text-white">
                <div class="row row-cols-2 ">
                  <div class="col-8">REALIZA UN EXAMEN</div>
                  <div class="col-4">Column</div>
                </div>
                <div class="row row-cols-2">
                  <div class="col-8">Column</div>
                  <div class="col-4">Column</div>
                </div>
              </div>
            </div>
          </div>
  
  
          <div class="caja d-flex m-3">
            <div class="cajita1 d-flex align-items-center p-1">
              <img src="./../../assets/examen-2.svg" alt="" />
            </div>
            <div class="cajita2 d-flex flex-fill align-items-center ">
              <div class="container text-white">
                <div class="row row-cols-2 ">
                  <div class="col-8">REALIZA DOS EXAMENES</div>
                  <div class="col-4">Column</div>
                </div>
                <div class="row row-cols-2">
                  <div class="col-8">Column</div>
                  <div class="col-4">Column</div>
                </div>
              </div>
            </div>
          </div>
  
  
          <div class="caja d-flex  m-3">
            <div class="cajita1 d-flex align-items-center p-1">
              <img src="./../../assets/medalla.svg" alt="" />
            </div>
            <div class="cajita2 d-flex flex-fill align-items-center ">
              <div class="container text-white">
                <div class="row row-cols-2 ">
                  <div class="col-8">REALIZA TRES EXAMENES</div>
                  <div class="col-4">Column</div>
                </div>
                <div class="row row-cols-2">
                  <div class="col-8">Column</div>
                  <div class="col-4">Column</div>
                </div>
              </div>
            </div>
          </div>
  
  
          <div class="caja d-flex  m-3">
            <div class="cajita1 d-flex align-items-center p-1">
              <img src="./../../assets/stars.svg" alt="" />
            </div>
            <div class="cajita2 d-flex flex-fill align-items-center ">
              <div class="container text-white">
                <div class="row row-cols-2 ">
                  <div class="col-8">REALIZA CUATRO EXAMENES</div>
                  <div class="col-4">Column</div>
                </div>
                <div class="row row-cols-2">
                  <div class="col-8">Column</div>
                  <div class="col-4">Column</div>
                </div>
              </div>
            </div>
          </div>
  
          
        </div>
  
        
  
      </div>
    </div>

  </div>
<div class="mt-5 col-md-3 d-flex align-items-start justify-content-center">
    <img class="img-curso" src="@/assets/logro.png" alt="" >
  </div>
</div>
</template>

<script>
export default {
  name: "Logros",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.view{
  backdrop-filter: initial;
}
.row{
  margin: 0px;
}
.caja-principal {
  height: 100%;
}
.encabezado {
  background: rgb(53, 66, 74);
  background: radial-gradient(
    circle,
    rgb(38, 46, 52) 0%,
    rgba(19, 27, 30, 1) 45%
  );
  border-radius: 10px 10px 0px 0px;
}
.cuerpo {
  background: #00bf8f; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #001510,
    #00bf8f
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #001510,
    #00bf8f
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  border-radius: 0px 0px 10px 10px;
}

.navbar-toggler {
  margin: 10px;
}
.texto-logro {
  font-size: 20px;
}
.caja{
  flex: 0 1 300px;
}

.cajita1 {
  border-radius: 5px 0px 0px 5px;
  background: rgb(239, 184, 16);
}
.cajita2 {
  border-radius: 0px 5px 5px 0px;
  background: #131b1e;
  font-size: 10px;
}
.img-curso{
 
  width: 100%;
}
@media screen and (min-width: 1200px){
  .img-curso{
 
  width: 100%;
}
}
@media screen and (max-width: 768px){
  .img-curso{
 
  width: 40%;
}
}
</style>