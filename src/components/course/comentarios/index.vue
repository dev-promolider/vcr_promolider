<template>
  <div class="row ml-3" style="margin-right: 30px">
    <!-- Comentarios -->
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

    <!-- Debug Info (Solo en desarrollo) -->
    <div class="col-md-12 mb-3" v-if="showDebugInfo">
      <div class="debug-panel p-3" style="background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px;">
        <h5>Debug Info:</h5>
        <p><strong>Comment Type:</strong> {{ commentType }}</p>
        <p><strong>All Comments Length:</strong> {{ comments.length }}</p>
        <p><strong>Filtered Comments Length:</strong> {{ filteredComments.length }}</p>
        <p><strong>User ID:</strong> {{ localStorage.getItem('id_user') }}</p>
        <p><strong>Course Active User ID:</strong> {{ course_active?.user_id }}</p>
        <p><strong>Lesson ID:</strong> {{ lesson?.id }}</p>
        <p><strong>⚠️ ISSUE DETECTADO:</strong> El backend no envía información sobre el tipo de comentario (público/privado) ni IDs de usuario. Mostrando todos los comentarios.</p>
        <button @click="showDebugInfo = false" class="btn btn-sm btn-secondary">Ocultar Debug</button>
      </div>
    </div>

    <!-- Cargando y Comentarios -->
    <div class="col-md-12" v-if="isLoadingComments">
      <div class="row bg-white remove-p-m text-center align-items-center">
        <div class="col-md-12">
          <v-progress-circular indeterminate color="grey"></v-progress-circular>
        </div>
      </div>
    </div>

    <div
      v-if="!isLoadingComments && filteredComments.length === 0"
      class="no-result center-element py-5"
    >
      <span>Aún no hay comentarios</span>
    </div>

    <!-- Comentarios con altura fija y scroll -->
    <div
      class="col-md-12 mb-5"
      v-if="!isLoadingComments && filteredComments.length > 0"
    >
      <div class="row">
        <!-- Contenedor con scroll y altura máxima -->
        <div class="comments-container">
          <v-list color="#F2F5FA" class="px-4">
            <template v-for="(i, index) in filteredComments">
              <v-list-item 
                class="pt-1 bg-white mb-3 comment-item" 
                :key="index" 
                style="border-radius: 20px; transition: all 0.3s ease;"
              >
                <v-container style="padding: 15px">
                  <v-row no-gutters>
                    <!-- Avatar -->
                    <v-col cols="auto" class="mr-3">
                      <v-list-item-avatar size="45">
                        <v-img :src="i.user_photo" style="border: 2px solid #e0e0e0;"></v-img>
                      </v-list-item-avatar>
                    </v-col>

                    <!-- Contenido del comentario -->
                    <v-col>
                      <!-- Header: Nombre y fecha -->
                      <div class="d-flex align-items-center mb-2">
                        <span class="font-weight-bold comment-username">
                          {{ i.username }}
                        </span>
                        <span class="comment-date ml-2">
                          {{ i.fecha }}
                        </span>
                      </div>
                      
                      <!-- Texto del comentario -->
                      <div class="comment-text">
                        <vue-show-more-text
                          :text="i.comments"
                          :lines="3"
                          more-text="Ver más"
                          less-text="Ver menos"
                          additional-container-css="line-height: 1.4; color: #333;"
                          additional-anchor-css="color: #1976d2; text-decoration: none; font-weight: 500;"
                        />
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </template>
            
            <!-- Indicador de final -->
            <div class="text-center py-3">
              <small class="text-muted">
                <v-icon small class="mr-1">mdi-comment-text-outline</v-icon>
                {{ filteredComments.length }} comentario{{ filteredComments.length !== 1 ? 's' : '' }} en total
              </small>
            </div>
          </v-list>
        </div>
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
      commentType: "public",
      showDebugInfo: false,
      newComment: {
        // ✅ Eliminamos issuing_user_id - ya no se necesita
        receiving_user_id: "",
        class_id: "",
        comments: "",
        type: "public",
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
      // ✅ FIX: Asegurar que siempre retorne un array
      const commentsData = this.getComments;
      console.log("🔍 [DEBUG] All comments:", commentsData);
      
      // Si getComments es undefined, null o no es array, retornar array vacío
      if (!Array.isArray(commentsData)) {
        console.log("⚠️ [DEBUG] getComments is not an array:", commentsData);
        return [];
      }
      
      return commentsData;
    },
    
    filteredComments() {
      // ✅ FIX: Verificar que comments sea un array antes de usar spread operator
      if (!Array.isArray(this.comments)) {
        console.log("⚠️ [DEBUG] this.comments is not an array:", this.comments);
        return [];
      }

      // TEMPORAL: Mostrar todos los comentarios hasta que el backend tenga los campos necesarios
      console.log("🔍 [DEBUG] Mostrando TODOS los comentarios (backend sin filtros)");
      
      // Ordenar comentarios: más recientes primero
      const sortedComments = [...this.comments].sort((a, b) => {
        const dateA = new Date(a.created_at || 0);
        const dateB = new Date(b.created_at || 0);
        return dateB - dateA;
      });
      
      return sortedComments;
      
      /* CÓDIGO ORIGINAL (para cuando el backend esté completo):
      const userId = localStorage.getItem("id_user");
      
      return this.comments.filter((comment) => {
        if (this.commentType === "public") {
          return comment.type === "public";
        } else {
          return comment.type === "private" &&
            (comment.issuing_user_id === userId ||
              comment.receiving_user_id === userId);
        }
      });
      */
    },
  },
  
  watch: {
    // Watch para detectar cambios en commentType
    commentType(newVal) {
      console.log("🔍 [DEBUG] Comment type changed to:", newVal);
    },
    // Watch para detectar cambios en los comentarios
    comments: {
      handler(newComments) {
        console.log("🔍 [DEBUG] Comments updated:", newComments);
      },
      deep: true
    }
  },
  
  methods: {
    ...mapActions("course", ["setComments"]),
    
    async sendComment() {
      console.log("🚀 [DEBUG] sendComment() called");
      console.log("🚀 [DEBUG] Current comment text:", this.newComment.comments);
      
      if (this.newComment.comments === "") {
        console.log("❌ [DEBUG] Comment is empty, not sending");
        return;
      }
      
      // ✅ CRÍTICO: Preparar SOLO los datos necesarios (SIN issuing_user_id)
      const commentData = {
        receiving_user_id: this.course_active?.user_id?.toString(),
        class_id: this.lesson?.id?.toString(),
        comments: this.newComment.comments
        // ❌ NO ENVIAR: issuing_user_id (eliminado para prevenir IDOR)
        // ❌ NO ENVIAR: type (hasta que el backend lo soporte)
      };
      
      console.log("🚀 [DEBUG] Secure comment data to send:", commentData);
      
      // Verificar datos requeridos
      if (!commentData.class_id) {
        console.log("❌ [DEBUG] class_id is undefined, cannot send comment");
        return;
      }
      
      if (!commentData.receiving_user_id) {
        console.log("❌ [DEBUG] receiving_user_id is missing");
        return;
      }
      
      try {
        console.log("🚀 [DEBUG] Calling setComments action...");
        const result = await this.setComments(commentData);
        console.log("✅ [DEBUG] setComments result:", result);
        
        // Limpiar el comentario
        this.newComment.comments = "";
        console.log("✅ [DEBUG] Comment sent successfully and form cleared");
        
      } catch (error) {
        console.error("❌ [DEBUG] Error sending comment:", error);
        // Opcional: Mostrar mensaje de error al usuario
        // this.$toast.error('Error al enviar comentario');
      }
    },
  },
  
  mounted() {
    console.log("🔍 [DEBUG] Component mounted");
    console.log("🔍 [DEBUG] Initial state:", {
      lesson: this.lesson,
      course_active: this.course_active,
      allComments: this.allComments,
      isLoadingComments: this.isLoadingComments,
      getComments: this.getComments
    });
  }
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

.debug-panel {
  font-size: 0.9em;
}

.debug-panel p {
  margin: 5px 0;
}
</style>