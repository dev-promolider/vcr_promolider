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

@import url('https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@300&display=swap');
/* Paleta de colores */
:root{
 --bg-color: #F8F8F8;
 --color-white: #464040;
 --first-color-gray: #ECF0F3;
 --second-color-gray: #9D9D9D;
 --purple-color: #9FBDF8;
 --first-color-green: #1ae800;
 --second-color-green: #59a350;
 --third-color-green:  #448F3C;
 --fourth-color-green: #20421C;
 --fifth-color-green: #324230;
 --sixth-color-green: #35424a;
 --bg-btn: linear-gradient(180deg, #69ea58 -166.98%, #31bd1f 143.4%);
 --bg-content: #f5f3f3;
}

*{

font-family: 'Lexend Exa', sans-serif;

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
 background: #ffffff;
 border: 1px solid #EFEFEF;
}

/* Bordes verdes redondeados para los contenedores */
.border-box-green{
 background:var(--color-white); 
 border: 1px solid #1ae800;
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

.center-element{
  color: var(--second-color-gray);
  font-size: 14px;
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

/* Animacion esqueloto de pre-carga */
@keyframes loading {
    0%{
      background: #ccc;
    }

    50%{
      background: #eee;
    }

    100%{
      background: #ccc;
    }
  }

  .loader{
    height: 50px;
    animation: loading 2s linear infinite alternate;
    border-radius:30px;
    color: transparent;
    
  }

</style>