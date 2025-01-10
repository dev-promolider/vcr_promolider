<template>
  <div style="min-height: 100vh; overflow: hidden" class="mr-5">
    <div class="row mt-5">
      <section-title title="Mi aprendizaje" />
      <div class="col-md-6 search-container">
        <div class="search-wrapper">
          <span class="search-label" style="color: #5e5873">Buscar:</span>
          <input type="text" placeholder="Buscar un curso" v-model="searchQuery"
            class="form-control form-select search-input" />
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="courses-container">
        <div v-if="loading">
          <loadingCourses />
        </div>
        <div v-if="caritas" class="text-center m-auto">
          <div class="no-result sad-face"></div>
          <span>Sin resultados</span>
        </div>
        <div v-else class="courses-list">
          <Card v-for="(item, index) in filteredCourses" :key="index" :course="item" :cardType="cardType" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/courses/cards";
import loadingCourses from "@/components/courses/loadingCourses";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import SectionTitle from "../Navbar/SectionTitle.vue";

export default {
  name: "Suscription",
  components: {
    loadingCourses,
    Card,
    SectionTitle,
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
      this.axios.get("course/purchased-courses").then((datos) => {
        this.loading = false;
        this.informacion = datos.data.data;

        if (this.informacion.length === 0) {
          this.carita = true;
          this.caritas = true;
        }
      });
    },
  },

  created() {
    this.getAttributes();
  },
};
</script>

<style scoped>
.courses-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: 50px;
}

.courses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 35px;
}

.search-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-right: 20px;
}

.search-wrapper {
  display: flex;
  align-items: center;
  max-width: 350px;
  width: 100%;
}

.search-label {
  margin-right: 10px;
  white-space: nowrap;
}

.search-input {
  flex-grow: 1;
  height: 32px;
  color: #636363;
}

/* Estilos responsivos */
@media screen and (max-width: 768px) {
  .mr-5 {
    margin-right: 0 !important;
  }

  .row {
    flex-direction: column;
  }

  .search-container {
    margin-top: 15px;
    margin-right: 0;
    justify-content: center;
  }

  .search-wrapper {
    width: 90%;
    max-width: 100%;
    margin: 0 auto;
  }

  .search-label {
    margin-right: 10px;
    font-size: 0.9em;
  }

  .search-input {
    width: 100%;
    font-size: 0.9em;
  }
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
