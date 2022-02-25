<template>
  <div>
    <video-player class="vjs-custom-skin vjs-big-play-centered" 
                        :options="playerOptions" 
                        @ready="playerReadied">
          </video-player>
  </div>
</template>

<script>
  // custom skin css

  // videojs
  import { videoPlayer } from 'vue-video-player'
  import videojs from 'video.js'
  import 'video.js/dist/video-js.css'
  window.videojs = videojs
  // hls plugin for videojs6
  require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
  // export
  export default {
    name:"VideoHTTP",
    components: {
     videoPlayer
    },
    data() {
      return {
        playerOptions: {
          // videojs and plugin options
          height: '360',
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          poster: "https://promart.vteximg.com.br/arquivos/ids/427515-1000-1000/73949.jpg?v=637232632709230000"
        }
      }
    },
    methods: {
      playerReadied(player) {
        var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
        player.tech_.hls.xhr.beforeRequest = function(options) {
          // console.log(options)
          return options
        }
        console.log(hls)
      }
    }
  }
</script>