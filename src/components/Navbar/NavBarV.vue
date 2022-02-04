<template>
  <div class="content-navbarv">
    <div class="title-aula">
      <img src="../../assets/logo-aula.png" />
    </div>
    <ul class="nav">
      <li
        @click="sendTitle('Inicio')"
        class="nav-item"
        :class="{ 'is-active': isActive('/home') }">
        <router-link
          to="/home"
          class="nav-link link-v"
        >
          <img src="./../../assets/home.svg" alt="" />
          Inicio
        </router-link>
      </li>

      <li
        @click="sendTitle('Cursos')"
        class="nav-item"
        :class="{ 'is-active': isActive('cursos') }">
        <router-link
          to="/courses"
          class="nav-link link-v"
        >
          <img src="./../../assets/courses.svg" alt="" />
          Cursos
        </router-link>
      </li>

      <li
        @click="sendTitle('Mensajes')"
        class="nav-item"
      >
        <router-link
          to="/messages"
          class="nav-link link-v"
          :class="{ 'is-active': isActive('messages') }"
        >
          <img src="./../../assets/messange.svg" alt="" />
          Mensajes
        </router-link>
      </li>

      <li @click="sendTitle('Ventas')" class="nav-item">
        <a class="nav-link link-v" href="#">
          <img src="./../../assets/sales.svg" alt="" />
          Ventas
        </a>
      </li>
      <li @click="sendTitle('Estadisticas')" class="nav-item">
        <a class="nav-link link-v" href="#">
          <img src="./../../assets/estadisticas.svg" alt="" />
          Estadisitcas
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link link-v" href="#">
          <img src="./../../assets/roles-permisos.svg" alt="" />
          Roles y Permisos
        </a>
      </li>
      <button @click="getTitle" :disabled="isLoading">ver</button>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "NavBarV",
  computed: {
    ...mapState("course", ["isLoading"]),
  },
  methods: {
    isActive(path) {
      // if (path === "/home") {
      //   return this.$route.name === "home";
      // }
      return this.$route.path.includes(path);
    },
    sendTitle(payload) {
      console.log("ACA ESTOY");
      this.$store.commit("course/setTitle", payload);
    },
    ...mapActions("course", ["getTitle"]),
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>
<style scope>
:root {
  --text-size: 14px;
  --active-link: 4px solid #5cc151;
  --opcion-link: invert(0.5) sepia(5%) saturate(5162%) hue-rotate(64deg)
    brightness(96%) contrast(92%);
}
.content-navbarv {
  width: 100%;
  height: 100%;
}
.title-aula {
  display: flex;
  align-items: center;
  height: 104px;
  padding: 6px 0px 0px 18px;
}
.title-aula > img {
  width: 151px;
  height: 37px;
}
.nav {
  display: flex;
  flex-direction: column;
}
.nav-item {
  margin-bottom: 13px;
}
.link-v {
  font-size: var(--text-size);
  color: #fff;
  padding: 0;
}
.is-active {
  border-left: var(--active-link);
  filter: var(--opcion-link);
}
.link-v:hover {
  filter: var(--opcion-link);
}
.nav-link > img {
  width: 24px;
  height: 24px;
  margin-right: 20px;
}
</style>
