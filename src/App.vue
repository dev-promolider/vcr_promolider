<template>
  <div id="app">
    <NavBar/>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>
<style>
  #app{
    width: 100vw;
    height: 100vh;
    background-color: #E5E5E5;
  }
</style>