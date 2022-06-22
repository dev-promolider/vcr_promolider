import { mapState } from 'vuex';
<template>
  <div class="container-fluid py-3">
      <div class="row" style="width: 100%">
          <div class="col-8 ">
            <h4 class="font-weight-bold text-capitalize"> {{$route.query.class}} </h4>
            <div class="d-flex">
              <img src="../../../assets/logo-perfil.png" class="rounded-circle" style="height: 46px">
                <div class="d-flex flex-column ml-4" v-if="courseActive[0]">
                  <span class="font-weight-bold text-uppercase">{{courseActive[0].title}}</span>
                  {{ getNameProductor(courseActive[0].user_id) }}
                  <span class="text-uppercase">{{  nombre }}</span>
                 
                </div>
            </div>
          </div>

          <div class="col-4 d-flex align-items-start flex-row justify-content-end mt-3 ">
            <b-button-group size="sm" class="btn-group" v-if="!endClass">
                <b-button class="btn-back px-4" @click="previusClass()"><i class="fas fa-backward"></i></b-button>
                <b-button class="btn-next px-4" @click="nextClass()" v-if="this.Lecciones[this.index+1]"><i class="fas fa-forward ml-1"></i></b-button>
            </b-button-group>
            <button v-else type="button" class="btn btn-warning  text-light font-weight-bolder">Comprar una membresía <i class="fas fa-certificate"></i></button>
          </div>
        </div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions} from 'vuex';

export default {
  name:"DatosCurso",

  data() {
    return {
      index: null,
      endClass: false,
      firstClass: false,
      cuenta: localStorage.getItem("id_account_type"),
      nombre: ''
    };
  },
  computed: {
    ...mapState( {
      Lecciones: state =>state.course.allLessonsId,
      leccionActiva: state => state.course.lesson,
    }),

    ...mapGetters( 'course', {
      elProductor:'getProductor',
      courseActive:'getCourseActive'
    }),

  },
  created(){
    this.classActive();
  },
  destroyed(){
    this.endClass=false;
  },
  methods:{

    // Definimos los metodos que vienen de Vuex
    ...mapActions('course',{
      getCourse: 'getCourse',
      getLesson: 'getLesson',
      getResources: 'getResources',
      getVideo: 'getVideo',
      lastSeenLesson: 'lastSeenLesson',
      getComments: 'getComments',
      getTest: 'getTest'
    }),

    // Obtenemos el nombre del productor del curso actual
    getNameProductor(id){
      this.axios.get(`user/show?id=${id}`).then((res)=>{
        this.nombre = `${res.data.name} ${res.data.last_name}`;
      })
    },

    // Definimos la clase activa que esta siendo visualizada
    classActive(){
      this.index = this.Lecciones.findIndex(elemento => {
        return elemento.id === this.leccionActiva.id;
      })
    },

    // Accion para el boton siguiente clase
    nextClass(){
      this.classActive()
      // saber si hay otra clase
      if(this.Lecciones[this.index+1]){
        this.cambiarClase(this.Lecciones[this.index+1])
      }

      if(!this.Lecciones[this.index+2] && this.cuenta==5){
        this.endClass = true;
      }

    },

    // Accion para el boton anterior clase
    previusClass(){
      this.classActive()
      // saber si hay otra clase
      if(this.Lecciones[this.index-1]){
        this.cambiarClase(this.Lecciones[this.index-1])
      }
    },

    // Acciones que se realizaran cuando se cambie de clase
    cambiarClase(lesson){
      // Cambiar ruta de la url
      this.$router.push({
          query: {
          course: this.$route.query.course,
          class: lesson.name
        }
      });

      // Enviando informacion de la nueva clase
      this.getLesson(lesson);

      //Buscando el recurso de la nueva clase
      this.getResources(lesson.name )

      // Cambiando video de la nueva clase
      this.getVideo(lesson.id )

      // Obtenemos los comentarios de la nueva clase
      this.getComments(lesson.id)

      
      this.getTest(this.$route.query.course)

      // Enviando la ultima clase que esta visualizando
      let sendData = {
        course_id: this.$route.query.course,
        class_id: lesson.id
      }
      this.lastSeenLesson(sendData)
      
    },
  },

}
</script>

<style scoped>
@import './style.css';
</style>
