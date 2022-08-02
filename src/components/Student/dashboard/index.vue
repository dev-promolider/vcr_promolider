<template>
  <div class="content-student" style="min-height: 100vh">
          <div class="section-main" >
              <KeepLearning/>
              <Successes/>
          </div>
         <div  :class="[ this.$vuetify.breakpoint.xs  ?  'm-3' : 'm-5']" >
            <template v-if="!isLoading">
              <div v-if="this.coursView > 0" >
                <CarrouselCourseViewed />
              </div>
              <div v-if="this.relatedCourses.length > 0">
                <RecommendedCourse  :datos="relatedCourses"/>  
              </div>
              <div class="text-h5 font-weight-bold" v-else>
                  Cursos recomendados
              </div>
              <div v-if="((this.coursView === 1 ||  0)) && (this.relatedCourses.length === 0) " >
                  <div class="no-result center-element d-flex"><span>Lo sentimos, aún no hay cursos disponibles.</span></div>
              </div>
            </template>
            <template v-if="isLoading" >
                        <v-row >
                          <v-col cols="12" xs="1" sm="6" md="4" lg="3"  v-for="i in 4" :key="i" >
                                <v-skeleton-loader
                                    class="m-1"
                                    max-width="500"
                                    type="image"
                                ></v-skeleton-loader>
                          </v-col>
                        </v-row>
            </template>
        </div> 
  </div>
</template>

<script>
import CarrouselCourseViewed from '@/components/courses/CarrouselCourseViewed.vue';
import RecommendedCourse from "@/components/Student/dashboard/RecommendedCourse";
import KeepLearning from './KeepLearning';
import Successes from './Successes';
import { mapActions } from 'vuex';

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
        relatedCourses: [],
        isLoading: true
      }
    },
    methods: {
    ...mapActions('course', ['getCourseRelated']),
      mostrarAprendiendo(){
        let datos = null
        this.axios.get('course/last-courses-rep')
        .then((res) =>{
          datos = res.data.data;
          this.coursView = datos.length
        })
      },
      async getAttributes() {
        let datos = await this.getCourseRelated()
        this.relatedCourses = datos
        this.isLoading = false
      },
    },
    created() {
     this.mostrarAprendiendo();
     this.getAttributes()
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