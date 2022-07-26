<template>
  <v-container
    fill-height
    fluid
    style="
      align-items: normal;
      height: 100%;
      min-height: 94.7vh;
      max-width: 100% !important;
    "
    class="background-leaderboard pb-3"
  >
    <v-row>
      <div class="confetti">
        <div class="confetti-piece" v-for="i in 20" :key="i"></div>
      </div>
      <v-col
        align-self="end"
        :class="[$vuetify.breakpoint.xs && 'mt-50']"
        cols="12"
        sm="8"
        v-if="!isLoading"
      >
        <div class="grid-card-leaderboard d-flex align-end justify-center">
          <v-card
            color="#23b121c2"
            class="text-center"
            :width="$vuetify.breakpoint.xs ? 120 : 250"
            :height="$vuetify.breakpoint.xs ? 200 : 370"
          >
            <div
              class="align-imgs m-auto black--text text-center"
              :class="[$vuetify.breakpoint.xs ? 'text-h7' : 'text-h5']"
            >
              <div
                class="font-weight-bold color-name-leaderboard"
                :class="[$vuetify.breakpoint.xs ? 'text-h7' : 'text-h4']"
              >
                {{ secondPlace?.name }}
              </div>
              <v-avatar
                class="my-5"
                :width="$vuetify.breakpoint.xs ? 70 : 110"
                :height="$vuetify.breakpoint.xs ? 70 : 110"
              >
                <img :src="secondPlace?.photo" />
              </v-avatar>
            </div>
            <v-img
              class="mx-auto mt-10"
              :width="$vuetify.breakpoint.xs ? 70 : 130"
              :height="$vuetify.breakpoint.xs ? 60 : 120"
              :src="require('@/assets/icon-second.png')"
            >
            </v-img>
            <v-card-text
              style="position: relative"
              :class="[$vuetify.breakpoint.xs ? 'text-h6' : 'text-h3']"
              class="white--text text-center"
            >
              <span class="font-weight-bold">{{ secondPlace?.total }}</span>
            </v-card-text>
          </v-card>
          <v-card
            color="#23b121"
            class="text-center"
            :width="$vuetify.breakpoint.xs ? 120 : 300"
            :height="$vuetify.breakpoint.xs ? 250 : 500"
          >
            <div
              class="align-imgs m-auto black--text text-center"
              :class="[$vuetify.breakpoint.xs ? 'text-h7' : 'text-h5']"
            >
              <div
                class="font-weight-bold color-name-leaderboard"
                :class="[$vuetify.breakpoint.xs ? 'text-h7' : 'text-h4']"
              >
                {{ firstPlace?.name }}
              </div>
              <v-avatar
                class="my-5"
                :width="$vuetify.breakpoint.xs ? 70 : 110"
                :height="$vuetify.breakpoint.xs ? 70 : 110"
              >
                <img :src="firstPlace?.photo"
              /></v-avatar>
            </div>
            <v-img
              class="mx-auto mt-10"
              :width="$vuetify.breakpoint.xs ? 70 : 140"
              :height="$vuetify.breakpoint.xs ? 60 : 130"
              :src="require('@/assets/icon-first.png')"
            ></v-img>
            <v-card-text
              style="position: relative"
              :class="[$vuetify.breakpoint.xs ? 'text-h6' : 'text-h3']"
              class="white--text text-center"
              ><span class="font-weight-bold">{{
                firstPlace?.total
              }}</span></v-card-text
            >
          </v-card>
          <v-card
            color="#23b121c2"
            class="text-center"
            :width="$vuetify.breakpoint.xs ? 120 : 250"
            :height="$vuetify.breakpoint.xs ? 180 : 300"
          >
            <div
              class="align-imgs m-auto black--text text-center"
              :class="[$vuetify.breakpoint.xs ? 'text-h7' : 'text-h5']"
            >
              <div
                class="font-weight-bold color-name-leaderboard"
                :class="[$vuetify.breakpoint.xs ? 'text-h7' : 'text-h4']"
              >
                {{ thirdPlace?.name }}
              </div>
              <v-avatar
                class="my-5"
                :width="$vuetify.breakpoint.xs ? 70 : 110"
                :height="$vuetify.breakpoint.xs ? 70 : 110"
              >
                <img :src="thirdPlace?.photo"
              /></v-avatar>
            </div>
            <v-img
              class="mx-auto mt-10"
              :width="$vuetify.breakpoint.xs ? 70 : 110"
              :height="$vuetify.breakpoint.xs ? 60 : 100"
              :src="require('@/assets/icon-third.png')"
            ></v-img>
            <v-card-text
              style="position: relative"
              :class="[$vuetify.breakpoint.xs ? 'text-h6' : 'text-h3']"
              class="white--text text-center"
              ><span class="font-weight-bold">{{
                thirdPlace?.total
              }}</span></v-card-text
            >
          </v-card>
        </div>
      </v-col>
      <v-col v-if="isLoading" align-self="center">
        <div class="d-flex align-start justify-center" v-if="isLoading">
          <v-progress-circular
            :size="70"
            :width="7"
            color="success"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card
          class="rounded-lg"
          tile
          v-if="listLeaderBoard.length > 0 && !isLoading"
        >
          <v-list color="#2fcd2d">
            <div v-for="list in listLeaderBoard" :key="list.id">
              <v-list-item class="ma-4 white--text" style="background: #131b1e">
                <v-list-item-content>
                  <v-row align="center">
                    <v-col sm="2">
                      <v-list-item-title>{{ list.id }}</v-list-item-title>
                    </v-col>
                    <v-col sm="2">
                      <v-avatar size="30">
                        <v-img :src="`${list?.photo}`"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col sm="4">
                      <v-list-item-title>{{ list?.name }}</v-list-item-title>
                    </v-col>
                    <v-col sm="3">
                      <v-list-item-title>{{ list?.total }}</v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
        <v-sheet dark v-if="isLoading">
          <v-skeleton-loader
            v-for="i in 10"
            :key="i"
            v-bind="attrs"
            type="list-item-avatar"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LeaderBoard",

  data() {
    return {
      datos: null,
      isLoading: true,
      attrs: {
        class: "mt-3 pa-3",
        elevation: 2,
      },
    };
  },

  computed: {
    ...mapGetters("course", [
      "getListLeaderBoard",
      "getFirstPlaceLeaderBoard",
      "getSecondPlaceLeaderBoard",
      "getThirdPlaceLeaderBoard",
    ]),
    listLeaderBoard() {
      return this.getListLeaderBoard;
    },
    firstPlace() {
      return this.getFirstPlaceLeaderBoard;
    },
    secondPlace() {
      return this.getSecondPlaceLeaderBoard;
    },
    thirdPlace() {
      return this.getThirdPlaceLeaderBoard;
    },
  },
  methods: {
    ...mapActions("course", ["getLeaderBoard"]),
    async getRanking() {
      this.isLoading = true;
      const { ok } = await this.getLeaderBoard();

      if (!ok) return;
      this.isLoading = false;
    },
  },
  created() {
    this.getRanking();
  },
};
</script>

<style lang="scss" scoped>
body {
  overflow: hidden !important;
  margin: 0;
  padding: 0;
}
.contenedor {
  margin: 0 auto;
  width: 100%;
}
.mt-50 {
  margin-top: 150px;
}
.grid-card-leaderboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0px;
}
.align-imgs {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: -150px;
}
.align-imgs.title {
  top: -270px;
}

.background-leaderboard {
  background: #131b1e;
}
.color-name-leaderboard {
  color: #27c125;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.confetti {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2;
}
.confetti-piece {
  position: absolute;
  width: 10px;
  height: 30px;
  background: #ffd300;
  top: 0;
  opacity: 0;
}
.confetti-piece:nth-child(1) {
  left: 7%;
  -webkit-transform: rotate(-40deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 182ms;
  -webkit-animation-duration: 1116ms;
}
.confetti-piece:nth-child(2) {
  left: 14%;
  -webkit-transform: rotate(4deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 161ms;
  -webkit-animation-duration: 1076ms;
}
.confetti-piece:nth-child(3) {
  left: 21%;
  -webkit-transform: rotate(-51deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 481ms;
  -webkit-animation-duration: 1103ms;
}
.confetti-piece:nth-child(4) {
  left: 28%;
  -webkit-transform: rotate(61deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 334ms;
  -webkit-animation-duration: 708ms;
}
.confetti-piece:nth-child(5) {
  left: 35%;
  -webkit-transform: rotate(-52deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 302ms;
  -webkit-animation-duration: 776ms;
}
.confetti-piece:nth-child(6) {
  left: 42%;
  -webkit-transform: rotate(38deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 180ms;
  -webkit-animation-duration: 1168ms;
}
.confetti-piece:nth-child(7) {
  left: 49%;
  -webkit-transform: rotate(11deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 395ms;
  -webkit-animation-duration: 1200ms;
}
.confetti-piece:nth-child(8) {
  left: 56%;
  -webkit-transform: rotate(49deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 14ms;
  -webkit-animation-duration: 887ms;
}
.confetti-piece:nth-child(9) {
  left: 63%;
  -webkit-transform: rotate(-72deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 149ms;
  -webkit-animation-duration: 805ms;
}
.confetti-piece:nth-child(10) {
  left: 70%;
  -webkit-transform: rotate(10deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 351ms;
  -webkit-animation-duration: 1059ms;
}
.confetti-piece:nth-child(11) {
  left: 77%;
  -webkit-transform: rotate(4deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 307ms;
  -webkit-animation-duration: 1132ms;
}
.confetti-piece:nth-child(12) {
  left: 84%;
  -webkit-transform: rotate(42deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 464ms;
  -webkit-animation-duration: 776ms;
}
.confetti-piece:nth-child(13) {
  left: 91%;
  -webkit-transform: rotate(-72deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 429ms;
  -webkit-animation-duration: 818ms;
}
.confetti-piece:nth-child(odd) {
  background: #7431e8;
}
.confetti-piece:nth-child(even) {
  z-index: 1;
}
.confetti-piece:nth-child(4n) {
  width: 5px;
  height: 12px;
  -webkit-animation-duration: 2000ms;
}
.confetti-piece:nth-child(3n) {
  width: 3px;
  height: 10px;
  -webkit-animation-duration: 2500ms;
  -webkit-animation-delay: 1000ms;
}
.confetti-piece:nth-child(4n-7) {
  background: red;
}
@-webkit-keyframes makeItRain {
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    -webkit-transform: translateY(550px);
  }
}
</style>
