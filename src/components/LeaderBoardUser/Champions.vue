<template>
  <div class="top-container">
    <span class="podium-message">{{ podiumMessage }}</span>
    <div class="card-container">
      <div v-for="index in 3" :key="index" :class="'player-card _' + (index)">

        <img
          :src="require(`@/assets/${index === 1 ? 'copa_oro.png' : index === 2 ? 'copa_plata.png' : 'copa_bronce.png'}`)"
          alt="trophy" class="trophy">
        <div class="card-aux">
          <v-avatar :size="avatarSize" class="mb-3 mt-5">
            <img :src="getUserAvatar(index - 1)" :alt="getUserName(index - 1)">
          </v-avatar>
          <span class="player-name">{{ getUserName(index - 1) }}</span>
          <img
          :src="require(`@/assets/${index === 1 ? 'medalla1.png' : index === 2 ? 'medalla2.png' : 'medalla3.png'}`)"
          alt="med" class="med">
          <div class="score-time">
            <span class="score">{{ getUserPoints(index - 1) }} pts.</span>
            <span class="time">{{ formattedTime(index - 1) }} s</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    podium: {
      type: Array,
      required: true
    },
    podiumPos: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      avatarSize: 60,
      amazonBaseURL: "https://promolider-storage-user.s3-accelerate.amazonaws.com/"
    };
  },
  mounted() {
    this.startVibration();
  },
  methods: {
    formattedTime(index) {
      if (this.podium[index]) {
        const timeInSeconds = this.podium[index].avg_time;
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        const minutesShown = minutes < 10 ? '0' + minutes : minutes;
        const secondsShown = seconds < 10 ? '0' + seconds : seconds;
        return minutesShown + ':' + secondsShown;
      } else {
        return '--:--'
      }
    },
    getUserAvatar(index) {
      return this.podium[index] ? this.amazonBaseURL + this.podium[index].photo : require('@/assets/no-image.jpg')
    },
    getUserName(index) {
      return this.podium[index] ? this.podium[index].username : '???'
    },
    getUserPoints(index) {
      return this.podium[index] ? this.podium[index].total_points : '--'
    },
    startVibration() {
      // Añadir la clase vibrate para iniciar la animación
      const trophies = document.querySelectorAll('.trophy');
      trophies.forEach((trophy, index) => {
        setTimeout(() => {
          trophy.classList.add('vibrate');
        }, index * 500); // Añadir un pequeño retraso entre las copas
      });

      // Quitar la clase vibrate después de 3 segundos
      setTimeout(() => {
        trophies.forEach(trophy => {
          trophy.classList.remove('vibrate');
        });
      }, 3000); // Detener la animación después de 3 segundos
    }
  },
  computed: {
    podiumMessage() {
      if (this.podiumPos <= 3) {
        return "¡Felicidades! ¡Estás en el podio!";
      } else {
        return "Casi... ¡La próxima vez lo harás mejor!";
      }
    }
  }
}
</script>

<style scoped>
@keyframes vibrate {
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}

.vibrate {
  animation: vibrate 0.3s ease-in-out infinite;
}
.med {
  width: 65px;
}

.trophy {
  width: 120px; 
}

._1 .trophy {
  width: 150px;
}

.top-container {
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  min-width: 100%;
  height: 798px;
  /*background-color: #35424A;*/
  row-gap: 1rem;
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
  color: #434343;
  text-align: center;
  font-size: 30px;
  font-weight: lighter;
}

.card-aux {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  /*justify-content: space-around;*/
  background-color: #64CB58;
  /* Light green background */
  border-radius: 19px;
  /*padding: 1rem;*/
}

.player-card {
  display: flex;
  width: 28%;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;

}


._1 .trophy {
  width: 150px;
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
/*
._1 .card-aux {
  height: 401px;
  background-color: #ece140;
  box-shadow: 0 0 15px rgba(205, 169, 72, 0.5);
}

._2 .card-aux {
  background: none;
  height: 337px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(143, 143, 143);
}

._3 .card-aux {
  height: 284px;
  background: none;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(192, 117, 62);
}*/
._1 .card-aux {
  height: 401px;
  background-color: #42fe29;
  box-shadow: 0 0 15px rgba(32, 228, 4, 0.5);
}

._2 .card-aux {
  background: none;
  height: 337px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(32, 228, 4, 0.5);
}

._3 .card-aux {
  height: 284px;
  background: none;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(32, 228, 4, 0.5);
}

.v-avatar {
  /*border: 3px solid #1AE800;*/
}

.player-name {
  color: #434343;
  font-weight: 450;
  font-size: 25px;
  font-weight: 600;
}

.score-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  font-weight: normal;
}

.score,
.time {
  color: #434343;
  /*font-size: 30px;*/
  font-weight: 450;
}

._1 .score,
._1 .time {
  color: #434343;
}

@media (max-width: 1440px) {
  .top-container {
    overflow-x: auto;
  }

  .card-container {
    min-width: 730px;
  }
}
</style>
