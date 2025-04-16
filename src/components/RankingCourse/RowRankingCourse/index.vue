<template>
  <div class="user-row p-3 border-bottom">
    <div class="d-flex align-items-center">
      <div class="position-badge me-3">
        {{ pos }}
      </div>

      <div class="user-avatar me-3">
        <img :src="amazonBaseURL + user.photo" :alt="user.username" class="rounded-circle" />
      </div>

      <div class="user-info flex-grow-1">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h4 class="username mb-1">{{ user.username }}</h4>
            <div class="user-stats text-muted small">
              <span class="me-3">Tiempo: {{ formattedTime }}</span>
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
    formattedTime() {
      const timeInSeconds = this.user.avg_time;
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;

      const minutesShown = minutes < 10 ? "0" + minutes : minutes;
      const secondsShown = seconds < 10 ? "0" + seconds : seconds;
      return minutesShown + ":" + secondsShown;
    },
  },
};
</script>

<style scoped>
.user-row {
  transition: background-color 0.2s ease;
}

.user-row:hover {
  background-color: rgba(32, 228, 4, 0.05);
}

.position-badge {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #20e404;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #20e404;
  font-size: 0.9rem;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border: 2px solid #e9ecef;
}

.username {
  font-size: 0.95rem;
  font-weight: 600;
  color: #434343;
  margin: 0;
}

.user-stats {
  font-size: 0.8rem;
}

@media (max-width: 576px) {
  .position-badge {
    width: 30px;
    height: 30px;
    font-size: 0.8rem;
  }

  .user-avatar img {
    width: 35px;
    height: 35px;
  }

  .username {
    font-size: 0.85rem;
  }

  .user-stats {
    font-size: 0.75rem;
  }
}
</style>
