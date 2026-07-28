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
        this.axios.get('course/last-courses-rep')
        .then((res) =>{
          const datos = (res && res.data && res.data.data) ? res.data.data : [];
          this.coursView = Array.isArray(datos) ? datos.length : 0;
        })
        .catch(() => {
          this.coursView = 0;
        });
      },
      async getAttributes() {
        try {
          let datos = await this.getCourseRelated();
          this.relatedCourses = Array.isArray(datos) ? datos : [];
        } catch (error) {
          this.relatedCourses = [];
        } finally {
          this.isLoading = false;
        }
      },
    },
    created() {
     this.mostrarAprendiendo();
     this.getAttributes()
    },
}
</script>
<style scoped>
.content-student {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 8px 8px 24px 8px;
  align-items: stretch;
}

@media (max-width: 960px) {
  .section-main {
    grid-template-columns: 1fr;
    padding: 8px;
    gap: 16px;
  }
}
</style>