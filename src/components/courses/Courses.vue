<template>
  <div style="min-height: 100vh">
    <SectionTitle title="Marketplace" />

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
          <h3 class="mb-1 font-weight-normal">Más recientes</h3>
          <CarrouselCourseMarketplace :courses="relatedCourses"/>
        </div>

        <div class="mb-4 ml-2" v-if="courses.length > 0 && !loading">
          <h3 class="mb-2 font-weight-normal">Todos los cursos</h3>
          <CarrouselCourseMarketplace :courses="courses"/>
        </div>

        <div class="mb-4" v-if="interesCourses.length > 0 && !loading">
          <h3 class="m-0 font-weight-normal">Cursos de interés</h3>
          <CarrouselCourseMarketplace :courses="interesCourses"/>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import CarrouselCourseMarketplace from "@/components/courses/CarrouselCourseMarketplace";
import loadingCourses from "@/components/courses/loadingCourses";
import SectionTitle from "../Navbar/SectionTitle.vue";
export default {
  name: "Courses",
  components: {
    CarrouselCourseMarketplace,
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
      //lastCourses: [],
      interesCourses: [],
      relatedCourses: [],
      prueba: [],
      notCourses: false,
      coursView: null,
      certificateDisc: 0,
      courseDisc: 0,
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
</style>
