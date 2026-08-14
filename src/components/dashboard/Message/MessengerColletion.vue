<template>
  <div class="card-message tw-p-3 tw-flex tw-flex-col">
    <!-- Encabezado del contenedor (Siempre visible de forma instantánea) -->
    <div class="header tw-flex tw-items-center tw-justify-between tw-mb-3">
      <h3 class="header-title tw-m-0">Mensajes</h3>
      <router-link to="/messages" class="header-link tw-no-underline">Todos los mensajes</router-link>
    </div>

    <!-- Contenido dinámico dependiente de la respuesta JSON del endpoint -->
    <div class="messages-content-area tw-grow">
      <!-- 1. SKELETON SCREEN: Se muestra ÚNICAMENTE mientras el endpoint está consultando datos -->
      <div v-if="getLastMessages == null" class="skeleton-messages-wrapper tw-py-1">
        <div v-for="i in 3" :key="i" class="skeleton-message-item tw-flex tw-items-center tw-mb-2 tw-p-2">
          <div class="skeleton-box tw-mr-3 tw-w-[42px] tw-h-[42px] tw-rounded-full tw-shrink-0"></div>
          <div class="tw-grow">
            <div class="skeleton-box tw-mb-2" style="width: 55%; height: 16px; border-radius: 6px;"></div>
            <div class="skeleton-box" style="width: 85%; height: 14px; border-radius: 6px;"></div>
          </div>
        </div>
      </div>

      <!-- 2. ESTADO VACÍO: Si el endpoint retorna 0 mensajes -->
      <div v-else-if="getLastMessages.length === 0 || getLastMessages == 0" class="center-element no-result tw-my-4 tw-text-center">
        <svg class="tw-w-8 tw-h-8 tw-text-[#A1A1AA] tw-mb-1 tw-mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        <p class="tw-text-gray-500 tw-m-0" style="font-size: 0.88rem;">No existen mensajes pendientes</p>
      </div>

      <!-- 3. RENDERIZADO DE MENSAJES REALES: Al retornar el JSON funcional -->
      <div v-else class="messages-list">
        <div class="message-item tw-flex tw-items-center tw-p-3 tw-mb-2" v-for="user in getLastMessages" :key="user.id">
          <div class="tw-w-[42px] tw-h-[42px] tw-rounded-full tw-overflow-hidden tw-mr-3 tw-shrink-0">
            <img :src="user.photo || 'https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240'" class="tw-w-full tw-h-full tw-object-cover" />
          </div>
          <div class="message-info tw-grow tw-overflow-hidden">
            <span class="message-user tw-font-bold tw-block">{{ user.fullname }}</span>
            <span class="message-body tw-truncate tw-block">{{ user.message }}</span>
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
  color: var(--primary-color) !important;
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
  border-color: var(--primary-color) !important;
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
