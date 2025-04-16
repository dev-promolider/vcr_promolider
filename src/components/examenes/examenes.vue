<template>
  <div class="container-fluid py-5">
    <div class="row">
      <!-- Lista de Cursos -->
      <div class="col-12 col-lg-4 mb-4">
        <div class="courses-container">
          <div v-if="products.length === 0" class="text-center py-5">
            <h5 class="text-muted">Aún no ha adquirido un curso</h5>
          </div>

          <div v-else v-for="product in products" :key="product.id" class="course-card" @click="examList(product)">
            <div class="card shadow-sm h-100">
              <div class="row g-0">
                <div class="col-4">
                  <img :src="product.url_portada" class="img-fluid h-100 w-100 object-fit-cover"
                    alt="Portada del curso" />
                </div>
                <div class="col-8">
                  <div class="card-body">
                    <h5 class="card-title text-truncate">
                      {{ product.title }}
                    </h5>
                    <div class="course-rating mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detalles del Curso -->
      <div class="col-12 col-lg-8" ref="courseDetails">
        <div v-if="waitSelection" class="text-center py-5">
          <h4 class="text-muted">Seleccione un curso</h4>
        </div>

        <div v-else class="course-details">
          <div class="card shadow-sm">
            <div class="card-body">
              <!-- Cabecera del curso seleccionado -->
              <div class="selected-course mb-4">
                <div class="row g-0">
                  <div class="col-md-3">
                    <img :src="productSelected.url_portada" class="img-fluid rounded" alt="Portada del curso" />
                  </div>
                  <div class="col-md-9 ps-md-4">
                    <h3 class="mb-3">{{ productSelected.title }}</h3>
                    <div class="progress-section">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold">Progreso actual:</span>
                        <span>{{
                          exam_progress !== "empty" ? exam_progress : 0
                        }}%</span>
                      </div>
                      <div class="progress" style="height: 10px">
                        <div class="progress-bar bg-success" role="progressbar" :style="{
                          width:
                            exam_progress !== 'empty'
                              ? exam_progress + '%'
                              : '0%',
                        }" :aria-valuenow="exam_progress !== 'empty' ? exam_progress : 0
                            " aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Lista de exámenes -->
              <div class="exams-list">
                <h4 class="mb-3">Lista de exámenes</h4>
                <div v-if="exam_progress === 'empty'" class="alert alert-info">
                  No hay exámenes para este curso
                </div>
                <div v-else class="table-responsive">
                  <table class="table table-hover">
                    <thead class="table-light">
                      <tr>
                        <th>Examen</th>
                        <th class="text-end">Estado/Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- Exámenes de clase -->
                      <tr v-for="exam in filteredClassExams" :key="'class-' + exam.id">
                        <td>{{ exam.name }}</td>
                        <td class="text-end">
                          <span v-if="exam.approved" class="badge bg-success">
                            Examen aprobado
                          </span>
                          <button v-else class="btn btn-success btn-sm" @click="Testing(exam)">
                            Realizar examen
                          </button>
                        </td>
                      </tr>

                      <!-- Exámenes de módulo -->
                      <tr v-for="exam in filteredModuleExams" :key="'module-' + exam.id">
                        <td>{{ exam.name }}</td>
                        <td class="text-end">
                          <span v-if="exam.approved" class="badge bg-success">
                            Examen aprobado
                          </span>
                          <button v-else class="btn btn-success btn-sm" @click="Testing(exam)">
                            Realizar examen
                          </button>
                        </td>
                      </tr>

                      <!-- Examen del curso -->
                      <tr v-if="showCourseExam">
                        <td>{{ exam_course.title }}</td>
                        <td class="text-end">
                          <span v-if="exam_course.approved" class="badge bg-success">
                            Examen aprobado
                          </span>
                          <button v-else class="btn btn-success btn-sm" @click="Testing(exam_course)">
                            Realizar examen
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
    // Filtrar exámenes de clase existentes
    filteredClassExams() {
      return this.exams_class.filter((exam) => exam && exam.name);
    },
    // Filtrar exámenes de módulo existentes
    filteredModuleExams() {
      return this.exams_module.filter((exam) => exam && exam.name);
    },
    // Verificar si hay examen de curso para mostrar
    showCourseExam() {
      return this.exam_course && this.exam_course.title;
    },
  },
  methods: {
    async getcourses() {
      try {
        this.loading = true;
        const { data } = await this.axios.get("/course/purchased-courses");
        this.products = data.data;
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
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

        // Asegurarnos de que los arrays estén inicializados correctamente
        this.exam_course = response.data.exam_course || {};
        this.exams_class = response.data.exams_class || [];
        this.exams_module = response.data.exams_module || [];
        this.exams_data = response.data;
        this.exam_progress = response.data.exam_progress;
        this.waitSelection = false;

        this.$nextTick(() => {
          this.$refs.courseDetails.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
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
.courses-container {
  max-height: 80vh;
  overflow-y: auto;
  padding-right: 10px;
}

.course-card {
  cursor: pointer;
  margin-bottom: 1rem;
  transition: transform 0.2s ease-in-out;
}

.course-card:hover {
  transform: translateY(-3px);
}

.course-card .card {
  border: none;
  background-color: white;
}

.course-card .card-body {
  padding: 1rem;
}

.course-card .card-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
}

.progress {
  background-color: #e9ecef;
  border-radius: 0.5rem;
}

.progress-bar {
  background-color: #1ae800;
  border-radius: 0.5rem;
}

.course-details .card {
  border: none;
  background-color: white;
}

.selected-course img {
  max-height: 150px;
  width: 100%;
  object-fit: cover;
}

.table th {
  font-weight: 600;
  color: #495057;
}

.table td {
  vertical-align: middle;
}

.btn-success {
  background-color: #1ae800;
  border-color: #1ae800;
}

.btn-success:hover {
  background-color: #15cc00;
  border-color: #15cc00;
}

.badge.bg-success {
  background-color: #1ae800 !important;
}

@media (max-width: 768px) {
  .courses-container {
    max-height: none;
    overflow-y: visible;
    margin-bottom: 2rem;
  }

  .selected-course {
    text-align: center;
  }

  .selected-course img {
    margin-bottom: 1rem;
    max-height: 200px;
  }
}

/* Personalización de la barra de desplazamiento */
.courses-container::-webkit-scrollbar {
  width: 6px;
}

.courses-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.courses-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.courses-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
