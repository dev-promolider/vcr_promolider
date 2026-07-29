<template>
  <div
    v-if="course"
    :title="course.title"
    class="ecommerce-course-card"
    @click="handleCardClick"
  >
    <!-- Cover Image Wrapper -->
    <div class="card-image-wrapper">
      <img
        :src="coverUrl"
        :alt="course.title"
        class="card-cover-img"
        @error="onImgError"
      />
    </div>

    <!-- Content Section -->
    <div class="card-body-content">
      <!-- Title -->
      <h3 class="card-title-text">{{ course.title }}</h3>

      <!-- Dynamic Description from API fields (description / summary / subtitle / detail / last_class_reprod) -->
      <p v-if="courseDescription" class="card-description-text">
        {{ courseDescription }}
      </p>
      <div v-else class="d-flex align-center mt-2 mb-1">
        <v-rating
          class="custom-rating"
          color="#F59E0B"
          hover
          readonly
          length="5"
          size="18"
          :value="parseFloat(course.ranking_by_user || 5)"
          half-increments
        ></v-rating>
        <span class="rating-number-text ml-2">{{ course.ranking_by_user || '5.0' }}</span>
      </div>

      <!-- Action Button -->
      <div class="card-action-footer mt-4">
        <button class="read-more-btn">
          <span>{{ actionText }}</span>
          <v-icon right size="18" class="arrow-icon">mdi-arrow-right</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    course: {
      type: Object,
      required: true,
    },
    cardType: {
      type: Number,
      default: 1,
    },
    width: Number,
    height: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      photo: null,
      certificateDisc: 0,
    };
  },
  computed: {
    coverUrl() {
      if (!this.course || !this.course.url_portada) {
        return require("@/assets/background-login.webp");
      }
      if (this.course.url_portada.startsWith("http")) {
        return this.course.url_portada.replace("s3.sa-east-1", "s3-accelerate");
      }
      return (
        "https://promolider-storage-user.s3-accelerate.amazonaws.com/" +
        this.course.url_portada
      );
    },
    actionText() {
      if (this.cardType === 1) return "Ver curso";
      if (this.cardType === 4) return "Obtener certificado";
      return "Continuar";
    },
    courseDescription() {
      if (!this.course) return "";
      const rawText =
        this.course.description ||
        this.course.summary ||
        this.course.short_description ||
        this.course.subtitle ||
        this.course.detail ||
        this.course.meta_description ||
        "";
      if (!rawText) return "";
      // Limpiar etiquetas HTML si el backend retorna HTML formatted text
      return String(rawText).replace(/<[^>]*>?/gm, "").trim();
    },
  },
  methods: {
    onImgError(e) {
      if (e && e.target) {
        e.target.src = require("@/assets/background-login.webp");
      }
    },
    handleCardClick() {
      this.logCourseData();
      if (this.cardType === 1) {
        this.action(this.course.id, this.course.slug);
      } else if (this.cardType === 4) {
        this.getCertificates(this.course);
      } else {
        this.goToCourse(this.course.id);
      }
    },
    logCourseData() {
      // Console debug
    },
    action(id, slug) {
      this.$router
        .push({ name: "buy-cursos", params: { ide: id, slug: slug } })
        .catch(() => {});
    },
    getCertificates(course) {
      this.$emit("selectedCertificate", course);
    },
    async goToCourse(id) {
      let dataRequest;
      try {
        const res = await this.axios.get(`purchased/show-class-seen?course_id=${id}`);
        dataRequest = res.data.data;
        if (dataRequest && dataRequest.display_time) {
          this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);
        }
      } catch (e) {
        dataRequest = {};
      }

      if (!dataRequest || !dataRequest.name) {
        try {
          const res = await this.axios.get("course/temary/get-all-class/" + id);
          let firstClass = res.data.data.modules[0].lessons[0].name;
          this.$router
            .push({
              name: "curso",
              query: {
                course: id,
                class: firstClass,
                rate: this.course.ranking_by_user,
              },
            })
            .catch(() => {});
        } catch (e) {
          // fallback
        }
      } else {
        this.$router
          .push({
            name: "curso",
            query: {
              course: id,
              class: dataRequest.name,
              rate: this.course.ranking_by_user,
            },
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style scoped>
.ecommerce-course-card {
  background: #FAF9F5 !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 24px !important;
  padding: 20px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 340px;
  min-width: 270px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  cursor: pointer;
  overflow: hidden;
}

.ecommerce-course-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 14px 32px rgba(16, 185, 129, 0.15) !important;
  border-color: #10B981 !important;
}

.card-image-wrapper {
  width: 100%;
  height: 190px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: #E5E3DC;
}

.card-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.ecommerce-course-card:hover .card-cover-img {
  transform: scale(1.04);
}

.card-body-content {
  display: flex;
  flex-direction: column;
  margin-top: 18px;
  flex: 1;
}

.card-title-text {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #18181B !important;
  line-height: 1.3;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-description-text {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.88rem !important;
  color: #71717A !important;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating-number-text {
  font-size: 0.82rem;
  font-weight: 600;
  color: #71717A;
}

.card-action-footer {
  margin-top: 20px;
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  background: #FFFFFF;
  color: #18181B;
  border: 1px solid #E5E3DC;
  border-radius: 12px;
  padding: 8px 18px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.ecommerce-course-card:hover .read-more-btn {
  background: #10B981;
  color: #FFFFFF;
  border-color: #10B981;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
}

.ecommerce-course-card:hover .arrow-icon {
  color: #FFFFFF !important;
  transform: translateX(4px);
}

.arrow-icon {
  color: #71717A !important;
  transition: transform 0.2s ease, color 0.2s ease;
}
</style>
