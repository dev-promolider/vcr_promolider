<template>
  <div class="content">
    <div class="nav-v" >
      <NavBarV />
    </div>
    <div class="content-user">
      <NavBar/>
      <router-view />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/Navbar/NavBar.vue";
import NavBarV from "@/components/Navbar/NavBarV.vue";
// import Login from "@/views/auth/Login.vue";
// consoleimport { mapGetters } from 'vuex';
export default {
  name: "Contenedor",
  components: {
    NavBarV,
    NavBar
    //Login
  },
  data() {
    return {
      //islogin: true,
    };
  },
  // computedd:{
  //   ...mapGetters('user',{
  //     statususer: 'getStatusUser'})
  //},
  created() {
    // const token = localStorage.getItem("access_token");
    // if ( !token) {
    //   this.islogin = false;
    // }
  },
};
</script>
<style scope>
.content {
  width: 100%;
  height: 100%;
  display: flex;
}
.nav-v {
  width: 239px;
  min-height: 100%;
  background: #494949;
}
.content-user {
  display: flex;
  width: 100%;
  max-height: 100%;
  flex-direction: column;
}
</style>