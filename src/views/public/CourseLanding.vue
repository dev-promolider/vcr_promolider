<template>
  <div class="landing-wrapper tw-bg-gray-50 dark:tw-bg-gray-900 tw-min-h-screen tw-font-sans">
    
    <!-- State 1: Loading State -->
    <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
      <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <!-- State 2: Error State -->
    <div v-else-if="error" class="container py-5 text-center">
      <div class="card border-0 shadow-sm p-5 text-center my-4 mx-auto" style="border-radius: 20px; max-width: 600px;">
        <div class="mb-4">
          <i class="fas fa-exclamation-circle" style="color: #EF4444; font-size: 72px;"></i>
        </div>
        <h3 class="font-weight-bold mb-2 text-dark">Curso no encontrado</h3>
        <p class="text-muted mb-4 mx-auto">
          El curso que estás buscando no existe o ya no está disponible.
        </p>
      </div>
    </div>

    <!-- State 3: Landing View -->
    <div v-else class="tw-pb-20">
      
      <!-- Hero Section -->
      <section class="tw-bg-gray-900 tw-text-white tw-py-20 tw-relative tw-overflow-hidden">
        <div class="tw-absolute tw-inset-0 tw-opacity-30 tw-bg-cover tw-bg-center" :style="{ backgroundImage: `url(${courseInfo.photo || 'https://via.placeholder.com/1200x400'})` }"></div>
        <div class="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-gray-900 tw-to-transparent"></div>
        
        <div class="container tw-relative tw-z-10 tw-mx-auto tw-px-4 tw-text-center">
          <h1 class="tw-text-4xl md:tw-text-6xl tw-font-bold tw-mb-4 tw-leading-tight">{{ courseInfo.title }}</h1>
          <p class="tw-text-xl tw-text-gray-300 tw-max-w-3xl tw-mx-auto tw-mb-8">{{ courseInfo.description || 'Descubre todo lo que este curso tiene preparado para ti. ¡Inscríbete hoy mismo!' }}</p>
          <button @click="goToRegister" class="btn btn-primary btn-lg tw-px-8 tw-py-3 tw-rounded-full tw-font-bold tw-shadow-lg tw-text-lg hover:tw-scale-105 tw-transition-transform">
            Regístrate para Comprar
          </button>
        </div>
      </section>

      <!-- Content Section -->
      <section class="container tw-mx-auto tw-px-4 tw-py-16">
        <div class="row">
          
          <!-- Course Details -->
          <div class="col-md-8 tw-mb-8">
            <h2 class="tw-text-3xl tw-font-bold tw-text-gray-900 dark:tw-text-white tw-mb-6">Acerca de este curso</h2>
            <div class="tw-bg-white dark:tw-bg-gray-800 tw-p-8 tw-rounded-2xl tw-shadow-sm tw-text-gray-700 dark:tw-text-gray-300 tw-leading-relaxed tw-whitespace-pre-line">
              {{ courseInfo.description || 'Sin descripción disponible.' }}
            </div>
          </div>
          
          <!-- Producer Info Sidebar -->
          <div class="col-md-4">
            <div class="tw-bg-white dark:tw-bg-gray-800 tw-p-6 tw-rounded-2xl tw-shadow-sm tw-text-center tw-sticky tw-top-4">
              <h3 class="tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white tw-mb-6">El Productor</h3>
              
              <div class="tw-flex tw-justify-center tw-mb-4">
                <img v-if="(courseInfo.instructor || courseInfo.user)?.photo && !(courseInfo.instructor || courseInfo.user)?.photo.includes('avatar1.png')" :src="(courseInfo.instructor || courseInfo.user).photo" class="tw-w-24 tw-h-24 tw-rounded-full tw-object-cover tw-border-4 tw-border-primary" alt="Productor">
                <div v-else class="tw-w-24 tw-h-24 tw-rounded-full tw-bg-primary tw-bg-opacity-20 tw-text-primary tw-flex tw-items-center tw-justify-center tw-text-3xl tw-font-bold tw-border-4 tw-border-primary">
                  {{ (courseInfo.instructor || courseInfo.user)?.name ? (courseInfo.instructor || courseInfo.user).name.charAt(0).toUpperCase() : 'P' }}
                </div>
              </div>
              
              <h4 class="tw-font-bold tw-text-gray-900 dark:tw-text-white tw-text-lg">{{ (courseInfo.instructor || courseInfo.user)?.name }} {{ (courseInfo.instructor || courseInfo.user)?.last_name }}</h4>
              <p class="tw-text-gray-500 dark:tw-text-gray-400 tw-text-sm tw-mb-4">
                {{ (courseInfo.instructor || courseInfo.user)?.biography || 'Productor de contenido en Promolíder.' }}
              </p>
              
              <hr class="tw-my-4 tw-border-gray-200 dark:tw-border-gray-700">
              
              <div class="tw-text-3xl tw-font-bold tw-text-primary tw-mb-4">
                ${{ courseInfo.price || '0.00' }}
              </div>
              
              <button @click="goToRegister" class="btn btn-primary tw-w-full tw-py-3 tw-rounded-xl tw-font-bold hover:tw-scale-105 tw-transition-transform">
                Obtener Acceso
              </button>
            </div>
          </div>
          
        </div>
      </section>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseLanding',
  data() {
    return {
      loading: true,
      error: false,
      courseInfo: {}
    }
  },
  mounted() {
    this.captureReferral();
    this.fetchCourse();
  },
  methods: {
    captureReferral() {
      const refId = this.$route.query.ref;
      if (refId) {
        localStorage.setItem('sponsor_ref_id', refId);
      }
    },
    async fetchCourse() {
      try {
        const courseId = this.$route.params.id; // Changed back to ID since Course.vue sends ID
        const response = await this.axios.get("course/details/" + courseId);
        this.courseInfo = (response && response.data && response.data.data) ? response.data.data : {};
        
        if (!this.courseInfo.id) {
          this.error = true;
        }
      } catch (err) {
        console.error("Error cargando curso para landing: ", err);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    goToRegister() {
      const refId = this.$route.query.ref || localStorage.getItem('sponsor_ref_id') || '';
      // Asumimos que el registro vive en el frontend principal
      const baseUrl = window.location.origin.replace('8081', '8080').replace('vcr.', 'crm.');
      const redirectUrl = `${baseUrl}/register?ref=${refId}`;
      window.location.href = redirectUrl;
    }
  }
}
</script>

<style scoped>
</style>
