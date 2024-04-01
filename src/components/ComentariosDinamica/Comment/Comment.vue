<template>
    <div class="comment">
      <img :src="commentData.photo" alt="User avatar" class="comment-avatar" />
      <div class="comment-content">
        <p class="comment-name"><strong>{{ commentData.username }}</strong></p>
        <p class="comment-text">{{ commentData.content }}</p>
        <p class="comment-date">{{ formattedDate }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props:{
        commentData:{
            type:Object,
            required:true
        }
    },
    data() {
      return {
       
      };
    },
    computed:{
      formattedDate(){
            let date=new Date(this.commentData.created_at);
            let options={year:'numeric',month:'long',day:'numeric',hour: '2-digit', minute: '2-digit'};
            return date.toLocaleDateString('es-ES',options);
        },
    }
  };
  </script>
  
  <style scoped>
  
  
  .comment {
    display: flex;
    width: 720px;
  }
  
  /* .comment img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  } */
  
  .comment-content p {
    word-wrap: break-word;
    margin: 0;
  }
  .comment {
  display: flex;
  width: 100%; /* Take full width of the parent */
  align-items: center; /* Align items vertically */
}

.comment-avatar {
  width: 100px; /* Adjust to match design */
  height: 100px; /* Adjust to match design */
  border-radius: 50%;
  border: 5px solid #1AE800;
  object-fit: cover;
  margin-right: 20px;
}

.comment-content {
  
  border-radius: 10px;
  padding: 15px;
  width: 70%; /* Ensure it fills the space */
}

.comment-name {
  margin: 0;
  color: #333;
  font-size: 25px;
  font-weight: 500;
}

.comment-text {
  margin-top: 4px; /* Space between name and text */
  color: #333;
}

.comment-date {
  margin-top: 8px; /* Space between text and date */
  font-size: 0.85rem;
  color: #999;
}
  </style>
  