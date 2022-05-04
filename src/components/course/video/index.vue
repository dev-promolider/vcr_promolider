<template>
  <div class="player ">
    <video-player
      class="video vjs-custom-skin vjs-big-play-centered"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @ready="playerReadied"
      @statechanged="playerStateChanged($event)"
    >
    </video-player>
  </div>
</template>

<script>
import { mapMutations} from "vuex";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import { mapGetters } from "vuex";

export default {
  name: "Video",
  components: {
    videoPlayer,
  },
  data() {
    return {
      playerOptions: {},
    };
  },
  mounted() {
    this.playerOptions = {
      height: 100,
      preload: "auto",
      autoplay: false,
      muted: true,
      language: "es",
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      //techOrder: ["youtube"],
      sources: [
        {
          type: "Video/mp4",
          //baseHost: "https://crm-storage-user.s3.eu-west-1.amazonaws.com/video.mp4",
          // MP4
          src: this.urlVideo,
        },
      ],
      poster: "",
      controlBar: {
        durationDisplay: true,
        timeDivider: true,
      },
    };
    setTimeout(() => {
      console.log("dynamic change options", this.player);
      this.player.muted(false);
    }, 1000);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    ...mapGetters("course", ["urlVideo", "timeReady"]),
  },
  methods: {

    ...mapMutations("course", ["CLEAR_VIDEO"]),

    // listen event
    onPlayerPlay() {},
    onPlayerPause(player) {
      console.log("Tiempo en pause ->" + player.currentTime());
    },
    onPlayerEnded() {},
    onPlayerLoadeddata() {},
    onPlayerWaiting() {},
    onPlayerPlaying() {},
    onPlayerTimeupdate() {},
    onPlayerCanplay() {},
    onPlayerCanplaythrough() {},
    // or listen state event
    playerStateChanged() {},
    // player is ready
    playerReadied(player) {
      // seek to 10s
      //console.log('example player 1 readied', player)
      player.currentTime(this.timeReady);
      // console.log('example 01: the player is readied', player)
    },
  },
  beforeDestroy() {
    console.log(
      "componente destriudo y se quedo en ->" + this.player.currentTime()
    );
  },
  destroyed(){
    this.CLEAR_VIDEO();
  }
  // events:{
  //   'window.onbeforeunload': onbeforeunload_handler(){

  //   };
  // }
};
</script>

<style scoped>
@import './style.css';
</style>