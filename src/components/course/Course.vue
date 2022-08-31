<template>
  <div class="background pb-5">
    <div v-if="error" class="no-result center-element">
      <span>Lo sentimos se produjo un error</span>
    </div>

    <div class="row" style="margin-left: 1px">
      <div class="col-lg-8" style="margin-top: 30px">
        <Video v-if="renderVideo"></Video>

        <div v-else class="center-spinner">
          <b-spinner
            style="width: 3rem; height: 3rem"
            variant="secondary"
            label="Large Spinner"
          ></b-spinner>
        </div>
        <!-- <DatosCurso></DatosCurso> -->

        <div class="mt-3">
          <Descripcion></Descripcion>
        </div>
      </div>
      <div class="col-lg-4" style="background-color: #e8e9ea">
        <Temario></Temario>
        <v-btn
        depressed
        color="#1ae800"
        class="text-white ml-16"
        >Invitar a otra persona
        </v-btn>
        <Comentarios></Comentarios>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Temario from "@/components/course/temario";
import Descripcion from "@/components/course/descripcion";
import Comentarios from "@/components/course/comentarios";
import Video from "@/components/course/video";
// import DatosCurso from "@/components/course/datosCurso";

export default {
  name: "Course",
  data() {
    return {
      error: false,
    };
  },
  components: {
    Temario,
    Descripcion,
    Comentarios,
    Video,
    // DatosCurso,
  },
  computed: {
    ...mapState("course", ["lesson", "renderVideo"]),
  },
  methods: {
    ...mapActions("course", {
      getLesson: "getLesson",
      getVideo: "getVideo",
      lastSeenLesson: "lastSeenLesson",
      getComments: "getComments",
      getRating: "getRating",
      getCourseActive: "getCourseActive",
      getTest: "getTest",
      getModuleExam: "getModuleExam",
      getCourseRating: "getCourseRating",
      getActiveDinamicModule: "getActiveDinamicModule",
    }),

    ...mapMutations("course", [
      "GET_PROGRESS",
      "DESTROY_PROGRESS",
      "CLEAR_ALL_DATA",
    ]),

    // Leccion activa al momento de renderizar el componente
    activeLesson() {
      this.axios
        .get(`class/show-class?name=${this.$route.query.class}`)
        .then((res) => {
          this.getLesson(res.data[0]);
          this.getVideo(res.data[0].id);
          this.getComments(res.data[0].id);
          this.getRating(this.$route.query.course);
          this.getTest({ exam_type: "class", id_type: res.data[0].id });
          this.getModuleExam(this.$route.query.course);
          this.getActiveDinamicModule(this.$route.query.course);
        });
    },
  },
  created() {
    this.activeLesson();
    this.GET_PROGRESS();
    this.getCourseActive(this.$route.query.course);
    this.getCourseRating(this.$route.query.rate);
    this.$root.$refs.Course = this;
  },
  beforeMount() {
    // Verificamos que en la URL venga el curso y clase, en caso contrario se le mostrara un error
    if (!this.$route.query.class && !this.$route.query.course) {
      this.error = true;
    } else if (!this.$route.query.class || !this.$route.query.course) {
      this.error = true;
    }
  },
  destroyed() {
    this.DESTROY_PROGRESS();

    // Enviando la ultima clase que esta visualizando
    let sendData = {
      course_id: this.$route.query.course,
      class_id: this.lesson.id,
    };

    this.lastSeenLesson(sendData);
  },
};
</script>

<style scoped>
.background {
  background-color: #f2f5fa !important;
}
/* .caja-course {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
}
.caja-video {
  min-height: 500px;
  grid-column: 1/9;
  grid-row: 1/2;
  box-shadow: -4px 4px 5px rgb(108, 108, 108);
}
.caja-temario {
  grid-column: 9/13;
  grid-row: 1/2;
  box-shadow: -4px 4px 5px rgb(108, 108, 108);
}
.caja-descrption {
  grid-column: 1/9;
  grid-row: 2/3;
  box-shadow: -4px 4px 5px rgb(108, 108, 108);
}
.caja-comentario {
  grid-column: 9/13;
  grid-row: 2/3;
  box-shadow: -4px 4px 5px rgb(108, 108, 108);
}

@media screen and (max-width: 1000px) {
  .caja-course {
    grid-template-rows: repeat(4, 1fr);
    padding: 20px !important;
  }
  .caja-video {
    grid-column: 1/13;
    grid-row: 1/2;
  }
  .caja-temario {
    grid-column: 1/13;
    grid-row: 2/3;
  }
  .caja-descrption {
    grid-column: 1/13;
    grid-row: 3/4;
  }
  .caja-comentario {
    grid-column: 1/13;
    grid-row: 4/5;
  }
}
@media screen and (max-width: 500px) {
  .caja-course {
    padding: 10px !important;
  }
} */
</style>
