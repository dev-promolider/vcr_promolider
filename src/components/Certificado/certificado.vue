<template>
  <div class="row px-3 py-5">
    <!-- Courses Column -->
    <div class="col-12 col-md-4 ps-5">
      <div v-if="products.length == 0" class="text-center py-5">
        <strong>Aún no ha adquirido un curso</strong>
      </div>
      <template v-else>
        <div
          v-for="product in products"
          :key="product.id"
          class="course-card mb-3"
          @click="getCertificateInfo(product)"
        >
          <div class="tarjeta-cursos">
            <div class="column image-column">
              <img
                class="img-cursos-portad"
                :src="product.url_portada"
                alt="Course cover"
              />
            </div>
            <div class="column info-column">
              <h4 class="course-title">{{ product.title }}</h4>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Certificate Details Column -->
    <div class="col-12 col-md-8 pe-5">
      <div v-if="waitSelection" class="text-center py-10">
        <strong>Seleccione un curso para ver la información del certificado</strong>
      </div>
      <div v-else class="certificate-details">
        <div class="selected-course-card">
          <img
            class="selected-course-img"
            :src="productSelected.url_portada"
            alt="Selected course cover"
          />
          <div class="selected-course-info">
            <h2>{{ productSelected.title }}</h2>
          </div>
        </div>

        <div v-if="certificateInfo" class="certificate-info">
          <h3>Información del Certificado</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>Condición:</strong>
              <span>{{ getConditionText(certificateInfo.condition_to_certificate) }}</span>
            </div>
            <div class="info-item">
              <strong>Tipo:</strong>
              <span>{{ certificateInfo.type_certificate === 1 ? "Gratuito" : "De pago" }}</span>
            </div>
            <div class="info-item">
              <strong>Validado por:</strong>
              <span>{{ getValidatedByText(certificateInfo.validated_by) }}</span>
            </div>
            <div v-if="certificateInfo.validated_by === 'module'" class="info-item">
              <strong>Módulo:</strong>
              <span>{{ certificateInfo.module_name }}</span>
            </div>
            <div v-if="certificateInfo.validated_by === 'lesson'" class="info-item">
              <strong>Clase:</strong>
              <span>{{ certificateInfo.lesson_name }}</span>
            </div>
            <div v-if="certificateInfo.type_certificate === 0" class="info-item">
              <strong>Precio:</strong>
              <span>${{ certificateInfo.certificate_price }}</span>
            </div>
          </div>

          <div class="progress-section">
            <h4>Progreso del Curso</h4>
            <div class="progress-info">
              <span>Progreso total: {{ combinedProgress }}%</span>
              <v-progress-linear
                :value="combinedProgress"
                color="#1ae800"
                height="10"
                rounded
              ></v-progress-linear>
            </div>
            <div class="additional-progress-info">
              <p v-if="showVideoProgress">Progreso de videos: {{ currentCourseProgress }}%</p>
              <p v-if="showExamProgress">Progreso de exámenes: {{ certificate_exam_progress }}%</p>
            </div>
          </div>

          <div class="claim-certificate">
            <v-btn
              :disabled="!canClaimCertificate"
              depressed
              color="#1ae800"
              class="text-white"
              @click="claimCertificate"
            >
              Reclamar Certificado
            </v-btn>
            <v-tooltip v-if="!canClaimCertificate" bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on" class="tooltip-trigger">¿Por qué no puedo reclamar el certificado?</span>
              </template>
              <span>Aún no cumple los requisitos para reclamar el certificado.</span>
            </v-tooltip>
          </div>
        </div>
        <div v-else>
          <p>No hay información de certificado disponible para este curso.</p>
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
      return this.certificateInfo && this.certificateInfo.condition_to_certificate !== 1;
    },

    showExamProgress() {
      return this.certificateInfo && (this.certificateInfo.condition_to_certificate === 1 || this.certificateInfo.condition_to_certificate === 2);
    },

    combinedProgress() {
      if (!this.certificateInfo) return 0;

      switch (this.certificateInfo.condition_to_certificate) {
        case 0:
          return this.currentCourseProgress;
        case 1:
          return this.certificate_exam_progress;
        case 2:
          return (this.currentCourseProgress + this.certificate_exam_progress) / 2;
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

        // Update the course progress
        await this.$store.dispatch("course/updateCourseProgress", product.id);

        this.checkCertificateEligibility();
      } catch (error) {
        console.error("Error fetching certificate info:", error);
        this.certificateInfo = null;
      }
    },

    async checkCertificateEligibility() {
      try {
        const response = await this.axios.get(`/course/certificate/check/${this.productSelected.id}`);
        this.canClaimCertificate = response.data.canClaim;
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

    claimCertificate() {
      this.axios
        .post(`/course/certificate/claim/${this.productSelected.id}`)
        .then(() => {
          alert("Certificado reclamado con éxito");
        })
        .catch((error) => {
          console.error("Error al reclamar el certificado:", error);
          alert("No se pudo reclamar el certificado. Intente nuevamente.");
        });
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>

<style scoped>
.course-card {
  border-radius: 15px;
  transition: 0.3s;
  cursor: pointer;
  max-width: 100%;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.tarjeta-cursos {
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  height: 100px;
}

.image-column {
  flex: 1;
}

.img-cursos-portad {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-column {
  flex: 2;
  padding-left: 10px;
}

.course-title {
  font-size: 1em;
  font-weight: 500;
  margin: 0;
}

.certificate-details {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.selected-course-card {
  display: flex;
  border-radius: 15px;
  overflow: hidden;
  background-color: #f5f5f5;
  margin-bottom: 20px;
}

.selected-course-img {
  width: 150px;
  height: 100px;
  object-fit: cover;
}

.selected-course-info {
  padding: 15px;
  flex: 1;
}

.selected-course-info h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.certificate-info h3 {
  margin-bottom: 15px;
  border-bottom: 2px solid #1ae800;
  padding-bottom: 5px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item strong {
  margin-bottom: 5px;
  color: #555;
}

.progress-section {
  margin-top: 20px;
}

.progress-section h4 {
  margin-bottom: 10px;
}

.progress-info {
  margin-bottom: 10px;
}

.additional-progress-info {
  font-size: 0.9em;
  color: #666;
}

.claim-certificate {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.tooltip-trigger {
  margin-left: 10px;
  color: #1ae800;
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 767px) {
  .selected-course-card {
    flex-direction: column;
  }

  .selected-course-img {
    width: 100%;
    height: 150px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
