<template>
  <div class="bg-light">
    <div class="container-fluid">
      <div class="row py-5">
        <div class="col-12 col-lg-4 course-details">
          <h3 class="mb-4 font-weight-bold" :class="{ loader: !titulo, 'loader-titles': !titulo }">
            {{ titulo }}
          </h3>
          <template v-if="processPay">
            <Openpay :openpayData="openpayData"></Openpay>
          </template>

          <div class="action-buttons" :class="{ 'text-center': $vuetify.breakpoint.smAndDown }">
            <template v-if="!isOwner">
              <button v-if="courseFilter == false && precio == 0" class="btn-custom" @click="inscribirCursoGratis()"
                :class="{ loader: !titulo }">
                Inscribirse Gratis
              </button>

              <button v-if="courseFilter == false && precio > 0" class="btn-custom" data-toggle="modal"
                data-target="#paymentModal" :class="{ loader: !titulo }">
                {{
                  price_with_discount > 0
                    ? `Comprar ahora $${price_with_discount}`
                    : "Inscribete ahora"
                }}
              </button>

              <button @click="shareURL" class="share-button">
                <img :src="require('@/assets/share-icon.png')" width="20" alt="share" />
                Compartir Libro
              </button>
            </template>

            <template v-else>
              <button class="btn-custom" @click="goToCourse(pao_id)" :class="{ loader: !titulo }">
                Ver mi libro
              </button>
            </template>

            <template v-if="courseFilter">
              <button class="btn-custom" @click="GoCourse()">
                <span>Libro ya adquirido<br />Ir a Aprendizaje</span>
              </button>
            </template>
          </div>
        </div>

        <div class="col-12 col-lg-8 course-media">
          <div class="image-container" :class="{ loader: !img, 'loader-img-course': !img }">
            <img :src="img" class="course-image" :alt="titulo" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-9 col-md-12 mt-4">
          <div class="border-box">
            <v-expansion-panels accordion v-if="isDetailsLoading">
              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  Descripción del libro
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  {{ descripcion }}
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  Acerca de este libro
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
                  ¿A quién está dirigido?
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  {{ dirigido }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-skeleton-loader v-else type="sentences@5"></v-skeleton-loader>
          </div>
        </div>

        <div class="col-lg-3 col-md-12 mt-4">
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
        </div>
      </div>

      <div class="modal fade" id="paymentModal" ref="paymentModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                MÉTODOS DE PAGO
              </h5>
              <button type="button" class="close" @click="closePaymentModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <select class="custom-select" v-model="payment_method_id">
                <option v-for="item in paymentMethod" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>

              <div class="form-group col-12 mb-0" v-if="payment_method_id == 5">
                <p class="font-weight-bold">
                  Saldo Billetera: $/ {{ saldoTotal }}
                </p>
                <p class="font-weight-bold">
                  Precio Curso: $/ {{ importeCurso }}
                </p>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closePaymentModal">
                Salir
              </button>
              <button type="button" v-show="shouldDisplayBuyButton" @click="setBuyCourse" class="btn btn-success"
                :disabled="loadingCourse">
                {{ loadingCourse ? "Procesando..." : "Comprar" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Openpay from "@/components/Buy/openpay.vue";
import { mapState, mapActions } from "vuex";
import $ from "jquery";

export default {
  name: "VirtualClassroomBuyCursos",
  metaInfo() {
    return {
      title: this.titulo,
      meta: [
        {
          property: "og:title",
          content: this.titulo,
        },
        {
          property: "og:description",
          content: this.descripcion,
        },
        {
          property: "og:image",
          content: this.img,
        },
      ],
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
      showRecommendations: true,
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
            src: "",
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
      showModal: false,
      user_id: null,
      loadingCourse: false,
    };
  },
  components: {
    Openpay,
  },
  computed: {
    shouldDisplayBuyButton() {
      if (
        this.payment_method_id === 1 ||
        (this.payment_method_id === 5 && this.saldoTotal >= this.importeCurso)
      ) {
        return true;
      }
      return false;
    },
    player() {
      return this.$refs.videoPlayer.player;
    },
    ...mapState("course", ["course", "renderVideo", "isLoading"]),

    filteredRecommendations() {
      if (!this.courses || !this.pao_id) return [];

      return this.courses
        .filter((course) => course.id !== parseInt(this.pao_id))
        .slice(0, 3);
    },

    shouldShowRecommendations() {
      return !this.isOwner && !this.courseFilter && this.showRecommendations;
    },
  },

  methods: {
    ...mapActions("course", {
      getCourse: "getCourse",
      getVideo: "getVideo",
    }),

    shareURL() {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    },

    onPlayerPlay(player) {
      console.log("player play!", player);
    },

    onPlayerPause(player) {
      console.log("player pause!", player);
    },

    onPlayerLoadeddata() { },

    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
    },

    playerReadied(player) {
      console.log("the player is readied", player);
    },

    closeModal() {
      this.payment_method_id = 1;
    },

    getWalletUser() {
      this.axios
        .get(`/reports/mymovements/${this.user_id}`)
        .then((response) => {
          try {
            this.saldoTotal = response.data.data.reduce(
              (saldo, transaction) => {
                if (transaction.status === 1 || transaction.status === 0) {
                  if (transaction.type === 1) {
                    return saldo + transaction.amount;
                  } else if (transaction.type === 0) {
                    if (transaction.id_receiver === this.user_id) {
                      return saldo + transaction.amount;
                    } else {
                      return saldo - transaction.amount;
                    }
                  }
                }
                return saldo;
              },
              0
            );
          } catch (error) {
            console.error("Error al calcular el saldo:", error);
            this.saldoTotal = 0;
            this.$message.error("Error al calcular el saldo de la billetera");
          }
        })
        .catch((error) => {
          console.error("Error al obtener movimientos:", error);
          this.saldoTotal = 0;
          this.$message.error(
            "Error al obtener los movimientos de la billetera"
          );
          console.error("Detalles completos:", JSON.stringify(error, null, 2));
        });
    },

    getPaymentMethod() {
      this.axios.get(`/config/payment-method/list-array`).then((response) => {
        this.paymentMethod = response.data.filter(
          (data) => !["Efectivo", "Paypal", "Transferencia"].includes(data.name)
        );
      });
    },

    async goToCourse(id) {
      let dataRequest;

      try {
        const response = await this.axios.get(
          `purchased/show-class-seen?course_id=${id}`
        );
        dataRequest = response.data.data;
        this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);

        if (!dataRequest.name) {
          const responseTemary = await this.axios.get(
            `course/temary/get-all-class/${id}`
          );
          let firstClass = responseTemary.data.data.modules[0].lessons[0].name;
          this.$router
            .push({
              name: "curso",
              query: {
                course: id,
                class: firstClass,
                rate: this.course.ranking_by_user,
              },
            })
            .catch(() => { });
        } else {
          this.$router
            .push({
              name: "curso",
              query: {
                course: id,
                class: dataRequest.name,
                rate: this.course.ranking_by_user,
              },
            })
            .catch(() => { });
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    },

    async setBuyCourse() {
      try {
        this.loadingCourse = true;
        console.log("Iniciando proceso de compra...");

        if (this.payment_method_id === 1) {
          await this.BuyCourse();
        } else if (this.payment_method_id === 5) {
          if (this.saldoTotal < this.importeCurso) {
            this.closePaymentModal();
            this.$message.error("Saldo insuficiente en la billetera");
            return;
          }

          const form = {
            course_id: this.pao_id,
            user_id: this.user_id,
            type_purchase: 2,
          };

          console.log("Enviando solicitud de compra:", form);

          const response = await this.axios.post(
            "course/buy-purchased-course",
            form
          );
          console.log("Respuesta recibida:", response.data);

          const verificacionCurso = await this.axios.get(
            "course/purchased-courses"
          );
          const cursosComprados = verificacionCurso.data.data;
          const cursoYaComprado = cursosComprados.some(
            (curso) => curso.id === this.pao_id
          );

          if (cursoYaComprado) {
            this.closePaymentModal();
            this.courseFilter = true;
            this.$message.success("El curso ya está en tu biblioteca");
            setTimeout(() => {
              this.$router.push("/suscription-user");
            }, 1500);
            return;
          }

          if (response.data && response.data.status === "ok") {
            await this.getWalletUser();
            this.closePaymentModal();
            this.courseFilter = true;
            this.$message.success("La compra se ha realizado con éxito");

            setTimeout(() => {
              this.$router.push("/suscription-user");
            }, 1500);
          } else {
            throw new Error(
              response.data?.message || "Error desconocido en la compra"
            );
          }
        }
      } catch (error) {
        console.error("Error completo:", error);
        console.error("Detalles de la respuesta:", error.response?.data);

        if (
          error.response?.status === 200 ||
          (error.response?.data?.message &&
            error.response?.data?.message.includes("ya adquirido"))
        ) {
          this.closePaymentModal();
          this.courseFilter = true;
          await this.FilterBtn();
          this.$message.info("El curso ya ha sido adquirido");
          setTimeout(() => {
            this.$router.push("/suscription-user");
          }, 1500);
        } else {
          this.$message.error(
            error.response?.data?.message ||
            error.message ||
            "Ocurrió un error al procesar la compra"
          );
        }
      } finally {
        this.loadingCourse = false;
      }
    },

    closePaymentModal() {
      try {
        if (this.$refs.paymentModal) {
          $(this.$refs.paymentModal).modal("hide");
          $(".modal-backdrop").remove();
          $("body").removeClass("modal-open").css("padding-right", "");
        }
      } catch (error) {
        console.error("Error al cerrar el modal:", error);
      }
    },

    openPaymentModal() {
      try {
        if (this.$refs.paymentModal) {
          $(this.$refs.paymentModal).modal("show");
        }
      } catch (error) {
        console.error("Error al abrir el modal:", error);
      }
    },

    async inscribirCursoGratis() {
      try {
        this.$store.commit("course/SET_LOADING", true);

        const form = {
          course_id: this.pao_id,
          type_purchase: 3,
          user_id: this.user_id,
        };

        const response = await this.axios.post(
          "course/buy-purchased-course",
          form
        );

        if (response.data.status === "ok") {
          this.$message.success("Te has inscrito exitosamente al curso");
          setTimeout(() => {
            this.$router.push("/suscription-user");
          }, 1500);
        } else {
          if (response.status === 200) {
            this.$message.info("Ya estás inscrito en este curso");
            setTimeout(() => {
              this.$router.push("/suscription-user");
            }, 1500);
          } else {
            throw new Error(
              response.data.message || "Error al inscribirse al curso"
            );
          }
        }
      } catch (error) {
        console.error("Error completo al inscribirse al curso:", error);

        if (error.response?.status === 200) {
          this.$message.info("Ya estás inscrito en este curso");
          setTimeout(() => {
            this.$router.push("/suscription-user");
          }, 1500);
        } else {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Ocurrió un error al inscribirse al curso";
          this.$message.error(errorMessage);
        }
      } finally {
        this.$store.commit("course/SET_LOADING", false);
      }
    },

    async BuyCourse() {
      try {
        const form = {
          course_id: this.pao_id,
        };
        const response = await this.axios.post("/pay/course-openpay", form);
        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
        } else {
          throw new Error("No se recibió la URL de pago");
        }
      } catch (error) {
        console.error("Error al procesar el pago:", error);
        this.$message.error(
          "Ocurrió un error al procesar el pago. Por favor, intente nuevamente."
        );
      }
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

    getAttributes() {
      this.pao_id = this.$route.params.ide;
      this.axios.get("course/details/" + this.pao_id).then((datos) => {
        this.items = datos.data.data;
        this.precio = this.items.price;
        this.price_with_discount = this.items.price_with_discount;
        this.importeCurso = this.items.price_with_discount;
        this.isOwner = this.items.owner;
        this.showRecommendations = !this.items.owner;

        console.log("AAAA:", datos.data.data);

        this.img = this.items.path_url;

        this.titulo = this.items.title;
        this.descripcion = this.items.description;
        this.curso_detalle = this.items.course_about;
        this.aprendera = this.items.will_learn;
        this.dirigido = this.items.course_for;
        this.isDetailsLoading = true;

        const fecha = new Date(this.items.created_at);
        let options = { year: "numeric", month: "long", day: "numeric" };
        this.fecha_creacion = fecha.toLocaleDateString("es-ES", options);

        this.axios.get(`user/show?id=${this.items.user_id}`).then((res) => {
          this.nameProductor = res.data.fullName;
          this.emailProductor = res.data.email;
          this.imgProductor = res.data.photo;
        });
      });
    },
  },
  watch: {
    ide() {
      this.getAttributes();
    },
  },
  mounted() { },
  created() {
    this.getAttributes();
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

.course-details {
  padding: 1rem;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.btn-custom {
  width: 100%;
  max-width: 300px;
  font-size: 18px;
  color: black;
  font-weight: 600;
  line-height: 1.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.share-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #28a745;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.course-media {
  padding: 1rem;
}

.video-container {
  position: relative;
  cursor: pointer;
}

:deep(.video-js .vjs-big-play-button) {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid white;
  background-color: rgba(43, 51, 63, 0.7);
  height: 80px;
  width: 80px;
  border-radius: 50%;
  line-height: 75px;
  font-size: 40px;
  transition: all 0.3s ease;
}

:deep(.video-js:hover .vjs-big-play-button) {
  background-color: rgba(43, 51, 63, 0.9);
  transform: translate(-50%, -50%) scale(1.1);
}

:deep(.video-js) {
  cursor: pointer;
}

:deep(.video-js .vjs-big-play-button .vjs-icon-placeholder:before) {
  line-height: 75px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.image-container {
  width: 100%;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

:deep(.video-js:hover) {
  cursor: pointer;
}

.video-container,
.course-image {
  width: 100%;
  height: auto;
  max-height: 427px;
  object-fit: cover;
  display: block;
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

@media (max-width: 1199px) {
  .course-details {
    text-align: center;
  }

  .action-buttons {
    align-items: center;
  }
}

@media (max-width: 991px) {
  .course-media {
    order: -1;
    margin-bottom: 2rem;
  }

  .course-details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .video-container,
  .image-container {
    max-width: 100%;
    margin: 0 auto;
  }
}

@media (max-width: 576px) {
  .container-fluid {
    width: 100%;
    padding: 1rem;
  }

  .course-image {
    max-height: 300px;
  }

  .btn-custom {
    width: 100%;
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

.loader {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.loader-titles {
  height: 40px;
  width: 100%;
}

.loader-text-small {
  height: 30px;
  width: 70%;
}

.loader-img-course {
  height: 427px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.loader-descriptions {
  height: 50px;
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
</style>
