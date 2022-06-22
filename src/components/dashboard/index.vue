<template>
  <div class="container-fluid">
        <!-- obtener los datos totales de cursos, ventas, tipo de plan, afiliacion -->
      <div class="container mt-5">
        <DataPrimaryUser />
      </div >
        <!-- //importe atributos para verificar datos del api -->
        <!-- <Attribute /> -->
        <!-- Coleccion de mensajes para el productor -->
      <div class="container mt-5">
        <div class="row row-end ">
          <div class="col-12 col-md-6">
            <MessengerColletion />
            <CardsGame />
          </div>
          <div class="col-12 col-md-6">
            <ClienteVenta />
          </div>
        </div>
      </div>
      
  </div>
</template>
<script>
//import Attribute from "@/components/dashboard/Attribute/Attribute.vue";
import DataPrimaryUser from "@/components/dashboard/DataPrimary/DataPrimaryUser.vue";
import MessengerColletion from "@/components/dashboard/Message/MessengerColletion.vue";
import ClienteVenta from "@/components/dashboard/SalesHistory/ClienteVenta.vue";
import CardsGame from '@/components/dashboard/CardsGame/CardsGame.vue';
export default {
  name: "DashboardProducer",
  components: {
    DataPrimaryUser,
    MessengerColletion,
    //Attribute,
    ClienteVenta,
    CardsGame,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.row-end{
    margin-bottom: 60px;
}
@media screen and (max-width:769px) {
  .row-end{
    gap: 20px
  }
}
/* .container-fluid {
  overflow: auto !important;
}

.container-fluid::-webkit-scrollbar {
  display: none;
} */
</style>