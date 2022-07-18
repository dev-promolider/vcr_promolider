<template>
  <div>
    <DashboardProducer v-if="producer" />
    <DashboardStudent v-if="student" />
  </div>
</template>
<script>
import DashboardProducer from "@/components/dashboard";
import DashboardStudent from "@/components/Student/dashboard";
export default {
  name: "Dashboard",
  components: {
    DashboardProducer,
    DashboardStudent,
  },
  data() {
    return {
      producer: false,
      student: false,
    };
  },
  created() {
    if (localStorage.getItem("rol_user") == 1) {
      this.producer = !this.producer;
    } else if (localStorage.getItem("rol_user") == 3) {
      this.student = !this.student;
    } else if (localStorage.getItem("rol_user") == 2) {
      this.producer = !this.producer;
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
