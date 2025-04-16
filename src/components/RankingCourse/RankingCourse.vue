<template>
  <div class="ranking-wrapper">
    <!-- Usuario actual -->
    <div class="current-user-card card shadow-sm border-0 mb-4">
      <div class="card-body p-4">
        <div class="d-flex align-items-center">
          <div class="position-indicator">
            <span class="h4 mb-0">{{ currentUser.pos }}</span>
          </div>
          <div class="ms-4 flex-grow-1">
            <h3 class="h5 mb-3">{{ currentUser.username }}</h3>
            <div class="d-flex justify-content-between text-muted small">
              <div>
                <div class="fw-bold">{{ formattedTime }}</div>
                <div>TIEMPO</div>
              </div>
              <div class="text-end">
                <div class="fw-bold">{{ currentUser.total_points }}</div>
                <div>PUNTOS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de usuarios -->
    <div class="ranking-list card shadow-sm border-0">
      <div class="card-body p-0">
        <div class="ranking-scroll">
          <RowRankingCourse v-for="(item, index) in users" :key="index" :user="item" :pos="index + 1" />
        </div>
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

.position-indicator {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #20e404;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(32, 228, 4, 0.2);
}

.ranking-list {
  height: calc(100% - 160px);
}

.ranking-scroll {
  height: 100%;
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
}

.ranking-scroll::-webkit-scrollbar {
  width: 4px;
}

.ranking-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(32, 228, 4, 0.3);
  border-radius: 4px;
}

.ranking-scroll::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.05);
}

@media (max-width: 992px) {
  .ranking-list {
    height: 400px;
  }
}
</style>
