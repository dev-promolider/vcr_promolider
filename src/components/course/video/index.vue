<template>
  <div class="player">
    <video-player class="video vjs-custom-skin vjs-big-play-centered" ref="videoPlayer" :options="playerOptions"
      :playsinline="true" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)"
      @loadeddata="onPlayerLoadeddata($event)" @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)"
      @timeupdate="onPlayerTimeupdate($event)" @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)" @ready="playerReadied" @statechanged="playerStateChanged($event)"
      @markLessonComplete="handleLessonComplete">
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
      videoMarkedComplete: false,
    };
  },
  props: {
    courseId: String,
    classId: Number
  },
  mounted() {
    window.addEventListener('unload', this.someMethod);
    this.playerOptions = {
      responsive: true,
      fluid: true,
      preload: "auto",
      autoplay: false,
      muted: false,
      language: "es",
      playbackRates: [0.7, 1.0, 1.5, 2.0],
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
    onPlayerPlay() { },
    onPlayerPause(player) {
      this.actualizarTiempo(player.currentTime());
    },
    onPlayerLoadeddata() { },
    onPlayerWaiting() { },
    onPlayerPlaying() { },
    onPlayerCanplay() { },
    onPlayerCanplaythrough() { },
    playerStateChanged() { },

    async playerReadied(player) {
      await this.axios.get(`/purchased/get-time?courseId=${this.courseId}&classId=${this.classId}`).then((response) => {
        this.timeReprod = response.data.time;
      });
      player.currentTime(this.timeReprod);
    },

    actualizarTiempo(time) {
      this.updateTime({ course: this.$route.query.course, time, lessonId: this.lesson.id });
    },

    onPlayerTimeupdate() {
      const player = this.player;
      const currentTime = player.currentTime();
      const duration = player.duration();

      if (currentTime >= duration * 0.8 && !this.videoMarkedComplete) {
        console.log('Video ha sido visto en un 80%. Marcando lección como completa.');
        this.markLessonComplete();
        this.videoMarkedComplete = true;
      }
    },
    markLessonComplete() {
      this.$emit('markLessonComplete', this.lesson.id);
    },
    handleLessonComplete(lessonId) {
      if (!this.completedLessons.includes(lessonId)) {
        console.log(`Marcando lección ${lessonId} como completada.`);
        this.completedLessons.push(lessonId);
        this.getProgress(); // Actualiza el progreso del curso
      }
    },
    someMethod(player) {
      this.actualizarTiempo(player.currentTime());
    }
  },
  beforeDestroy() {
    window.removeEventListener('unload', this.someMethod);
    // Cuando el componente se destruya o cierre por casualidad actualizaremos el tiempo en el que se esta quedando
    this.updateTime({ course: this.idCourse, time: this.player.currentTime(), lessonId: this.lesson.id });

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
