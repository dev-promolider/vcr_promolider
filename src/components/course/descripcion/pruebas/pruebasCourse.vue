<template>
  <div style="height: 78.5vh; background: white; width: 99%">
    <div
      v-if="isLoadingQuestions"
      class="text-center"
      style="margin-top: 100px"
    >
      <b-spinner type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>
      <Transition name="bounce">
        <card-alert
          v-if="mostrar && typeExamem === 1"
          color="#009ED0"
          class="mx-auto"
          style="margin: 150px"
          title="Su examen se revisará pronto"
          :img="require('@/assets/icon-coin.png')"
        >
        </card-alert>
        <card-alert
          v-if="mostrar && typeExamem === 2"
          :color="status === 'Aprobado' ? '#00A876' : '#D0004B' "
          class="mx-auto"
          style="margin: 150px"
          :rank="`Rank: ${rank}`"
          :rate="`Rate: ${rate}`"
          :title="`Has ${status} el examen`"  
          :subtitle="`Has ganado ${points} puntos. Sigue acumulando puntos para obtener recompenzas.`"
          :img="require('@/assets/icon-coin.png')"
        >
        </card-alert>
          <card-alert
          v-if="mostrar && typeExamem === 3"
          color="#076579"
          class="mx-auto"
          style="margin: 150px"
          :title="`Has ganado ${points} puntos.`"  
          :subtitle="`Sigue acumulando puntos para obtener recompenzas.`"
          :img="require('@/assets/icon-coin.png')"
        >
        </card-alert>
      </Transition>
      <div class="wrapper-stepper mx-5" v-if="!mostrar">
        <div
          class="d-flex align-center"
          :class="[
            $vuetify.breakpoint.xs ? 'flex-column mb-10' : 'justify-center',
          ]"
        >
          <h3 class="text-center ma-7 pb-0 text-capitalize">
            {{ datos.title }} 
          </h3>
          

          <v-chip color="black" text-color="white" v-if="examWithoutTime2">
            Time: {{ timeLeft }}
          </v-chip>

          <v-chip color="black" text-color="white" v-if="examWithoutTime">
            Examen sin tiempo
          </v-chip>


        </div>
        <template v-if="isTimeActive">
          <div class="text-center">
            <v-btn color="warning" @click="startExam">Empezar</v-btn>
          </div>
        </template>
        <template v-if="!isTimeActive">
          <div class="stepper">
            <div class="stepper-progress">
              <div
                class="stepper-progress-bar"
                :style="'width:' + stepperProgress"
              ></div>
            </div>

            <div
              class="stepper-item"
              :class="{ current: step == index, succes: step > index }"
              v-for="(question, index) in questions"
              :key="index"
            >
              <div class="stepper-item-counter">
                <img
                  class="icon-success"
                  src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png"
                  alt=""
                />
                <span class="number white--text">
                  {{ index + 1 }}
                </span>
              </div>
            </div>
          </div>

          <div
            class="stepper-content"
            v-for="(question, index) in questions"
            :key="index"
          >
        
            <div class="stepper-pane" v-if="step == index">
              <div class="contenedor d-flex justify-content-around">
                <div class="title-question text-capitalize">
                  {{ question.title }}
                </div>
                <div class="puntos text-capitalize">
                  Obten {{ question.points }} puntos
                </div>
              </div>
              <div v-for="(q, i) in question.options" :key="i">
                <div
                  class="options-questions"
                  v-if="question.question_type_id == 1"
                >
                  <input
                    :id="i"
                    type="radio"
                    class="input-opciones"
                    :checked="checked"
                    @click="selectOption"
                    :value="i"
                    v-model="form[index].option"
                  />
                  <label :for="i" class="opciones"> {{ q }} </label>
                </div>

                <div
                  class="options-questions"
                  v-if="question.question_type_id == 2"
                >
                  <input
                    type="checkbox"
                    :id="i"
                    :value="i"
                    v-model="form[index].option"
                  />
                  <label :for="i" class="opciones"> {{ q }} </label>
                </div>

                <div
                  class="options-questions"
                  v-else-if="question.question_type_id == 3"
                >
                  <input
                    :id="i"
                    type="radio"
                    class="input-opciones"
                    :checked="checked"
                    @click="selectOption"
                    :value="i"
                    v-model="form[index].option"
                  />
                  <label :for="i" class="opciones"> {{ q }} </label>
                </div>
              </div>
              <div v-if="question.question_type_id == 4" class="textarea">
                <v-row justify="center">
                  <v-col cols="12" sm="9">
                    <v-textarea
                      @change="selectOption"
                      color="dark"
                      placeholder="Responda aquí..."
                      maxlength="200"
                      cols="30"
                      rows="3"
                      v-model="form[index].option"
                      outlined
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
          <div
            v-if="step === Object.keys(this.questions).length"
            class="sendAnswers stepper-pane"
          >
            Has llegado al final del examén, si está seguro de sus respuestas
            seleccione enviar.
          </div>

          <div class="controls">
            <button class="btn" @click="sustractStep" :disabled="step == 0">
              Anterior
            </button>
            <button
              class="btn btn--green-1"
              @click="addStep"
              :disabled="isDisabled"
              v-if="step !== Object.keys(questions).length"
            >
              Siguiente
            </button>

            <button class="btn btn--green-1 open" @click="sendAnswers" v-else>
              Enviar
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import moment from "moment";
import CardAlert from "./components/CardAlert.vue";
export default {
  components: { CardAlert },
  data() {
    return {
      isTimeActive: false,
      points: 0,
      typeExamem: 0,

      status: null,
      rank: null,
      rate: null,

      step: 0,
      questions: [],
      options: [],
      form: [],
      isDisabled: true,
      checked: true,
      exam_id: this.$route.params.id,
      respExam: null,
      mostrar: false,
      isLoadingQuestions: true,
      datos: {},
      text: null,
      printTime: "",
      intervaltime: 0,
      time: 0,
      examWithoutTime: false,
      examWithoutTime2: true,
    };
  },
  computed: {
    stepperProgress() {
      return (
        (100 / Object.keys(this.questions).length) * (this.step + 1 - 1) + "%"
      );
    },
    timeLeft() {
      return moment.utc(this.time * 1000).format("HH:mm:ss");
    },
    ...mapState("course", ["course_active"]),
  },
  methods: {
    ...mapMutations("course", ["sumPoints"]),
    ...mapActions("course", {
      getExam: "getExam",
      sendAnswersExamen: "sendAnswersExamen",
    }),

    async setExam() {
      const resp_exam = await this.getExam(this.$route.params.id);
      if (resp_exam.status === 200) {
        const { questions, exam } = resp_exam.data.data;

        this.datos = exam;
        this.questions = questions;
        this.splitQuestions(questions);
        this.isLoadingQuestions = false;
        if (exam.time === 59999940) {
          this.isTimeActive = true;
          this.examWithoutTime = true;
          this.examWithoutTime2 = false;
          this.time = this.datos.time;
        } else {
          
            this.time = this.datos.time;
          
          
          this.isTimeActive = true;
        }
      }
    },
    splitQuestions(questions) {
      questions.forEach((e) => {
        this.form.push({ option: [] });
        return e;
      });
    },
    addStep() {
      if (this.form[this.step].option.length <= 0) {
        this.isDisabled = false;
        return false;
      } else {
        this.step++;
      }
    },
    sustractStep() {
      this.checked ? (this.isDisabled = false) : (this.isDisabled = true);
      this.step--;
    },
    selectOption() {
      this.isDisabled = false;
    },
    enviarText() {
      if (this.text != null) {
        this.form.push({ option: [this.text] });
      }
    },

    async sendAnswers() {
      this.enviarText();

      console.log(this.time);

      if (this.form.length < this.options.length) {
        return false;
      } else {
        const { ok, resp } = await this.sendAnswersExamen({
          id_exam: +this.exam_id,
          answers: this.form,
          course_id: +this.$route.query.course,
          seconds_used: this.time,
        });
        if (!ok) return;
        const { message = '', points = 0, rank = 0, rate = 0  } = resp.data

        if (resp.data === "Waiting") {
          this.typeExamem = 1;
          this.mostrar = true;
        } else if ( message === "Desaprobado" || message === 'Aprobado' ) {
          this.clearTime();
          this.points = points;
          this.status = message;
          this.rank = rank;
          this.rate = rate;
          this.typeExamem = 2;
          this.mostrar = true;
        } else {
          this.clearTime();
          this.points = resp.data.points_gained || points;
          this.status = message;
          this.rank = rank;
          this.rate = rate;
          this.typeExamem = 3;
          this.mostrar = true;
        }
      }
    },
    setTime() {
      this.intervaltime = setInterval(() => {
        this.time--;

        if (this.time === 0) {
          this.sendAnswers();
          this.clearTime();
        }
      }, 1000);
    },
    comeBack() {
      this.$router.back();
    },
    startExam() {
      this.isTimeActive = false;
      this.setTime();
    },
    clearTime() {
      clearInterval(this.intervaltime);
    },
  },
  created() {
    this.setExam();
    //Validación si tiene comprado el curso
  },
  beforeDestroy() {
    this.clearTime();
  },
};
</script>

<style lang="scss" scoped>
$default: #c5c5c5;
$green-1: #65da3c;
$green-2: #65da3c;
$green-3: #dfffe0;
$black-2: #0a1012;
$black-1: #000000;
$red-1: #e7837c;
$transiton: all 500ms ease;
$font-anksans-regular: fon;

.sendAnswers {
  padding: 35px 15% !important;
  font-weight: 600;
  text-align: center;
  font-size: 17px;
  color: $black-1;
  height: 200px;
}
.opciones {
  text-align: left;
  margin-left: 10px !important;
}
.contenedor {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  align-items: center;
  margin-bottom: 2.5rem;
  margin-top: 1em;
}

.puntos {
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}

.title-question {
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  padding: 0 auto;
}
.options-questions {
  margin-bottom: 10px;
}
label {
  margin: 0 !important;
  padding: 0;
}
.tx-green-1 {
  color: $green-1;
  font-weight: 600;
}

.wrapper-stepper {
  background-color: white;
  padding: 2% 10%;
  box-shadow: rgba($color: #000000, $alpha: 0.09);
  overflow: hidden;
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 0;
  margin-bottom: 24px;

  &-progress {
    position: absolute;
    background-color: $default;
    height: 2px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;

    &-bar {
      position: absolute;
      left: 0;
      height: 100%;
      width: 0%;
      background-color: $green-1;
      transition: $transiton;
    }
  }
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $default;
  transition: $transiton;

  &-counter {
    height: 30px;
    width: 30px;
    display: grid;
    place-items: center;
    background-color: #fff;
    border-radius: 100%;
    border: 2px solid $default;
    position: relative;

    .icon-success {
      position: absolute;
      opacity: 0;
      transform: scale(0);
      width: 14px;
      transition: $transiton;
    }

    .number {
      font-size: 15px;
      transition: $transiton;
    }
  }

  &-title {
    position: absolute;
    font-size: 14px;
    bottom: -24px;
  }
}
.stepper-item {
  .stepper-item-counter {
    border-color: $green-1;
    background-color: $green-3;
    color: #fff;
    font-weight: 600;

    .icon-success {
      opacity: 1;
      transform: scale(1);
    }

    .number {
      opacity: 0;
      transform: scale(0);
    }
  }

  .stepper-item-title {
    color: $green-1;
  }
}
//items-title - Paso 1 - Paso 2 - Paso 3
.stepper-item.current {
  .stepper-item-counter {
    border-color: $green-1;
    background-color: $green-1;
    color: #fff;
    font-weight: 600;
  }

  .stepper-item-title {
    color: #818181;
  }
}
//Panel donde se muestra el contenido
.stepper-pane {
  background: rgba(255, 255, 255, 0.555);
  color: rgb(0, 0, 0);
  padding: 5px 15px 50px 14px;
  box-shadow: 0 8px 12px rgba($color: #000000, $alpha: 0.09);
  margin: 1em 15%;
}

//Separación de los botones
.controls {
  display: flex;
}

//Botones
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 15px;
  border: 1px solid;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  line-height: 1.5;
  transition: all 150ms;
  border-radius: 4px;
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
  color: rgb(255, 255, 255);
  background-color: $green-2;
  border-color: $green-2;

  &:hover {
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--green-1 {
    margin-left: auto;
  }
}

input[type="checkbox"] {
  position: initial;
  height: 40px;
}
.options-questions input[type="radio"],
input[type="checkbox"] {
  display: none;
}
.options-questions label {
  color: #ffffff;
  background: #38b322;
  padding: 2px 10px 5px 40px;
  display: inline-block;
  position: relative;
  font-size: 1.1rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
}
.options-questions label:hover {
  background: #31c916;
}
.options-questions label::before {
  content: "";
  width: 17px;
  height: 17px;
  display: inline-block;
  background: none;
  border: 3px solid white;
  border-radius: 50%;
  position: absolute;
  left: 17px;
  top: 8px;
}
.options-questions input[type="radio"]:checked + label,
.options-questions input[type="checkbox"]:checked + label {
  padding: 2px 10px 5px 40px;
  background: #3bc023;
  border-radius: 10px;
  color: #fff;
}
.options-questions input[type="radio"]:checked + label:before,
.options-questions input[type="checkbox"]:checked + label:before {
  display: none;
  border-radius: 10px;
}
textarea {
  color: #000000;
  border-radius: 5px;
  border: 1px solid rgb(63, 63, 63) !important;
  height: 120px;
  padding: 5px 10px;
}

@media (max-width: 1200px) {
  .title-question {
    font-size: 17px;
  }
  .puntos {
    font-size: 15px;
  }
  .wrapper-stepper {
    padding: 1em;
  }
  .stepper-pane {
    margin: 50px 15px 30px;
  }
}
.caja-texto {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 50px auto;
  min-width: 100px;
  max-width: 440px;
}
.success-texto {
  background: $green-2;
}
.danger-texto {
  background: $red-1;
}

/*************** Animation message*/
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
