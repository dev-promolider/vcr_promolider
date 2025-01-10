<template>
  <div class="player">
    <!-- Componente de reproductor de video con múltiples eventos personalizados -->
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
    courseId: {
      type: [String, Number],
      required: true,
    },
    classId: Number,
  },
  mounted() {
    // Configuración del reproductor de video y eventos al montar el componente
    window.addEventListener("unload", this.someMethod);
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
    ...mapState("course", ["lesson", "completedLessons"]),
  },
  methods: {
    ...mapMutations("course", ["CLEAR_VIDEO"]),
    ...mapActions("course", ["updateTime", "updateCompletedLessons"]),
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
      // Obtener tiempo de reproducción almacenado
      await this.axios
        .get(
          `/purchased/get-time?courseId=${this.courseId}&classId=${this.classId}`
        )
        .then((response) => {
          this.timeReprod = response.data.time;
        });
      player.currentTime(this.timeReprod);
    },

    actualizarTiempo(time) {
      // Almacenar tiempo de reproducción en Vuex
      this.updateTime({
        course: this.$route.query.course,
        time,
        lessonId: this.lesson.id,
      });
    },

    onPlayerTimeupdate() {
      const player = this.player;
      const currentTime = player.currentTime();
      const duration = player.duration();

      // Marcar lección completa cuando el 80% del video ha sido visto
      if (currentTime >= duration * 0.8 && !this.videoMarkedComplete) {
        console.log(
          "Video ha sido visto en un 80%. Marcando lección como completa."
        );
        this.markLessonComplete();
        this.videoMarkedComplete = true;
      }
    },

    markLessonComplete() {
      if (!this.completedLessons.includes(this.lesson.id)) {
        console.log(`Marking lesson ${this.lesson.id} as completed.`);
        this.updateCompletedLessons(this.lesson.id);
        this.$emit("markLessonComplete", this.lesson.id);
      }
    },

    handleLessonComplete(lessonId) {
      if (!this.completedLessons.includes(lessonId)) {
        console.log(`Marcando lección ${lessonId} como completada.`);
        this.completedLessons.push(lessonId);
        this.getProgress();
      }
    },

    someMethod(player) {
      this.actualizarTiempo(player.currentTime());
    },
  },
  watch: {
    lesson: {
      immediate: true,
      handler(newLesson) {
        // Actualizar si el video ya se marcó como completo en función de la lección actual
        this.videoMarkedComplete = this.completedLessons.includes(newLesson.id);
      },
    },
  },
  beforeDestroy() {
    window.removeEventListener("unload", this.someMethod);
    // Al salir, actualizar tiempo de reproducción en Vuex
    this.updateTime({
      course: this.idCourse,
      time: this.player.currentTime(),
      lessonId: this.lesson.id,
    });
  },
  destroyed() {
    // Limpiar datos del video al destruir el componente
    this.CLEAR_VIDEO();
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
