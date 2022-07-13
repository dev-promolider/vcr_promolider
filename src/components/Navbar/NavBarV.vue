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
          style="color: #ffffff"
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
              href="https://promolider.org/sistema/index.html"
              target="_blank"
            >
              <v-list-item-icon style="margin-right: 5px" class="px-0">
                <img
                  src="@/assets/promolider_logo.png"
                  alt="promolider"
                  style="padding: 3px; width: 150%; height: 100%"
                />
              </v-list-item-icon>
              <v-list-item-title>
                <h4
                  style="
                    color: #ffffff;
                    letter-spacing: 3.5px;
                    padding-top: 4px;
                  "
                >
                  Promolíder
                </h4>
              </v-list-item-title>
            </v-list-item>
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
                >Preguntas Frecuentes</v-list-item-title
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
        { nombre: "Marketplace", icon: "store", path: "courses" },
        { nombre: "Mi Aprendizaje", icon: "book", path: "suscription-user" },
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
<style lang="scss" scoped>
.color-drawer {
  background: #35424a !important;
}
a:hover {
  text-decoration: none;
}
</style>
