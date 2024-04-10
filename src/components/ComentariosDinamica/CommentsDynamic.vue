<template>
  <div class="comments-section">
    <div class="total-comments">{{ comments.length + " COMENTARIOS" }}</div>
    <div class="comment-input">
      <img :src="userPic" alt="User's Profile Image" class="input-avatar">
      <textarea placeholder="Escribe un comentario..." class="input-textarea" ref="commentInput" @click="setFocus" minlength="3" maxlength="255"
        v-model="commentContent"></textarea>
      <button class="send-button" @click="sendComment">
        <img :src="require('@/assets/SendComment.svg')" alt="Send Comment">
      </button>
    </div>
    <div class="aux-comment-container">

      <div class="comments-container" v-if="!isLoadingDynamicComments">
        <Comment v-for="commentData in comments" :key="commentData.id" :commentData="commentData" />
      </div>
    </div>

  </div>
</template>

<script>
import Comment from './Comment/Comment.vue';
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    Comment
  },
  data() {
    return {
      userPic: localStorage.getItem('photo_user'),
      commentContent: '',
      // comments: [
      // //   { id: 1, avatar: 'avatar1.png', name: 'Dayana', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 08:52' },
      // //   { id: 2, avatar: 'avatar2.png', name: 'Carlos', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 09:30' },
      // //   { id: 3, avatar: 'avatar2.png', name: 'Carlos', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 09:30' },
      // //   { id: 4, avatar: 'avatar2.png', name: 'Carlos', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 09:30' },
      // //   { id: 5, avatar: 'avatar2.png', name: 'Carlos', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 09:30' },
      // //   { id: 6, avatar: 'avatar2.png', name: 'Carlos', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 09:30' },
      // //   { id: 7, avatar: 'avatar2.png', name: 'Carlos', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 09:30' },
      // //   { id: 8, avatar: 'avatar2.png', name: 'Carlos', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 09:30' },
      // //   { id: 9, avatar: 'avatar2.png', name: 'Carlos', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 09:30' },
      // //   { id: 10, avatar: 'avatar2.png', name: 'Carlos', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 09:30' },
      // //   { id: 11, avatar: 'avatar2.png', name: 'Carlos', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 09:30' },
      // //   { id: 12, avatar: 'avatar2.png', name: 'Carlos', text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', date: '18 de Diciembre de 2023 09:30' },
      //   // More comments...
      // ]
    };
  },
  computed: {
    ...mapState("course", [
      "allDynamicComments",
      "isLoadingDynamicComments"

    ]),
    ...mapGetters("course", ["getDynamicComments"]),
    comments() {
      return this.getDynamicComments;
    },
  },

  methods: {
    ...mapActions("course", ["setDynamicComments", "fetchDynamicComments"]),
    async sendComment() {
      const trimmedComment = this.commentContent.trim();
      if (trimmedComment !== '' && trimmedComment.length <= 368) {
        this.setDynamicComments({
          id_user: localStorage.getItem("id_user"),
          id_course_games: this.$route.params.id,
          content: trimmedComment

        });
        this.commentContent='';

      } else {
        console.log('error al enviar commentario', trimmedComment)
        this.commentContent='';
      }


    },
    setFocus(){
      this.$refs.commentInput.focus();
    }
  },
  created() {
    this.fetchDynamicComments(this.$route.params.id)
  }

};
</script>

<style scoped>
.comments-section {
  width: 95%;
  height: 933px;
  background-color: white;
  box-shadow: inset 0 0 10px #000000;
  box-shadow: 0 0 10px #000000;

  margin: 0 auto;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  border-radius: 40px;
}

.aux-comment-container {
  overflow-y: auto;

}

.total-comments {
  font-size: 30px;
  font-weight: bold;
}

.comment-input {
  width: 90%;
  height: 130px;
  display: flex;
  align-items: center;
  padding: 20px;
  column-gap: 10px;
  margin-left: 30px;
  border: 2px solid #1EFF00;
  border-radius: 25px;
}

.comment-input img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.comment-input button img {
  width: 32.46px;
  height: 21.33px;
}

.comment-input textarea {
  flex-grow: 1;
  margin-right: 10px;
}

.comments-container {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-left: 30px;
}

.input-textarea {
  /* Styles for the textarea */
  border: none;
  resize: none;
  padding: 10px;
  margin-right: 10px;
  border-radius: 15px;
  flex-grow: 1;
}

.send-button {
  /* Styles for the send button */
  background: none;
  border: none;
  cursor: pointer;
}
</style>