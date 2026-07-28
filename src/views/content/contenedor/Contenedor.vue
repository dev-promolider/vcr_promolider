<template>
  <div>
    <div class="pref" v-if="mostrar">
        <Preferencias />
    </div>

    <div v-if="!mostrar">
      <NavBarV />
      <v-main app class="main-viewport-wrapper">
        <div class="main-viewport-card">
          <router-view />
        </div>
      </v-main>
      <img
        src="@/assets/ruletaVerde.png"
        class="btnflo"
        data-toggle="modal"
        data-target="#ruleta"
        alt=""
      />

      <!-- Modal -->
      <div
        class="modal fade"
        id="ruleta"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-body">
              <VueWinWheel />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBarV from "@/components/Navbar/NavBarV.vue";
import Preferencias from "@/views/content/preferences/PreferenceCateg.vue";
import { mapState } from "vuex";
import VueWinWheel from "@/components/Student/dashboard/Roulette";

export default {
  name: "Contenedor",
  components: {
    NavBarV,
    Preferencias,
    VueWinWheel,
  },
  data() {
    return {
      mostrar: false,
      status_user: null,
      barraMenu: true,
    };
  },

  computed: {
    ...mapState("course", ["courseHover"]),
  },
  methods: {
    barmenu() {
      this.barraMenu = !this.barraMenu;
    },
  },
  created() {
    this.status_user = localStorage.getItem("status_preference");
    if (this.status_user == 0) {
      this.mostrar = !this.mostrar;
    }
  },
};
</script>

<style lang="scss" scoped>
.main-viewport-wrapper {
  background-color: #0F1311 !important;
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  padding-right: 20px !important;
  min-height: 100vh;
  transition: padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.main-viewport-card {
  background-color: var(--hm-bg, #F5F4EE) !important;
  border-radius: 24px !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  min-height: calc(100vh - 32px);
  margin-left: 16px !important;
  padding: 28px 32px;
  overflow-y: auto;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 960px) {
  .main-viewport-wrapper {
    padding: 12px !important;
  }
  .main-viewport-card {
    border-radius: 16px !important;
    padding: 16px;
    min-height: calc(100vh - 24px);
  }
}

.btnflo {
  height: 60px;
  width: 60px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  transition: transform 0.3s ease; /* Agrega una transición suave */
}

.btnflo:hover {
  transform: scale(1.2) translateY(-10px); /* Aumenta el tamaño y mueve hacia arriba */
}

@media (max-width: 1000px) {
  .v-application--wrap {
    background-color: none !important;
    min-height: inherit;
  }
}
.view {
  overflow-y: scroll;
  background-repeat: none;
  background-size: 100% 100%;
  transition: 0.5s;
  backdrop-filter: blur(10px);
  height: 100vh;
}

// .view::-webkit-scrollbar {
//   display: none;
// }

.content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
}

.pref {
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 9999;
  background: var(--bg-content);
}

.content-user {
  display: flex;
  width: 100%;
  max-height: 100%;
  flex-direction: column;
}
@media screen and (max-width: 1024px) {
  .sidebar-mobile {
    position: absolute;
    z-index: 32;
  }
  .sidebar-none {
    position: absolute;
    z-index: 32;
  }
  .barrita {
    visibility: visible !important;
  }
}
.barrita {
  position: absolute;
  top: 0;
  margin: 1.3rem 1rem;
  z-index: 31;
  font-size: 25px;
  visibility: hidden;
  cursor: pointer;
}
// .background-router {
//   height: 90vh;
//   width: 100vw;
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
// }
</style>
