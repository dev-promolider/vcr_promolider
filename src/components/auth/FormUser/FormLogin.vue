<template>
  <div class="login-wrapper">
    <!-- Panel Izquierdo: Formulario -->
    <div class="login-form-panel">
      <div class="form-container">
        <!-- Logo Móvil -->
        <div class="mobile-logo-wrapper">
          <img :src="logoUrl" alt="Promolider Logo" class="mobile-logo" @error="onImgError" />
        </div>

        <h2 class="login-title">Inicia sesión</h2>
        <p class="login-subtitle">Bienvenido de vuelta a la plataforma <strong>Promolíder</strong>.</p>

        <!-- ALERTA DE ERROR PERSONALIZADA DE CRM -->
        <div v-if="errorAlert" class="notifications-container">
          <div class="error-alert">
            <div class="flex-row-alert">
              <div class="flex-shrink-0">
                <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" class="error-svg">
                  <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill-rule="evenodd"></path>
                </svg>
              </div>
              <div class="error-prompt-container">
                <p class="error-prompt-heading">{{ errorAlert.title }}</p>
                <div class="error-prompt-wrap">
                  <p>{{ errorAlert.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="signin" class="login-form">
          <div class="form-group">
            <label for="username">Usuario / Correo</label>
            <div class="input-wrapper">
              <input 
                type="text" 
                id="username" 
                v-model="form.username" 
                required 
                placeholder="ejemplo@correo.com" 
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-wrapper password-input-wrapper">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="form.password" 
                required 
                placeholder="••••••••••••" 
              />
              <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
                </svg>
                <svg v-else style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="options-row">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe" />
              <div class="checkmark"></div>
              <span>Recuérdame</span>
            </label>
            <button type="button" class="forgot-pwd" @click="dialog2 = true">¿Olvidaste tu contraseña?</button>
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            <div class="text-wrapper" :data-text="loading ? 'Validando...' : 'Ingresar a mi cuenta'">
              <span class="actual-text">{{ loading ? 'Validando...' : 'Ingresar a mi cuenta' }}</span>
              <span aria-hidden="true" class="hover-text">{{ loading ? 'Validando...' : 'Ingresar a mi cuenta' }}</span>
            </div>
          </button>
        </form>

        <div class="footer-copy">
          <p>© {{ year }} Promolíder. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>

    <!-- Panel Derecho: Branding Visual & Slider -->
    <div class="login-brand-panel">
      <!-- Background Slides -->
      <div 
        class="slide-bg" 
        :class="{ active: currentSlide === 0 }" 
        :style="{ backgroundImage: `linear-gradient(rgba(18, 19, 23, 0.4), rgba(18, 19, 23, 0.7)), url(${bg1})` }"
      ></div>
      <div 
        class="slide-bg" 
        :class="{ active: currentSlide === 1 }" 
        :style="{ backgroundImage: `linear-gradient(rgba(18, 19, 23, 0.4), rgba(18, 19, 23, 0.7)), url(${bg2})` }"
      ></div>

      <div class="brand-content">
        <img :src="logoUrl" alt="Promolider Logo" class="brand-logo" @error="onImgError" />
        <h1 class="brand-title">El ecosistema líder<br>para emprendedores.</h1>
        <p class="brand-desc">Accede a tus cursos, automatiza tu marketing y gestiona tu billetera desde un solo lugar.</p>
        
        <!-- Elementos decorativos (Glassmorphism) -->
        <div class="glass-card">
          <div class="glass-icon">
            <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
            </svg>
          </div>
          <div>
            <h4>Acceso Seguro</h4>
            <p>Protegido con tecnología avanzada</p>
          </div>
        </div>
      </div>
      
      <!-- Indicators -->
      <div class="slider-indicators">
        <div 
          class="indicator" 
          :class="{ active: currentSlide === 0 }" 
          @click="goToSlide(0)"
        >
          <div class="progress"></div>
        </div>
        <div 
          class="indicator" 
          :class="{ active: currentSlide === 1 }" 
          @click="goToSlide(1)"
        >
          <div class="progress"></div>
        </div>
      </div>
    </div>

    <!-- Password Recovery Dialog -->
    <div v-if="dialog2" class="modal-recovery-overlay">
      <div class="modal-recovery-box">
        <div class="modal-recovery-header">
          <span>Recuperar contraseña</span>
          <button @click="dialog2 = false" class="close-modal-btn">
            <svg style="width: 24px; height: 24px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="modal-recovery-body">
          <p>Enviaremos un correo con sus credenciales, ingrese su correo en la siguiente casilla</p>
          <div class="form-group mb-0">
            <label>Correo electrónico</label>
            <input v-model="recoveryEmail" type="email" required placeholder="correo@ejemplo.com" class="modal-input" />
          </div>
        </div>

        <div class="modal-recovery-footer">
          <button type="button" @click="dialog2 = false" class="btn-cancel">Cancelar</button>
          <button type="button" @click="sendRecoveryEmail" class="btn-send">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FormLogin",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showPassword: false,
      rememberMe: false,
      loading: false,
      dialog2: false,
      recoveryEmail: "",
      currentSlide: 0,
      slideInterval: null,
      year: new Date().getFullYear(),
      bg1: require("@/assets/background-login.webp"),
      bg2: require("@/assets/background-login2.png"),
      logoUrl: require("@/assets/promolider_logo.png"),
    };
  },

  computed: {
    ...mapGetters("user", ["getStatusRequest"]),

    errorAlert() {
      const status = this.getStatusRequest;
      if (status === 401) {
        return {
          title: "Credenciales Incorrectas",
          message: "La contraseña o el usuario no son válidos. Vuelva a intentarlo."
        };
      }
      if (status === 403) {
        return {
          title: "Acceso Denegado",
          message: "Tu cuenta está inactiva o aún no se aprueba su ingreso."
        };
      }
      if (status === 422) {
        return {
          title: "Datos Incompletos",
          message: "Asegúrese de llenar todos los campos con el formato requerido."
        };
      }
      if (status === 500) {
        return {
          title: "Error de Conexión",
          message: "Ha ocurrido un error en el servidor. Intente nuevamente."
        };
      }
      return null;
    }
  },

  mounted() {
    this.startSlider();
  },

  beforeDestroy() {
    this.stopSlider();
  },

  methods: {
    ...mapActions("user", {
      actionUser: "actionUser",
    }),

    onImgError(e) {
      if (e && e.target) {
        e.target.src = "https://via.placeholder.com/220x60?text=Promolider";
      }
    },

    goToSlide(index) {
      this.currentSlide = index;
      this.resetSlider();
    },

    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % 2;
    },

    startSlider() {
      this.slideInterval = setInterval(this.nextSlide, 3000);
    },

    stopSlider() {
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
        this.slideInterval = null;
      }
    },

    resetSlider() {
      this.stopSlider();
      this.startSlider();
    },

    async signin() {
      this.loading = true;
      try {
        await this.actionUser(this.form);
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      } finally {
        this.loading = false;
      }
    },

    async sendRecoveryEmail() {
      if (!this.recoveryEmail) return;
      try {
        const response = await this.axios.post("/public/sendRecoveryEmail", {
          email: this.recoveryEmail,
        });

        if (response.status === 200) {
          this.dialog2 = false;
          if (this.$bvToast) {
            this.$bvToast.toast("Se ha enviado el correo de recuperación", {
              title: "Éxito",
              variant: "success",
            });
          } else {
            alert("Se ha enviado el correo de recuperación");
          }
        }
      } catch (error) {
        if (this.$bvToast) {
          this.$bvToast.toast("Ha ocurrido un error al enviar el correo", {
            title: "Error",
            variant: "danger",
          });
        } else {
          alert("Ha ocurrido un error al enviar el correo");
        }
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  --sidebar-bg: #121317;
  --sidebar-logo-bg: #1a1d24;
  --white: #ffffff;
  --text-muted: #9ca3af;
  --text-light: #d1d5db;
  --sidebar-link: #9ca3af;
  --sidebar-hover-bg: #374151;
  --primary-color: #18d600;
  --primary-hover: #15b800;
  --danger-color: #ef4444;

  display: flex !important;
  min-height: 100vh !important;
  width: 100% !important;
  background-color: #121317 !important;
  color: #ffffff !important;
  font-family: 'Inter', sans-serif !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: 9999 !important;
}

/* ── PANEL IZQUIERDO (FORMULARIO) ── */
.login-form-panel {
  flex: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background-color: #1a1d24 !important;
  padding: 40px !important;
  position: relative !important;
  z-index: 2 !important;
}

.form-container {
  width: 100% !important;
  max-width: 420px !important;
}

.mobile-logo-wrapper {
  display: none;
  margin-bottom: 30px;
}

.mobile-logo {
  max-width: 160px !important;
  width: 160px !important;
  height: auto !important;
}

.login-title {
  color: #ffffff !important;
  font-size: 32px !important;
  font-weight: 800 !important;
  margin-bottom: 8px !important;
  letter-spacing: -0.5px !important;
}

.login-subtitle {
  color: #9ca3af !important;
  font-size: 15px !important;
  margin-bottom: 36px !important;
}

.login-subtitle strong {
  color: #18d600 !important;
}

.login-form {
  display: flex !important;
  flex-direction: column !important;
  gap: 20px !important;
}

.form-group {
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
}

.form-group label {
  color: #9ca3af !important;
  font-size: 14px !important;
  font-weight: 700 !important;
}

.input-wrapper {
  position: relative !important;
  display: flex !important;
  align-items: center !important;
}

.input-wrapper input {
  width: 100% !important;
  padding: 14px 16px !important;
  border: 1px solid #374151 !important;
  border-radius: 10px !important;
  background-color: #121317 !important;
  color: #ffffff !important;
  font-size: 15px !important;
  outline: none !important;
  transition: all 0.2s !important;
}

.input-wrapper input:focus {
  border-color: #18d600 !important;
  background-color: #1a1d24 !important;
  box-shadow: 0 0 0 4px rgba(24, 214, 0, 0.1) !important;
}

.eye-btn {
  position: absolute !important;
  right: 14px !important;
  background: transparent !important;
  border: none !important;
  color: #d1d5db !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: color 0.2s !important;
  padding: 5px !important;
}

.eye-btn:hover {
  color: #18d600 !important;
}

.options-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}

.remember-me {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  color: #9ca3af !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  position: relative !important;
  user-select: none !important;
}

.remember-me input {
  position: absolute !important;
  opacity: 0 !important;
  cursor: pointer !important;
  height: 0 !important;
  width: 0 !important;
}

.remember-me .checkmark {
  --clr: #18d600;
  position: relative !important;
  top: 0 !important;
  left: 0 !important;
  height: 1.4em !important;
  width: 1.4em !important;
  background-color: #374151 !important;
  border-radius: 50% !important;
  transition: 300ms !important;
  display: inline-block !important;
}

.remember-me input:checked ~ .checkmark {
  background-color: var(--clr) !important;
  border-radius: .5rem !important;
  animation: pulse 500ms ease-in-out !important;
}

.remember-me .checkmark:after {
  content: "" !important;
  position: absolute !important;
  display: none !important;
}

.remember-me input:checked ~ .checkmark:after {
  display: block !important;
}

.remember-me .checkmark:after {
  left: 0.45em !important;
  top: 0.2em !important;
  width: 0.25em !important;
  height: 0.5em !important;
  border: solid #1a1d24 !important;
  border-width: 0 0.15em 0.15em 0 !important;
  transform: rotate(45deg) !important;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 rgba(24, 214, 0, 0.5);
    rotate: 20deg;
  }
  50% {
    rotate: -20deg;
  }
  75% {
    box-shadow: 0 0 0 10px rgba(24, 214, 0, 0.3);
  }
  100% {
    box-shadow: 0 0 0 13px rgba(24, 214, 0, 0.1);
    rotate: 0;
  }
}

.forgot-pwd {
  color: #18d600 !important;
  text-decoration: none !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  transition: opacity 0.2s !important;
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
}

.forgot-pwd:hover {
  opacity: 0.8 !important;
}

.submit-btn {
  position: relative !important;
  background: #1a1d24 !important;
  border: 1px solid #374151 !important;
  border-radius: 10px !important;
  cursor: pointer !important;
  z-index: 1 !important;
  padding: 16px !important;
  margin-top: 10px !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  outline: none !important;
  transition: all 0.3s ease !important;
}

.submit-btn:hover:not(:disabled) {
  background: #1e2129 !important;
  border-color: #18d600 !important;
  box-shadow: 0 0 15px rgba(24, 214, 0, 0.15) !important;
}

.submit-btn:disabled {
  opacity: 0.7 !important;
  cursor: not-allowed !important;
}

.text-wrapper {
  position: relative !important;
  --border-right: 4px;
  --animation-color: #18d600;
  --fs-size: 16px;
  letter-spacing: 2px !important;
  text-transform: uppercase !important;
  font-size: var(--fs-size) !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  z-index: 2 !important;
}

.text-wrapper .hover-text {
  position: absolute !important;
  box-sizing: border-box !important;
  content: attr(data-text) !important;
  color: var(--animation-color) !important;
  width: 0% !important;
  inset: 0 !important;
  border-right: var(--border-right) solid var(--animation-color) !important;
  overflow: hidden !important;
  transition: 0.5s !important;
  white-space: nowrap !important;
}

.submit-btn:hover:not(:disabled) .text-wrapper .hover-text {
  width: 100% !important;
  filter: drop-shadow(0 0 15px var(--animation-color)) !important;
}

.footer-copy {
  text-align: center !important;
  margin-top: 48px !important;
}

.footer-copy p {
  color: #9ca3af !important;
  font-size: 14px !important;
  margin: 0 !important;
}

/* ── PANEL DERECHO (BRANDING VISUAL) ── */
.login-brand-panel {
  flex: 1.2 !important;
  position: relative !important;
  overflow: hidden !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 40px !important;
  background-color: #121317 !important;
}

.slide-bg {
  position: absolute !important;
  top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  opacity: 0 !important;
  transition: opacity 1s ease-in-out !important;
  z-index: 1 !important;
}

.slide-bg.active {
  opacity: 1 !important;
}

.slider-indicators {
  position: absolute !important;
  bottom: 40px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  display: flex !important;
  gap: 12px !important;
  z-index: 20 !important;
}

.indicator {
  width: 48px !important;
  height: 4px !important;
  background: rgba(255, 255, 255, 0.3) !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  overflow: hidden !important;
  position: relative !important;
}

.indicator .progress {
  position: absolute !important;
  top: 0 !important; left: 0 !important; bottom: 0 !important;
  width: 0% !important;
  background: #ffffff !important;
  border-radius: 4px !important;
}

.indicator.active .progress {
  animation: slideProgress 3s linear forwards !important;
}

@keyframes slideProgress {
  0% { width: 0%; }
  100% { width: 100%; }
}

.brand-content {
  position: relative !important;
  z-index: 10 !important;
  max-width: 500px !important;
  color: #ffffff !important;
}

.brand-logo {
  max-width: 220px !important;
  width: 220px !important;
  height: auto !important;
  margin-bottom: 40px !important;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)) !important;
}

.brand-title {
  font-size: 48px !important;
  font-weight: 900 !important;
  line-height: 1.1 !important;
  margin-bottom: 20px !important;
  letter-spacing: -1px !important;
  color: #ffffff !important;
}

.brand-desc {
  font-size: 18px !important;
  color: #9ca3af !important;
  line-height: 1.6 !important;
  margin-bottom: 40px !important;
}

/* Glassmorphism Card */
.glass-card {
  background: #16181d !important;
  border-radius: 30px !important;
  padding: 20px 28px !important;
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
  max-width: 350px !important;
  border: none !important;
  box-shadow: 12px 12px 30px rgba(0, 0, 0, 0.6),
             -12px -12px 30px rgba(255, 255, 255, 0.03) !important;
}

.glass-icon {
  width: 48px !important;
  height: 48px !important;
  border-radius: 12px !important;
  background: rgba(24, 214, 0, 0.2) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #18d600 !important;
  flex-shrink: 0 !important;
}

.glass-card h4 {
  font-size: 16px !important;
  font-weight: 700 !important;
  margin-bottom: 4px !important;
  color: #ffffff !important;
}

.glass-card p {
  font-size: 13px !important;
  color: #d1d5db !important;
}

/* Modal Recuperar Contraseña */
.modal-recovery-overlay {
  position: fixed !important;
  inset: 0 !important;
  z-index: 10000 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(4px) !important;
  padding: 16px !important;
}

.modal-recovery-box {
  background: #1a1d24 !important;
  border: 1px solid #374151 !important;
  border-radius: 16px !important;
  width: 100% !important;
  max-width: 480px !important;
  overflow: hidden !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5) !important;
}

.modal-recovery-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 16px 24px !important;
  border-bottom: 1px solid #374151 !important;
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: 700 !important;
}

.close-modal-btn {
  background: transparent !important;
  border: none !important;
  color: #9ca3af !important;
  cursor: pointer !important;
}

.close-modal-btn:hover {
  color: #ffffff !important;
}

.modal-recovery-body {
  padding: 24px !important;
}

.modal-recovery-body p {
  color: #9ca3af !important;
  font-size: 14px !important;
  margin-bottom: 16px !important;
}

.modal-input {
  width: 100% !important;
  padding: 12px 16px !important;
  background: #121317 !important;
  border: 1px solid #374151 !important;
  border-radius: 10px !important;
  color: #ffffff !important;
  outline: none !important;
}

.modal-input:focus {
  border-color: #18d600 !important;
}

.modal-recovery-footer {
  padding: 16px 24px !important;
  background: #121317 !important;
  display: flex !important;
  justify-content: flex-end !important;
  gap: 12px !important;
  border-top: 1px solid #374151 !important;
}

.btn-cancel {
  background: transparent !important;
  border: none !important;
  color: #9ca3af !important;
  font-weight: 600 !important;
  padding: 10px 16px !important;
  cursor: pointer !important;
}

.btn-cancel:hover {
  color: #ffffff !important;
}

.btn-send {
  background: #18d600 !important;
  color: #121317 !important;
  border: none !important;
  font-weight: 700 !important;
  padding: 10px 20px !important;
  border-radius: 10px !important;
  cursor: pointer !important;
}

.btn-send:hover {
  background: #15b800 !important;
}

/* Alert Notification CSS */
.notifications-container {
  width: 100% !important;
  margin-bottom: 20px !important;
}

.error-alert {
  border-radius: 6px !important;
  padding: 16px !important;
  background-color: #fee2e2 !important;
  border-left: 4px solid #f87171 !important;
}

.flex-row-alert {
  display: flex !important;
}

.error-svg {
  color: #f87171 !important;
  width: 20px !important;
  height: 20px !important;
}

.error-prompt-container {
  display: flex !important;
  flex-direction: column !important;
  margin-left: 16px !important;
}

.error-prompt-heading {
  color: #991b1b !important;
  font-size: 14px !important;
  font-weight: bold !important;
  margin: 0 !important;
}

.error-prompt-wrap p {
  margin-top: 4px !important;
  color: #b91c1c !important;
  font-size: 14px !important;
  margin-bottom: 0 !important;
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .login-brand-panel {
      display: none !important;
  }
  .mobile-logo-wrapper {
      display: flex !important;
  }
  .login-form-panel {
      padding: 20px !important;
  }
}

/* Autofill Fix */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #121317 inset !important;
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
</style>
