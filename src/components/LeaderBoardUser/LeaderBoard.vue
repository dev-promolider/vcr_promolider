<template>
  <div class="leaderboard">
    <div class="aux-podium">
      <div class="select-container">
        <select name="cursos" id="course-selection" v-model="selectedCourse" @change="retrieveTop" @focus="toggleArrow(true)" @blur="toggleArrow(false)">
          <option value="" disabled>Seleccione un curso</option>
          <option :value="course.id" v-for="(course, index) in courses" :key="index">{{ course.title }}</option>
        </select>
        <span class="custom-arrow" :class="{ up: isDropdownOpen }"></span>
      </div>

      <Champions :podium="podium" :podiumPos="currentUser.pos" />
    </div>
    <RankingCourse :users="users" :currentUser="currentUser"></RankingCourse>
  </div>
</template>

<script>
import RankingCourse from '../RankingCourse/RankingCourse.vue';
import Champions from './Champions.vue';
import confetti from 'canvas-confetti';

export default {
  components: {
    Champions,
    RankingCourse
  },
  data() {
    return {
      podium: [],
      courses: [],
      selectedCourse: '',
      users: [],
      currentUser: {
        pos: '--',
        username: '--',
        latest_created_at: null,
        avg_time: null,
        total_points: '--'
      },
      isDropdownOpen: false,
    }
  },
  methods: {
    getAttributes() {
      this.axios.get("course/purchased-courses").then((datos) => {
        this.courses = datos.data.data;
      });
    },
    async retrieveTop() {
      if (this.selectedCourse !== '') {
        const datos = await this.axios.get(`course/all-dynamics-top/${this.selectedCourse}`)

        if (!datos.data.topTen) {
          this.currentUser = {
            pos: '--',
            username: '--',
            latest_created_at: null,
            avg_time: null,
            total_points: '--'
          };
          this.users = [];
          this.podium = [];
        } else if (!datos.data.currentUser) {
          this.currentUser = {
            pos: '--',
            username: '--',
            latest_created_at: null,
            avg_time: null,
            total_points: '--'
          };
          this.users = datos.data.topTen
          this.podium = this.users.slice(0, 3);
        } else {
          this.users = datos.data.topTen
          this.currentUser = datos.data.currentUser
          this.podium = this.users.slice(0, 3);
        }

        // Lanzar confetti si hay al menos un elemento en el podio
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
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.remove();
      }

      frame();
    }
  },
  created() {
    this.getAttributes();
  }
};
</script>


<style scoped>
.aux-podium {
  width: 67%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}

.leaderboard {
  display: flex;
  justify-content: center;
  padding: 40px;
  background-color: #F2F5FA;
}

.select-container {
  position: relative;
  width: 100%;
  height: 45px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.select-container select {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 5px 30px 5px 10px;
  color: #636363;
  background-color: #fdfeff;
  cursor: pointer;
  appearance: none;
  font-size: 0.8em;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.select-container select::placeholder {
  color: #ccc;
}

.select-container select:hover,
.select-container select:focus {
  border-color: #1bd0033d;
  box-shadow: 0 0 15px rgba(26, 208, 3, 0.5);
  background-color: #fff;
}

.custom-arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #ccc;
  pointer-events: none;
}

.custom-arrow.up {
  border-top: none;
  border-bottom: 5px solid #ccc;
}

.arrow-container {
  position: absolute;
  top: 0;
  right: 20px;
  /*bottom: 0;
  display: flex;
  align-items: center;
  pointer-events: none;*/
  /*nuevo*/
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #ccc;
  pointer-events: none;
}

.arrow-container img {
  height: 12px;
}

.custom-arrow.up {
  border-top: none;
  border-bottom: 5px solid #ccc;
}

@media (max-width: 1375px) {
  .leaderboard {
    flex-direction: column;
    align-items: center;
    row-gap: 40px;
  }

  .aux-podium {
    width: 100%;
  }
}
</style>
