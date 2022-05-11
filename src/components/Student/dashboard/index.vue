<template>
  <div class="content-student">
      <div class="section-main">
          <KeepLearning/>
          <Successes/>
          <VueWinWheel/>
      </div>
      <div class="courses">
        <CarrouselCourseViewed/>
        <RecommendedCourse/>  
      </div>    
  </div>
</template>

<script>
import CarrouselCourseViewed from '@/components/courses/CarrouselCourseViewed.vue';
import RecommendedCourse from "@/components/Student/dashboard/RecommendedCourse";
import KeepLearning from './KeepLearning';
import Successes from './Successes';
import VueWinWheel from './Roulette'
export default {
  name: "DashboardStudent",
  components: { 
    CarrouselCourseViewed,
    RecommendedCourse, 
    KeepLearning, Successes ,
    VueWinWheel
    }
}
</script>
<style scoped>
.content-student{
  display: flex;
  flex-direction: column;
}
.courses{
  flex-direction: column;
  display: flex;
  width: 100%;
}
.section-main{
  display: grid;
  grid-template-rows: 300px;
  /* grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr)); */
  grid-template-columns: 1fr 0.7fr;
  grid-column: span 2;
  gap: 70px;
  padding: 39px 70px 0px 100px;
}
@media (max-width:860px){
  .section-main{
    grid-template-columns: repeat(1,1fr);
    padding: 30px 20px;
  }
}
</style>