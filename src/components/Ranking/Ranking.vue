<template>
    <div class="ranking-container">
        <!--<img :src="require(`@/assets/trophy.png`)" alt="trofeo">-->
        <div class="user-display">
            <div class="user-rank">{{ currentUser.pos }}</div>
            <div class="user-data">
                <div style="margin-left: 110px; margin-right: 5px;">
                    <span class="main-text">{{ currentUser.username }}</span>
                    <!--<span>{{ formattedDate }}</span>-->
                </div>
                <div>
                    <span class="main-text">{{ currentUser.completion_time }}</span>
                    <span>TIEMPO</span>
                </div>
                <div style="margin-right: 35px;">
                    <span class="main-text">{{ currentUser.increment_points }}</span>
                    <span>PUNTOS</span>
                </div>
            </div>



        </div>
        <div class="top-container">
            <h2 style="text-align: center; font-size: 30px; font-weight: 650; margin-bottom: 15px; color: #434343;">Top 10
            </h2>
            <div class="aux-container">
                <div class="topTen" v-for="(item, index) in topTen" :key="index">
                    <RankingRow :user="item" :pos="index + 1"></RankingRow>
                </div>
            </div>

        </div>


    </div>
</template>
<script>
import RankingRow from './Row/RankingRow.vue';
import { mapState } from 'vuex';
export default {
    components: { RankingRow },
    data() {
        return {
            topTen: [

            ],
            currentUser: {
                pos: '--',
                username: '--',
                latest_created_at: '--',
                completion_time: '--',
                increment_points: '--'
            }
        };
    },
    computed: {
        ...mapState('course', ['topDynamicData']),
        formattedDate() {
            
            let date = new Date(this.currentUser.latest_created_at);
            let options = { year: 'numeric', month: 'long', day: 'numeric' };
            return this.currentUser.latest_created_at === '--' ? this.currentUser.latest_created_at : date.toLocaleDateString('es-ES', options);

        }
    },
    watch: {
        topDynamicData(newVal) {
            this.topTen=newVal.topTen;
            this.currentUser=newVal.currentUser;

            const timeInSeconds = this.currentUser.completion_time;
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = timeInSeconds % 60;

            const minutesShown = minutes < 10 ? '0' + minutes : minutes;
            const secondsShown = seconds < 10 ? '0' + seconds : seconds;
            this.currentUser = { ...this.currentUser, completion_time: minutesShown + ':' + secondsShown };




            // this.topTen = newVal;
            // const user_id = localStorage.getItem('id_user');

            // const userIndex = newVal.findIndex(obj => obj.id === Number(user_id));

            // this.currentUser = { ...newVal[userIndex], pos: userIndex + 1 };
            // const timeInSeconds = this.currentUser.completion_time;
            // const minutes = Math.floor((timeInSeconds % 3600) / 60);
            // const seconds = timeInSeconds % 60;

            // const minutesShown = minutes < 10 ? '0' + minutes : minutes;
            // const secondsShown = seconds < 10 ? '0' + seconds : seconds;
            // this.currentUser = { ...this.currentUser, completion_time: minutesShown + ':' + secondsShown };

        }
    }
}
</script>
<style scoped>
.topTen {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.ranking-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.user-rank {
    width: 70px;
    position: absolute;
    left: 0;
    height: 70px;
    border-radius: 50%;
    color: #434343;
    font-weight: bold;
    font-size: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 5px rgba(32, 228, 4, 0.5);
    z-index: 1;
    margin-bottom: 50px;
    margin-left: 5%;
}

.user-display {
    width: 80%;
    position: relative;
    top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 700px;
}

.user-data {
    display: flex;
    position: relative;
    width: 100%;
    height: 90px;
    padding: 12.5px 2px;
    justify-content: space-between;
    align-items: center;
    color: #434343;
    background-color: white;
    overflow-x: auto;
    overflow-y: hidden;
    column-gap: 10px;
    border-radius: 15px;
    font-size: 50px;
    margin-bottom: 50px;
}

.user-data::-webkit-scrollbar {
    width: 8px; 
    height: 8px; 
}

.top-container {
    width: 80%;
    max-width: 700px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-right: 5px;
    top: 20px;
}

.aux-container {
    overflow-y: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.main-text {
    font-size: 15px !important;
    font-weight: 700;
    text-wrap: nowrap;
}

.main-text+span {
    font-size: 15px;
    font-weight: lighter;
}

.user-data div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

::-webkit-scrollbar {
    width: 8px;
}
</style>