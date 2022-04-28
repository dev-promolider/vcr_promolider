<template>
  <div class="nav-general d-flex">
    <ul class="nav seccion justify-content-center align-self-center">
      <li class="nav-item logo-king ">
        <span class="d-flex flex-grap nav-link" href="#">
          <img class="img-king" src="../../assets/logo-king.png" />
          <span class="ml-1">
          {{titulo}}
          <!-- {{$store.getters['course/getCurso']}} -->
          </span
          >
        </span>
      </li>
    </ul>
    <div class="nav-horizontal flex-grow-2">
      <ul class="nav nav-sub-h1 justify-content-center align-items-center">
        <li class="nav-item">
          <span class="nav-link text-dark">
            <img class="img-puntos" src="../../assets/logo-puntos.png" />
            <b>173</b> Puntos
          </span>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <img class="img-help" src="../../assets/notification.png" />
          </a>
        </li>
      </ul>
      <ul class="nav nav-sub-h2 justify-content-center align-items-center ">
        <!-- <li class="nav-item logo-classroom">
          <span class="nav-link pl-2 pr-1" >
            <img class="img-classroom" src="../../assets/logo-aula3.png" />
          </span>
        </li> -->
        <!-- <li class="nav-item profile">
          <span class="submenu">
            <img class="img-photo" src="../../assets/logo-perfil.png" />
            <a class="viewmenu"  v-on:click="desplegar()">
              <img class="img-viewmenu" src="../../assets/flecha-abajo.png" />
            </a>
          </span>
        </li>
        <div
          class="viewmenu-list"
          v-show="vermenu"
          aria-labelledby="navbarDropdown"
        >
          <router-link class="dropdown-item" to="/perfil">
            <img class="img-menuitem" src="../../assets/perfil.png" />
            Perfil</router-link>
          <a class="dropdown-item" href="#">
            <img class="img-menuitem" src="../../assets/subcription.png" />
            Subcripción</a
          >
          <div class="dropdown-divider"></div>
          <a class="dropdown-item"  @click="closeSesion()">Sign out </a>
        </div> -->

        <li class="nav-item profile">
          <span class="submenu">
            <img class="img-photo" src="../../assets/logo-perfil.png" />
            <a class="viewmenu dropdown-toggle " data-toggle="dropdown" aria-expanded="false" >
              <img class="img-viewmenu" src="../../assets/flecha-abajo.png" />
            </a>
            <div class="dropdown-menu viewmenu-list mr-2">
              <router-link class="dropdown-item my-3" to="/perfil">
                <img class="img-menuitem" src="../../assets/perfil.png" />
                Perfil</router-link>
              <a class="dropdown-item mb-3" href="#">
                <img class="img-menuitem" src="../../assets/subcription.png" />
                Subcripción</a
              >
              <div class="dropdown-divider "></div>
              <a class="dropdown-item my-3"  @click="closeSesion()">Sign out </a>
            </div>
          </span>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      vermenu: true,
      link: "",
      name: ""
    };
  },
  computed: {
    // ...mapState(['title','count']),
    ...mapState( {
      //titulo: state => state.title
      titulo: state => state.course.title
    }),
    ...mapGetters('course',{
      vuexTitle: "title",
    }),

    // titulo(){
    //   return this.$store.state.title
    // }
  },
  mounted() {
    this.desplegar();
  },
  methods: {
    desplegar() {
      this.vermenu = !this.vermenu;
    },
    closeSesion() {
      localStorage.removeItem("access_token"); 
      localStorage.removeItem('status_user');
      localStorage.removeItem('name_user');           
      //window.location.reload(true);
      this.$router.push('/login');
    },
  },
};

</script>

<style scoped>
.nav-general {
  width: 100%;
  min-height: 80px;
  background-color: #fff;
}
.seccion {
  width: 40.1%;
}
.nav-horizontal {
  position: relative;
  display: flex;
  width: 59.9%;
  justify-content: flex-end;
  padding-right: 20px;
}
.profile {
  position: relative;
  background: #9bdf8f;
  border-radius: 50px;
  border: none;
  width: 110px;
  height: 50px;
}
.submenu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 100%;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.img-puntos {
  width: 20px;
  
}
.img-help {
  width: 32px;
  height: 32px;
}
.ml-1 {
  align-self: center;
  font-size: 14px;
}
.img-king {
  width: 24px;
  height: 24px;
}
.img-photo {
  width: 37.74px;
  height: 37.5px;
  border-radius: 50px;
  margin: 1rem;
}
.viewmenu {
  border-style: none;
  background: none;
}
.viewmenu-list {
  position: absolute;
  background: #ffffff;
  box-shadow: -1px 1px 3px 2px #7cc96e !important;
  border-radius: 15px;
  width: auto;
  height: auto;
  top: 20px !important;
  right: 4px !important;
  border-radius: 10px;
  z-index: 100;
  border: none;
  /* transition: all 1s; */
}
.dropdown-toggle{
  color: transparent;
}
.img-viewmenu {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.img-classroom {
  width: 151px;
  height: 37px;
}
.logo-classroom {
  display: none;
}
.img-menuitem {
  width: 18px;
  height: 14px;
}
.nav-sub-h1 {
  flex-direction: row;
}
.nav-sub-h2 {
  position: relative;
  flex-direction: row;
}

@media only screen and (max-width: 850px) {
 .nav-horizontal{
   display: grid;
   grid-template-rows: 1fr 1fr;
   text-align-last: center;
 }
 .nav-sub-h1 {
  grid-row: 1 span;
  
}
.nav-sub-h2 {
  grid-row: 2 span;
  margin-bottom: 1rem;
}
}
</style>