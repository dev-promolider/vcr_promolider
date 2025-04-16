<template>
  <div class="container-fluid py-5 bg-light">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4">
            <!-- Selector de curso -->
            <div class="row mb-5">
              <div class="col-md-8 mx-auto">
                <div class="form-group position-relative">
                  <select class="form-select form-select-lg custom-select border-0 shadow-sm" v-model="selectedCourse"
                    @change="retrieveTop" @focus="toggleArrow(true)" @blur="toggleArrow(false)">
                    <option value="" disabled>Seleccione un curso</option>
                    <option v-for="(course, index) in courses" :key="index" :value="course.id">
                      {{ course.title }}
                    </option>
                  </select>
                  <i class="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3"
                    :class="{ 'rotate-180': isDropdownOpen }"></i>
                </div>
              </div>
            </div>

            <div class="row">
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
      this.axios.get("course/purchased-courses").then((datos) => {
        this.courses = datos.data.data;
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
.custom-select {
  background-color: #fdfeff;
  color: #636363;
  font-size: 1rem;
  padding: 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.custom-select:hover,
.custom-select:focus {
  border-color: rgba(26, 208, 3, 0.24);
  box-shadow: 0 0 15px rgba(26, 208, 3, 0.2);
  background-color: #fff;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Transiciones suaves */
.bi {
  transition: transform 0.3s ease;
}

@media (max-width: 992px) {
  .card-body {
    padding: 2rem 1rem !important;
  }
}
</style>
