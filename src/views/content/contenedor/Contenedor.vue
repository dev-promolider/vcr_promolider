<template>
  <div class="content">
      <div class="pref" v-if="mostrar">
        <Preferencias/>
      </div>
    <div class="nav-v" >
      <NavBarV  />
    </div>
    <div class="content-user"  >
      <NavBar />
      <router-view />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/Navbar/NavBar.vue";
import NavBarV from "@/components/Navbar/NavBarV.vue";
import Preferencias from "@/views/content/preferences/PreferenceCateg.vue"
// import Login from "@/views/auth/Login.vue";
// consoleimport { mapGetters } from 'vuex';
export default {
  name: "Contenedor",
  components: {
    NavBarV,
    NavBar,
    Preferencias,
    //Login
  },
  data() {
    return {
      //islogin: true,
      mostrar:true,
      // Nmostrar:false
    };
  },
  
  // computedd:{
  //   ...mapGetters('user',{
  //     statususer: 'getStatusUser'})
  //},
  methods:{
      
  },
  created() {
    const status_user = localStorage.getItem("status_user");
      // if ( !token) {
      //   this.islogin = false;
      // }
      if(status_user == 0){
          this.mostrar =true
      }else {
          this.mostrar = true
      }
 
  },
};
</script>
<style scope>
.content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
}
.pref{
border: 1px solid rgb(150, 150, 150);
border-radius:25px 25px 25px 25px;
position: absolute;
padding:0px;
margin-left : 0px;
z-index: 100;
margin-top: 2px;
width: 98%;
height: 100%;
background: #e7e2e2;
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