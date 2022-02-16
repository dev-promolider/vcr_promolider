<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-8 col-lg-12">
      <!-- obtener los datos totales de cursos, ventas, tipo de plan, afiliacion -->
        <DataPrimaryUser />

        <!-- //importe atributos para verificar datos del api -->
        <Attribute />

        <!--pruba del cliente--->

        <!-- Coleccion de mensajes para el productor -->
        <MessengerColletion />
      </div>

      <div class="col-xl-4 col-lg-12 ">
        <ClienteVenta />
      </div>
    </div>
    
  </div>
  
</template>
<script>
import Attribute from "@/components/dashboard/Attribute/Attribute.vue";
import DataPrimaryUser from "@/components/dashboard/DataPrimaryUser.vue";
import MessengerColletion from "@/components/dashboard/Message/MessengerColletion.vue";
import ClienteVenta from "@/components/dashboard/SalesHistory/ClienteVenta.vue";

export default {
  name: "Dashboard",
  components: {
    DataPrimaryUser,
    MessengerColletion,
    Attribute,
    ClienteVenta,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
  .container-fluid{
    overflow: auto !important;
  }

  .container-fluid::-webkit-scrollbar {
    display: none;
  }
</style>