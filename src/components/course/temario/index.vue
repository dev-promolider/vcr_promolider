<template>
  <!-- Contenedor principal del componente -->
  <div class="mb-3 px-4" style="border-radius: 20px; margin-top: 40px; margin-right: 10px">
    <div class="temario pb-3">
      <div class="row">
        <!-- Div para el título -->
        <div class="col-lg-4 col-md-5 col-sm-6 mr-2">
          <p class="text-left" style="
              font-size: 1.3em;
              font-weight: 600;
              margin-left: 20px;
              display: inline;
            ">
            {{ title }}
          </p>
          <!-- Mostrar progreso -->
          <div v-if="content === 'temary'" class="progress-indicator mt-2" style="margin-left: 20px;">
            <small class="text-muted">Progreso: {{ progress }}%</small>
            <div class="progress-bar-mini">
              <div 
                class="progress-fill" 
                :style="{ width: progress + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Div para el input de búsqueda -->
        <div class="col-lg-5 col-md-4 col-sm-4 mr-2 text-right search-container">
          <div :class="[
            'search-input',
            { 'search-input-hover': isHover, 'search-input-focus': isFocus },
          ]">
            <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Buscar un tema"
              @keyup.enter="performSearch" @focus="handleFocus(true)" @blur="handleFocus(false)"
              @mouseover="handleHover(true)" @mouseleave="handleHover(false)" />
          </div>
        </div>

        <!-- Div para el menú de puntos -->
        <div class="col-lg-1 text-right">
          <v-menu>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-btn color="#1ad003" text small depressed plain v-bind="attrs" v-on="{ ...menu }">
                <v-icon dark> mdi-dots-vertical </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" link @click="menuActionClick(item.action)">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>

      <!-- Spinner de carga -->
      <div class="center-spinner" v-if="isLoading">
        <b-spinner variant="secondary"></b-spinner>
      </div>

      <!-- Contenido principal del componente -->
      <div v-else>
        <!-- Sección de temario -->
        <div v-if="content == 'temary'" style="max-height: 300px; overflow-y: auto">
          <ul v-for="(module, moduleIndex) in filteredModules" :key="moduleIndex" class="mt-3">
            <li class="nav-temario" :title="module.name">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <p class="module-text" v-b-toggle="module.name.replace(/ /g, '')">
                  {{ moduleIndex + 1 }}. {{ module.name }}
                </p>
                <!-- Indicador de completitud del módulo -->
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span 
                    v-if="moduleCompletionStatus[module.id]" 
                    :class="moduleCompletionStatus[module.id].is_completed ? 'badge badge-success' : 'badge badge-warning'"
                    style="font-size: 0.7em;"
                  >
                    {{ moduleCompletionStatus[module.id].is_completed ? 'Completado' : `${moduleCompletionStatus[module.id].completion_percentage}%` }}
                  </span>
                  <!-- Botón para verificar módulo específico -->
                  <button 
                    @click="checkSpecificModule(module.id)" 
                    class="btn btn-xs btn-outline-primary"
                    style="font-size: 0.7em; padding: 2px 6px;"
                    title="Verificar este módulo"
                  >
                    ✓
                  </button>
                </div>
              </div>

              <b-collapse visible :id="module.name.replace(/ /g, 'AAAAA')">
                <ul style="overflow: auto; max-height: 200px">
                  <!-- Listado de lecciones en cada módulo -->
                  <li v-for="(lesson, lessonIndex) in module.lessons" :key="lessonIndex">
                    <div style="display: flex; align-items: center">
                      <div style="position: relative; margin-right: 0px;">
                        <input 
                          style="position: relative" 
                          type="checkbox"
                          :checked="isLessonCompleted(lesson.id)" 
                          @change="toggleLessonCompletion(lesson.id)"
                          :disabled="isUpdatingProgress"
                        />
                        <!-- Spinner pequeño para mostrar carga -->
                        <div 
                          v-if="isUpdatingProgress" 
                          class="mini-spinner"
                          style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center;"
                        >
                          <div class="spinner-dot"></div>
                        </div>
                      </div>
                      <a style="margin-left: 10px" @click="changeClass(lesson)"
                        :class="{ activo: lesson.name === clase }" :title="lesson.name">
                        {{ lesson.name }}
                      </a>
                    </div>
                  </li>
                </ul>
              </b-collapse>
            </li>
          </ul>
        </div>

        <!-- Sección de exámenes -->
        <div v-else-if="content == 'tests'">
          <v-card-text v-if="
            moduleExamen.course_exam === null &&
            moduleExamen.module_exams.length === 0
          " class="text-center subtitle-1 dark-text mt-4">
            Ningún examen disponible
          </v-card-text>
          <div v-else>
            <v-row justify="start" class="m-2">
              <template v-if="moduleExamen.module_exams.length > 0">
                <v-col v-for="moduloExam in moduleExamen.module_exams" :key="moduloExam.id" cols="12" sm="6">
                  <v-btn class="mx-1 success rounded-xl" @click="goToExam(moduloExam.id)">
                    {{ moduloExam.title }}
                  </v-btn>
                </v-col>
              </template>
              <template v-if="moduleExamen.course_exam != null">
                <v-col cols="12" sm="auto">
                  <v-btn class="mx-1 success rounded-xl" @click="goToExam(moduleExamen.course_exam.id)">
                    {{ moduleExamen.course_exam.title }}
                  </v-btn>
                </v-col>
              </template>
            </v-row>
          </div>
        </div>

        <!-- Sección de juegos -->
        <div v-else-if="content == 'games'">
          <v-card-text v-if="
            moduleDinamic.module_games === 'Ninguna dinámica disponible' &&
            moduleDinamic.course_game === 'Ninguna dinámica disponible'
          " class="text-center subtitle-1 dark-text mt-4">
            Ninguna dinamica disponible
          </v-card-text>
          <v-row justify="start" class="m-2">
            <template v-if="
              Array.isArray(moduleDinamic.module_games) &&
              moduleDinamic.module_games.length > 0
            ">
              <v-col v-for="module_dinamic in moduleDinamic.module_games" :key="module_dinamic.id" cols="6">
                <v-btn class="mx-1 success rounded-xl" @click="goToDinamics(module_dinamic.id)">
                  {{ module_dinamic.title }}
                </v-btn>
              </v-col>
            </template>
            <template v-if="typeof moduleDinamic.course_game === 'object'">
              <v-col cols="6">
                <v-btn class="mx-1 success rounded-xl" @click="goToDinamics(moduleDinamic.course_game.id)">
                  {{ moduleDinamic.course_game.title }}
                </v-btn>
              </v-col>
            </template>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "Temario",
  props: {
    completedLessons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      content: "temary",
      title: "Temario",
      searchQuery: "",
      items: [
        { title: "Temario", action: "temary" },
        { title: "Exámenes", action: "tests" },
        { title: "Dinámicas", action: "games" },
      ],
      progress: 0,
      clase: null,
      loading: true,
      isHover: false,
      isFocus: false,
      isUpdatingProgress: false,
      moduleCompletionStatus: {}, // Nuevo: estado de completitud de módulos
    };
  },
  computed: {
    ...mapGetters("course", ["course"]),

    ...mapState("course", {
      vuexCompletedLessons: "completedLessons",
    }),

    ...mapState("course", [
      "allLessons",
      "lesson",
      "isLoading",
      "moduleExamen",
      "moduleDinamic",
    ]),

    filteredModules() {
      // Verifica si course o modules existen antes de procesar
      if (!this.course || !this.course.modules) {
        return [];
      }

      const query = this.searchQuery.toLowerCase();

      // Filtra las lecciones de los módulos según el término de búsqueda
      return this.course.modules
        .map((module) => {
          const filteredLessons = module.lessons.filter((lesson) =>
            lesson.name.toLowerCase().includes(query)
          );

          if (filteredLessons.length > 0) {
            return {
              ...module,
              lessons: filteredLessons,
            };
          }

          return null;
        })
        .filter((module) => module !== null);
    },
  },
  methods: {
    ...mapActions("course", [
      "initializeCompletedLessons",
      "updateCompletedLesson",
    ]),

    ...mapActions("course", {
      getCourse: "getCourse",
      getLesson: "getLesson",
      getResources: "getResources",
      getVideo: "getVideo",
      lastSeenLesson: "lastSeenLesson",
      getComments: "getComments",
      getRating: "getRating",
      getTest: "getTest",
      getModuleExam: "getModuleExam",
      getActiveDinamicModule: "getActiveDinamicModule",
    }),

    ...mapMutations("course", [
      "UPDATE_PROGRESS_COURSE",
      "DESTROY_PROGRESS_COURSE",
    ]),

    // NUEVOS MÉTODOS PARA LOS ENDPOINTS DE MÓDULOS

    /**
     * Verificar el estado de completitud de todos los módulos del curso
     */
    async checkModuleCompletion() {
      try {
        const courseId = this.$route.query.course;
        if (!courseId) {
          console.error("❌ No se encontró course_id en la ruta");
          return;
        }

        console.log("🚀 Verificando completitud de módulos para el curso:", courseId);

        const response = await this.axios.get(`/course/${courseId}/modules-completion`);
        
        console.log("✅ RESPUESTA ENDPOINT - Estado de todos los módulos:");
        console.log("📊 Datos completos:", response.data);
        
        if (response.data.success) {
          console.log("📈 RESUMEN GENERAL:");
          console.log(`- Total de módulos: ${response.data.summary.total_modules}`);
          console.log(`- Módulos completados: ${response.data.summary.completed_modules}`);
          
          console.log("\n📚 DETALLE POR MÓDULO:");
          response.data.modules.forEach((module, index) => {
            console.log(`\n${index + 1}. Módulo: ${module.module_name} (ID: ${module.module_id})`);
            console.log(`   - Estado: ${module.is_completed ? '✅ COMPLETADO' : '⚠️ INCOMPLETO'}`);
            console.log(`   - Progreso: ${module.completion_percentage}%`);
            console.log(`   - Clases totales: ${module.total_classes}`);
            console.log(`   - Clases completadas: ${module.completed_classes}`);
            
            if (module.completed_class_ids.length > 0) {
              console.log(`   - IDs clases completadas: [${module.completed_class_ids.join(', ')}]`);
            }
            
            if (module.pending_class_ids.length > 0) {
              console.log(`   - IDs clases pendientes: [${module.pending_class_ids.join(', ')}]`);
            }
          });

          // Actualizar el estado local para mostrar en la UI
          const statusMap = {};
          response.data.modules.forEach(module => {
            statusMap[module.module_id] = {
              is_completed: module.is_completed,
              completion_percentage: module.completion_percentage,
              total_classes: module.total_classes,
              completed_classes: module.completed_classes
            };
          });
          this.moduleCompletionStatus = statusMap;

          // Mostrar toast con el resumen
          if (response.data.summary.completed_modules === response.data.summary.total_modules) {
            this.$toast.success(`🎉 ¡Todos los módulos completados! (${response.data.summary.completed_modules}/${response.data.summary.total_modules})`);
          } else {
            this.$toast.info(`📊 Progreso: ${response.data.summary.completed_modules}/${response.data.summary.total_modules} módulos completados`);
          }
        }

      } catch (error) {
        console.error("❌ ERROR al verificar módulos:", error);
        if (error.response) {
          console.error("📋 Respuesta del servidor:", error.response.data);
          console.error("🔢 Status:", error.response.status);
        }
        this.$toast.error('Error al verificar estado de módulos');
      }
    },

    /**
     * Verificar el estado de un módulo específico
     */
    async checkSpecificModule(moduleId) {
      try {
        const courseId = this.$route.query.course;
        if (!courseId) {
          console.error("❌ No se encontró course_id en la ruta");
          return;
        }

        console.log(`🎯 Verificando módulo específico: ${moduleId} del curso: ${courseId}`);

        const response = await this.axios.get(`/course/${courseId}/module/${moduleId}/completion`);
        
        console.log("✅ RESPUESTA ENDPOINT - Módulo específico:");
        console.log("📊 Datos completos:", response.data);
        
        if (response.data.success) {
          const module = response.data;
          console.log("\n📚 DETALLE DEL MÓDULO:");
          console.log(`- Nombre: ${module.module_name}`);
          console.log(`- ID: ${module.module_id}`);
          console.log(`- Estado: ${module.is_completed ? '✅ COMPLETADO' : '⚠️ INCOMPLETO'}`);
          console.log(`- Progreso: ${module.completion_percentage}%`);
          console.log(`- Clases totales: ${module.total_classes}`);
          console.log(`- Clases completadas: ${module.completed_classes}`);
          
          if (module.completed_class_ids.length > 0) {
            console.log(`- IDs clases completadas: [${module.completed_class_ids.join(', ')}]`);
          }
          
          if (module.pending_class_ids.length > 0) {
            console.log(`- IDs clases pendientes: [${module.pending_class_ids.join(', ')}]`);
          }
          
          console.log(`- Mensaje: ${module.message}`);

          // Actualizar el estado local para este módulo específico
          this.$set(this.moduleCompletionStatus, moduleId, {
            is_completed: module.is_completed,
            completion_percentage: module.completion_percentage,
            total_classes: module.total_classes,
            completed_classes: module.completed_classes
          });

          // Mostrar toast con el resultado
          if (module.is_completed) {
            this.$toast.success(`✅ Módulo "${module.module_name}" completado`);
          } else {
            this.$toast.warning(`⚠️ Módulo "${module.module_name}" incompleto (${module.completion_percentage}%)`);
          }
        }

      } catch (error) {
        console.error(`❌ ERROR al verificar módulo ${moduleId}:`, error);
        if (error.response) {
          console.error("📋 Respuesta del servidor:", error.response.data);
          console.error("🔢 Status:", error.response.status);
        }
        this.$toast.error('Error al verificar estado del módulo');
      }
    },

    // MÉTODOS EXISTENTES (sin cambios)

    isLessonCompleted(lessonId) {
      return this.vuexCompletedLessons.includes(lessonId);
    },

    handleLessonComplete(lessonId) {
      if (!this.vuexCompletedLessons.includes(lessonId)) {
        this.vuexCompletedLessons.push(lessonId);
        this.getProgress();
      }
    },

    async toggleLessonCompletion(lessonId) {
      if (this.isUpdatingProgress) return;

      this.isUpdatingProgress = true;

      try {
        const courseId = this.$route.query.course;

        // Llamar a la action que maneja BD y estado local
        const result = await this.$store.dispatch("course/updateCompletedLesson", {
          lessonId,
          courseId
        });

        if (result.ok) {
          // Mostrar mensaje de éxito
          this.$toast.success('Progreso actualizado');
          
          // Verificar automáticamente los módulos después de completar una lección
          setTimeout(() => {
            this.checkModuleCompletion();
          }, 1000);
        } else {
          this.$toast.warning('Progreso guardado localmente');
        }

      } catch (error) {
        console.error("Error al actualizar progreso:", error);
        this.$toast.error('Error al actualizar progreso');
        this.$forceUpdate();
      } finally {
        this.isUpdatingProgress = false;
      }
    },

    // Nuevo método para calcular y actualizar el progreso del curso
    async updateCourseProgress() {
      try {
        const courseId = this.$route.query.course;
        if (!courseId) return;

        // Calcular progreso basado en lecciones completadas
        const totalLessons = this.getTotalLessons();
        const completedLessons = this.vuexCompletedLessons.length;
        const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        // Enviar progreso al backend
        const response = await this.axios.post(`/class/${courseId}/progress`, {
          progress: progressPercentage
        });

        console.log("Progreso actualizado:", response.data);
        
        // Actualizar estado local del progreso
        this.progress = progressPercentage;
        
        // Emitir evento si el curso se completó
        if (response.data.completed) {
          this.$emit('courseCompleted', courseId);
          this.$toast.success('¡Felicitaciones! Has completado el curso');
        }

      } catch (error) {
        console.error("Error al actualizar progreso del curso:", error);
        this.$toast.error('Error al actualizar el progreso');
      }
    },

    // Método actualizado para cargar progreso inicial
    async loadCourseProgress() {
      try {
        const courseId = this.$route.query.course;
        if (!courseId) return;

        const response = await this.axios.get(`/class/${courseId}/progress`);
        this.progress = response.data.progress;
        
        console.log("Progreso cargado:", response.data);
        
      } catch (error) {
        console.error("Error al cargar progreso:", error);
        this.progress = 0;
      }
    },

    // Método para obtener el total de lecciones
    getTotalLessons() {
      if (!this.course || !this.course.modules) return 0;
      
      return this.course.modules.reduce((total, module) => {
        return total + (module.lessons ? module.lessons.length : 0);
      }, 0);
    },

    performSearch() {
      this.filteredModules();
    },

    menuActionClick(action) {
      if (action === "temary") {
        this.content = "temary";
        this.title = "Temario";
      } else if (action === "tests") {
        this.content = "tests";
        this.title = "Exámenes";
      } else if (action === "games") {
        this.content = "games";
        this.title = "Dinámicas";
      }
    },

    goToExam(id) {
      this.$router.push({
        name: "test",
        params: { id },
        query: {
          class: this.$route.query.class,
          course: this.$route.query.course,
        },
      });
    },

    goToDinamics(id) {
      this.$router.push({
        name: "dinamic",
        params: { id },
        query: { c: this.$route.query.course },
      });
    },

    // Calcula el progreso del curso
    async getProgress() {
      if (this.$route.query.course) {
        await this.$store.dispatch(
          "course/updateCourseProgress",
          this.$route.query.course
        );
        // También actualizar el progreso en el backend
        await this.updateCourseProgress();
      }
    },

    // Cambiar la clase actual
    changeClass(less) {
      this.getLesson(less);
      this.getResources(this.lesson.name);
      this.getVideo(less.id);
      this.getComments(less.id);
      this.getRating(this.$route.query.course);
      this.getTest({
        exam_type: "class",
        id_type: this.lesson.id,
      });
      this.getModuleExam(this.$route.query.course);
      this.getActiveDinamicModule(this.$route.query.course);

      // Enviar la última clase vista
      let sendData = {
        course_id: this.$route.query.course,
        class_id: less.id,
      };
      this.lastSeenLesson(sendData);

      if (less.name != this.$route.query.class) {
        this.$router.push({
          query: {
            course: this.$route.query.course,
            class: less.name,
          },
        });
      }
    },

    // Cargar lecciones completadas
    getCompletedLessons(id) {
      this.axios.get(`purchased/show?course_id=${id}`).then((res) => {
        for (const index in res.data.data) {
          if (res.data.status[index] === "SEEN") {
            this.completedLessons.push(res.data.data[index]);
          }
        }
      });
    },

    // Actualizar la lección vista
    async checkClass(lessonId) {
      if (!this.$route.query.course) {
        console.error("Course ID not found in route");
        return;
      }
      
      try {
        await this.axios.put(
          `purchased/update?course_id=${this.$route.query.course}&class_id=${lessonId}`
        );
        
        await this.$store.dispatch("course/updateCompletedLessons", lessonId);
        
      } catch (error) {
        console.error("Error updating class:", error);
        throw error; // Re-lanzar el error para manejarlo en toggleLessonCompletion
      }
    },
    
    handleFocus(focus) {
      this.isFocus = focus;
    },

    handleHover(hover) {
      this.isHover = hover;
    },
  },
  async created() {
    this.$store.dispatch("course/initializeState");
    
    if (this.$route.query.course) {
      // Cargar datos del curso
      await this.getCourse(this.$route.query.course);
      
      // Inicializar progreso desde la base de datos
      await this.$store.dispatch("course/initializeCompletedLessons", this.$route.query.course);
      
      // Sincronizar con servidor si hay diferencias
      await this.$store.dispatch("course/syncProgressWithServer", this.$route.query.course);
      
      // Verificar estado inicial de módulos después de cargar el curso
      setTimeout(() => {
        this.checkModuleCompletion();
      }, 2000);
    }
  },
  updated() {
    // Actualiza la barra de progreso
    this.getProgress();
  },
  watch: {
    course: {
      deep: true,
      handler(newCourse) {
        if (newCourse) {
          this.$forceUpdate();
        }
      },
    },
    "$route.query.class": {
      immediate: true,
      handler(titleClass) {
        this.clase = titleClass;
      },
    },
  },
  destroyed() {
    this.DESTROY_PROGRESS_COURSE();
  },
};
</script>

<style scoped>
@import "./style.css";

/* Estilos adicionales para los nuevos elementos */
.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75em;
  font-weight: bold;
}

.badge-success {
  background-color: #28a745;
  color: white;
}

.badge-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-xs {
  padding: 2px 6px;
  font-size: 0.7em;
  line-height: 1.2;
}

.progress-indicator {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.progress-bar-mini {
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #28a745;
  transition: width 0.3s ease;
}
</style>