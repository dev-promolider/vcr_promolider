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
    <section class="comments d-flex" v-for="comment in allComments" :key="comment">
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
      allComments: null
    }
  },
  created() {
    this.axios.get("comments/show-comments?class_id=1")
    .then((res) =>{
      this.allComments = res.data;
      console.log(this.allComments);
    })
  },
  methods: {
    sendComment(){
      this.axios.post("comments/send-comments",this.newComment)
      .then((res) => {
          console.log("comentario enviado con exíto" + res);
      })
      this.newComment.comments ='';
      console.log("TECLA ENTER!!!!!");
    }
  },
  mounted(){

  }
};
</script>

<style scoped>
.content-comments {  
  width: 100%; height: 100%; padding-left: 36px; overflow:auto;
}
.titulo{ margin-bottom: 27px; gap: 7px;}
.titulo-text{ margin: 0; font-size: 12px; font-weight: 400;}
.input-comment {  width: 100%; height: 40px; gap: 18px; margin-bottom: 26px;
}
.input-comment input{ border: none; height: 30px; font-size: 12px;
            border-bottom: 1px solid #000;  background: none;
            flex-grow: 1;
}
.img-user{ width: 37.5px; height: 37.5px; border-radius: 50%; 
}
.users-comment{ display: flex; flex-direction:column;    
}
.users-comment p{text-align: left;     
}
.name{ font-size: 11px; font-weight: bold; color: #000;
margin-bottom: 4px;
}
.date{ font-size: 9px; margin-bottom: 14px;
}
.info{ font-size: 12px; color: #000;
}
.comments {  width: 100%; height: 90px; gap: 12.26px;
}
.img-users{ width: 37.5px; height: 37.5px; border-radius: 50%;    
}
</style>