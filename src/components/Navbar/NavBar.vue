<template>
  <div class="nav-general d-flex">
    <ul class="nav seccion justify-content-star align-self-center">
      <li class="nav-item logo-king">
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
      <ul class="nav nav-sub-h1 justify-content-end align-items-center">
        <li class="nav-item">
          <span class="nav-link text-dark">
            <img class="img-puntos" src="../../assets/logo-puntos.png" />
            <b>173</b> Puntos
          </span>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <img @click="sendTitle()" class="img-help" src="../../assets/help.png" />
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <img class="img-help" src="../../assets/notification.png" />
          </a>
        </li>
      </ul>
      <ul class="nav nav-sub-h2 justify-content-between align-items-center">
        <li class="nav-item logo-classroom">
          <span class="nav-link pl-2 pr-1" >
            <img class="img-classroom" src="../../assets/logo-aula3.png" />
          </span>
        </li>
        <li class="nav-item profile">
          <span class="submenu">
            <img class="img-photo" src="../../assets/logo-perfil.png" />
            <a class="viewmenu" href="#" v-on:click="desplegar()">
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
          <a class="dropdown-item" href="#" @click="closeSesion()">Sign out </a>
        </div>
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
  background: #ecf0f3;
  border-radius: 60px;
  border: none;
  width: 108px;
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
  width: 25px;
  height: 29.03px;
  margin-right: 8px;
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
  border-radius: 160px;
}
.viewmenu {
  border-style: none;
  background: none;
}
.viewmenu-list {
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 4px 22px #e5e5e5;
  border-radius: 15px;
  width: 226px;
  height: 207px;
  top: 72px;
  right: 4px;
  border-radius: 10px;
  z-index: 100;
  transition: all 1s;
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

@media only screen and (max-width: 671px) {
  .nav-general {
    height: 130px;
    justify-content: space-between;
    align-items: center;
  }
  .nav-horizontal {
    width: 100%;
    justify-content: space-between;
    padding-right: 0px;
    background-color: rgb(255, 255, 255);
    flex-direction: column-reverse;
  }
  .nav-sub-h2 {
    padding-bottom: 10px;
  }
  .viewmenu-list {
    top: 70px;
    right: 10px;
  }
  .logo-classroom {
    display: inline-block;
  }
  .seccion {
    width: 0%;
    visibility: hidden;
  }
  .logo-king {
    display: none;
  }
  .profile {
    margin-right: 8px;
  }
}
</style>