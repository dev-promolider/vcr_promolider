<template>
  <div>
      <div class="section-main">
          <KeepLearning/>
          <Successes/>
      </div>
      <Carrousel-course-viewed/>
      <RecommendedCourse/>      
  </div>
</template>

<script>
import CarrouselCourseViewed from '../../courses/CarrouselCourseViewed.vue';
import RecommendedCourse from "./RecommendedCourse";
import KeepLearning from './KeepLearning';
import Successes from './Successes';
export default {
  name: "DashboardStudent",
  components: { 
    CarrouselCourseViewed,RecommendedCourse, 
    KeepLearning, Successes 
    }
}
</script>
<style>
.section-main{
  display: grid;
  grid-template-rows: 300px;
  /* grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr)); */
  grid-template-columns: repeat(2,1fr);
  grid-column: span 2;
  gap: 70px;
  padding: 30px 70px 0px 100px;
}
@media (max-width:860px){
  .section-main{
    grid-template-columns: repeat(1,1fr);
    padding: 30px 20px;
  }
}
</style>