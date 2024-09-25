<template>
  <div style="min-height: 100vh " class="mr-5">
    <div class="row mt-5">
      <section-title title="Mi aprendizaje" />
      <div class="col-md-6 text-right mr-5">
        <div class="d-flex align-items-center justify-content-end">
          <span class="mr-3" style="color: #5E5873;">Buscar:</span>
          <input type="text" placeholder="Buscar un curso" v-model="searchQuery" class="form-control form-select" style="
              height: 32px; 
              width: 250px; 
              color: #636363;" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 text-right">
      </div>

      <!--<div class="col-md-6 text-right">
        <span>Selected: {{ selected }}</span>
        <div class="custom-select-wrapper mr-5">
          <select v-model="selectedCategory" class="form-control form-select" @change="onSelectChange"
            @click="toggleArrow">
            <option value="">Filtrar por categoría</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
          <span class="custom-arrow" :class="{ up: isDropdownOpen }"></span>
        </div>
      </div>-->
    </div>

    <!--<div class="row mt-5 ml-10" style="background-color: aqua;">
      <div class="col-md-12" v-if="loading">
        <loadingCourses />
      </div>
      <div v-if="caritas" class="text-center m-auto">
        <div class="no-result sad-face">
        </div>
        <span>Sin resultados</span>
      </div>
      <div v-else :class="viewClass" v-for="(item, index) in filteredCourses" :key="index">
        <Card :course="item" :cardType="cardType" />
      </div>
    </div>-->
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

    <!-- <div class="row mt-5 ml-1">
      <div v-if="this.coursView > 0 && !loading">
          <CarrouselCourseViewed />
      </div>
    </div>   -->
  </div>
</template>

<script>
import Card from "@/components/courses/cards";
import loadingCourses from "@/components/courses/loadingCourses";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import SectionTitle from "../Navbar/SectionTitle.vue";
// import CarrouselCourseViewed from "@/components/courses/CarrouselCourseViewed";

export default {
  name: "Suscription",
  components: {
    // CarrouselCourseViewed,
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
      //Busqueda
      searchQuery: '',
      isDropdownOpen: false,
      selectedCategory: '',
      viewMode: 'grid', // 'list' o 'grid'
      categories: ['Desarrollo personal', 'Idiomas', 'Ofimática'],
      selected: '',
    };
  },

  computed: {
    ...mapGetters("lastMessage", ["getLastMessages"]),
    ...mapMutations("course", ["SET_PRODUCTOR"]),
    ...mapState("course", ["course"]),

    filteredCourses() {
      let filtered = this.informacion;

      if (this.searchQuery) {
        filtered = filtered.filter(course =>
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        console.log('After search filter:', filtered);
      }

      if (this.selectedCategory) {
        filtered = filtered.filter(course => course.category === this.selectedCategory);
        console.log('After category filter:', filtered);
      }

      return filtered;
    },

    viewClass() {
      return this.viewMode === 'grid' 
        ? 'col-md-4 col-lg-3 col-sm-6 col-xs-12 px-3'
        : 'col-12';
    }
  },

  methods: {
    ...mapActions("course", {
      getCourse: "getCourse",
    }),

    mostrarAprendiendo() {
      let datos = null;
      this.axios.get("course/last-courses-rep").then((res) => {
        datos = res.data.data;
        this.coursView = datos.length;
        console.log("AAAAAA", res.data.data);
      });
    },

    getAttributes() {
      this.axios.get("course/purchased-courses").then((datos) => {
        this.loading = false;
        this.informacion = datos.data.data;

        if (this.informacion.length == 0) {
          this.carita = true;
          this.caritas = true;
        }
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
    }
  },

  created() {
    this.getAttributes();
    // this.mostrarAprendiendo();
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
/* main {
  padding: 12px 0.5px !important;
}
.row {
  height: 100%;
}

.titulo {
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: left;
} */

/* .bordeas {
  border-radius: 20px 20px 0px 0px;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}
.bordea {
  border-radius: 20px 20px 20px 20px;
  transition: 1s;
}

.bordea:hover {
  transform: scale(1.05);
}

.carita {
  position: absolute;
  top: 0;
  height: 50%;
} */

/*
.btn {
  margin-left: 5px;
}*/

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