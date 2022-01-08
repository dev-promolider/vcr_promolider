<template>
  <div class="content">
    <div class="nav-v" v-if="islogin">
      <NavBarV v-if="islogin" />
    </div>
    <div class="content-user">
      <NavBar v-if="islogin" />
      <router-view v-if="islogin" />
      <Login v-else />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/Navbar/NavBar.vue";
import NavBarV from "@/components/Navbar/NavBarV.vue";
import Login from "@/views/auth/Login.vue";
export default {
  name: "Contenedor",
  components: {
    NavBarV,
    NavBar,
    Login,
  },
  data() {
    return {
      islogin: true,
    };
  },
  created() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      this.islogin = false;
    }
  },
};
</script>
<style scope>
.content {
  width: 100%;
  min-height: 100%;
  display: flex;
}
.nav-v {
  width: 218px;
  min-height: 100%;
  background: #494949;
}
.content-user {
  flex-grow: 1;
}
</style>