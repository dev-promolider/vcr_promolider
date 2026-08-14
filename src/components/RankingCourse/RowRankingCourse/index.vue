<template>
  <div class="user-row p-3 border-bottom-subtle">
    <div class="d-flex align-items-center">
      <div class="position-badge mr-3 flex-shrink-0">
        {{ pos }}
      </div>

      <div class="user-avatar mr-3 flex-shrink-0">
        <img :src="userAvatar" :alt="user.username" class="rounded-circle" @error="onAvatarError" />
      </div>

      <div class="user-info flex-grow-1 overflow-hidden">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h4 class="username mb-1 text-truncate">{{ user.username }}</h4>
            <div class="user-stats text-muted small">
              <span class="mr-3">Tiempo: {{ formattedTime }}</span>
              <span>Puntos: {{ user.total_points }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultAvatar: "https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240",
      amazonBaseURL:
        "https://promolider-storage-user.s3-accelerate.amazonaws.com/",
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    pos: {
      type: Number,
      required: true,
    },
  },
  computed: {
    userAvatar() {
      if (this.user && this.user.photo) {
        return this.amazonBaseURL + this.user.photo;
      }
      return this.defaultAvatar;
    },
    formattedTime() {
      const timeInSeconds = this.user.avg_time;
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;

      const minutesShown = minutes < 10 ? "0" + minutes : minutes;
      const secondsShown = seconds < 10 ? "0" + seconds : seconds;
      return minutesShown + ":" + secondsShown;
    },
  },
  methods: {
    onAvatarError(e) {
      if (e && e.target) {
        e.target.src = this.defaultAvatar;
      }
    },
  },
};
</script>

<style scoped>
.border-bottom-subtle {
  border-bottom: 1px solid #E5E3DC !important;
}

.user-row {
  transition: background-color 0.2s ease;
  border-radius: 12px;
}

.user-row:hover {
  background-color: rgba(16, 185, 129, 0.06);
}

.position-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid var(--primary-color);
  background: rgba(16, 185, 129, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  color: var(--primary-color);
  font-size: 0.85rem;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border: 1.5px solid #E5E3DC;
}

.username {
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #18181B;
  margin: 0;
}

.user-stats {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8rem;
  color: #71717A;
}

@media (max-width: 576px) {
  .position-badge {
    width: 28px;
    height: 28px;
    font-size: 0.78rem;
  }

  .user-avatar img {
    width: 34px;
    height: 34px;
  }

  .username {
    font-size: 0.85rem;
  }

  .user-stats {
    font-size: 0.75rem;
  }
}
</style>
