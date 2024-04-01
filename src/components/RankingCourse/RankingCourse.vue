<template>
    <div class="ranking-container">

        <div class="user-display">
            <div class="user-rank">{{ currentUser.pos }}</div>
            <div class="user-data">
                <div style="margin-left: 120px;">
                    <span class="main-text">{{ currentUser.username }}</span>
                    <span>{{ formattedDate }}</span>
                </div>
                <div>
                    <span class="main-text">{{ formattedTime }}</span>
                    <span>TIEMPO</span>
                </div>
                <div style="margin-right: 50px;">
                    <span class="main-text">{{ currentUser.total_points }}</span>
                    <span>PUNTOS</span>
                </div>
            </div>



        </div>
        <div class="top-container">

            <div class="aux-container">


                <RowRankingCourse v-for="(item, index) in users" :key="index" :user="item" :pos="index + 1">
                </RowRankingCourse>

            </div>

        </div>


    </div>
</template>
<script>
import RowRankingCourse from './RowRankingCourse';

export default {
    components: { RowRankingCourse },
    props: {
        users: {
            type: Array,
            required: true
        },
        currentUser: {
            type: Object,
            required: true,


        }
    },
    data() {
        return {
            topTen: [

            ]
        };
    },
    computed: {

        formattedDate() {
            if (this.currentUser.latest_record) {
                let date = new Date(this.currentUser.latest_record);
                let options = { year: 'numeric', month: 'long', day: 'numeric' };
                return this.currentUser.latest_record === '--' ? this.currentUser.latest_record : date.toLocaleDateString('es-ES', options);
            } else {
                return '--'
            }


        },

        formattedTime() {
            if (this.currentUser.avg_time) {
                const timeInSeconds = this.currentUser.avg_time;
                const minutes = Math.floor((timeInSeconds % 3600) / 60);
                const seconds = timeInSeconds % 60;

                const minutesShown = minutes < 10 ? '0' + minutes : minutes;
                const secondsShown = seconds < 10 ? '0' + seconds : seconds;
                return minutesShown + ':' + secondsShown;
            } else {
                return '--:--'
            }

        }

    },

}
</script>
<style scoped>
.top-container {
    width: 58%;
    max-width: 400px;
    height: 798px;
    padding: 5px;
    overflow-y: hidden;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background-color: #35424A;
    border: 3px solid #1AE800;
}

.aux-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

/* Scrollbar styles for a specific class */
.aux-container::-webkit-scrollbar {
    width: 3px;

}




.ranking-container {
    flex-grow: 1;
    min-width: 565px;
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
    width: 80%;
    position: relative;

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