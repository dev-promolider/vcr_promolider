<template>
  <div class="user-row" >

    <span style="font-size: 32.5px; font-weight: 500; width: 25px; ">{{ pos }}</span>

    <img :src="amazonBaseURL + user.photo" alt="User's profile picture">

    <div>
      <span>{{ user.username }}</span>
      <span>{{ formattedDate }}</span>
    </div>

    <div>
      <span>{{ formattedTime }}</span>
      <span>Tiempo</span>
    </div>

    <div >
      <span>{{ user.increment_points }}</span>
      <span>Puntos</span>
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
    formattedDate() {
      let date = new Date(this.user.latest_created_at);
      let options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
    },
    formattedTime() {
      const timeInSeconds = this.user.completion_time;
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
  column-gap: 5%;
  width: 95%;
  height: 62px;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: center;
  /*border: 1px solid #1AE800;
  border-radius: 50px;*/
  padding-left: 10px;
}

/* Personalizar el scroll */
.user-row::-webkit-scrollbar {
  width: 8px; 
  height: 8px; 
}

.user-row::-webkit-scrollbar-thumb:hover {
  background: #12b600;
}


.user-row>* {
  flex-shrink: 0;
}

.user-row>div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-row img {
  width: 45px;
  height: 45px;

  border-radius: 50%;
  /*border: 2px solid #1AE800;*/
  object-fit: cover;
}

.user-row div>:first-child {
  font-weight: 500;
  font-size: 15px;
}

.user-row>div:first-of-type {
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

span {
  max-width: 150px;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-row div>:last-child {
  font-weight: lighter;
  font-size: 12px;
}
</style>