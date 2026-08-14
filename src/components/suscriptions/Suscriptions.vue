<template>
  <div class="tw-w-full tw-min-h-screen tw-py-6 tw-px-2 sm:tw-px-4">
    <!-- Encabezado de Sección -->
    <div class="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-justify-between tw-gap-4 tw-mb-8">
      <div>
        <h1 class="tw-font-outfit tw-text-3xl tw-font-extrabold tw-text-gray-900 dark:tw-text-white tw-tracking-tight">
          Mi aprendizaje
        </h1>
        <p class="tw-font-jakarta tw-text-sm tw-text-gray-500 dark:tw-text-gray-400 tw-mt-1">
          Accede a tus cursos inscritos y continúa con tu desarrollo profesional.
        </p>
      </div>

      <!-- Buscador de Cursos Estilizado -->
      <div class="tw-relative tw-w-full md:tw-w-80">
        <div class="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-3.5 tw-flex tw-items-center tw-pointer-events-none">
          <svg class="tw-w-5 tw-h-5 tw-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar en mis cursos..."
          class="mi-aprendizaje-search-input tw-w-full tw-pl-10 tw-pr-4 tw-py-2.5 tw-rounded-xl tw-text-sm placeholder:tw-text-gray-400 dark:placeholder:tw-text-gray-500 focus:tw-outline-none focus:tw-border-[var(--primary-color)] focus:tw-ring-2 focus:tw-ring-[var(--primary-color)]/20 tw-transition-all tw-shadow-sm"
          style="background-color: var(--input-bg); border-color: var(--border-color); color: var(--text-bold);"
        />
      </div>
    </div>

    <!-- Contenedor Principal de Cursos -->
    <div v-if="loading" class="tw-w-full">
      <loadingCourses />
    </div>

    <div
      v-else-if="filteredCourses.length === 0 || caritas"
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-16 tw-bg-white dark:tw-bg-[rgba(22,30,46,0.65)] tw-rounded-2xl tw-border tw-border-gray-200/80 dark:tw-border-[rgba(255,255,255,0.08)] tw-shadow-sm"
    >
      <div class="tw-w-16 tw-h-16 tw-rounded-full tw-bg-gray-100 dark:tw-bg-[#161e2e] tw-flex tw-items-center tw-justify-center tw-mb-4">
        <svg class="tw-w-8 tw-h-8 tw-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      </div>
      <h3 class="tw-font-outfit tw-text-lg tw-font-bold tw-text-gray-900 dark:tw-text-white tw-mb-1">
        Sin cursos disponibles
      </h3>
      <p class="tw-font-jakarta tw-text-sm tw-text-gray-500 dark:tw-text-gray-400">
        No hemos encontrado cursos activos que coincidan con tu búsqueda.
      </p>
    </div>

    <!-- Grilla Adaptativa Responsive -->
    <div
      v-else
      class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-6"
    >
      <Card
        v-for="(item, index) in filteredCourses"
        :key="index"
        :course="item"
        :cardType="cardType"
      />
    </div>
  </div>
</template>

<script>
import Card from "@/components/courses/cards";
import loadingCourses from "@/components/courses/loadingCourses";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

export default {
  name: "Suscription",
  components: {
    loadingCourses,
    Card,
  },
  data() {
    return {
      informacion: [],
      loading: true,
      carita: false,
      caritas: false,
      cardType: 2,
      coursView: null,
      searchQuery: "",
      isDropdownOpen: false,
      selectedCategory: "",
      viewMode: "grid",
      categories: ["Desarrollo personal", "Idiomas", "Ofimática"],
      selected: "",
    };
  },

  computed: {
    ...mapGetters("lastMessage", ["getLastMessages"]),
    ...mapMutations("course", ["SET_PRODUCTOR"]),
    ...mapState("course", ["course"]),

    filteredCourses() {
      let filtered = this.informacion;

      if (this.searchQuery) {
        filtered = filtered.filter((course) =>
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedCategory) {
        filtered = filtered.filter(
          (course) => course.category === this.selectedCategory
        );
      }

      return filtered;
    },
  },

  methods: {
    ...mapActions("course", {
      getCourse: "getCourse",
    }),

    getAttributes() {
      this.axios
        .get("course/purchased-courses")
        .then((datos) => {
          this.informacion = (datos && datos.data && datos.data.data) ? datos.data.data : [];

          if (this.informacion.length === 0) {
            this.carita = true;
            this.caritas = true;
          }
        })
        .catch(() => {
          this.informacion = [];
          this.carita = true;
          this.caritas = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  created() {
    this.getAttributes();
  },
};
</script>

<style scoped>
</style>
