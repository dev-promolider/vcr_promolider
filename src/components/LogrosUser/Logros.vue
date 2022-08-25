<template>
  <div style="min-height: 100vh">


    <section-title title="Mis logros" />

     <div v-if="!isLoading" class="row p-4">
      <div class="col-md-12 col-lg-12">
        <div class="row">
          <div
            class="col-md-3 col-sm-4"
            v-for="(logro, index) in logros"
            :key="index"
          >
            <div v-if="logro.obtained == true">
              <div
                class="card text-center justify-content-center obtained bg-white"
                :title="logro.description"
              >
                <img
                  style="
                    max-height: 150px;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                  "
                  :alt="logro.name"
                  :src="logro.icon"
                />
                <div class="card-body">
                  <h5 class="card-title" style="font-size: 1em">
                    {{ logro.name }}
                  </h5>
                </div>
              </div>
            </div>

            <div v-else class="card text-center justify-content-center opacar">
              <img
                style="
                  max-height: 150px;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                "
                :alt="logro.name"
                :src="logro.icon"
              />
              <div class="card-body">
                <h5 class="card-title" style="font-size: 1em">
                  {{ logro.name }}
                </h5>
              </div>
            </div>
          </div>
        </div>

    

      </div>
      


    </div> 

    
        <template v-if="isLoading" >
          <v-row class="mx-10">
            <v-col cols="12" xs="1" sm="6" md="4" lg="3"  v-for="i in 12" :key="i" >
              
                  <v-skeleton-loader
                      class="m-1"
                      max-width="500"
                      type="image"
                  ></v-skeleton-loader>
            
            </v-col>
          </v-row>
      </template>
    <!-- 
    <div class="row">
      <div class="col-md-9">
        <div class="caja-principal p-5 overflow-hidden">
          <div class="encabezado d-flex justify-content-star">
            <div class="p-4 d-flex texto-logro">
              <img
                src="@/assets/logo-inicial.png"
                alt=""
                class="img-logo px-4"
              />
              <small class="text-white flex"
                >Bienvenido a la sección de logros!!!</small
              >
            </div>
          </div>

          <div class="cuerpo">
            <div
              class="cuerpo-caja d-flex flex-wrap justify-content-around p-2 text-capitalize"
            >
              <div
                style="max-width: 180px"
                class="caja d-flex m-3"
                v-for="(logro, index) in logros"
                :key="index"
              >
                <div
                  class="cajita2 d-flex flex-fill align-items-center position-relative"
                >
                  <div class="container text-white">
                    <div class="row center">
                      <img width="100px" :src="logro.icon" alt="" />
                    </div>
                    <div class="row center">
                      <p>{{ logro.name }}</p>
                    </div>
                    <div class="row center">
                      <p>Nivel {{ logro.level }}</p>
                    </div>
                  </div>
                  <div v-if="logro.obtained == false" class="opacar">
                    <div
                      class="h-100 d-flex align-items-center justify-content-center"
                    >
                      <p>
                        <strong>{{ logro.description }}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-5 col-md-3 d-flex align-items-start justify-content-center"
      >
        <img class="img-curso" src="@/assets/handsome-guy.png" alt="" />
      </div>
    </div> -->
  </div>
</template>

<script>
import SectionTitle from '../Navbar/SectionTitle.vue';
export default {
  components: { SectionTitle },
  name: "Logros",

  data() {
    return {
      logros: null,
      isLoading: true
    };
  },
  mounted() {
    this.getLogros();
  },
  methods: {
    getLogros() {
      this.axios("badges/my-progress").then((res) => {
        this.logros = res.data;
        this.isLoading = false
      });
    },
  },
};
</script>

<style scoped>
.card{
  background-color: transparent;
  border: 0px;
  border-radius: 20px;
}
.obtained {
  flex: 0 1 250px;
  box-shadow: 2px 2px 4px rgba(255, 255, 255, 0.459);
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.5s;
}
.obtained:hover {
  transform: scale(1.1, 1.1);
}

.opacar {
  background-color: #808080;
}

.opacar img {
  opacity: 0.4;
}

.opacar h5 {
  opacity: 0.4;
  color: #afafaf;
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
