<template>
  <div class="card-message p-3 d-flex flex-column">
    <!-- Encabezado del contenedor (Siempre visible de forma instantánea) -->
    <div class="header d-flex align-center justify-space-between mb-3">
      <h3 class="header-title m-0">Mensajes</h3>
      <router-link to="/messages" class="header-link text-decoration-none">Todos los mensajes</router-link>
    </div>

    <!-- Contenido dinámico dependiente de la respuesta JSON del endpoint -->
    <div class="messages-content-area flex-grow-1">
      <!-- 1. SKELETON SCREEN: Se muestra ÚNICAMENTE mientras el endpoint está consultando datos -->
      <div v-if="getLastMessages == null" class="skeleton-messages-wrapper py-1">
        <div v-for="i in 3" :key="i" class="skeleton-message-item d-flex align-items-center mb-2 p-2">
          <div class="skeleton-box mr-3" style="width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;"></div>
          <div class="flex-grow-1">
            <div class="skeleton-box mb-2" style="width: 55%; height: 16px; border-radius: 6px;"></div>
            <div class="skeleton-box" style="width: 85%; height: 14px; border-radius: 6px;"></div>
          </div>
        </div>
      </div>

      <!-- 2. ESTADO VACÍO: Si el endpoint retorna 0 mensajes -->
      <div v-else-if="getLastMessages.length === 0 || getLastMessages == 0" class="center-element no-result my-4 text-center">
        <v-icon color="#A1A1AA" size="32" class="mb-1">mdi-message-off-outline</v-icon>
        <p class="text-muted m-0" style="font-size: 0.88rem;">No existen mensajes pendientes</p>
      </div>

      <!-- 3. RENDERIZADO DE MENSAJES REALES: Al retornar el JSON funcional -->
      <div v-else class="messages-list">
        <div class="message-item d-flex align-center p-3 mb-2" v-for="user in getLastMessages" :key="user.id">
          <b-avatar variant="info" :src="user.photo || 'https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240'" size="42" class="mr-3 flex-shrink-0"></b-avatar>
          <div class="message-info flex-grow-1 overflow-hidden">
            <span class="message-user font-weight-bold d-block">{{ user.fullname }}</span>
            <span class="message-body text-truncate d-block">{{ user.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MessengerColletion",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("lastMessage", ["getLastMessages"]),
  },
  methods: {
    ...mapActions("lastMessage", {
      actionLastMessages: "actionLastMessages",
    }),
  },
  created() {
    this.actionLastMessages();
  },
};
</script>

<style scoped>
.card-message {
  background: #FAF9F5 !important;
  border-radius: 20px !important;
  border: 1px solid #E5E3DC !important;
  min-height: 280px;
}

.header-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.1rem !important;
  color: #18181B !important;
}

.header-link {
  font-family: 'Outfit', sans-serif !important;
  color: #10B981 !important;
  font-weight: 600 !important;
  font-size: 0.88rem !important;
}

.message-item {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 14px !important;
  transition: all 0.2s ease !important;
}

.message-item:hover {
  border-color: #10B981 !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.12) !important;
}

.message-user {
  font-family: 'Outfit', sans-serif !important;
  color: #18181B !important;
  font-size: 0.92rem !important;
}

.message-body {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  color: #71717A !important;
  font-size: 0.82rem !important;
}

/* Skeleton Loader Box & Animations */
.skeleton-box {
  background-color: #E5E3DC;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.5) 20%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  background-position: -150px 0;
  border-radius: 8px;
  animation: skeleton-shimmer 1.6s infinite ease-in-out;
}

@keyframes skeleton-shimmer {
  to {
    background-position: calc(100% + 150px) 0;
  }
}
</style>
