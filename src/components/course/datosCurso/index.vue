import { mapState } from 'vuex';
<template>
  <div
    class="container-fluid py-3 border border-secondary"
    style="
      box-shadow: -3px 3px 4px rgb(108, 108, 108);
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    "
  >
    <div class="row">
      <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8 text-left">
        <p
          class="text-capitalize text-left"
          style="font-weight: 700; font-size: 1.2em"
        >
          {{ $route.query.class }}
        </p>
      </div>

      <div class="col-md-4 col-lg-4 col-sm-4 col-xs-4 text-right">
        <b-button-group size="sm" class="btn-group" v-if="!endClass">
          <b-button class="btn-back px-4" @click="previusClass()"
            ><i class="fas fa-backward"></i
          ></b-button>
          <b-button
            class="btn-next px-4"
            @click="nextClass()"
            v-if="this.Lecciones[this.index + 1]"
            ><i class="fas fa-forward ml-1"></i
          ></b-button>
        </b-button-group>
        <button v-else type="button" class="btn btn-warning text-light">
          Comprar una membresía <i class="fas fa-certificate"></i>
        </button>
      </div>

      <div class="col-xs-1 col-md-1 col-lg-1">
        <img :src="this.photo" class="rounded-circle" style="width: 40px" />
      </div>

      <div
        class="col-xs-8 col-md-8 col-lg-8 text-left"
        style="font-size: 1em"
        v-if="courseActive[0]"
      >
        <p class="text-uppercase text-left">{{ courseActive[0].title }}</p>
        {{ getNameProductor(courseActive[0].user_id) }}
        <p class="text-uppercase text-left">{{ nombre }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "DatosCurso",

  data() {
    return {
      index: null,
      endClass: false,
      firstClass: false,
      cuenta: localStorage.getItem("id_account_type"),
      nombre: "",
      photo: null,
    };
  },
  computed: {
    ...mapState({
      Lecciones: (state) => state.course.allLessonsId,
      leccionActiva: (state) => state.course.lesson,
    }),

    ...mapGetters("course", {
      elProductor: "getProductor",
      courseActive: "getCourseActive",
    }),
  },
  created() {
    this.classActive();
  },
  destroyed() {
    this.endClass = false;
  },
  methods: {
    // Definimos los metodos que vienen de Vuex
    ...mapActions("course", {
      getCourse: "getCourse",
      getLesson: "getLesson",
      getResources: "getResources",
      getVideo: "getVideo",
      lastSeenLesson: "lastSeenLesson",
      getComments: "getComments",
      getTest: "getTest",
    }),

    // Obtenemos el nombre del productor del curso actual
    getNameProductor(id) {
      this.axios.get(`user/show?id=${id}`).then((res) => {
        this.nombre = `${res.data.name} ${res.data.last_name}`;
        this.photo = res.data.photo;
      });
    },

    // Definimos la clase activa que esta siendo visualizada
    classActive() {
      this.index = this.Lecciones.findIndex((elemento) => {
        return elemento.id === this.leccionActiva.id;
      });
    },

    // Accion para el boton siguiente clase
    nextClass() {
      this.classActive();
      // saber si hay otra clase
      if (this.Lecciones[this.index + 1]) {
        this.cambiarClase(this.Lecciones[this.index + 1]);
      }

      if (!this.Lecciones[this.index + 2] && this.cuenta == 5) {
        this.endClass = true;
      }
    },

    // Accion para el boton anterior clase
    previusClass() {
      this.classActive();
      // saber si hay otra clase
      if (this.Lecciones[this.index - 1]) {
        this.cambiarClase(this.Lecciones[this.index - 1]);
      }
    },

    // Acciones que se realizaran cuando se cambie de clase
    cambiarClase(lesson) {
      // Cambiar ruta de la url
      this.$router.push({
        query: {
          course: this.$route.query.course,
          class: lesson.name,
        },
      });

      // Enviando informacion de la nueva clase
      this.getLesson(lesson);

      //Buscando el recurso de la nueva clase
      this.getResources(lesson.name);

      // Cambiando video de la nueva clase
      this.getVideo(lesson.id);

      // Obtenemos los comentarios de la nueva clase
      this.getComments(lesson.id);

      this.getTest(this.$route.query.course);

      // Enviando la ultima clase que esta visualizando
      let sendData = {
        course_id: this.$route.query.course,
        class_id: lesson.id,
      };
      this.lastSeenLesson(sendData);
    },
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
