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
        @keyup.enter="sendComment"
      />
    </div>
    <div v-if="allComments.data" class="no-result center-element">
      <span>Aún no hay comentarios</span>
    </div>
    <section v-else class="comments d-flex" v-for="comment in allComments" :key="comment">
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
export default {
  name: "Comentarios",
  data() {
    return {
      useId: "",
      newComment:{
          issuing_user_id: "2",
          receiving_user_id: "2",
          class_id: 1,
          comments: ""
      },
      allComments: null,
      /* chats:[] */
    }
  },
  created() {
    this.axios.get("comments/show-comments?class_id=1")
    .then((res) =>{
      this.allComments = res.data;
      /* this.chats = this.allComments */
      //console.log(this.allComments);
    })
  },
  methods: {
    sendComment(){
      this.axios.post("comments/send-comments",this.newComment)
      .then((res) => {
          console.log("comentario enviado con exíto" + res);
      })
      this.newComment.comments ='';
       //console.log("TECLA ENTER!!!!!");
    }
  },
  mounted(){

  }
};
</script>

<style scoped>

@import './style.css';

.no-result::before {
  content: "\f086";
}

</style>