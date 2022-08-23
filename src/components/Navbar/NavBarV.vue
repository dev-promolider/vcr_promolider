<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
      :expand-on-hover="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
      :mini-variant="mini"
      class="color-drawer"
    >
      <v-list>
        <v-list-item class="px-2" link :to="{ name: 'perfil' }">
          <v-list-item-avatar class="mr-1">
            <v-img :src="this.img"></v-img>
          </v-list-item-avatar>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title style="color: #ffffff">
                {{ name }}
              </v-list-item-title>
              <v-list-item-subtitle style="color: #ffffff">{{
                email
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>
      </v-list>
      <v-list nav dense>
        <template v-if="showNav">
          <template v-for="(link, index) in listNavBar">
            <template v-if="role == 'Producer'">
                <v-list-item
                  link
                  style="color: #ffffff; margin-bottom: 25px !important"
                  :key="index"
                  :to="{ name: link.path }"
                >
                    <v-list-item-icon class="mr-3">
                      <v-icon style="color: #ffffff">{{ `mdi-${link.icon}` }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ link.nombre }}</v-list-item-title>
                </v-list-item>             
            </template>
            <template v-else>

                <template v-if="link.nombre != 'Mis Cursos'">
                  <v-list-item
                      link
                      style="color: #ffffff; margin-bottom: 25px !important"
                      :key="index"
                      :to="{ name: link.path }"
                      >
                      <v-list-item-icon class="mr-3">
                        <v-icon style="color: #ffffff">{{ `mdi-${link.icon}` }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>{{ link.nombre }}</v-list-item-title>
                  </v-list-item>
                </template>
            </template>
          </template>
        </template>
        <template v-else>
          <div class="myb-9 box animation">
            </div>
          <div v-for="qty in listNavBar.length-1" :key="qty">
            <div class="my-9 box animation">
            </div>
          </div>
        </template>
      </v-list>

      <template v-slot:append>
        <div>
          <v-list nav dense>
            <v-list-item
              link
              :to="{ name: 'preguntas-frecuentes' }"
              style="color: #131b1e; font-size: 18px"
              class="text-decoration-none list-item"
            >
              <v-list-item-icon style="margin-right: 5px">
                <v-icon class="" style="color: #ffffff">mdi-help</v-icon>
              </v-list-item-icon>
              <v-list-item-title style="color: #ffffff; font-size: 14px"
                >Preguntas frecuentes</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </div>
      </template>
    </v-navigation-drawer>

    <NavBar @click="changeDrawer" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import NavBar from "@/components/Navbar/NavBar.vue";
export default {
  name: "NavBarV",
  components: {
    NavBar,
  },
  props: {},
  data() {
    return {
      drawer: null,
      isShowDrawer: null,
      email: localStorage.getItem("email_user"),
      name: localStorage.getItem("name_user"),
      img: localStorage.getItem("photo_user"),
      showNav: false,
      role: null,
      listNavBar: [
        { nombre: "Inicio", icon: "home", path: "home" },
        { nombre: "Mi Aprendizaje", icon: "book", path: "suscription-user" },
        { nombre: "Mis Cursos", icon: "book-check", path: "myCourses" },
        { nombre: "Marketplace", icon: "store", path: "courses" },
        {
          nombre: "Mis Certificaciones",
          icon: "school",
          path: "certificado-user",
        },
        { nombre: "Mensajes", icon: "message-processing", path: "messages" },
        { nombre: "Logros", icon: "trophy", path: "logros" },
        { nombre: "Clasificación", icon: "star", path: "leaderBoard" },
      ],
    };
  },
  computed: {
    ...mapState("sections", ["topSection"]),
    mini: {
      get() {
        return !this.$vuetify.breakpoint.xs ? true : false;
      },
      set(value) {
        return value;
      },
    },
  },
  methods: {
    changeDrawer(drawer) {
      this.drawer = drawer;
    },
    async getRole(){
      this.axios.get('/user/get-rolename').then((response) => {
        this.role = response.data.data;
        this.showNav = true;
      })
    }
  },
  mounted() {
    this.getRole();
  },
};
</script>
<style lang="scss">
.box{
  height: 25px;
  border-radius: 5px;
  width: 80%;
  margin: auto;
}
.animation{
  animation: pulsos 1s infinite;
}
@keyframes pulsos {
  0% {
    background: #eee;
  }
  50% {
    background: #bfbfbf;
  }
  100% {
    background: #eee;
  }
}
.mod {
  padding-left: 20px;
  padding-right: 20px;
}
.list-item {
  height: 50px;
}
.color-drawer {
  // background: #35424a !important;
  background: #131b1e !important;
}
a:hover {
  text-decoration: none;
}
.v-list-item--active {
  background-color: #000000;
  color: #1ae800 !important;
}

.v-navigation-drawer__content::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px #5d5d5d;
  -webkit-box-shadow: inset 0 0 6px #5d5d5d;
  background-color: #5d5d5d;
}
.v-navigation-drawer__content::-webkit-scrollbar {
  width: 0px;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px #424242;
  box-shadow: inset 0 0 6px #424242;
  background-color: #424242;
}
</style>
