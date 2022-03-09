<template>
  <div class="content">
    <div class="pref" v-if="mostrar">
      <Preferencias/>
      <!-- <button class="botoncito" v-on:click="cambiar">Siguiente</button> -->
    </div>
    <div class="nav-v">
      <NavBarV />
    </div>
    <div class="content-user">
      <NavBar />
      <router-view class="view" />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/Navbar/NavBar.vue";
import NavBarV from "@/components/Navbar/NavBarV.vue";
import Preferencias from "@/views/content/preferences/PreferenceCateg.vue";
// import { mapGetters } from 'vuex';
export default {
  name: "Contenedor",
  components: {
    NavBarV,
    NavBar,
    Preferencias,
  },
  data() {
    return {
      mostrar: false,
      status_user: null,
    };
  },

  // computedd:{
  //   ...mapGetters('user',{
  //     statususer: 'getStatusU+ser'})
  //},
  methods: {
    
  },

  created() {
    this.status_user = localStorage.getItem("status_preference");
    if (this.status_user == 0) {
      this.mostrar = !this.mostrar;
    }
  },
};
</script>
<style scoped>
.view{
  overflow-y: scroll ;
}

.view::-webkit-scrollbar{
    display: none;
    }

.content {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
}


.pref {
  background: #e9f6fc;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 0px 0px 0px 0px;
  position: absolute;
  padding: 0px;
  margin-left: 0px;
  z-index: 100;
  margin-top: 0px;
  width: 100%;
  height: 100%;
}
.nav-v {
  width: 239px;
  height: 100%;
  background: #494949;
}
.content-user {
  display: flex;
  width: 100%;
  max-height: 100%;
  flex-direction: column;
}
@media (max-width:991px) {
  .nav-v{
    max-height: 66px !important;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1;
  }
}
</style>