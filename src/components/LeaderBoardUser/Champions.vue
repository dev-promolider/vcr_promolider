<template>

  <div class="top-container">
    <span class="podium-message">{{podiumMessage}}</span>
    <div class="card-container">

      <div v-for="index in 3" :key="index" :class="'player-card _' + (index)">
        <img
          :src="require(`@/assets/${index === 1 ? 'first_trophy.svg' : index === 2 ? 'second_trophy.svg' : 'third_trophy.svg'}`)"
          alt="trophy" class="trophy">
        <div class="card-aux">
          <v-avatar :size="avatarSize" class="mb-3">
            <img :src="getUserAvatar(index-1)" :alt="getUserName(index-1)">
          </v-avatar>
          <div class="score-time">
            <span class="score">{{ getUserPoints(index-1) }} pts.</span>
            <span class="time">{{ formattedTime(index-1) }} s</span>
          </div>

        </div>
        <span class="player-name">{{ getUserName(index-1) }}</span>

      </div>
    </div>

  </div>

</template>

<script>
export default {
  props:{
    podium:{
      type:Array,
      required:true
    },
    podiumPos:{
      type: [Number,String],
      required:true
    }
  },
  data() {
    return {
      avatarSize: 120,
      amazonBaseURL: "https://promolider-storage-user.s3-accelerate.amazonaws.com/"
    };
  },
  methods: {
     
     formattedTime(index) {
      if(this.podium[index]){
        const timeInSeconds = this.podium[index].avg_time;
       const minutes = Math.floor((timeInSeconds % 3600) / 60);
       const seconds = timeInSeconds % 60;
 
       const minutesShown = minutes < 10 ? '0' + minutes : minutes;
       const secondsShown = seconds < 10 ? '0' + seconds : seconds;
       return minutesShown + ':' + secondsShown;
      }else{
        return '--:--'
      }
       
     },
     getUserAvatar(index){
      return this.podium[index]?this.amazonBaseURL + this.podium[index].photo:require('@/assets/question-mark-avatar.svg')
     },
     getUserName(index){
      return this.podium[index]?this.podium[index].username:'???'
     },
     getUserPoints(index){
      return this.podium[index]?this.podium[index].total_points:'--'
     },
   },
   computed:{
    podiumMessage(){
      
      if(this.podiumPos<=3){
        return "¡Felicidades! ¡Estás en el podio!";
      }else{
        return "Casi... ¡La próxima vez lo harás mejor!";
      }
    }
   }
}
</script>

<style scoped>

.top-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  min-width: 100%;
  height: 798px;
  background-color: #35424A;
  row-gap: 1rem;
  border: 3px solid #1AE800;
  border-radius: 10px;
}

.card-container {
  display: flex;
  
  min-width: 100%;
  align-items: flex-end;
  justify-content: center;
  column-gap: 1.5%;
}

.podium-message {
  color: white;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
}

.card-aux {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #64CB58;
  /* Light green background */
  border-radius: 19px;
  padding: 1rem;
}

.player-card {
  display: flex;
  width: 28%;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;

}

._2 .trophy,
._3 .trophy {
  width: 84px;
  height: 138px;
}

._1 .trophy {
  width: 233.9px;
  height: 165px;
}

._1 {
  order: 2;
}

._2 {
  order: 1;
}

._3 {
  order: 3;
}

._1 .card-aux {

  height: 401px;
  background-color: #1AE800;
}

._2 .card-aux {

  background: none;
  height: 337px;
  border: 3px solid #1AE800;
}

._3 .card-aux {

  height: 284px;
  background: none;
  border: 3px solid #1AE800;
}

.v-avatar {
  border: 5px solid #1AE800;
  /* Green border for avatar */
}

.v-avatar {

  font-size: 1.5rem;
  /* Larger font size for score */
  height: auto;
  /* Let the height grow as needed */
  padding: 0.5rem 1rem;
  /* Add more padding around the score */
}

.player-name {
  color: white;
  font-weight: bold;
  font-size: 30px;

  /* Spacing between the chip and name */
}

.score-time {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score,
.time {
  color: white;
  font-size: 40px;
  font-weight: bold;
}

._1 .score,
._1 .time {
  color: black;
}

@media (max-width: 1440px) {
  .top-container{
    overflow-x: auto;
  }
  .card-container{
    min-width: 730px;
  }
}


</style>
