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
      try {
        console.log("🚀 Iniciando petición: GET course/details/" + this.$route.query.course);
        
        const response = await this.axios.get("course/details/" + this.$route.query.course);
        
        console.group("✅ Respuesta exitosa: GET course/details");
        console.log("📊 Status:", response.status);
        console.log("📋 Headers:", response.headers);
        console.log("💾 Data completa:", response.data);
        console.log("🎯 Course info:", response.data.data);
        console.groupEnd();
        
        this.courseInfo = response.data.data;
      } catch (error) {
        console.group("❌ Error en: GET course/details");
        console.log("🚫 Error completo:", error);
        console.log("📊 Status:", error.response?.status);
        console.log("💾 Data del error:", error.response?.data);
        console.log("📝 Mensaje:", error.message);
        console.log("🔗 URL:", error.config?.url);
        console.groupEnd();
        
        this.error = true;
      }
    },

    // Carga la lección activa en la inicialización del componente
    async activeLesson() {
      try {
        const courseId = this.$route.query.course;
        const className = this.$route.query.class;
        
        console.log("🚀 Iniciando activeLesson:", { courseId, className });
        console.log(`🚀 Petición: GET class/show-class/${courseId}?name=${className}`);
        
        const res = await this.axios.get(`class/show-class/${courseId}?name=${className}`);
        
        console.group("✅ Respuesta exitosa: GET class/show-class");
        console.log("📊 Status:", res.status);
        console.log("📋 Headers:", res.headers);
        console.log("💾 Data completa:", res.data);
        console.log("🎯 Lesson data:", res.data);
        console.log("🆔 Lesson ID:", res.data.id);
        console.groupEnd();
        
        let lessonId = res.data.id;
        this.lessonId = lessonId;
        
        // Llamadas a las acciones con manejo de errores individual
        try {
          console.log("🔄 Ejecutando getLesson...");
          await this.getLesson(res.data);
        } catch (error) {
          console.error("❌ Error en getLesson:", error);
        }
        
        try {
          console.log("🔄 Ejecutando getVideo con ID:", res.data.id);
          await this.getVideo(res.data.id);
        } catch (error) {
          console.group("❌ Error en getVideo");
          console.error("🚫 Error completo:", error);
          console.log("📊 Status:", error.response?.status);
          console.log("💾 Data del error:", error.response?.data);
          console.log("📝 Mensaje:", error.message);
          console.log("🔗 URL:", error.config?.url);
          console.log("🎯 Class ID intentado:", res.data.id);
          console.groupEnd();
          
          // No detener la ejecución, continuar con las otras acciones
          console.warn("⚠️ Video no disponible para esta lección, continuando...");
        }
        
        try {
          console.log("🔄 Ejecutando getComments...");
          await this.getComments(res.data.id);
        } catch (error) {
          console.error("❌ Error en getComments:", error);
        }
        
        try {
          console.log("🔄 Ejecutando getRating...");
          await this.getRating(this.$route.query.course);
        } catch (error) {
          console.error("❌ Error en getRating:", error);
        }
        
        try {
          console.log("🔄 Ejecutando getTest...");
          await this.getTest({ exam_type: "class", id_type: res.data.id });
        } catch (error) {
          console.error("❌ Error en getTest:", error);
        }
        
        try {
          console.log("🔄 Ejecutando getModuleExam...");
          await this.getModuleExam(this.$route.query.course);
        } catch (error) {
          console.error("❌ Error en getModuleExam:", error);
        }
        
        try {
          console.log("🔄 Ejecutando getActiveDinamicModule...");
          const dinamicResult = await this.getActiveDinamicModule(this.$route.query.course);
          console.log("🎮 Resultado dinámicas:", dinamicResult);
        } catch (error) {
          console.error("❌ Error en getActiveDinamicModule:", error);
        }
        
      } catch (error) {
        console.group("❌ Error general en activeLesson");
        console.error("🚫 Error completo:", error);
        console.log("📊 Status:", error.response?.status);
        console.log("💾 Data del error:", error.response?.data);
        console.log("📝 Mensaje:", error.message);
        console.log("🔗 URL:", error.config?.url);
        console.log("🎯 Course ID:", this.$route.query.course);
        console.log("🎯 Class name:", this.$route.query.class);
        console.groupEnd();
        
        this.error = true;
      }
    },
  },
  mounted() {
    console.log("🔌 Componente Course montado");
    console.log("🎯 Route query:", this.$route.query);
    this.courseSelectedStatus(true);
    this.getCourseInfo();
  },
  created() {
    console.log("🎬 Componente Course creado");
    console.log("🎯 Route params:", this.$route.params);
    console.log("🎯 Route query:", this.$route.query);
    
    this.activeLesson();
    this.getCourseActive(this.$route.query.course);
    this.getCourseRating(this.$route.query.rate);
    this.$root.$refs.Course = this;
  },
  beforeMount() {
    console.log("🔄 Validando parámetros de ruta...");
    
    // Verifica que los parámetros de curso y clase estén en la URL
    if (!this.$route.query.class && !this.$route.query.course) {
      console.error("❌ Faltan parámetros de curso y clase en la URL");
      this.error = true;
    } else if (!this.$route.query.class || !this.$route.query.course) {
      console.error("❌ Falta parámetro de curso o clase en la URL");
      this.error = true;
    } else {
      console.log("✅ Parámetros de ruta válidos");
    }
  },
  destroyed() {
    console.log("💀 Componente Course destruido");
    
    this.DESTROY_PROGRESS();

    // Enviar información de última lección visualizada
    let sendData = {
      course_id: this.$route.query.course,
      class_id: this.lesson.id,
    };

    console.log("📤 Enviando última lección vista:", sendData);
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