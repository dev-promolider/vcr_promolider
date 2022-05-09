<template>
  <div>
    <div class="w-100 backgro px-4 py-3">
      <p class="titulo m-0 ml-3">Mi aprendizaje</p>
    </div>

    <div class="row mr-5 ml-5 mover">
      <div v-if="loading">
      <loadingCourses />
    </div>

    <div v-if="caritas" class="center-element no-result">
      <span>Sin resultados</span>
    </div>

      <div
        class="col-md-4 col-lg-3 col-sm-12 card-group"
        
        v-for="(item, index) in informacion"
        :key="index"
        
      >
        <Card :course="item" :cardType="cardType" />
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

    async goToCourse(id,className,last_name, titulo){
      let dataRequest;
      await this.axios.get(`purchased/show-class-seen?course_id=${id}`).then((res)=>{
        dataRequest = res.data.data;
      });
      if(dataRequest == "no existe"){
        this.getCourse(id);
        let fistClass = this.course.modules[0].lessons[0].name;
        this.$router.push(`course-user?course=${id}&class=${fistClass}`)
      }else{
        this.$router.push(`course-user?course=${id}&class=${dataRequest.name}`)
      }
      this.$store.commit("course/SET_PRODUCTOR", [(className +" "+ last_name), titulo]);
    }


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
  position: fixed;
  z-index: 10;
}
.mover {
  margin-top: 110px;
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
</style>
