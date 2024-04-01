<template>
    <div class="ranking-container">

        <img :src="require(`@/assets/trophy.png`)" alt="trofeo">
        <div class="user-display">
            <div class="user-rank">{{ currentUser.pos }}</div>
            <div class="user-data">
                <div style="margin-left: 120px;">
                    <span class="main-text">{{ currentUser.username }}</span>
                    <span>{{ formattedDate }}</span>
                </div>
                <div>
                    <span class="main-text">{{ currentUser.completion_time }}</span>
                    <span>TIEMPO</span>
                </div>
                <div style="margin-right: 50px;">
                    <span class="main-text">{{ currentUser.increment_points }}</span>
                    <span>PUNTOS</span>
                </div>
            </div>



        </div>
        <div class="top-container">
            <h2 style="text-align: center; font-size: 45px; font-weight: bold; margin-bottom: 15px;">Los 10 primeros
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
.top-container {
    width: 73%;
    max-width: 600px;
    box-shadow: inset 0 0 10px #000000;
    box-shadow: 0 0 10px #000000;
    height: 60vh;
    overflow-y: hidden;
    border-radius: 35px;
    display: flex;
    flex-direction: column;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-right: 25px;
}

.aux-container {
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    display: flex;

    flex-direction: column;
    row-gap: 10px;
}

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
    width: 110px;
    position: absolute;
    left: 0;
    height: 110px;
    border-radius: 50%;
    color: black;
    font-weight: bold;
    font-size: 60px;

    display: flex;
    justify-content: center;
    align-items: center;
    border: 5px #33BA23 solid;
    background-color: #1AE800;
    z-index: 1;
}

.user-display {
    width: 65%;
    position: relative;
    top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-data {
    display: flex;
    position: relative;

    width: 100%;
    height: 90px;
    padding: 12.5px 2px;
    justify-content: space-between;
    align-items: center;
    border: 2px #33BA23 solid;
    background-color: #1AE800;
    overflow-x: auto;
    overflow-y: hidden;
    column-gap: 10px;
    border-radius: 100px;
}

.main-text {
    font-size: 25px;
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
</style>