<template>
  <div class="tw-relative">
    <DashboardProducer v-if="producer" />
    <DashboardStudent v-if="student" />
    <DashboardDistributor v-if="distributor" />

    <!-- Botón Flotante de Ruleta Exclusivo de Inicio (Compacto 46px) -->
    <div class="tw-fixed tw-bottom-6 tw-right-6 tw-z-40 tw-group">
      <button
        @click="showRoulette = true"
        class="tw-w-11 tw-h-11 tw-rounded-full tw-bg-gradient-to-r tw-from-[#18d600] tw-to-[var(--primary-color)] tw-p-2 tw-shadow-[0_6px_20px_rgba(24,214,0,0.35)] hover:tw-scale-110 hover:tw--translate-y-1 tw-transition-all tw-duration-200 tw-flex tw-items-center tw-justify-center border tw-border-white/20"
        title="Gana recompensas en la Ruleta"
      >
        <img
          src="@/assets/ruletaVerde.png"
          class="tw-w-full tw-h-full tw-object-contain"
          alt="Ruleta Promolíder"
        />
      </button>
      <!-- Tooltip sutil -->
      <span class="tw-absolute tw-bottom-full tw-right-0 tw-mb-2 tw-hidden group-hover:tw-block tw-bg-[var(--text-bold)] tw-text-white tw-text-xs tw-font-semibold tw-px-3 tw-py-1.5 tw-rounded-lg tw-shadow-xl tw-whitespace-nowrap tw-z-50">
        ¡Recompensa Diaria! 🎁
      </span>
    </div>

    <!-- Modal de Ruleta Compacto -->
    <div
      v-if="showRoulette"
      @click.self="showRoulette = false"
      class="tw-fixed tw-inset-0 tw-z-[60] tw-bg-black/60 tw-backdrop-blur-sm tw-flex tw-items-center tw-justify-center tw-p-4"
    >
      <div class="tw-max-w-sm tw-w-full tw-relative tw-bg-white dark:tw-bg-[#161e2e] tw-rounded-3xl tw-p-6 tw-shadow-2xl tw-border tw-border-gray-100 dark:tw-border-white/10 tw-animate-fade-in-up">
        <button
          @click="showRoulette = false"
          class="tw-absolute tw-top-4 tw-right-4 tw-w-8 tw-h-8 tw-rounded-full tw-bg-gray-100 dark:tw-bg-white/10 hover:tw-bg-gray-200 dark:hover:tw-bg-white/20 tw-text-gray-500 dark:tw-text-gray-300 hover:tw-text-gray-800 dark:hover:tw-text-white tw-flex tw-items-center tw-justify-center tw-transition-colors tw-z-10"
        >
          <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <VueWinWheel />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardProducer from "@/components/dashboard";
import DashboardStudent from "@/components/Student/dashboard";
import DashboardDistributor from "@/components/Distributor/distributor";
import VueWinWheel from "@/components/Student/dashboard/Roulette";
import { authGet } from "@/helpers/authStorage";

export default {
  name: "Dashboard",
  components: {
    DashboardProducer,
    DashboardStudent,
    DashboardDistributor,
    VueWinWheel,
  },
  data() {
    return {
      producer: false,
      distributor: false,
      student: false,
      showRoulette: false,
    };
  },
  async created() {
    let role = authGet("rol_user") || authGet("role_user");
    try {
      if (!role) {
        const res = await this.axios.get("/user/get-rolename");
        if (res && res.data && res.data.data) {
          role = res.data.data;
        }
      }
    } catch (e) {
      console.warn("Error fetching role:", e);
    }

    if (role == 1 || role == 2 || role === "Producer" || role === "Admin") {
      this.producer = true;
    } else if (role == 3 || role === "Distributor") {
      this.distributor = true;
    } else if (role == 4 || role === "Student") {
      this.student = true;
    } else {
      // Fallback a Producer dashboard para que se muestren las tarjetas principales
      this.producer = true;
    }
  },
};
</script>

<style scoped>
@media (max-width: 1000px) {
  .v-application--wrap {
    background-color: none !important;
  }
}
/* .container-fluid {
   overflow: auto !important; 
} */

/* .container-fluid::-webkit-scrollbar {
  display: none; 
} */

::-webkit-scrollbar {
  display: none;
}
</style>
