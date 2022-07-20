<template>
  <div style="min-height: 100vh">
    <div class="row text-left px-3 h2" style="background-color: #35424a">
      <div class="col-md-12 text-white px-5">Mis certificados</div>
    </div>

    <div class="container mt-5 position-relative" v-if="muestro">
      <div class="col col-md-6 col-lg-9 mx-auto">
        <div class="category-logo container d-flex row text-center">
          <div
            class="card-group mx-3 my-2"
            v-for="(item, index) in informacion"
            :key="index"
          >
            <Card
              :course="item"
              :cardType="cardType"
              @selectedCertificate="escoger"
            />
          </div>
          <!-- <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div> -->
        </div>
      </div>
    </div>

    <div class="slip" v-if="spin">
      <div class="d-flex justify-content-center text-primary text-center mt-5">
        <div class="spinner-border spin" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <div class="container" v-if="mostrar">
      <Detalles :certificate="certificate" />

      <button
        type="button"
        class="btn btn-outline-success mb-2 mt-5"
        @click="cerrar()"
      >
        Escoger otro certificado
      </button>
    </div>
  </div>
</template>

<script>
import Detalles from "@/components/Certificado/detalleCertificado.vue";
import Card from "@/components/courses/cards";

export default {
  name: "VirtualClassroomCertificado",

  components: {
    Detalles,
    Card,
  },
  data() {
    return {
      mostrar: false,
      muestro: true,
      spin: false,
      informacion: [],
      cardType: 4,
      certificate: {},
    };
  },

  mounted() {},

  methods: {
    getAttributes() {
      this.axios.get("/course/certificate-list").then((datos) => {
        this.informacion = datos.data;
      });
    },
    getCertificate(id) {
      this.axios.get("/course/certificate/" + id).then((datos) => {
        this.certificate = datos.data[0];

        this.spin = false;
        this.mostrar = true;
        this.muestro = false;
      });
    },
    escoger(certificate) {
      this.getCertificate(certificate.id);

      // this.$router.push('/detalle-certificado')
      this.muestro = false;
      this.spin = true;
      /*setTimeout(() => {
        this.spin = false;
        this.mostrar = true;
        this.muestro = false;
      }, 100);*/
    },

    cerrar() {
      this.mostrar = false;
      this.muestro = true;
      this.spin = false;
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style lang="scss" scoped>
.category-logo {
  font-size: 150px;
  color: #57ba4a;
  transition: 1s;
}

.spin {
  font-size: 2rem;
  width: 7rem;
  height: 7rem;
}
.slip {
  margin-top: 15%;
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
