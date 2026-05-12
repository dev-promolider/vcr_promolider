<template>
  <div style="min-height: 100vh; overflow: hidden" class="mr-5">
    <div class="row mt-1">
      <SectionTitle title="Marketplace" />
      <div class="col-md-6 text-right mr-5">
        <div class="d-flex align-items-center justify-content-end">
          <span class="mr-3" style="color: #5e5873">Buscar:</span>
          <input type="text" placeholder="Buscar un curso" v-model="searchQuery" class="form-control form-select"
            style="height: 32px; width: 250px; color: #636363" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 text-left">
        <div class="descuento-container ml-10">
          <p class="descuento-text mb-0">Tu descuento:</p>
          <button class="descuento-btn" id="descuentoBtn">
            {{ descuento }}%
          </button>
        </div>
      </div>

      <div class="col-md-6 text-right">
        <div class="custom-select-wrapper mr-5">
          <select v-model="selectedCategory" class="form-control form-select" @change="onSelectChange"
            @click="toggleArrow">
            <option value="">Filtrar por categoría</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <span class="custom-arrow" :class="{ up: isDropdownOpen }"></span>
        </div>
      </div>
    </div>

    <div class="row px-4">
      <div class="col-md-12 col-sm-12">
        <div class="mt-5" v-if="loading">
          <loadingCourses />
        </div>

        <div class="mb-4 ml-2" v-if="!loading">
          <div class="d-flex justify-content-between">
            <div class="text-left">
              <h3 class="mb-1 font-weight-normal ml-5">Más recientes</h3>
            </div>
            <div class="text-right">
              <v-btn-toggle v-model="viewMode" class="mb-3">
                <v-btn :value="'list'" :class="{ selected: viewMode === 'list' }" @click="toggleView('list')">
                  <v-icon>mdi-format-list-bulleted</v-icon>
                </v-btn>
                <v-btn :value="'grid'" :class="{ selected: viewMode === 'grid' }" @click="toggleView('grid')">
                  <v-icon>mdi-grid</v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>

          <div v-if="!relatedCourses.length" class="text-center my-4">
            <p>No hay cursos recientes disponibles.</p>
          </div>

          <component v-if="relatedCourses.length > 0" :is="currentView" :courses="filteredRecentCourses" />
        </div>

        <div class="mb-4 ml-2" v-if="!loading">
          <h3 class="font-weight-normal mt-7 mb-5">Todos los cursos</h3>

          <div v-if="!courses.length" class="text-center my-4">
            <p>No hay cursos disponibles.</p>
          </div>

          <component v-if="courses.length > 0" :is="currentView" :courses="filteredAllCourses" />
        </div>

        <div class="mb-4 ml-2" v-if="!loading">
          <h3 class="font-weight-normal mt-7 mb-5">Todos los Libros</h3>

          <div v-if="!releasedBooks.length" class="text-center my-4">
            <p>No hay libros disponibles.</p>
          </div>

          <component v-if="releasedBooks.length > 0" :is="currentView" :courses="filteredReleasedBooks" />
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
        const [
          categoriesRes,
          releasedCoursesRes,
          relatedCoursesRes,
          interestingCoursesRes,
          releasedBooksRes,
        ] = await Promise.all([
          this.axios.get("category/list"),
          this.axios.get("course/released-courses"),
          this.axios.get("course/related-courses"),
          this.axios.get("course/interesting-courses"), // ← el que faltaba
          this.axios.get("course/list-available-books"),
        ]);

        console.log("📦 Respuestas recibidas:");

        this.Allcategories = categoriesRes.data.data;

        if (
          releasedCoursesRes &&
          releasedCoursesRes.data &&
          Array.isArray(releasedCoursesRes.data.data)
        ) {
          const allCourses = releasedCoursesRes.data.data;
          this.filterRecentCourses(allCourses);
        } else {
          console.warn("⚠️ Respuesta inesperada de released-courses:", releasedCoursesRes);
          this.recentCourses = [];
        }

        this.courses = Array.isArray(relatedCoursesRes.data?.data)
          ? relatedCoursesRes.data.data.filter((course) => !course.isPurchased)
          : [];

        if (this.courses.length > 0) {
          this.descuento = this.courses[0].du;
        }

        const idCategories = this.courses.map((curso) => curso.id_categories);
        this.getCategoryName(idCategories);

        this.interesCourses = Array.isArray(interestingCoursesRes.data?.data)
          ? interestingCoursesRes.data.data
          : [];

        this.releasedBooks = Array.isArray(releasedBooksRes.data?.data)
          ? releasedBooksRes.data.data
          : [];

        this.loading = false;
        this.notCourses =
          !this.courses.length &&
          !this.interesCourses.length &&
          !this.relatedCourses.length;
      } catch (error) {
        console.error("Error fetching data:", error);
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

<style>
.sad-face {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.descuento-container {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.descuento-text {
  font-size: 24px;
  margin-right: 10px;
  margin-bottom: 0;
  white-space: nowrap;
}

.descuento-btn {
  background-image: url("../../assets/Ticket.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  color: #4a4a4a;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}

/* Media query para pantallas pequeñas */
@media (max-width: 768px) {
  .descuento-container {
    justify-content: center;
    margin-left: 0;
  }

  .descuento-text {
    font-size: 20px;
  }

  .descuento-btn {
    width: 160px;
    height: 40px;
    font-size: 20px;
  }
}

.descuento-btn:hover {
  transform: scale(1.1);
}

.form-select {
  width: 200px;
  font-size: 0.8em;
  color: #ccc;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
  appearance: none;
  padding-right: 30px;
}

.form-select::placeholder {
  color: #ccc;
}

.form-select:hover,
.form-select:focus {
  border-color: #1bd0033d;
  box-shadow: 0 0 15px rgba(26, 208, 3, 0.5);
}

.form-select option {
  color: #000;
}

.form-select option:hover {
  background-color: #1bd003e0;
  color: #000;
}

.custom-select-wrapper {
  position: relative;
  display: inline-block;
}

.custom-arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #ccc;
  pointer-events: none;
}

.custom-arrow.up {
  border-top: none;
  border-bottom: 5px solid #ccc;
}

.form-select:focus+.custom-arrow {
  border-top: none;
  border-bottom: 5px solid #ccc;
}
</style>
