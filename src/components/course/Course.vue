<template>
  <div class="cont">
    <div v-if="error" class="no-result center-element">
      <span>Lo sentimos se produjo un error</span>
    </div>
    <div v-else class="content-course">
      <div class="navtap-video ">
        <div class="video ">
          <div class="seccion_video ">
            <Video v-if="renderVideo" />
            <div v-else class="center-spinner">
              <b-spinner
                style="width: 3rem; height: 3rem"
                variant="secondary"
                label="Large Spinner"
              ></b-spinner>
            </div>
          </div>
          <div class="seccion_inferior_video">
            <DatosCurso />
          </div>
        </div>
        <Descripcion class="descrip"/>
      </div>
      <div class="temario-comments">
        <div class="description">
          <Temario @renderVideo="renderVideo = $event" />
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
import { mapState, mapActions, mapMutations} from "vuex";
import Temario from "@/components/course/temario";
import Descripcion from "@/components/course/descripcion";
import Comentarios from "@/components/course/comentarios";
import Video from "@/components/course/video";
import DatosCurso from "@/components/course/datosCurso";
export default {
  name: "Course",
  data() {
    return {
      error: false,
    };
  },
  components: {
    Temario,
    Descripcion,
    Comentarios,
    Video,
    DatosCurso,
    //VideoHTTP
  },
  computed: {
    ...mapState("course", ["lesson", "renderVideo"]),
  },
  methods: {
    ...mapActions("course", {
      getLesson: "getLesson",
      getVideo: "getVideo",
      lastSeenLesson: "lastSeenLesson",
      getComments: "getComments",
      getCourseActive:"getCourseActive"
    }),

    ...mapMutations("course", ["GET_PROGRESS","DESTROY_PROGRESS","CLEAR_ALL_DATA"]),

    // Leccion activa al momento de renderizar el componente
    activeLesson() {
      this.axios
        .get(`class/show-class?name=${this.$route.query.class}`)
        .then((res) => {
          this.getLesson(res.data[0]);
          this.getVideo(res.data[0].id);
          this.getComments(res.data[0].id)
        });
    },

    
  },
  created() {
    this.activeLesson();
    this.GET_PROGRESS();
    this.getCourseActive(this.$route.query.course);
  },
  beforeMount() {
    if (!this.$route.query.class && !this.$route.query.course) {
      this.error = true;
      //this.$router.push('/home');
    } else if (!this.$route.query.class || !this.$route.query.course) {
      this.error = true;
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
  destroyed(){
    this.DESTROY_PROGRESS()

    // Enviando la ultima clase que esta visualizando
    let sendData = {
      course_id: this.$route.query.course,
      class_id: this.lesson.id
    }

    this.lastSeenLesson(sendData)
  }
};
</script>

<style scoped>

.cont {
  height: 100%;
  width: 100%;
  overflow-y: scroll ;
}


.cont::-webkit-scrollbar{
    display: none;
}
.content-course {
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
  max-height: calc(100vh - 80px);
  padding: 11px 102px 27px 69px;
  gap: 36px;
}
.navtap-video {
  width: 65%;
  height: 100%;
}
.video {
  width: 100%;
  height: 64%;
}
.seccion_video {
  width: 100%;
  height: 78%;
  background: #131b1e;
}
.seccion_inferior_video {
  width: 100%;
  height: 22%;
}
.temario-comments {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 35%;
  height: 100%;
}
.description {
  width: 100%;
  height: 50%;
}
.comment {
  width: 100%;
  height: 50%;
}

@media (max-width:1400px){
  .video{
    min-height: 600px ;
  }
}

@media (max-width:1250px){
  .navtap-video, .temario-comments{
    width: 100% !important;
  }
  .content-course{
    flex-direction: column;
    width: 100vw !important;
  } 
  .description{
    min-height: 500px;
    
  } 
}

@media (max-width:1000px){
  .descrip{
    margin-top: 4rem !important;
  }
  .content-course{
    padding: 2rem 0.5rem ;
  }
  .navtap-video{
    min-height: 900px ;
  }
  .description{
    margin-top: 0.5rem !important;
  } 

}




/*  */
</style>