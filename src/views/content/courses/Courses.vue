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
  /* flex-grow: 1; */
  width: 100%;
  padding: 10px 2px;
  max-height: calc(100vh - 80px);
  overflow: auto;
}
/* .all-course::-webkit-scrollbar {
  width: 7px;
} */
/* .all-courset::-webkit-scrollbar-thumb {
  background: #5cc151;
  border-radius: 25px;
} */
</style>