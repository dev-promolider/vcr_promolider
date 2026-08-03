<template>
  <div class="main_container tw-w-full tw-pt-2">
    <!-- 1. Tarjeta de métricas KPI principales (Mis Cursos, Mis Ventas, Mis Membresía, Mis Afiliados) -->
    <div class="tw-w-full tw-mb-4">
      <DataPrimaryUser />
    </div>

    <!-- 2. Sección de Tarjetas de Bienvenido & Mis Logros (Aprendizaje) -->
    <div class="tw-w-full tw-pt-2 tw-mb-2">
      <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
        <div>
          <KeepLearning />
        </div>
        <div>
          <Successes />
        </div>
      </div>
    </div>

    <!-- 3. Sección de Tarjetas de Mensajes y Ventas -->
    <div class="tw-w-full tw-pt-2 tw-mb-4">
      <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
        <div>
          <MessengerColletion />
        </div>
        <div>
          <ClienteVenta />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataPrimaryUser from "@/components/dashboard/DataPrimary/DataPrimaryUser.vue";
import MessengerColletion from "@/components/dashboard/Message/MessengerColletion.vue";
import ClienteVenta from "@/components/dashboard/SalesHistory/ClienteVenta.vue";
import KeepLearning from "@/components/Student/dashboard/KeepLearning";
import Successes from "@/components/Student/dashboard/Successes";

export default {
  name: "DashboardProducer",
  components: {
    DataPrimaryUser,
    MessengerColletion,
    ClienteVenta,
    KeepLearning,
    Successes,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.main_container {
  min-height: 100vh;
  width: 100%;
}
</style>
