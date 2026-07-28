<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>

<style>
main {
  padding-top: 0px;
}

.v-main__wrap {
  background-size: 100%;
  background-position-x: center;
  background-position-y: 50px;
  background-repeat: repeat-y;
}

:root {
  --bg-color: #F5F4EE;
  --color-white: #FFFFFF;
  --first-color-gray: #EFECE4;
  --second-color-gray: #78716C;
  --purple-color: #9fbdf8;
  --first-color-green: #10B981;
  --second-color-green: #059669;
  --third-color-green: #047857;
  --fourth-color-green: #064E3B;
  --fifth-color-green: #065F46;
  --sixth-color-green: #1C1917;
  --seventh-color-green: #18181B;
  --eighth-color-green: #27272A;
  --bg-btn: linear-gradient(135deg, #34D399 0%, #10B981 100%);
  --bg-content: #F5F4EE;
}

* {
  font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  background-color: var(--bg-content);
}

html,
body {
  max-width: 100%;
  overflow-x: hidden;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #1ae800;
  box-shadow: inset 0 0 6px #1ae800;
  border-radius: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px #1ae800;
  box-shadow: inset 0 0 6px #1ae800;
  background-color: #1ae800;
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
