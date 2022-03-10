<template>
  <div class="content">
      <div class="pref"  v-if="mostrar">
        <div class="container">
          <Preferencias />    
          <div class="row d-flex justify-content-end">
            <button class="btn-custom" v-on:click="cambiar" >Continuar <i class="fas fa-angle-double-right"></i></button> 
          </div>   
        </div>
      </div>
      
    <div class="nav-v" >
      <NavBarV  />
    </div>
    <div class="content-user"  >
      <NavBar />
      <router-view class="view" />
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
      if(this.status_user == 1){

        this.mostrar = false
          // console.log(this.mostrar)
      }else{
          // this.mostrar = false
       
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
      if(this.status_user == 1){
          this.mostrar =false
      }else {
          this.mostrar = true
      }
 
  },
};
</script>
<style scope>
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
    bottom: 0;
    z-index: 1;
  }
}
</style>