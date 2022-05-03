<template>
  <div class="content">
    <div class="pref" v-if="mostrar">
      <div class="container">
        <Preferencias />
      </div>
    </div>
    <div
      class="nav-v"
      :class="barraMenu ? 'sidebar-mobile' : 'sidebar-none'"
      v-if="!mostrar"
    >
      <NavBarV @closeMenu="closeMenu"/>
    </div>

    <div class="content-user" v-if="!mostrar">
      <img
        src="@/assets/barra-menu.svg"
        alt=""
        class="barrita position-absolute top-0 start-0 mt-4 ml-4"
        @click="barmenu"
      />

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
    closeMenu(){
      this.barraMenu = false;
    },
    barmenu() {
      this.barraMenu = !this.barraMenu;
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
.view {
  overflow-y: scroll;
}

.view::-webkit-scrollbar {
  display: none;
}

.content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
}

.pref {
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 9999;
  background: var(--bg-content);
}
.nav-v {
  display: flex;
  width: 200px;
  height: 100%;
  background: rgb(90, 90, 90);
  transition: all 0.4s;
  transform: translateX(0);
}
.sidebar-mobile {
  @media screen and (max-width: 1023px) {
    display: inline-block;
    position: fixed;
    background: rgb(90, 90, 90);
    left: 0;
    top: 80px;
    width: 180px;
    height: calc(100% - 80px);
    transition: all 1;
    z-index: 50;
    opacity: 0.989;
    -webkit-box-shadow: 4px 0px 6px 0px rgba(91,90,90,0.51);
    -moz-box-shadow: 4px 0px 6px 0px rgba(91,90,90,0.51);
    box-shadow: 4px 0px 6px 0px rgba(91,90,90,0.51);
  }
}
.sidebar-none {
  width: 0;
  transition: all 0.5s;
  transform: translateX(-250px);
  @media screen and (max-width: 1023px) {
    position: fixed;
    top: 80px;
    left: -100%;
    transition: all 1.5s ease 0s;
    z-index: 10;
  }
}
.content-user {
  display: flex;
  width: 100%;
  max-height: 100%;
  flex-direction: column;
}
.barrita {
  width: 25px;
  transition: transform 1.5s;
}

.barrita:hover {
<<<<<<< HEAD
  transform: scale(1);
  
=======
  transform: scale(1.17);
  cursor: pointer;
>>>>>>> f052931f34e72df15cbcdaa107e07eece86a99d9
}


</style>