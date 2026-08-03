<template>
  <v-app>
    <div class="background pb-5">
      <div v-if="$route.params.mode == 'preview'" class="bg-danger text-white py-1 ajuste z-index-2 px-4 text-center fw-bold">
        Usted se encuentra en un entorno de pre-visualización
      </div>

      <!-- State 1: Loading State -->
      <div v-if="loading" class="d-flex justify-content-center align-items-center py-5 my-5">
        <v-progress-circular indeterminate color="#10B981" size="64" width="6"></v-progress-circular>
      </div>

      <!-- State 2: Error State -->
      <div v-else-if="error" class="container py-5">
        <div class="card border-0 shadow-sm rounded-lg p-5 text-center my-4 bg-white" style="border-radius: 20px;">
          <div class="mb-4">
            <v-icon color="#EF4444" size="72">mdi-alert-circle-outline</v-icon>
          </div>
          <h3 class="font-weight-bold mb-2 text-dark">No se pudo cargar el curso</h3>
          <p class="text-muted mb-4 max-w-md mx-auto">
            Es posible que el curso no exista, no tenga lecciones publicadas aún o no tengas acceso.
          </p>
          <div>
            <v-btn color="#10B981" dark large rounded class="px-5 text-none font-weight-bold" @click="$router.push('/my-courses')">
              <v-icon left>mdi-arrow-left</v-icon>
              Volver a mis contenidos
            </v-btn>
          </div>
        </div>
      </div>

      <!-- State 3: Course View -->
      <div v-else class="container-fluid px-3 px-md-4 py-2">
        <div class="row">
          <!-- Main content column -->
          <div class="col-12 col-lg-8 mt-3">
            <div class="pb-2">
              <h2 class="course-title text-dark font-weight-bold mb-3">{{ this.courseInfo.title || 'Cargando curso...' }}</h2>
            </div>

            <Video v-if="renderVideo && lessonId" :classId="lessonId" :courseId="this.$route.query.course"
              @markLessonComplete="handleLessonComplete" class="video-container shadow-sm">
            </Video>

            <div class="mt-4">
              <Descripcion :id_lesson="lessonId" v-if="lessonId"></Descripcion>
            </div>
          </div>

          <!-- Sidebar content -->
          <div class="col-12 col-lg-4 sidebar mt-3">
            <Docente></Docente>

            <Temario :completedLessons="completedLessons" @markLessonAsCompleted="handleLessonComplete" />

            <div class="text-center my-4">
              <v-btn depressed color="#10B981" dark large rounded block class="text-none font-weight-bold shadow-sm invite-btn">
                <v-icon left>mdi-account-plus</v-icon>
                Invitar a otra persona
              </v-btn>
            </div>

            <Comentarios></Comentarios>
          </div>
        </div>
      </div>
    </div>
  </v-app>
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
      loading: false,
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
      try {
        const courseId = this.$route.query.course;
        if (!courseId) {
          this.error = true;
          return;
        }
        const response = await this.axios.get("course/details/" + courseId);
        this.courseInfo = (response && response.data && response.data.data) ? response.data.data : [];
      } catch (error) {
        console.error("Error al obtener detalles del curso:", error);
        this.error = true;
      }
    },

    // Carga la lección activa en la inicialización del componente
    async activeLesson() {
      try {
        this.loading = true;
        this.error = false;
        const courseId = this.$route.query.course;
        let className = this.$route.query.class;

        if (!courseId) {
          this.error = true;
          return;
        }

        // Si className viene vacío o indefinido, intentamos obtener la lección por defecto o vista previamente
        if (!className) {
          try {
            const seenRes = await this.axios.get(`purchased/show-class-seen?course_id=${courseId}`);
            const dataRequest = (seenRes && seenRes.data && seenRes.data.data) ? seenRes.data.data : {};
            if (dataRequest && dataRequest.name) {
              className = dataRequest.name;
              this.$router.replace({ query: { ...this.$route.query, class: className } }).catch(() => {});
            }
          } catch (err) {
            console.warn("No se pudo obtener la lección vista previamente:", err);
          }
        }

        const res = await this.axios.get(`class/show-class/${courseId}?name=${encodeURIComponent(className || '')}`);
        
        if (!res || !res.data || !res.data.id) {
          this.error = true;
          return;
        }

        let lessonId = res.data.id;
        this.lessonId = lessonId;
        
        // Llamadas a las acciones con manejo de errores individual
        try {
          await this.getLesson(res.data);
        } catch (error) {
          console.error("Error en getLesson:", error);
        }
        
        try {
          await this.getVideo(res.data.id);
        } catch (error) {
          console.warn("Video no disponible para esta lección, continuando...");
        }
        
        try {
          await this.getComments(res.data.id);
        } catch (error) {
          console.error("Error en getComments:", error);
        }
        
        try {
          await this.getRating(this.$route.query.course);
        } catch (error) {
          console.error("Error en getRating:", error);
        }
        
        try {
          await this.getTest({ exam_type: "class", id_type: res.data.id });
        } catch (error) {
          console.error("Error en getTest:", error);
        }
        
        try {
          await this.getModuleExam(this.$route.query.course);
        } catch (error) {
          console.error("Error en getModuleExam:", error);
        }
        
        try {
          await this.getActiveDinamicModule(this.$route.query.course);
        } catch (error) {
          console.error("Error en getActiveDinamicModule:", error);
        }
        
      } catch (error) {
        console.error("Error general al cargar la lección activa:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.courseSelectedStatus(true);
    this.getCourseInfo();
  },
  created() {
    this.activeLesson();
    if (this.$route.query.course) {
      this.getCourseActive(this.$route.query.course);
    }
    if (this.$route.query.rate) {
      this.getCourseRating(this.$route.query.rate);
    }
    this.$root.$refs.Course = this;
  },
  beforeMount() {
    if (!this.$route.query.course) {
      this.error = true;
    }
  },
  destroyed() {
    this.DESTROY_PROGRESS();

    if (this.$route.query.course && this.lesson && this.lesson.id) {
      let sendData = {
        course_id: this.$route.query.course,
        class_id: this.lesson.id,
      };
      this.lastSeenLesson(sendData);
    }
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