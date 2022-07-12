<template>
<div>
    <div class="w-100 backgro px-4 py-2">
      <p class="titulo m-0 ml-3">Preguntas frecuentes</p>
    </div>
  <div class="container d-flex justify-content-center mt-5">
    <div class="col-md-7 col-sm-12 col-lg-6">
      <h1 class="text-center mb-4">Preguntas frecuentes</h1>
      <ul class="list-group list-unstyled">
        <li
          class="item-question px-5 py-4"
          v-for="(preg, index) in preguntasF"
          :key="index"
        >
          <div
            class="d-flex justify-content-between cursor-pointer"
            v-b-toggle="preg.question.replace(/ /g, '')"
            @click="rotate === index ? (rotate = null) : (rotate = index)"
          >
            <h5 class="font-weight-bolder">{{ preg.question }}</h5>
            <button
              :class="['btn-plus', { 'btn-plus-rotate': rotate === index }]"
            >
              <i class="fas fa-plus text-right"></i>
            </button>
          </div>
          <b-collapse
            :id="preg.question.replace(/ /g, '')"
            class="mt-3"
            accordion="my-accordion"
          >
            <p class="text-left">{{ preg.answer }}</p>
          </b-collapse>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "preguntas-frecuentes",
  data() {
    return {
      preguntasF: null,
      rotate: null,
    };
  },
  methods: {
    getPreguntas() {
      this.axios.get("frequent-questions").then((res) => {
        this.preguntasF = res.data;
      });
    },
  },
  created() {
    this.getPreguntas();
  },
};
</script>

<style scoped>
.item-question {
  border-bottom: 1px solid rgba(29, 29, 29, 0.102);
}
.btn-plus {
  font-size: 15px;
  color: green;
  transition: 1s;
}
.btn-plus-rotate {
  transform: rotate(137deg);
  transition: 1s;
}
.backgro {
  background: #131b1e;
  opacity: 0.9;
  z-index: 10;
}
.titulo {
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: left;
}
</style>
