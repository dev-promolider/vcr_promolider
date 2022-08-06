<template>
  <div
    class="container-fluid py-3 border border-secondary"
    style="
      box-shadow: -3px 3px 4px rgb(108, 108, 108);
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    "
  >
    <div class="row">
      <div
        class="col-md-8 col-lg-8 col-sm-8 col-xs-8 text-left"
        style="margin-top: 0px !important; margin-bottom: 0px !important"
      >
        <p
          class="text-capitalize text-left"
          style="
            font-weight: 700;
            font-size: 1.2em;
            margin-top: 0px !important;
            margin-bottom: 0px !important;
          "
        >
          {{ $route.query.class }}
        </p>
      </div>

      <div class="col-md-4 col-lg-4 col-sm-4 col-xs-4 text-right">
        <b-button-group size="sm" class="btn-group" v-if="!endClass">
          <b-button class="btn-back px-4" @click="previusClass()"
            ><i class="fas fa-backward"></i
          ></b-button>
          <b-button
            class="btn-next px-4"
            @click="nextClass()"
            v-if="this.Lecciones[this.index + 1]"
            ><i class="fas fa-forward ml-1"></i
          ></b-button>
        </b-button-group>
        <button v-else type="button" class="btn btn-warning text-light">
          Comprar una membresía <i class="fas fa-certificate"></i>
        </button>
      </div>

      <div class="col-xs-1 col-md-1 col-lg-1">
        <img :src="this.photo" class="rounded-circle" style="width: 40px" />
      </div>

      <div
        class="col-auto text-left"
        style="font-size: 1em"
        v-if="courseActive[0]"
      >
        <p
          class="text-uppercase text-left"
          style="margin-top: 0px !important; margin-bottom: 0px !important"
        >
          {{ courseActive[0].title }}
        </p>
        <p
          class="text-uppercase text-left"
          style="margin-top: 0px !important; margin-bottom: 0px !important"
        >
          {{ nombre }}
        </p>
      </div>
      <div
        class="col-xs-1 col-md-1 col-lg-1 text-left"
        v-if="idUser != idProductor"
      >
        <v-icon @click="openMessageDialog" class="text-left" color="green">
          mdi-message-text-outline
        </v-icon>
      </div>
    </div>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialog"
    >
      <template>
        <v-card>
          <v-toolbar class="font-weight-bold text-h6" elevation="0" dark
            >Enviar mensaje al productor</v-toolbar
          >
          <v-form
            ref="form"
            @submit.prevent="sendMessage(idUser)"
            v-if="!loading && !isMessageLoading"
            v-model="valid"
          >
            <v-textarea
              :rules="messageRules"
              v-model.trim="formMessage.message"
              placeholder="Escribe una sugerencia o duda."
              color="black"
              rows="4"
              outlined
              class="pa-5"
              required
            >
            </v-textarea>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog = !dialog">Cancelar</v-btn>
              <v-btn type="submit" text>Enviar</v-btn>
            </v-card-actions>
          </v-form>
          <div class="text-center p-5" v-if="loading">
            <v-progress-circular
              :size="50"
              :width="5"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-slide-y-transition>
            <div
              class="mt-5 mx-5 pt-5 d-flex justify-center"
              v-if="!loading && isMessageLoading"
            >
              <v-alert
                dense
                prominent
                elevation="1"
                :type="alertMessage.statusMessage ? 'success' : 'error'"
                class="text-h6 rounded-lg mx-auto"
              >
                {{ alertMessage.message }}
              </v-alert>
            </div>
          </v-slide-y-transition>
          <v-card-actions
            class="justify-end"
            v-if="!loading && isMessageLoading"
          >
            <v-btn text @click="dialog = !dialog">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "DatosCurso",

  data() {
    return {
      valid: true,
      index: null,
      endClass: false,
      firstClass: false,
      cuenta: localStorage.getItem("id_account_type"),
      nombre: "",
      photo: null,
      dialog: false,
      formMessage: {
        message: "",
      },
      messageRules: [(v) => !!v || "El mensaje es obligatorio"],
      alertMessage: {
        statusMessage: true,
        message: "",
      },
      loading: false,
      isMessageLoading: false,
      idProductor: localStorage.getItem("id_user"),
    };
  },
  computed: {
    ...mapState({
      Lecciones: (state) => state.course.allLessonsId,
      leccionActiva: (state) => state.course.lesson,
    }),

    ...mapGetters("course", {
      elProductor: "getProductor",
      courseActive: "getCourseActive",
    }),
    idUser() {
      return this.courseActive[0]?.user_id;
    },
  },
  mounted() {
    this.getNameProductor(this.idProductor);
  },
  created() {
    this.classActive();
  },
  destroyed() {
    this.endClass = false;
  },
  methods: {
    // Definimos los metodos que vienen de Vuex
    ...mapActions("course", {
      getCourse: "getCourse",
      getLesson: "getLesson",
      getResources: "getResources",
      getVideo: "getVideo",
      lastSeenLesson: "lastSeenLesson",
      getComments: "getComments",
      getRating: "getRating",
      getTest: "getTest",
      sendMessagePro: "sendMessagePro",
    }),

    //Abir el modal message - Productor

    async sendMessage(id) {
      if (!this.validateMessage(this.formMessage.message)) return;
      this.loading = true;
      const { ok } = await this.sendMessagePro({
        receiver_id: id,
        message: this.formMessage.message,
      });

      if (!ok) {
        this.showAlert({
          message: "Ocurrió un error al intentar enviar el mensaje.",
          statusMessage: false,
          loading: false,
          isMessageLoading: true,
        });
      }
      this.showAlert({
        message: "Mensaje enviado correctamente",
        statusMessage: true,
        loading: false,
        isMessageLoading: true,
      });
    },
    openMessageDialog() {
      this.dialog = true;
      this.loading = false;
      this.isMessageLoading = false;
    },
    validateMessage(message) {
      if (message !== "") return true;
    },
    showAlert({ message, statusMessage, loading, isMessageLoading }) {
      this.alertMessage.message = message;
      this.alertMessage.statusMessage = statusMessage;
      this.loading = loading;
      this.isMessageLoading = isMessageLoading;
      this.formMessage.message = "";
      return;
    },
    //Validar mensaje form
    validate() {
      this.$refs.form.validate();
    },
    // Obtenemos el nombre del productor del curso actual
    getNameProductor(id) {
      this.axios.get(`user/show?id=${id}`).then((res) => {
        this.nombre = `${res.data.name} ${res.data.last_name}`;
        this.photo = res.data.photo;
      });
    },

    // Definimos la clase activa que esta siendo visualizada
    classActive() {
      this.index = this.Lecciones.findIndex((elemento) => {
        return elemento.id === this.leccionActiva.id;
      });
    },

    // Accion para el boton siguiente clase
    nextClass() {
      this.classActive();
      // saber si hay otra clase
      if (this.Lecciones[this.index + 1]) {
        this.cambiarClase(this.Lecciones[this.index + 1]);
      }

      if (!this.Lecciones[this.index + 2] && this.cuenta == 5) {
        this.endClass = true;
      }
    },

    // Accion para el boton anterior clase
    previusClass() {
      this.classActive();
      // saber si hay otra clase
      if (this.Lecciones[this.index - 1]) {
        this.cambiarClase(this.Lecciones[this.index - 1]);
      }
    },

    // Acciones que se realizaran cuando se cambie de clase
    cambiarClase(lesson) {
      // Cambiar ruta de la url
      this.$router.push({
        query: {
          course: this.$route.query.course,
          class: lesson.name,
        },
      });

      // Enviando informacion de la nueva clase
      this.getLesson(lesson);

      //Buscando el recurso de la nueva clase
      this.getResources(lesson.name);

      // Cambiando video de la nueva clase
      this.getVideo(lesson.id);

      // Obtenemos los comentarios de la nueva clase
      this.getComments(lesson.id);

      // Obtenemos la valoracion del curso
      this.getRating(this.$route.query.course);

      this.getTest(this.$route.query.course);

      // Enviando la ultima clase que esta visualizando
      let sendData = {
        course_id: this.$route.query.course,
        class_id: lesson.id,
      };
      this.lastSeenLesson(sendData);
    },
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
