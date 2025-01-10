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
              <p class="module-text" v-b-toggle="module.name.replace(/ /g, '')">
                {{ moduleIndex + 1 }}. {{ module.name }}
              </p>

              <b-collapse visible :id="module.name.replace(/ /g, 'AAAAA')">
                <ul style="overflow: auto; max-height: 200px">
                  <!-- Listado de lecciones en cada módulo -->
                  <li v-for="(lesson, lessonIndex) in module.lessons" :key="lessonIndex">
                    <div style="display: flex; align-items: center">
                      <input style="margin-right: 0px; position: relative" type="checkbox"
                        :checked="isLessonCompleted(lesson.id)" @change="toggleLessonCompletion(lesson.id)" />
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
      await this.checkClass(lessonId);
      this.updateCompletedLesson(lessonId);
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
        await this.$store.dispatch(
          "course/updateCourseProgress",
          this.$route.query.course
        );
      } catch (error) {
        console.error("Error updating class:", error);
      }
    },

    handleFocus(focus) {
      this.isFocus = focus;
    },

    handleHover(hover) {
      this.isHover = hover;
    },
  },
  created() {
    this.$store.dispatch("course/initializeState");
    this.initializeCompletedLessons();

    // Asegúrate de que el curso se cargue antes de continuar
    if (this.$route.query.course) {
      this.getCourse(this.$route.query.course)
        .then(() => {
          // Forzar actualización del componente después de cargar los datos
          this.$forceUpdate();
          this.getProgress();
        })
        .catch((error) => {
          console.error("Error al cargar el curso:", error);
        });
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
</style>
