<template>
  <div :title="course.title" class="course-card" v-if="course" @click="
      cardType == 1
        ? action(course.id, course.slug)
        : cardType == 4
          ? getCertificates(course)
          : goToCourse(course)
    ">
    <div class="tarjeta-cursos">
      <div class="image-container">
        <div v-if="course.price === 0" class="free-tag-wrapper">
          <div class="free-tag">GRATIS</div>
        </div>
        <img :src="course.url_portada" alt="no image" class="img-cursos-portad" />
      </div>
      <div class="content-wrapper">
        <div class="course-header">
          <div class="rating-level-container">
            <div class="valoracion-curso">
              <v-rating style="display: inline" color="warning" hover readonly length="5" size="20"
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
              ${{ course.price_with_discount.toFixed(2) }}
            </p>
            <p class="precio-original">${{ course.price }}</p>
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
      const category = this.categories.find((cat) => cat.id === id);
      return category ? category.name : "Categoría no encontrada";
    },
    calcDiscount(price) {
      var disc = price * (this.certificateDisc / 100);
      return price - disc;
    },
    getDiscount() {
      this.spin = true;
      
      this.axios
        .get("/course/certificate-discount")
        .then((response) => {
          this.certificateDisc = response.data;
          this.spin = false;
        })
        .catch(() => {
          this.spin = false;
        });
    },
    action(id, slug) {
      this.$router
        .push({ name: "buy-cursos", params: { ide: id, slug: slug } })
        .catch(() => {
          // Handle navigation error silently
        });
    },
    getCertificates(course) {
      this.$emit("selectedCertificate", course);
    },
    async goToCourse(course) {
      try {
        const { id, ranking_by_user } = course;
        
        const res = await this.axios.get(`purchased/show-class-seen?course_id=${id}`);
        const dataRequest = res.data.data;
        
        this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);
        
        if (!dataRequest.name) {
          const temaryRes = await this.axios.get("course/temary/get-all-class/" + id);
          const fistClass = temaryRes.data.data.modules[0]?.lessons[0]?.name;
          
          const routeParams = {
            name: "curso",
            query: {
              course: id,
              class: fistClass,
              rate: ranking_by_user,
            },
          };
          
          this.$router.push(routeParams).catch(() => {
            // Handle navigation error silently
          });
        } else {
          const routeParams = {
            name: "curso",
            query: {
              course: id,
              class: dataRequest.name,
              rate: ranking_by_user,
            },
          };
          
          this.$router.push(routeParams).catch(() => {
            // Handle navigation error silently
          });
        }
      } catch (error) {
        // Handle error silently
      }
    },
  },
  created() {
    console.log("🎬 Componente Card creado con curso:", this.course);
    console.log("🔑 ID del curso:", this.course.id);
    console.log("🔑 Slug del curso:", this.course.slug);
    console.log("🔧 Props recibidas:", {
      cardType: this.cardType,
      width: this.width,
      height: this.height,
      categories: this.categories,
      viewMode: this.viewMode
    });
    this.getDiscount();
  },
  mounted() {
    // Component mounted
  }
};
</script>

<style scoped>
.course-card {
  width: 100%;
  max-width: 280px;
  min-width: 250px;
  margin: 10px;
  cursor: pointer;
}

.course-card:hover {
  transform: translateY(-5px);
}

.tarjeta-cursos {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
}

.img-cursos-portad {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.tarjeta-cursos:hover .img-cursos-portad {
  transform: scale(1.05);
}

.content-wrapper {
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.course-header {
  margin-bottom: 8px;
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
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.level-beginner {
  background-color: #e6f4ea;
  color: #1e8e3e;
}

.level-intermediate {
  background-color: #fef7e0;
  color: #f9a825;
}

.level-advanced {
  background-color: #fce8e6;
  color: #d93025;
}

.titulo-curso {
  font-size: 0.95rem;
  font-weight: 480;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.footer-content {
  margin-top: auto;
  padding-top: 12px;
}

.precios-curso {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.precio-descuento {
  color: #20e404;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

.precio-original {
  color: #ff0000;
  font-size: 0.7rem;
  text-decoration: line-through;
  margin: 0;
}

.btn-comprar {
  width: 100%;
  background: linear-gradient(to right, #20e404, #1cac0b);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.btn-comprar:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(32, 228, 4, 0.3);
}

.categoria-curso {
  font-size: 0.75rem;
  color: #757575;
  margin: 0;
  text-align: center;
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
  background: linear-gradient(to right, #20e404, #1cac0b);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>