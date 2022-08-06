<template>
  <div :key="cardRender">
    <div class="row">
      <div class="col-md-12">
        <p
          class="text-left text-white p-3"
          style="font-size: 1.3em; padding-bottom: 0 px"
        >
          Comentarios
        </p>
        <div class="ml-5">
          <img :src="S3_PATH + allRating[0].url_portada" width="200" />
        </div>
      </div>

      <div class="col-md-12 text-white">
        <p
          class="text-left text-white"
          style="font-size: 1.3em; display: inline; padding-left: 20px"
        >
          {{ avg }}
        </p>
        <v-rating
          style="display: inline"
          color="warning"
          hover
          readonly
          length="5"
          size="20"
          :value="avg"
          half-increments
        ></v-rating>
      </div>
    </div>

    <v-list-item class="pt-1">
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">
          <h4 class="display-6">Comentarios</h4>
        </v-list-item-title>

        <v-list-item-title class="font-weight-bold">
          <h4 class="display-6" v-if="avg != 0">
            Puntaje promedio : {{ avg }}
          </h4>
          <div v-else>
            <h4 class="display-6">
              !Sé el primero en comentar y valorar el curso!
            </h4>
          </div>
        </v-list-item-title>

        <v-list-item-subtitle>
          <v-rating
            color="warning"
            hover
            readonly
            length="5"
            size="40"
            :value="avg"
            half-increments
          ></v-rating>
        </v-list-item-subtitle>

        <v-list-item-subtitle class="font-weight-bold">
          <span>Valoracion del Curso </span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <!-- <v-list-item three-line style="width: 100%; padding-top: 20px">
      <v-list-item-avatar>
        <v-img :src="img"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-form @submit.prevent="sendRating()" ref="form" lazy-validation>
          <v-text-field
            label="Escribe un comentario..."
            v-model="newRating.commentary"
            clearable
            outlined
            required
            color="black"
          ></v-text-field>
          <v-rating
            color="warning"
            hover
            length="5"
            size="30"
            v-model="newRating.rate"
            half-increments
          ></v-rating>
        </v-form>
        <v-alert v-model="alert" dismissible elevation="11" type="warning">{{
          alertMessage
        }}</v-alert>
        <v-alert v-model="alert2" dismissible elevation="11" type="success">{{
          alertMessage
        }}</v-alert>
      </v-list-item-content>
    </v-list-item> -->

    <!-- <div
      class="d-flex justify-content-center align-items-center py-5"
      v-if="isLoadingRating"
    >
      <v-progress-circular indeterminate color="grey"></v-progress-circular>
    </div> -->

    <!-- <div
        v-if="isLoadingRating === false && allRating.length === 0"
        class="no-result center-element py-5"
      >
        <span>Aún no hay Valoraciones del Curso</span>
      </div> -->

    <!-- <v-list
        class="content-comments"
        v-if="isLoadingRating === false && allRating.length > 0"
        three-line
      >
        <template v-for="(i, index) in comments">
          <v-list-item class="pt-1" :key="index">
            <v-list-item-avatar>
              <v-img :src="i.photo"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                {{ i.name }}
              </v-list-item-title>

              <v-list-item-subtitle>
                <v-rating
                  color="warning"
                  hover
                  readonly
                  length="5"
                  size="30"
                  :value="i.rate"
                  half-increments
                ></v-rating>
              </v-list-item-subtitle>

              <v-list-item-subtitle>
                {{ date(i.created_at) }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text--primary">
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
                <v-divider class="py-0"></v-divider>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
// import vueShowMoreText from "vue-show-more-text";
import moment from "moment";
export default {
  name: "Comentarios",
  components: {
    // vueShowMoreText,
  },
  data() {
    return {
      S3_PATH: "https://crm-storage-user.s3.eu-west-1.amazonaws.com/",
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
</style>
