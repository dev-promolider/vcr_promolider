<template>
  <div class="mytabs">
    <ul class="nav nav-tabs d-flex flex-row" id="myTab" role="tablist">
      <li
        class="nav-item"
        role="presentation"
        @click="changeTab(1)"
        :class="{ active: isActive == 1 }"
      >
        <a
          class="nav-link text-center"
          id="home-tab"
          data-toggle="tab"
          href="#resumen"
          role="tab"
          aria-controls="home"
          aria-selected="true"
          >Resumen</a
        >
      </li>

      <li
        class="nav-item"
        role="presentation"
        @click="changeTab(2)"
        :class="{ active: isActive == 2 }"
      >
        <a
          class="nav-link text-center"
          id="home-tab"
          data-toggle="tab"
          href="#recursos"
          role="tab"
          aria-controls="home"
          aria-selected="true"
          >Recursos</a
        >
      </li>

      <li
        class="nav-item"
        role="presentation"
        @click="changeTab(3)"
        :class="{ active: isActive == 3 }"
      >
        <a
          class="nav-link text-center"
          id="home-tab"
          data-toggle="tab"
          href="#pruebas"
          role="tab"
          aria-controls="home"
          aria-selected="true"
          >Pruebas</a
        >
      </li>
    </ul>

    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active border-box"
        id="resumen"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div class="mx-4 mt-4">
          <p class="text-justify">
            {{ lesson.description }}
          </p>
        </div>
      </div>
      <div
        class="tab-pane fade border-box"
        id="recursos"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div class="mx-4 mt-4">
          <div v-if="!isResources">
            <p>Esta clase no tiene recursos ...</p>
          </div>

          <div v-else>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item "
                v-for="(resource, index) in resources"
                :key="index"
              >
                Recurso {{ index + 1 }}.
                <a class=" text-decoration-none text-success" disabled>
                  <i class="fas fa-download "></i>
                  {{ getNameResource(resource.resource_file) }}
                </a>

                <a href="#modal" class="open"
                  ><button
                    class="btn btn-success"
                    @click="preView(resource)"
                  >
                    Ver Archivo
                  </button></a>
              </li>
              <div class="modal" id="modal">
      <a href="#" class="modal-bg"></a>
      <div class="modal-content">
        <a href="#" class="modal-exit">x</a>
        <div class="row m-5 justify-content-sm-center">
          
          <div>
            
            <iframe :src="picture" class="pdf"> </iframe>
            
              <button class="btn btn-success " id="button">DESCARGAR</button>
            
            <div v-if="this.carga" class="cargando">
            <div class="spinner-border"></div>
          </div>
          </div>
        </div>
      </div>
    </div>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade border-box"
        id="pruebas"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div class="mt-4" v-if="dataEx.data === 'No existe el examen'">
          <p>Esta lección no tiene ninguna prueba.</p><br><p>Continua la siguiente lección.</p>
        </div>
        <div class="mx-4 mt-4" v-else>
          <p class="text-justify">
            <button @click="Testing" class="test">Realizar prueba</button>
          </p>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Descripcion",
  data() {
    return {
      isActive: 1,
      open: false,
      picture: null,
      carga: null,
    };
  },
  computed: {
    ...mapState("course", ["lesson", "resources", "isResources", "dataEx"]),
  },
  methods: {
    ...mapActions("course", {
      getResources: "getResources",
      getTest: "getTest",
    }),

    changeTab(el) {
      this.isActive = el;
    },
    /* ---------------------------------- */
    preView(resource) {
      this.mostrar = !this.mostrar;
      this.carga = true;
      this.axios
        .get(`class-resource/download-resource?id=${resource.id}`, {
          responseType: "blob",
        })
        .then((res) => {
          this.carga = false;
          let FILE = window.URL.createObjectURL(res.data);
          this.picture = FILE;

          document.getElementById("button").onclick = function () {
            var docUrl = document.createElement("a");
            // Generamos un link de descarga
            docUrl.href = FILE;
            docUrl.setAttribute("download", `${resource.resource_file}`);
            document.body.appendChild(docUrl);
            docUrl.click();
          };
        });
    },

    Testing() {
      this.$router.push({ name: "test", params: { id: this.dataEx.data } });
    },

    // Extraer solo nombre del recurso y no toda la ruta
    getNameResource(filepath) {
      let filenameWithExtension = filepath.replace(/^.*[\\/]/, "");
      return filenameWithExtension;
    },

  },
  created() {
    this.getResources(this.$route.query.class);
    
  },
  updated() {},
};
</script>

<style scoped>
.tab-pane {
  width: 100%;
  height: 215px;
  overflow-y: auto;
}
.tab-pane::-webkit-scrollbar {
  display: none;
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
  /* Makes a horizontal row */
  float: left;

  /* So the psueudo elements can be
     abs. positioned inside */
  position: relative;
  cursor: pointer;
}
.nav-tabs a {
  /* Make them block level
     and only as wide as they need */
  float: left;
  text-decoration: none;

  /* Default colors */
  color: white;
  background: #c4c4c4;
  font-size: 18px;
}
.nav-tabs .active {
  /* Highest, active tab is on top */
  z-index: 3;
  pointer-events: none;
}
.nav-tabs .active a {
  /* Colors when tab is active */
  background: white;
  color: black;
}
.nav-tabs .nav-item:before,
.nav-tabs .nav-item:after,
.nav-tabs .nav-link:before,
.nav-tabs .nav-link:after {
  /* All pseudo elements are 
     abs. positioned and on bottom */
  position: absolute;
  bottom: 0;
}
/* Only the first, last, and active
   tabs need pseudo elements at all */
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

  /* Squares below circles */
  z-index: 1;
}
/* Squares */
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
  color: #d20000;
  background: #198754;
  padding: 0 15px 0 15px;
  border-radius: 5px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}

.pdf {
  width: 70vw;
  height: 100%;
  border-radius: 15px;
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
.spinner-border{
  margin: 20% 0 0 -20%;
}
</style>
