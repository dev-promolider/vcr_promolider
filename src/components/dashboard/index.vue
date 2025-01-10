<template>
  <div class="main_container container-fluid pt-3">
    <!-- obtener los datos totales de cursos, ventas, tipo de plan, afiliacion -->
    <div class="container my-5" style="background-color: white; border-radius: 15px">
      <DataPrimaryUser />
    </div>
    <!-- Coleccion de mensajes para el productor -->
    <div class="container pt-5">
      <div class="row row-end d-flex align-items-center justify-content-between">
        <div class="col-12 col-md-5" style="background-color: white; border-radius: 15px">
          <MessengerColletion />
        </div>
        <div class="col-12 col-md-5" style="background-color: white; border-radius: 15px">
          <ClienteVenta />
        </div>
      </div>
    </div>
    <div class="share-network-list">
      <ShareNetwork v-for="network in networks" :network="network.network" :key="network.network"
        :style="{ backgroundColor: network.color }" :url="sharing.url" :title="sharing.title"
        :description="sharing.description" :quote="sharing.quote" :hashtags="sharing.hashtags"
        :twitterUser="sharing.twitterUser">
        <i :class="network.icon"></i>
        <span>{{ network.name }}</span>
      </ShareNetwork>
    </div>
  </div>
</template>

<script>
import DataPrimaryUser from "@/components/dashboard/DataPrimary/DataPrimaryUser.vue";
import MessengerColletion from "@/components/dashboard/Message/MessengerColletion.vue";
import ClienteVenta from "@/components/dashboard/SalesHistory/ClienteVenta.vue";
export default {
  name: "DashboardProducer",
  components: {
    DataPrimaryUser,
    MessengerColletion,
    ClienteVenta,
  },
  data() {
    return {
      sharing: {
        url: "https://news.vuejs.org/issues/180",
        title:
          "Say hi to Vite! A brand new, extremely fast development setup for Vue.",
        description:
          'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
        quote: "The hot reload is so fast it's near instant. - Evan You",
        hashtags: "vuejs,vite,javascript",
      },

      networks: [],
    };
  },
};
</script>

<style scoped>
.main_container {
  background-color: #f2f5fa;
  height: 700px;
}

@media (max-width: 1000px) {
  .v-application--wrap {
    background-color: none !important;
  }
}

.row-end {
  margin-bottom: 60px;
}

@media screen and (max-width: 769px) {
  .row-end {
    gap: 20px;
  }
}

a {
  flex: none;
  color: #ffffff !important;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
  text-decoration: none !important;
}

.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}

a[class^="share-network-"] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
}

a[class^="share-network-"] span {
  padding: 0 10px;
  flex: 1 1;
  font-weight: 500;
}
</style>
