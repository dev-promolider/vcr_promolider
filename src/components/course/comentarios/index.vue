<template>
  <div class="content-comments">
    <div class="titulo d-flex">
      <img src="@/assets/comment.svg" alt="" />
      <p class="titulo-text">Comentarios</p>
    </div>
    <div class="input-comment d-flex">
      <img class="img-user" src="@/assets/logo-perfil.png" alt="" />
      <input
        type="text"
        name=""
        id=""
        placeholder="Escribe tu comentario o pregunta"
        v-model="newComment.comments"
        @keyup.enter="verifyCourseId"
      />
    </div>
    <div v-if="allComments.data == 'No hay comentarios' " class="no-result center-element">
      <span>Aún no hay comentarios</span>
    </div>
    <section v-else  class="comments d-flex" v-for="comment in allComments" :key="comment">
      <img class="img-users" src="@/assets/logo-comment.svg" alt="" />
      <div class="users-comment">
        <p class="name">{{comment.username}}</p>
        <p class="date">Hace 1 dia</p>
        <p class="info">{{comment.comments}}</p>
        <!-- <div class="comments d-flex">
          <img class="img-users" src="@/assets/logo-comment.svg" alt="" />
          <div class="users-comment">
            <p class="name">Daniel Rodriguez</p>
            <p class="date">Hace 2 dias</p>
            <p class="info">Cuál es el archivo mencionado en la clase , ¿FTX.wav o FTQ.wav?</p>
          </div>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Comentarios",
  data() {
    return {
      useId: "",
      newComment:{
          issuing_user_id: "2",
          receiving_user_id: "2",
          class_id: "",
          comments: ""
      },
      /* chats:[] */
    }
  },
  computed:{
    ...mapState("course", ["allComments","lesson"]),
  },
  methods: {
    sendComment( lesson_id ){
      this.newComment.class_id = lesson_id
      this.axios.post("comments/send-comments",this.newComment)
      .then((res) => {
          console.log("comentario enviado con exíto" + res);
      })
      this.newComment.comments ='';
      // console.log("TECLA ENTER!!!!!");
    },
    verifyCourseId(){
      let lesson_id = this.$store.state.course.lesson?.id

      if( lesson_id != undefined ) { 
        this.sendComment( lesson_id )
      }else{
        return 
      }

    }
  }
};
</script>

<style scoped>

@import './style.css';

.no-result::before {
  content: "\f086";
}

</style>