<template>
  <div class="welcome-card-wrapper">
    <div class="image-card">
      <img class="background-image" src="@/assets/background-login.webp" alt="Promolíder Aula Virtual" />
      <div class="image-overlay"></div>
      
      <!-- Tarjeta flotante en la esquina inferior (Estilo Referencia 1) -->
      <div class="floating-info-card hallmark-glass">
        <div class="d-flex align-center">
          <div class="avatar-badge mr-3">
            <v-icon color="var(--primary-color)" size="24">mdi-school</v-icon>
          </div>
          <div>
            <h4 class="info-title">Aula Virtual Promolíder</h4>
            <p class="info-desc">Tu espacio de aprendizaje y desarrollo profesional continuo.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormWelcome",
};
</script>

<style scoped>
.welcome-card-wrapper {
  height: 100%;
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-card {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(12, 18, 15, 0.2) 0%, rgba(12, 18, 15, 0.65) 100%);
}

.floating-info-card {
  position: absolute;
  bottom: 32px;
  left: 32px;
  right: 32px;
  background: rgba(18, 24, 22, 0.82) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(16, 185, 129, 0.25) !important;
  border-radius: 20px !important;
  padding: 16px 20px !important;
  z-index: 5;
}

.avatar-badge {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-title {
  color: #FFFFFF !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  margin: 0 0 2px 0 !important;
}

.info-desc {
  color: #A1A1AA !important;
  font-size: 0.8rem !important;
  margin: 0 !important;
  line-height: 1.35 !important;
}

@media (max-width: 900px) {
  .welcome-card-wrapper {
    display: none;
  }
}
</style>
