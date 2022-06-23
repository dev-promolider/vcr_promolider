<template>
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
                <!--v-bind="less.name===clase ? urlClass=less.url : '' " -->
              </li>
            </ul>
          </b-collapse>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "Temario",
  data() {
    return {
      progress: 0,
      clase: null,
      completedLessons: [],
    };
  },
  computed: {
    ...mapGetters("course", ["course"]),
    ...mapState("course", ["allLessons", "lesson", "isLoading"]),
  },
  methods: {
    ...mapActions("course", {
      getCourse: "getCourse",
      getLesson: "getLesson",
      getResources: "getResources",
      getVideo: "getVideo",
      lastSeenLesson: "lastSeenLesson",
      getComments: "getComments",
      getTest: "getTest",
    }),

    ...mapMutations("course", [
      "UPDATE_PROGRESS_COURSE",
      "DESTROY_PROGRESS_COURSE",
    ]),

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

      // Solicitar los nuevos examenes si es necesario
      this.getTest({
        exam_type: "class",
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
