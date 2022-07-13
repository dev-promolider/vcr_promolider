<template>
  <div class="container-fluid pt-3">
    <!-- obtener los datos totales de cursos, ventas, tipo de plan, afiliacion -->
    <div
      class="container my-5"
      style="box-shadow: 1px 1px 8px #131b1e; border-radius: 15px"
    >
      <DataPrimaryUser />
    </div>
    <!-- //importe atributos para verificar datos del api -->
    <!-- <Attribute /> -->
    <!-- Coleccion de mensajes para el productor -->
    <div class="container pt-5">
      <div
        class="row row-end d-flex align-items-center justify-content-between"
      >
        <div
          class="col-12 col-md-5"
          style="box-shadow: 1px 1px 8px #131b1e; border-radius: 15px"
        >
          <MessengerColletion />
        </div>
        <div
          class="col-12 col-md-5"
          style="box-shadow: 1px 1px 8px #131b1e; border-radius: 15px"
        >
          <ClienteVenta />
        </div>
      </div>
    </div>
    <div class="share-network-list">
      <ShareNetwork
        v-for="network in networks"
        :network="network.network"
        :key="network.network"
        :style="{ backgroundColor: network.color }"
        :url="sharing.url"
        :title="sharing.title"
        :description="sharing.description"
        :quote="sharing.quote"
        :hashtags="sharing.hashtags"
        :twitterUser="sharing.twitterUser"
      >
        <i :class="network.icon"></i>
        <span>{{ network.name }}</span>
      </ShareNetwork>
    </div>
  </div>
</template>
<script>
//import Attribute from "@/components/dashboard/Attribute/Attribute.vue";
import DataPrimaryUser from "@/components/dashboard/DataPrimary/DataPrimaryUser.vue";
import MessengerColletion from "@/components/dashboard/Message/MessengerColletion.vue";
import ClienteVenta from "@/components/dashboard/SalesHistory/ClienteVenta.vue";
export default {
  name: "DashboardProducer",
  components: {
    DataPrimaryUser,
    MessengerColletion,
    //Attribute,
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

      networks: [
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2",
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "fab fah fa-lg fa-linkedin",
          color: "#007bb5",
        },
        {
          network: "pinterest",
          name: "Pinterest",
          icon: "fab fah fa-lg fa-pinterest",
          color: "#bd081c",
        },
        {
          network: "skype",
          name: "Skype",
          icon: "fab fah fa-lg fa-skype",
          color: "#00aff0",
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa-telegram-plane",
          color: "#0088cc",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2",
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366",
        },
      ],
    };
  },
};
</script>

<style scoped>
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
/* .container-fluid {
  overflow: auto !important;
}

.container-fluid::-webkit-scrollbar {
  display: none;
} */
</style>
