<template>
    <div>
        <template v-if="loading">
            <div class="text-center">
                <v-progress-circular indeterminate color="success">
                </v-progress-circular>
            </div>
        </template>
        <VueUnity v-if="!loading && visible" class=" unity-canvas rounded-0" :unity="unityContext" :width="'100%'" :height="'60vh'"/> <br><br>
        <!-- <v-simple-table dark>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            #
                        </th>
                        <th class="text-left">
                            Alumno
                        </th>
                        <th class="text-left">
                            Puntaje
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Tony</td>
                        <td>4500</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table> -->
    </div>
    </template>
    
    <script>
    import UnityWebgl from 'unity-webgl'
    import VueUnity from 'unity-webgl/vue'
    import { mapActions } from "vuex";
    const Unity = new UnityWebgl({
        loaderUrl: '/Build/wordWheel/web2.loader.js',
        dataUrl: "/Build/wordWheel/web2.data",
        frameworkUrl: "/Build/wordWheel/web2.framework.js",
        codeUrl: "/Build/wordWheel/web2.wasm",
    })
    
    Unity.on('device', () => alert('click device ...'));
    export default {
        props:['data'],
        components: {
            VueUnity
        },
        data() {
            return {
                unityContext: Unity,
                loading: true,
                datos: null,
                visible:true,
                originalLog:console.log
                
            }
        },
        mounted() {
            this.cargarDatos();
        },
        beforeDestroy(){
            Unity.unload();
                    self.visible=false;
                    console.log=this.originalLog;
        },
        methods: {
            ...mapActions("course", ["sendAnswersCards"]),
            async cargarDatos() {
                // await this.axios.get(`/course/dinamicas/datos/${this.$route.query.gameid}`).then((r) => {
                    await this.axios.get(`/course/dinamicas/datos/${this.data.game.id}`).then((r) => {
                    console.log(r.data.data);
                    if (r.data.length == 0) {
                        this.loading = false;
                        this.datos = [];
                        alert("no hay datos");
                    } else {
                        this.datos = JSON.stringify(r.data);
                        this.loading=false;
                        setTimeout(this.consumirAPI, 10000);
                        
                    }
                }) ;
                
            },
    
            consumirAPI(){
                Unity.send('JavaScriptJson','setString',this.datos);
                this.originalLog=console.log;
                let self=this;
            console.log=function(){
                if(arguments[0].includes('Puntos')){
                    let scoreData=arguments[0].match(/\d+(\.\d+)?/g);
                    
                    self.sendAnswersCards({
            data: true,
            achieved_points:parseInt(scoreData[0]),
            tiempo: parseFloat(scoreData[1]).toFixed(2) ,
            productor_id: 1,
            game_type: "wordWheel",
            course_game_id: self.$route.params.id
          });



 self.originalLog.apply(console, [ arguments[0] ]);

                    
                }
                if(arguments[0].includes('juegoterminado')){
                    Unity.unload();
                    self.visible=false;
                    console.log=self.originalLog;
                }
                

            }
            },
        },
    }
    // var container = document.querySelector("#unity-container");
    // var canvas = document.querySelector("#unity-canvas");
    // var loadingBar = document.querySelector("#unity-loading-bar");
    // var progressBarFull = document.querySelector("#unity-progress-bar-full");
    // var fullscreenButton = document.querySelector("#unity-fullscreen-button");
    // var warningBanner = document.querySelector("#unity-warning");
    
    // function unityShowBanner(msg, type) {
    // function updateBannerVisibility() {
    //     warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    // }
    // var div = document.createElement('div');
    // div.innerHTML = msg;
    // warningBanner.appendChild(div);
    // if (type == 'error') div.style = 'background: red; padding: 10px;';
    // else {
    //     if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
    //     setTimeout(function() {
    //     warningBanner.removeChild(div);
    //     updateBannerVisibility();
    //     }, 5000);
    // }
    // updateBannerVisibility();
    // }
    
    // var buildUrl = "Build/treasureHunter";
    // var loaderUrl = buildUrl + "/Treasure Hunter.loader.js";
    // var config = {
    // dataUrl: buildUrl + "/Treasure Hunter.data",
    // frameworkUrl: buildUrl + "/Treasure Hunter.framework.js",
    // codeUrl: buildUrl + "/Treasure Hunter.wasm",
    // streamingAssetsUrl: "StreamingAssets",
    // companyName: "CHEGO_WEP",
    // productName: "Treasure Hunter",
    // productVersion: "1.0",
    // showBanner: unityShowBanner,
    // };
    
    // if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // // Mobile device style: fill the whole browser client area with the game canvas:
    
    // var meta = document.createElement('meta');
    // meta.name = 'viewport';
    // meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    // document.getElementsByTagName('head')[0].appendChild(meta);
    // container.className = "unity-mobile";
    
    // // To lower canvas resolution on mobile devices to gain some
    // // performance, uncomment the following line:
    // // config.devicePixelRatio = 1;
    
    // canvas.style.width = window.innerWidth + 'px';
    // canvas.style.height = window.innerHeight + 'px';
    
    // unityShowBanner('WebGL builds are not supported on mobile devices.');
    // } else {
    // // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:
    
    // canvas.style.width = "1280px";
    // canvas.style.height = "720px";
    // }
    
    // loadingBar.style.display = "block";
    
    // var script = document.createElement("script");
    // script.src = loaderUrl;
    // script.onload = () => {
    // createUnityInstance(canvas, config, (progress) => {
    //     progressBarFull.style.width = 100 * progress + "%";
    // }).then((unityInstance) => {
    //     loadingBar.style.display = "none";
    //     fullscreenButton.onclick = () => {
    //     unityInstance.SetFullscreen(1);
    //     };
    // }).catch((message) => {
    //     alert(message);
    // });
    // };
    // document.body.appendChild(script);
    </script>
    