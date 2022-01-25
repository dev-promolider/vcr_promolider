<template>
    <div class="all-course">
        <Cursos/>
    
    </div>
</template>
<script>
import Cursos from "@/components/courses/Courses.vue";
export default {
  name: "Cursos",
  components: {
    Cursos,
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