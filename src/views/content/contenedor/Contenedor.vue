<template>
  <div class="content">
      <div class="pref"  v-if="mostrar">
        <div class="container">
          <Preferencias />     
        </div>
      </div>
      
    <div class="nav-v" v-if="!mostrar">
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
  height: 100%;
  position: relative;
  display: flex;
}

.pref{
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 100;
  background: var(--bg-content);
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
    bottom: 0px !important;
    z-index: 1;
    
  }
}
</style>