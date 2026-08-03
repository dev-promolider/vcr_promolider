<template>
  <div class="tw-mb-0">
    <!-- Capa invisible para cerrar menús al hacer click fuera -->
    <div v-if="isNotifMenuOpen || isProfileMenuOpen" @click="isNotifMenuOpen = false; isProfileMenuOpen = false" class="tw-fixed tw-inset-0 tw-z-40"></div>

    <header class="tw-sticky tw-top-4 tw-z-30 tw-flex tw-items-center tw-bg-white tw-border tw-border-[#E5E3DC] tw-rounded-[18px] tw-shadow-[0_4px_16px_-4px_rgba(28,25,23,0.06)] tw-h-[64px] tw-px-4 tw-mx-4 tw-mb-4">
      
      <!-- Icono de menú para dispositivos móviles -->
      <button class="tw-block md:tw-hidden tw-text-[#10B981] tw-p-2 hover:tw-bg-gray-100 tw-rounded-full tw-mr-2 tw-transition-colors" @click="changeDrawer">
        <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>

      <!-- Título de la sección activa -->
      <div v-if="titulo" class="tw-flex tw-items-center tw-ml-3">
        <span class="tw-font-outfit tw-text-[1.15rem] tw-font-bold tw-text-[#18181B]">{{ titulo }}</span>
      </div>

      <div class="tw-flex-1"></div>

      <!-- Puntos del usuario (Bubble Pill Badge) -->
      <div v-if="points >= 0" class="tw-hidden md:tw-inline-flex tw-items-center tw-gap-[6px] tw-bg-[#10B981]/10 tw-border tw-border-[#10B981]/25 tw-text-[#10B981] tw-font-outfit tw-font-bold tw-text-[0.85rem] tw-px-4 tw-py-1.5 tw-rounded-full tw-mx-2 hover:tw-bg-[#10B981]/20 hover:tw--translate-y-[1px] tw-transition-all">
        <svg class="tw-w-[18px] tw-h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M19 3v4M5 7h14a2 2 0 012 2v2a6 6 0 01-12 0v-2M12 17v4m-4 0h8M6.5 7h11"></path></svg>
        <span>{{ points }} Pts</span>
      </div>

      <!-- Modal de progreso de curso -->
      <div v-if="courseSelected" class="tw-relative tw-group tw-mx-1">
        <button @click="showProgressModal = true" class="tw-relative tw-w-[45px] tw-h-[45px] tw-flex tw-items-center tw-justify-center tw-rounded-full hover:tw-bg-gray-100 tw-transition-colors">
          <svg class="tw-w-full tw-h-full tw--rotate-90" viewBox="0 0 36 36">
            <path class="tw-text-gray-200" stroke-width="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="tw-text-[#10B981]" stroke-dasharray="100, 100" :stroke-dashoffset="100 - currentCourseProgress" stroke-width="3" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div class="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-center tw-justify-center">
            <span class="tw-text-[#10B981] tw-text-[10px] tw-font-bold tw--mt-1">{{ currentCourseProgress }}%</span>
            <svg class="tw-w-3 tw-h-3 tw-text-[#10B981] tw--mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M19 3v4M5 7h14a2 2 0 012 2v2a6 6 0 01-12 0v-2M12 17v4m-4 0h8M6.5 7h11"></path></svg>
          </div>
        </button>
        <!-- Tooltip nativo -->
        <div class="tw-absolute tw-top-full tw-left-1/2 tw--translate-x-1/2 tw-mt-2 tw-hidden group-hover:tw-block tw-bg-gray-900 tw-text-white tw-text-xs tw-font-medium tw-px-2 tw-py-1 tw-rounded tw-whitespace-nowrap tw-z-50">
          <span v-if="currentCourseProgress == 100">Completado</span>
          <span v-else>{{ currentCourseProgress }}% de 100%</span>
        </div>
      </div>

      <!-- Botón de pregunta diaria -->
      <div v-if="examDaily" class="tw-relative tw-group tw-mx-1">
        <button @click="isQuestionModalOpen = true" class="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full hover:tw-bg-gray-100 tw-transition-colors">
          <svg class="tw-w-5 tw-h-5 tw-text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
        <!-- Tooltip nativo -->
        <div class="tw-absolute tw-top-full tw-left-1/2 tw--translate-x-1/2 tw-mt-2 tw-hidden group-hover:tw-block tw-bg-gray-900 tw-text-white tw-text-xs tw-font-medium tw-px-2 tw-py-1 tw-rounded tw-whitespace-nowrap tw-z-50">
          Gana puntos contestando preguntas
        </div>
      </div>

      <!-- Botón de certificado -->
      <div v-if="showCertificateIcon && stateCertificate" class="tw-relative tw-group tw-mx-1">
        <button @click="!certificateBought ? buy() : null" class="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full hover:tw-bg-gray-100 tw-transition-colors">
          <svg class="tw-w-6 tw-h-6 tw-text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
        </button>
        <!-- Tooltip nativo -->
        <div class="tw-absolute tw-top-full tw-left-1/2 tw--translate-x-1/2 tw-mt-2 tw-hidden group-hover:tw-block tw-bg-gray-900 tw-text-white tw-text-xs tw-font-medium tw-px-2 tw-py-1 tw-rounded tw-whitespace-nowrap tw-z-50">
          <span v-if="certificateBought">Su certificado ya fue adquirido</span>
          <span v-else>Ya puede adquirir su certificado</span>
        </div>
      </div>

      <!-- Notificaciones -->
      <div class="tw-relative tw-mx-1 tw-z-50">
        <button @click="isNotifMenuOpen = !isNotifMenuOpen; isProfileMenuOpen = false" class="tw-relative tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full hover:tw-bg-gray-100 dark:hover:tw-bg-white/10 tw-transition-colors">
          <svg class="tw-w-6 tw-h-6 tw-text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <div v-if="isBadgeActive" class="tw-absolute tw-top-0 tw-right-0 tw-bg-rose-500 tw-text-white tw-text-[10px] tw-font-bold tw-px-1.5 tw-py-0.5 tw-rounded-full tw-border-2 tw-border-white dark:tw-border-[#161e2e] tw--mt-1 tw--mr-1">{{ numberItems }}</div>
        </button>

        <!-- Dropdown de notificaciones -->
        <div v-if="isNotifMenuOpen" class="tw-absolute tw-right-0 tw-mt-2 tw-w-80 tw-bg-white dark:tw-bg-[#161e2e] tw-rounded-xl tw-shadow-lg tw-border tw-border-gray-100 dark:tw-border-[rgba(255,255,255,0.08)] tw-overflow-hidden tw-animate-fade-in-up">
          <div class="tw-px-4 tw-py-3 tw-border-b tw-border-gray-100 dark:tw-border-[rgba(255,255,255,0.08)]">
            <h3 class="tw-font-outfit tw-text-lg tw-font-bold tw-text-gray-800 dark:tw-text-[#f8fafc]">Notificaciones</h3>
          </div>
          <div v-if="items.length === 0 && !isLoading" class="tw-p-4 tw-text-center tw-text-gray-500 dark:tw-text-[#94a3b8] tw-text-sm tw-font-semibold">
            No existen notificaciones
          </div>
          <div v-if="!isLoading" class="tw-max-h-80 tw-overflow-y-auto tw-scrollbar-hide">
            <div v-for="(item, index) in items" :key="index" class="tw-flex tw-px-4 tw-py-3 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-border-b tw-border-gray-50 dark:tw-border-[rgba(255,255,255,0.06)] tw-cursor-pointer">
              <div class="tw-w-12 tw-h-12 tw-rounded-full tw-overflow-hidden tw-flex-shrink-0 tw-mr-3">
                <img :src="item.avatar" class="tw-w-full tw-h-full tw-object-cover" />
              </div>
              <div class="tw-flex-1 tw-min-w-0">
                <p class="tw-text-sm tw-font-bold tw-text-gray-700 dark:tw-text-[#e2e8f0] tw-truncate">{{ item.title }}</p>
                <p class="tw-text-xs tw-text-gray-500 dark:tw-text-[#94a3b8] tw-line-clamp-2 tw-mb-1">{{ item.subtitle }}</p>
                <timeago class="tw-text-xs tw-font-bold tw-text-gray-600 dark:tw-text-[#94a3b8]" :datetime="item.created_at" :auto-update="60"></timeago>
              </div>
            </div>
          </div>
          <div v-else class="tw-p-4 tw-space-y-4">
            <div v-for="i in 3" :key="i" class="tw-animate-pulse tw-flex tw-space-x-4">
              <div class="tw-rounded-full tw-bg-gray-200 dark:tw-bg-gray-800 tw-h-10 tw-w-10"></div>
              <div class="tw-flex-1 tw-space-y-2 tw-py-1">
                <div class="tw-h-3 tw-bg-gray-200 dark:tw-bg-gray-800 tw-rounded tw-w-3/4"></div>
                <div class="tw-h-3 tw-bg-gray-200 dark:tw-bg-gray-800 tw-rounded tw-w-1/2"></div>
              </div>
            </div>
          </div>
          <div v-if="items.length > 0" class="tw-p-2 tw-border-t tw-border-gray-100 dark:tw-border-[rgba(255,255,255,0.08)]">
            <button class="tw-w-full tw-bg-[#10B981] hover:tw-bg-[#059669] tw-text-white tw-font-bold tw-text-sm tw-py-2 tw-rounded-lg tw-transition-colors">Ver todo</button>
          </div>
        </div>
      </div>

      <!-- Perfil de usuario -->
      <div class="tw-flex tw-items-center tw-ml-2 tw-z-50">
        <!-- Nombre y correo -->
        <div class="tw-hidden md:tw-flex tw-flex-col tw-text-right tw-mr-3">
          <span class="tw-text-[0.92rem] tw-font-bold tw-text-[#1C1917] tw-leading-tight">{{ userName || 'Usuario' }}</span>
          <span class="tw-text-xs tw-text-[#78716C]">{{ userEmail }}</span>
        </div>
        
        <!-- Imagen del perfil y dropdown -->
        <div class="tw-relative">
          <button @click="isProfileMenuOpen = !isProfileMenuOpen; isNotifMenuOpen = false" class="tw-w-10 tw-h-10 tw-rounded-full tw-overflow-hidden tw-bg-[#10B981]/10 tw-border-2 tw-border-[#10B981]/30 hover:tw-scale-105 hover:tw-shadow-[0_0_0_3px_rgba(16,185,129,0.2)] tw-transition-all tw-flex tw-items-center tw-justify-center">
            <img v-if="profileImg" :src="profileImg" class="tw-w-full tw-h-full tw-object-cover" />
            <svg v-else class="tw-w-6 tw-h-6 tw-text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </button>

          <!-- Dropdown perfil -->
          <div v-if="isProfileMenuOpen" class="tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-bg-white tw-rounded-xl tw-shadow-lg tw-border tw-border-gray-100 tw-overflow-hidden tw-py-1 tw-animate-fade-in-up">
            <router-link v-for="(link, index) in links" :key="index" :to="{ name: link.nameRouter }" @click.native="optionAction(link.action, link.nameRouter); isProfileMenuOpen = false" class="tw-block tw-px-4 tw-py-2.5 tw-text-sm tw-font-medium tw-text-[#1C1917] hover:tw-bg-gray-50 tw-transition-colors">
              {{ link.nombre }}
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Modal de pregunta diaria nativo (reemplaza a Bootstrap Modal) -->
    <div v-if="isQuestionModalOpen" class="tw-fixed tw-inset-0 tw-z-[60] tw-flex tw-items-center tw-justify-center tw-bg-black/50 tw-backdrop-blur-sm" @click.self="isQuestionModalOpen = false">
      <div class="tw-bg-white tw-rounded-[24px] tw-w-full tw-max-w-lg tw-mx-4 tw-shadow-2xl tw-overflow-hidden tw-animate-fade-in-up">
        <div class="tw-flex tw-justify-between tw-items-center tw-px-6 tw-py-4 tw-border-b tw-border-gray-100">
          <h5 class="tw-font-outfit tw-font-bold tw-text-xl tw-text-gray-800">Pregunta diaria</h5>
          <button @click="isQuestionModalOpen = false" class="tw-text-gray-400 hover:tw-text-gray-600 tw-transition-colors">
            <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="tw-p-6">
          <QuestionDaily />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import QuestionDaily from "../Student/questions/daily/index";
import { authGet } from "../../helpers/authStorage";
import { clearAuth } from "../../helpers/authStorage";

export default {
  components: {
    QuestionDaily,
  },
  data() {
    return {
      courseSelected: false,
      sheet: false,
      search: null,
      numberItems: 0,
      isBadgeActive: false,
      drawer: false,
      dialogCertificate: false,
      stateCertificate: false,
      isLoading: true,
      
      // Manejadores nativos de dropdowns/modales
      isNotifMenuOpen: false,
      isProfileMenuOpen: false,
      isQuestionModalOpen: false,

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
    async     getpoints() {
      try {
        const userId = authGet("id_user");
        if (userId) {
          await this.getPoints(userId);
        }
      } catch (error) {
        console.warn("Could not fetch user points:", error);
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
        clearAuth();
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
          const { res } = await this.axios.get(
            `/course/certificate/${course}`
          );
          this.certificateBought = res ? res.is_paid == 1 : false;
          this.showCertificateIcon = true;
        } else {
          this.stateCertificate = false;
        }
      } catch (error) {
        console.error(error);
      }
    },
    getUserProfileData() {
      this.userName = authGet("name_user");
      this.userEmail = authGet("email_user");
      this.profileImg = authGet("photo_user");
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
  beforeRouteUpdate(to, from, next) {
    this.getCertificate(to.query.course);
    next();
  },
};
</script>

<style scoped>
/* Elimino las dependencias profundas a Vuetify. Tailwind ahora domina la Navbar. */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
