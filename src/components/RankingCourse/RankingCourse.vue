<template>
  <div class="ranking-wrapper">
    <!-- Usuario actual card -->
    <div class="current-user-card p-4 mb-4">
      <div class="d-flex align-items-center">
        <div class="position-indicator mr-3">
          <span class="position-number">{{ currentUser.pos }}</span>
        </div>
        <div class="flex-grow-1 overflow-hidden">
          <h3 class="user-card-title text-truncate mb-2">{{ currentUser.username }}</h3>
          <div class="d-flex justify-content-between align-center">
            <div>
              <div class="stat-value">{{ formattedTime }}</div>
              <div class="stat-label">TIEMPO</div>
            </div>
            <div class="text-end">
              <div class="stat-value">{{ currentUser.total_points }}</div>
              <div class="stat-label">PUNTOS</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de usuarios en el ranking -->
    <div class="ranking-list-card p-3">
      <h5 class="ranking-header-title mb-3 px-2">Tabla de Clasificación</h5>
      <div class="ranking-scroll">
        <RowRankingCourse v-for="(item, index) in users" :key="index" :user="item" :pos="index + 1" />
      </div>
    </div>
  </div>
</template>

<script>
import RowRankingCourse from "./RowRankingCourse";

export default {
  components: { RowRankingCourse },
  props: {
    users: {
      type: Array,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      topTen: [],
    };
  },
  computed: {
    formattedDate() {
      if (this.currentUser.latest_record) {
        let date = new Date(this.currentUser.latest_record);
        let options = { year: "numeric", month: "long", day: "numeric" };
        return this.currentUser.latest_record === "--"
          ? this.currentUser.latest_record
          : date.toLocaleDateString("es-ES", options);
      } else {
        return "--";
      }
    },

    formattedTime() {
      if (this.currentUser.avg_time) {
        const timeInSeconds = this.currentUser.avg_time;
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        const minutesShown = minutes < 10 ? "0" + minutes : minutes;
        const secondsShown = seconds < 10 ? "0" + seconds : seconds;
        return minutesShown + ":" + secondsShown;
      } else {
        return "--:--";
      }
    },
  },
};
</script>

<style scoped>
.ranking-wrapper {
  height: 100%;
}

.current-user-card {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 20px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04) !important;
}

.position-indicator {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: rgba(16, 185, 129, 0.1) !important;
  border: 2px solid #10B981 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2) !important;
  flex-shrink: 0;
}

.position-number {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  color: #10B981;
}

.user-card-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.1rem !important;
  color: #18181B !important;
}

.stat-value {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #18181B;
}

.stat-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.72rem;
  color: #71717A;
  font-weight: 600;
}

.ranking-list-card {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 20px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04) !important;
}

.ranking-header-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  color: #18181B !important;
}

.ranking-scroll {
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
}

.ranking-scroll::-webkit-scrollbar {
  width: 4px;
}

.ranking-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(16, 185, 129, 0.4);
  border-radius: 4px;
}

.ranking-scroll::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.03);
}

@media (max-width: 992px) {
  .ranking-scroll {
    max-height: 380px;
  }
}
</style>
