<template>
  <v-container
    fill-height
    fluid
    style="
      align-items: normal;
      height: 100%;
      min-height: 110.5vh;
      max-width: 100% !important;
    "
    class="background-leaderboard "
  >
    <v-row>
      <div class="confetti">
        <div class="confetti-piece" v-for="i in 20" :key="i"></div>
      </div>
      <v-col
        align-self="end"
        :class="[
          $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'mt-50' : '',
        ]"
        cols="12"
        lg="8"
        v-if="!isLoading"
      >
        <div class="grid-card-leaderboard d-flex align-end justify-center">
          <v-card
            color="#23b121c2"
            class="text-center"
            width="100%"
            v-if="secondPlace.name != 'noName'"
            :max-width="$vuetify.breakpoint.xs ? 110 : 250"
            :height="$vuetify.breakpoint.xs ? 200 : 360"
            min-width="120"
          >
            <div
              class="align-imgs m-auto black--text text-center"
              :class="[$vuetify.breakpoint.xs ? 'text-h7' : 'text-h5']"
            >
              <div class="font-weight-bold color-name-leaderboard">
                {{ secondPlace.name }}
              </div>
              <v-avatar
                class="my-5"
                :width="$vuetify.breakpoint.xs ? 70 : 110"
                :height="$vuetify.breakpoint.xs ? 70 : 110"
              >
                <img :src="secondPlace.photo" />
              </v-avatar>
            </div>
            <v-img
              class="mx-auto p-10 mt-10"
              width="100%"
              :max-width="$vuetify.breakpoint.xs ? 70 : 140"
              :src="require('@/assets/icon-second.png')"
            >
            </v-img>
            <v-card-text
              style="position: relative"
              :class="[$vuetify.breakpoint.xs ? 'text-h6' : 'text-h3']"
              class="white--text text-center"
            >
              <span class="font-weight-bold">{{ secondPlace.total }}</span>
            </v-card-text>
          </v-card>
          <v-card
            color="#23b121"
            class="text-center"
            width="100%"
            :max-width="$vuetify.breakpoint.xs ? 120 : 300"
            :height="$vuetify.breakpoint.xs ? 250 : 500"
          >
            <div
              class="align-imgs m-auto black--text text-center"
              :class="[$vuetify.breakpoint.xs ? 'text-h7' : 'text-h5']"
            >
              <div class="font-weight-bold color-name-leaderboard text-xs-h6">
                {{ firstPlace.name }}
              </div>
              <v-avatar
                class="my-5"
                :width="$vuetify.breakpoint.xs ? 70 : 110"
                :height="$vuetify.breakpoint.xs ? 70 : 110"
              >
                <img :src="firstPlace.photo"
              /></v-avatar>
            </div>
            <v-img
              class="mx-auto p-10 mt-10"
              width="100%"
              :max-width="$vuetify.breakpoint.xs ? 70 : 140"
              :src="require('@/assets/icon-first.png')"
            ></v-img>
            <v-card-text
              style="position: relative"
              :class="[$vuetify.breakpoint.xs ? 'text-h6' : 'text-h3']"
              class="white--text text-center"
              ><span class="font-weight-bold">{{
                firstPlace.total
              }}</span></v-card-text
            >
          </v-card>
          <v-card
            color="#23b121c2"
            class="text-center"
            width="100%"
            v-if="thirdPlace.name != 'noName'"
            :max-width="$vuetify.breakpoint.xs ? 110 : 250"
            :height="$vuetify.breakpoint.xs ? 180 : 300"
          >
            <div class="align-imgs m-auto black--text text-center">
              <div
                class="font-weight-bold color-name-leaderboard text-xl-h4 text-md-h5"
              >
                {{ thirdPlace.name }}
              </div>
              <v-avatar
                class="my-5"
                :width="$vuetify.breakpoint.xs ? 70 : 110"
                :height="$vuetify.breakpoint.xs ? 70 : 110"
              >
                <img :src="thirdPlace.photo"
              /></v-avatar>
            </div>
            <v-img
              class="mx-auto p-10 mt-10"
              width="100%"
              :max-width="$vuetify.breakpoint.xs ? 70 : 140"
              :src="require('@/assets/icon-third.png')"
            ></v-img>
            <v-card-text
              style="position: relative"
              :class="[$vuetify.breakpoint.xs ? 'text-h6' : 'text-h3']"
              class="white--text text-center"
              ><span class="font-weight-bold">{{
                thirdPlace.total
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
      <v-col cols="12" lg="4">
        <v-card tile v-if="listLeaderBoard.length > 0 && !isLoading">
          <v-list class="scroll" outlined>
            <div v-for="(list, index) in listLeaderBoard" :key="list.id">
              <v-list-item
                class="ma-4 white--text"
                style="background: #131b1e; border-radius: 30px"
              >
                <v-list-item-content>
                  <v-row align="center">
                    <v-col cols="2" sm="2">
                      <v-list-item-title>{{ index + 4 }}</v-list-item-title>
                    </v-col>
                    <v-col cols="2" sm="2">
                      <v-img
                        width="30"
                        min-width="30"
                        :src="`${list.photo}`"
                      ></v-img>
                    </v-col>
                    <v-col cols="6" sm="6">
                      <v-list-item-title>{{ list.name }}</v-list-item-title>
                    </v-col>
                    <v-col cols="2" sm="2">
                      <v-list-item-title>{{ list.total }}</v-list-item-title>
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

<style lang="scss">
.theme--light.v-sheet--outlined {
  border: none !important;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none !important;
}
body {
  overflow: hidden !important;
  margin: 0;
  padding: 0;
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
  background: #ffffff;
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
  z-index: 0;
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
  transform: rotate(-40deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 182ms;
  animation-delay: 182ms;
  -webkit-animation-duration: 1116ms;
  animation-duration: 1116ms;
}
.confetti-piece:nth-child(2) {
  left: 14%;
  -webkit-transform: rotate(4deg);
  transform: rotate(4deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 161ms;
  animation-delay: 161ms;
  -webkit-animation-duration: 1076ms;
  animation-duration: 1076ms;
}
.confetti-piece:nth-child(3) {
  left: 21%;
  -webkit-transform: rotate(-51deg);
  transform: rotate(-51deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 481ms;
  animation-delay: 481ms;
  -webkit-animation-duration: 1103ms;
  animation-duration: 1103ms;
}
.confetti-piece:nth-child(4) {
  left: 28%;
  -webkit-transform: rotate(61deg);
  transform: rotate(61deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 334ms;
  animation-delay: 334ms;
  -webkit-animation-duration: 708ms;
  animation-duration: 708ms;
}
.confetti-piece:nth-child(5) {
  left: 35%;
  -webkit-transform: rotate(-52deg);
  transform: rotate(-52deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 302ms;
  animation-delay: 302ms;
  -webkit-animation-duration: 776ms;
  animation-duration: 776ms;
}
.confetti-piece:nth-child(6) {
  left: 42%;
  -webkit-transform: rotate(38deg);
  transform: rotate(38deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 180ms;
  animation-delay: 180ms;
  -webkit-animation-duration: 1168ms;
  animation-duration: 1168ms;
}
.confetti-piece:nth-child(7) {
  left: 49%;
  -webkit-transform: rotate(11deg);
  transform: rotate(11deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 395ms;
  animation-delay: 395ms;
  -webkit-animation-duration: 1200ms;
  animation-duration: 1200ms;
}
.confetti-piece:nth-child(8) {
  left: 56%;
  -webkit-transform: rotate(49deg);
  transform: rotate(49deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 14ms;
  animation-delay: 14ms;
  -webkit-animation-duration: 887ms;
  animation-duration: 887ms;
}
.confetti-piece:nth-child(9) {
  left: 63%;
  -webkit-transform: rotate(-72deg);
  transform: rotate(-72deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 149ms;
  animation-delay: 149ms;
  -webkit-animation-duration: 805ms;
  animation-duration: 805ms;
}
.confetti-piece:nth-child(10) {
  left: 70%;
  -webkit-transform: rotate(10deg);
  transform: rotate(10deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 351ms;
  animation-delay: 351ms;
  -webkit-animation-duration: 1059ms;
  animation-duration: 1059ms;
}
.confetti-piece:nth-child(11) {
  left: 77%;
  -webkit-transform: rotate(4deg);
  transform: rotate(4deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 307ms;
  animation-delay: 307ms;
  -webkit-animation-duration: 1132ms;
  animation-duration: 1132ms;
}
.confetti-piece:nth-child(12) {
  left: 84%;
  -webkit-transform: rotate(42deg);
  transform: rotate(42deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 464ms;
  animation-delay: 464ms;
  -webkit-animation-duration: 776ms;
  animation-duration: 776ms;
}
.confetti-piece:nth-child(13) {
  left: 91%;
  -webkit-transform: rotate(-72deg);
  transform: rotate(-72deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 429ms;
  animation-delay: 429ms;
  -webkit-animation-duration: 818ms;
  animation-duration: 818ms;
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
  animation-duration: 2000ms;
}
.confetti-piece:nth-child(3n) {
  width: 3px;
  height: 10px;
  -webkit-animation-duration: 2500ms;
  animation-duration: 2500ms;
  -webkit-animation-delay: 1000ms;
  animation-delay: 1000ms;
}
.confetti-piece:nth-child(4n-7) {
  background: red;
}

@keyframes makeItRain {
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
.scroll {
  height: 100%;
  max-height: 88vh;
  overflow-y: scroll;
  &::-webkit-scrollbar-thumb {
    background-color: #131b1e;
    box-shadow: none;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #ffffff;
    box-shadow: inset 0 0 6px #ffffff;
    background-color: #ffffff;
    border-radius: 10px !important;
  }
}

.v-sheet.v-card{
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
  border-bottom-left-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
}
</style>
