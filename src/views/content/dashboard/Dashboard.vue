<template>
  <div>
    <DashboardProducer v-if="producer" />
    <DashboardStudent v-if="student" />
    <DashboardDistributor v-if="distributor" />
  </div>
</template>
<script>
import DashboardProducer from "@/components/dashboard";
import DashboardStudent from "@/components/Student/dashboard";
import DashboardDistributor from "@/components/Distributor/distributor";
export default {
  name: "Dashboard",
  components: {
    DashboardProducer,
    DashboardStudent,
    DashboardDistributor,
  },
  data() {
    return {
      producer: false,
      distributor: false,
      student: false,
    };
  },
  created() {
    const role = localStorage.getItem("rol_user");
    if (role == 1 || role == 2) {
      this.producer = true;
    } else if (role == 3) {
      this.distributor = true;
    } else {
      this.student = true;
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
