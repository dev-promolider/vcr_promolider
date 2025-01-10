<template>
  <div class="background pb-5">
    <div v-if="$route.params.mode == 'preview'" class="bg-danger text-white py-1 ajuste z-index-2 px-4">
      Usted se encuentra en un entorno de pre-visualización
    </div>

    <div v-if="error" class="no-result center-element">
      <span>Lo sentimos se produjo un error</span>
    </div>

    <div class="container-fluid px-2">
      <div class="row">
        <!-- Main content column -->
        <div class="col-12 col-lg-8 mt-4">
          <div class="pb-1">
            <strong class="course-title">{{ this.courseInfo.title }}</strong>
          </div>

          <Video v-if="renderVideo" :classId="lessonId" :courseId="this.$route.query.course"
            @markLessonComplete="handleLessonComplete" class="video-container">
          </Video>

          <div class="mt-3">
            <Descripcion :id_lesson="lessonId" v-if="lessonId"></Descripcion>
          </div>
        </div>

        <!-- Sidebar content -->
        <div class="col-12 col-lg-4 sidebar">
          <Docente></Docente>

          <Temario :completedLessons="completedLessons" @markLessonAsCompleted="handleLessonComplete" />

          <div class="text-center mb-3">
            <v-btn depressed color="#1ae800" class="text-white invite-btn">
              Invitar a otra persona
            </v-btn>
          </div>

          <Comentarios></Comentarios>
        </div>
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
    Docente,
  },
  computed: {
    ...mapState("course", ["lesson", "renderVideo", "courseSelect"]),
  },
  methods: {
    ...mapActions("course", {
      courseSelectedStatus: "courseSelectedStatus",
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
      console.log(
        "Emitir evento de lección completada con lessonId: ",
        lessonId
      );
      this.$emit("markLessonAsCompleted", lessonId);
      this.completedLessons.push(lessonId);
    },

    async getCourseInfo() {
      await this.axios
        .get("course/details/" + this.$route.query.course)
        .then((response) => {
          console.log(response);
          this.courseInfo = response.data.data;
        });
    },

    // Carga la lección activa en la inicialización del componente
    async activeLesson() {
      const courseId = this.$route.query.course;
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
    // Verifica que los parámetros de curso y clase estén en la URL
    if (!this.$route.query.class && !this.$route.query.course) {
      this.error = true;
    } else if (!this.$route.query.class || !this.$route.query.course) {
      this.error = true;
    }
  },
  destroyed() {
    this.DESTROY_PROGRESS();

    // Enviar información de última lección visualizada
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
  min-height: 100vh;
}

.course-title {
  font-size: 1.5rem;
  line-height: 1.2;
  display: block;
  margin-bottom: 1rem;
}

.video-container {
  width: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.sidebar {
  background-color: #f2f5fa;
  padding: 1.5rem 1rem;
}

.invite-btn {
  width: 100%;
  max-width: 300px;
  margin: 1rem auto;
}

@media (max-width: 991px) {
  .sidebar {
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 8px;
  }

  .course-title {
    font-size: 1.25rem;
    padding: 0 0.5rem;
  }
}

@media (max-width: 576px) {
  .container-fluid {
    padding: 0.5rem;
  }

  .video-container {
    border-radius: 4px;
  }

  .invite-btn {
    max-width: 100%;
  }
}
</style>
