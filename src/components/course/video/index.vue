<template>
  <div class="player">
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
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";
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
      idCourse: this.$route.query.course,
    };
  },
  mounted() {
    console.log(this.timeReady);
    window.addEventListener('unload', this.someMethod);
    this.playerOptions = {
      responsive: true,
      fluid: true,
      // width: "100%",
      // height: 100,
      preload: "auto",
      autoplay: false,
      muted: false,
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
    ...mapActions('course', ['updateTime']),
    // Eventos del reproductor que podemos usar
    onPlayerPlay() {},
    // Caundo el usaruario ponga pause se actualizara el tiempo en que se esta quedando
    onPlayerPause(player) {
      this.actualizarTiempo(player.currentTime());
    },
    onPlayerEnded() {},
    onPlayerLoadeddata() {},
    onPlayerWaiting() {},
    onPlayerPlaying() {},
    onPlayerTimeupdate() {},
    onPlayerCanplay() {},
    onPlayerCanplaythrough() {},
    playerStateChanged() {},

    // Función para inciar la reproducción
    playerReadied(player) {
      //  Iniciamos la reproducción en el tiempo que el usuario se quedo
      player.currentTime(this.timeReady);
    },

    // Función para actualizar el tiempo de reproduccion de la clase
    actualizarTiempo( time ) {
      this.updateTime({ course: this.$route.query.course,  time , lessonId: this.lesson.id })
    },
    someMethod(player) {
      this.actualizarTiempo(player.currentTime());
    }
  },
  beforeDestroy() {
    window.removeEventListener('unload', this.someMethod);  
    // Cuando el componente se destruya o cierre por casualidad actualizaremos el tiempo en el que se esta quedando
    this.updateTime({ course: this.idCourse,  time: this.player.currentTime() , lessonId: this.lesson.id });

    // Actualizaremos la variable global de vuex para no generar conflicto con otra clase
    
    //this.$store.commit("course/UPDATE_TIME", 0);
  },
  destroyed() {
    // Borramos datos del video al destruir el componente para no generar conflictos
    this.CLEAR_VIDEO();
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
