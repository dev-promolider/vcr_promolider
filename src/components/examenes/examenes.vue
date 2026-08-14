<template>
  <div class="container-fluid exam-container py-4">
    <div class="row g-4">
      <!-- Lista de Cursos Sidebar -->
      <div class="col-12 col-lg-4 courses-sidebar">
        <div class="courses-wrapper p-4">
          <h4 class="sidebar-main-title mb-4 pb-2 border-bottom-subtle">Mis Exámenes</h4>

          <!-- State: Loading skeleton -->
          <div v-if="loading" class="skeleton-list">
            <div v-for="i in 4" :key="i" class="skeleton-course-item p-3 mb-3">
              <div class="d-flex align-center">
                <div class="skeleton-box mr-3" style="width: 52px; height: 52px; border-radius: 12px;"></div>
                <div class="flex-grow-1">
                  <div class="skeleton-box mb-2" style="width: 80%; height: 16px; border-radius: 4px;"></div>
                  <div class="skeleton-box" style="width: 40%; height: 12px; border-radius: 4px;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- State: No courses -->
          <div v-else-if="products.length === 0" class="empty-state text-center py-5">
            <v-icon color="#A1A1AA" size="48" class="mb-3">mdi-folder-open-outline</v-icon>
            <h5 class="empty-title mb-0">Aún no ha adquirido un curso</h5>
          </div>

          <!-- State: Course list -->
          <div v-else class="courses-list">
            <div
              v-for="product in products"
              :key="product.id"
              :class="['course-card-item', { active: productSelected && productSelected.id === product.id }]"
              @click="examList(product)"
            >
              <div class="d-flex align-items-center">
                <div class="course-img-wrapper mr-3 flex-shrink-0">
                  <img
                    :src="product.url_portada"
                    class="course-image"
                    alt="Portada del curso"
                    @error="onImgError"
                  />
                </div>
                <div class="course-info-content overflow-hidden">
                  <h6 class="course-card-title text-truncate mb-1">
                    {{ product.title }}
                  </h6>
                  <span class="exam-badge">
                    <v-icon color="var(--primary-color)" size="14" class="mr-1">mdi-file-document-edit-outline</v-icon>
                    Exámenes disponibles
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detalles del Curso y Lista de Exámenes -->
      <div class="col-12 col-lg-8" ref="courseDetails">
        <div class="exam-content p-4">
          <!-- State: Wait selection -->
          <div v-if="waitSelection" class="empty-exam-selection text-center py-5 my-auto">
            <div class="empty-icon-circle mb-3 mx-auto">
              <v-icon color="var(--primary-color)" size="48">mdi-file-certificate-outline</v-icon>
            </div>
            <h4 class="empty-title mb-2">Selecciona un curso</h4>
            <p class="empty-subtitle mb-0">
              Elige un curso de la lista lateral para rendir o consultar el progreso de tus exámenes.
            </p>
          </div>

          <!-- State: Course selected details & exams table -->
          <div v-else class="course-details">
            <!-- Header del curso seleccionado -->
            <div class="selected-course-header p-3 mb-4">
              <div class="d-flex align-items-center">
                <div class="selected-img-wrapper mr-3 flex-shrink-0">
                  <img
                    :src="productSelected.url_portada"
                    class="selected-course-image"
                    alt="Portada del curso seleccionado"
                    @error="onImgError"
                  />
                </div>
                <div class="overflow-hidden flex-grow-1">
                  <h3 class="selected-course-title mb-2 text-truncate">{{ productSelected.title }}</h3>
                  
                  <!-- Barra de Progreso del Curso -->
                  <div class="progress-section">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <span class="progress-label">Progreso de exámenes:</span>
                      <span class="progress-value">{{ exam_progress !== 'empty' ? exam_progress : 0 }}%</span>
                    </div>
                    <div class="progress custom-progress" style="height: 8px">
                      <div
                        class="progress-bar bg-emerald"
                        role="progressbar"
                        :style="{ width: (exam_progress !== 'empty' ? exam_progress : 0) + '%' }"
                        :aria-valuenow="exam_progress !== 'empty' ? exam_progress : 0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tabla / Lista de Exámenes -->
            <div class="exams-list-card p-4">
              <h5 class="section-card-title mb-3">Evaluaciones del curso</h5>
              
              <div v-if="exam_progress === 'empty'" class="alert-no-exams p-4 text-center">
                <v-icon color="#F59E0B" size="32" class="mb-2">mdi-information-outline</v-icon>
                <h6 class="alert-title mb-1">Sin evaluaciones asignadas</h6>
                <p class="alert-desc mb-0">Este curso no tiene exámenes registrados actualmente.</p>
              </div>

              <div v-else class="table-responsive">
                <table class="table custom-table align-middle">
                  <thead>
                    <tr>
                      <th>Evaluación / Examen</th>
                      <th class="text-end">Estado / Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Exámenes de clase -->
                    <tr v-for="exam in filteredClassExams" :key="'class-' + exam.id">
                      <td>
                        <div class="d-flex align-items-center">
                          <v-icon color="#71717A" size="20" class="mr-2">mdi-checkbox-blank-circle-outline</v-icon>
                          <span class="exam-name-text">{{ exam.name }}</span>
                        </div>
                      </td>
                      <td class="text-end">
                        <span v-if="exam.approved" class="status-badge-approved">
                          <v-icon color="var(--primary-color)" size="16" class="mr-1">mdi-check-circle</v-icon>
                          Aprobado
                        </span>
                        <button v-else class="btn btn-take-exam btn-sm" @click="Testing(exam)">
                          <span>Realizar examen</span>
                          <v-icon color="#FFFFFF" size="16" class="ml-1">mdi-arrow-right</v-icon>
                        </button>
                      </td>
                    </tr>

                    <!-- Exámenes de módulo -->
                    <tr v-for="exam in filteredModuleExams" :key="'module-' + exam.id">
                      <td>
                        <div class="d-flex align-items-center">
                          <v-icon color="#71717A" size="20" class="mr-2">mdi-folder-outline</v-icon>
                          <span class="exam-name-text">{{ exam.name }}</span>
                        </div>
                      </td>
                      <td class="text-end">
                        <span v-if="exam.approved" class="status-badge-approved">
                          <v-icon color="var(--primary-color)" size="16" class="mr-1">mdi-check-circle</v-icon>
                          Aprobado
                        </span>
                        <button v-else class="btn btn-take-exam btn-sm" @click="Testing(exam)">
                          <span>Realizar examen</span>
                          <v-icon color="#FFFFFF" size="16" class="ml-1">mdi-arrow-right</v-icon>
                        </button>
                      </td>
                    </tr>

                    <!-- Examen del curso -->
                    <tr v-if="showCourseExam">
                      <td>
                        <div class="d-flex align-items-center">
                          <v-icon color="var(--primary-color)" size="20" class="mr-2">mdi-school-outline</v-icon>
                          <span class="exam-name-text font-weight-bold">{{ exam_course.title }}</span>
                        </div>
                      </td>
                      <td class="text-end">
                        <span v-if="exam_course.approved" class="status-badge-approved">
                          <v-icon color="var(--primary-color)" size="16" class="mr-1">mdi-check-circle</v-icon>
                          Aprobado
                        </span>
                        <button v-else class="btn btn-take-exam btn-sm" @click="Testing(exam_course)">
                          <span>Realizar examen final</span>
                          <v-icon color="#FFFFFF" size="16" class="ml-1">mdi-arrow-right</v-icon>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Examenes",
  data() {
    return {
      products: [],
      waitSelection: true,
      exam_course: [],
      exams_class: [],
      exams_module: [],
      exams_data: [],
      exam_progress: 0,
      productSelected: [],
      loading: false,
    };
  },
  computed: {
    filteredClassExams() {
      return this.exams_class.filter((exam) => exam && exam.name);
    },
    filteredModuleExams() {
      return this.exams_module.filter((exam) => exam && exam.name);
    },
    showCourseExam() {
      return this.exam_course && this.exam_course.title;
    },
  },
  methods: {
    onImgError(e) {
      if (e && e.target) {
        e.target.src = require("@/assets/background-login.webp");
      }
    },
    async getcourses() {
      try {
        this.loading = true;
        const { data } = await this.axios.get("/course/purchased-courses");
        this.products = (data && Array.isArray(data.data)) ? data.data : [];
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        this.products = [];
      } finally {
        this.loading = false;
      }
    },

    async examList(product) {
      try {
        this.productSelected = product;
        const response = await this.axios.get(
          `/course/exam/list?id=${product.id}`
        );

        this.exam_course = response.data.exam_course || {};
        this.exams_class = response.data.exams_class || [];
        this.exams_module = response.data.exams_module || [];
        this.exams_data = response.data;
        this.exam_progress = response.data.exam_progress;
        this.waitSelection = false;

        this.$nextTick(() => {
          if (this.$refs.courseDetails && this.$refs.courseDetails.scrollIntoView) {
            this.$refs.courseDetails.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      } catch (error) {
        console.error("Error al obtener la lista de exámenes:", error);
      }
    },

    Testing(dataEx) {
      this.$router.push({
        name: "test",
        params: { id: dataEx.exam_id },
        query: {
          class: dataEx.slug,
          course: this.productSelected.id,
        },
      });
    },
  },
  mounted() {
    this.getcourses();
  },
};
</script>

<style scoped>
/* Contenedor Principal */
.exam-container {
  min-height: 85vh;
}

/* Sidebar de Cursos */
.courses-wrapper {
  background: #FAF9F5 !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 24px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  height: calc(100vh - 120px);
  overflow-y: auto;
}

.sidebar-main-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  color: #18181B !important;
  font-size: 1.15rem !important;
}

.border-bottom-subtle {
  border-bottom: 1px solid #E5E3DC !important;
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.course-card-item {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 16px !important;
  padding: 12px 14px !important;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.course-card-item:hover {
  transform: translateY(-2px);
  border-color: var(--primary-color) !important;
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.12) !important;
}

.course-card-item.active {
  background: rgba(16, 185, 129, 0.08) !important;
  border: 2px solid var(--primary-color) !important;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.18) !important;
}

.course-img-wrapper {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  overflow: hidden;
  background: #E5E3DC;
}

.course-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-card-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 600 !important;
  font-size: 0.92rem !important;
  color: #18181B !important;
}

.exam-badge {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.78rem !important;
  font-weight: 600 !important;
  color: var(--primary-color) !important;
  display: inline-flex;
  align-items: center;
}

/* Panel Principal de Exámenes */
.exam-content {
  background: #FAF9F5 !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 24px !important;
  min-height: 580px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
}

.empty-icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 1px solid #E5E3DC;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.empty-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.25rem !important;
  color: #18181B !important;
}

.empty-subtitle {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.9rem !important;
  color: #71717A !important;
  max-width: 420px;
  margin: 0 auto;
}

/* Header del Curso Seleccionado */
.selected-course-header {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 18px !important;
}

.selected-img-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  overflow: hidden;
  background: #E5E3DC;
}

.selected-course-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.selected-course-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.2rem !important;
  color: #18181B !important;
}

.progress-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.82rem;
  color: #71717A;
}

.progress-value {
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--primary-color);
}

.custom-progress {
  background-color: #E5E3DC !important;
  border-radius: 10px !important;
  overflow: hidden;
}

.bg-emerald {
  background-color: var(--primary-color) !important;
}

/* Card de Lista de Exámenes */
.exams-list-card {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 18px !important;
}

.section-card-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.05rem !important;
  color: #18181B !important;
}

.alert-no-exams {
  background: #FEF3C7 !important;
  border: 1px solid #FCD34D !important;
  border-radius: 14px !important;
}

.alert-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  color: #92400E !important;
}

.alert-desc {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  color: #B45309 !important;
  font-size: 0.88rem !important;
}

/* Tabla de Exámenes */
.custom-table {
  margin-bottom: 0 !important;
}

.custom-table thead th {
  background-color: #FAF9F5 !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  color: #18181B !important;
  border-bottom: 1px solid #E5E3DC !important;
  padding: 12px 16px !important;
}

.custom-table tbody td {
  padding: 14px 16px !important;
  border-bottom: 1px solid #E5E3DC !important;
}

.exam-name-text {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.92rem !important;
  color: #18181B !important;
}

.status-badge-approved {
  display: inline-flex;
  align-items: center;
  background: rgba(16, 185, 129, 0.12) !important;
  color: var(--primary-color) !important;
  padding: 6px 14px !important;
  border-radius: 20px !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
}

.btn-take-exam {
  background-color: var(--primary-color) !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 6px 16px !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  transition: all 0.2s ease !important;
  display: inline-flex;
  align-items: center;
}

.btn-take-exam:hover {
  background-color: var(--primary-hover) !important;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35) !important;
}

/* Skeleton Loading Item */
.skeleton-course-item {
  background: #FFFFFF;
  border: 1px solid #E5E3DC;
  border-radius: 16px;
}

.skeleton-box {
  background-color: #E5E3DC;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.5) 20%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  background-position: -150px 0;
  animation: skeleton-shimmer 1.6s infinite ease-in-out;
}

@keyframes skeleton-shimmer {
  to {
    background-position: calc(100% + 150px) 0;
  }
}
</style>
