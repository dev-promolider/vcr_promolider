<template>
  <div class="mb-3 px-4" style="border-radius: 20px; margin-top: 40px; margin-right: 10px">
    <div class="temario pb-3">
      <div class="row">
        <!-- Div para el título -->
        <div class="col-lg-4 col-md-4 mr-2">
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
        <div class="col-lg-5 col-md-5 mr-2 text-right search-container">
          <div :class="['search-input', { 'search-input-hover': isHover, 'search-input-focus': isFocus }]">
            <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Buscar un tema"
              @keyup.enter="performSearch" @focus="handleFocus(true)" @blur="handleFocus(false)"
              @mouseover="handleHover(true)" @mouseleave="handleHover(false)" />
          </div>
        </div>
        <!-- Div para el menú de puntos -->
        <div class="col-lg-1 col-md-1 text-right">
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

      <div class="center-spinner" v-if="isLoading">
        <b-spinner variant="secondary"></b-spinner>
      </div>

      <div v-else>
        <div v-if="content == 'temary'" style=" max-height: 300px; overflow-y: auto; ">
          <ul v-for="(module, moduleIndex) in filteredModules" :key="moduleIndex" class="mt-3">
            <li class="nav-temario" :title="module.name">
              <p class="module-text" v-b-toggle="module.name.replace(/ /g, '')">
                {{ moduleIndex + 1 }}. {{ module.name }}
              </p>

              <b-collapse visible :id="module.name.replace(/ /g, 'AAAAA')">
                <ul style="overflow: auto; max-height: 200px;">
                  <!-- Aquí accedemos correctamente a las lecciones filtradas dentro de cada módulo -->
                  <li v-for="(lesson, lessonIndex) in module.lessons" :key="lessonIndex">
                    <div style="display: flex; align-items: center;">
                      <!--<input style="margin-right: 0px; position: relative;" type="checkbox" v-model="completedLessons"
                        :value="lesson.id" @click="checkClass(lesson.id)" />-->
                      <input style="margin-right: 0px; position: relative;" type="checkbox"
                        :checked="completedLessons.includes(lesson.id)" @change="checkClass(lesson.id)" />
                      <a style="margin-left: 10px;" @click="changeClass(lesson)"
                        :class="{ 'activo': lesson.name === clase }" :title="lesson.name">
                        {{ lesson.name }}
                      </a>
                    </div>
                  </li>
                </ul>
              </b-collapse>
            </li>
          </ul>

        </div>

        <div v-else-if="content == 'tests'">
          <v-card-text v-if="moduleExamen.course_exam === null &&
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

        <div v-else-if="content == 'games'">
          <v-card-text v-if="moduleDinamic.module_games === `Ninguna dinámica disponible` &&
            moduleDinamic.course_game === `Ninguna dinámica disponible`
            " class="text-center subtitle-1 dark-text mt-4">
            Ninguna dinamica disponible
          </v-card-text>
          <v-row justify="start" class="m-2">
            <template v-if="Array.isArray(moduleDinamic.module_games) &&
              moduleDinamic.module_games.length > 0
              ">
              <v-col v-for="module_dinamic in moduleDinamic.module_games" :key="module_dinamic.id" cols="6">
                <v-btn class="mx-1 success rounded-xl" @click="goToDinamics(module_dinamic.id)">{{ module_dinamic.title
                }}</v-btn>
              </v-col>
            </template>
            <template v-if="typeof moduleDinamic.course_game === 'object'">
              <v-col cols="6">
                <v-btn class="mx-1 success rounded-xl" @click="goToDinamics(moduleDinamic.course_game.id)">{{
                  moduleDinamic.course_game.title }}</v-btn>
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
      completedLessons: [],
      loading: true,
      isHover: false,
      isFocus: false,
    };
  },
  computed: {
    ...mapGetters("course", ["course"]),
    ...mapState("course", [
      "allLessons",
      "lesson",
      "isLoading",
      "moduleExamen",
      "moduleDinamic",
    ]),

    filteredModules() {
      const query = this.searchQuery.toLowerCase();

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
    }
  }
  ,
  methods: {
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

    performSearch() {
      this.filteredModules();
    },
    handleLessonComplete(lessonId) {
      if (!this.completedLessons.includes(lessonId)) {
        this.completedLessons.push(lessonId);
        this.getProgress(); // Actualiza el progreso del curso
      }
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
    // Funcion para calcular el progreso del curso
    /*async getProgress() {
      const completed = await Object.keys(this.completedLessons).length;
      const progress = await Math.round((completed / this.allLessons) * 100);
      if (isNaN(progress)) {
        this.progress = 0;
        this.UPDATE_PROGRESS_COURSE(0);
      } else {
        this.progress = progress;
        this.UPDATE_PROGRESS_COURSE(progress);
      }
    },*/
    async getProgress() {
      const totalLessons = this.allLessons.length;
      const completed = this.completedLessons.length;
      const progress = Math.round((completed / totalLessons) * 100);

      this.progress = isNaN(progress) ? 0 : progress;
      this.UPDATE_PROGRESS_COURSE(this.progress);
    },
    // Cambiar de clase
    changeClass(less) {
      // Enviando informacion de la nueva clase
      this.getLesson(less);
      //Buscando el recurso de la clase
      this.getResources(this.lesson.name);
      // Cambiando video de la clase
      this.getVideo(less.id);
      // Solicitar los comentarios de la nueva clase
      this.getComments(less.id);
      // Solicitar las valoraciones del Curso
      this.getRating(this.$route.query.course);
      // Solicitar los nuevos examenes si es necesario
      this.getTest({
        exam_type: "class",
        id_type: this.lesson.id,
      });
      // Solicitar los nuevos examenes si es necesario
      this.getModuleExam(this.$route.query.course);
      //Solicitar DinamicaActivas
      this.getActiveDinamicModule(this.$route.query.course);
      // Enviando la ultima clase que esta visualizando
      let sendData = {
        course_id: this.$route.query.course,
        class_id: less.id,
      };
      this.lastSeenLesson(sendData);
      // Cambiando de ruta
      if (less.name != this.$route.query.class) {
        this.$router.push({
          query: {
            course: this.$route.query.course,
            class: less.name,
          },
        });
      }
    },
    // Clases completadas
    getCompletedLessons(id) {
      this.axios.get(`purchased/show?course_id=${id}`).then((res) => {
        for (const index in res.data.data) {
          if (res.data.status[index] === "SEEN") {
            this.completedLessons.push(res.data.data[index]);
          }
        }
      });
    },

    // Enviando nueva clase vista
    async checkClass(lessonId) {
      try {
        await this.axios.put(
          `purchased/update?course_id=${this.$route.query.course}&class_id=${lessonId}`
        );
        this.handleLessonComplete(lessonId);
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
    // Enviando inforamcion del curso para obtener temario
    this.getCourse(this.$route.query.course);
    // Recibiendo las clases completadas del curso
    // this.getCompletedLessons(this.$route.query.course);
  },
  updated() {
    // Actualizando la barra de progreso
    this.getProgress();
  },
  watch: {
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
