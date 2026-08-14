<template>
  <div
    v-if="course"
    :title="course.title"
    class="ecommerce-course-card"
    @click="handleCardClick"
  >
    <!-- Card Type 1 (Default E-commerce) -->
    <template v-if="cardType === 1 || cardType === 4">
      <div class="card-image-wrapper">
        <img
          :src="coverUrl"
          :alt="course.title"
          class="card-cover-img"
          @error="onImgError"
        />
      </div>

      <div class="card-body-content">
        <h3 class="card-title-text">{{ course.title }}</h3>
        <p v-if="courseDescription" class="card-description-text">
          {{ courseDescription }}
        </p>
        <div v-else class="d-flex align-center mt-2 mb-1">
          <div class="d-flex align-center custom-rating">
            <i class="fas fa-star" style="color: #F59E0B; font-size: 14px;"></i>
            <span style="color: #F59E0B; font-size: 14px; margin-left: 4px; font-weight: bold;">{{ parseFloat(course.ranking_by_user || 5).toFixed(1) }}</span>
          </div>
          <span class="rating-number-text ml-2">{{ course.ranking_by_user || '5.0' }}</span>
        </div>

        <div class="card-action-footer tw-mt-4 tw-flex tw-items-center tw-gap-2">
          <button class="read-more-btn tw-group tw-flex-1 tw-justify-center">
            <span>{{ actionText }}</span>
            <svg class="tw-w-4 tw-h-4 tw-ml-2 tw-text-gray-500 group-hover:tw-text-white tw-transition-transform group-hover:tw-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>

          <button 
            v-if="cardType === 1"
            @click.stop="addToCart" 
            class="cart-btn-icon tw-p-2.5 tw-rounded-xl tw-bg-[var(--primary-color)]/15 hover:tw-bg-[var(--primary-color)] tw-text-[var(--primary-color)] hover:tw-text-white tw-border tw-border-[var(--primary-color)]/40 tw-transition-all tw-shrink-0 tw-flex tw-items-center tw-justify-center"
            title="Añadir al carrito"
            style="background-color: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.4);"
          >
            <svg class="tw-w-5 tw-h-5" style="stroke: var(--primary-color); color: var(--primary-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"></path>
            </svg>
          </button>
        </div>
      </div>
    </template>

    <!-- Card Type 2 (Udemy Style - Mi Aprendizaje) -->
    <template v-else-if="cardType === 2">
      <!-- Image with floating menu -->
      <div class="udemy-card-image">
        <img
          :src="coverUrl"
          :alt="course.title"
          class="udemy-cover-img"
          @error="onImgError"
        />
        <button class="udemy-menu-btn" @click.stop="toggleMenu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="isMenuOpen" class="udemy-dropdown-menu" @click.stop>
          <button class="udemy-dropdown-item" @click.stop="shareCourse">
            <svg class="tw-w-4 tw-h-4 tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
            </svg>
            Compartir
          </button>
        </div>
      </div>

      <!-- Card Body -->
      <div class="udemy-card-body">
        <h3 class="udemy-card-title">{{ course.title }}</h3>
        <p class="udemy-card-author" v-if="course.author_name">
          {{ course.author_name }} {{ course.author_lastname }}
        </p>

        <!-- Progress Section -->
        <div class="udemy-progress-container">
          <div class="udemy-progress-bar-bg">
            <div class="udemy-progress-bar-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="udemy-card-footer">
          <div class="udemy-progress-text">
            <span v-if="progressPercentage > 0">{{ progressPercentage }}% completado</span>
            <span v-else class="udemy-start-text">EMPEZAR CURSO</span>
          </div>
          
          <div class="udemy-rating-section">
            <div class="udemy-star-rating" style="display: flex; align-items: center; gap: 4px;">
              <i class="fas fa-star" style="color: #F59E0B; font-size: 12px;"></i>
              <span style="color: #F59E0B; font-size: 12px; font-weight: bold;">{{ parseFloat(course.ranking_by_user || 5).toFixed(1) }}</span>
            </div>
            <span class="udemy-rating-text">Tu calificación</span>
          </div>
        </div>
      </div>
    </template>
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
      isMenuOpen: false,
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
    progressPercentage() {
      if (this.course && this.course.progress) {
        return Math.round(parseFloat(this.course.progress));
      }
      return 0;
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
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    shareCourse() {
      this.isMenuOpen = false;
      const url = `${window.location.origin}/course/${this.course.slug || this.course.id}`;
      navigator.clipboard.writeText(url).then(() => {
        const toast = document.createElement('div');
        toast.textContent = '✔  Enlace copiado al portapapeles';
        Object.assign(toast.style, {
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999,
          background: '#18d600', color: '#fff',
          padding: '12px 20px', borderRadius: '10px', fontFamily: 'Outfit, sans-serif',
          fontSize: '14px', fontWeight: '600', boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          maxWidth: '340px', transition: 'opacity 0.4s', opacity: '1',
        });
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3000);
      });
    },
    addToCart() {
      if (!this.course) return;
      const item = {
        id: this.course.id,
        title: this.course.title,
        price: parseFloat(this.course.price_with_discount > 0 ? this.course.price_with_discount : (this.course.price || this.course.precio || 0)),
        precio: parseFloat(this.course.precio || this.course.price || 0),
        url_portada: this.course.url_portada,
        category: this.course.categoria || 'Curso',
        slug: this.course.slug,
      };
      this.$store.dispatch('cart/addToCart', item);
    },
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
          this.$router
            .push({
              name: "curso",
              query: {
                course: id,
                rate: this.course.ranking_by_user,
              },
            })
            .catch(() => {});
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
  max-width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  cursor: pointer;
  overflow: hidden;
}

.ecommerce-course-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 14px 32px rgba(16, 185, 129, 0.15) !important;
  border-color: var(--primary-color) !important;
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
  background: var(--primary-color);
  color: #FFFFFF;
  border-color: var(--primary-color);
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

/* Udemy Style Customizations */
.ecommerce-course-card[title] {
  padding: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.ecommerce-course-card[title]:hover {
  transform: none !important;
  box-shadow: none !important;
}

.udemy-card-image {
  width: 100%;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  background: #E5E3DC;
  border-radius: 0;
  overflow: hidden;
}

.udemy-cover-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.udemy-card-image:hover .udemy-cover-img {
  filter: brightness(0.9);
}

.udemy-menu-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #FFFFFF;
  border: none;
  border-radius: 4px;
  padding: 4px;
  color: #18181B;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: background 0.2s ease;
}

.udemy-menu-btn:hover {
  background: #F4F4F5;
}

.udemy-dropdown-menu {
  position: absolute;
  top: 40px;
  right: 8px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 4px;
  min-width: 140px;
  z-index: 10;
}

.udemy-dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.85rem;
  color: #18181B;
  cursor: pointer;
  transition: background 0.2s ease;
}

.udemy-dropdown-item:hover {
  background: #F4F4F5;
}

.udemy-card-body {
  padding: 12px 0 0 0;
  display: flex;
  flex-direction: column;
}

.udemy-card-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.05rem !important;
  font-weight: 700 !important;
  color: #18181B !important;
  line-height: 1.25;
  margin: 0 0 4px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.udemy-card-author {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8rem;
  color: #71717A;
  margin: 0 0 12px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.udemy-progress-container {
  width: 100%;
  height: 6px;
  background-color: #E5E7EB;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.udemy-progress-bar-bg {
  width: 100%;
  height: 100%;
}

.udemy-progress-bar-fill {
  height: 100%;
  background-color: #8B5CF6; /* Purple color matching mockup */
  border-radius: 3px;
  transition: width 0.3s ease;
}

.udemy-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 4px;
}

.udemy-progress-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #4B5563;
}

.udemy-start-text {
  font-weight: 700;
  color: #18181B;
}

.udemy-rating-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.udemy-star-rating {
  margin-bottom: 2px;
}

.udemy-rating-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.7rem;
  color: #71717A;
}

/* Dark mode adjustments if necessary */
html.dark-mode .udemy-card-title { color: #FFFFFF !important; }
html.dark-mode .udemy-card-author { color: #A1A1AA; }
html.dark-mode .udemy-progress-text { color: #D1D5DB; }
html.dark-mode .udemy-start-text { color: #E5E7EB; }
html.dark-mode .udemy-progress-container { background-color: #374151; }
</style>
