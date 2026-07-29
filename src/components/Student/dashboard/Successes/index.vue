<template>
  <div>
    <!-- Skeleton Screen mientras se ejecuta la request del endpoint -->
    <div v-if="isLoading" class="logros-card hallmark-card skeleton-card">
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center">
          <div class="skeleton-box skeleton-badge mr-3"></div>
          <div>
            <div class="skeleton-box skeleton-line-title mb-2" style="width: 110px;"></div>
            <div class="skeleton-box skeleton-line-sub" style="width: 140px;"></div>
          </div>
        </div>
        <div class="skeleton-box skeleton-btn" style="width: 80px; height: 32px;"></div>
      </div>

      <div class="stepper-container">
        <div v-for="i in 3" :key="i" class="stepper-item mb-4">
          <div class="stepper-node-col">
            <div class="skeleton-box skeleton-node"></div>
          </div>
          <div class="stepper-content-col flex-grow-1">
            <div class="skeleton-box skeleton-line-title mb-2" style="width: 70%;"></div>
            <div class="skeleton-box skeleton-line-sub" style="width: 45%;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido Real al recibir la respuesta JSON -->
    <div v-else class="logros-card hallmark-card">
      <!-- Header de la tarjeta -->
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center">
          <div class="logros-icon-badge mr-3">
            <v-icon color="#10B981" size="22">mdi-trophy-award</v-icon>
          </div>
          <div>
            <h3 class="logros-card-title">Mis Logros</h3>
            <p class="logros-card-subtitle">Progreso de metas activas</p>
          </div>
        </div>
        <v-btn text small color="#10B981" class="ver-logros-btn" @click="goLogros">
          <span>Ver todos</span>
          <v-icon right size="18">mdi-arrow-right</v-icon>
        </v-btn>
      </div>

      <!-- Stepper estilo imagen de referencia -->
      <div class="stepper-container">
        <div v-for="(logro, index) in listLogros" :key="index" class="stepper-item" :class="{ 'completed': logro.completed, 'in-progress': logro.inProgress }">
          <!-- Columna de Icono y Línea vertical -->
          <div class="stepper-node-col">
            <div class="stepper-icon-wrapper">
              <v-icon v-if="logro.completed" color="#10B981" size="26">mdi-check-circle-outline</v-icon>
              <v-icon v-else-if="logro.inProgress" color="#34D399" size="26">mdi-clock-outline</v-icon>
              <v-icon v-else color="#A1A1AA" size="26">mdi-circle-outline</v-icon>
            </div>
            <div v-if="index < listLogros.length - 1" class="stepper-line" :class="{ 'completed-line': logro.completed }"></div>
          </div>

          <!-- Columna de Texto -->
          <div class="stepper-content-col">
            <span class="stepper-title">{{ logro.title }}</span>
            <span class="stepper-subtitle">{{ logro.subtitle }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Successes",
  data() {
    return {
      isLoading: false,
      listLogros: [
        {
          title: "Estudiar 2 horas al día",
          subtitle: "Completado hoy · 14:30",
          completed: true,
          inProgress: false
        },
        {
          title: "Invitar a 3 amigos afiliados",
          subtitle: "En progreso · 2 de 3 invitados",
          completed: false,
          inProgress: true
        },
        {
          title: "Aprobar 1 curso",
          subtitle: "Pendiente por completar",
          completed: false,
          inProgress: false
        }
      ]
    };
  },
  methods: {
    goLogros() {
      this.$router.push("/logros").catch(() => {});
    },
    async fetchLogrosData() {
      try {
        // Al ejecutar llamada a la API, activar isLoading
        const res = await this.axios.get("course/logros-user");
        if (res && res.data && res.data.data) {
          // Asignar lista de logros dinámica si existe
        }
      } catch (e) {
        // manejar error
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.fetchLogrosData();
  }
};
</script>

<style scoped>
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

.skeleton-badge {
  width: 42px;
  height: 42px;
  border-radius: 12px;
}

.skeleton-node {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.skeleton-line-title {
  height: 20px;
  border-radius: 6px;
}

.skeleton-line-sub {
  height: 14px;
  border-radius: 6px;
}

.logros-card {
  background: #FAF9F5 !important;
  border-radius: 20px !important;
  border: 1px solid #E5E3DC !important;
  padding: 24px 28px !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
}

.logros-icon-badge {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logros-card-title {
  font-family: 'Outfit', sans-serif !important;
  color: #18181B !important;
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  margin: 0 !important;
}

.logros-card-subtitle {
  color: #71717A !important;
  font-size: 0.8rem !important;
  margin: 0 !important;
}

.ver-logros-btn {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  text-transform: none !important;
}

.stepper-container {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  flex: 1;
}

.stepper-item {
  display: flex;
  position: relative;
  min-height: 68px;
}

.stepper-node-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 18px;
  position: relative;
  width: 26px;
}

.stepper-icon-wrapper {
  z-index: 2;
  background: #FAF9F5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stepper-line {
  position: absolute;
  top: 26px;
  bottom: 0;
  width: 2px;
  background: #E5E3DC;
  z-index: 1;
}

.completed-line {
  background: #10B981 !important;
}

.stepper-content-col {
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
}

.stepper-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.96rem !important;
  font-weight: 600 !important;
  color: #18181B !important;
  line-height: 1.3;
}

.completed .stepper-title {
  color: #18181B !important;
}

.in-progress .stepper-title {
  color: #10B981 !important;
}

.stepper-subtitle {
  font-size: 0.8rem !important;
  color: #71717A !important;
  margin-top: 3px;
}
</style>
