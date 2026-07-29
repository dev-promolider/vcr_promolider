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
  async created() {
    let role = localStorage.getItem("rol_user") || localStorage.getItem("role_user");
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
