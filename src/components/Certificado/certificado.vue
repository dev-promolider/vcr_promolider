<template>
  <div>
    <div class="container mt-5 position-relative" v-if="muestro">
      <div class="col col-md-6 col-lg-9 mx-auto" >
        <div
          class="category-logo container d-flex row text-center cursor-pointer" 
        >
          <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
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

    <div class="container  " v-if="mostrar">
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
      informacion:[]
    };
  },

  mounted() {},

  methods: {
     getAttributes() {
     this.axios.get("/purchased/certificate-data").then((datos) => {
       
         this.informacion =datos.data.data;
         console.log(this.informacion)
        //  console.log(this.informacion)
        });
     },
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
   created() {
  this.getAttributes();
},
};
</script>

<style lang="scss" scoped>
.category-logo {
  font-size: 150px;
  color: #1ae800;
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

</style>
