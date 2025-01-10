<template>
  <div class="faq-container container-fluid py-5">
    <section-title title="Preguntas frecuentes" />
    <div class="row justify-content-center">
      <div class="col-lg-10 col-md-11 col-sm-12">
        <div class="accordion" role="tablist">
          <div class="faq-item" v-for="(preg, index) in preguntasF" :key="index">
            <div class="faq-header d-flex align-items-center justify-content-between" v-b-toggle="'accordion-' + index"
              @click="rotate === index ? (rotate = null) : (rotate = index)">
              <h5 class="faq-question mb-0">{{ preg.question }}</h5>
              <button :class="['btn-toggle', { rotated: rotate === index }]">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <b-collapse :id="'accordion-' + index" accordion="faq-accordion">
              <div class="faq-answer">
                {{ preg.answer }}
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../Navbar/SectionTitle.vue";

export default {
  name: "preguntas-frecuentes",
  components: {
    SectionTitle,
  },
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
.faq-container {
  background-color: #fff;
  min-height: 100vh;
}

.faq-item {
  border-bottom: 1px solid rgba(29, 29, 29, 0.1);
  margin-bottom: 0.5rem;
}

.faq-header {
  padding: 1.25rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-header:hover {
  background-color: rgba(0, 128, 0, 0.05);
}

.faq-question {
  font-weight: 400;
  font-size: 1.1rem;
  color: #333;
  padding-right: 1rem;
  margin: 0;
  flex: 1;
}

.btn-toggle {
  background: none;
  border: none;
  color: #008000;
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.btn-toggle.rotated {
  transform: rotate(135deg);
}

.btn-toggle:focus {
  outline: none;
}

.faq-answer {
  padding: 1rem 0 1.5rem;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .faq-question {
    font-size: 1rem;
  }

  .faq-header {
    padding: 1rem 0;
  }

  .btn-toggle {
    width: 28px;
    height: 28px;
  }

  .faq-answer {
    padding: 0.75rem 0 1.25rem;
  }
}

@media (max-width: 576px) {
  .faq-container {
    padding: 2rem 1rem;
  }

  .faq-question {
    font-size: 0.95rem;
  }
}
</style>
