<template>
  <div class="tw-flex tw-flex-col tw-gap-8 tw-min-h-screen tw-pb-8">
    
    <!-- 1. Hero Banners Slider -->
    <div class="tw-w-full">
      <HeroBannerSlider />
    </div>

    <!-- Contenedor con padding para el resto de secciones -->
    <div class="tw-flex tw-flex-col tw-gap-8 tw-px-2 lg:tw-px-6 tw-w-full">
      <!-- 2. Continúa Aprendiendo (Grid 3 columnas) -->
      <div class="tw-w-full">
      <template v-if="!isLoading">
        <div v-if="coursView > 0">
          <CarrouselCourseViewed />
        </div>
        <div v-else-if="relatedCourses.length === 0" class="tw-bg-white dark:tw-bg-[#161e2e] tw-rounded-2xl tw-p-8 tw-text-center tw-shadow-sm tw-border tw-border-gray-100 dark:tw-border-gray-800">
          <div class="tw-text-gray-500 dark:tw-text-gray-400 tw-py-8">
            <svg class="tw-w-16 tw-h-16 tw-mx-auto tw-text-gray-300 tw-mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            <h3 class="tw-text-lg tw-font-bold tw-text-gray-900 dark:tw-text-white tw-mb-2">Aún no tienes cursos activos</h3>
            <p>Explora nuestro catálogo y empieza tu camino.</p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="tw-animate-pulse tw-bg-gray-200 dark:tw-bg-gray-800 tw-h-48 tw-w-full tw-rounded-2xl"></div>
      </template>
    </div>
    
    <!-- Componente Mis Logros Comentado temporalmente por requerimiento -->
    <!-- <div class="tw-w-full">
      <Successes/>
    </div> -->

    <!-- 3. Cursos Gratuitos / Minicursos -->
    <div class="tw-w-full">
      <FreeCoursesGrid />
    </div>

      <!-- 4. Recomendados (Marketplace) -->
      <div class="tw-w-full">
        <template v-if="!isLoading">
          <div v-if="relatedCourses.length > 0">
            <RecommendedCourse :datos="relatedCourses" />  
          </div>
        </template>
        <template v-else>
          <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-4">
            <div v-for="i in 4" :key="i" class="tw-w-full tw-max-w-[500px]">
              <div class="tw-animate-pulse tw-bg-gray-200 dark:tw-bg-gray-800 tw-h-48 tw-w-full tw-rounded-xl"></div>
            </div>
          </div>
        </template>
      </div> 
    </div> <!-- Cierra contenedor de padding -->
  </div>
</template>

<script>
import CarrouselCourseViewed from '@/components/courses/CarrouselCourseViewed.vue';
import RecommendedCourse from "@/components/Student/dashboard/RecommendedCourse";
import HeroBannerSlider from './HeroBannerSlider';
import FreeCoursesGrid from './FreeCoursesGrid';
// import Successes from './Successes'; // Oculto por ahora
import { mapActions } from 'vuex';

export default {
  name: "DashboardStudent",
  components: { 
    CarrouselCourseViewed,
    RecommendedCourse, 
    HeroBannerSlider,
    FreeCoursesGrid
    // Successes
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
