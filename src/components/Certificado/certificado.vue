<template>
  <div style="min-height: 100vh">
    <!-- <section-title title="Mis certificados" /> -->

    <!-- <div class="col-md-12 text-center mt-5"  >
      <h2 class="col-12">Sin resultados</h2>
    </div> -->
    <div class="text-center" v-if="informacion.length == 0 && this.spin == false">
      <div class="no-result sad-face">
      </div>
      <span>Sin resultados</span>
    </div>

    <div v-if="congratulationsPending" class="row" style="min-height: 80vh;">
      <div class="col-12 col-md-6 d-flex align-items-center">
        <div class="px-5">
          <img :src="congratulationCertificateUrl" alt="" class="img-thumbnail">
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex align-items-center">
        <div class="px-5">
          <div>
            <img src="@/assets/promolider.png" alt="">
          </div>
          <div class="h1"><strong>¡Felicidades!</strong></div>
          <p style="word-break: normal;">En Promolíder, sabemos el esfuerzo y dedicación que puso
            para alcanzar este gran objetivo. Por ello, nos sentimos emocionados y estamos muy orgullosos de usted.</p>
        </div>
      </div>
      
    </div>

    <div v-else>
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
    </div>

    <div class="slip" v-if="spin">
      <div class="d-flex justify-content-center text-primary text-center mt-5">
        <div class="spinner-border spin" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <div class="container pt-5 mt-5 mx-auto" v-if="mostrar">
      <!-- <Detalles :certificate="certificate" /> -->
      <img :src="certificate.certificate_path" alt="" class="img-fluid">
      <!-- <button
        type="button"
        class="btn btn-outline-success mb-2 mt-5"
        @click="cerrar()"
      >
        Escoger otro certificado
      </button> -->
    </div>
  </div>
</template>

<script>
// import Detalles from "@/components/Certificado/detalleCertificado.vue";
import Card from "@/components/courses/cards";
// import SectionTitle from "../Navbar/SectionTitle.vue";

export default {
  name: "VirtualClassroomCertificado",

  components: {
    // Detalles,
    Card,
    // SectionTitle,
  },
  data() {
    return {
      mostrar: false,
      muestro: true,
      spin: false,
      informacion: [],
      cardType: 4,
      certificate: {},
      certificateDisc: 0,
      finalPrice : 0,
      congratulationsPending: false,
      congratulationCertificateUrl: "",
    };
  },

  mounted() {},

  methods: {
    getAttributes() {
      this.spin = true;
      this.axios
        .get("/course/certificate-list")
        .then((datos) => {
          this.informacion = datos.data.Certificate;
          this.congratulationsPending = datos.data.congratulation;
          this.congratulationCertificateUrl = datos.data.congratulation_certificate_url;
          this.spin = false;
        })
        .catch(() => {
          this.spin = false;
        });
    },

    getDiscount() {
      this.spin = true;
      this.axios.get("/course/certificate-discount").then((datos) => {
        this.certificateDisc = datos.data;
        this.spin = false;
      }).catch( ()=>{
        this.spin = false;
      });
    },

    calcDiscount(price){
      var disc = price*(this.certificateDisc/100);
      return price-disc;
    },

    getCertificate(id) {
      this.axios.get("/course/certificate/" + id).then((datos) => {
        this.certificate = datos.data.Certificate;

        this.spin = false;
        this.mostrar = true;
        this.muestro = false;
      });
    },
    escoger(certificate) {
      if(certificate.is_paid == 1){
      this.getCertificate(certificate.id);

      // this.$router.push('/detalle-certificado')
      this.muestro = false;
      this.spin = true;
      /*setTimeout(() => {
        this.spin = false;
        this.mostrar = true;
        this.muestro = false;
      }, 100);*/
      }else{

        this.finalPrice = this.calcDiscount(JSON.parse(certificate.data).certificate_price);
        this.$router.push({
          name: 'buyCertificate',
          params: {
          // certificate: {...certificate},
          // finalPrice: this.finalPrice
          courseId: certificate.id
          },
        });
      }
    },

    cerrar() {
      this.mostrar = false;
      this.muestro = true;
      this.spin = false;
    },
  },
  created() {
    this.getAttributes();
    this.getDiscount();
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
