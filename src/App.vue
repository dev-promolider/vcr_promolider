<template>
  <div id="app">
    <Contenedor/>
    <!-- <router-view /> -->
  </div>
</template>

<script>
//import NavBar from '@/components/NavBar.vue'
import Contenedor from './views/Contenedor.vue'

export default {
  components: {
    Contenedor
  }
}
</script>
<style>
  #app{
    width: 100vw;
    height: 100vh;
    background-color: rgb(204, 204, 204);
  }
</style>