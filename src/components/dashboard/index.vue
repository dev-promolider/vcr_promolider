<template>
  <div class="main_container container-fluid pt-2">
    <!-- 1. Tarjeta de métricas KPI principales (Mis Cursos, Mis Ventas, Mis Membresía, Mis Afiliados) -->
    <div class="container my-3 px-0">
      <div class="hallmark-card p-4 shadow-sm">
        <DataPrimaryUser />
      </div>
    </div>

    <!-- 2. Sección de Tarjetas de Bienvenido & Mis Logros (Aprendizaje) -->
    <div class="container pt-2 px-0 mb-2">
      <div class="row d-flex align-items-stretch justify-content-between">
        <div class="col-12 col-md-6 mb-3">
          <KeepLearning />
        </div>
        <div class="col-12 col-md-6 mb-3">
          <Successes />
        </div>
      </div>
    </div>

    <!-- 3. Sección de Tarjetas de Mensajes y Ventas -->
    <div class="container pt-2 px-0 mb-4">
      <div class="row d-flex align-items-stretch justify-content-between">
        <div class="col-12 col-md-6 mb-3">
          <MessengerColletion />
        </div>
        <div class="col-12 col-md-6 mb-3">
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
