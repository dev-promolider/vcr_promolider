<template>
  <div class="content">

      <div class="pref"  v-if="mostrar">
        <div class="container">
          <Preferencias />     
        </div>
      </div>
      
    <div class="barraNavegacion" v-if="!mostrar">
      
      <div class="nav-v" v-if="barraMenu">
        
          <NavBarV />
      </div> 
    </div>
    
      
    
    <div class="content-user">
      
        <img src="@/assets/barra-menu.svg" alt="" class="barrita position-absolute top-0 start-0 mt-4 ml-4" @click="barmenu">
     
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
      barraMenu: true,

    };
  },

  // computedd:{
  //   ...mapGetters('user',{
  //     statususer: 'getStatusU+ser'})
  //},
  methods: {
     barmenu(){
       this.barraMenu = !this.barraMenu
       /* this.mostrar = !this.mostrar */
     },
  },
  created() {
    this.status_user = localStorage.getItem("status_preference");
    if (this.status_user == 0) {
      this.mostrar = !this.mostrar;
    }
  },
};
</script>
<style lang="scss" scoped>
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
  z-index: 9999;
  background: var(--bg-content);
}
.nav-v {
  width: 200px;
  height: 100%;
  background: rgb(90, 90, 90);
}
.content-user {
  display: flex;
  width: 100%;
  max-height: 100%;
  flex-direction: column;
}

.barrita{
  width: 25px;
  transition: transform 1.5s;
}

.barrita:hover{
transform:  scale(1.5) ;
/* animation: roll 2.5s ; */

}

/* @keyframes roll  {
  
0% {
    transform: scale(1.5) rotate(0) ;
  }
  100% {
    transform: scale(1.5) rotate(360deg) ;
  }
  } */
  



@media (max-width:991px) {
 
  /* .nav-v{
    position: inline-block;
    width: 100%;
    height: 100%; 
    background: rgb(90, 90, 90);

  } */
  
  /* .barrita{
  background-color: transparent;
  display: block;
  position: absolute;
  width: 2rem;
  margin-left: 1rem;
  margin-top: 1rem;
  z-index: 10000 ; 
  } */

}
</style>