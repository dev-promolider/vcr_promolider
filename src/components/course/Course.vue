<template>
<<<<<<< HEAD
  <div class="content-course d-flex flex-column">
    <div class="temario-video">
      <Temario />
      <h1></h1>
=======
  <div class="content-course d-flex">
    <div class="navtap-video">
      <div class="video"></div>
      <Descripcion />
>>>>>>> 1418b28b5163c1caf830303407ef78145db1a53a
    </div>
    <div class="temario-comments">
      <div class="description">
<<<<<<< HEAD
        <Descripcion />
        


=======
        <Temario />
>>>>>>> 1418b28b5163c1caf830303407ef78145db1a53a
      </div>
      <div class="comment">
        <Comentarios />
        <h1></h1>
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style scoped>
.content-course { display: flex; width: 100%; height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
    padding: 11px 102px 27px 69px;
    border: 1px solid royalblue;
    gap: 36px;
}
.navtap-video{  width: 65%; height: 100%;  border: 0.3px solid;
}
.video{width:100%; height: 64%; border: 1px solid royalblue;
}
.temario-comments{  display: flex; flex-direction: column; gap: 22px;
    width: 35%;  height: 100%;
    border: 0.3px solid coral;
}
.description{width: 100%;  height: 50%;  border: 0.3px solid coral;
}
.comment{  width: 100%;  height: 50%; 
}
/*  */


</style>>