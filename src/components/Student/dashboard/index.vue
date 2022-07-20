<template>
  <div class="content-student" style="min-height: 100vh">
          <div class="section-main" >
              <KeepLearning/>
              <Successes/>
          </div>
      
         <div :class="[ this.$vuetify.breakpoint.xs  ?  'm-3' : 'm-5']" >
            <div v-if="this.coursView > 0" >
              <CarrouselCourseViewed />
            </div>
          
            <div>
              <h4 ><strong>Cursos recomendados:</strong></h4>
              <RecommendedCourse/>  
          </div>
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
  grid-template-rows: 400px;
  grid-template-columns: repeat(2, 1fr);
  grid-column: span 2;
  gap: 10px;
  padding: 30px 70px 10px 50px;
}
@media (max-width:860px){
  .section-main{
    grid-template-columns: repeat(1,1fr);
    padding: 30px 20px;
    gap: 20px;
  }
}
</style>