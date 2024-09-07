<template>
    <div class="user-row">
  
      <span class="user-pos">{{ pos }}</span>
  
      <img :src="amazonBaseURL + user.photo" alt="User's profile picture">
  
      <div class="text-content">
        <span class="username">{{ user.username }}</span> 
        <span class="time mt-1">Tiempo: {{ formattedTime }}</span>
         <span class="points">Puntos: {{ user.total_points }}</span>
      </div>
  
  
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        amazonBaseURL: "https://promolider-storage-user.s3-accelerate.amazonaws.com/"
      }
    },
    props: {
      user: {
        type: Object,
        required: true
      },
      pos: {
        type: Number,
        required: true
      }
    },
    computed: {
     
      formattedTime() {
        const timeInSeconds = this.user.avg_time;
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
  
        const minutesShown = minutes < 10 ? '0' + minutes : minutes;
        const secondsShown = seconds < 10 ? '0' + seconds : seconds;
        return minutesShown + ':' + secondsShown;
      }
    }
  }
  </script>
  
  <style scoped>
  .user-row {
    display: flex;
    column-gap: 20px;
    width: 90%;
    height: 62px;
    align-items: center;
    justify-content: flex-start;
    border: none;
    color: #434343;
  }
  
  .user-row>* {
    flex-shrink: 0;
  }
  
  .user-row>div {
    display: flex;
    flex-direction: column;
    line-height:1rem;
  }
  
  .user-row img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    /*border: 2px solid #1AE800;*/
    object-fit: cover;
  }
  
  
  .user-pos{
    width: 42px;
    height: 42px;
    color: #20E404;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #20E404;
    border-radius: 50%; 
    margin-left: 40px;
  }

  .username{
    font-weight:600;
    font-size: 15px;
  }

  .time,.points{
    font-size: 10px;
  }
  </style>