<template>
  <div class="marketplace-page-wrapper py-4 px-3 px-md-5">
    <!-- Banner Hero / Encabezado de Marketplace -->
          <div class="row align-items-center mb-4 g-3">
            <div class="col-12 col-md-6">
              <span class="marketplace-subtitle d-block mb-1">Catálogo de Cursos & Libros</span>
              <h1 class="marketplace-main-title">Marketplace</h1>
            </div>

            <!-- Buscador Integrado -->
            <div class="col-12 col-md-6">
              <div class="d-flex align-items-center justify-content-md-end gap-3">
                <div class="marketplace-search-box flex-grow-1 flex-md-grow-0">
                  <svg class="search-icon tw-w-5 tw-h-5 tw-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar cursos o libros..."
                    v-model="searchQuery"
                    class="marketplace-search-input"
                  />
                </div>

                <!-- Cupón de Descuento Especial -->
                <div v-if="descuento" class="discount-badge-pill flex-shrink-0" title="Tu descuento exclusivo">
                  <svg class="tw-w-4 tw-h-4 tw-mr-1.5 tw-inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                  </svg>
                  <span>{{ descuento }}% OFF</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Filtros Avanzados (Píldoras y Slider) -->
          <div class="tw-flex tw-flex-col tw-gap-5 tw-mb-8">
            <!-- Píldoras: Tipo de Contenido -->
            <div class="tw-flex tw-flex-col">
              <label class="tw-text-xs tw-font-bold tw-text-gray-500 dark:tw-text-gray-400 tw-uppercase tw-mb-2 tw-tracking-wide">Tipo de Contenido</label>
              <div class="tw-flex tw-gap-2 tw-overflow-x-auto hide-scrollbar tw-pb-1">
                <button 
                  @click="selectedType = ''"
                  :class="selectedType === '' ? 'tw-bg-hm-primary tw-text-white tw-border-hm-primary' : 'tw-bg-white dark:tw-bg-gray-800 tw-text-gray-700 dark:tw-text-gray-200 tw-border tw-border-gray-200 dark:tw-border-gray-700 hover:tw-border-hm-primary'"
                  class="tw-px-4 tw-py-1.5 tw-rounded-full tw-font-semibold tw-text-sm tw-whitespace-nowrap tw-transition-colors"
                >
                  Cursos y Libros
                </button>
                <button 
                  @click="selectedType = 'courses'"
                  :class="selectedType === 'courses' ? 'tw-bg-hm-primary tw-text-white tw-border-hm-primary' : 'tw-bg-white dark:tw-bg-gray-800 tw-text-gray-700 dark:tw-text-gray-200 tw-border tw-border-gray-200 dark:tw-border-gray-700 hover:tw-border-hm-primary'"
                  class="tw-px-4 tw-py-1.5 tw-rounded-full tw-font-semibold tw-text-sm tw-whitespace-nowrap tw-transition-colors"
                >
                  Solo Cursos
                </button>
                <button 
                  @click="selectedType = 'books'"
                  :class="selectedType === 'books' ? 'tw-bg-hm-primary tw-text-white tw-border-hm-primary' : 'tw-bg-white dark:tw-bg-gray-800 tw-text-gray-700 dark:tw-text-gray-200 tw-border tw-border-gray-200 dark:tw-border-gray-700 hover:tw-border-hm-primary'"
                  class="tw-px-4 tw-py-1.5 tw-rounded-full tw-font-semibold tw-text-sm tw-whitespace-nowrap tw-transition-colors"
                >
                  Solo Libros / Ebooks
                </button>
              </div>
            </div>

            <div class="tw-flex tw-flex-wrap tw-gap-6 md:tw-gap-10">
              <!-- Píldoras: Tema / Categoría -->
              <div class="tw-flex tw-flex-col tw-flex-grow tw-min-w-[300px] tw-max-w-[600px]">
                <label class="tw-text-xs tw-font-bold tw-text-gray-500 dark:tw-text-gray-400 tw-uppercase tw-mb-2 tw-tracking-wide">Tema / Categoría</label>
                <div class="tw-flex tw-flex-col sm:tw-flex-row tw-items-start sm:tw-items-center tw-gap-3">
                  <!-- Combobox -->
                  <select :value="selectedCategory" @change="addCategoryFilter" class="tw-bg-white dark:tw-bg-gray-800 tw-border tw-border-gray-200 dark:tw-border-gray-700 hover:tw-border-hm-primary tw-rounded-lg tw-px-4 tw-py-1.5 tw-text-gray-700 dark:tw-text-white tw-font-semibold focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-hm-primary/20 tw-transition-colors tw-shadow-sm tw-cursor-pointer tw-h-[36px] tw-min-w-[180px]">
                    <option value="" disabled selected>Añadir categoría...</option>
                    <option v-for="cat in Allcategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                  </select>

                  <!-- Selected Pills -->
                  <div class="tw-flex tw-gap-2 tw-overflow-x-auto hide-scrollbar tw-pb-1 tw-flex-1 tw-w-full">
                    <span v-for="catId in selectedCategories" :key="catId" class="tw-inline-flex tw-items-center tw-gap-1.5 tw-bg-hm-primary tw-text-white tw-px-3 tw-py-1.5 tw-rounded-full tw-font-semibold tw-text-sm tw-whitespace-nowrap tw-shadow-sm">
                      {{ getCatName(catId) }}
                      <button @click="removeCategoryFilter(catId)" class="tw-ml-1 hover:tw-text-gray-200 focus:tw-outline-none tw-flex tw-items-center tw-justify-center">
                        <svg class="tw-w-3.5 tw-h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </span>
                    <span v-if="selectedCategories.length === 0" class="tw-text-sm tw-text-gray-400 tw-italic tw-py-1.5 tw-px-2">
                      Todas
                    </span>
                  </div>
                </div>
              </div>

              <!-- Slider: Precio Máximo -->
              <div class="tw-flex tw-flex-col tw-w-full md:tw-w-auto md:tw-min-w-[200px] md:tw-ml-auto">
                <div class="tw-flex tw-items-center tw-justify-between tw-mb-3 tw-w-full">
                  <label class="tw-text-xs tw-font-bold tw-text-gray-500 dark:tw-text-gray-400 tw-uppercase tw-tracking-wide tw-mr-4 tw-mb-0">Precio Máximo</label>
                  <span class="tw-text-sm tw-font-bold tw-text-gray-900 dark:tw-text-gray-100 tw-whitespace-nowrap">
                    {{ maxPrice === 0 ? 'Gratis' : (maxPrice >= 200 ? 'Sin límite' : 'Hasta $' + maxPrice) }}
                  </span>
                </div>
                <input 
                  type="range" 
                  v-model.number="maxPrice" 
                  min="0" 
                  max="200" 
                  step="5"
                  class="tw-w-full tw-h-2 tw-bg-gray-200 dark:tw-bg-gray-700 tw-rounded-lg tw-appearance-none tw-cursor-pointer custom-accent"
                />
              </div>
            </div>
          </div>

          <!-- Contenido Principal -->
          <div v-if="loading" class="mt-4">
            <loadingCourses />
          </div>

          <div v-else>
            <!-- Título Principal -->
            <h2 class="tw-text-3xl tw-font-extrabold tw-text-gray-900 dark:tw-text-white tw-mb-8">Qué aprender ahora</h2>

            <!-- Sección: Recomendaciones (Carrusel) -->
            <div class="marketplace-section mb-5" v-if="filteredRecommendations.length">
              <div class="d-flex align-items-center justify-content-between mb-4">
                <h3 class="tw-text-xl tw-font-bold tw-text-gray-800 dark:tw-text-gray-100 mb-0">
                  Recomendaciones para ti
                </h3>
              </div>
              <CarrouselCourseMarketplace :courses="filteredRecommendations" />
            </div>

            <!-- Sección Única: Catálogo Completo (Grid) -->
            <div class="marketplace-section mb-5" v-if="filteredAllItems.length">
              <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 tw-gap-4">
                <div v-for="item in filteredAllItems" :key="item.id + (Number(item.product_type_id) === 2 ? '-book' : '-course')">
                  <component :is="'Card'" :course="item" :cardType="1" :categories="Allcategories" />
                </div>
              </div>
            </div>
            
            <div v-if="!filteredAllItems.length" class="empty-section text-center py-5">
              <svg class="tw-w-16 tw-h-16 tw-mx-auto tw-mb-4 tw-text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <h4 class="tw-text-lg tw-font-bold tw-text-gray-600">No encontramos resultados</h4>
              <p class="text-muted mb-0">Intenta con otros filtros o términos de búsqueda.</p>
            </div>
          </div>
  </div>
</template>

<script>
import Card from "./cards/marketplace.vue";
import CarrouselCourseMarketplace from "@/components/courses/CarrouselCourseMarketplace";
import loadingCourses from "@/components/courses/loadingCourses";
import { mapState } from "vuex";
import { authGet } from "@/helpers/authStorage";

export default {
  name: "Courses",
  components: {
    Card,
    CarrouselCourseMarketplace,
    loadingCourses,
  },
  data() {
    return {
      cuenta: authGet("id_account_type"),
      informacion: [],
      lord: true,
      limite: 5,
      lorde: true,
      prendido: true,
      guardar: false,
      total: [],
      noexis: false,
      loading: true,
      mostrar: false,
      title: "1231",
      age: 123,
      courses: [],
      movies: [],
      interesCourses: [],
      relatedCourses: [],
      recentCourses: [],
      lastRecentCourses: [],
      releasedBooks: [],
      approvalDateField: "updated_at",
      prueba: [],
      notCourses: false,
      coursView: null,
      certificateDisc: 0,
      courseDisc: 0,
      searchQuery: "",
      isDropdownOpen: false,
      selectedCategory: "",
      selectedType: "", // "" (todos), "courses", "books"
      categories: ["1"],
      userPreferences: [],
      Allcategories: [],
      descuento: 0,
      viewMode: "grid",
      maxPrice: 200,
      selectedCategories: [], // Array to hold multiple selected categories
    };
  },
  computed: {
    ...mapState("course", ["course"]),
    filteredRecommendations() {
      // Combina los cursos recientes y algunos libros recientes para el carrusel
      let combined = [];
      let baseCourses = [...this.recentCourses];
      let baseBooks = [...this.releasedBooks];

      // Si el usuario tiene preferencias, filtramos TODO el catálogo (this.courses y this.releasedBooks)
      if (this.userPreferences.length > 0) {
        baseCourses = [...this.courses].filter(item => this.userPreferences.includes(Number(item.id_categories)));
        baseBooks = [...this.releasedBooks].filter(item => this.userPreferences.includes(Number(item.id_categories)));
        
        // Si después de filtrar no hay nada (muy raro), caemos de vuelta a los recientes para no dejarlo vacío.
        if (baseCourses.length === 0 && baseBooks.length === 0) {
            baseCourses = [...this.recentCourses];
            baseBooks = [...this.releasedBooks];
        }
      }

      if (this.selectedType === 'books') {
        combined = [...baseBooks.slice(0, 8)];
      } else if (this.selectedType === 'courses') {
        combined = [...baseCourses.slice(0, 8)];
      } else {
        combined = [...baseCourses.slice(0, 6), ...baseBooks.slice(0, 4)];
      }

      if (this.searchQuery) {
        combined = combined.filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedCategories && this.selectedCategories.length > 0) {
        combined = combined.filter(
          (item) => this.selectedCategories.includes(String(item.id_categories))
        );
      }

      if (this.maxPrice < 200) {
        combined = combined.filter(
          (item) => Number(item.price || 0) <= this.maxPrice
        );
      }

      return combined;
    },
    currentView() {
      console.log(this.viewMode);
      return this.viewMode === "list"
        ? "CardList"
        : "CarrouselCourseMarketplace";
    },
    filteredAllItems() {
      // Combina todos los cursos y libros basándose en el filtro de tipo
      let combined = [];
      if (this.selectedType === 'books') {
        combined = [...this.releasedBooks];
      } else if (this.selectedType === 'courses') {
        combined = [...this.courses];
      } else {
        combined = [...this.courses, ...this.releasedBooks];
      }

      if (this.searchQuery) {
        combined = combined.filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedCategories && this.selectedCategories.length > 0) {
        combined = combined.filter(
          (item) => this.selectedCategories.includes(String(item.id_categories))
        );
      }

      if (this.maxPrice < 200) {
        combined = combined.filter(
          (item) => Number(item.price || 0) <= this.maxPrice
        );
      }

      return combined;
    },
  },
  methods: {
    getCatName(catId) {
      const cat = this.Allcategories.find(c => String(c.id) === String(catId));
      return cat ? cat.name : "";
    },
    addCategoryFilter(event) {
      const catId = String(event.target.value);
      if (catId && !this.selectedCategories.includes(catId)) {
        this.selectedCategories.push(catId);
      }
      this.selectedCategory = ""; // reset dropdown
    },
    removeCategoryFilter(catId) {
      this.selectedCategories = this.selectedCategories.filter(id => id !== catId);
    },
    async getAttributes() {
      try {
        const results = await Promise.allSettled([
          this.axios.get("category/list"),
          this.axios.get("course/released-courses"),
          this.axios.get("course/related-courses"),
          this.axios.get("course/interesting-courses"),
          this.axios.get("course/list-available-books"),
          this.axios.get("preferences/show-preferences"),
        ]);

        const [
          categoriesResult,
          releasedCoursesResult,
          relatedCoursesResult,
          interestingCoursesResult,
          releasedBooksResult,
          preferencesResult,
        ] = results;

        if (categoriesResult.status === "fulfilled" && categoriesResult.value?.data?.data) {
          this.Allcategories = categoriesResult.value.data.data;
        } else {
          this.Allcategories = [];
        }

        if (
          preferencesResult && 
          preferencesResult.status === "fulfilled" && 
          preferencesResult.value?.data?.data
        ) {
          // Extraer solo los IDs de las categorías preferidas
          this.userPreferences = preferencesResult.value.data.data.map(p => Number(p.categories_id));
        } else {
          this.userPreferences = [];
        }

        if (
          releasedCoursesResult.status === "fulfilled" &&
          releasedCoursesResult.value?.data?.data &&
          Array.isArray(releasedCoursesResult.value.data.data)
        ) {
          const allCourses = releasedCoursesResult.value.data.data;
          this.filterRecentCourses(allCourses);
        } else {
          this.recentCourses = [];
        }

        if (
          relatedCoursesResult.status === "fulfilled" &&
          Array.isArray(relatedCoursesResult.value?.data?.data)
        ) {
          this.courses = relatedCoursesResult.value.data.data.filter(
            (course) => !course.isPurchased
          );
        } else {
          this.courses = [];
        }

        if (this.courses.length > 0) {
          this.descuento = this.courses[0].du;
        }

        const idCategories = this.courses.map((curso) => curso.id_categories);
        this.getCategoryName(idCategories);

        if (
          interestingCoursesResult.status === "fulfilled" &&
          Array.isArray(interestingCoursesResult.value?.data?.data)
        ) {
          this.interesCourses = interestingCoursesResult.value.data.data;
        } else {
          this.interesCourses = [];
        }

        if (
          releasedBooksResult.status === "fulfilled" &&
          Array.isArray(releasedBooksResult.value?.data?.data)
        ) {
          this.releasedBooks = releasedBooksResult.value.data.data;
        } else {
          this.releasedBooks = [];
        }

        this.notCourses =
          !this.courses.length &&
          !this.interesCourses.length &&
          !this.recentCourses.length;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
    },

    filterRecentCourses(courses) {
      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

      const recentCourses = courses.filter((course) => {
        if (!course[this.approvalDateField]) {
          return false;
        }

        const approvalDate = new Date(course[this.approvalDateField]);
        return approvalDate >= fifteenDaysAgo && !course.isPurchased;
      });

      recentCourses.sort((a, b) => {
        const dateA = new Date(a[this.approvalDateField]);
        const dateB = new Date(b[this.approvalDateField]);
        return dateB - dateA;
      });

      if (recentCourses.length > 0) {
        this.recentCourses = recentCourses;
        this.lastRecentCourses = recentCourses;
      } else {
        this.recentCourses = this.lastRecentCourses;
      }

      this.relatedCourses = this.recentCourses;
    },

    getCategoryName(idCategories) {
      const categoryMap = new Map();

      this.Allcategories.forEach((category) => {
        if (idCategories.includes(category.id)) {
          categoryMap.set(category.id, category.name);
        }
      });

      this.categories = Array.from(categoryMap.entries()).map(([id, name]) => ({
        id,
        name,
      }));

      console.log("Category Names:", this.categories);
    },

    aumentar() {
      this.limite += 5;
      this.lorde = true;
      if (this.informacion.length == this.total.length - 1) {
        this.prendido = false;
        this.lorde = false;
        this.noexis = true;
      }
    },

    goToClass(courseId) {
      this.$router.push({
        name: "course-user",
        query: {
          course: courseId,
          class: 1,
        },
      });
    },

    toggleView(mode) {
      this.viewMode = mode;
    },

    onSelectChange() {
      this.selected = this.selectedCategory;
    },

    toggleArrow() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style scoped>
.marketplace-page-wrapper {
  min-height: 85vh;
}

.marketplace-subtitle {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.9rem !important;
  color: #71717A !important;
  font-weight: 600 !important;
}

.marketplace-main-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 800 !important;
  font-size: 2.1rem !important;
  color: #18181B !important;
}

/* Caja de Búsqueda */
.marketplace-search-box {
  position: relative;
  width: 100%;
  max-width: 320px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.marketplace-search-input {
  width: 100%;
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 16px !important;
  padding: 10px 16px 10px 42px !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.92rem !important;
  color: #18181B !important;
  transition: all 0.25s ease !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03) !important;
}

.marketplace-search-input:focus {
  outline: none;
  border-color: var(--primary-color) !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15) !important;
}

/* Cupón de Descuento */
.discount-badge-pill {
  background: var(--primary-color) !important;
  color: #FFFFFF !important;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 0.88rem;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
}

/* Pills de Categorías Estilo Preline Marketplace */
.categories-pills-bar {
  scrollbar-width: thin;
}

.cat-pill-btn {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  color: #71717A !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 600 !important;
  font-size: 0.88rem !important;
  padding: 8px 18px !important;
  border-radius: 20px !important;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
  cursor: pointer;
}

.cat-pill-btn:hover {
  border-color: var(--primary-color) !important;
  color: var(--primary-color) !important;
}

.cat-pill-btn.active {
  background: var(--primary-color) !important;
  color: #FFFFFF !important;
  border-color: var(--primary-color) !important;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25) !important;
}

/* Títulos de Sección */
.section-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.3rem !important;
  color: #18181B !important;
  display: flex;
  align-items: center;
}

/* Selector de Vista (Grid / List) */
.view-mode-toggle {
  background: #FFFFFF;
  border: 1px solid #E5E3DC;
  border-radius: 14px;
  padding: 3px;
}

.toggle-btn {
  background: transparent;
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background: var(--primary-color) !important;
}

.empty-section {
  background: #FFFFFF;
  border: 1px solid #E5E3DC;
  border-radius: 18px;
  padding: 2rem;
}
</style>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
/* Slider Accent */
.custom-accent {
  accent-color: #18d600;
}
</style>
