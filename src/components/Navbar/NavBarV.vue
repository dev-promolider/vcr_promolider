<template>
  <div>
    <v-navigation-drawer v-model="drawer" app :permanent="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
      :mini-variant="!isHovered && !$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm" :mini-variant-width="72" :width="275"
      @mouseenter.native="isHovered = true" @mouseleave.native="isHovered = false"
      class="color-drawer hallmark-sidebar">
      
      <!-- Header Logo / Brand (Estilo Aceternity) -->
      <div class="sidebar-header d-flex align-center px-4 py-4">
        <div class="logo-icon-wrapper mr-3">
          <img src="@/assets/logo-inicial.png" alt="Promolíder" class="logo-icon-img" />
        </div>
        <div class="brand-text-wrapper" v-show="isHovered || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
          <span class="brand-title">Promolíder</span>
          <span class="brand-subtitle">Aula Virtual</span>
        </div>
      </div>

      <v-divider class="mx-3 mb-2 border-dark"></v-divider>

      <!-- Navigation Links Principales -->
      <v-list nav dense class="px-2 py-1">
        <template v-if="showNav">
          <template v-for="(link, index) in listNavBar">
            <v-list-item v-if="!(role === 'Distributor' && link.nombre === 'Mis cursos')" link :key="index"
              :to="{ name: link.path }" class="sidebar-link-item my-1">
              <v-list-item-icon class="mr-3 my-auto">
                <v-icon :class="{
                  'active-icon': $route.name === link.path,
                  'inactive-icon': $route.name !== link.path,
                }">
                  {{ `mdi-${link.icon}` }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title :class="{
                'active-text': $route.name === link.path,
                'inactive-text': $route.name !== link.path,
              }" class="sidebar-label">
                {{ link.nombre }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </template>
        <template v-else>
          <div class="my-4 box animation"></div>
          <div v-for="qty in listNavBar.length - 1" :key="qty">
            <div class="my-4 box animation"></div>
          </div>
        </template>
      </v-list>

      <!-- LÍNEA DIVISORIA DE SECCIÓN (Herramientas & Cuenta) -->
      <v-divider class="mx-3 my-2 border-dark"></v-divider>

      <!-- Sección de Funcionalidades del Toolbar -->
      <v-list nav dense class="px-2 py-1">
        <!-- Puntos del usuario -->
        <v-list-item v-if="points >= 0" class="sidebar-link-item my-1" link :to="{ name: 'leaderBoard' }">
          <v-list-item-icon class="mr-3 my-auto">
            <v-icon color="#10B981">mdi-trophy-award</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="inactive-text sidebar-label d-flex align-center justify-space-between">
            <span>Mis Puntos</span>
            <span class="points-badge">{{ points }} Pts</span>
          </v-list-item-title>
        </v-list-item>

        <!-- Notificaciones -->
        <v-menu right offset-x nudge-right="12" :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item class="sidebar-link-item my-1" v-bind="attrs" v-on="on" link>
              <v-list-item-icon class="mr-3 my-auto">
                <v-badge overlap color="#F43F5E" :value="isBadgeActive" :content="numberItems">
                  <v-icon color="#FAF9F5">mdi-bell-outline</v-icon>
                </v-badge>
              </v-list-item-icon>
              <v-list-item-title class="inactive-text sidebar-label">
                Notificaciones
              </v-list-item-title>
            </v-list-item>
          </template>

          <v-card class="notification-popover-card">
            <div class="d-flex align-center justify-space-between px-4 py-3">
              <span class="notification-popover-title">Notificaciones</span>
              <v-chip v-if="numberItems > 0" x-small color="#10B981" class="font-weight-bold text-white">
                {{ numberItems }} Nuevas
              </v-chip>
            </div>
            <v-divider class="border-dark my-0"></v-divider>

            <v-list three-line class="notification-list py-0" style="max-height: 360px; overflow-y: auto;">
              <div class="px-4 py-5 text-center" v-if="notifications.length === 0">
                <v-icon color="#52525B" size="32" class="mb-2">mdi-bell-off-outline</v-icon>
                <p class="empty-notifications-text">No tienes notificaciones pendientes</p>
              </div>
              <template v-else>
                <v-list-item v-for="(item, index) in notifications" :key="index" class="notification-item">
                  <v-list-item-avatar height="40px" width="40px" class="my-auto mr-3">
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="item.title" class="noti-item-title"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.subtitle" class="noti-item-subtitle"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-menu>

        <!-- Pregunta Diaria -->
        <v-list-item v-if="examDaily" class="sidebar-link-item my-1" link data-toggle="modal" data-target="#question">
          <v-list-item-icon class="mr-3 my-auto">
            <v-icon color="#10B981">mdi-help-box</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="inactive-text sidebar-label">
            Pregunta Diaria
          </v-list-item-title>
        </v-list-item>

        <!-- Mi Perfil -->
        <v-list-item link :to="{ name: 'perfil' }" class="sidebar-link-item my-1">
          <v-list-item-icon class="mr-3 my-auto">
            <v-icon color="#FAF9F5">mdi-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="inactive-text sidebar-label">Mi Perfil</v-list-item-title>
        </v-list-item>

        <!-- Mis Preferencias -->
        <v-list-item link :to="{ name: 'option-preferences' }" class="sidebar-link-item my-1">
          <v-list-item-icon class="mr-3 my-auto">
            <v-icon color="#FAF9F5">mdi-cog-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="inactive-text sidebar-label">Preferencias</v-list-item-title>
        </v-list-item>

        <!-- Cerrar Sesión -->
        <v-list-item link @click="closeSession" class="sidebar-link-item my-1 logout-item">
          <v-list-item-icon class="mr-3 my-auto">
            <v-icon color="#F43F5E">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="sidebar-label" style="color: #F43F5E !important">Cerrar Sesión</v-list-item-title>
        </v-list-item>
      </v-list>

      <!-- Bottom Footer Slot (FAQ) -->
      <template v-slot:append>
        <div class="sidebar-footer">
          <v-divider class="mx-3 mb-2 border-dark"></v-divider>

          <v-list nav dense class="px-2 py-1 mb-2">
            <v-list-item link :to="{ name: 'preguntas-frecuentes' }" class="sidebar-link-item mb-1">
              <v-list-item-icon class="mr-3 my-auto">
                <v-icon color="#FAF9F5">mdi-help-circle-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="inactive-text sidebar-label">Ayuda & FAQ</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Modal Pregunta Diaria -->
    <div class="modal fade" tabindex="-1" role="dialog" id="question">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content hallmark-card">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" style="color: #10B981">Pregunta diaria</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
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
import { mapActions, mapState } from "vuex";
import QuestionDaily from "@/components/Student/questions/daily/index";

export default {
  name: "NavBarV",
  components: {
    QuestionDaily,
  },
  data() {
    return {
      drawer: null,
      isHovered: false,
      showNav: false,
      role: null,
      numberItems: 0,
      isBadgeActive: false,
      notifications: [],
      listNavBar: [
        { nombre: "Inicio", icon: "home", path: "home" },
        { nombre: "Mi aprendizaje", icon: "book", path: "suscription-user" },
        { nombre: "Mis infoproductos", icon: "book-check", path: "myCourses" },
        { nombre: "Marketplace", icon: "store", path: "courses" },
        { nombre: "Mis exámenes", icon: "file", path: "examenes" },
        {
          nombre: "Mis certificaciones",
          icon: "school",
          path: "certificado-user",
        },
        { nombre: "Mensajes", icon: "message-processing", path: "messages" },
        { nombre: "Logros", icon: "trophy", path: "logros" },
        { nombre: "Clasificación", icon: "star", path: "leaderBoard" },
      ],
    };
  },
  computed: {
    ...mapState("sections", ["topSection"]),
    ...mapState("course", ["points", "examDaily"]),
  },
  methods: {
    ...mapActions("course", ["getPoints"]),
    async fetchUserPoints() {
      try {
        const userId = localStorage.getItem("id_user");
        if (userId) {
          await this.getPoints(userId);
        }
      } catch (e) {
        console.warn("Error fetching points:", e);
      }
    },
    async getNotifications() {
      try {
        const data = await this.axios.get("/notifications/list");
        if (data && data.data && Array.isArray(data.data)) {
          this.notifications = data.data.map((e) => ({
            title: e.title,
            subtitle: e.body,
            avatar: e.photo,
          }));
          if (this.notifications.length > 0) {
            this.isBadgeActive = true;
            this.numberItems = this.notifications.length;
          }
        }
      } catch (e) {
        this.notifications = [];
      }
    },
    closeSession() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("status_user");
      localStorage.removeItem("name_user");
      localStorage.removeItem("email_user");
      localStorage.removeItem("id_user");
      this.$router.push({ name: "Login" });
    },
    async getRole() {
      try {
        const response = await this.axios.get("/user/get-rolename");
        this.role = response.data.data;
      } catch (error) {
        this.role = "";
      } finally {
        this.showNav = true;
      }
    },
  },
  mounted() {
    this.getRole();
    this.fetchUserPoints();
    this.getNotifications();
  },
};
</script>

<style lang="scss">
.box {
  height: 25px;
  border-radius: 5px;
  width: 80%;
  margin: auto;
}

.animation {
  animation: pulsos 1s infinite;
}

@keyframes pulsos {
  0% {
    background: #eee;
  }

  50% {
    background: #bfbfbf;
  }

  100% {
    background: #eee;
  }
}

/* Transición suave de la barra lateral al expandir/contraer (Efecto Aceternity) */
.hallmark-sidebar.v-navigation-drawer {
  background: #18181B !important; /* Charcoal Dark Surface */
  border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.sidebar-header {
  height: 64px;
  overflow: hidden;
  white-space: nowrap;
}

.logo-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-icon-img {
  height: 22px;
  width: auto;
}

.brand-text-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: opacity 0.2s ease;
}

.brand-title {
  color: #FAF9F5 !important; /* Blanco Crema */
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.05rem !important;
  line-height: 1.1 !important;
}

.brand-subtitle {
  color: #34D399 !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
}

.border-dark {
  border-color: rgba(255, 255, 255, 0.08) !important;
}

.points-badge {
  background: rgba(16, 185, 129, 0.15);
  color: #10B981;
  font-weight: 700;
  font-size: 0.78rem;
  padding: 2px 8px;
  border-radius: 9999px;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* Estilos e interacción hover para los links (translate-x-1) */
.sidebar-link-item {
  border-radius: 12px !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  min-height: 44px !important;
}

.sidebar-link-item:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  transform: translateX(4px) !important;
}

.sidebar-link-item.v-list-item--active {
  background: rgba(16, 185, 129, 0.18) !important;
  border: 1px solid rgba(16, 185, 129, 0.35) !important;
  transform: translateX(4px) !important;
}

.logout-item:hover {
  background: rgba(244, 63, 94, 0.12) !important;
}

.sidebar-label {
  font-size: 0.9rem !important;
  font-weight: 500 !important;
}

/* Tipografía y Color Blanco Crema para todos los ítems */
.active-text {
  color: #10B981 !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
}

.inactive-text {
  color: #FAF9F5 !important; /* Blanco Crema */
  font-family: 'Plus Jakarta Sans', sans-serif !important;
}

.active-icon {
  color: #10B981 !important;
}

.inactive-icon {
  color: #FAF9F5 !important; /* Blanco Crema */
}

.v-navigation-drawer__content::-webkit-scrollbar-track {
  background-color: #18181B;
}

.v-navigation-drawer__content::-webkit-scrollbar {
  width: 4px;
}

.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #27272A;
}

/* Estilos de la tarjeta flotante de notificaciones */
.notification-popover-card {
  background: #18181B !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 16px !important;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45) !important;
  overflow: hidden !important;
  min-width: 320px !important;
}

.notification-popover-title {
  color: #FAF9F5 !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 0.95rem !important;
}

.empty-notifications-text {
  color: #A1A1AA !important;
  font-size: 0.85rem !important;
  margin: 0 !important;
}

.notification-list {
  background: transparent !important;
}

.notification-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease;
}

.notification-item:hover {
  background: rgba(255, 255, 255, 0.04) !important;
}

.noti-item-title {
  color: #FAF9F5 !important;
  font-size: 0.88rem !important;
  font-weight: 600 !important;
}

.noti-item-subtitle {
  color: #A1A1AA !important;
  font-size: 0.78rem !important;
}
</style>
