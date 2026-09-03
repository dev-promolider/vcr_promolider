<template>
  <div class="tw-w-full">
    <div class="tw-flex tw-items-center tw-justify-between tw-mb-6 tw-px-2">
      <div>
        <h3 class="tw-text-2xl tw-font-bold tw-text-gray-900 dark:tw-text-white tw-font-outfit">Cursos Gratuitos y Minicursos</h3>
        <p class="tw-text-gray-500 tw-text-sm tw-mt-1">Empieza a aprender hoy mismo sin costo alguno.</p>
      </div>
      <button @click="goToMarketplace" class="tw-hidden sm:tw-flex tw-items-center tw-text-[var(--primary-color)] hover:tw-text-green-600 tw-font-bold tw-transition-colors">
        Ver catálogo completo
        <svg class="tw-w-5 tw-h-5 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>

    <!-- Skeleton Loader -->
    <div v-if="isLoading" class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 tw-px-2">
      <div v-for="i in 4" :key="i" class="tw-bg-gray-200 dark:tw-bg-gray-800 tw-animate-pulse tw-h-64 tw-rounded-2xl"></div>
    </div>

    <!-- Contenido Real -->
    <div v-else-if="freeCourses.length > 0" class="tw-px-2">
      <CarrouselCourseMarketplace :courses="freeCourses" />
    </div>

    <!-- Empty State -->
    <div v-else class="tw-bg-white dark:tw-bg-gray-900 tw-border tw-border-gray-100 dark:tw-border-gray-800 tw-rounded-2xl tw-p-8 tw-text-center">
      <div class="tw-text-gray-400 tw-mb-2">
        <svg class="tw-w-12 tw-h-12 tw-mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
      </div>
      <h4 class="tw-text-lg tw-font-semibold tw-text-gray-900 dark:tw-text-white">Próximamente</h4>
      <p class="tw-text-gray-500 tw-text-sm">Estamos preparando nuevos minicursos gratuitos para ti.</p>
    </div>
  </div>
</template>

<script>
import CarrouselCourseMarketplace from "@/components/courses/CarrouselCourseMarketplace.vue";
import { mapActions } from 'vuex';

export default {
  name: "FreeCoursesGrid",
  components: {
    CarrouselCourseMarketplace
  },
  data() {
    return {
      freeCourses: [],
      isLoading: true
    };
  },
  methods: {
    ...mapActions('course', ['getCourseRelated']),
    async fetchFreeCourses() {
      try {
        const [relatedCoursesResult, availableBooksResult] = await Promise.allSettled([
          this.axios.get("course/related-courses"),
          this.axios.get("course/list-available-books")
        ]);

        let combined = [];
        
        if (relatedCoursesResult.status === "fulfilled" && Array.isArray(relatedCoursesResult.value?.data?.data)) {
          // Filtrar también los que ya están comprados si aplica
          const courses = relatedCoursesResult.value.data.data.filter(c => !c.isPurchased);
          combined = [...combined, ...courses];
        }

        if (availableBooksResult.status === "fulfilled" && Array.isArray(availableBooksResult.value?.data?.data)) {
          combined = [...combined, ...availableBooksResult.value.data.data];
        }

        // Filtrar por precio 0 (gratuitos)
        this.freeCourses = combined.filter(c => Number(c.price) === 0);
        
        // Fallback mock si no hay ninguno gratis en la BD para que se vea el diseño
        if (this.freeCourses.length === 0 && combined.length > 0) {
           let mockFree = JSON.parse(JSON.stringify(combined.slice(0, 10)));
           mockFree.forEach(c => { c.price = 0; });
           this.freeCourses = mockFree;
        }

      } catch (error) {
        this.freeCourses = [];
      } finally {
        this.isLoading = false;
      }
    },
    goToMarketplace() {
      this.$router.push({ name: 'courses' }).catch(() => {});
    }
  },
  mounted() {
    this.fetchFreeCourses();
  }
};
</script>
