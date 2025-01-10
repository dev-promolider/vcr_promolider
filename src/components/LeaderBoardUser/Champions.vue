<template>
  <div class="container-fluid podium-wrapper py-4">
    <div class="row">
      <div class="col-12">
        <h2 class="podium-message text-center mb-4">{{ podiumMessage }}</h2>
      </div>
    </div>

    <div class="row justify-content-center align-items-end podium-cards">
      <!-- Second Place -->
      <div class="col-md-4 col-sm-6 mb-3 order-md-1">
        <div class="player-card silver">
          <img :src="require('@/assets/copa_plata.png')" alt="trophy" class="trophy img-fluid mb-3" />
          <div class="card-aux p-3">
            <div class="avatar-wrapper mb-3">
              <img :src="getUserAvatar(1)" :alt="getUserName(1)" class="rounded-circle avatar" />
            </div>
            <h3 class="player-name">{{ getUserName(1) }}</h3>
            <img :src="require('@/assets/medalla2.png')" alt="med" class="medal mb-3" />
            <div class="score-time">
              <span class="score">{{ getUserPoints(1) }} pts.</span>
              <span class="time">{{ formattedTime(1) }} s</span>
            </div>
          </div>
        </div>
      </div>

      <!-- First Place -->
      <div class="col-md-4 col-sm-6 mb-3 order-md-2">
        <div class="player-card gold">
          <img :src="require('@/assets/copa_oro.png')" alt="trophy" class="trophy img-fluid trophy-gold mb-3" />
          <div class="card-aux p-3">
            <div class="avatar-wrapper mb-3">
              <img :src="getUserAvatar(0)" :alt="getUserName(0)" class="rounded-circle avatar" />
            </div>
            <h3 class="player-name">{{ getUserName(0) }}</h3>
            <img :src="require('@/assets/medalla1.png')" alt="med" class="medal mb-3" />
            <div class="score-time">
              <span class="score">{{ getUserPoints(0) }} pts.</span>
              <span class="time">{{ formattedTime(0) }} s</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Third Place -->
      <div class="col-md-4 col-sm-6 mb-3 order-md-3">
        <div class="player-card bronze">
          <img :src="require('@/assets/copa_bronce.png')" alt="trophy" class="trophy img-fluid mb-3" />
          <div class="card-aux p-3">
            <div class="avatar-wrapper mb-3">
              <img :src="getUserAvatar(2)" :alt="getUserName(2)" class="rounded-circle avatar" />
            </div>
            <h3 class="player-name">{{ getUserName(2) }}</h3>
            <img :src="require('@/assets/medalla3.png')" alt="med" class="medal mb-3" />
            <div class="score-time">
              <span class="score">{{ getUserPoints(2) }} pts.</span>
              <span class="time">{{ formattedTime(2) }} s</span>
            </div>
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
      required: true,
    },
    podiumPos: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      avatarSize: 60,
      amazonBaseURL:
        "https://promolider-storage-user.s3-accelerate.amazonaws.com/",
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
        const minutesShown = minutes < 10 ? "0" + minutes : minutes;
        const secondsShown = seconds < 10 ? "0" + seconds : seconds;
        return minutesShown + ":" + secondsShown;
      }
      return "--:--";
    },
    getUserAvatar(index) {
      return this.podium[index]
        ? this.amazonBaseURL + this.podium[index].photo
        : require("@/assets/no-image.jpg");
    },
    getUserName(index) {
      return this.podium[index] ? this.podium[index].username : "???";
    },
    getUserPoints(index) {
      return this.podium[index] ? this.podium[index].total_points : "--";
    },
    startVibration() {
      const trophies = document.querySelectorAll(".trophy");
      trophies.forEach((trophy, index) => {
        setTimeout(() => {
          trophy.classList.add("vibrate");
        }, index * 500);
      });

      setTimeout(() => {
        trophies.forEach((trophy) => {
          trophy.classList.remove("vibrate");
        });
      }, 3000);
    },
  },
  computed: {
    podiumMessage() {
      return this.podiumPos <= 3
        ? "¡Felicidades! ¡Estás en el podio!"
        : "Casi... ¡La próxima vez lo harás mejor!";
    },
  },
};
</script>

<style>
/* Animaciones */
@keyframes vibrate {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-2px);
  }

  50% {
    transform: translateX(2px);
  }

  75% {
    transform: translateX(-2px);
  }

  100% {
    transform: translateX(0);
  }
}

.vibrate {
  animation: vibrate 0.3s ease-in-out infinite;
}

/* Estilos generales */
.podium-wrapper {
  min-height: 798px;
  background-color: transparent;
}

.podium-message {
  color: #434343;
  font-size: 1.875rem;
  font-weight: lighter;
}

/* Cards y contenido */
.player-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-aux {
  width: 100%;
  background-color: #64cb58;
  border-radius: 19px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Imágenes y avatares */
.trophy {
  width: 120px;
  max-width: 100%;
  height: auto;
}

.trophy-gold {
  width: 150px;
}

.medal {
  width: 65px;
  max-width: 100%;
  height: auto;
}

.avatar {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: 3px solid #1ae800;
}

/* Texto y puntuaciones */
.player-name {
  color: #434343;
  font-size: 1.5625rem;
  font-weight: 600;
  margin: 0.5rem 0;
}

.score-time {
  text-align: center;
  font-size: 1.25rem;
}

.score,
.time {
  color: #434343;
  font-weight: 450;
  display: block;
}

/* Variantes de cards */
.gold .card-aux {
  height: 401px;
  background-color: #42fe29;
  box-shadow: 0 0 15px rgba(32, 228, 4, 0.5);
}

.silver .card-aux {
  height: 337px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(32, 228, 4, 0.5);
}

.bronze .card-aux {
  height: 284px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(32, 228, 4, 0.5);
}

/* Media queries para responsividad */
@media (max-width: 991px) {
  .trophy {
    width: 100px;
  }

  .trophy-gold {
    width: 130px;
  }

  .medal {
    width: 55px;
  }

  .player-name {
    font-size: 1.25rem;
  }

  .score-time {
    font-size: 1rem;
  }
}

@media (max-width: 767px) {
  .podium-cards {
    flex-direction: column;
    align-items: center;
  }

  .player-card {
    width: 80%;
    margin-bottom: 2rem;
  }

  .gold .card-aux,
  .silver .card-aux,
  .bronze .card-aux {
    height: auto;
    min-height: 250px;
  }
}

@media (max-width: 480px) {
  .player-card {
    width: 95%;
  }

  .podium-message {
    font-size: 1.5rem;
  }

  .trophy {
    width: 80px;
  }

  .trophy-gold {
    width: 100px;
  }

  .medal {
    width: 45px;
  }
}
</style>
