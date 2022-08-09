<template>
  <div :key="cardRender">
    <div class="row">
      <div class="col-md-12 col-lg-12 pb-0">
        <p class="text-left text-white course-details-p">Valoraciones</p>
      </div>

      <!-- Imagen -->
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
        <img
          class="same-image-size"
          :src="allRating['course'].url_portada"
          style="margin-left: 20px"
        />
      </div>

      <!-- Detalles -->
      <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12">
        <div class="row" style="padding: 0">
          <div class="col-md-12 col-sm-12 col-xs-12 border-left mt-3">
            <img
              class="small-image"
              :src="allRating['productor'].photo"
              style="margin-left: 20px"
            />
            <p class="text-left text-white course-details-p-small">
              Creado por <strong>{{ allRating["productor"].fullName }}</strong>
            </p>

            <div v-if="avg != 0" style="margin-left: 30px" class="mt-3">
              <v-icon color="#19e800">mdi-star</v-icon>

              <p class="text-left text-white course-details-p-small">
                {{ avg }}
              </p>

              <v-rating
                style="display: inline"
                color="warning"
                hover
                readonly
                length="5"
                size="15"
                :value="avg"
                half-increments
              ></v-rating>

              <p class="text-white califications">
                ({{ allRating["rates"].length }} calificaciones)
              </p>
            </div>

            <div v-else style="margin-left: 30px" class="mt-3">
              <v-icon color="#19e800">mdi-star</v-icon>
              <p class="text-left text-white course-details-p-small">
                Aún no hay valoraciones.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-lg-12 pb-0">
        <p class="text-left text-white course-details-p">
          {{ allRating["rates"].length }} Comentarios
        </p>
      </div>
    </div>

    <!-- Publicar comentario -->
    <v-list-item three-line style="width: 100%; padding-top: 20px">
      <v-list-item-avatar>
        <v-img :src="img"></v-img>
      </v-list-item-avatar>
      <v-container>
        <v-form @submit.prevent="sendRating()" ref="form" lazy-validation>
          <v-row>
            <v-col
              md="8"
              xs="12"
              style="margin-bottom: 0px; padding-bottom: 0px"
            >
              <v-text-field
                class="text-green"
                color="#19e800"
                label="Escribe un comentario..."
                v-model="newRating.commentary"
                clearable
                outlined
                dark
                required
              ></v-text-field>
            </v-col>

            <v-col
              md="4"
              sm="12"
              style="margin-bottom: 0px; padding-bottom: 0px"
            >
              <v-rating
                style="margin-left: -20px"
                color="warning"
                hover
                length="5"
                size="25"
                v-model="newRating.rate"
                half-increments
              ></v-rating>
            </v-col>

            <v-col cols="12" style="margin-top: 0px; padding-top: 0px">
              <!-- Alertas -->
              <v-alert
                border="left"
                dense
                colored-border
                v-model="alert"
                dismissible
                elevation="11"
                type="warning"
                >{{ alertMessage }}</v-alert
              >
              <v-alert
                dense
                colored-border
                border="left"
                v-model="alert2"
                dismissible
                elevation="11"
                type="success"
                >{{ alertMessage }}</v-alert
              >
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-list-item>

    <!-- <div
      class="d-flex justify-content-center align-items-center py-5"
      v-if="isLoadingRating"
    >
      <v-progress-circular indeterminate color="grey"></v-progress-circular>
    </div> -->

    <!-- <div
      v-if="isLoadingRating === false && allRating['rates'].length === 0"
      class="no-result center-element py-3"
    >
      <span>Aún no hay valoraciones del curso</span>
    </div> -->
    <v-list
      class="content-comments"
      v-if="isLoadingRating === false && allRating['rates'].length > 0"
      three-line
      color="#131b1e"
    >
      <template v-for="(i, index) in comments">
        <v-list-item class="pt-1" :key="index">
          <v-container>
            <v-row>
              <v-col cols="1">
                <v-list-item-avatar>
                  <v-img :src="i.photo"></v-img>
                </v-list-item-avatar>
              </v-col>

              <v-col cols="11">
                <v-row>
                  <!-- Nombre y Fecha -->
                  <v-col cols="12" style="padding: 20px 0 0 20px">
                    <p
                      class="text-white"
                      style="display: inline; font-weight: 600; font-size: 1em"
                    >
                      {{ i.name }}
                    </p>
                    <p
                      style="
                        display: inline;
                        font-weight: 500;
                        margin-left: 20px;
                        color: #7a7d86;
                        font-size: 1em;
                      "
                    >
                      {{ date(i.created_at) }}
                    </p>
                  </v-col>
                  <!-- Comentario -->
                  <v-col cols="12" style="padding: 0 0 0 20px">
                    <v-list-item-subtitle class="text-white">
                      <v-card-text style="padding: 0">
                        <vue-show-more-text
                          :text="i.commentary"
                          :lines="2"
                          more-text="Ver más.."
                          less-text="Ocultar"
                          additional-container-css="padding: 8px 0  0 0; width: 100% !important ; text-align: justify;"
                          additional-anchor-css="color: green; text-decoration: none; width: 80px; margin:  0  0 0 auto; padding: 0"
                        />
                      </v-card-text>
                    </v-list-item-subtitle>
                  </v-col>
                  <v-col cols="12" style="padding-top: 0px; margin-top: 0px">
                    <v-rating
                      color="warning"
                      hover
                      readonly
                      length="5"
                      size="15"
                      :value="i.rate"
                      half-increments
                    ></v-rating>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import vueShowMoreText from "vue-show-more-text";
import moment from "moment";
export default {
  components: {
    vueShowMoreText,
  },
  data() {
    return {
      alert: false,
      alert2: false,
      alertMessage: "",
      cardRender: 0,
      img: localStorage.getItem("photo_user"),
      useId: "",
      comentarios: [],
      newRating: {
        course_id: "",
        commentary: "",
        rate: 0,
      },
    };
  },
  computed: {
    ...mapState("course", [
      "allRating",
      "lesson",
      "course_active",
      "isLoadingRating",
      "courseRating",
    ]),
    ...mapGetters("course", ["getRating"]),

    comments() {
      return this.getRating;
    },
    avg() {
      if (this.getRating === undefined) {
        return 0;
      }

      if (this.getRating.length === 0) {
        return 0;
      }

      let finalArray = this.getRating.map(function (obj) {
        return obj.rate;
      });

      const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

      return average(finalArray);
    },
  },

  methods: {
    ...mapActions("course", ["setRating"]),
    ...mapActions("course", { getRating2: "getRating" }),
    // Funcion para el envio de mensajes

    async sendRating() {
      if (this.validationRating()) {
        this.newRating.course_id = this.$route.query.course;

        if (this.newRating.course_id != undefined) {
          await this.setRating(this.newRating);
          await this.getRating2(this.$route.query.course);
          this.alertMessage = "Gracias por valorar este curso!";
          this.alert2 = true;
          this.newRating.commentary = "";
          this.newRating.rate = 0;
        }
      }
    },

    validationRating() {
      if (this.newRating.commentary === "" && this.newRating.rate === 0) {
        this.alertMessage = "Escriba un comentario y deje una valoración";
        this.alert = true;
        return false;
      }

      if (this.newRating.commentary === "") {
        this.alertMessage = "Comentario vacío! Escriba un comentario";
        this.alert = true;
        return false;
      }

      if (this.newRating.commentary === 0) {
        this.alertMessage = "Valoracion 0 estrellas! Debe ser mayor a 0";
        this.alert = true;
        return false;
      }
      return true;
    },
    forceRerender() {
      this.cardRender = this.cardRender + 1;
    },
    date(dt) {
      return moment(dt).format("DD-MM-YYYY");
    },
    parseRate(dt) {
      return parseFloat(dt);
    },
  },
};
</script>

<style scoped>
@import "./style.css";
/*Container text vueShowMoreText */
.container {
  max-width: 100% !important;
  margin: 0;
}

.course-details-p {
  padding-left: 20px;
  padding-top: 20px;
  font-size: 1.3em;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
.pb-0 {
  padding-bottom: 0px !important;
  margin-bottom: 0px !important;
}
.course-details-p-small {
  font-size: 1em;
  display: inline;
  padding-left: 20px;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.califications {
  font-size: 0.8em;
  display: inline;
  letter-spacing: 1px;
}
.same-image-size {
  width: 200px; /* You can set the dimensions to whatever you want */
  height: 120px;
  object-fit: cover;
}
.small-image {
  width: 50px; /* You can set the dimensions to whatever you want */
  height: 50px;
  object-fit: cover;
  border-radius: 30px;
}
</style>
