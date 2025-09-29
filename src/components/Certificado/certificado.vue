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
            <div v-if="coursesWithCertificate.length === 0" class="alert alert-info">
              <i class="bi bi-info-circle me-2"></i>
              No tiene cursos con certificado disponible.
            </div>
            <div v-else class="courses-list">
              <div v-for="product in coursesWithCertificate" :key="product.id" class="course-card"
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
                        <small class="text-success">
                          <i class="bi bi-award me-1"></i>
                          Con certificado
                        </small>
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
            <div v-if="certificateInfo && !certificateInfo.noCertificate" class="certificate-info">
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
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <h5 class="mb-0">Progreso del Curso</h5>
                      
                      <!-- Botones para alternar vista - Solo mostrar si es validado por módulo -->
                      <div v-if="certificateInfo.validated_by === 'module'" class="btn-group" role="group">
                        <button 
                          type="button" 
                          class="btn btn-sm"
                          :class="progressView === 'course' ? 'btn-primary' : 'btn-outline-primary'"
                          @click="setProgressView('course')"
                        >
                          <i class="bi bi-mortarboard me-1"></i>
                          Por Curso
                        </button>
                        <button 
                          type="button" 
                          class="btn btn-sm"
                          :class="progressView === 'modules' ? 'btn-primary' : 'btn-outline-primary'"
                          @click="setProgressView('modules')"
                        >
                          <i class="bi bi-list-nested me-1"></i>
                          Por Módulos
                        </button>
                      </div>
                    </div>

                    <!-- Vista por curso (original) -->
                    <div v-if="progressView === 'course'" class="course-progress-view">
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

                    <!-- Vista por módulos (nueva) - Solo mostrar si es validado por módulo -->
                    <div v-else-if="progressView === 'modules' && certificateInfo.validated_by === 'module'" class="modules-progress-view">
                      
                      <!-- Botón para actualizar progreso de módulos -->
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <small class="text-muted">
                          <i class="bi bi-info-circle me-1"></i>
                          Progreso detallado por cada módulo del curso
                        </small>
                        <button 
                          class="btn btn-sm btn-outline-secondary" 
                          @click="loadModuleProgress"
                          :disabled="loadingModuleProgress"
                        >
                          <i class="bi bi-arrow-clockwise me-1" :class="{ 'fa-spin': loadingModuleProgress }"></i>
                          {{ loadingModuleProgress ? 'Cargando...' : 'Actualizar' }}
                        </button>
                      </div>

                      <!-- Estado de carga -->
                      <div v-if="loadingModuleProgress" class="text-center py-4">
                        <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                        <span class="text-muted">Cargando progreso de módulos...</span>
                      </div>

                      <!-- Resumen general de módulos -->
                      <div v-else-if="moduleProgressData" class="modules-summary mb-4">
                        <div class="row g-3">
                          <div class="col-md-4">
                            <div class="summary-card text-center p-3 bg-light rounded">
                              <h3 class="text-primary mb-1">{{ moduleProgressData.summary.total_modules }}</h3>
                              <small class="text-muted">Total Módulos</small>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="summary-card text-center p-3 bg-success text-white rounded">
                              <h3 class="mb-1">{{ moduleProgressData.summary.completed_modules }}</h3>
                              <small>Completados</small>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="summary-card text-center p-3 bg-warning text-white rounded">
                              <h3 class="mb-1">{{ moduleProgressData.summary.total_modules - moduleProgressData.summary.completed_modules }}</h3>
                              <small>Pendientes</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Lista detallada de módulos -->
                      <div v-if="moduleProgressData && moduleProgressData.modules" class="modules-detailed">
                        <div v-for="(module, index) in moduleProgressData.modules" :key="module.module_id" 
                             class="module-item mb-3">
                          <div class="card border-0 shadow-sm">
                            <div class="card-body">
                              <div class="row align-items-center">
                                <div class="col-md-6">
                                  <div class="d-flex align-items-center">
                                    <div class="module-status-icon me-3">
                                      <i :class="module.is_completed ? 'bi bi-check-circle-fill text-success' : 'bi bi-circle text-muted'" 
                                         style="font-size: 1.5rem;"></i>
                                    </div>
                                    <div>
                                      <h6 class="mb-1 fw-bold">
                                        {{ index + 1 }}. {{ module.module_name }}
                                      </h6>
                                      <small class="text-muted">
                                        ID: {{ module.module_id }} | 
                                        {{ module.completed_classes }}/{{ module.total_classes }} clases
                                      </small>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-2">
                                  <div class="progress" style="height: 8px;">
                                    <div class="progress-bar" 
                                         :class="module.is_completed ? 'bg-success' : 'bg-warning'"
                                         :style="{ width: module.completion_percentage + '%' }"></div>
                                  </div>
                                  <small class="text-muted">{{ module.completion_percentage }}%</small>
                                </div>
                                <div class="col-md-2 text-center">
                                  <span class="badge" 
                                        :class="module.is_completed ? 'bg-success' : 'bg-warning'">
                                    {{ module.is_completed ? 'Completado' : 'Pendiente' }}
                                  </span>
                                </div>
                                <div class="col-md-2 text-end">
                                  <!-- Botón de descarga del certificado por módulo - Solo si es validado por módulo -->
                                  <button 
                                    v-if="module.is_completed && certificateInfo.validated_by === 'module'"
                                    class="btn btn-sm btn-outline-success"
                                    @click="downloadModuleCertificate(module.module_id)"
                                    :disabled="downloadingModuleCertificate === module.module_id"
                                    title="Descargar certificado del módulo"
                                  >
                                    <i v-if="downloadingModuleCertificate === module.module_id" 
                                       class="bi bi-hourglass-split"></i>
                                    <i v-else class="bi bi-download"></i>
                                  </button>
                                  <small v-else-if="!module.is_completed || certificateInfo.validated_by !== 'module'" class="text-muted d-block">
                                    <i class="bi bi-lock me-1"></i>
                                    No disponible
                                  </small>
                                </div>
                              </div>

                              <!-- Detalles expandibles -->
                              <div v-if="!module.is_completed && (module.pending_class_ids.length > 0)" 
                                   class="mt-3 pt-3 border-top">
                                <details>
                                  <summary class="text-muted small cursor-pointer">
                                    <i class="bi bi-chevron-right me-1"></i>
                                    Ver clases pendientes ({{ module.pending_class_ids.length }})
                                  </summary>
                                  <div class="mt-2">
                                    <div class="d-flex flex-wrap gap-1">
                                      <span v-for="classId in module.pending_class_ids" :key="classId"
                                            class="badge bg-light text-dark border small">
                                        Clase ID: {{ classId }}
                                      </span>
                                    </div>
                                  </div>
                                </details>
                              </div>

                              <div v-if="module.is_completed && (module.completed_class_ids.length > 0)" 
                                   class="mt-3 pt-3 border-top">
                                <details>
                                  <summary class="text-muted small cursor-pointer">
                                    <i class="bi bi-chevron-right me-1"></i>
                                    Ver clases completadas ({{ module.completed_class_ids.length }})
                                  </summary>
                                  <div class="mt-2">
                                    <div class="d-flex flex-wrap gap-1">
                                      <span v-for="classId in module.completed_class_ids" :key="classId"
                                            class="badge bg-success small">
                                        Clase ID: {{ classId }}
                                      </span>
                                    </div>
                                  </div>
                                </details>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Estado sin datos -->
                      <div v-else-if="!loadingModuleProgress" class="text-center py-4 text-muted">
                        <i class="bi bi-info-circle fs-1 mb-3"></i>
                        <p>No hay información de progreso por módulos disponible.</p>
                        <button class="btn btn-sm btn-primary" @click="loadModuleProgress">
                          Cargar Progreso de Módulos
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Botón de reclamar certificado - Solo si es validado por curso -->
                  <div v-if="certificateInfo.validated_by === 'course'" class="claim-certificate mt-5">
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

                  <!-- Mensaje informativo cuando la validación es por módulo -->
                  <div v-else-if="certificateInfo.validated_by === 'module'" class="alert alert-info mt-5">
                    <i class="bi bi-info-circle me-2"></i>
                    Este curso otorga certificados por módulo completado. Descarga los certificados individuales desde la vista "Por Módulos".
                  </div>
                </div>
              </div>
            </div>

            <!-- Estado cuando el curso no tiene certificado disponible -->
            <div v-else-if="certificateInfo && certificateInfo.noCertificate" class="alert alert-info">
              <i class="bi bi-info-circle me-2"></i>
              Este curso no tiene certificado disponible.
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
      coursesWithCertificate: [], // Nueva propiedad para cursos filtrados
      waitSelection: true,
      productSelected: null,
      certificateInfo: null,
      canClaimCertificate: false,
      certificate_exam_progress: 0,
      currentCourseProgress: 0, // Ahora es una variable de estado local
      
      // Nuevas propiedades para el progreso por módulos
      progressView: 'course', // 'course' o 'modules'
      moduleProgressData: null,
      loadingModuleProgress: false,
      
      // Nueva propiedad para controlar la descarga de certificados por módulo
      downloadingModuleCertificate: null, // ID del módulo que se está descargando
    };
  },
  computed: {
    ...mapState("course", ["courseProgress"]),
    ...mapGetters("course", ["course"]),

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
          return Math.round(
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
        
        // Filtrar solo los cursos que tienen certificado disponible
        await this.filterCoursesWithCertificate();
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    },

    async filterCoursesWithCertificate() {
      this.coursesWithCertificate = [];
      
      console.log("=== FILTRANDO CURSOS CON CERTIFICADO ===");
      console.log("Total de cursos:", this.products.length);
      
      for (const course of this.products) {
        try {
          const response = await this.axios.get(`/course/details/${course.id}`);
          const courseDetails = response.data.data;
          
          // El certificate puede venir como boolean true/false o como number 1/0
          const hasCertificate = courseDetails.certificate === true || courseDetails.certificate === 1;
          
          console.log(`Curso ${course.title}:`, {
            id: course.id,
            certificate: courseDetails.certificate,
            certificateType: typeof courseDetails.certificate,
            hasCertificate: hasCertificate
          });
          
          if (hasCertificate) {
            this.coursesWithCertificate.push(course);
          }
        } catch (error) {
          console.error(`Error checking certificate for course ${course.id}:`, error);
        }
      }
      
      console.log("Cursos con certificado:", this.coursesWithCertificate.length);
      console.log("=====================================");
    },

    async getCourseProgress(courseId) {
      try {
        const response = await this.axios.get(`/course/${courseId}/progress`);
        
        console.log("=== PROGRESO DEL CURSO ===");
        console.log("Curso ID:", courseId);
        console.log("Respuesta del endpoint:", response.data);
        console.log("Progreso obtenido:", response.data.progress);
        console.log("========================");
        
        return response.data.progress || 0;
      } catch (error) {
        console.error("Error fetching course progress:", error);
        return 0;
      }
    },

    // Nuevo método para cambiar la vista de progreso
    setProgressView(view) {
      this.progressView = view;
      
      // Si cambia a vista de módulos y no hay datos, cargarlos automáticamente
      if (view === 'modules' && !this.moduleProgressData && this.productSelected && this.certificateInfo.validated_by === 'module') {
        this.loadModuleProgress();
      }
    },

    // Nuevo método para cargar el progreso por módulos
    async loadModuleProgress() {
      if (!this.productSelected) {
        console.error("No hay curso seleccionado");
        return;
      }

      this.loadingModuleProgress = true;
      
      try {
        console.log("=== CARGANDO PROGRESO POR MÓDULOS ===");
        console.log("Curso ID:", this.productSelected.id);
        
        const response = await this.axios.get(`/course/${this.productSelected.id}/modules-completion`);
        
        console.log("Respuesta completa del endpoint de módulos:", response.data);
        
        if (response.data.success) {
          this.moduleProgressData = response.data;
          
          console.log("=== DATOS DE MÓDULOS PROCESADOS ===");
          console.log("Total de módulos:", this.moduleProgressData.summary.total_modules);
          console.log("Módulos completados:", this.moduleProgressData.summary.completed_modules);
          console.log("Detalle de módulos:", this.moduleProgressData.modules);
          
          // Log detallado de cada módulo
          this.moduleProgressData.modules.forEach((module, index) => {
            console.log(`\nMódulo ${index + 1}: ${module.module_name}`);
            console.log(`- ID: ${module.module_id}`);
            console.log(`- Completado: ${module.is_completed ? 'Sí' : 'No'}`);
            console.log(`- Progreso: ${module.completion_percentage}%`);
            console.log(`- Clases completadas: ${module.completed_classes}/${module.total_classes}`);
            console.log(`- Clases pendientes:`, module.pending_class_ids);
            console.log(`- Clases completadas:`, module.completed_class_ids);
          });
          
          console.log("=====================================");
          
          // Mostrar notificación de éxito
          this.$toast.success(`Progreso cargado: ${this.moduleProgressData.summary.completed_modules}/${this.moduleProgressData.summary.total_modules} módulos completados`);
          
        } else {
          console.error("Error en la respuesta del servidor:", response.data);
          this.$toast.error('Error al cargar el progreso de módulos');
        }
        
      } catch (error) {
        console.error("Error cargando progreso por módulos:", error);
        if (error.response) {
          console.error("Datos del error:", error.response.data);
          console.error("Status del error:", error.response.status);
        }
        this.$toast.error('Error al cargar el progreso de módulos');
      } finally {
        this.loadingModuleProgress = false;
      }
    },

    // Nuevo método para descargar certificado por módulo
    async downloadModuleCertificate(moduleId) {
      if (!moduleId) {
        console.error("No se proporcionó ID de módulo");
        this.$toast.error('Error: ID de módulo no válido');
        return;
      }

      this.downloadingModuleCertificate = moduleId;
      
      try {
        console.log("=== DESCARGANDO CERTIFICADO DE MÓDULO ===");
        console.log("Módulo ID:", moduleId);
        
        // Llamar al endpoint con el ID del módulo
        const response = await this.axios.get(
          `/my-courses/${moduleId}/module/certificate/download`,
          { responseType: 'blob' }
        );
        
        // Crear un enlace temporal para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        
        // Establecer el nombre del archivo
        const moduleName = this.getModuleNameById(moduleId);
        const fileName = `certificado_modulo_${moduleId}${moduleName ? '_' + moduleName.replace(/\s+/g, '_').toLowerCase() : ''}.pdf`;
        link.setAttribute('download', fileName);
        
        // Agregar al DOM, hacer clic y remover
        document.body.appendChild(link);
        link.click();
        
        // Limpiar
        link.remove();
        window.URL.revokeObjectURL(url);
        
        // Mostrar mensaje de éxito
        this.$toast.success(`Certificado del módulo descargado exitosamente`);
        
        console.log("Certificado de módulo descargado:", {
          moduleId: moduleId,
          fileName: fileName
        });
        
      } catch (error) {
        console.error("Error descargando certificado de módulo:", error);
        
        // Manejar diferentes tipos de errores
        if (error.response) {
          switch (error.response.status) {
            case 404:
              this.$toast.error('Certificado no encontrado para este módulo');
              break;
            case 403:
              this.$toast.error('No tienes permisos para descargar este certificado');
              break;
            case 422:
              this.$toast.error('El módulo no está completado o no tiene certificado disponible');
              break;
            default:
              this.$toast.error('Error al descargar el certificado del módulo');
          }
        } else {
          this.$toast.error('Error de conexión al descargar el certificado');
        }
        
      } finally {
        this.downloadingModuleCertificate = null;
      }
    },

    // Método auxiliar para obtener el nombre del módulo por ID
    getModuleNameById(moduleId) {
      if (!this.moduleProgressData || !this.moduleProgressData.modules) {
        return null;
      }
      
      const module = this.moduleProgressData.modules.find(m => m.module_id === moduleId);
      return module ? module.module_name : null;
    },

    async getCertificateInfo(product) {
      this.productSelected = product;
      this.waitSelection = false;
      
      // Resetear valores
      this.certificateInfo = null;
      this.currentCourseProgress = 0;
      this.certificate_exam_progress = 0;
      this.canClaimCertificate = false;
      this.moduleProgressData = null; // Resetear datos de módulos
      this.progressView = 'course'; // Volver a vista por curso
      this.downloadingModuleCertificate = null; // Resetear estado de descarga
    
      try {
        // Primero verificar si el curso tiene certificado disponible
        const courseDetailsRes = await this.axios.get(`/course/details/${product.id}`);
        const courseDetails = courseDetailsRes.data.data;
        
        console.log("=== VERIFICACIÓN DE CERTIFICADO ===");
        console.log("Detalles del curso:", courseDetails);
        console.log("Certificado disponible:", courseDetails.certificate);
        console.log("==================================");
        
        // Si el curso no tiene certificado disponible, mostrar mensaje
        if (courseDetails.certificate !== true && courseDetails.certificate !== 1) {
          this.certificateInfo = { noCertificate: true };
          return;
        }

        const [certificateRes, examRes, progressRes] = await Promise.all([
          this.axios.get(`/course/certificate/data?course_id=${product.id}`),
          this.axios.get(`/course/exam/list?id=${product.id}`),
          this.getCourseProgress(product.id)
        ]);
      
        this.certificateInfo = certificateRes.data;
        this.certificate_exam_progress = examRes.data.exam_progress || 0;
        this.currentCourseProgress = progressRes;
      
        console.log("=== INFORMACIÓN COMPLETA DE PROGRESO ===");
        console.log("Curso seleccionado:", product);
        console.log("Progreso de videos:", this.currentCourseProgress);
        console.log("Progreso de exámenes:", this.certificate_exam_progress);
        console.log("Progreso combinado:", this.combinedProgress);
        console.log("Información del certificado:", this.certificateInfo);
        console.log("======================================");
      
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
      this.downloading = true;
      
      try {
          const response = await this.axios.get(
            `/my-courses/${this.productSelected.id}/certificate/download`,
            { responseType: 'blob' }
          );
          
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `certificado_${this.course.slug}.pdf`);
          document.body.appendChild(link);
          link.click();
          
          link.remove();
          window.URL.revokeObjectURL(url);
          
          this.$message.success('Certificado descargado exitosamente');
          
      } catch (error) {
          this.$message.error('Error al descargar el certificado');
          console.error(error);
      } finally {
          this.downloading = false;
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

/* Estilos específicos para vista de módulos */
.modules-progress-view {
  min-height: 300px;
}

.summary-card {
  transition: transform 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.module-item {
  transition: all 0.3s ease;
}

.module-item:hover {
  transform: translateY(-1px);
}

.module-status-icon {
  flex-shrink: 0;
}

/* Botones de descarga de certificado por módulo */
.btn-outline-success {
  border-color: #1ae800;
  color: #1ae800;
  transition: all 0.3s ease;
}

.btn-outline-success:hover {
  background-color: #1ae800;
  border-color: #1ae800;
  color: white;
}

.btn-outline-success:disabled {
  border-color: #8df380;
  color: #8df380;
  cursor: not-allowed;
}

/* Detalles expandibles */
details {
  cursor: pointer;
}

details summary {
  outline: none;
  user-select: none;
}

details summary::-webkit-details-marker {
  display: none;
}

details[open] summary i {
  transform: rotate(90deg);
}

details summary i {
  transition: transform 0.2s ease;
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

/* Botones de vista */
.btn-group .btn {
  border-radius: 0.375rem;
}

.btn-group .btn:not(:last-child) {
  margin-right: 0.5rem;
}

/* Spinner personalizado */
.fa-spin {
  animation: fa-spin 1s infinite linear;
}

@keyframes fa-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Tooltip */
.tooltip-wrapper {
  cursor: pointer;
}

/* Estados de carga para botones de módulo */
.bi-hourglass-split {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
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
  
  .btn-group {
    flex-direction: column;
    width: 100%;
  }
  
  .btn-group .btn {
    margin-right: 0;
    margin-bottom: 0.5rem;
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
  
  .summary-card h3 {
    font-size: 1.5rem;
  }
  
  .module-item .card-body {
    padding: 0.75rem;
  }
  
  .d-flex.align-items-center {
    flex-direction: column;
    align-items: flex-start !important;
  }
  
  .col-md-6, .col-md-2 {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .text-end {
    text-align: left !important;
  }
  
  /* Ajustes específicos para móvil en la vista de módulos */
  .module-item .row {
    flex-direction: column;
  }
  
  .module-item .col-md-6,
  .module-item .col-md-2 {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .module-item .text-end {
    text-align: center !important;
    margin-top: 0.5rem;
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

.modules-detailed {
  animation: fadeIn 0.5s ease-out;
}

/* Estados de carga */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Mejoras en la accesibilidad */
.btn:focus {
  box-shadow: 0 0 0 0.2rem rgba(26, 232, 0, 0.25);
}

.cursor-pointer {
  cursor: pointer;
}
</style>