<template>
  <div v-if="examDaily">
    <div class="container-fluid" v-if="question">
      <div class="row d-flex justify-content-center my-2" id="tooltip-target-1">
        <p>
          <strong> {{ data.question }} </strong>
        </p>
      </div>
      <!-- Alerta  -->
      <div
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
        v-if="!select"
      >
        <strong>No seleccionó una respuesta</strong> seleccione una alternativa.
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <!-- Alternativas -->
      <div class="row d-flex justify-content-center my-2">
        <div
          class="col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="(res, index) in data.answer"
          :key="index"
        >
          <input type="radio" :id="res" :value="res" v-model="picked" />
          <label
            style="font-size: 1em; text-align: center"
            :class="[{ active: picked === res }, 'text-left', 'answer']"
            :for="res"
          >
            <p style="display: inline; text-align: left">{{ index + 1 }})</p>
            {{ res }}</label
          >
        </div>
      </div>

      <div class="row d-flex justify-content-center">
        <v-btn color="#1ae800" class="ma-2 white--text" @click="check">
          Enviar
          <v-icon right dark> mdi-check </v-icon>
        </v-btn>
      </div>
    </div>

    <div class="container-fluid p-5" v-else>
      <div class="row d-flex justify-content-center my-2">
        <i class="far fa-smile-wink happy" v-if="isCorrect"></i>
        <h1 class="text-center g" v-if="isCorrect">
          Felicidades, respuesta correcta
        </h1>

        <i class="far fa-frown sad" v-if="!isCorrect"></i>
        <h1 class="text-center" v-if="!isCorrect">
          Buen intento, puede intentarlo de nuevo el día siguiente
        </h1>
        <!-- Eliminamos la visualización de la respuesta correcta ya que el frontend no la conoce -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "QuestionDaily",
  data() {
    return {
      question: true,
      isCorrect: false,
      select: true,
      questionId: '', // AGREGADO: Para almacenar el ID de la pregunta
      data: {
        question: "",
        answer: [],
        correctAnswer: "", // Ya no se usa, pero se mantiene para evitar errores
      },
      picked: "",
    };
  },
  computed: {
    ...mapState("course", ["examDaily"]),
  },
  methods: {
    ...mapActions("course", ["sendRespDailyQuizz"]),
    getQuestion() {
      let array;
      this.axios.get(`course/exam/daily`).then((res) => {
        if (res.data.message) {
          this.$store.commit("course/NO_EXAM_DAILY", false);
        } else {
          // MODIFICADO: Acceder directamente al objeto, no al array
          this.data.question = res.data.question;
          // AGREGADO: Guardar el questionId para enviarlo al backend
          this.questionId = res.data.id;
          
          // MODIFICADO: Manejar correctAnswer que puede ser null
          const correctAnswer = res.data.correctAnswer || '';
          array = res.data.incorrectAnswers.concat(correctAnswer);
          this.data.answer = array.filter(ans => ans !== '').sort(() => {
            return Math.random() - 0.5;
          });
        }
      }).catch((error) => {
        console.error('Error fetching daily question:', error);
        this.$store.commit("course/NO_EXAM_DAILY", false);
      });
    },

    // MODIFICADO: Verificamos la respuesta del usuario
    check() {
      // Si no selecciona una opcion le pedimos que lo haga
      if (this.picked === "") {
        this.select = false;
      } else {
        // MODIFICADO: Enviar la respuesta del usuario
        this.sendResponse(this.picked);
        // Bloquemos la opcion para que no vuelva intentarlo
        this.question = false;
      }
    },

    // MODIFICADO: Enviar respuesta del usuario y questionId
    sendResponse(userAnswer) {
      this.sendRespDailyQuizz({
        userAnswer: userAnswer,
        questionId: this.questionId
      }).then(result => {
        if (result.ok) {
          this.isCorrect = result.isCorrect;
        } else {
          // Manejar error
          console.error('Error:', result.error);
          // Opcional: mostrar mensaje de error al usuario
          alert('Error al enviar la respuesta. Inténtalo de nuevo.');
          this.question = true; // Permitir intentar nuevamente en caso de error
        }
      });
    },
  },
  created() {
    this.getQuestion();
  },
};
</script>

<style scoped>
input[type="radio"] {
  display: none;
}
label {
  min-width: 150px;
  border-radius: 1rem;
  background: rgba(221, 221, 221, 0.287);
  font-size: 1em;
  padding: 10px;
  cursor: pointer;
  transition: 1s;
}
.answer {
  font-size: 1.4rem;
}
label:hover {
  background: rgba(77, 170, 0, 0.342);
}
.active {
  background: #78ff66;
  color: #ffff;
  font-weight: bolder;
}
.btn-send {
  color: #35424a;
  border: none;
  font-size: 1.5rem;
  transition: 1s;
}

.btn-send:hover {
  color: #78ff6691;
}

.sad {
  font-size: 10rem;
  margin-bottom: 15px;
  color: rgba(243, 109, 109, 0.424);
}

.happy {
  font-size: 10rem;
  margin-bottom: 15px;
  color: rgba(101, 207, 39, 0.424);
}
.g {
  width: 100%;
}
.guide {
  position: fixed;
  background: rgb(189, 189, 189);
  opacity: 10%;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1050;
  overflow: auto;
}

@media (max-width: 780px) {
  h1 {
    font-size: 20px;
  }
}
</style>