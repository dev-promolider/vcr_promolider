<template>
  <div class="leaderboard-container container-fluid py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-xl-11">
        <div class="leaderboard-card p-4">
          <!-- Selector de curso estilizado -->
          <div class="row mb-4">
            <div class="col-md-6 mx-auto text-center">
              <label class="select-label mb-2 d-block">Selecciona un curso para ver la tabla de clasificación</label>
              <div class="form-group position-relative">
                <select
                  class="form-select custom-course-select"
                  v-model="selectedCourse"
                  @change="retrieveTop"
                  @focus="toggleArrow(true)"
                  @blur="toggleArrow(false)"
                >
                  <option value="" disabled>Seleccione un curso</option>
                  <option v-for="(course, index) in courses" :key="index" :value="course.id">
                    {{ course.title }}
                  </option>
                </select>
                <i
                  class="bi bi-chevron-down select-arrow-icon"
                  :class="{ 'rotate-180': isDropdownOpen }"
                ></i>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-lg-8">
              <Champions :podium="podium" :podiumPos="currentUser.pos" />
            </div>
            <div class="col-lg-4">
              <RankingCourse :users="users" :currentUser="currentUser" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RankingCourse from "../RankingCourse/RankingCourse.vue";
import Champions from "./Champions.vue";
import confetti from "canvas-confetti";

export default {
  components: {
    Champions,
    RankingCourse,
  },
  data() {
    return {
      podium: [],
      courses: [],
      selectedCourse: "",
      users: [],
      currentUser: {
        pos: "--",
        username: "--",
        latest_created_at: null,
        avg_time: null,
        total_points: "--",
      },
      isDropdownOpen: false,
    };
  },
  methods: {
    getAttributes() {
      this.axios
        .get("course/purchased-courses")
        .then((datos) => {
          this.courses = (datos && datos.data && datos.data.data) ? datos.data.data : [];
        })
        .catch(() => {
          this.courses = [];
        });
    },
    async retrieveTop() {
      if (this.selectedCourse !== "") {
        const datos = await this.axios.get(
          `course/all-dynamics-top/${this.selectedCourse}`
        );

        if (!datos.data.topTen) {
          this.currentUser = {
            pos: "--",
            username: "--",
            latest_created_at: null,
            avg_time: null,
            total_points: "--",
          };
          this.users = [];
          this.podium = [];
        } else if (!datos.data.currentUser) {
          this.currentUser = {
            pos: "--",
            username: "--",
            latest_created_at: null,
            avg_time: null,
            total_points: "--",
          };
          this.users = datos.data.topTen;
          this.podium = this.users.slice(0, 3);
        } else {
          this.users = datos.data.topTen;
          this.currentUser = datos.data.currentUser;
          this.podium = this.users.slice(0, 3);
        }

        if (this.podium.length > 0) {
          this.launchConfetti();
        }
      }
    },
    toggleArrow(isOpen) {
      this.isDropdownOpen = isOpen;
    },
    launchConfetti() {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      function frame() {
        confetti({
          particleCount: 10,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 10,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.remove();
      }

      frame();
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style scoped>
.leaderboard-container {
  min-height: 85vh;
}

.leaderboard-card {
  background: #FAF9F5 !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 24px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
}

.select-label {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.9rem !important;
  color: #71717A !important;
}

.custom-course-select {
  background-color: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  color: #18181B !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  padding: 0.75rem 1.25rem !important;
  border-radius: 16px !important;
  transition: all 0.25s ease !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
}

.custom-course-select:focus {
  border-color: #10B981 !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15) !important;
}

.select-arrow-icon {
  position: absolute;
  top: 50%;
  right: 1.25rem;
  transform: translateY(-50%);
  color: #71717A;
  pointer-events: none;
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: translateY(-50%) rotate(180deg) !important;
}
</style>
