<template>
  <main
    v-if="lastCourses.length > 0"
    :class="lastCourses.length > 0 ? 'main-content' : 'main-none'"
  >
    <h4 class="font-weight-normal pl-2">{{ username }}, continua aprendiendo:</h4>
    <vue-horizontal class="horizontal pl-1">
      <section class="m-3" v-for="course in lastCourses" :key="course.id">
        <Card :course="course" :cardType="3" />
      </section>
    </vue-horizontal>
  </main>
</template>

<script>
import Card from "@/components/courses/cards/index.vue";

export default {
  name: "CarrouselCourseViewed",
  components: {
    Card,
  },
  data() {
    return {
      username: localStorage.getItem("name_user"),
      lastCourses: [],
      peeked: false,
      timeout: null,
      // baseURL: "http://promolider.xyz/storage/",
    };
  },
  methods: {
    async getAttributes() {
      // Obtenemos los cursos ya reproducidos
      await this.axios.get("course/last-courses-rep").then((datos) => {
        // Filtramos todos los cursos inactivos
        this.lastCourses = this.filterCourseInactive(datos.data.data);
        // Recorremos los cursos con la finalidad de obtener la ultima clase vista
        for (let i = 0; i < this.lastCourses.length; i++) {
          // Por cada curso obtenemos su ultima clase vista
          this.axios
            .get(
              `purchased/show-class-seen?course_id=${this.lastCourses[i].id}`
            )
            .then((res) => {
              // Si no tiene clase vista enviamos a la primera clase del curso
              if (!res.data.data.name) {
                this.axios
                  .get("course/temary/get-all-class/" + this.lastCourses[i].id)
                  .then((res) => {
                    this.lastCourses[i].last_class_reprod =
                      res.data.data.modules[0].lessons[0].name;
                  });
              } else {
                // Si tiene clase vista remplazamos el atributo "last_class_reprod" por el nombre de la clase
                this.lastCourses[i].last_class_reprod = res.data.data.name;
              }
            });
        }
      });
    },

    // Filtramos si los cursos tiene estado activo o inactivo
    filterCourseInactive(data) {
      var courseFilter = data.filter((course) => {
        return course.status != 0;
      });
      if (this.$router.currentRoute.name === "home") {
        return courseFilter.splice(0, courseFilter.length - 1);
      } else {
        return courseFilter;
      }
    },

    // Función para direccionar a la reproducción del curso
    async classvideo(id) {
      let dataRequest;
      await this.axios
        .get(`purchased/show-class-seen?course_id=${id}`)
        .then((res) => {
          dataRequest = res.data.data;
          this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);
        });
      if (dataRequest == "no existe") {
        this.getCourse(id);
        let fistClass = this.course.modules[0].lessons[0].name;
        this.$router.push(`course-user?course=${id}&class=${fistClass}`);
      } else {
        this.$router.push(`course-user?course=${id}&class=${dataRequest.name}`);
      }
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>
