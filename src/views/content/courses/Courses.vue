<template>
    <div class="all-course">
        <Courses/>    
    </div>
</template>
<script>
import Courses from "@/components/courses/Courses.vue";
export default {
  name: "Cursos",
  components: {
    Courses,
  },
};
</script>
<style scoped>
.all-course {
  width: 100%;
  padding-right: 0px;
  
  max-height: calc(100vh - 80px);
  overflow-x: hidden;
  overflow-y: scroll;
}
/* .all-course::-webkit-scrollbar {
  width: 7px;
} */
/* .all-courset::-webkit-scrollbar-thumb {
  background: #5cc151;
  border-radius: 25px;
} */
</style>