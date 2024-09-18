<template>
  <div style="margin-bottom: 0px">
    <v-app-bar scroll-behavior="hide" class="custom-app-bar"> 
      <v-app-bar-nav-icon color="#4ff70d" @click="changeDrawer"
        v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"></v-app-bar-nav-icon>

      <!-- Mensaje de Bienvenida -->
      <!--<div class="text-white text-bold banner-text" style="font-weight: 700">
        Bienvenido a Promolíder, tu academia digital
      </div>-->
      <v-spacer></v-spacer>

      <!-- Barra de búsqueda -->
      <!--<div class="mx-2" style="min-width: 25%" v-if="!$vuetify.breakpoint.xs">
        <v-autocomplete
          style="border-radius: 12px"
          @keypress.enter="onSearchCourse"
          hide-no-data
          :search-input.sync="search"
          color="dark"
          solo
          dense
          append-icon=""
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          hide-selected
          item-text="name"
          item-value="symbol"
          return-object
          label="Buscar un curso"
          >.
        </v-autocomplete>
      </div>-->

      <!-- Puntos -->
      <v-chip v-if="!$vuetify.breakpoint.xs && points >= 0" class="mx-2" label outlined text-color="#1ae800"
        color="#1ae800">
        <v-icon left color="#1ae800"> mdi-trophy-award </v-icon>
        {{ points }} Pts
      </v-chip>

      <!--Modal Certificate-->
      <v-tooltip v-if="courseSelected" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" icon v-on="on" style="position: relative;">
            <v-progress-circular :rotate="-90" :size="45" :width="4" :value="progressCourseSelect" color="#1ae800"
              class="custom-progress">
              <div
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; text-align: center;">
                <div
                  style="position: absolute; top: -5px; width: 100%; text-align: center; font-size: 11px; color: #1ae800;">
                  {{ progressCourseSelect }}%
                </div>
                <v-icon @click="showProgressModal = true" size="20" style="position: relative; top: 7px;">mdi-trophy</v-icon>
              </div>
              <!--<div
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: calc(100% - 8px); height: calc(100% - 8px); border: 1px solid #1ae800; border-radius: 50%; background-color: transparent;">
              </div>
              <div
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: calc(100%); height: calc(100%); border: 1px solid #1ae800; border-radius: 50%; background-color: transparent;">
              </div>-->
            </v-progress-circular>
          </v-btn>
        </template>
        <span v-if="progressCourseSelect == 100">Completado</span>
        <span v-else>{{ progressCourseSelect }}% de 100%</span>
      </v-tooltip>

      <!-- Modal de progreso 
    <b-modal v-model="showProgressModal" title="Progreso del Curso">
      <div>
        <b-progress :value="progress" max="100" show-progress animated></b-progress>
        <p class="mt-2">{{ progress }}% completado</p>
      </div>
    </b-modal>-->






      <!-- Pregunta diaria -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon v-if="examDaily" data-toggle="modal" data-target="#question">
            <v-icon size="20" color="#1ae800">mdi-help</v-icon>
          </v-btn>
        </template>
        <span> Gana puntos contestando preguntas</span>
      </v-tooltip>

      <!-- Certificado  -->
      <template v-if="showCertificateIcon">
        <v-tooltip bottom v-if="stateCertificate" v-model="dialogCertificate">
          <template v-slot:activator="{ on }">
            <v-btn v-if="certificateBought" x-large icon v-bind="attrs" v-on="on">
              <v-icon size="20" style="color: #1ae800">mdi-school</v-icon>
            </v-btn>
            <v-btn v-else x-large icon v-bind="attrs" v-on="on" @click="buy()">
              <v-icon size="20" style="color: #1ae800">mdi-school</v-icon>
            </v-btn>
          </template>
          <span v-if="certificateBought">Su certificado ya fue adquirido</span>
          <span v-else>Ya puede adquirir su certificado</span>
        </v-tooltip>
      </template>

      <!--Notificaciones -->
      <v-menu style="z-index: 201" left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-1" x-large icon v-bind="attrs" v-on="on">
            <v-badge overlap color="#d54338" :value="isBadgeActive" :content="numberItems">
              <v-icon size="25" style="color: #1ae800"> mdi-bell </v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list three-line max-width="400px" class="scroll">
          <v-subheader style="font-size: 1.1rem; font-weight: 600">Notificaciones</v-subheader>
          <v-divider class="my-1"></v-divider>
          <v-card-title class="py-1" v-if="items.length === 0 && !isLoading">
            <span class="text-center subtitle text--secondary" style="font-size: 1.0rem; font-weight: 600">No existen
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
                <v-list-item-subtitle style="color: #676767 ; font-size: 0.8rem"
                  v-html="item.subtitle"></v-list-item-subtitle>
                <v-list-item-subtitle>
                  <timeago style="color: #4b4b4c; font-weight: bold ; font-size: 0.9rem" :datetime="item.created_at"
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
            <v-btn block color="#60d950" deep class="text-white" height="35px">Ver todo</v-btn>
          </v-card-text>
        </v-list>
      </v-menu>

      <!--Opciones
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-1" x-large icon v-bind="attrs" v-on="on">
            <v-icon size="25" style="color: #e80400">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item class="mb-0 pl-2" style="min-height: 35px" v-if="$vuetify.breakpoint.xs">
            <v-list-item-icon class="m-1 ml-0 pl-0">
              <v-icon> mdi-trophy-award </v-icon>
            </v-list-item-icon>
            <v-list-item-title> {{ points }} Pts </v-list-item-title>
          </v-list-item>

          <v-list-item v-for="(link, index) in links" :key="index" link :to="{ name: link.nameRouter }"
            @click="optionAction(link.action, link.nameRouter)">
            <v-list-item-title>{{ link.nombre }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>-->

      <!--Peril USER-->
      <v-row align="center" style="margin-right: 0; flex: initial;">
        <!-- Nombre y correo -->
        <v-col style="max-width: 200px;">
          <v-list-item-content class="text-right" style="padding-bottom: 15px;">
            <v-list-item-title style="font-size: 1rem; overflow: visible;">{{ userName }}</v-list-item-title>
            <v-list-item-subtitle style="font-size: 0.7rem; overflow: visible;">{{ userEmail }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-col>

        <!-- Imagen del perfil -->
        
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-1" x-large icon v-bind="attrs" v-on="on">
              <v-img :src="profileImg" max-width="30" max-height="30" v-on="on" v-bind="attrs"></v-img>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(link, index) in links" :key="index" link :to="{ name: link.nameRouter }"
              @click="optionAction(link.action, link.nameRouter)">
              <v-list-item-title>{{ link.nombre }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-app-bar>

    <!-- <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body"></div>
        </div>
      </div>
    </div> -->

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
      //showProgressModal: false,

      attrs: {
        class: "pa-2",
      },
      sheet: false,
      search: null,
      numberItems: 0,
      // tooltip: false,
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
      certificateData: {
        data: {},
      },
      course: [],
      finalPrice: null,
      certificateBought: false,
      showCertificateIcon: false,
      //USER
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
        return !this.$vuetify.breakpoint.xs ? true : false;
      },
      set(value) {
        return value;
      },
    },

    ...mapState("sections", {
      titulo: (state) => state.topSection,
    }),

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

    //USER
    ...mapState("userModule", ["userProfile"]),
  },
  methods: {

    submitAnswer() {
      this.$emit('submit-answer');
    },

    ...mapActions("course", ["getPoints"]),
    async getpoints() {
      await this.getPoints(localStorage.getItem("id_user"));
      this.showPointsExam = true;
    },
    async buy() {
      console.log(this.certificate)
      this.$router.push({
        name: 'buyCertificate',
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
      })
      var disc = price * (this.certificateDisc / 100);
      return price - disc;
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
    // hideToolTip() {
    //   if (this.item == 0) {
    //     this.tooltip = false;
    //     localStorage.setItem("item", 1);
    //   }
    // },
    // showToolTip() {
    //   this.item = localStorage.getItem("item") || 0;

    //   if (this.item == 0) {
    //     this.tooltip = true;
    //   }
    // },
    async getNotifications() {
      this.isLoading = true;
      const data = await this.axios.get("/notifications/list");

      const noti = data.data.map((e) => {
        return {
          title: e.title,
          subtitle: e.body,
          avatar: e.photo,
          created_at: e.created_at,
        };
      });

      if (Object.keys(noti).length > 0) {
        this.isBadgeActive = true;
        this.numberItems = Object.keys(noti).length;
      }
      this.items = noti;

      this.isLoading = false;
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
          if (data.is_paid == 1) {
            this.certificateBought = true;
          }
          this.showCertificateIcon = true;
          //           this.axios.get("/course/certificate/data").then((response) => {
          // //corregir dato estatico en controlador
          //             this.certificateData = response.data[0];
          //           });
          //           await this.axios.get("/course/details/1").then((response) => {
          //             this.course = response;
          //           });
          //           this.finalPrice = await this.calcDiscount(this.certificateData.data.certificate_price);

        } else {
          this.stateCertificate = false;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    // async printCertificate( course_id ){
    //   try {

    //    await this.axios.get('/course/certificate/', { course_id })
    //   } catch (error) {
    //     throw new Error( error )
    //   }
    // }
    getUserProfileData() {
      // Aquí debes implementar la lógica para obtener los datos del usuario y la imagen de perfil
      // Puedes usar Vuex, localStorage, o cualquier otra fuente de datos
      // Por ejemplo, podrías obtenerlos como en NavBarV.vue
      this.userName = localStorage.getItem("name_user"); // Cambia según donde obtengas el nombre del usuario
      this.userEmail = localStorage.getItem("email_user"); // Cambia según donde obtengas el correo del usuario
      this.profileImg = localStorage.getItem("photo_user"); // Cambia según donde obtengas la imagen del usuario
    },
  },

  mounted() {
    // this.showToolTip();

    this.getpoints();
  },

  created() {
    // this.printCertificate( this.$route.query.course )
    this.getNotifications();
    this.getCertificate(this.$route.query.course);
    //USER
    this.getUserProfileData();
  },
  watch: {
    search() {
      //console.log(value);
    },
    idCourse() {
      this.getCertificate(this.$route.query.course);
    },
    courseSelect: {
      handler(newVal) {

        this.courseSelected = newVal;
        this.$forceUpdate();
        console.log('updated')
      },
      immediate: true

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
  margin: 30px;
  margin-top: 30px !important;
  margin-left: 80px;
  padding: 0px;
  border-radius: 15px !important;
  background-color: white !important;
}

.custom-progress {
  background-color: white !important;
}

.custom-progress .v-progress-circular__background {
  fill: white !important;
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

@media screen and (max-width: 900px) {
  .banner-text {
    display: none;
  }
}
</style>
