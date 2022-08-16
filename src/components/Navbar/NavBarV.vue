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
        <v-list-item
          link
          style="color: #ffffff; margin-bottom: 25px !important"
          v-for="(link, index) in listNavBar"
          :key="index"
          :to="{ name: link.path }"
        >
          <v-list-item-icon class="mr-3">
            <v-icon style="color: #ffffff">{{ `mdi-${link.icon}` }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.nombre }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div>
          <v-list nav dense>
            <v-list-item
              link
              :to="{ name: 'preguntas-frecuentes' }"
              style="color: #131b1e; font-size: 18px"
              class="text-decoration-none"
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
      listNavBar: [
        { nombre: "Inicio", icon: "home", path: "home" },
        { nombre: "Mi Aprendizaje", icon: "book", path: "suscription-user" },
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
  },
  mounted() {},
};
</script>
<style lang="scss">
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
  -webkit-box-shadow: inset 0 0 6px #5d5d5d;
  background-color: #5d5d5d;
}
.v-navigation-drawer__content::-webkit-scrollbar {
  width: 0px;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px #424242;
  background-color: #424242;
}
</style>
