<template>
<div class="cont">
  <div v-if="error" class="no-result center-element">
    <span>Lo sentimos se produjo un error</span>
  </div>
  <div v-else class="content-course d-flex">
    <div class="navtap-video">
      <div class="video">
        <div class="seccion_video">
          <!-- <VideoHTTP/> -->
          <Video />
          <!-- <Video v-if="renderVideo" /> -->
          <!-- <div v-else class="center-spinner">
            <b-spinner style="width: 3rem; height: 3rem;" variant="secondary" label="Large Spinner"></b-spinner>
          </div> -->
        </div>
        <div class="seccion_inferior_video">
          <SeccionInferior/>
        </div>
      </div>
      <Descripcion />
    </div>
    <div class="temario-comments">
      <div class="description">
        <Temario @renderVideo="renderVideo=$event"/>
      </div>
      <div class="comment">
        <Comentarios />
        <h1></h1>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Temario from "@/components/course/temario/Temario.vue";
import Descripcion from "@/components/course/descripcion/Descripcion.vue";
import Comentarios from "@/components/course/comentarios/Comentarios.vue";
import Video from "@/components/course/video/Video.vue";
//import VideoHTTP from "@/components/course/video/VideoHTTP.vue";
import SeccionInferior from "@/components/course/video/SeccionInferior.vue";
export default {
  name: "Course",
  data(){
    return{
      error: false
    }
  },
  components: {
    Temario,
    Descripcion,
    Comentarios,
    Video,
    SeccionInferior,
    //VideoHTTP
  },
  computed:{
    ...mapState('course',['lesson','renderVideo']),
    ...mapGetters('course',['urlVideo'])
  },
  methods:{
        ...mapActions('course',{
          getLesson: 'getLesson',
          getVideo: 'getVideo'
        }),

    // Leccion activa al momento de renderizar el componente
    activeLesson(){
      this.axios.get(`class/show-class?name=${this.$route.query.class}`).then(
      (res)=>{
          this.getLesson(res.data[0]);
          this.getVideo(res.data[0].id)
          }
        );
      },
  },
  created(){
    this.activeLesson();
  },
  beforeMount(){
    

     if(!this.$route.query.class && !this.$route.query.course){
       this.error=true;
       //this.$router.push('/home');
     }else if(!this.$route.query.class || !this.$route.query.course){
       this.error=true
       //this.$router.push('/home');
     }
    //else if(!this.$route.query.class){
    //    this.$router.push({
    //        query: {
    //            course: this.$route.query.course,
    //            class: 'clase1'
    //        }
    //    });
    // }else if(this.$route.query.class && this.$route.query.course){
    //   this.$router.push({
    //        query: {
    //            course: this.$route.query.course,
    //            class: this.$route.query.course
    //        }
    //    });
    // }
  },
  updated(){
  }
  
};
</script>

<style scoped>
.cont{
  height: 100%;
  width: 100%;
}
.content-course { display: flex; width: 100%; height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);  padding: 11px 102px 27px 69px;
    gap: 36px;
}
.navtap-video{  width: 65%; height: 100%; 
}
.video{width:100%; height: 64%;
}
.seccion_video{
  width: 100%;
  height: 78%;
  /* background: rgb(2, 2, 2); */
}
.seccion_inferior_video{
  width: 100%;
  height: 22%;
}
.temario-comments{  display: flex; flex-direction: column; gap: 22px;
    width: 35%;  height: 100%;  
}
.description{width: 100%;  height: 50%;
}
.comment{  width: 100%;  height: 50%; 
}
/*  */


</style>
