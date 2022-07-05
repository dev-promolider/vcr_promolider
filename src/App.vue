<template>
  <v-app>
    <router-view />
  </v-app>
</template>
<script>
//import Contenedor from '@/views/content/contenedor/Contenedor.vue';
export default {
  components: {},

  data() {
    return {};
  },
};
</script>

<!-- Definiendo estilos globales -->
<style>
/* @import url('https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap'); */

/* Paleta de colores */
:root {
  --bg-color: #f8f8f8;
  --color-white: #464040;
  --first-color-gray: #ecf0f3;
  --second-color-gray: #9d9d9d;
  --purple-color: #9fbdf8;
  --first-color-green: #1ae800;
  --second-color-green: #59a350;
  --third-color-green: #448f3c;
  --fourth-color-green: #20421c;
  --fifth-color-green: #324230;
  --sixth-color-green: #35424a;
  --bg-btn: linear-gradient(180deg, #69ea58 -166.98%, #31bd1f 143.4%);
  --seventh-color-green: #1d2528;
  --eighth-color-green: #29343a;
  --bg-btn: linear-gradient(180deg, #1eff00 -166.98%, #54af47 143.4%);
  --bg-content: #f5f3f3;
}

* {
  font-family: "Segoe UI", Helvetica, Arial, sans-serif;
}

#app {
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-content);
  overflow: scroll;
}
.component-frame {
  z-index: 0 !important;
}
/* Boton verde */
.btn-custom {
  background: var(--bg-btn);
  border-radius: 15px;
  color: white;
  border: none;
  padding: 18px 67px;
  font-size: 14px;
}

.btn-custom:hover {
  background: var(--second-color-green);
}

/* Bordes redondeados basicos para los contenedores */
.border-box {
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #efefef;
}

/* Bordes verdes redondeados para los contenedores */
.border-box-green {
  background: var(--color-white);
  border: 1px solid #1ae800;
  box-sizing: border-box;
  border-radius: 20px;
}

/* Centrar vertical y horizontalemente el spinner u otro elemento */
.center-spinner,
.center-element {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.center-element {
  color: var(--second-color-gray);
  font-size: 14px;
}

/* Icono triste para "resultados no encontrados" */
.no-result::before {
  font-family: "Font Awesome 5 Free";
  content: "\f119";
  font-size: 96px;
  color: var(--second-color-gray);
}

.cursor-pointer {
  cursor: pointer;
}

/* Animacion esqueloto de pre-carga */
@keyframes load {
  0% {
    background: #ccc;
  }

  50% {
    background: #eee;
  }

  100% {
    background: #ccc;
  }
}

.loader {
  height: 50px;
  animation: load 2s linear infinite alternate;
  border-radius: 30px;
  color: transparent;
}
</style>
