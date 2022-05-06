import { mapState } from 'vuex';
<template>
    <!-- Seccion inferior del video -->
  <div class="container-fluid mt-3">
      <div class="row" style="width: 100%">
          <div class="col-lg-8 col-md-12">
            <h4 class="font-weight-bold"> {{$route.query.class}} </h4>
            <div class="d-flex mt-2">
              <img src="../../../assets/logo-perfil.png" class="rounded-circle" style="height: 46px">
                <div class="d-flex flex-column ml-4">
                  <span class="font-weight-bold">{{Titulo}}</span>
                  <span>{{Productor}}</span>
                  
                </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-12 d-flex align-items-start flex-row justify-content-end mt-2 ">
            <b-button-group size="sm" class="btn-group" v-if="!endClass">
                <b-button class="btn-back px-4" @click="previusClass()"><i class="fas fa-backward"></i></b-button>
                <b-button class="btn-next px-4" @click="nextClass()"><i class="fas fa-forward ml-1"></i></b-button>
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

  components: {
    
  },
  data() {
    return {
      index: null,
      endClass: false,
      firstClass: false,
      cuenta: localStorage.getItem("id_account_type")
    };
  },
  computed: {
    ...mapState( {
      //titulo: state => state.title
      Productor: state => state.course.productor[0],
      Titulo: state => state.course.productor[1],
      Lecciones: state =>state.course.allLessonsId,
      leccionActiva: state => state.course.lesson
    }),

    ...mapGetters( 'course', {
      elProductor:'getProductor',
      
    }),
  },
  created(){
    this.classActive();
  },
  destroyed(){
    this.endClass=false;
  },
  methods:{
    ...mapActions('course',{
      getCourse: 'getCourse',
      getLesson: 'getLesson',
      getResources: 'getResources',
      getVideo: 'getVideo',
      lastSeenLesson: 'lastSeenLesson',
      getComments: 'getComments'
    }),

    classActive(){
      this.index = this.Lecciones.findIndex(elemento => {
        return elemento.id === this.leccionActiva.id;
      })
    },

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
    previusClass(){
      this.classActive()
      // saber si hay otra clase
      if(this.Lecciones[this.index-1]){
        this.cambiarClase(this.Lecciones[this.index-1])
      }
    },

    cambiarClase(lesson){
      this.$router.push({
          query: {
          course: this.$route.query.course,
          class: lesson.name
        }
      });

      // Enviando informacion de la nueva clase
      this.getLesson(lesson);

      //Buscando el recurso de la clase
      this.getResources(lesson.name )

      // Cambiando video de la clase
      this.getVideo(lesson.id )

      this.getComments(lesson.id)

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
