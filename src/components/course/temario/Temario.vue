<template>
  <div>
    <div class="contenedor-temario bg-white">
      <div class="row">
        <div class="container">
          <h5 class="ml-5 mt-4"><i class="fas fa-list-alt mr-2"></i>Temario</h5>
        </div>
      </div>

      <div class="col temario">
        <ul class="ml-5 mt-2" v-for="(model, index) in modules" :key="index">
          <li class="nav-temario">
            <span v-b-toggle.collapse-1>
              <strong> {{ index + 1 }}. {{ model.name }}</strong>
            </span>
            <b-collapse id="collapse-1">
              <ul>
                <li v-for="less in modules[index].lessons" :key="less">
                  <input
                    type="checkbox"
                    v-model="completedLessons"
                    :value="less.name"
                  />
                  <a href="#">{{ less.name }}</a>
                </li>
              </ul>
            </b-collapse>
          </li>
        </ul>
      </div>

      <div class="row py-3">
        <div class="col-2 d-flex justify-content-end">
          <span>{{ progress }}%</span>
        </div>
        <div class="col-9">
          <b-progress
            animated
            :value="progress"
            variant="secondary"
            :striped="striped"
            class="mr-2"
          ></b-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Temario",
  data() {
    return {
      modules: null,
      lessons: null,
      progress: 0,
      allLessons: 0,
      completedLessons: ["Schuster Row", "Ortiz Locks"],
    };
  },
  methods: {
    // Definir funciones

    getTemary() {
      this.axios.get("course/temary/get-all-class/9").then((res) => {
        this.modules = res.data.data.modules;

        // Calculando todas las lecciones
        for (let i = 0; i < this.modules.length; i++) {
          this.allLessons += this.modules[i].lessons.length;
        }
      });
    },

    getProgress() {
      const completed = Object.keys(this.completedLessons).length;
      this.progress = Math.round((completed / this.allLessons) * 100);
    },
  },
  created() {
    // Ejecutar funciones locales
    this.getTemary();
  },
  mounted() {
    // Ejecutar funciones globales
  },
  updated() {
    this.getProgress();
  },
};
</script>

<style scoped>
/*contenedor*/
.contenedor-temario {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  font-size: 12px;
  margin: auto;
}

.temario {
  width: 100%;
  height: 330px;
  overflow-y: scroll;
}

ul {
  font-size: 15px;
}

.temario::-webkit-scrollbar {
  display: none;
}

/* Lista de reproduccion */

ul {
  list-style: none;
}

.nav-temario {
  transform: translateY(0%);
}

/* Linea vertical */
.nav-temario ul::after {
  content: "";
  position: absolute;
  width: 2px;
  height: calc(100% - 50px);
  left: 20px;
  top: 12px;
  background: black;
  z-index: -1;
  margin-top: 29px;
}

.nav-temario ul li {
  padding: 12px 0;
}

.nav-temario ul li a {
  text-decoration: none;
  position: relative;
  color: black;
  font-size: 12px;
  line-height: 1rem;
  font-weight: 500;
  top: 8px;
}

/* Pintando el checkbox */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  position: absolute;
  height: 24px;
  width: 24px;
  left: 9px;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

input[type="checkbox"]:after {
  font-family: "Font Awesome 5 Free";
  content: "\f058";
  color: black;
  font-size: 24px;
  background: white;
}

input[type="checkbox"]:checked {
  font-family: "Font Awesome 5 Free";
  content: "\f058";
  font-weight: 900;
  color: black;
  font-size: 24px;
}

/* Barra de progreso */
.progressBar {
  font-size: 12px;
}
</style>
