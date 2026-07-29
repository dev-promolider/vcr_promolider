<template>
  <div class="champions-wrapper">
    <h2 class="podium-main-title text-center mb-5">{{ podiumMessage }}</h2>

    <div class="row justify-content-center align-items-end g-4">
      <!-- Segundo lugar -->
      <div class="col-md-4 order-md-1">
        <div class="player-card silver-card h-100 p-4">
          <div class="podium-badge-tag silver-tag mb-2">2º Lugar</div>
          <div class="trophy-wrapper mb-3">
            <img :src="require('@/assets/copa_plata.png')" alt="Trofeo plata" class="trophy img-fluid" />
          </div>
          <div class="text-center">
            <div class="avatar-wrapper mb-3 mx-auto">
              <img :src="getUserAvatar(1)" :alt="getUserName(1)" class="rounded-circle avatar-silver" @error="onAvatarError" />
            </div>
            <h3 class="player-name">{{ getUserName(1) }}</h3>
            <div class="medal-wrapper my-2">
              <img :src="require('@/assets/medalla2.png')" alt="Medalla plata" class="medal" />
            </div>
            <div class="stats mt-3">
              <div class="score-badge">{{ getUserPoints(1) }} pts.</div>
              <div class="time-text text-muted mt-1">{{ formattedTime(1) }} s</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Primer lugar (Oro) -->
      <div class="col-md-4 order-md-0">
        <div class="player-card gold-card h-100 p-4">
          <div class="podium-badge-tag gold-tag mb-2">1º Lugar</div>
          <div class="trophy-wrapper mb-3">
            <img :src="require('@/assets/copa_oro.png')" alt="Trofeo oro" class="trophy trophy-gold img-fluid" />
          </div>
          <div class="text-center">
            <div class="avatar-wrapper mb-3 mx-auto">
              <img :src="getUserAvatar(0)" :alt="getUserName(0)" class="rounded-circle avatar-gold" @error="onAvatarError" />
            </div>
            <h3 class="player-name gold-player-name">{{ getUserName(0) }}</h3>
            <div class="medal-wrapper my-2">
              <img :src="require('@/assets/medalla1.png')" alt="Medalla oro" class="medal" />
            </div>
            <div class="stats mt-3">
              <div class="score-badge gold-score-badge">{{ getUserPoints(0) }} pts.</div>
              <div class="time-text text-muted mt-1">{{ formattedTime(0) }} s</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tercer lugar -->
      <div class="col-md-4 order-md-2">
        <div class="player-card bronze-card h-100 p-4">
          <div class="podium-badge-tag bronze-tag mb-2">3º Lugar</div>
          <div class="trophy-wrapper mb-3">
            <img :src="require('@/assets/copa_bronce.png')" alt="Trofeo bronce" class="trophy img-fluid" />
          </div>
          <div class="text-center">
            <div class="avatar-wrapper mb-3 mx-auto">
              <img :src="getUserAvatar(2)" :alt="getUserName(2)" class="rounded-circle avatar-bronze" @error="onAvatarError" />
            </div>
            <h3 class="player-name">{{ getUserName(2) }}</h3>
            <div class="medal-wrapper my-2">
              <img :src="require('@/assets/medalla3.png')" alt="Medalla bronce" class="medal" />
            </div>
            <div class="stats mt-3">
              <div class="score-badge">{{ getUserPoints(2) }} pts.</div>
              <div class="time-text text-muted mt-1">{{ formattedTime(2) }} s</div>
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
      defaultAvatar: "https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240",
      amazonBaseURL:
        "https://promolider-storage-user.s3-accelerate.amazonaws.com/",
    };
  },
  mounted() {
    this.startVibration();
  },
  methods: {
    onAvatarError(e) {
      if (e && e.target) {
        e.target.src = this.defaultAvatar;
      }
    },
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
      if (this.podium && this.podium[index] && this.podium[index].photo) {
        return this.amazonBaseURL + this.podium[index].photo;
      }
      return this.defaultAvatar;
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
  padding: 1rem 0;
}

.podium-main-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  color: #18181B !important;
  font-size: 1.35rem !important;
}

.trophy-wrapper,
.avatar-wrapper,
.medal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.trophy {
  width: 90px;
  height: auto;
  transition: transform 0.3s ease;
}

.trophy-gold {
  width: 110px;
}

.trophy:hover {
  transform: translateY(-5px);
}

.avatar-wrapper img {
  width: 76px;
  height: 76px;
  object-fit: cover;
}

.avatar-gold {
  border: 3.5px solid #F59E0B !important;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
}

.avatar-silver {
  border: 3px solid #94A3B8 !important;
  box-shadow: 0 4px 12px rgba(148, 163, 184, 0.25);
}

.avatar-bronze {
  border: 3px solid #D97706 !important;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25);
}

.medal {
  width: 44px;
  height: auto;
}

/* Tarjetas del Podio */
.player-card {
  background: #FFFFFF !important;
  border-radius: 20px !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.player-card:hover {
  transform: translateY(-8px);
}

.gold-card {
  border: 2px solid #F59E0B !important;
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.06) 0%, #FFFFFF 100%) !important;
  box-shadow: 0 8px 30px rgba(245, 158, 11, 0.18) !important;
}

.silver-card {
  border: 1px solid #CBD5E1 !important;
  background: linear-gradient(180deg, rgba(241, 245, 249, 0.6) 0%, #FFFFFF 100%) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
}

.bronze-card {
  border: 1px solid #FDE68A !important;
  background: linear-gradient(180deg, rgba(217, 119, 6, 0.05) 0%, #FFFFFF 100%) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
}

.podium-badge-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.gold-tag {
  background: #FEF3C7;
  color: #B45309;
}

.silver-tag {
  background: #F1F5F9;
  color: #475569;
}

.bronze-tag {
  background: #FFEDD5;
  color: #C2410C;
}

.player-name {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.05rem !important;
  color: #18181B !important;
  margin: 0;
}

.gold-player-name {
  font-size: 1.2rem !important;
  color: #B45309 !important;
}

.score-badge {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  color: #18181B;
}

.gold-score-badge {
  color: #D97706;
  font-size: 1.25rem;
}

.time-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .trophy {
    width: 70px;
  }

  .trophy-gold {
    width: 90px;
  }

  .avatar-wrapper img {
    width: 56px;
    height: 56px;
  }

  .medal {
    width: 36px;
  }
}
</style>
