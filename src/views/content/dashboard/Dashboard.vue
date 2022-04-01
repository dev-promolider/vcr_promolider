<template>
  <div>
    <DashboardProducer v-if="student"/>
    <DashboardStudent />
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
      student: false
    };
  },
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