<template>
  <div class="background pb-5">
    <div v-if="$route.params.mode == 'preview'" class="bg-danger text-white py-1 ajuste z-index-2 px-4">
      Usted se encuentra en un entorno de pre-visualización
    </div>
    <div v-if="error" class="no-result center-element">
      <span>Lo sentimos se produjo un error</span>
    </div>

    <div class="row" style="margin-left: 1px">
      <div class="col-lg-8" style="margin-top: 30px">
        <div class="pb-1">
          <strong>{{ this.courseInfo.title }}</strong>
        </div>

        <!--<Video v-if="renderVideo" :classId="lessonId" :courseId="this.$route.query.course"></Video>-->
        <Video v-if="renderVideo" :classId="lessonId" :courseId="this.$route.query.course" @markLessonComplete="handleLessonComplete"></Video>

        <!-- <div v-else class="center-spinner">
          <b-spinner
            style="width: 3rem; height: 3rem"
            variant="secondary"
            label="Large Spinner"
          ></b-spinner>
        </div> -->
        <!-- <DatosCurso></DatosCurso> -->

        <div class="mt-3">
          <Descripcion :id_lesson="lessonId" v-if="lessonId"></Descripcion>
        </div>
      </div>
      <div class="col-lg-4" style="background-color: #F2F5FA">
        <Docente></Docente>
        <!--<Temario></Temario>-->
        <Temario :completedLessons="completedLessons" @updateCompletedLessons="handleCompletedLessons" />
        <div class="text-center mb-3">
          <v-btn
            depressed
            color="#1ae800"
            class="text-white"
          >Invitar a otra persona</v-btn>
        </div>
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
import Docente from "@/components/course/docente";

export default {
  name: "Course",
  data() {
    return {
      error: false,
      lessonId: "",
      courseInfo: [],
      completedLessons: [],
    };
  },
  components: {
    Temario,
    Descripcion,
    Comentarios,
    Video,
    // DatosCurso,
    Docente,
  },
  computed: {
    ...mapState("course", ["lesson", "renderVideo","courseSelect"]),
  },
  methods: {
    ...mapActions("course", {
      courseSelectedStatus:"courseSelectedStatus",
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

    handleLessonComplete(lessonId) {
      if (!this.completedLessons.includes(lessonId)) {
        this.completedLessons.push(lessonId); // Agrega la lección completada si no está ya en la lista
      }
    },

    handleCompletedLessons(updatedLessons) {
      this.completedLessons = updatedLessons; // Actualiza la lista de lecciones completadas
    },
    async getCourseInfo(){
      await this.axios.get('course/details/' + this.$route.query.course).then((response) => {
        console.log(response)
        this.courseInfo = response.data.data
      })
    },
    // Leccion activa al momento de renderizar el componente
   async activeLesson() {
    const courseId=this.$route.query.course;
      await this.axios
        .get(`class/show-class/${courseId}?name=${this.$route.query.class}`)
        .then((res) => {
          
          let lessonId = res.data.id;
          this.lessonId = lessonId;
          this.getLesson(res.data);
          this.getVideo(res.data.id);
          this.getComments(res.data.id);
          this.getRating(this.$route.query.course);
          this.getTest({ exam_type: "class", id_type: res.data.id });
          this.getModuleExam(this.$route.query.course);
          this.getActiveDinamicModule(this.$route.query.course);
          
        });
        
    },
    
  },
  mounted() {

    this.courseSelectedStatus(true);
  
    this.getCourseInfo();
    
  },
  created() {
    this.activeLesson();
    
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
