<template>


  <div class="player bg-dark">
      <video-player  class="video vjs-custom-skin vjs-big-play-centered"
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
          @statechanged="playerStateChanged($event)">
      </video-player>
  </div>





</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import { mapGetters } from 'vuex'

  // custom skin css
  //import '../src/custom-theme.css'

  
  export default {
    name:"Video",
    components: {
     videoPlayer
    },
    data() {
      return {
        playerOptions: {}
      }
    },
    mounted() {
      this.playerOptions= { 
          height:100,
          preload: "auto",
          autoplay: true,
          muted: true,
          language: 'es',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          //techOrder: ["youtube"],
          sources: [{
            type: "Video/mp4",
            // mp4
            src: this.urlVideo,
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "",
          controlBar:{
            durationDisplay: true,
            timeDivider: true,
          }
        }


      // console.log('this is current player instance object', this.player)
      setTimeout(() => {
        console.log('dynamic change options', this.player)
        // change src
        // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
        // change item
        // this.$set(this.playerOptions.sources, 0, {
        //   type: "video/mp4",
        //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
        // })
        // change array
        // this.playerOptions.sources = [{
        //   type: "video/mp4",
        //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
        // }]
        this.player.muted(false)
      }, 1000)
    },
    computed: {   
      player() {
        return this.$refs.videoPlayer.player
      },
      ...mapGetters('course',['urlVideo','timeReady'])
    },
    methods: {
      // listen event
      onPlayerPlay() {
      },
      onPlayerPause(player) {
        console.log('Tiempo en pause ->'+player.currentTime());
      },
      onPlayerEnded() {
      },
      onPlayerLoadeddata() {
      },
      onPlayerWaiting() {
      },
      onPlayerPlaying() {
      },
      onPlayerTimeupdate() {
      },
      onPlayerCanplay() {
      },
      onPlayerCanplaythrough() {
      },
      // or listen state event
      playerStateChanged() {
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        //console.log('example player 1 readied', player)
        player.currentTime(this.timeReady)
        // console.log('example 01: the player is readied', player)
      }
    },
    beforeDestroy() {
      console.log('componente destriudo y se quedo en ->'+this.player.currentTime())
    },
    // events:{
    //   'window.onbeforeunload': onbeforeunload_handler(){

    //   };
    // }
  }
</script>

<style >
.player{
    height: 100%;
    width: 100%;
}

.vjs-tech, .vjs-custom-skin{
  width: 100% !important;
  height: 100% !important;
}

.video-js {
  width: 100% ;
  height: 100% ;
  border-radius: 20px;
}



</style>

