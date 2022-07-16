<template>
  <div style="min-height: 700px">
    <div class="row text-left px-3 h-100 h2" style="background-color: #35424a">
      <div class="col-md-12 text-white px-5">Marketplace</div>
    </div>

    <div class="row px-4">
      <div class="col-md-12 col-sm-12">
        <div v-if="notCourses" class="no-result center-element d-flex">
          <span>Lo sentimos, aún no hay cursos disponibles.</span>
        </div>
        <div class="mt-5" v-if="loading">
          <loadingCourses />
        </div>

        <div class="mb-4" v-if="relatedCourses.length > 0">
          <h3 class="m-0 font-weight-bold">Más recientes</h3>
          <CarrouselCourse :courses="relatedCourses" />
        </div>

        <div class="mb-4" v-if="courses.length > 0">
          <h3 class="m-0 font-weight-bold">Todos los cursos</h3>
          <CarrouselCourse :courses="courses" />
        </div>

        <div class="mb-4" v-if="interesCourses.length > 0">
          <h3 class="m-0 font-weight-bold">Cursos de interés</h3>
          <CarrouselCourse :courses="interesCourses" />
        </div>

        <div v-if="this.coursView > 0">
          <CarrouselCourseViewed v-if="!loading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarrouselCourse from "@/components/courses/CarrouselCourse";
import CarrouselCourseViewed from "@/components/courses/CarrouselCourseViewed";
import loadingCourses from "@/components/courses/loadingCourses";
export default {
  name: "Courses",
  components: {
    CarrouselCourseViewed,
    CarrouselCourse,
    loadingCourses,
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
      //lastCourses: [],
      interesCourses: [],
      relatedCourses: [],
      prueba: [],
      notCourses: false,

      coursView: null,
    };
  },

  methods: {
    async getAttributes() {
      // await this.axios.get("course/last-courses-rep").then((datos) => {
      //   this.lastCourses = this.filterCourseInactive(datos.data.data);
      // });

      await this.axios.get("course/related-courses").then((datos) => {
        this.courses = this.filterCourseInactive(datos.data.data);
      });

      await this.axios.get("course/interesting-courses").then((datos) => {
        this.interesCourses = this.filterCourseInactive(datos.data.data);
      });

      await this.axios.get("course/released-courses").then((datos) => {
        this.relatedCourses = this.filterCourseInactive(datos.data.data);
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

    mostrarAprendiendo() {
      let datos = null;
      this.axios.get("course/last-courses-rep").then((res) => {
        datos = res.data.data;
        this.coursView = datos.length;
      });
    },
  },
  created() {
    this.getAttributes();
    this.mostrarAprendiendo();
  },
};
</script>
