<template>
  <div class="container-fluid certificate-container py-5">
    <div class="row">
      <!-- Sidebar de cursos -->
      <div class="col-12 col-lg-4 courses-sidebar">
        <div class="courses-wrapper p-4">
          <!-- Estado sin cursos -->
          <div v-if="products.length == 0" class="empty-state text-center py-5">
            <i class="bi bi-journal-x fs-1 text-muted mb-3"></i>
            <h5 class="fw-bold">Aún no ha adquirido un curso</h5>
          </div>

          <!-- Lista de cursos -->
          <template v-else>
            <h4 class="mb-4 border-bottom pb-2">Mis Cursos</h4>
            <div class="courses-list">
              <div v-for="product in products" :key="product.id" class="course-card"
                @click="getCertificateInfo(product)" :class="{
                  active: productSelected && productSelected.id === product.id,
                }">
                <div class="card h-100">
                  <div class="row g-0">
                    <div class="col-4">
                      <img :src="product.url_portada" class="course-image" alt="Portada del curso" />
                    </div>
                    <div class="col-8">
                      <div class="card-body">
                        <h6 class="card-title text-truncate mb-0">
                          {{ product.title }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="col-12 col-lg-8">
        <div class="certificate-content p-4">
          <!-- Estado de espera -->
          <div v-if="waitSelection" class="text-center py-5">
            <i class="bi bi-arrow-left-circle fs-1 text-muted mb-3"></i>
            <h5 class="fw-bold">
              Seleccione un curso para ver la información del certificado
            </h5>
          </div>

          <!-- Detalles del certificado -->
          <div v-else class="certificate-details">
            <!-- Cabecera del curso seleccionado -->
            <div class="selected-course mb-5">
              <div class="card">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img :src="productSelected.url_portada" class="selected-course-image"
                      alt="Portada del curso seleccionado" />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h3 class="card-title">{{ productSelected.title }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Información del certificado -->
            <div v-if="certificateInfo" class="certificate-info">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title mb-4">Información del Certificado</h4>

                  <!-- Grid de información -->
                  <div class="row g-4 mb-5">
                    <div class="col-md-6">
                      <div class="info-item">
                        <label class="text-muted mb-1">Condición</label>
                        <p class="mb-0 fw-bold">
                          {{
                            getConditionText(
                              certificateInfo.condition_to_certificate
                            )
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-item">
                        <label class="text-muted mb-1">Tipo</label>
                        <p class="mb-0 fw-bold">
                          {{
                            certificateInfo.type_certificate === 1
                              ? "Gratuito"
                              : "De pago"
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-item">
                        <label class="text-muted mb-1">Validado por</label>
                        <p class="mb-0 fw-bold">
                          {{ getValidatedByText(certificateInfo.validated_by) }}
                        </p>
                      </div>
                    </div>
                    <div v-if="certificateInfo.validated_by === 'module'" class="col-md-6">
                      <div class="info-item">
                        <label class="text-muted mb-1">Módulo</label>
                        <p class="mb-0 fw-bold">
                          {{ certificateInfo.module_name }}
                        </p>
                      </div>
                    </div>
                    <div v-if="certificateInfo.validated_by === 'lesson'" class="col-md-6">
                      <div class="info-item">
                        <label class="text-muted mb-1">Clase</label>
                        <p class="mb-0 fw-bold">
                          {{ certificateInfo.lesson_name }}
                        </p>
                      </div>
                    </div>
                    <div v-if="certificateInfo.type_certificate === 0" class="col-md-6">
                      <div class="info-item">
                        <label class="text-muted mb-1">Precio</label>
                        <p class="mb-0 fw-bold">
                          ${{ certificateInfo.certificate_price }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Sección de progreso -->
                  <div class="progress-section">
                    <h5 class="mb-4">Progreso del Curso</h5>
                    <div class="progress-wrapper mb-4">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold">Progreso total</span>
                        <span class="badge bg-success">{{ combinedProgress }}%</span>
                      </div>
                      <div class="progress" style="height: 10px">
                        <div class="progress-bar bg-success" role="progressbar"
                          :style="{ width: combinedProgress + '%' }" :aria-valuenow="combinedProgress" aria-valuemin="0"
                          aria-valuemax="100"></div>
                      </div>
                    </div>

                    <div class="additional-progress small text-muted">
                      <p v-if="showVideoProgress" class="mb-1">
                        <i class="bi bi-play-circle me-2"></i>
                        Progreso de videos: {{ currentCourseProgress }}%
                      </p>
                      <p v-if="showExamProgress" class="mb-1">
                        <i class="bi bi-pencil-square me-2"></i>
                        Progreso de exámenes: {{ certificate_exam_progress }}%
                      </p>
                    </div>
                  </div>

                  <!-- Botón de reclamar certificado -->
                  <div class="claim-certificate mt-5">
                    <div class="d-flex align-items-center gap-3">
                      <button class="btn btn-success" :disabled="!canClaimCertificate" @click="claimCertificate">
                        <i class="bi bi-award me-2"></i>
                        Reclamar Certificado
                      </button>

                      <div v-if="!canClaimCertificate" class="tooltip-wrapper">
                        <span class="text-success text-decoration-underline cursor-pointer" data-bs-toggle="tooltip"
                          data-bs-placement="bottom" title="Aún no cumple los requisitos para reclamar el certificado.">
                          ¿Por qué no puedo reclamar el certificado?
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Estado sin información de certificado -->
            <div v-else class="alert alert-warning">
              <i class="bi bi-exclamation-triangle me-2"></i>
              No hay información de certificado disponible para este curso.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      products: [],
      waitSelection: true,
      productSelected: null,
      certificateInfo: null,
      canClaimCertificate: false,
      certificate_exam_progress: 0,
    };
  },
  computed: {
    ...mapState("course", ["courseProgress"]),
    ...mapGetters("course", ["course"]),

    currentCourseProgress() {
      return this.productSelected
        ? this.courseProgress[this.productSelected.id] || 0
        : 0;
    },

    showVideoProgress() {
      return (
        this.certificateInfo &&
        this.certificateInfo.condition_to_certificate !== 1
      );
    },

    showExamProgress() {
      return (
        this.certificateInfo &&
        (this.certificateInfo.condition_to_certificate === 1 ||
          this.certificateInfo.condition_to_certificate === 2)
      );
    },

    combinedProgress() {
      if (!this.certificateInfo) return 0;

      switch (this.certificateInfo.condition_to_certificate) {
        case 0:
          return this.currentCourseProgress;
        case 1:
          return this.certificate_exam_progress;
        case 2:
          return (
            (this.currentCourseProgress + this.certificate_exam_progress) / 2
          );
        default:
          return 0;
      }
    },
  },
  methods: {
    async getCourses() {
      try {
        const { data } = await this.axios.get("/course/purchased-courses");
        this.products = data.data;
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    },

    async getCertificateInfo(product) {
      this.productSelected = product;
      this.waitSelection = false;
    
      try {
        const [certificateRes, examRes] = await Promise.all([
          this.axios.get(`/course/certificate/data?course_id=${product.id}`),
          this.axios.get(`/course/exam/list?id=${product.id}`),
        ]);
      
        this.certificateInfo = certificateRes.data;
        this.certificate_exam_progress = examRes.data.exam_progress || 0;
      
        // Actualizar progreso de videos
        await this.$store.dispatch("course/updateCourseProgress", product.id);
      
        // AGREGAR ESTOS CONSOLE.LOG PARA VER LA INFORMACIÓN:
        console.log("=== INFORMACIÓN DE PROGRESO ===");
        console.log("Curso seleccionado:", product);
        console.log("Estado completo courseProgress:", this.courseProgress);
        console.log("Progreso del curso actual:", this.currentCourseProgress);
        console.log("Progreso de exámenes:", this.certificate_exam_progress);
        console.log("Progreso combinado:", this.combinedProgress);
        console.log("Información del certificado:", this.certificateInfo);
        console.log("================================");
      
        this.checkCertificateEligibility();
      } catch (error) {
        console.error("Error fetching certificate info:", error);
        this.certificateInfo = null;
      }
    },

    async checkCertificateEligibility() {
      try {
        const response = await this.axios.get(
          `/course/certificate/check/${this.productSelected.id}`
        );
      
        console.log("=== INFORMACIÓN DE CERTIFICADO (CHECK) ===");
        console.log("Respuesta cruda del endpoint:", response);
        console.log("Datos del endpoint:", response.data);
        console.log("==========================================");
      
        // Si devuelve 1 => true, si devuelve 0 => false
        this.canClaimCertificate = response.data === 1;
      } catch (error) {
        console.error("Error checking certificate eligibility:", error);
        this.canClaimCertificate = false;
      }
    },

    getConditionText(condition) {
      const conditionMap = {
        0: "Visualizar videos",
        1: "Aprobar exámenes",
        2: "Visualizar videos y aprobar exámenes",
      };
      return conditionMap[condition] || "No especificado";
    },

    getValidatedByText(validatedBy) {
      const validationMap = {
        course: "Curso",
        module: "Módulo",
        lesson: "Lección",
      };
      return validationMap[validatedBy] || "No especificado";
    },

    async claimCertificate() {
      try {
        // 1. Verificar si puede reclamar el certificado
        const readyResponse = await this.axios.get(`/course/certificate/check/${this.productSelected.id}`);
      
        console.log("=== RESPUESTA DEL ENDPOINT /course/certificate/check ===");
        console.log("Respuesta cruda:", readyResponse);
        console.log("Datos (readyResponse.data):", readyResponse.data);
        console.log("========================================================");
      
        if (!readyResponse.data) {
          alert("Aún no cumples los requisitos para obtener el certificado");
          return;
        }
      
        // 2. Obtener la URL del certificado
        const downloadResponse = await this.axios.get(`/certificate/download/${this.productSelected.id}`);
      
        console.log("=== RESPUESTA DEL ENDPOINT DE DESCARGA ===");
        console.log(downloadResponse.data);
        console.log("==========================================");
      
        if (downloadResponse.data.success) {
          // 3. Descargar el archivo usando fetch para convertirlo a blob
          console.log("Descargando archivo desde:", downloadResponse.data.download_url);
          
          const response = await fetch(downloadResponse.data.download_url, {
            method: 'GET',
            headers: {
              'Accept': 'image/png',
            },
          });
        
          if (!response.ok) {
            throw new Error(`Error al descargar: ${response.status}`);
          }
        
          // 4. Convertir a blob
          const blob = await response.blob();
          console.log("Blob creado:", blob.type, blob.size, "bytes");
        
          // 5. Crear URL del blob y descargar
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = downloadResponse.data.filename;
          
          // 6. Ejecutar la descarga
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // 7. Limpiar el blob URL
          window.URL.revokeObjectURL(blobUrl);
        
          console.log("✅ Certificado descargado exitosamente");
          alert("¡Certificado descargado exitosamente!");
        
        } else {
          alert("No se pudo obtener la URL del certificado");
        }
      
      } catch (error) {
        console.error("Error al reclamar el certificado:", error);
      
        // Manejo específico de errores
        if (error.response?.status === 404) {
          alert("Certificado no disponible. Asegúrate de haber completado el curso.");
        } else if (error.response?.status === 403) {
          alert("No tienes permisos para descargar este certificado.");
        } else {
          alert("No se pudo reclamar el certificado. Intente nuevamente.");
        }
      }
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>

<style scoped>
/* Contenedor principal */
.certificate-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* Sidebar de cursos */
.courses-sidebar {
  background-color: #fff;
  border-right: 1px solid #e9ecef;
}

.courses-wrapper {
  height: calc(100vh - 2rem);
  overflow-y: auto;
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tarjetas de curso */
.course-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.course-card:hover {
  transform: translateY(-2px);
}

.course-card.active {
  border-left: 4px solid #1ae800;
}

.course-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 16/9;
}

/* Contenido principal */
.certificate-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* Curso seleccionado */
.selected-course-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 16/9;
}

/* Información del certificado */
.certificate-info .card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.info-item {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  height: 100%;
}

/* Sección de progreso */
.progress-wrapper {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.progress {
  background-color: #e9ecef;
  overflow: hidden;
}

.progress-bar {
  background-color: #1ae800;
  transition: width 0.6s ease;
}

/* Botón de reclamar */
.btn-success {
  background-color: #1ae800;
  border-color: #1ae800;
}

.btn-success:hover {
  background-color: #15cc00;
  border-color: #15cc00;
}

.btn-success:disabled {
  background-color: #8df380;
  border-color: #8df380;
}

/* Tooltip */
.tooltip-wrapper {
  cursor: pointer;
}

/* Responsive */
@media (max-width: 991.98px) {
  .courses-sidebar {
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }

  .courses-wrapper {
    height: auto;
    max-height: 50vh;
  }
}

@media (max-width: 767.98px) {
  .certificate-content {
    padding: 1rem !important;
  }

  .selected-course-image {
    aspect-ratio: 21/9;
  }

  .info-item {
    padding: 0.75rem;
  }

  .progress-wrapper {
    padding: 1rem;
  }
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.certificate-details {
  animation: fadeIn 0.3s ease-out;
}
</style>
