<template>
  <div class="content">
      <div class="pref"  v-if="mostrar">
        <Preferencias />
          
      
          <button class="botoncito" v-on:click="cambiar" >Siguiente</button>
    
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
      status_user: null
    };
  },
  
  // computedd:{
  //   ...mapGetters('user',{
  //     statususer: 'getStatusUser'})
  //},
  methods:{
      
       cambiar() {

    
    this.status_user = localStorage.getItem("status_user");
      if(this.status_user == 0 ){

        this.mostrar = false
          // console.log(this.mostrar)
      }else{
     
        window.location.reload(true);
      }
     
    },
  },
 
  created() {
  this.status_user = localStorage.getItem("status_user");
    // console.log(this.status_user)
      // if ( !token) {
      //   this.islogin = false;
      // // }
      if(this.status_user == 0){
          this.mostrar =false
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
.botoncito {
  width: 200px;
  height: 35px;
  color: darkblue;
  border-radius: 7px 7px 7px 7px;
  margin-left: 550px;
  border: 2px solid rgb(212, 212, 212);
  margin-bottom: 10px;
  font-weight: 500;
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