<template>

  <div class="container-fluid mt-4">
    <div v-if="loading">
      <loadingCourses/>
    </div>
    <div v-else>
      <!-- Últimos cursos -->
        <div class="row mb-4" v-if="lastCourses.length >0">
            <h3 class="font-weight-bold">Últimos cursos</h3>
            <CarrouselCourse :courses="lastCourses"/>
        </div>

        <!-- Todos los cursos -->
        <div class="row mb-4" v-if="courses.length >0">
            <h3 class="font-weight-bold">Todos los cursos</h3>
            <CarrouselCourse :courses="courses"/>
        </div>

        <!-- Cursos de interes -->
        <div class="row mb-4" v-if="interesCourses.length >0">
            <h3 class="font-weight-bold">Cursos de interés</h3>
            <CarrouselCourse :courses="interesCourses"/>
        </div>

        <!-- Cursos recien lanzados -->
        <div class="row mb-4" v-if="relatedCourses.length >0">
            <h3 class="font-weight-bold">Cursos recién lanzados</h3>
            <CarrouselCourse :courses="relatedCourses"/>
        </div>

        <!-- Continuar aprendiendo -->
        <!-- <div class="row mb-4" v-if="relatedCourses.length >0">
            <h3 class="font-weight-bold">{{ nameUser }}, continuemos nuestro aprendizaje</h3>
            <CarrouselCourse :courses="relatedCourses"/>  
        </div> -->
    </div>
  </div>
</template>

<script>


import CarrouselCourse from '@/components/courses/CarrouselCourse';
import loadingCourses from '@/components/courses/loadingCourses'
export default {
    
  name: "Courses",
  components: {
     CarrouselCourse,
     loadingCourses
  },
  data() {
    return {
      nameUser: localStorage.getItem("name_user"),
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
      lastCourses: [],
      interesCourses: [],
      relatedCourses: [],
      prueba: [],
    };
  },



  methods: {
    async getAttributes() {
      await this.axios.get("course/last-courses-rep").then((datos) => {
        this.lastCourses = datos.data.data;
        this.mostrar= true,
        this.img= this.lastCourses.image
      });
        
      await this.axios.get("course/related-courses").then((datos) => {
        this.lord = false;
        this.guardar = true;
        this.loading = false;
        this.mostrar = true;
        this.courses = datos.data.data;
      });

      await this.axios.get("course/interesting-courses").then((datos) => {
        this.interesCourses = datos.data.data;
      });

      await this.axios.get("course/released-courses").then((datos) => {
        this.relatedCourses = datos.data.data;
         console.log(this.relatedCourses);
      });

      this.loading=false;
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

    // datos() {
    //   this.movies.forEach((datos) => {
    //     this.preferens.push(datos);
    //   });
    //   // console.log(this.preferens);
    //   const categorias = this.preferens.map((p) => {
    //     for (const i in p) {
    //       return p[i];
    //     }
    //   });
    //   categorias.forEach((cat) => {
    //     for (const i in cat) {
    //       this.cursos.push(cat[i]);
    //     }
    //   });
    //   // console.log(this.cursos);
    // },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style scoped>
/* links
https://www.tiktok.com/@rubentuestaok/video/7057606896286502149 
https://www.tiktok.com/@_ismaelsanchez18/video/7059826752171969798
*/

.container-fluid{
    width: 90%;
    height: 100%;
    margin: auto;
    overflow-y: scroll ;
}

.container-fluid::-webkit-scrollbar{
  display: none;
}


h3{
    color: #707070;
    font-size: 25px;
    margin-bottom: 15px;
}



</style>
