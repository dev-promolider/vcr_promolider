<template>
  <div :title="course.title" class="course-card" v-if="course" @click="
      cardType == 1
        ? action(course.id, course.slug, course.product_type_id)
        : cardType == 4
          ? getCertificates(course)
          : goToCourse(course)
    ">
    <div class="tarjeta-cursos">
      <div class="image-container">
        <div v-if="course.price === 0" class="free-tag-wrapper">
          <div class="free-tag">GRATIS</div>
        </div>
        <img
          :src="course.url_portada ? (course.url_portada.startsWith('http') ? course.url_portada.replace('s3.sa-east-1', 's3-accelerate') : 'https://promolider-storage-user.s3-accelerate.amazonaws.com/' + course.url_portada) : ''"
          alt="Portada del curso"
          class="img-cursos-portad"
          @error="onImgError"
        />
      </div>
      <div class="content-wrapper">
        <div class="course-header">
          <div class="rating-level-container">
            <div class="valoracion-curso">
              <v-rating style="display: inline" color="#F59E0B" hover readonly length="5" size="18"
                :value="parseFloat(course.ranking_by_user)" half-increments></v-rating>
            </div>
            <span class="level-badge" :class="getLevelClass(course.course_level_id)">
              {{ getLevelText(course.course_level_id) }}
            </span>
          </div>
        </div>
        <div class="info-curso">
          <h3 class="titulo-curso">{{ course.title }}</h3>
        </div>
        <div class="footer-content">
          <div class="precios-curso">
            <p class="precio-descuento">
              ${{ course.price_with_discount ? course.price_with_discount.toFixed(2) : course.price }}
            </p>
            <p v-if="course.price_with_discount && course.price_with_discount < course.price" class="precio-original">${{ course.price }}</p>
          </div>
          <button class="btn-comprar">
            {{
              course.price === 0
                ? "INSCRIBIRSE"
                : viewMode === "myCourses"
                  ? "Ver mi curso"
                  : "COMPRAR"
            }}
          </button>
          <p class="categoria-curso">
            {{ getCategoryName(course.id_categories) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      photo: null,
      certificateDisc: 0,
      categoria: null,
    };
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
    cardType: {
      type: Number,
      required: true,
    },
    width: Number,
    height: {
      type: String,
      default: "100%",
    },
    categories: {
      type: Array,
      default: () => [],
    },
    viewMode: {
      type: String,
      default: "marketplace",
    },
  },
  methods: {
    onImgError(e) {
      if (e && e.target) {
        e.target.src = require("@/assets/background-login.webp");
      }
    },
    getLevelText(levelId) {
      const levels = {
        1: "Básico",
        2: "Intermedio",
        3: "Avanzado",
      };
      return levels[levelId] || "Básico";
    },
    getLevelClass(levelId) {
      const levelClasses = {
        1: "level-beginner",
        2: "level-intermediate",
        3: "level-advanced",
      };
      return levelClasses[levelId] || "level-beginner";
    },
    getCategoryName(id) {
      if (!this.categories || !Array.isArray(this.categories)) return "General";
      const cat = this.categories.find((c) => c && c.id === id);
      return cat ? cat.name : "General";
    },
    action(id, slug, productTypeId) {
      if (productTypeId === 2) {
        this.$router.push({
          name: "buy-books",
          params: { ide: id, slug: slug },
        });
      } else {
        this.$router.push({
          name: "buy-cursos",
          params: { ide: id, slug: slug },
        });
      }
    },
    getCertificates(course) {
      this.$router.push({
        name: "buy-certificate",
        params: { courseId: course.id },
      });
    },
    goToCourse(course) {
      this.$router.push({
        name: "buy-cursos",
        params: { ide: course.id, slug: course.slug },
      });
    },
    getDiscount() {
      // Logic for discount
    },
  },
  created() {
    this.getDiscount();
  },
};
</script>

<style scoped>
.course-card {
  width: 100%;
  max-width: 290px;
  min-width: 250px;
  margin: 10px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease !important;
}

.course-card:hover {
  transform: translateY(-6px);
}

.tarjeta-cursos {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 18px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04) !important;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
}

.course-card:hover .tarjeta-cursos {
  border-color: #10B981 !important;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15) !important;
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  background: #E5E3DC;
}

.img-cursos-portad {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.tarjeta-cursos:hover .img-cursos-portad {
  transform: scale(1.06);
}

.content-wrapper {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.course-header {
  margin-bottom: 10px;
}

.rating-level-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.valoracion-curso {
  flex-shrink: 0;
}

.level-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.level-beginner {
  background-color: rgba(16, 185, 129, 0.12);
  color: #10B981;
}

.level-intermediate {
  background-color: #FEF3C7;
  color: #D97706;
}

.level-advanced {
  background-color: #FEE2E2;
  color: #EF4444;
}

.titulo-curso {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1rem !important;
  font-weight: 700 !important;
  color: #18181B !important;
  margin: 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.footer-content {
  margin-top: auto;
  padding-top: 14px;
}

.precios-curso {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}

.precio-descuento {
  font-family: 'Outfit', sans-serif !important;
  color: #10B981 !important;
  font-size: 1.25rem !important;
  font-weight: 800 !important;
  margin: 0;
}

.precio-original {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  color: #9CA3AF !important;
  font-size: 0.82rem !important;
  text-decoration: line-through;
  margin: 0;
}

.btn-comprar {
  width: 100%;
  background: #10B981 !important;
  color: #FFFFFF !important;
  border: none;
  padding: 10px 16px;
  border-radius: 12px;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  cursor: pointer;
  transition: all 0.25s ease;
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.btn-comprar:hover {
  background: #059669 !important;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
}

.categoria-curso {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.78rem;
  color: #71717A;
  margin: 0;
  text-align: center;
  font-weight: 500;
}

.free-tag-wrapper {
  position: absolute;
  top: 15px;
  right: -35px;
  width: 120px;
  height: 24px;
  transform: rotate(45deg);
  z-index: 2;
}

.free-tag {
  width: 100%;
  height: 100%;
  background: #10B981;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>