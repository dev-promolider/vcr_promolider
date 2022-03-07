<template>
  <div class="content">
    <div class="pref" v-if="mostrar">
      <Preferencias />
      <button class="botoncito" v-on:click="cambiar">Siguiente</button>
    </div>
    <div class="nav-v">
      <NavBarV />
    </div>
    <div class="content-user">
      <NavBar />
      <router-view />
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
  //     statususer: 'getStatusUser'})
  //},
  methods: {
    cambiar() {
      this.axios.post('/preferences/add')
      if (this.status_user == 1) {
        this.mostrar = !this.mostrar;
      } else {
        // this.mostrar = false
        window.location.reload(true);
      }
    },
  },

  created() {
    this.status_user = localStorage.getItem("status_user");
    if (this.status_user == 1) {
      this.mostrar = !this.mostrar;
    }
  },
};
</script>
<style scope>
.content {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
}

.botoncito {
  width: 250px;
  height: 45px;
  color: darkblue;
  border-radius: 20px 20px 20px 20px;
  margin-left: 882px;
  border: 2px solid rgb(173, 166, 166);
  /* margin-bottom: 1000px; */
  margin-top: 40px;
  font-weight: 700;
  font-size: 20px;
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
</style>