<template>
  <div>
    <!-- Contenedor de Preferencias Iniciales -->
    <div class="tw-fixed tw-inset-0 tw-z-50" style="background-color: var(--bg-main);" v-if="mostrar">
      <Preferencias />
    </div>

    <!-- Contenedor Principal del Dashboard (Flex Layout como el CRM) -->
    <div v-if="!mostrar" class="tw-min-h-screen tw-flex" style="background-color: var(--bg-main); transition: background-color 0.3s ease;">
      <!-- Componente Sidebar (Aside) -->
      <NavBarV />
      
      <!-- Wrapper principal flex flex-1 que se ajusta dinámicamente al colapsar el sidebar -->
      <div class="tw-flex-1 tw-min-w-0 tw-flex tw-flex-col tw-relative tw-z-[5]">
        
        <!-- Contenido principal y el viewport -->
        <main class="tw-p-3 md:tw-p-4 tw-min-h-screen tw-flex tw-flex-col">
          <!-- Tarjeta interior "Contenedor" para router-view -->
          <div class="tw-flex-1 tw-rounded-2xl tw-border tw-shadow-[0_12px_32px_rgba(0,0,0,0.22)] tw-p-4 md:tw-p-8 tw-overflow-y-auto tw-transition-colors tw-duration-300" style="background-color: var(--card-bg); border-color: var(--border-color);">
            <router-view />
          </div>
        </main>

      </div>

      <!-- Viewport Principal -->
    </div>

    <!-- Global Shopping Cart Modal -->
    <ShoppingCartModal />
  </div>
</template>

<script>
import NavBarV from "@/components/Navbar/NavBarV.vue";
import Preferencias from "@/views/content/preferences/PreferenceCateg.vue";
import ShoppingCartModal from "@/components/Cart/ShoppingCartModal.vue";
import { mapState } from "vuex";
import { authGet } from "@/helpers/authStorage";

export default {
  name: "Contenedor",
  components: {
    NavBarV,
    Preferencias,
    ShoppingCartModal,
  },
  data() {
    return {
      mostrar: false,
      status_user: null,
    };
  },
  computed: {
    ...mapState("course", ["courseHover"]),
  },
  created() {
    this.status_user = authGet("status_preference");
    if (this.status_user == 0) {
      this.mostrar = !this.mostrar;
    }
  },
};
</script>

<style scoped>
/* Sin Vuetify ni Bootstrap. Todo nativo con TailwindCSS */
</style>
