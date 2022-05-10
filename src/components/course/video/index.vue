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
import { mapMutations, mapGetters, mapState} from "vuex";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";

export default {
  name: "Video",
  components: {
    videoPlayer,
  },
  data() {
    return {
      playerOptions: {},
      idCourse: this.$route.query.course
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
      this.player.muted(false);
    }, 1000);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    ...mapGetters("course", ["urlVideo", "timeReady"]),
 
    ...mapState("course", ["lesson"]),
 
  },
  methods: {

    ...mapMutations("course", ["CLEAR_VIDEO"]),

    // listen event
    onPlayerPlay() {},
    onPlayerPause(player) {
      this.actualizarTiempo(player.currentTime())
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
    actualizarTiempo(time){
      this.axios.patch(`purchased/save-class-seen?course_id=${this.$route.query.course}&display_time=${time}&class_id=${this.lesson.id}`)
    }
  },
  beforeDestroy() {
    this.axios.patch(`purchased/save-class-seen?course_id=${this.idCourse}&display_time=${this.player.currentTime()}&class_id=${this.lesson.id}`)
    this.$store.commit("course/UPDATE_TIME", 0);
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