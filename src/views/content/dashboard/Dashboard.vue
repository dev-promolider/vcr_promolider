<template>
  <div>
    <DashboardProducer v-if="producer" />
    <!-- <DashboardStudent v-if="student" /> -->
    <DashboardDistributor v-if="distributor" />
  </div>
</template>
<script>
import DashboardProducer from "@/components/dashboard";
// import DashboardStudent from "@/components/Student/dashboard";
import DashboardDistributor from "@/components/Distributor/distributor";
export default {
  name: "Dashboard",
  components: {
    DashboardProducer,
    // DashboardStudent,
    DashboardDistributor,
  },
  data() {
    return {
      producer: false,
      distributor: false,
    };
  },
  created() {
    if (localStorage.getItem("rol_user") == 1) {
      this.producer = !this.producer;
      console.log(this.producer)
    } else if (localStorage.getItem("rol_user") == 3) {
      this.distributor = !this.distributor;
      console.log(this.distributor)
    } else if (localStorage.getItem("rol_user") == 2) {
      this.producer = !this.producer;
      console.log(this.distributor)
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
