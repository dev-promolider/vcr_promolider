<template>
  <div class="content-course d-flex">
    <div class="navtap-video">
      <div class="video">
        <video width="100%" height="77.9%" 
        style="border-radius: 20px; 
        background: rgb(0,0,0);
        background: radial-gradient(circle, rgba(0,0,0,1) 82%, rgba(11,90,184,1) 100%);
        " 
        controls>
          <source :src=lesson.url type="video/mp4">
        </video>
      </div>
      <Descripcion />
    </div>
    <div class="temario-comments">
      <div class="description">
        <Temario/>
      </div>
      <div class="comment">
        <Comentarios />
        <h1></h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Temario from "@/components/course/temario/Temario.vue";
import Descripcion from "@/components/course/descripcion/Descripcion.vue";
import Comentarios from "@/components/course/comentarios/Comentarios.vue";
export default {
  name: "Course",
  components: {
    Temario,
    Descripcion,
    Comentarios,
  },
  computed:{
    ...mapState('course',['lesson'])
  }
};
</script>

<style scoped>
.content-course { display: flex; width: 100%; height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);  padding: 11px 102px 27px 69px;
    border: 1px solid royalblue; gap: 36px;
}
.navtap-video{  width: 65%; height: 100%; 
}
.video{width:100%; height: 64%; border: 1px solid royalblue;
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
