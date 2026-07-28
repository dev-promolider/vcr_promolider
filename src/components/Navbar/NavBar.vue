<template>
  <div style="margin-bottom: 0px">
    <v-app-bar app scroll-behavior="hide" class="custom-app-bar">
      <!-- Icono de menú para dispositivos móviles -->
      <v-app-bar-nav-icon color="#10B981" @click="changeDrawer"
        v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"></v-app-bar-nav-icon>

      <!-- Título de la sección activa -->
      <div v-if="titulo" class="d-flex align-center ml-3">
        <span class="header-section-title">{{ titulo }}</span>
      </div>

      <v-spacer></v-spacer>

      <!-- Puntos del usuario (Bubble Pill Badge) -->
      <div v-if="!$vuetify.breakpoint.xs && points >= 0" class="header-points-pill mx-2">
        <v-icon left size="18" color="#10B981"> mdi-trophy-award </v-icon>
        <span>{{ points }} Pts</span>
      </div>

      <!-- Modal de progreso de curso -->
      <v-tooltip v-if="courseSelected" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" icon v-on="on" style="position: relative">
            <v-progress-circular :rotate="-90" :size="45" :width="4" :value="currentCourseProgress" color="#10B981"
              class="custom-progress">
              <div style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 100%;
                  text-align: center;
                ">
                <div style="
                    position: absolute;
                    top: -5px;
                    width: 100%;
                    text-align: center;
                    font-size: 11px;
                    color: #10B981;
                    font-weight: 700;
                  ">
                  {{ currentCourseProgress }}%
                </div>
                <v-icon @click="showProgressModal = true" size="20" color="#10B981"
                  style="position: relative; top: 7px">mdi-trophy</v-icon>
              </div>
            </v-progress-circular>
          </v-btn>
        </template>
        <span v-if="currentCourseProgress == 100">Completado</span>
        <span v-else>{{ currentCourseProgress }}% de 100%</span>
      </v-tooltip>

      <!-- Botón de pregunta diaria -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon v-if="examDaily" data-toggle="modal" data-target="#question">
            <v-icon size="20" color="#10B981">mdi-help</v-icon>
          </v-btn>
        </template>
        <span> Gana puntos contestando preguntas</span>
      </v-tooltip>

      <!-- Botón de certificado -->
      <template v-if="showCertificateIcon">
        <v-tooltip bottom v-if="stateCertificate" v-model="dialogCertificate">
          <template v-slot:activator="{ on }">
            <v-btn v-if="certificateBought" x-large icon v-bind="attrs" v-on="on">
              <v-icon size="20" style="color: #10B981">mdi-school</v-icon>
            </v-btn>
            <v-btn v-else x-large icon v-bind="attrs" v-on="on" @click="buy()">
              <v-icon size="20" style="color: #10B981">mdi-school</v-icon>
            </v-btn>
          </template>
          <span v-if="certificateBought">Su certificado ya fue adquirido</span>
          <span v-else>Ya puede adquirir su certificado</span>
        </v-tooltip>
      </template>

      <!-- Notificaciones -->
      <v-menu style="z-index: 201" left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-1" x-large icon v-bind="attrs" v-on="on">
            <v-badge overlap color="#F43F5E" :value="isBadgeActive" :content="numberItems">
              <v-icon size="24" style="color: #10B981"> mdi-bell </v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list three-line max-width="400px" class="scroll">
          <v-subheader style="font-size: 1.1rem; font-weight: 600">Notificaciones</v-subheader>
          <v-divider class="my-1"></v-divider>
          <v-card-title class="py-1" v-if="items.length === 0 && !isLoading">
            <span class="text-center subtitle text--secondary" style="font-size: 1rem; font-weight: 600">No existen
              notificaciones</span>
          </v-card-title>
          <template v-if="!isLoading">
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-avatar height="50px" width="50px">
                <v-img max-height="125" :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title" style="color: #4b4b4c; font-size: 0.9rem"
                  class="font-weight-bold"></v-list-item-title>
                <v-list-item-subtitle style="color: #676767; font-size: 0.8rem"
                  v-html="item.subtitle"></v-list-item-subtitle>
                <v-list-item-subtitle>
                  <timeago style="color: #4b4b4c; font-weight: bold; font-size: 0.9rem" :datetime="item.created_at"
                    :auto-update="60"></timeago>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-if="isLoading">
            <v-sheet>
              <v-skeleton-loader v-for="i in 10" :key="i" v-bind="attrs" type="list-item-avatar"></v-skeleton-loader>
            </v-sheet>
          </template>
          <v-divider class="my-1"></v-divider>
          <v-card-text v-if="items.length > 0">
            <v-btn block color="#10B981" deep class="text-white" height="35px">Ver todo</v-btn>
          </v-card-text>
        </v-list>
      </v-menu>

      <!-- Perfil de usuario -->
      <v-row align="center" style="margin-right: 0; flex: initial">
        <!-- Nombre y correo -->
        <v-col style="max-width: 200px" v-if="!$vuetify.breakpoint.xs">
          <v-list-item-content class="text-right" style="padding-bottom: 0px">
            <v-list-item-title style="font-size: 0.92rem; font-weight: 700; color: #1C1917; overflow: visible">{{
              userName || 'Usuario'
            }}</v-list-item-title>
            <v-list-item-subtitle style="font-size: 0.75rem; color: #78716C; overflow: visible">{{ userEmail }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-col>

        <!-- Imagen del perfil -->
        <v-menu offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="38" class="mx-2 cursor-pointer header-avatar" v-bind="attrs" v-on="on">
              <v-img v-if="profileImg" :src="profileImg" alt="Perfil"></v-img>
              <v-icon v-else color="#10B981" size="22">mdi-account</v-icon>
            </v-avatar>
          </template>

          <v-list class="hallmark-card py-2">
            <v-list-item v-for="(link, index) in links" :key="index" link :to="{ name: link.nameRouter }"
              @click="optionAction(link.action, link.nameRouter)">
              <v-list-item-title class="font-weight-medium" style="color: #1C1917">{{ link.nombre }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-app-bar>

    <!-- Modal de pregunta diaria -->
    <div class="modal" tabindex="-1" role="dialog" id="question">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Pregunta diaria</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <QuestionDaily />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import QuestionDaily from "../Student/questions/daily/index";

export default {
  components: {
    QuestionDaily,
  },
  data() {
    return {
      courseSelected: false,
      attrs: { class: "pa-2" },
      sheet: false,
      search: null,
      numberItems: 0,
      isBadgeActive: false,
      drawer: false,
      dialogCertificate: false,
      stateCertificate: false,
      isLoading: true,
      links: [
        { nombre: "Mi perfil", nameRouter: "perfil" },
        { nombre: "Mis preferencias", nameRouter: "option-preferences" },
        { nombre: "Cerrar Sesión", nameRouter: "Login", action: "closeSesion" },
      ],
      items: [],
      certificate: null,
      certificateData: { data: {} },
      course: [],
      finalPrice: null,
      certificateBought: false,
      showCertificateIcon: false,
      // Datos de usuario
      userName: "",
      userEmail: "",
      profileImg: "",
    };
  },

  computed: {
    idCourse() {
      return this.$route.query.course;
    },
    mini: {
      get() {
        return !this.$vuetify.breakpoint.xs;
      },
      set(value) {
        return value;
      },
    },

    ...mapState("sections", {
      titulo: (state) => state.topSection,
    }),

    ...mapState("course", ["courseProgress"]),
    currentCourseProgress() {
      return this.$route.query.course
        ? this.courseProgress[this.$route.query.course] || 0
        : 0;
    },

    ...mapState("course", [
      "progressCourseSelect",
      "courseSelect",
      "msjCompletedClass",
      "examDaily",
      "points",
      "allLessons",
    ]),

    ...mapGetters("course", {
      vuexTitle: "title",
    }),

    // Información del usuario
    ...mapState("userModule", ["userProfile"]),
  },

  methods: {
    submitAnswer() {
      this.$emit("submit-answer");
    },

    ...mapActions("course", ["getPoints"]),
    async getpoints() {
      try {
        const userId = localStorage.getItem("id_user");
        if (userId) {
          await this.getPoints(userId);
        }
      } catch (error) {
        console.warn("Could not fetch user points:", error);
      } finally {
        this.showPointsExam = true;
      }
    },
    async buy() {
      this.$router.push({
        name: "buyCertificate",
        params: {
          certificate: this.certificate.id_course,
          finalPrice: this.finalPrice,
          course: this.course,
        },
      });
    },
    async calcDiscount(price) {
      await this.axios.get("/course/certificate-discount").then((datos) => {
        this.certificateDisc = datos.data;
      });
      return price - price * (this.certificateDisc / 100);
    },
    optionAction(action, link) {
      if (action === "closeSesion") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("status_user");
        localStorage.removeItem("name_user");
        this.$router.push({ name: link });
      }
    },
    onSearchCourse() {
      if (!this.search) return;
      this.sheet = !this.sheet;
      this.$router
        .push({ name: "search", query: { q: this.search } })
        .catch(() => { });
    },
    changeDrawer() {
      this.$emit("click", !this.drawer);
    },
    async getNotifications() {
      this.isLoading = true;
      try {
        const data = await this.axios.get("/notifications/list");
        if (data && data.data && Array.isArray(data.data)) {
          const noti = data.data.map((e) => ({
            title: e.title,
            subtitle: e.body,
            avatar: e.photo,
            created_at: e.created_at,
          }));

          if (noti.length > 0) {
            this.isBadgeActive = true;
            this.numberItems = noti.length;
          }
          this.items = noti;
        } else {
          this.items = [];
        }
      } catch (error) {
        this.items = [];
        this.isBadgeActive = false;
      } finally {
        this.isLoading = false;
      }
    },
    async getCertificate(course) {
      try {
        if (!course && this.$route.name != "curso") {
          this.stateCertificate = false;
          return;
        }

        const { data } = await this.axios.get(
          `/course/certificate/check/${course}`
        );
        if (data) {
          const { data } = await this.axios.get(
            `/course/certificate/${course}`
          );
          this.certificateBought = data.is_paid == 1;
          this.showCertificateIcon = true;
        } else {
          this.stateCertificate = false;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    getUserProfileData() {
      // Obtiene datos del usuario de localStorage
      this.userName = localStorage.getItem("name_user");
      this.userEmail = localStorage.getItem("email_user");
      this.profileImg = localStorage.getItem("photo_user");
    },
  },

  mounted() {
    this.getpoints();
  },

  created() {
    this.getNotifications();
    this.getCertificate(this.$route.query.course);
    this.getUserProfileData();
  },
  watch: {
    idCourse() {
      this.getCertificate(this.$route.query.course);
    },
    courseSelect: {
      handler(newVal) {
        this.courseSelected = newVal;
        this.$forceUpdate();
      },
      immediate: true,
    },
  },
  beforRouteUpdate(to, from, next) {
    this.getCertificate(to.query.course);
    next();
  },
};
</script>

<style lang="scss">
.custom-navbar {
  margin: 60px;
  max-width: 100%;
}

.custom-app-bar {
  margin-top: 14px !important;
  margin-bottom: 14px !important;
  margin-right: 18px !important;
  border-radius: 18px !important;
  background-color: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  box-shadow: 0 4px 16px -4px rgba(28, 25, 23, 0.06) !important;
  overflow: hidden !important;
}

.header-avatar {
  background: rgba(16, 185, 129, 0.12) !important;
  border: 1.5px solid rgba(16, 185, 129, 0.3) !important;
  transition: all 0.2s ease !important;
}

.header-avatar:hover {
  transform: scale(1.06) !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2) !important;
}

.custom-progress {
  background-color: transparent !important;
}

.custom-progress .v-background {
  fill: transparent !important;
}

s .v-label {
  font-size: 0.8em;
}

.scroll {
  height: 100%;
  max-height: 450px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}

a:hover {
  text-decoration: none;
}

.tooltip-box {
  position: absolute;
  background: #000000;
  color: #ffffff;
  padding: 8px 15px;
  z-index: 10;
  top: 35px;
  left: -94px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 2px 2px 2px 2px #000000;
  opacity: 80%;
}

.tooltip-box:hover {
  opacity: 100%;
  transition: 0.3s ease-in;
}

.tooltip-box::after {
  content: "";
  display: block;
  border-bottom: 7px solid #131b1e;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  position: absolute;
  top: -7px;
  left: calc(50% - 7px);
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    color: #ddce00be;
  }

  100% {
    color: #000000;
  }
}

.ga:hover {
  .box {
    background-color: #fff;
    transform: translatey(50px);
    height: 50px;
    width: 230px;
    color: rgb(0, 0, 0);
    box-shadow: 2px 2px 2px #131b1e;
  }
}

.header-section-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #18181B;
}

.header-points-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #10B981;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 6px 16px;
  border-radius: 9999px;
  transition: all 0.2s ease;
}

.header-points-pill:hover {
  background: rgba(16, 185, 129, 0.15);
  transform: translateY(-1px);
}

@media screen and (max-width: 900px) {
  .banner-text {
    display: none;
  }
}

@media screen and (max-width: 959px) {
  .custom-app-bar {
    margin-left: 15px;
  }
}
</style>
