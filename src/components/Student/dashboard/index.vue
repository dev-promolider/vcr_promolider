<template>
  <div class="content-student">
      <div class="section-main">
          <KeepLearning/>
          <Successes/>
      </div>
      
          
          <div v-if="this.coursView > 0" class="m-5">
          <CarrouselCourseViewed />
        </div>
        
          <div  class="m-5">
          <h4><strong>Cursos recomendados:</strong></h4>
          <RecommendedCourse/>  
         </div>
  </div>
</template>

<script>
import CarrouselCourseViewed from '@/components/courses/CarrouselCourseViewed.vue';
import RecommendedCourse from "@/components/Student/dashboard/RecommendedCourse";
import KeepLearning from './KeepLearning';
import Successes from './Successes';

export default {
  name: "DashboardStudent",
  components: { 
    CarrouselCourseViewed,
    RecommendedCourse, 
    KeepLearning, Successes ,
    

    },
    data() {
      return {
        coursView:null,
      }
    },

    mounted() {
    },

    methods: {
      mostrarAprendiendo(){
        let datos = null
        this.axios.get('course/last-courses-rep')
        .then((res) =>{
          datos = res.data.data;
          this.coursView = datos.length
        })
      },
    },
    created() {
    this.mostrarAprendiendo();
  },
}
</script>
<style scoped>
.content-student{
  display: flex;
  flex-direction: column;
}

.section-main{
  display: grid;
  grid-template-rows: 300px;
  grid-template-columns: repeat(3, 1fr);
  grid-column: span 2;
  gap: 70px;
  padding: 30px 70px 0px 50px;
}
@media (max-width:860px){
  .section-main{
    grid-template-columns: repeat(1,1fr);
    padding: 30px 20px;
  }
}
</style>