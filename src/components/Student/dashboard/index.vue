<template>
  <div class="tw-flex tw-flex-col tw-gap-4 tw-min-h-screen">
    <div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 lg:tw-gap-6 tw-p-2 lg:tw-pb-6 tw-items-stretch">
      <KeepLearning/>
      <Successes/>
    </div>
    
    <div class="tw-m-3 md:tw-m-5">
      <template v-if="!isLoading">
        <div v-if="this.coursView > 0">
          <CarrouselCourseViewed />
        </div>
        <div v-if="this.relatedCourses.length > 0">
          <RecommendedCourse :datos="relatedCourses" />  
        </div>
        <div class="tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white" v-else>
          Cursos recomendados
        </div>
        <div v-if="((this.coursView === 1 || 0)) && (this.relatedCourses.length === 0)">
          <div class="tw-flex tw-items-center tw-justify-center tw-text-gray-500 dark:tw-text-gray-400 tw-py-8">
            <span>Lo sentimos, aún no hay cursos disponibles.</span>
          </div>
        </div>
      </template>

      <!-- Reemplazo de v-skeleton-loader y v-row / v-col -->
      <template v-if="isLoading">
        <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-4">
          <div v-for="i in 4" :key="i" class="tw-w-full tw-max-w-[500px]">
            <div class="tw-animate-pulse tw-bg-gray-200 dark:tw-bg-gray-800 tw-h-48 tw-w-full tw-rounded-xl"></div>
          </div>
        </div>
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
    KeepLearning, 
    Successes,
  },
  data() {
    return {
      coursView: null,
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