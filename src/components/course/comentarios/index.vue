<template>
  <div class="row ml-3" style="margin-right: 30px">
    <div class="col-md-12 col-lg-12">
      <p class="text-left bolder text-section">
        {{ filteredComments.length }} Comentarios
      </p>
    </div>

    <!-- Selector Privados/Públicos -->
    <div class="col-md-12 mb-3">
      <div class="d-flex justify-content-center">
        <v-btn-toggle v-model="commentType" mandatory class="custom-btn-toggle">
          <v-btn :value="'private'" class="custom-btn">
            <v-icon v-if="commentType === 'private'" right class="check-icon mr-1">mdi-check</v-icon>
            Privados
          </v-btn>
          <v-btn :value="'public'" class="custom-btn">
            <v-icon v-if="commentType === 'public'" right class="check-icon mr-1">mdi-check</v-icon>
            Públicos
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <!-- Publicar comentario -->
    <div class="col-md-12" style="padding-top: 0px; padding-bottom: 0px">
      <div class="row input-comment align-items-center remove-p-m mb-5">
        <div
          class="col-md-2 h-100 d-flex justify-content-center align-items-center"
          style="padding: 0px"
        >
          <v-img
            :src="img"
            style="border-radius: 50px"
            max-width="40"
            class="ml-5"
          ></v-img>
        </div>
        <div class="col-md-10" style="padding: 0px">
          <v-form @submit.prevent="sendComment()" ref="form" lazy-validation>
            <v-text-field
              class="mt-5"
              :label="commentType === 'public' ? 'Escribe un comentario...' : 'Escribe un comentario privado...'"
              v-model="newComment.comments"
              clearable
              required
              rounded
              color="black"
            ></v-text-field>
          </v-form>
        </div>
      </div>
    </div>

    <!-- Cargando y Comentarios -->
    <div class="col-md-12" v-if="isLoadingComments">
      <div class="row bg-white remove-p-m text-center align-items-center">
        <div class="col-md-12">
          <v-progress-circular indeterminate color="grey"></v-progress-circular>
        </div>

        <div
          v-if="!isLoadingComments && filteredComments.length === 0"
          class="no-result center-element py-5"
        >
          <span>Aún no hay comentarios</span>
        </div>
      </div>
    </div>

    <!-- Comentarios -->
    <div
      class="col-md-12 mb-5"
      v-if="!isLoadingComments && filteredComments.length > 0"
    >
      <div class="row">
        <v-list color="#F2F5FA" class="px-4">
          <template v-for="(i, index) in filteredComments">
            <v-list-item class="pt-1 bg-white mb-5" :key="index" style="border-radius: 35px">
              <v-container style="padding: 10px 0 0 0px">
                <v-row>
                  <v-col cols="1">
                    <v-list-item-avatar>
                      <v-img :src="i.user_photo"></v-img>
                    </v-list-item-avatar>
                  </v-col>

                  <v-col cols="10" class="pt-5">
                    <v-row>
                      <!-- Nombre y Fecha -->
                      <v-col cols="12" class="pt-3">
                        <p
                          style="
                            display: inline;
                            font-weight: 600;
                            font-size: 1em;
                            padding-left: 20px;
                          "
                        >
                          {{ i.username }}
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
                          {{ i.fecha }}
                        </p>
                      </v-col>
                      <!-- Comentario -->
                      <v-col cols="12" style="padding: 10px 0 15px 0">
                        <v-list-item-subtitle>
                          <v-card-text style="padding: 0">
                            <vue-show-more-text
                              :text="i.comments"
                              :lines="2"
                              more-text="Ver más.."
                              less-text="Ocultar"
                              additional-container-css="padding: 8px 0 0 0; width: 100% !important ; text-align: justify;"
                              additional-anchor-css="color: green; text-decoration: none; width: 80px; margin: 0 0 0 auto; padding: 0"
                            />
                          </v-card-text>
                        </v-list-item-subtitle>
                      </v-col>
                      <v-col cols="12" style="padding-top: 0px; margin-top: 0px"></v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item>
          </template>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import vueShowMoreText from "vue-show-more-text";
export default {
  name: "Comentarios",
  components: {
    vueShowMoreText,
  },
  data() {
    return {
      img: localStorage.getItem("photo_user"),
      commentType: "public", // Añade esta propiedad
      newComment: {
        issuing_user_id: "",
        receiving_user_id: "",
        class_id: "",
        comments: "",
        type: "public", // Añade esta propiedad
      },
    };
  },
  computed: {
    ...mapState("course", [
      "allComments",
      "lesson",
      "course_active",
      "isLoadingComments",
    ]),
    ...mapGetters("course", ["getComments"]),

    comments() {
      return this.getComments;
    },
    filteredComments() {
      const userId = localStorage.getItem("id_user");
      return this.comments.filter(
        (comment) =>
          comment.type === "public" ||
          (comment.type === "private" &&
            (comment.issuing_user_id === userId ||
              comment.receiving_user_id === userId))
      );
    },
  },
  methods: {
    ...mapActions("course", ["setComments"]),
    async sendComment() {
      if (this.newComment.comments === "") {
        return;
      } else {
        this.newComment.issuing_user_id = localStorage.getItem("id_user");
        this.newComment.receiving_user_id = this.course_active.user_id.toString();
        this.newComment.class_id = this.lesson.id.toString();
        this.newComment.type = this.commentType; // Establece el tipo de comentario

        if (this.newComment.class_id != undefined) {
          await this.setComments(this.newComment);
          this.newComment.comments = "";
        }
      }
    },
  },
};
</script>

<style scoped>
@import "./style.css";

.text-section {
  padding: 0px;
  font-size: 1.4em;
  font-weight: 600;
}
.remove-p-m {
  padding: 0px;
  margin: 0px;
}

.input-comment {
  background-color: #ffffff;
  border-radius: 25px;
}

.bg-white {
  background-color: #ffffff;
  border-radius: 30px;
}

/*Container text vueShowMoreText */
/* .container {
  max-width: 100% !important;
  margin: 0;
} */
</style>
