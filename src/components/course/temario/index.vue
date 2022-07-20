<template>
 
    <v-card elevation="0" >
      <v-tabs
       class="rounded-0"
        v-model="tab"
        background-color="success"
         dark 
         centered 
         flat
      >
        <v-tab
          v-for="item in items"
          :key="item.tab"
          
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item.tab"
        >
          <v-card v-if="item.tab === 'Clases'" flat>
             <div class="contenedor-temario border-box">
             <!-- Cuerpo temario -->
              <div class="temario ">
                <div class="center-spinner" v-if="isLoading">
                  <b-spinner label="Large Spinner" variant="secondary"></b-spinner>
                </div>

                <ul
                  class=" mt-2 text-truncate"
                  v-for="(model, index) in course.modules"
                  :key="index"
                  v-else
                >
                  <li class="nav-temario text-truncate" :title="model.name">
                    <span v-b-toggle="model.name.replace(/ /g, '')">
                      <strong> {{ index + 1 }}. {{ model.name }} </strong>
                    </span>
                    <b-collapse visible :id="model.name.replace(/ /g, '')">
                      <ul>
                        <li
                          v-for="(less, index) in course.modules[index].lessons"
                          :key="index"
                        >
                          <input
                            type="checkbox"
                            v-model="completedLessons"
                            :value="less.id"
                            @click="checkClass(less.id)"
                          />
                          <a
                            @click="changeClass(less)"
                            :class="{ activo: less.name === clase }"
                            :title="less.name"
                            >{{ less.name }}
                          </a>
                        </li>
                      </ul>
                    </b-collapse>
                  </li>
                </ul>
              </div>
             </div>

          </v-card>

          <v-card v-if="item.tab === 'Examen'" flat>
            <template v-if="loading && !moduleExamen">
              <div class="text-center">
                <v-progress-circular
                  indeterminate
                  color="black"
                ></v-progress-circular>
              </div>
            </template>
            <v-card-text  v-if="isNaN(parseInt(moduleExamen))" class="text-center subtitle-1 dark-text font-weight-bold" > {{moduleExamen}}  </v-card-text>
            <div v-else  class="text-center m-4">
                <v-btn  class="success rounded-xl" @click="goToExam" >Examen - Módulo</v-btn>
            </div>
          </v-card>


        </v-tab-item>
      </v-tabs-items>
  </v-card>

   
 
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "Temario",
  data() {
    return {
      tab: null,
      items: [
          { tab: 'Clases' },
          { tab: 'Examen' },
      ],
      progress: 0,
      clase: null,
      completedLessons: [],
      loading: true
    };
  },
  computed: {
    ...mapGetters("course", ["course"]),
    ...mapState("course", ["allLessons", "lesson", "isLoading", "moduleExamen"]),
  },
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
    }),

    ...mapMutations("course", [
      "UPDATE_PROGRESS_COURSE",
      "DESTROY_PROGRESS_COURSE",
    ]),
    //Ir al Examen Modulo
    goToExam(){
       this.$router.push({ name: "test", params: { id: this.moduleExamen }, query : { class: this.$route.query.class , course: this.$route.query.course   } });
    },
    // Funcion para calcular el progreso del curso
    async getProgress() {
      const completed = await Object.keys(this.completedLessons).length;
      const progress = await Math.round((completed / this.allLessons) * 100);

      if (isNaN(progress)) {
        this.progress = 0;
        this.UPDATE_PROGRESS_COURSE(0);
      } else {
        this.progress = progress;
        this.UPDATE_PROGRESS_COURSE(progress);
      }
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
      this.getModuleExam({
        exam_type: "module",
        id_type: this.lesson.id,
      });

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
    checkClass(idClass) {
      this.axios.put(
        `purchased/update?course_id=${this.$route.query.course}&class_id=${idClass}`
      );
    },
  },
  created() {
    // Enviando inforamcion del curso para obtener temario
    this.getCourse(this.$route.query.course);

    // Recibiendo las clases completadas del curso
    this.getCompletedLessons(this.$route.query.course);
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
