<template>
  <div class="bg-light">
    <div class="container-fluid">
      <!-- Primera sección -->
      <div class="row py-5">
        <!-- Detalles del curso -->
        <div class="col-lg-4 col-md-12 pr-5 detailsCourse">
          <h3 class="mb-4 font-weight-bold" :class="{ loader: !titulo, 'loader-titles': !titulo }">
            {{ titulo }}
          </h3>
          <template v-if="processPay">
            <Openpay :openpayData=openpayData></Openpay>
          </template>
          <ul class="pl-3 mb-5 list-unstyled">
            <li class="my-1" :class="{ loader: !level, 'loader-text-small': !level }">
              <i class="fas fa-chart-line mr-3"></i><strong>Nivel:</strong>
              {{ level }}
            </li>
            <li class="my-1" :class="{ loader: !categoria, 'loader-text-small': !categoria }">
              <i class="fas fa-bezier-curve mr-2"></i><strong>CategoríaAAA:</strong>
              {{ categoria }}
            </li>
          </ul>

          <div v-if="!isOwner" style="display: flex; flex-direction: column; align-items: flex-start;">
            <button v-if="this.courseFilter == false && this.precio == 0" class="btn-custom" @click="BuyCourse()" style="
              font-size: 18px;
              color: black;
              font-weight: 600;
              line-height: 1.5rem;
            " :class="{ loader: !titulo }">
              {{
            this.price_with_discount > 0
              ? "Comprar ahora $" + this.price_with_discount + ""
              : "Inscribete ahora"
          }}
            </button>

            <button v-if="this.courseFilter == false && this.precio > 0" class="btn-custom" data-toggle="modal"
              data-target="#paymentModal" style="
              font-size: 18px;
              color: black;
              font-weight: 600;
              line-height: 1.5rem;
            " :class="{ loader: !titulo }">
              {{
            this.price_with_discount > 0
              ? "Comprar ahora $" + this.price_with_discount + ""
              : "Inscribete ahora"
          }}
            </button>
            <button @click="shareURL" style="color: #28a745;"><img :src="require('@/assets/share-icon.png')" width="20" alt="share">Compartir curso</button>
          </div>
          <!--<div v-if="isOwner" style="display: flex; flex-direction: column; align-items: flex-start;">
             Botón para ver el curso 
            <button class="btn-custom" @click="viewMyCourse()" style="
              font-size: 18px;
              color: black;
              font-weight: 600;
              line-height: 1.5rem;
            " :class="{ loader: !titulo }">
              Ver mi curso
            </button>
          </div>-->
          <div v-if="isOwner" style="display: flex; flex-direction: column; align-items: flex-start;">
            <!-- Botón para ver el curso -->
            <button class="btn-custom" @click="goToCourse(pao_id)" style="
              font-size: 18px;
              color: black;
              font-weight: 600;
              line-height: 1.5rem;
            " :class="{ loader: !titulo }">
              Ver mi curso
            </button>
          </div>
          <div v-if="this.courseFilter == true">
            <button class="btn-custom" @click="GoCourse()">
              <span>
                Curso ya adquirido <br />
                Ir a Aprendisaje</span>
            </button>
          </div>
        </div>
        <!-- Imagen del curso -->
        <div class="col-lg-8 pr-0 pl-4" :class="{ loader: !videoimg, 'loader-img-course': !videoimg }"
          v-if="tymedia == 1">

          <!-- If player button is out of place, modify custom-theme.css in the library files and rebuild -->
          <video-player class="video-player-box" ref="videoPlayer" :options="playerOptions" :playsinline="true"
            customEventName="customstatechangedeventname" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)"
            @loadeddata="onPlayerLoadeddata($event)" @statechanged="playerStateChanged($event)" @ready="playerReadied">
          </video-player>
        </div>
        <div v-else class="col-lg-8 pr-0 pl-4" :class="{ loader: !img, 'loader-img-course': !img }">
          <img :src="img" class="img-course" />
        </div>
      </div>

      <!-- Seccion inferior -->
      <div class="row">
        <div class="col-lg-9 col-md-12 mt-4">
          <div class="border-box">
            <v-expansion-panels accordion v-if="isDetailsLoading">
              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  Descripción del curso
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  {{ descripcion }}
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  Acerca de este curso
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  {{ curso_detalle }}
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  ¿Qué aprenderás?
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  {{ aprendera }}
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  ¿Qué conocimientos previos necesitas?
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  {{ previos }}
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  ¿A quién está dirigido?
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  {{ dirigido }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-skeleton-loader v-else type="sentences@5"></v-skeleton-loader>
          </div>

          <!-- Lista -->
          <div>
            <h4 class="font-weight-bold my-5" :class="{ loader: isLoading, 'loader-text-small': isLoading }">
              Temario del curso
            </h4>
            <div v-if="isLoading" class="loader loader-temary"></div>
            <ul class="list-group" v-if="course">
              <li class="list-group-item" v-for="(model, index) in course.modules" :key="index">
                <span v-b-toggle="model.name.replace(/ /g, '')" class="cursor-pointer">
                  <strong> {{ index + 1 }}. {{ model.name }}</strong>
                </span>
                <b-collapse :visible="index === 0" :id="model.name.replace(/ /g, '')">
                  <ul class="list-unstyled">
                    <li v-for="(less, index) in course.modules[index].lessons" :key="index" class="my-4">
                      <div class="cursor-pointer" v-if="course.modules[0].lessons[0].id === less.id"
                        @click="getVideo(less.id)" data-toggle="modal" data-target="#video">
                        <i class="far fa-play-circle text-success mr-3"></i>{{ less.name }}
                      </div>
                      <div v-else>
                        <i class="fas fa-lock mr-3"></i>{{ less.name }}
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-3 col-md-12 mt-4 pr-0">
          <!-- Productor -->
          <v-card v-if="isDetailsLoading" elevation="1" class="rounded-lg" :class="[
            this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
              ? ''
              : 'avatar-productor',
          ]">
            <v-list>
              <v-list-item>
                <v-list-item-avatar width="80px" height="80px">
                  <v-img :src="imgProductor"> </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ nameProductor }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ emailProductor }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <v-skeleton-loader v-else type="list-item-avatar-two-line"></v-skeleton-loader>
          <!-- Recomendaciones -->
          <div class="mt-4">
            <h5 class="font-weight-bold my-3" :class="{
            loader: loadingRelated,
            'loader-text-small': loadingRelated,
          }">
              Recomendaciones
            </h5>
            <div v-if="loadingRelated">
              <div class="loader loader-card my-4"></div>
              <div class="loader loader-card my-4"></div>
              <div class="loader loader-card my-4"></div>
            </div>
            <div class="card-container">
              <!-- card course -->
              <div class="mb-4 cursor-pointer" v-for="course in courses1" :key="course.id">
                <Card :course="course" :cardType="1" :isMouseOverActive="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Video-Modal -->
      <div class="modal fade" id="video" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h3 class="modal-title text-white text-center" id="staticBackdropLabel">
                {{ titulo }}
              </h3>
            </div>
            <div class="modal-body">
              <div class="video">
                <Video v-if="renderVideo" />
                <div v-else class="center-spinner">
                  <b-spinner style="width: 3rem; height: 3rem" variant="secondary" label="Large Spinner"></b-spinner>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal payment -->
      <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">METODOS DE PAGO</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="closeModal()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <select class="custom-select" v-model="payment_method_id">
                <option v-for="item in paymentMethod" :label="item.name" :value="item.id" :key="item.id">{{ item.name }}
                </option>
              </select>

              <div class="form-group col-12 mb-0" v-if="payment_method_id == 5">
                <p style="font-weight: bold;">Saldo Billetera: $/ {{ saldoTotal }}</p>
                <p style="font-weight: bold;">Precio Curso: $/ {{ importeCurso }}</p>
              </div>
            </div>


            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal"
                @click.prevent="closeModal()">Salir</button>
              <button type="button" v-show="shouldDisplayBuyButton" @click="setBuyCourse()" class="btn btn-success">
                {{ loadingCourse ? 'Procesando...' : 'Comprar' }}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Video from "@/components/course/video";
import Card from "@/components/courses/cards";
import Openpay from "@/components/Buy/openpay.vue";
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'

import { mapState, mapActions } from "vuex";

export default {
  name: "VirtualClassroomBuyCursos",
  metaInfo() {
    return {
      title: this.titulo,
      meta: [
        {
          property: 'og:title',
          content: this.titulo
        },
        {
          property: 'og:description',
          content: this.descripcion
        },
        {
          property: 'og:image',
          content: this.img
        }
      ]
    };
  },
  props: ["ide"],
  data() {
    return {
      inactive: false,
      baseURL: "http://promolider.xyz/storage/",
      nameProductor: "",
      emailProductor: "",
      items: [],
      pao_id: null,
      price_with_discount: "",
      descripcion: "",
      level: "",
      img: "",

      titulo: "",
      curso_detalle: "",
      aprendera: "",
      previos: "",
      dirigido: "",
      lecciones: [],
      lecciones2: [],
      lecciones3: [],
      lecciones4: [],
      description: "",
      limite: 4,
      courses: [],
      courses1: [],
      loadingRelated: true,
      fecha_creacion: null,
      categoria: null,
      isDetailsLoading: false,
      courseFilter: null,
      imgProductor: null,
      isOwner: false,
      openpayData: [],
      processPay: false,
      videoimg: "",
      playerOptions: {
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
            src: ""
          },
        ],
        poster: "",
        controlBar: {
          durationDisplay: true,
          timeDivider: true,
        },
      },
      tymedia: 0,
      saldoTotal: 0,
      importeCurso: 0,
      paymentMethod: [],
      payment_method_id: 1,
      precio: 0,
      user_id: null,
      loadingCourse: false
    };
  },
  components: {
    Video,
    Card,
    Openpay,
    videoPlayer
  },
  computed: {
    shouldDisplayBuyButton() {
      if (
        (this.payment_method_id === 1) ||
        (this.payment_method_id === 5 && this.saldoTotal >= this.importeCurso)
      ) {
        return true;
      }
      return false;
    },
    player() {
      return this.$refs.videoPlayer.player
    },
    ...mapState("course", ["course", "renderVideo", "isLoading"]),
  },

  methods: {
    ...mapActions("course", {
      getCourse: "getCourse",
      getVideo: "getVideo",
      // buyCourse: "buyCourse",
    }),

    shareURL(){
      const url = window.location.href;
      navigator.clipboard.writeText(url)
        .then(() => {
          alert('URL copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    },

    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },

    onPlayerLoadeddata() { },

    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log('the player is readied', player)
    },

    closeModal() {
      this.payment_method_id = 1;
    },

    getWalletUser() {
      this.axios.get(`/reports/mymovements/${this.user_id}`)
        .then((response) => {
          
          this.saldoTotal = response.data.data.reduce((saldo, transaction) => {
           
            if (transaction.type == 1) {
              return saldo + transaction.amount;
            } else if (transaction.type == 0) {
              if (transaction.id_receiver===this.user_id) {
                return saldo + transaction.amount;
              } else {
                return saldo - transaction.amount;
              }
            }
            
            return saldo;
          }, 0);
          
        })
    },

    getPaymentMethod() {
      this.axios.get(`/config/payment-method/list-array`)
        .then(response => {
          this.paymentMethod = response.data.filter(data => !['Efectivo', 'Paypal', 'Transferencia'].includes(data.name));
        })
    },

    async goToCourse(id) {
      let dataRequest;

      try {
        // Obtener el tiempo de visualización del curso
        const response = await this.axios.get(`purchased/show-class-seen?course_id=${id}`);
        dataRequest = response.data.data;
        this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);

        if (!dataRequest.name) {
          // Si no hay nombre, obtener la primera clase del temario
          const responseTemary = await this.axios.get(`course/temary/get-all-class/${id}`);
          let firstClass = responseTemary.data.data.modules[0].lessons[0].name;
          this.$router.push({
            name: "curso",
            query: {
              course: id,
              class: firstClass,
              rate: this.course.ranking_by_user,
            }
          }).catch(() => {});
        } else {
          // Si hay nombre, redirigir a esa clase
          this.$router.push({
            name: "curso",
            query: {
              course: id,
              class: dataRequest.name,
              rate: this.course.ranking_by_user,
            }
          }).catch(() => {});
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    },
    
    async setBuyCourse() {
      this.loadingCourse = true;

      if (this.payment_method_id === 1) {
        await this.BuyCourse();
      } else if (this.payment_method_id === 5) {
        const form = {
          'id_course': this.pao_id,
          'user_id': this.user_id,
          'type_purchase': 2
        }
        this.axios.post("course/buy-purchased-course", form)
          .then((r) => {
            if (r.data.status === "ok") {
              this.$message.success('La compra se ha realizado con éxito')
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              console.log(r)
            }
          }).catch(error => {
            console.log('Ocurrio un error', error)
          }).finally(() => {
            this.loadingCourse = false;
          });
      }
    },

    // Redirección a la vista para comprar el curso
    async BuyCourse() {

      // if (this.precio === 0) {
      //   const { ok } = await this.buyCourse(this.pao_id);
      //   if (!ok) return;
      //   this.$router.push({ name: "suscription-user" });
      // } else {
      //   const form = {
      //     'course_id': this.pao_id,
      //     'price': this.price_with_discount
      //   }
      //   this.axios.post("/pay/course-openpay", form).then((r) => {
      //     this.openpayData = r.data;
      //     this.processPay = true;
      //   })
      // }

      const form = {
          'course_id': this.pao_id
        }
        this.axios.post("/pay/course-openpay", form).then((r) => {
          window.location.href = r.data.payment_url;
          // this.openpayData = r.data;
          // this.processPay = true;
        })
    },

    FilterBtn() {
      this.axios("course/purchased-courses").then((res) => {
        let idcourse = res.data.data;
        var id_course = idcourse.map(function (idcourse) {
          return idcourse.id;
        });
        this.courseFilter = id_course.some(
          (id_cours) => id_cours == this.$route.params.ide
        );
      });
    },

    GoCourse() {
      this.$router.push("/suscription-user");
    },

    // Obtenemos todos lo atributos necesarios para mostrar del curso
    getAttributes() {
      this.pao_id = this.$route.params.ide;

      // API para obtener los detalles
      this.axios.get("course/details/" + this.pao_id).then((datos) => {

        this.items = datos.data.data;
        this.precio = this.items.price;
        this.price_with_discount = this.items.price_with_discount;
        this.importeCurso = this.items.price_with_discount;
        this.isOwner = this.items.owner;

        console.log("AAAA:", datos.data.data);

        // Obtenemos el nivel del curso
        switch (this.items.course_level_id) {
          case 1:
            this.level = "Básico";
            break;
          case 2:
            this.level = "Intermedio";
            break;
          case 3:
            this.level = "Avanzado";
            break;
        }
        this.videoimg = this.items.path_url;

        if (this.videoimg.toLowerCase().endsWith(".mp4")) {
          // Es un video
          this.tymedia = 1;
          this.$set(this.playerOptions.sources, 0, {
            type: "video/mp4",
            src: this.videoimg,
          });
        } else {
          this.tymedia = 2;
          this.img = this.items.path_url;
        }

        this.titulo = this.items.title;
        this.descripcion = this.items.description;
        this.curso_detalle = this.items.course_about;
        this.aprendera = this.items.will_learn;
        this.previos = this.items.prev_knowledge;
        this.dirigido = this.items.course_for;
        this.isDetailsLoading = true;

        // Convertimos la fecha en formato (12 de mayo del 2022)
        const fecha = new Date(this.items.created_at);
        let options = { year: "numeric", month: "long", day: "numeric" };
        this.fecha_creacion = fecha.toLocaleDateString("es-ES", options);

        // Obtenemos la categoria del curso que corresponde al id de la respuesta
        this.axios.get("category/list").then((res) => {
          console.log("CATEGORIAAAAS", res.data.data)
          for (const index in res.data.data) {
            if (res.data.data[index].id == this.items.id_categories) {
              this.categoria = res.data.data[index].name;
              this.user_id = res.data.status.id;
              this.getWalletUser();
            }
          }
        });

        // Obtenemos los datos del productor
        this.axios.get(`user/show?id=${this.items.user_id}`).then((res) => {
          this.nameProductor = res.data.fullName;
          this.emailProductor = res.data.email;
          this.imgProductor = res.data.photo;

          console.log("EEEEEE: ", res.data.fullName);
        });
      });

      // Obtenemos algunos cursos similares para recomendar
      this.axios.get("course/related-courses").then((datos) => {
        this.lord = false;
        this.guardar = true;
        this.loading = false;
        this.mostrar = true;
        this.courses = datos.data.data;
        this.courses1 = this.courses.slice(0, 3);
        this.loadingRelated = false;
      });
    },
  },
  watch: {
    ide() {
      this.getAttributes();
    },
  },
  mounted() {
  },
  created() {


    // Llamamos a la funcion que trae los atributos
    this.getAttributes();
    // Obtenemos el temario del curso
    this.getCourse(this.$route.params.ide);

    this.FilterBtn();

    this.getPaymentMethod();
  },
};
</script>

<style scoped>
.avatar-productor {
  width: 300px;
}

.container-fluid {
  width: 97%;
  margin-inline: auto;
  padding-bottom: 50px;
  background-image: none !important;
}

.title-course {
  text-transform: uppercase;
}

.img-course {
  width: 100%;
  max-width: 900px;
  max-height: 427px;
  border-radius: 25px;
}

.img-card {
  width: 100%;
  border-radius: 25px 25px 0px 0;
  height: 50%;
}

@media (max-width: 700px) and (min-width: 577px) {
  .img-card {
    height: 40%;
  }
}

.img-productor {
  width: 100% !important;
  height: 100% !important;
  max-width: 100px;
  max-height: 100px;
}

.list-group {
  padding-left: 0;
  border-radius: 25px;
}

.video {
  width: 100%;
  margin: auto;
  height: 600px;
}

.puntuacion {
  font-size: 1.04rem;
}

.detalles p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 1800px) {
  .container-fluid {
    width: 76%;
  }
}

@media (max-width: 1500px) {
  .detalles {
    font-size: 10px;
  }
}

@media (max-width: 1200px) {
  .img-productor {
    width: 70% !important;
    height: 80% !important;
  }
}

@media (max-width: 991px) {
  .loader-img-course {
    display: none !important;
  }

  .img-course {
    display: none !important;
  }

  .detailsCourse {
    display: flex;
    flex-direction: column;
    justify-content: center !important;
    text-align: center !important;
    padding-right: 1rem !important;
  }

  .detailsCourse p {
    text-align: center !important;
  }

  p {
    padding-right: 0 !important;
  }

  .cardCursos {
    width: 40% !important;
    flex: none !important;
  }

  .card-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .detalles {
    font-size: 20px;
  }
}

@media (max-width: 576px) {
  .img-productor {
    width: 155% !important;
    margin-left: 0 !important;
  }

  .productor {
    display: flex !important;
    flex-direction: row !important;
  }

  .productor .image {
    width: 20% !important;
  }

  .productor .detalles {
    width: 80% !important;
  }

  .cardCursos {
    width: 100% !important;
    flex: none !important;
  }
}

/* Animaciones de carga para cada elemento */

.loader-titles {
  height: 40px;
  width: 100%;
}

.loader-descriptions {
  height: 50px;
}

.loader-text-small {
  height: 30px;
  width: 70%;
}

.loader-card {
  height: 300px;
}

.loader-temary {
  height: 800px;
}

.loader-img-productor {
  height: 100%;
  width: 100%;
}

.loader-img-course {
  height: 427px;
}
</style>
