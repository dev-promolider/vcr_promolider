<template>
  <div style="min-height: 100vh">
     <section-title title="Mis certificados" />

    <div class="col-md-12 text-center mt-5" v-if="informacion.length == 0 && this.spin == false" >
      <h2 class="col-12">Sin resultados</h2>
    </div>

    <div class="container" v-if="muestro">
      <div class="row">
          <div
            class="col col-lg-4"
            v-for="(item, index) in informacion"
            :key="index"
          >
            <Card
              :course="item"
              :cardType="cardType"
              @selectedCertificate="escoger"
            />
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
import SectionTitle from '../Navbar/SectionTitle.vue';

export default {
  name: "VirtualClassroomCertificado",

  components: {
    Detalles,
    Card,
    SectionTitle,
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
      this.spin = true;
      this.axios.get("/course/certificate-list").then((datos) => {
        this.informacion = datos.data;
        this.spin = false;
      }).catch( ()=>{
        this.spin = false;
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
