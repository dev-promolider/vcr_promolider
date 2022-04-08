<template>
  <div>
    <DashboardProducer v-if="producer"/>
    <DashboardStudent v-if="student"/>
  </div>
</template>
<script>
import DashboardProducer from "@/components/dashboard";
import DashboardStudent from "@/components/Student/dashboard";
export default {
  name: "Dashboard",
  components: {
    DashboardProducer,
    DashboardStudent
  },
  data() {
    return {
      producer: false,
      student: false
    };
  },
  created() {
    if (localStorage.getItem("rol_user") != 3) {
      this.producer = !this.producer;
    }else if(localStorage.getItem("rol_user") == 3){
      this.student = !this.student;
    }
  }
};
</script>

<style scoped>
/* .container-fluid {
   overflow: auto !important; 
} */

/* .container-fluid::-webkit-scrollbar {
  display: none; 
} */
</style>