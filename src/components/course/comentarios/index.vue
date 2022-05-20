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
    <section v-else  class="comments d-flex" v-for="(comment , idx) in allComments" :key="idx">
      <img class="img-users" src="@/assets/logo-comment.svg" alt="" />
      <div class="users-comment">
        <p class="name">{{comment.username}}</p>
        <p class="date">Hace 1 dia</p>
        <p class="info">{{comment.comments}}</p>
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
          issuing_user_id: "",
          receiving_user_id: "",
          class_id: "",
          comments: ""
      }
    }
  },
  computed:{
     ...mapState("course", ["allComments","lesson", "course_active"]),
  },
  methods: {

    // Funcion para el envio de mensajes
    sendComment( comment  ){
      this.axios.post("comments/send-comments", comment )
      this.newComment.comments ='';
    },
    verifyCourseId(){
      this.newComment.issuing_user_id = localStorage.getItem('id_user');
      this.newComment.receiving_user_id = this.course_active[0].user_id.toString();
      this.newComment.class_id = this.lesson.id.toString();

      if( this.newComment.class_id != undefined ) { 
        this.sendComment( this.newComment )
      }
      // }else{
      //   console.log('Error al enviar el comentaro');
      //   return 
      // }

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