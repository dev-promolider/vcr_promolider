<template>
  <div>
    <div class="w-100 mt-3 backgro px-4 py-3">
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
        class="col col-md-6 col-lg-4 card-group"
        
        v-for="(item, index) in informacion"
        :key="index"
        
      >
        <div class="card mb-3 mt-3 bordea cursor-pointer" @click="getCourse(item.id,item.name, item.last_name, item.title)" v-if="carita">
          <div class="">
            <img
              :src="item.url_portada"
              width="100%"
              height="200"
              class="bordeas"
            />
          </div>

          <div class="card-body bg-white text-dark">
            <h4
              class="
                text-center text-capitalize
                font-weight-bold
              "
            >
              {{ item.title }}
            </h4>
          </div>
          <div class="d-flex">
            <b-avatar
              class="mb-3 ml-2"
              variant="info"
              src="https://placekitten.com/200/200"
            ></b-avatar>
            <p class="m-1 ml-2 ">
              {{ item.name + " " + item.last_name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingCourses from "@/components/courses/loadingCourses";
import {mapGetters, mapMutations} from 'vuex';
 
// import Eliminar from "@/views/content/contenedor/Contenedor.vue"
export default {
  name: "VirtualClassroomSuscription",
  components: {
    // Eliminar,
    loadingCourses,
  },
  data() {
    return {
      informacion: [],
      loading: true,
      carita: true,
      caritas: false,
    };
  },

  mounted() {},

  computed:{
    ...mapGetters('lastMessage',["getLastMessages"]),
    ...mapMutations('course',['SET_PRODUCTOR']),
  },
  methods: {
    getAttributes() {
      this.axios.get("course/purchased-courses").then((datos) => {
        this.loading = false;//gaaaa
        this.informacion = datos.data.data;

      if(this.informacion.length==0){
      this.carita = false;
      this.caritas = true;
      }

        console.log(this.informacion);
      });
    },

    async getCourse(id,className,last_name, titulo){
      let nameClass;
      await this.axios.get(`purchased/show-class-seen?course_id=${id}`).then((res)=>{
        console.log("ID de la ultima clase "+ res.data.data.last_class_reprod)
        nameClass = res.data.data.name;
      });
      this.$router.push(`course-user?course=${id}&class=${nameClass}`)
    console.log(className);
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
  background: rgb(12, 12, 12);
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
