<template>
  <div style="min-height: 100vh" class="mr-5">
    <div class="row mt-5">
      <SectionTitle title="Marketplace" />
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
      <div class="col-md-6 text-left">
        <div class="row ml-10">
          <p class="descuento-text">Tu descuento:</p>
          <button class="descuento-btn" id="descuentoBtn">
            {{ descuento }}%
          </button>
        </div>

      </div>

      <div class="col-md-6 text-right">
        <!--<span>Selected: {{ selected }}</span>-->
        <div class="custom-select-wrapper mr-5">
          <select v-model="selectedCategory" class="form-control form-select" @change="onSelectChange"
            @click="toggleArrow">
            <option value="">Filtrar por categoría</option>
            <!--<option v-for="category in uniqueCategories" :key="category.id" :value="category.name">{{ category.name }} </option>-->
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
          <span class="custom-arrow" :class="{ up: isDropdownOpen }"></span>
        </div>
      </div>
    </div>

    <div class="row px-4">
      <div class="col-md-12 col-sm-12">
        <div v-if="notCourses" class="mb-4">
          <h3 class="m-0 font-weight-bold">Cursos</h3>
          <div class="no-result sad-face">
            <span>Lo sentimos, aún no hay cursos disponibles.</span>
          </div>
        </div>

        <div class="mt-5" v-if="loading">
          <loadingCourses />
        </div>


        <div class="mb-4 ml-2" v-if="relatedCourses.length > 0 && !loading">
          <div class="d-flex justify-content-between">
            <div class="text-left">
              <h3 class="mb-1 font-weight-normal ml-5">Más recientes</h3>
            </div>
            <div class="text-right">
              <!--
              <v-btn-toggle rounded="xl">
                <v-btn icon="mdi-format-align-right"></v-btn>
                <v-btn icon="mdi-format-align-justify"></v-btn>
              </v-btn-toggle>
              -->
              <v-btn-toggle v-model="viewMode" class="mb-3">
                <v-btn :value="'list'" class="{ 'selected': viewMode === 'list' }" @click="toggleView('list')">
                  <v-icon>mdi-format-list-bulleted</v-icon>
                </v-btn>
                <v-btn :value="'grid'" class="{ 'selected': viewMode === 'grid' }" @click="toggleView('grid')">
                  <v-icon>mdi-grid</v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>
          <component :is="currentView" :courses="filteredCourses" />
          <!--<CarrouselCourseMarketplace :courses="filteredCourses" />-->
        </div>


        <!--<div class="col-md-12 mb-3">
      <v-btn-toggle v-model="commentType" mandatory class="custom-btn-toggle">
        <v-btn :value="'private'" class="custom-btn">
          <v-icon v-if="commentType === 'private'" right class="check-icon">mdi-check</v-icon>
          Privados
        </v-btn>
        <v-btn :value="'public'" class="custom-btn">
          <v-icon v-if="commentType === 'public'" right class="check-icon">mdi-check</v-icon>
          Públicos
        </v-btn>
      </v-btn-toggle>
    </div>-->

        <div class="mb-4 ml-2" v-if="!loading">
          <h3 class="font-weight-normal mt-7 mb-5">Todos los cursos</h3>
          <!--<CarrouselCourseMarketplace :courses="courses" />-->
          <component :is="currentView" :courses="courses" />
        </div>

        <!-- <div class="mb-4" v-if="!loading">
          <h3 class="m-0 font-weight-normal">Cursos de interés</h3>
          <CarrouselCourseMarketplace :courses="interesCourses"/>
        </div> -->


      </div>
    </div>
  </div>
</template>

<script>
import CarrouselCourseMarketplace from "@/components/courses/CarrouselCourseMarketplace";
import CardList from "./cards/cardList.vue"
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
      //nameUser: localStorage.getItem("name_user"),
      cuenta: localStorage.getItem("id_account_type") /* hice esto */,
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
      prueba: [],
      notCourses: false,
      coursView: null,
      certificateDisc: 0,
      courseDisc: 0,
      //busqueda
      searchQuery: '',
      isDropdownOpen: false,
      selectedCategory: '',
      categories: ['1'],
      Allcategories: [],
      selected: '',
      descuento: 0,
      //vista:
      viewMode: 'grid',
    };
  },
  computed: {
    ...mapState("course", ["course"]),
    //vista
    currentView() {
      console.log(this.viewMode);
      return this.viewMode === 'list' ? 'CardList' : 'CarrouselCourseMarketplace';
    },
    //busqueda
    filteredCourses() {
      console.log('Filtering with:', this.searchQuery, this.selectedCategory);
      let filtered = this.courses;

      if (this.searchQuery) {
        filtered = filtered.filter(course =>
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        console.log('After search filter:', filtered);
      }

      if (this.selectedCategory) {
        filtered = filtered.filter(course => course.id_categories == (this.selectedCategory));
        console.log('After category filter:', filtered);
      }

      console.log('Filtered courses:', filtered);
      return filtered;
    },
  },
  methods: {
    async getAttributes() {
      // await this.axios.get("course/last-courses-rep").then((datos) => {
      //   this.lastCourses = this.filterCourseInactive(datos.data.data);
      // });
      await this.axios.get("category/list").then((res) => {
        console.log("CATEGORIAAAAS:(", res.data.data)
        this.Allcategories = res.data.data;
      });

      await this.axios.get("course/released-courses").then((datos) => {
        console.log("releaSed-cursos:", datos.data.data)
        this.relatedCourses = datos.data.data;
      });

      await this.axios.get("course/related-courses").then((datos) => {
        console.log("releated-cursos:", datos.data.data)
        //this.courses = datos.data.data;
        const cursos = datos.data.data;
        console.log("CURSO1:", cursos[0].du)
        this.descuento = cursos[0].du;
        const idCategories = cursos.map(curso => curso.id_categories);
        console.log("id_categories:", idCategories);
        this.getCategoryName(idCategories);

        this.courses = cursos;
      });

      await this.axios.get("course/interesting-courses").then((datos) => {
        this.interesCourses = datos.data.data;
      });

      this.loading = false;

      if (
        this.courses.length === 0 &&
        this.interesCourses.length === 0 &&
        this.relatedCourses.length === 0
      ) {
        this.notCourses = true;
      }
    },

    getCategoryName(idCategories) {
      // Mapa para almacenar nombres únicos
      const categoryMap = new Map();

      // Itera sobre Allcategories para construir el mapa de nombres
      this.Allcategories.forEach(category => {
        if (idCategories.includes(category.id)) {
          categoryMap.set(category.id, category.name);
        }
      });

      // Convierte el mapa en una lista única de nombres
      //this.categories = Array.from(categoryNamesMap.values());
      this.categories = Array.from(categoryMap.entries()).map(([id, name]) => ({ id, name }));
      console.log("Category Names:", this.categories)
    },

    filterCourseInactive(data) {
      var courseFilter;
      if (this.cuenta == 5) {
        /* hice esto */
        courseFilter = data.filter((course) => {
          return course.status != 0 && course.course_level_id == 1;
        });
      } else {
        courseFilter = data.filter((course) => {
          return course.status != 0;
        });
      }

      return courseFilter;
    },

    aumentar() {
      this.limite += 5;
      this.lorde = true;
      if (this.informacion.length == this.total.length - 1) {
        this.prendido = false;
        this.lorde = false;
        this.noexis = true;
      }
      // this.informacion.forEach(cursos=>{
      //   this.age =cursos.id + 1
      //   console.log(this.age)
      // })
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
    }
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


.descuento-text {
  font-size: 24px;
  margin-right: 10px;
}

.descuento-btn {
  background-image: url('../../assets/Ticket.png');
  /*background-color: aqua;*/
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
  color: #4A4A4A;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-left: 5px;
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


/* BTON TOGGLE*/
/*.v-btn-toggle .v-btn {
  border: 1px solid #ccc; /* Estilo del borde 
  background-color: transparent; /* Fondo transparente
  color: #636363; /* Color del icono por defecto 
  position: relative; /* Necesario para posicionar las cruces 
}

.v-btn-toggle .v-btn.selected {
  background-color: #C2E7FF; /* Color de fondo del botón seleccionado 
  color: #636363; /* Color del icono del botón seleccionado 
}

.v-btn-toggle .v-btn .v-icon {
  color: inherit; /* Hereda el color del botón 
}

.v-btn-toggle .v-btn::before {
  content: '✗'; /* Carácter de la cruz 
  position: absolute;
  left: -24px; /* Ajustar según sea necesario 
  color: #636363; /* Color de la cruz 
  font-size: 16px; /* Tamaño de la cruz 
  display: inline-block; /* Asegura que se alinee bien con el icono 
  line-height: 1; /* Asegura el alineamiento vertical 
}*/

.v-btn-toggle .v-btn.selected {
  background-color: #C2E7FF;
  color: #636363;
}

</style>
