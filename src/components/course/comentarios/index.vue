<template>
  <div>
      <v-card dense style="border-radius: 15px">
        <v-list-item three-line style="width: 94%; padding-top: 20px">
          <v-list-item-avatar height="55px" width="55px">
            <v-img :src="img"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-form @submit.prevent="sendComment()" ref="form" lazy-validation>
              <v-text-field
                label="Escribe un comentario..."
                v-model="newComment.comments"
                clearable
                outlined
                required
                color="black"
              ></v-text-field>
            </v-form>
          </v-list-item-content>
        </v-list-item>
        <div
          class="d-flex justify-content-center align-items-center py-5"
          v-if="isLoadingComments"
        >
          <v-progress-circular indeterminate color="grey"></v-progress-circular>
        </div>
        <div
          v-if="isLoadingComments === false && allComments.length === 0"
          class="no-result center-element py-5"
        >
          <span>Aún no hay comentarios</span>
        </div>

        <v-list
          class="content-comments"
          v-if="isLoadingComments === false && allComments.length > 0"
          three-line
        >
          <template v-for="(i, index) in comments">
            <v-list-item class="pt-1" :key="index">
              <v-list-item-avatar>
                <v-img :src="i.user_photo"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                  {{ i.username }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ i.fecha }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="text--primary">
                  <v-card-text style="padding: 0">
                    <vue-show-more-text
                      :text="i.comments"
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
        </v-list>
      </v-card>
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
      useId: "",
      comentarios: [],
      newComment: {
        issuing_user_id: "",
        receiving_user_id: "",
        class_id: "",
        comments: "",
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
  },
  methods: {
    ...mapActions("course", ["setComments"]),
    // Funcion para el envio de mensajes
    async sendComment() {
      if (this.newComment.comments === "") {
        return;
      } else {
        this.newComment.issuing_user_id = localStorage.getItem("id_user");
        this.newComment.receiving_user_id =
          this.course_active[0].user_id.toString();
        this.newComment.class_id = this.lesson.id.toString();

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
/*Container text vueShowMoreText */
.container {
  max-width: 100% !important;
  margin: 0;
}
</style>
