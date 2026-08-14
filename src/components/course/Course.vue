<template>
  <div class="app-wrapper">
    <div class="udemy-course-layout">
      <!-- Env Warning -->
      <div v-if="$route.params.mode == 'preview'" class="bg-danger text-white py-1 text-center fw-bold w-100 z-index-2">
        Usted se encuentra en un entorno de pre-visualización
      </div>

      <!-- State 1: Loading State -->
      <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>

      <!-- State 2: Error State -->
      <div v-else-if="error" class="container py-5">
        <div class="card border-0 shadow-sm p-5 text-center my-4 course-error-card" style="border-radius: 20px;">
          <div class="mb-4">
            <i class="fas fa-exclamation-circle" style="color: #EF4444; font-size: 72px;"></i>
          </div>
          <h3 class="font-weight-bold mb-2 text-dark">No se pudo cargar el curso</h3>
          <p class="text-muted mb-4 mx-auto" style="max-width: 500px;">
            Es posible que el curso no exista, no tenga lecciones publicadas aún o no tengas acceso.
          </p>
          <div>
            <button class="btn text-white px-5 py-2 fw-bold" style="background-color: var(--primary-color); border-radius: 50px;" @click="$router.push('/suscription-user')">
              <i class="fas fa-arrow-left me-2"></i> Volver a mis contenidos
            </button>
          </div>
        </div>
      </div>

      <!-- State 3: Udemy Course View -->
      <div v-else class="udemy-course-container">
        
        <!-- Header Dark Bar -->
        <header class="udemy-course-header">
          <div class="tw-flex tw-items-center tw-justify-between tw-w-full tw-px-4 md:tw-px-6">
            <h1 class="tw-text-white tw-text-lg md:tw-text-xl tw-font-bold tw-truncate tw-max-w-[60%]">
              {{ this.courseInfo.title || 'Cargando curso...' }}
            </h1>
            <div class="tw-flex tw-items-center tw-gap-4">
              <button class="tw-text-gray-300 hover:tw-text-white tw-text-sm tw-font-semibold tw-flex tw-items-center tw-gap-2">
                <i class="fas fa-share-alt"></i>
                <span class="d-none d-md-inline">Compartir</span>
              </button>
            </div>
          </div>
        </header>

        <!-- Main Workspace (Video + Sidebar) -->
        <div class="udemy-workspace">
          
          <!-- LEFT AREA: Video & Details -->
          <div class="udemy-main-content">
            
            <!-- Video Player Wrapper (Black background) -->
            <div class="udemy-video-wrapper">
              <Video v-if="renderVideo && lessonId" :classId="lessonId" :courseId="this.$route.query.course"
                @markLessonComplete="handleLessonComplete" class="udemy-video-player">
              </Video>
            </div>

            <!-- Content Tabs under video -->
            <div class="udemy-content-details tw-bg-white tw-px-4 tw-py-6 md:tw-px-8 md:tw-py-8">
              
              <!-- Tab Navigation (Mock visually, showing all below for now) -->
              <div class="tw-border-b tw-border-gray-200 tw-mb-6">
                <nav class="tw-flex tw-gap-6 tw-overflow-x-auto">
                  <button class="tw-text-gray-900 tw-font-bold tw-border-b-2 tw-border-black tw-pb-3 tw-text-sm md:tw-text-base tw-whitespace-nowrap">Descripción general</button>
                  <button class="tw-text-gray-500 hover:tw-text-gray-900 tw-font-bold tw-pb-3 tw-text-sm md:tw-text-base tw-whitespace-nowrap">Q&A</button>
                  <button class="tw-text-gray-500 hover:tw-text-gray-900 tw-font-bold tw-pb-3 tw-text-sm md:tw-text-base tw-whitespace-nowrap">Notas</button>
                  <button class="tw-text-gray-500 hover:tw-text-gray-900 tw-font-bold tw-pb-3 tw-text-sm md:tw-text-base tw-whitespace-nowrap">Avisos</button>
                </nav>
              </div>

              <!-- Detailed Content -->
              <div class="tw-max-w-4xl">
                <!-- Description -->
                <div class="tw-mb-10">
                  <Descripcion :id_lesson="lessonId" v-if="lessonId"></Descripcion>
                </div>

                <hr class="tw-border-gray-200 tw-my-8" />

                <!-- Instructor -->
                <div class="tw-mb-10">
                  <h3 class="tw-text-xl tw-font-bold tw-mb-4">Acerca del instructor</h3>
                  <Docente></Docente>
                </div>

                <hr class="tw-border-gray-200 tw-my-8" />

                <!-- Comments -->
                <div>
                  <h3 class="tw-text-xl tw-font-bold tw-mb-4">Comentarios y reseñas</h3>
                  <Comentarios></Comentarios>
                </div>

              </div>
            </div>

          </div>

          <!-- RIGHT AREA: Sidebar Temario -->
          <aside class="udemy-sidebar tw-bg-white">
            <div class="udemy-sidebar-header tw-p-4 tw-border-b tw-border-gray-200">
              <h2 class="tw-text-base tw-font-bold tw-text-gray-900">Contenido del curso</h2>
            </div>
            
            <div class="udemy-sidebar-content">
              <Temario :completedLessons="completedLessons" @markLessonAsCompleted="handleLessonComplete" />
              
              <!-- Extra Actions in Sidebar -->
              <div class="tw-p-4 tw-mt-4">
                <button class="btn text-white w-100 py-2 fw-bold shadow-sm" style="background-color: var(--primary-color); border-radius: 50px;">
                  <i class="fas fa-user-plus me-2"></i> Invitar a otra persona
                </button>
              </div>
            </div>
          </aside>

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
/* Dark Mode Support for Error Card */
.course-error-card {
  background-color: #ffffff;
}
:root.dark-mode .course-error-card,
html.dark-mode .course-error-card {
  background-color: #1f2937 !important;
}
html.dark-mode .course-error-card h3.text-dark {
  color: #f9fafb !important;
}
html.dark-mode .course-error-card p.text-muted {
  color: #d1d5db !important;
}

.udemy-course-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
}
html.dark-mode .udemy-course-layout {
  background-color: transparent !important;
}

.udemy-course-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* Header */
.udemy-course-header {
  height: 56px;
  background-color: #1C1D1F; /* Udemy Dark */
  display: flex;
  align-items: center;
  border-bottom: 1px solid #3E4143;
}

/* Main Workspace Flex */
.udemy-workspace {
  display: flex;
  flex-direction: column; /* Stack on mobile */
  flex: 1;
}

/* Large screens: Row layout */
@media (min-width: 992px) {
  .udemy-workspace {
    flex-direction: row;
    align-items: stretch;
  }
  
  .udemy-main-content {
    flex: 1; /* Takes remaining space */
    min-width: 0; /* Prevents flex blowout */
  }

  .udemy-sidebar {
    width: 380px; /* Fixed sidebar width */
    flex-shrink: 0;
    border-left: 1px solid #D1D7DC;
    display: flex;
    flex-direction: column;
    /* Fixed height relative to viewport minus header (approx) */
    height: calc(100vh - 56px - 64px); /* Subtract top navs */
    position: sticky;
    top: 0;
  }
}

/* Video Wrapper */
.udemy-video-wrapper {
  background-color: #1C1D1F; /* Blackish background for video */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.udemy-video-player {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Sidebar Scrollable Area */
.udemy-sidebar-content {
  flex: 1;
  overflow-y: auto;
}

/* Custom Scrollbar for Sidebar */
.udemy-sidebar-content::-webkit-scrollbar {
  width: 8px;
}
.udemy-sidebar-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.udemy-sidebar-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}
.udemy-sidebar-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

</style>