<template>
  <div class="content-navbarv">
    <div class="title-aula">
      <img src="../../assets/logo-aula.png" />
    </div>
    <ul class="sidebar nav flex-column">
      <li
        @click="sendTitle('Inicio')"
        class="nav-item"
        :class="{ 'is-active': isActive('home') }"
      >
        <router-link to="/home" class="nav-link link-v">
          <img src="./../../assets/home.svg" alt="" />
         Inicio
        </router-link>
      </li>

      <li @click="sendTitle('Cursos')" class="nav-item">
        <router-link
          to="/courses"
          class="nav-link link-v"
          :class="{ 'is-active': isActive('courses') }"
        >
          <img src="./../../assets/courses.svg" alt="" />
          Cursos
        </router-link>
      </li>

      <li @click="sendTitle('Mi aprendizaje')" class="nav-item">
        <router-link
          to="/suscription-user"
          class="nav-link link-v"
          :class="{ 'is-active': isActive('suscription-user') }"
        >
          <img src="./../../assets/courses.svg" alt="" />
          Aprendizaje
        </router-link>
      </li>

        <li @click="sendTitle('Mis Certificaciones')" class="nav-item">
        <router-link
          to="/certificado-user"
          class="nav-link link-v"
          :class="{ 'is-active': isActive('certificado-user') }"
        >
          <img src="./../../assets/courses.svg" alt="" />
          Certificaciones
        </router-link>
      </li>

      <li @click="sendTitle('Mensajes')" class="nav-item">
        <router-link
          to="/messages"
          class="nav-link link-v"
          :class="{ 'is-active': isActive('messages') }"
        >
          <img src="./../../assets/messange.svg" alt="" />
          Mensajes
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "NavBarV",
  computed: {
    ...mapState("sections", ["topSection"]),
  },
  methods: {
    isActive(path) {
      // if (path === "/home") {
      //   return this.$route.name === "home";
      // }
      return this.$route.path.includes(path);
    },
    sendTitle(payload) {
      this.$store.commit("sections/setTopSection", payload);
      this.$emit("closeMenu")
    },
    //...mapActions("course", ["getTitle"]),
  },
  mounted() {},
};
</script>
<style lang="scss" scope>
:root {
  --text-size: 14px;
  --active-link: 4px solid #1ae800;
  --opcion-link: invert(0.5) sepia(5%) saturate(5162%) hue-rotate(64deg)
    brightness(96%) contrast(92%);
}
.content-navbarv {
  width: 220px;
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
.sidebar{
  min-width: 220px;
}
.nav-item {
  margin-bottom: 13px;
}
.link-v {
  font-size: var(--text-size);
  color: #fff;
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
  margin-right: 10px;
}
</style>
