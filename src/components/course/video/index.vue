<template>
  <div class="player-container">
    <video ref="videoElement" playsinline crossorigin>
      <source :src="urlVideo" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";
import Plyr from "plyr/dist/plyr.min.js";
import "plyr/dist/plyr.css";

export default {
  name: "Video",
  data() {
    return {
      player: null,
      playerOptions: {
        controls: ["play-large", "play", "progress", "current-time", "duration", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
        speed: { selected: 1, options: [0.75, 1, 1.25, 1.5, 2] }
      },
      idCourse: this.$route.query.course,
      videoMarkedComplete: false,
      timeReprod: 0,
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
    window.addEventListener("unload", this.someMethod);
    this.initPlayer();
  },
  computed: {
    ...mapGetters("course", ["urlVideo", "timeReady"]),
    ...mapState("course", ["lesson", "completedLessons"]),
  },
  methods: {
    ...mapMutations("course", ["CLEAR_VIDEO"]),
    ...mapActions("course", ["updateTime", "updateCompletedLessons"]),

    initPlayer() {
      this.player = new Plyr(this.$refs.videoElement, this.playerOptions);
      
      this.player.on("pause", this.onPlayerPause);
      this.player.on("timeupdate", this.onPlayerTimeupdate);
      this.player.on("ready", this.playerReadied);
    },

    onPlayerPause() {
      if (this.player) {
        this.actualizarTiempo(this.player.currentTime);
      }
    },

    async playerReadied() {
      try {
        const response = await this.axios.get(
          "marketing/courses/purchased/get-time?courseId=${this.courseId}&classId=${this.classId}"
        );
        this.timeReprod = response.data.time || 0;
        if (this.player) {
          this.player.currentTime = this.timeReprod;
        }
      } catch (err) {
        console.warn("No se pudo cargar el tiempo guardado", err);
      }
    },

    actualizarTiempo(time) {
      this.updateTime({
        course: this.$route.query.course,
        time,
        lessonId: this.lesson.id,
      });
    },

    onPlayerTimeupdate() {
      if (!this.player) return;
      const currentTime = this.player.currentTime;
      const duration = this.player.duration;

      if (duration && currentTime >= duration * 0.8 && !this.videoMarkedComplete) {
        this.markLessonComplete();
        this.videoMarkedComplete = true;
      }
    },

    markLessonComplete() {
      if (!this.completedLessons.includes(this.lesson.id)) {
        this.updateCompletedLessons(this.lesson.id);
        this.$emit("markLessonComplete", this.lesson.id);
      }
    },

    handleLessonComplete(lessonId) {
      if (!this.completedLessons.includes(lessonId)) {
        this.completedLessons.push(lessonId);
        this.getProgress();
      }
    },

    someMethod() {
      if (this.player) {
        this.actualizarTiempo(this.player.currentTime);
      }
    },
  },
  watch: {
    lesson: {
      immediate: true,
      handler(newLesson) {
        if (newLesson && this.completedLessons) {
          this.videoMarkedComplete = this.completedLessons.includes(newLesson.id);
        }
      },
    },
  },
  beforeDestroy() {
    window.removeEventListener("unload", this.someMethod);
    if (this.player) {
      this.updateTime({
        course: this.idCourse,
        time: this.player.currentTime,
        lessonId: this.lesson.id,
      });
      this.player.destroy();
    }
  },
  destroyed() {
    this.CLEAR_VIDEO();
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
