<template>
  <div class="content-course d-flex flex-column">
    <div class="temario-video">
      <Temario />
      <h1></h1>
    </div>
    <div class="description-comments">
      <div class="description">
        <Descripcion />
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
.content-course {
    width: 100%;
    height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
    border: 1px solid royalblue;
}
.temario-video{
    widows: 100%;
    height: 50%;
    border: 0.3px solid;
}
.description-comments{
    display: flex;
    widows: 100%;
    height: 50%;
    border: 0.3px solid coral;
}
.description{
    width: 65%;
    border: 0.3px solid coral;
}
.comment{
    width: 35%;
    border: 0.3px solid;
}
</style>>