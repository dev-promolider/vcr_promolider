<template>
  <div class="marketplace-page-wrapper container-fluid py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-xl-11">
        <div class="marketplace-card p-4 p-md-5">
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

          <!-- Filtro de Categorías Estilo Preline Marketplace (Pill Chips) -->
          <div class="categories-pills-bar d-flex align-items-center gap-2 mb-5 pb-2 overflow-x-auto">
            <button
              :class="['cat-pill-btn', { active: !selectedCategory }]"
              @click="selectedCategory = ''"
            >
              Todas las categorías
            </button>
            <button
              v-for="cat in Allcategories"
              :key="cat.id"
              :class="['cat-pill-btn', { active: selectedCategory == cat.id }]"
              @click="selectedCategory = cat.id"
            >
              {{ cat.name }}
            </button>
          </div>

          <!-- Contenido Principal -->
          <div v-if="loading" class="mt-4">
            <loadingCourses />
          </div>

          <div v-else>
            <!-- Sección: Más recientes -->
            <div class="marketplace-section mb-5" v-if="recentCourses.length">
              <div class="d-flex align-items-center justify-content-between mb-4">
                <h3 class="section-title mb-0">
                  <svg class="tw-w-6 tw-h-6 tw-mr-2 tw-text-[#10B981] tw-inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                  Más Recientes
                </h3>
                
                <!-- Selector de Vista (Grid / Lista) -->
                <div class="view-mode-toggle d-flex">
                  <button
                    :class="['toggle-btn', { active: viewMode === 'grid' }]"
                    @click="viewMode = 'grid'"
                    title="Vista en Cuadrícula"
                  >
                    <svg class="tw-w-4 tw-h-4" :class="viewMode === 'grid' ? 'tw-text-white' : 'tw-text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                  </button>
                  <button
                    :class="['toggle-btn', { active: viewMode === 'list' }]"
                    @click="viewMode = 'list'"
                    title="Vista en Lista"
                  >
                    <svg class="tw-w-4 tw-h-4" :class="viewMode === 'list' ? 'tw-text-white' : 'tw-text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div v-if="!filteredRecentCourses.length" class="empty-section text-center py-4">
                <p class="text-muted mb-0">No hay cursos recientes que coincidan con la búsqueda.</p>
              </div>

              <component v-else :is="currentView" :courses="filteredRecentCourses" />
            </div>

            <!-- Sección: Todos los cursos -->
            <div class="marketplace-section mb-5">
              <div class="d-flex align-items-center justify-content-between mb-4">
                <h3 class="section-title mb-0">
                  <svg class="tw-w-6 tw-h-6 tw-mr-2 tw-text-[#10B981] tw-inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  </svg>
                  Todos los Cursos
                </h3>
              </div>

              <div v-if="!filteredAllCourses.length" class="empty-section text-center py-5">
                <svg class="tw-w-12 tw-h-12 tw-mx-auto tw-mb-3 tw-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <p class="text-muted mb-0">No hay cursos disponibles actualmente en esta selección.</p>
              </div>

              <component v-else :is="currentView" :courses="filteredAllCourses" />
            </div>

            <!-- Sección: Todos los Libros -->
            <div class="marketplace-section mb-4" v-if="releasedBooks.length">
              <div class="d-flex align-items-center justify-content-between mb-4">
                <h3 class="section-title mb-0">
                  <svg class="tw-w-6 tw-h-6 tw-mr-2 tw-text-[#10B981] tw-inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  Todos los Libros
                </h3>
              </div>

              <div v-if="!filteredReleasedBooks.length" class="empty-section text-center py-4">
                <p class="text-muted mb-0">No hay libros disponibles en esta categoría.</p>
              </div>

              <component v-else :is="currentView" :courses="filteredReleasedBooks" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarrouselCourseMarketplace from "@/components/courses/CarrouselCourseMarketplace";
import CardList from "./cards/cardList.vue";
import loadingCourses from "@/components/courses/loadingCourses";
import SectionTitle from "../Navbar/SectionTitle.vue";
import { mapState } from "vuex";

export default {
  name: "Courses",
  components: {
    CarrouselCourseMarketplace,
    CardList,
    loadingCourses,
    SectionTitle,
  },
  data() {
    return {
      cuenta: localStorage.getItem("id_account_type"),
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
      categories: ["1"],
      Allcategories: [],
      selected: "",
      descuento: 0,
      viewMode: "grid",
    };
  },
  computed: {
    ...mapState("course", ["course"]),
    currentView() {
      console.log(this.viewMode);
      return this.viewMode === "list"
        ? "CardList"
        : "CarrouselCourseMarketplace";
    },
    filteredRecentCourses() {
      let filtered = this.recentCourses;

      if (this.searchQuery) {
        filtered = filtered.filter((course) =>
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedCategory) {
        filtered = filtered.filter(
          (course) => course.id_categories == this.selectedCategory
        );
      }

      return filtered;
    },
    filteredAllCourses() {
      let filtered = this.courses;

      if (this.searchQuery) {
        filtered = filtered.filter((course) =>
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedCategory) {
        filtered = filtered.filter(
          (course) => course.id_categories == this.selectedCategory
        );
      }

      return filtered;
    },
    filteredReleasedBooks() {
      let filtered = this.releasedBooks;

      if (this.searchQuery) {
        filtered = filtered.filter((book) =>
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },
  },
  methods: {
    async getAttributes() {
      try {
        const results = await Promise.allSettled([
          this.axios.get("category/list"),
          this.axios.get("course/released-courses"),
          this.axios.get("course/related-courses"),
          this.axios.get("course/interesting-courses"),
          this.axios.get("course/list-available-books"),
        ]);

        const [
          categoriesResult,
          releasedCoursesResult,
          relatedCoursesResult,
          interestingCoursesResult,
          releasedBooksResult,
        ] = results;

        if (categoriesResult.status === "fulfilled" && categoriesResult.value?.data?.data) {
          this.Allcategories = categoriesResult.value.data.data;
        } else {
          this.Allcategories = [];
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

/* Tarjeta Principal */
.marketplace-card {
  background: #FAF9F5 !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 24px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
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
  border-color: #10B981 !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15) !important;
}

/* Cupón de Descuento */
.discount-badge-pill {
  background: #10B981 !important;
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
  border-color: #10B981 !important;
  color: #10B981 !important;
}

.cat-pill-btn.active {
  background: #10B981 !important;
  color: #FFFFFF !important;
  border-color: #10B981 !important;
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
  background: #10B981 !important;
}

.empty-section {
  background: #FFFFFF;
  border: 1px solid #E5E3DC;
  border-radius: 18px;
  padding: 2rem;
}
</style>
