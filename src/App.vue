<template>
  <div id="app">
    <Contenedor/>
    <!-- <router-view /> -->
  </div>
</template>

<script>
//import NavBar from '@/components/NavBar.vue'
import Contenedor from '@/views/Contenedor.vue'

export default {
  components: {
    Contenedor
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
  *{
    font-family: 'Roboto', sans-serif;  
  }
  #app{
    width: 100vw;
    height: 100vh;
    background-color: rgb(204, 204, 204);
  }
</style>