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

      <!-- State 3: Full Course View -->
      <div v-else class="tw-w-full tw-flex tw-flex-col tw-bg-white dark:tw-bg-gray-900" style="min-height: calc(100vh - 60px);">
        
        <!-- Header Dark Bar -->
        <header class="tw-bg-gray-900 dark:tw-bg-black tw-py-4 tw-px-6 tw-flex tw-items-center tw-justify-between">
          <h1 class="tw-text-white tw-text-lg md:tw-text-xl tw-font-bold tw-truncate" style="max-width: 70%;">
            {{ this.courseInfo.title || 'Cargando curso...' }}
          </h1>
          <button @click="openShareModal" class="tw-text-gray-300 hover:tw-text-white tw-text-sm tw-font-semibold tw-flex tw-items-center tw-gap-2">
            <i class="fas fa-share-alt"></i>
            <span class="d-none d-md-inline">Compartir</span>
          </button>
        </header>

        <!-- Main Workspace (Video + Sidebar) -->
        <div class="tw-flex-1 tw-flex tw-flex-wrap">
          
          <!-- LEFT AREA: Video & Details -->
          <div class="tw-flex-1 tw-p-4 md:tw-p-8" style="min-width: 0;">
            
            <!-- Video Player Wrapper (Contained within left column) -->
            <div class="tw-w-full tw-bg-black tw-mb-8" style="min-height: 400px; position: relative;">
              <Video v-if="renderVideo && lessonId" :classId="lessonId" :courseId="this.$route.query.course"
                @markLessonComplete="handleLessonComplete" class="tw-w-full">
              </Video>
              <div v-else class="tw-flex tw-items-center tw-justify-center tw-absolute tw-inset-0">
                 <div class="spinner-border text-light" role="status"></div>
              </div>
            </div>

            <!-- Description under video -->
            <div class="tw-mt-8 tw-max-w-5xl tw-mx-auto">
              <h2 v-if="lesson && lesson.name" class="tw-text-2xl md:tw-text-3xl tw-font-bold tw-text-gray-900 dark:tw-text-white tw-mb-4">
                {{ lesson.name }}
              </h2>
              <Descripcion :id_lesson="lessonId" v-if="lessonId"></Descripcion>
            </div>

            <!-- Instructor Info -->
            <div v-if="courseInfo && (courseInfo.instructor || courseInfo.user)" class="tw-mt-8 tw-max-w-5xl tw-mx-auto tw-bg-gray-50 dark:tw-bg-gray-800 tw-p-6 tw-rounded-xl tw-border tw-border-gray-200 dark:tw-border-gray-700">
              <h3 class="tw-text-lg tw-font-bold tw-text-gray-900 dark:tw-text-white tw-mb-4">Acerca del Productor</h3>
              <div class="tw-flex tw-items-start tw-gap-4">
                <!-- Avatar -->
                <img v-if="(courseInfo.instructor || courseInfo.user).photo && !(courseInfo.instructor || courseInfo.user).photo.includes('avatar1.png')" :src="(courseInfo.instructor || courseInfo.user).photo" class="tw-w-16 tw-h-16 tw-rounded-full tw-object-cover" alt="Productor">
                <div v-else class="tw-w-16 tw-h-16 tw-rounded-full tw-bg-[#18d600] tw-bg-opacity-20 tw-text-[#18d600] tw-flex tw-items-center tw-justify-center tw-text-xl tw-font-bold tw-flex-shrink-0">
                  {{ (courseInfo.instructor || courseInfo.user).name ? (courseInfo.instructor || courseInfo.user).name.charAt(0).toUpperCase() : 'P' }}
                </div>
                
                <!-- Info -->
                <div class="tw-flex-1">
                  <h4 class="tw-font-bold tw-text-gray-900 dark:tw-text-white tw-text-lg">{{ (courseInfo.instructor || courseInfo.user).name }} {{ (courseInfo.instructor || courseInfo.user).last_name }}</h4>
                  <p class="tw-text-gray-600 dark:tw-text-gray-300 tw-text-sm tw-mt-1" style="white-space: pre-line;">
                    {{ (courseInfo.instructor || courseInfo.user).biography || 'Productor de contenido en Promolíder.' }}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <!-- RIGHT AREA: Sidebar Temario -->
          <aside class="tw-border-l tw-border-gray-200 dark:tw-border-gray-700 tw-bg-white dark:tw-bg-gray-900" style="flex: 0 0 400px; width: 400px;">
            <div class="tw-p-6 tw-border-b tw-border-gray-200 dark:tw-border-gray-700">
              <h2 class="tw-text-lg tw-font-bold tw-text-gray-900 dark:tw-text-white">Contenido del curso</h2>
            </div>
            
            <div class="tw-overflow-y-auto custom-scrollbar" style="height: calc(100vh - 150px);">
              <Temario :completedLessons="completedLessons" @markLessonAsCompleted="handleLessonComplete" />
            </div>
          </aside>
        </div>
      </div>
    </div>
    
    <ShareModal 
      :show="showShareModal" 
      :shareLink="generatedShareLink" 
      :courseTitle="courseInfo.title"
      @close="showShareModal = false" 
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Temario from "@/components/course/temario";
import Descripcion from "@/components/course/descripcion";
import Video from "@/components/course/video";
import ShareModal from "@/components/Modals/ShareModal.vue";
import { authGet } from "@/helpers/authStorage";

export default {
  name: "Course",
  data() {
    return {
      loading: false,
      error: false,
      lessonId: "",
      courseInfo: [],
      completedLessons: [],
      showShareModal: false,
      generatedShareLink: "",
    };
  },
  components: {
    Temario,
    Descripcion,
    Video,
    ShareModal,
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

    openShareModal() {
      const courseId = this.$route.query.course;
      const userId = authGet("id_user");
      const baseUrl = window.location.origin;
      this.generatedShareLink = `${baseUrl}/landing/course/${courseId}?ref=${userId}`;
      this.showShareModal = true;
    },

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
            const seenRes = await this.axios.get(`marketing/courses/purchased/show-class-seen?course_id=${courseId}`);
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

        // Terminar la carga principal aquí para no bloquear la UI
        this.loading = false;
        
        // El resto se carga en segundo plano sin bloquear
        this.getVideo(res.data.id).catch(() => console.warn("Video no disponible para esta lección, continuando..."));
        this.getComments(res.data.id).catch(err => console.error("Error en getComments:", err));
        this.getRating(this.$route.query.course).catch(err => console.error("Error en getRating:", err));
        this.getTest({ exam_type: "class", id_type: res.data.id }).catch(err => console.error("Error en getTest:", err));
        this.getModuleExam(this.$route.query.course).catch(err => console.error("Error en getModuleExam:", err));
        this.getActiveDinamicModule(this.$route.query.course).catch(err => console.error("Error en getActiveDinamicModule:", err));
        
      } catch (error) {
        console.error("Error general al cargar la lección activa:", error);
        this.error = true;
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
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
}
html.dark .custom-scrollbar::-webkit-scrollbar-track,
html.dark-mode .custom-scrollbar::-webkit-scrollbar-track {
  background: #111827;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

</style>

<style>
/* Dark Mode Overrides for Course Layout (Unscoped to allow html.dark-mode to work) */
html.dark-mode .udemy-course-layout .tw-bg-white {
  background-color: #0f172a !important; /* slate-900 equivalent */
}
html.dark-mode .udemy-course-layout .tw-text-gray-900 {
  color: #f8fafc !important;
}
html.dark-mode .udemy-course-layout header.tw-bg-gray-900 {
  background-color: #000000 !important;
}
html.dark-mode .udemy-course-layout .tw-border-gray-200 {
  border-color: #334155 !important; /* slate-700 equivalent */
}
html.dark-mode .udemy-course-layout .tw-bg-gray-50 {
  background-color: #1e293b !important; /* slate-800 equivalent */
}
html.dark-mode .udemy-course-layout .tw-text-gray-600 {
  color: #cbd5e1 !important;
}
html.dark-mode .udemy-course-layout .course-description {
  color: #cbd5e1 !important;
}
html.dark-mode .udemy-course-layout .tw-text-gray-700 {
  color: #e2e8f0 !important;
}
html.dark-mode .udemy-course-layout input {
  color: #f8fafc !important;
  background-color: #1e293b !important;
}
html.dark-mode .udemy-course-layout input::placeholder {
  color: #94a3b8 !important;
}
</style>