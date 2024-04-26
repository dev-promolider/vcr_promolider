<template>
  <div class="leaderboard">
    <div class="aux-podium">
      <div class="select-container">
        <select name="cursos" id="course-selection" v-model="selectedCourse" @change="retrieveTop">
          <option value="" disabled>Seleccione un curso</option>
          <option :value="course.id" v-for="(course, index) in courses" :key="index">{{ course.title }}</option>
        </select>
        <div class="arrow-container">
          <img :src="require('@/assets/lead_down_arrow.svg')" alt="downwards arrow">
        </div>
      </div>

      <Champions :podium="podium" :podiumPos="currentUser.pos"/>
    </div>
    <RankingCourse :users="users" :currentUser="currentUser"></RankingCourse>
  </div>
</template>

<script>
import RankingCourse from '../RankingCourse/RankingCourse.vue';
import Champions from './Champions.vue';

export default {
  components: {
    Champions,
    RankingCourse
  },
  data() {
    return {
      podium: [
      ],
      courses: [],
      selectedCourse: '',
      users:[],
      currentUser:{
                pos: '--',
                username: '--',
                latest_created_at: null,
                avg_time: null,
                total_points: '--'
            }

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
        const datos= await this.axios.get(`course/all-dynamics-top/${this.selectedCourse}`)
        
          if(!datos.data.topTen){
            this.currentUser={
                pos: '--',
                username: '--',
                latest_created_at: null,
                avg_time: null,
                total_points: '--'
            };
            this.users=[];
            this.podium=[];
            return
          }else if(!datos.data.currentUser){
            this.currentUser={
                pos: '--',
                username: '--',
                latest_created_at: null,
                avg_time: null,
                total_points: '--'
            };
            this.users=datos.data.topTen
            this.podium=this.users.slice(0,3)
            return
          }
          this.users=datos.data.topTen
          this.currentUser=datos.data.currentUser
          this.podium=this.users.slice(0,3)
        
      } else {
        return
      }

    }
  },
  created() {
    this.getAttributes();
  }
};
</script>

<style scoped>

.aux-podium{
  width: 67%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}
.leaderboard {
 display: flex;
 justify-content: center;
 padding: 40px;
}

.leaderboard-title {
  /* Add your styles here */
}

.leaderboard-list {
  list-style-type: none;
  /* Add your styles here */
}

.leaderboard-item {
  display: flex;
  align-items: center;
  /* Add your styles here */
}

.leaderboard-rank {
  /* Add your styles here */
}

.leaderboard-time,
.leaderboard-points {
  /* Add your styles here */
}

.select-container {
  position: relative;
  width: 100%;
  height: 47px;
  border: 4px solid #1EFF00;
  border-radius: 10px;
  overflow: hidden;
}

.select-container select {
  width: 100%;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 5px 8px;
  border-radius: 10px;
  cursor: pointer;
}

.arrow-container {
  position: absolute;
  top: 0;
  right: 20px;
  bottom: 0;
  display: flex;
  align-items: center;
  pointer-events: none;

}

.arrow-container img {
  height: 12px;
}

@media (max-width: 1375px) {
  .leaderboard{
  flex-direction: column;
  align-items: center;
  row-gap: 40px;
  }
  .aux-podium{
    width: 100%;
  }
}


</style>
