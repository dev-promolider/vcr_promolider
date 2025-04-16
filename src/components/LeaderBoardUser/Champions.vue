<template>
  <div class="champions-wrapper">
    <h2 class="text-center h3 mb-5">{{ podiumMessage }}</h2>

    <div class="row justify-content-center align-items-end g-4">
      <!-- Segundo lugar -->
      <div class="col-md-4 order-md-1">
        <div class="player-card silver h-100">
          <div class="trophy-wrapper mb-3">
            <img :src="require('@/assets/copa_plata.png')" alt="Trofeo plata" class="trophy img-fluid" />
          </div>
          <div class="card shadow-sm border-0 p-4">
            <div class="text-center">
              <div class="avatar-wrapper mb-3 mx-auto">
                <img :src="getUserAvatar(1)" :alt="getUserName(1)" class="rounded-circle border-success" />
              </div>
              <h3 class="player-name h5">{{ getUserName(1) }}</h3>
              <div class="medal-wrapper my-3">
                <img :src="require('@/assets/medalla2.png')" alt="Medalla plata" class="medal" />
              </div>
              <div class="stats">
                <div class="score fw-bold">{{ getUserPoints(1) }} pts.</div>
                <div class="time text-muted">{{ formattedTime(1) }} s</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Primer lugar -->
      <div class="col-md-4 order-md-0">
        <div class="player-card gold h-100">
          <div class="trophy-wrapper mb-3">
            <img :src="require('@/assets/copa_oro.png')" alt="Trofeo oro" class="trophy trophy-gold img-fluid" />
          </div>
          <div class="card shadow border-0 p-4 bg-success bg-opacity-10">
            <div class="text-center">
              <div class="avatar-wrapper mb-3 mx-auto">
                <img :src="getUserAvatar(0)" :alt="getUserName(0)" class="rounded-circle border-success" />
              </div>
              <h3 class="player-name h4">{{ getUserName(0) }}</h3>
              <div class="medal-wrapper my-3">
                <img :src="require('@/assets/medalla1.png')" alt="Medalla oro" class="medal" />
              </div>
              <div class="stats">
                <div class="score fw-bold">{{ getUserPoints(0) }} pts.</div>
                <div class="time text-muted">{{ formattedTime(0) }} s</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tercer lugar -->
      <div class="col-md-4 order-md-2">
        <div class="player-card bronze h-100">
          <div class="trophy-wrapper mb-3">
            <img :src="require('@/assets/copa_bronce.png')" alt="Trofeo bronce" class="trophy img-fluid" />
          </div>
          <div class="card shadow-sm border-0 p-4">
            <div class="text-center">
              <div class="avatar-wrapper mb-3 mx-auto">
                <img :src="getUserAvatar(2)" :alt="getUserName(2)" class="rounded-circle border-success" />
              </div>
              <h3 class="player-name h5">{{ getUserName(2) }}</h3>
              <div class="medal-wrapper my-3">
                <img :src="require('@/assets/medalla3.png')" alt="Medalla bronce" class="medal" />
              </div>
              <div class="stats">
                <div class="score fw-bold">{{ getUserPoints(2) }} pts.</div>
                <div class="time text-muted">{{ formattedTime(2) }} s</div>
              </div>
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

<style scoped>
.champions-wrapper {
  padding: 2rem 0;
}

.trophy-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.medal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.trophy {
  width: 100px;
  height: auto;
  transition: transform 0.3s ease;
}

.trophy-gold {
  width: 120px;
}

.trophy:hover {
  transform: translateY(-5px);
}

.avatar-wrapper img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 3px solid #1ae800;
}

.medal {
  width: 50px;
  height: auto;
}

.stats {
  font-size: 1.1rem;
}

.player-card {
  transition: transform 0.3s ease;
}

.player-card:hover {
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .trophy {
    width: 80px;
  }

  .trophy-gold {
    width: 100px;
  }

  .avatar-wrapper img {
    width: 60px;
    height: 60px;
  }

  .medal {
    width: 40px;
  }
}
</style>
