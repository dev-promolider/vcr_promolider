<template>
  <div id="app">
    <Contenedor /> 
   
  </div>
</template>
<script>
import Contenedor from '@/views/Contenedor.vue';

export default {
  components: {
    Contenedor,
   
  },  

  data() {
    return {
     
     
    }
  },
  
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap');
*{
    font-family: 'Roboto', sans-serif;  
  }
  #app{
    width: 100vw;
    height: 100vh;
    background-color: #E5E5E5;
  }
</style>