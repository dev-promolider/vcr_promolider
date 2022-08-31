<template>
  <div style="min-height: 300px">
    <template>
      <v-card class="elevation-0">
        <v-tabs
          v-model="tab"
          background-color="#f2f5fa"
          color="#1a1a1a"
          :hide-slider="true"
          :left="true"
        >
          <v-tab v-for="item in items" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" style="background-color: #f2f5fa">
          <v-tab-item v-for="item in items" :key="item.tab">
            <!-- Resumen -->
            <v-card
              flat
              v-if="item.tab === 'Resumen'"
              color="#131b1e"
              rounded="xl"
            >
              <v-card-text class="h6 text-justify text-white">
                {{ lesson.description }}
              </v-card-text>
            </v-card>
            <!-- Recursos -->
            <v-card
              flat
              v-if="item.tab === 'Recursos'"
              color="#131b1e"
              outlined
              rounded="xl"
              tag="div"
            >
              <template v-if="!isResources">
                <v-card-text class="h6 text-center text-white">
                  Ningún recurso disponible
                </v-card-text>
              </template>
              <div v-else>
                <v-card-text class="h6">
                  <ul class="list-group list-group-flush">
                    <li
                      class="list-group-item"
                      v-for="(resource, index) in resources"
                      :key="index"
                      style="background-color: #131b1e"
                    >
                      <div class="d-flex justify-content-between text-white">
                        <div>
                          {{ index + 1 }})
                          <a
                            style="font-size: 0.8em; text-decoration: none"
                            disabled
                          >
                            <i class="fas fa-download"></i>
                            {{ getNameResource(resource.resource_file) }}
                          </a>
                        </div>
                        <div>
                          <a href="#modal" class="open">
                            <button
                              class="btn btn-primary btn-sm"
                              @click="preView(resource)"
                            >
                              Ver Archivo
                            </button></a
                          >
                        </div>
                      </div>
                    </li>

                    <div class="modal" id="modal">
                      <a href="#" class="modal-bg"></a>
                      <div class="modal-content">
                        <a href="#" class="modal-exit">x</a>
                        <div class="row m-5 container1 d-flex flex-column">
                          <iframe :src="picture" class="pdf"> </iframe>

                          <br />

                          <button class="btn btn-primary" id="button">
                            DESCARGAR
                          </button>

                          <div v-if="carga" class="cargando">
                            <div class="spinner-border"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </v-card-text>
              </div>
            </v-card>
            <!-- Examen -->
            <v-card
              flat
              v-if="item.tab === 'Examen'"
              color="#131b1e"
              outlined
              rounded="xl"
              tag="div"
            >
              <div v-if="dataEx">
                <template
                  v-if="
                    dataEx.data === 'No existe el examen'"
                >
                  <v-card-text class="h6 text-center text-white">
                    Ningún examen disponible
                  </v-card-text>
                </template>

                <div class="mx-4 mt-4" v-else>
                  <p class="text-justify">
                    <button @click="Testing" class="test">
                      Realizar prueba
                    </button>
                  </p>
                </div>
              </div>
            </v-card>

            <!-- Dinámicas -->
            <v-card
              flat
              v-if="item.tab === 'Dinámicas'"
              color="#131b1e"
              outlined
              rounded="xl"
              tag="div"
            >
              <template v-if="!isLoadingDinamic">
                <div class="text-center">
                  <v-progress-circular indeterminate color="success">
                  </v-progress-circular>
                </div>
              </template>

              <template v-if="isLoadingDinamic">
                <template v-if="stateDinamic">
                  <v-btn
                    class="mx-2"
                    color="success"
                    @click="goToDinamics(dinamic)"
                    v-for="(dinamic, index) in idDinamicGame"
                    :key="index"
                  >
                    <v-icon left> mdi-gamepad-variant </v-icon>
                    <div v-if="dinamic">Dinamica {{ index + 1 }}</div>
                    <div v-else></div>
                  </v-btn>
                </template>
              </template>

              <template v-if="!stateDinamic && isLoadingDinamic">
                <v-card-text class="text-center h6 text-white">
                  Ninguna dinámica disponible
                </v-card-text>
              </template>
            </v-card>

            <v-card
              flat
              v-if="item.tab === 'Valoraciones'"
              color="#131b1e"
              outlined
              rounded="xl"
              tag="div"
            >
              <Valoraciones />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>


    <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title class="text-h5 lighten-2 alertTitle text-center text-white">
            Aviso
          </v-card-title>
  
          <v-card-text class="text-h6 text-center">
            <br>{{this.alertMessage}}
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#1ae800"
              text
              @click="dialog = false"
            >
              Aceptar
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
  components: {
    Valoraciones,
  },
  name: "Descripcion",
  data() {
    return {
      dialog: false,
      componentKey: 0,
      alertMessage: "",
      isActive: 1,
      open: false,
      picture: null,
      carga: null,
      model: "tab-2",
      text: "Lorem ipsum dolor sit amet",
      tab: null,
      items: [
        { tab: "Resumen" },
        { tab: "Recursos" },
        { tab: "Examen" },
        { tab: "Dinámicas" },
        { tab: "Valoraciones" },
      ],
      stateDinamic: true,
      idDinamicGame: [],
      isLoadingDinamic: false,
    };
  },
  computed: {
    ...mapState("course", ["lesson", "resources", "isResources", "dataEx"]),
    queryDinamic() {
      return this.$route.query.class;
    },
  },
  methods: {
    ...mapActions("course", {
      getResources: "getResources",
      /* getTest: "getTest", */
      getLesson: "getLesson",
      getActiveDinamicClass: "getActiveDinamicClass",
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
      if (isNaN(this.dataEx.data) == false) {
        this.$router.push({
          name: "test",
          params: { id: this.dataEx.data },
          query: {
            class: this.$route.query.class,
            course: this.$route.query.course,
          },
        });
      } else {
        //alert(this.dataEx.data);
        this.alertMessage = this.dataEx.data;
        this.dialog = true;
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
    async queryDinamic() {
      this.getActiveDinamics();
    },

    $route (){
      this.tab= "Resumen";
    },
  },
  created() {
    this.getResources(this.$route.query.class);
  },
  mounted() {
    this.isLoadingDinamic = true;
    this.getActiveDinamics();
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

/* .v-card > :last-child:not(.v-btn):not(.v-chip):not(.v-avatar) { */
/* .v-card > :last-child {
  background-color: #131b1e;
  border-radius: 20px;
} */
/* .tab-pane {
  width: 100%;
  height: 215px;
  overflow-y: auto;
}
.tab-pane::-webkit-scrollbar {
  display: none;
} */
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

.alertText{
  color:#1ae800;
}
</style>
