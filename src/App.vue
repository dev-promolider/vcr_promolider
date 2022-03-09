<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
//import Contenedor from '@/views/content/contenedor/Contenedor.vue';
export default {
  components: {
  },  

  data() {
    return {
     
     
    }
  },
  
}

</script>

<!-- Definiendo estilos globales -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap');

/* Paleta de colores */
:root{
 --bg-color: #F8F8F8;
 --color-white: #FFFFFF;
 --first-color-gray: #ECF0F3;
 --second-color-gray: #9D9D9D;
 --purple-color: #9FBDF8;
 --first-color-green: #99CC93;
 --second-color-green: #5CC151;
 --third-color-green:  #448F3C;
 --fourth-color-green: #20421C;
 --fifth-color-green: #324230;
 --sixth-color-green: #494949;
 --bg-btn: linear-gradient(180deg, #5CC151 -166.98%, #97F18D 143.4%);
 --bg-content: #f5f3f3;
}

*{
  font-family: 'Roboto', sans-serif;  
}

#app{
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-content);
  overflow: auto;
}

/* Boton verde */
.btn-custom{
 background: var(--bg-btn);
 border-radius: 15px;
 color: white;
 border: none;
 padding: 18px 67px;
 font-size: 14px;
}

.btn-custom:hover{
  background: var(--second-color-green);
}

/* Bordes redondeados basicos para los contenedores */
.border-box{
 border-radius: 20px;
 background:var(--color-white); 
 border: 1px solid #EFEFEF;
}

/* Bordes verdes redondeados para los contenedores */
.border-box-green{
 background:var(--color-white); 
 border: 1px solid #97F18D;
 box-sizing: border-box;
 border-radius: 20px;
}

/* Centrar vertical y horizontalemente el spinner u otro elemento */
.center-spinner, .center-element{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

/* Icono triste para "resultados no encontrados" */
.no-result::before{
  font-family: "Font Awesome 5 Free";
  content: '\f119';
  font-size: 96px;
  color:var(--second-color-gray);
}

.cursor-pointer{
  cursor: pointer;
}

</style>