<template>
  <div>
    <div class="w-100 backgro px-4 py-3">
      <p class="titulo m-0 ml-3">Mi aprendizaje</p>
    </div>

<div class="row mt-5">
  <!-- <div class="mt-5 col-md-3 d-flex align-items-center justify-content-center">
<img class="img-curso" src="@/assets/aprendizaje.png" alt="" >
  </div> -->
  <div class="">
    <div class="row mr-5 ml-5 mover d-flex">
      <div v-if="loading">
      <loadingCourses />
    </div>

    <div v-if="caritas" class="center-element no-result carita">
      <span>Sin resultados</span>
    </div>

      <div
        class="card-group mx-3 my-2"
        
        v-for="(item, index) in informacion"
        :key="index"
        
      >
        <Card :course="item" :cardType="cardType" />
      </div>
    </div>
  </div>

  </div>
  
</div>


</template>

<script>
import Card from "@/components/courses/cards";
import loadingCourses from "@/components/courses/loadingCourses";
import {mapGetters, mapMutations, mapActions, mapState} from 'vuex';
 
// import Eliminar from "@/views/content/contenedor/Contenedor.vue"
export default {
  name: "VirtualClassroomSuscription",
  components: {
    // Eliminar,
    loadingCourses,
    Card
  },
  data() {
    return {
      informacion: [],
      loading: true,
      carita: true,
      caritas: false,
      cardType: 2
    };
  },

  mounted() {},

  computed:{
    ...mapGetters('lastMessage',["getLastMessages"]),
    ...mapMutations('course',['SET_PRODUCTOR']),
    ...mapState('course',['course'])
  },
  methods: {

    ...mapActions('course',{
      getCourse: 'getCourse',
    }),


    getAttributes() {
      this.axios.get("course/purchased-courses").then((datos) => {
        this.loading = false;
        this.informacion = datos.data.data;

        if(this.informacion.length==0){
          this.carita = false;
          this.caritas = true;
        }
      });
    },



  },

  created() {
    this.getAttributes();
  },
};
</script>

<style lang="scss" scoped>
.backgro {
  background: #131b1e;
  opacity: 0.9;
  z-index: 10;
}
.row{
  margin: 0px;
}
.mover {
  margin-top: 15px;
}
.titulo {
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: left;
}

.bordeas {
  border-radius: 20px 20px 0px 0px;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}
.bordea {
  border-radius: 20px 20px 20px 20px;
  transition: 1s;
}

.bordea:hover {
  transform: scale(1.05);
}

.carita{
  position: absolute;
  top: 0;
  height: 50%;
}
</style>
