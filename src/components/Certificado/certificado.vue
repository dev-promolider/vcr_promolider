<template>
  <div>
    <div class="container mt-5 position-relative" v-if="muestro">
      <div class="col col-md-6 col-lg-9 mx-auto">
        <div
          class="category-logo container d-flex row text-center cursor-pointer"
        >
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
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

    <div class="container position-relative moveras shadow p-3 mb-5 bg-white " v-if="mostrar">
      <Detalles />

<button type="button" class="btn btn-outline-success mb-2 mt-5" @click="cerrar()">Escoger otro certificado</button>
      
    </div>
  </div>
</template>

<script>
import Detalles from "@/components/Certificado/detalleCertificado.vue";
export default {
  name: "VirtualClassroomCertificado",

  components: {
    Detalles,
  },
  data() {
    return {
      mostrar: false,
      muestro: true,
      spin: false,
    };
  },

  mounted() {},

  methods: {
    escoger() {
      // this.$router.push('/detalle-certificado')
      this.muestro = false;
      this.spin = true;

      setTimeout(() => {
        this.spin = false;
        this.mostrar = true;
        this.muestro = false;
      }, 500);
    },

    cerrar() {
      this.mostrar = false;
      this.muestro = true;
      this.spin = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.category-logo {
  font-size: 150px;
  color: seagreen;
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
.moveras{
    margin-right:auto;
    margin-left:auto;
    margin-top:4%;
    width: 70%;
    height: 85%;
    background: rgb(241, 241, 241);
    padding-top:5%;
    border-radius: 20px 20px 10px 20px;
    border: 2px solid rgb(197, 197, 197);
}
</style>
