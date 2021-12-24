<template>
  <div class="content"> 

    <div class="nav-v" v-if="islogin">
        <NavBarV />
    </div>

    <div class="content-user" v-if="islogin" >
        <div>
            <NavBar/>
        </div>
        <div>
          <router-view/>
        </div>
    </div>
    
    <Login v-else />

  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import NavBarV from '@/components/NavBarV.vue';
import Login from "@/views/auth/Login.vue";
export default {
  name: 'Contenedor',
  components: {
    NavBarV,
    NavBar,
    Login
  },
  data(){
    return{
     islogin: true
    }
  },
  mounted(){
    const token = localStorage.getItem("access_token");
    if (!token) {
      this.islogin = false;
    }else{
      this.$router.push("/");
    }
  }
};
</script>
<style scope>

  .content{
    width: 100%;
    min-height: 100%;
    display: flex;
  }
  .nav-v{
    width: 218px;
    min-height:100%;
    background: #494949;

  }
  .content-user{
    flex-grow: 1;
  }
</style>