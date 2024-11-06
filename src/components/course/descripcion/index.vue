<template>
  <div style="min-height: 300px">
    <template>
      <v-card class="elevation-0">
        <v-tabs v-model="tab" background-color="#f2f5fa" color="#1a1a1a" :hide-slider="true" :left="true">
          <v-tab v-for="item in items" :key="item.tab">
            {{ item.tab }}
          </v-tab>
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#1ae800" elevation="10" large rounded v-bind="attrs" v-on="on">
                Días restantes del curso: {{ date.daysUntil }}
              </v-btn>
            </template>
            <span>Fecha de inicio: {{ date.fechaInicio }}<br />Fecha de
              finalización: {{ date.fechaVencimiento }}</span>
          </v-tooltip>
        </v-tabs>

        <v-tabs-items v-model="tab" style="background-color: #f2f5fa">
          <v-tab-item v-for="item in items" :key="item.tab">
            <!-- Resumen -->
            <v-card flat v-if="item.tab === 'Resumen'" color="white" rounded="xl">
              <v-card-text class="h6 text-justify text-dark">
                {{ lesson.description }}
              </v-card-text>
            </v-card>
            <!-- Recursos -->
            <v-card flat v-if="item.tab === 'Recursos'" color="white" outlined rounded="xl" tag="div">
              <template v-if="!isResources">
                <v-card-text class="h6 text-center text-dark">
                  Ningún recurso disponible
                </v-card-text>
              </template>
              <div v-else>
                <v-card-text class="h6">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(resource, index) in resources" :key="index"
                      style="background-color: white">
                      <div class="d-flex justify-content-between text-dar">
                        <button @click="download(resource)">
                          {{ index + 1 }})
                          <i class="fas fa-download"></i>
                          {{ resource.filename }}
                        </button>
                      </div>
                    </li>
                  </ul>
                </v-card-text>
              </div>
            </v-card>
            <!-- Examen -->
            <v-card flat v-if="item.tab === 'Examen'" color="white" outlined rounded="xl" tag="div">
              <div v-if="
                dataEx &&
                rate && // 👈 null and undefined check
                Object.keys(rate).length === 0 &&
                Object.getPrototypeOf(rate) === Object.prototype
              ">
                <div class="text-white p-3">
                  <button @click="examList()" class="test">Resultados</button>
                </div>
                <div v-if="showDataEx">
                  <template v-if="dataEx === 'No existe el examen'">
                    <v-card-text class="h6 text-center text-white">
                      Ningún examen disponible
                    </v-card-text>
                  </template>
                  <template v-else-if="dataEx === 'El usuario ya aprobó el examen'">
                    <div class="mx-4 mt-4 h6 text-center text-white">
                      Usted ya aprobó este examen
                    </div>
                  </template>
                  <div class="mx-4 mt-4" v-else>
                    <!-- <div v-for="[data, index] in dataEx" :key="index"> -->
                    <p class="text-justify">
                      <button @click="Testing(dataEx)" class="test">
                        Examen de esta clase
                      </button>
                    </p>
                    <!-- </div> -->
                  </div>
                </div>
              </div>
            </v-card>

            <!-- Dinámicas -->
            <v-card flat v-if="item.tab === 'Dinámicas'" color="white" outlined rounded="xl" tag="div">
              <template v-if="!isLoadingDinamic">
                <div class="text-center">
                  <v-progress-circular indeterminate color="success"></v-progress-circular>
                </div>
              </template>

              <template v-if="isLoadingDinamic">
                <template v-if="stateDinamic">
                  <v-simple-table light>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Título</th>
                          <th class="text-left">Tipo de juego</th>
                          <th class="text-left">Categoría</th>
                          <th class="text-left">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in dinamicas" :key="item.id">
                          <td>{{ item.title }}</td>
                          <td>{{ item.type1 }}</td>
                          <td v-if="item.type2 == 1">Curso</td>
                          <td v-if="item.type2 == 2">Módulo</td>
                          <td v-if="item.type2 == 3">Clase</td>
                          <td>
                            <!--<v-btn class="mx-2" :color="item.buttonText === 'Ver Resultados' ? 'primary' : 'success'"
                              @click="goToDinamics(item.id)">
                              {{ item.buttonText }}
                            </v-btn>-->
                            <v-btn class="mx-2" :style="{
                              backgroundColor: getButtonColor(
                                item.buttonText
                              ),
                            }" @click="goToDinamics(item.id)">
                              {{ item.buttonText }}
                            </v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </template>

              <template v-if="!stateDinamic">
                <v-card-text class="text-center h6 text-white">
                  Ninguna dinámica disponible
                </v-card-text>
              </template>
            </v-card>

            <v-card flat v-if="item.tab === 'Valoraciones'" color="#131b1e" outlined rounded="xl" tag="div">
              <Valoraciones />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 lighten-2 alertTitle text-center text-white">
          Aviso
        </v-card-title>

        <v-card-text class="text-h6 text-center">
          <br />{{ this.alertMessage }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#1ae800" text @click="dialog = false"> Aceptar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="#1ae800">
      <p class="text-dark m-0 p-0">Su archivo se está descargando...</p>
      <template v-slot:action="{ attrs }">
        <v-btn color="#000" text v-bind="attrs" @click="snackbar = false">
          x
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="showModalExams" width="600">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Lista de exámenes
        </v-card-title>

        <v-card-text>
          <div class="table-responsive py-2">
            <table class="table">
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="exams_data.counter_class != 0">
                  <tr v-for="exam in exams_class" :key="exam.id" class="">
                    <template v-if="exam.exist">
                      <td>{{ exam.name }}</td>
                      <template v-if="exam.approved === 'Approved'">
                        <td class="text-success">Examen Aprobado</td>
                        <td>
                          <button class="btn btn-primary" @click="showExamResultsModal(exam.exam_id)">
                            Ver Resultado
                          </button>
                        </td>
                      </template>
                      <template v-else-if="exam.approved === 'Disaproved'">
                        <td class="text-danger">Desaprobado</td>
                        <td>
                          <button class="btn btn-primary" @click="showExamResultsModal(exam.exam_id)">
                            Ver Resultado
                          </button>
                          <button class="btn btn-primary" @click="Testing(exam.exam_id)">
                            Reintentar
                          </button>
                        </td>
                      </template>
                      <template v-else>
                        <td>--</td>
                        <td>
                          <button class="btn btn-primary" @click="Testing(exam.exam_id)">
                            Realizar Examen
                          </button>
                        </td>
                      </template>
                    </template>
                  </tr>
                </template>
                <template v-else>
                  <td colspan="3">No hay exámenes disponibles</td>
                </template>
              </tbody>
            </table>
          </div>
          <div class="table-responsive py-2">
            <table class="table">
              <thead>
                <tr>
                  <th>Módulo</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="exams_data.counter_module != 0">
                  <tr v-for="exam in exams_module" :key="exam.id" class="">
                    <template v-if="exam.exist">
                      <td>{{ exam.name }}</td>
                      <template v-if="exam.approved === 'Approved'">
                        <td class="text-success">Examen Aprobado</td>
                        <td>
                          <button class="btn btn-primary" @click="showExamResultsModal(exam.exam_id)">
                            Ver Resultado
                          </button>
                        </td>
                      </template>
                      <template v-else-if="exam.approved === 'Disaproved'">
                        <td class="text-danger">Desaprobado</td>
                        <td>
                          <button class="btn btn-primary" @click="showExamResultsModal(exam.exam_id)">
                            Ver Resultado
                          </button>
                          <button class="btn btn-primary" @click="Testing(exam.exam_id)">
                            Reintentar
                          </button>
                        </td>
                      </template>
                      <template v-else>
                        <td>--</td>
                        <td>
                          <button class="btn btn-primary" @click="Testing(exam.exam_id)">
                            Realizar Examen
                          </button>
                        </td>
                      </template>
                    </template>
                  </tr>
                </template>
                <template v-else>
                  <td colspan="3">No hay exámenes disponibles</td>
                </template>
              </tbody>
            </table>
          </div>
          <div class="table-responsive py-2">
            <table class="table">
              <thead>
                <tr>
                  <th>Curso</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="exams_data.counter_course != 0">
                  <tr class="">
                    <template v-if="exam_course.exist">
                      <td>{{ exam_course.name }}</td>
                      <template v-if="exam_course.approved === 'Approved'">
                        <td class="text-success">Examen Aprobado</td>
                        <td>
                          <button class="btn btn-primary" @click="showExamResultsModal(exam_course.exam_id)">
                            Ver Resultado
                          </button>
                        </td>
                      </template>
                      <template v-else-if="exam_course.approved === 'Disaproved'">
                        <td class="text-danger">Desaprobado</td>
                        <td>
                          <button class="btn btn-primary" @click="showExamResultsModal(exam_course.exam_id)">
                            Ver Resultado
                          </button>
                          <button class="btn btn-primary" @click="Testing(exam_course.exam_id)">
                            Reintentar
                          </button>
                        </td>
                      </template>
                      <template v-else>
                        <td>--</td>
                        <td>
                          <button class="btn btn-primary" @click="Testing(exam_course.exam_id)">
                            Realizar Examen
                          </button>
                        </td>
                      </template>
                    </template>
                  </tr>
                </template>
                <template v-else>
                  <td colspan="3">No hay examen disponible</td>
                </template>
              </tbody>
            </table>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showModalExams = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showResultsModal" width="600">
      <v-card>
        <v-card-title class="text-h5 resultado">
          Resultados del Examen
        </v-card-title>

        <v-card-text class="text-black respuestas">
          <template v-if="examResults.respuestas && examResults.respuestas.length > 0">
            <div v-for="(answer, index) in examResults.respuestas" :key="index">
              <p>
                <span>Pregunta {{ index + 1 }}</span> :
                <span v-bind:class="[
                  answer.respuestaSeleccionada === answer.respuestaCorrecta
                    ? 'text-success'
                    : 'text-danger',
                ]">{{ answer.pregunta }}</span>
                <br />
                <span>Respuesta seleccionada</span>:
                <span v-bind:class="[
                  answer.respuestaSeleccionada === answer.respuestaCorrecta
                    ? 'text-success'
                    : 'text-danger',
                ]">{{ answer.respuestaSeleccionada }}</span>
                <br />
                <span>Respuesta correcta</span>:
                <span v-bind:class="[
                  answer.respuestaSeleccionada === answer.respuestaCorrecta
                    ? 'text-success'
                    : 'text-danger',
                ]">{{ answer.respuestaCorrecta }}</span>
              </p>
            </div>
          </template>
          <p v-if="examResults.passed" class="text-success resultado-examen">
            ¡APROBADO!
          </p>
          <p v-else class="text-danger resultado-examen">DESAPROBADO</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-cerrar" color="primary" text @click="showResultsModal = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Valoraciones from "@/components/course/comentarios/valoraciones.vue";

export default {
  props: {
    id_lesson: {
      type: Number,
      required: true,
    },
  },
  components: {
    Valoraciones,
  },
  name: "Descripcion",
  data() {
    return {
      rate: {},
      dialog: false,
      componentKey: 0,
      alertMessage: "",
      isActive: 1,
      open: false,
      picture: null,
      carga: null,
      showDataEx: true,
      examResults: {},
      showResultsModal: false,
      model: "tab-2",
      text: "Lorem ipsum dolor sit amet",
      tab: null,
      items: [
        {
          tab: "Resumen",
        },
        {
          tab: "Recursos",
        },
        {
          tab: "Examen",
        },
        {
          tab: "Dinámicas",
        },
        // { tab: "Valoraciones" },
      ],
      exam_course: [],
      exams_class: [],
      exams_module: [],
      exams_data: [],
      showModalExams: false,
      stateDinamic: true,
      idDinamicGame: [],
      isLoadingDinamic: false,
      snackbar: false,
      date: [],
      dinamicas: [],
    };
  },
  computed: {
    ...mapState("course", [
      "lesson",
      "resources",
      "isResources",
      "dataEx",
      "dinamicClass",
    ]),
    queryDinamic() {
      return this.$route.query.class;
    },
  },
  methods: {
    getButtonColor(buttonText) {
      return buttonText === "Ver Resultados" ? "#00bb2d" : "#2CEA14";
    },

    async examList() {
      this.showModalExams = true;
      await this.axios
        .get(`/course/exam/list?id=${this.$route.query.course}`)
        .then((response) => {
          console.log(response);
          this.exam_course = response.data.exam_course;
          this.exams_class = response.data.exams_class;
          this.exams_module = response.data.exams_module;
          this.exams_data = response.data;
        });
    },

    async listDinamicas() {
      try {
        const response = await this.axios.get(
          `/course/dinamicas/list/${this.$route.query.course}`
        );
        const data = response.data;

        if (data.length === 0) {
          this.stateDinamic = false;
          this.isLoadingDinamic = true;
          this.dinamicas = [];
        } else {
          this.dinamicas = data.map((dynamic) => {
            const isNoCompleted = this.idDinamicGame.includes(dynamic.id);

            return {
              ...dynamic,
              buttonText: isNoCompleted ? "Empezar" : "Ver Resultados",
            };
          });

          this.stateDinamic = true;
          this.isLoadingDinamic = true;
        }
      } catch (error) {
        console.error("Error fetching dynamics:", error);
      }
    },
    
    async expirationDate() {
      this.axios
        .get(`/course/expiration-date?course_id=${this.$route.query.course}`)
        .then((r) => {
          this.date = r.data;
        });
    },

    ...mapActions("course", {
      getResources: "getResources",
      getTest: "getTest",
      getLesson: "getLesson",
      getActiveDinamicClass: "getActiveDinamicClass",
    }),

    changeTab(el) {
      this.isActive = el;
    },
    
    download(resource) {
      this.snackbar = true;
      this.carga = true;
      this.axios
        .get(`class-resource/download-resource?id=${resource.id}`, {
          responseType: "blob",
        })
        .then((response) => {
          console.log("ok");
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", resource.filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    },

    getExam() {
      this.getTest({
        exam_type: "class",
        id_type: this.lesson.id,
      });
    },

    Testing(dataEx) {
      console.log(dataEx);
      if (this.$route.params.mode == "preview") {
        this.$router.push({
          name: "previewTest",
          params: {
            mode: "preview",
            id: dataEx,
            slug: this.$route.params.slug,
          },
        });
      } else {
        this.$router.push({
          name: "test",
          params: {
            id: dataEx,
            slug: this.$route.params.slug,
          },
        });
      }

      // Lógica para mostrar los resultados del examen
      if (dataEx === "No existe el examen") {
        this.mostrar = true;
        this.typeExamem = 1; // Cambiar al tipo de resultado deseado
      } else {
        this.mostrar = true;
        this.typeExamem = 3; // Cambiar al tipo de resultado deseado
      }
    },

    async showExamResultsModal(examId) {
      try {
        const resp = await this.axios.post("course/exam/results", {
          examId: examId,
        });
        const resultados = resp.data;
        console.log(resultados);
        this.examResults = {
          respuestas: resultados.detail, // Utiliza resultadosPreguntas en lugar de examResults.respuestas
          passed: resultados.result,
        };
        this.showResultsModal = true;
      } catch (error) {
        alert("Error al recuperar resultados.");
        return;
      }
    },

    // Extraer solo nombre del recurso y no toda la ruta
    getNameResource(filepath) {
      let filenameWithExtension = filepath.replace(/^.*[\\/]/, "");
      return filenameWithExtension;
    },

    async getActiveDinamics() {
      try {
        this.isLoadingDinamic = false;
        const dataSend = {
          idClass: this.$route.query.class,
          courseId: this.$route.query.course,
          game_for: "class",
        };
        let { data } = await this.getActiveDinamicClass(dataSend);
        if (data.length === 0) {
          this.stateDinamic = false;
          this.isLoadingDinamic = true;
          this.idDinamicGame = [];
        } else {
          this.idDinamicGame = data;
          this.isLoadingDinamic = true;
          this.stateDinamic = true;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    goToDinamics(id) {
      this.$router.push({
        name: "dinamic",
        params: { id },
        query: { c: this.$route.query.course },
      });
    },
  },
  watch: {
    dinamicClass: {
      handler: "listDinamicas",
      immediate: true,
    },
    async queryDinamic() {
      this.getActiveDinamics();
      this.getExam();
      // this.getRateExam();
      // this.getResources();
    },

    $route() {
      this.tab = "Resumen";
    },
  },
  created() {
    this.getResources(this.$route.query.class);
  },
  mounted() {
    this.isLoadingDinamic = true;
    this.getActiveDinamics();
    this.expirationDate();
    // this.listDinamicas();
    // this.getRateExam();
  },
};
</script>

<style scoped>
.v-tab:not(.v-tab--active) {
  color: #1a1a1a !important;
  background: #ffffff;
  margin-bottom: 10px;
  border-radius: 50px;
  margin-right: 7px;
  margin-left: 7px;
}

.v-tab {
  color: #1a1a1a !important;
  background: #1ae800;
  margin-bottom: 10px;
  border-radius: 50px;
  margin-right: 7px;
  margin-left: 7px;
}

.nav-item {
  margin-left: 25px !important;
  margin-bottom: 0px !important;
}

.nav-link {
  border: none !important;
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
  width: 161px;
  height: 37px;
  border-bottom: solid #e5e5e5 0.2px !important;
}

.nav-tabs li {
  float: left;
  position: relative;
  cursor: pointer;
}

.nav-tabs a {
  float: left;
  text-decoration: none;
  color: white;
  background: #c4c4c4;
  font-size: 18px;
}

.nav-tabs .active {
  z-index: 3;
  pointer-events: none;
}

.nav-tabs .active a {
  background: white;
  color: black;
}

.nav-tabs .nav-item:before,
.nav-tabs .nav-item:after,
.nav-tabs .nav-link:before,
.nav-tabs .nav-link:after {
  position: absolute;
  bottom: 0;
}

.nav-tabs .nav-item:after,
.nav-tabs .nav-item a:after,
.nav-tabs .nav-item:before,
.nav-tabs .nav-item a:before,
.nav-tabs .active:after,
.nav-tabs .active:before,
.nav-tabs .active a:after,
.nav-tabs .active a:before {
  content: "";
}

.nav-tabs .active:before,
.nav-tabs .active:after {
  background: white;
  z-index: 1;
}

.nav-tabs li:before,
.nav-tabs li:after {
  background: #c4c4c4;
  width: 10px;
  height: 10px;
}

.nav-tabs li:before {
  left: -10px;
}

.nav-tabs li:after {
  right: -10px;
}

/* Circles */
.nav-tabs li a:after,
.nav-tabs li a:before {
  width: 20px;
  height: 20px;
  /* Circles are circular */
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  background: var(--bg-content);

  /* Circles over squares */
  z-index: 2;
}

.nav-tabs .active a:after,
.nav-tabs .active a:before {
  background: var(--bg-content);
  z-index: 3;
}

/* First and last tabs have different
   outside color needs */
.nav-tabs li a:before {
  left: -20px;
}

.nav-tabs li a:after {
  right: -20px;
}

.test {
  color: rgb(255, 255, 255);
  background-color: #28a745;
  padding: 5px 15px;
  margin: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
}

/* Modal container*/
.modal {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
}

/* Modal container gets target and it is shown and background modal too*/
.modal:target,
.modal:target .modal-bg {
  display: block;
  z-index: 100;
  opacity: 1;
  visibility: visible;
}

/* Background modal*/
.modal-bg:active,
.modal-bg:hover,
.modal-bg:visited,
.modal-bg:link {
  text-decoration: none;
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
}

/* Background modal overlaps to container*/
.modal:target .modal-bg {
  z-index: 200;
}

/* Modal content or body*/
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: white;
  width: 80vw;
  height: 80vh;
  border-radius: 2rem;
  text-align: center;
  z-index: 300;
  padding-bottom: 10px;
  overflow: hidden;
}

/* Modal is closed at lose target*/
.modal-exit:link,
.modal-exit:active,
.modal-exit:visited,
.modal-exit:hover {
  position: absolute;
  top: 2%;
  right: 2%;
  font-size: 1.5rem;
  text-decoration: none;
  color: #000000;
  padding: 0 15px 0 15px;
}

.pdf {
  width: 50vw;
  height: 65%;
}

.container1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cargando {
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  color: white;
  background: #131b1e;
  width: 100vw;
  height: 100vh;
  border-radius: 15px;
}

.spinner-border {
  margin: 20% 0 0 -20%;
}

.alertTitle {
  background-color: #131b1e;
}

.alertText {
  color: #1ae800;
}
</style>
