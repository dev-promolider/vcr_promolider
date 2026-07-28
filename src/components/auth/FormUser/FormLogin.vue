<template>
  <div class="form-container">
    <!-- Alerts -->
    <div class="alerts-container">
      <div class="alert alert-danger" role="alert" v-if="getStatusRequest === 401">
        Usuario y/o contraseña incorrecta, vuelva a intentarlo
      </div>
      <div class="alert alert-danger" role="alert" v-if="getStatusRequest === 403">
        Aún no se aprueba su ingreso, vuelva a intentarlo más tarde
      </div>
      <div class="alert alert-danger" role="alert" v-if="getStatusRequest === 422">
        Asegúrese de llenar todos los campos con el formato requerido
      </div>
      <div class="alert alert-success" role="alert" v-if="getStatusRequest === 200">
        Sesión iniciada exitosamente
      </div>
    </div>

    <div class="form-inner">
      <!-- Logo & Header (Idéntico a SignInPageDemo) -->
      <div class="login-header mb-4">
        <div class="brand-row mb-3">
          <img src="@/assets/logo-inicial.png" alt="Logo" class="logo-image mr-2" />
          <span class="brand-name">Promolíder</span>
        </div>
        <h1 class="welcome-title">Bienvenido</h1>
        <p class="welcome-subtitle">Accede a tu cuenta y continúa tu aprendizaje con nosotros</p>
      </div>

      <!-- Login Form (Idéntico a SignInPageDemo) -->
      <b-form @submit.prevent="signin" class="login-form">
        <b-form-group class="form-group" label="Usuario / Correo">
          <b-form-input class="form-input" type="text" v-model="form.username" placeholder="Ingresa tu usuario o correo"
            required></b-form-input>
        </b-form-group>

        <b-form-group class="form-group" label="Contraseña">
          <div class="password-input-container">
            <b-form-input class="form-input" :type="showPassword ? 'text' : 'password'" v-model="form.password"
              placeholder="••••••••" required></b-form-input>
            <button type="button" class="password-toggle" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </b-form-group>

        <div class="form-options">
          <b-form-checkbox v-model="rememberMe" switch class="remember-switch"> Recuérdame </b-form-checkbox>
          <button type="button" class="forgot-password" @click="dialog2 = true">
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <b-button type="submit" class="submit-button"> Ingresar </b-button>
      </b-form>

      <!-- Footer -->
      <div class="footer">
        <p class="copyright-text">
          © {{ year }} Promolíder. Todos los derechos reservados.
        </p>
      </div>
    </div>

    <!-- Password Recovery Dialog -->
    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title class="dialog-header">
          <span>Recuperar contraseña</span>
          <v-btn icon @click="dialog2 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <p class="recovery-text">
            Enviaremos un correo con sus credenciales, ingrese su correo en la
            siguiente casilla
          </p>
          <v-text-field v-model="recoveryEmail" label="Correo electrónico" type="email" outlined
            required></v-text-field>
        </v-card-text>

        <v-card-actions class="dialog-actions">
          <v-btn color="primary" @click="sendRecoveryEmail"> Enviar </v-btn>
          <v-btn text @click="dialog2 = false"> Cancelar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FormLogin",
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
      showPassword: false,
      rememberMe: false,
      dialog2: false,
      recoveryEmail: "",
      year: new Date().getFullYear(),
    };
  },

  computed: {
    ...mapGetters("user", ["getStatusRequest"]),
  },

  methods: {
    ...mapActions("user", {
      actionUser: "actionUser",
    }),

    signin() {
      this.actionUser(this.form);
    },

    async sendRecoveryEmail() {
      try {
        const response = await this.axios.post("/public/sendRecoveryEmail", {
          email: this.recoveryEmail,
        });

        if (response.status === 200) {
          this.dialog2 = false;
          this.$bvToast.toast("Se ha enviado el correo de recuperación", {
            title: "Éxito",
            variant: "success",
          });
        }
      } catch (error) {
        this.$bvToast.toast("Ha ocurrido un error al enviar el correo", {
          title: "Error",
          variant: "danger",
        });
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  height: 100%;
  width: 100%;
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(14, 20, 17, 0.88) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
}

.form-inner {
  width: 100%;
  max-width: 100%;
}

.brand-row {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 36px;
  width: auto;
}

.brand-name {
  font-family: 'Outfit', sans-serif;
  color: #10B981;
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 0.05em;
}

.welcome-title {
  font-family: 'Outfit', sans-serif !important;
  color: #FFFFFF !important;
  font-size: 2.85rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
  margin-bottom: 8px !important;
}

.welcome-subtitle {
  color: #A1A1AA;
  font-size: 1.02rem;
  margin-bottom: 2.5rem;
  line-height: 1.4;
}

.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

/* Corregido: Labels y Legends 100% visibles en blanco brillante */
.form-group /deep/ label,
.form-group /deep/ legend,
.form-group /deep/ .col-form-label,
label {
  color: #F4F4F5 !important;
  font-size: 0.92rem !important;
  font-weight: 600 !important;
  margin-bottom: 0.5rem !important;
}

/* Corregido: Inputs oscuros refinados en tono #1F2923 */
.form-input,
.form-control,
input.form-control,
input.form-input {
  border-radius: 12px !important;
  padding: 0.85rem 1.25rem !important;
  height: 54px !important;
  background-color: #1F2923 !important;
  border: 1.5px solid rgba(16, 185, 129, 0.3) !important;
  color: #FFFFFF !important;
  font-size: 1rem !important;
  transition: all 0.2s ease !important;
}

.form-input:focus,
.form-control:focus,
input.form-control:focus {
  background-color: #24322A !important;
  border-color: #10B981 !important;
  color: #FFFFFF !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25) !important;
  outline: none !important;
}

/* Evitar el fondo azul/blanco predeterminado de autofill de Chrome/Edge */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #1F2923 inset !important;
  -webkit-text-fill-color: #FFFFFF !important;
  transition: background-color 5000s ease-in-out 0s;
}

.password-input-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #A1A1AA;
  cursor: pointer;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #10B981;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0 2.2rem 0;
  color: #A1A1AA;
  font-size: 0.92rem;
}

.remember-switch /deep/ label {
  color: #E4E4E7 !important;
  font-size: 0.92rem !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  user-select: none !important;
  padding-left: 0.5rem !important;
}

.remember-switch /deep/ .custom-control-label::before {
  background-color: #27272A !important;
  border-color: #3F3F46 !important;
  border-radius: 9999px !important;
  width: 2.3rem !important;
  height: 1.3rem !important;
  top: 0.1rem !important;
}

.remember-switch /deep/ .custom-control-label::after {
  background-color: #A1A1AA !important;
  border-radius: 50% !important;
  width: calc(1.3rem - 4px) !important;
  height: calc(1.3rem - 4px) !important;
  top: calc(0.1rem + 2px) !important;
  left: calc(-2.3rem + 2px) !important;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s ease !important;
}

.remember-switch /deep/ .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #10B981 !important;
  border-color: #10B981 !important;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.4) !important;
}

.remember-switch /deep/ .custom-control-input:checked ~ .custom-control-label::after {
  background-color: #FFFFFF !important;
  transform: translateX(1rem) !important;
}

.forgot-password {
  color: #10B981;
  background: none;
  border: none;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.forgot-password:hover {
  color: #34D399;
  text-decoration: underline;
}

.submit-button {
  width: 100%;
  height: 54px !important;
  padding: 0 1.5rem !important;
  border-radius: 14px !important;
  background: linear-gradient(135deg, #34D399 0%, #10B981 100%) !important;
  border: none !important;
  color: #FFFFFF !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.08rem !important;
  box-shadow: 0 6px 20px 0 rgba(16, 185, 129, 0.3) !important;
  transition: all 0.25s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.submit-button:hover {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 24px 0 rgba(16, 185, 129, 0.4) !important;
}

.footer {
  text-align: center;
  margin-top: 3rem;
}

.copyright-text {
  color: #71717A;
  font-size: 0.8rem;
  margin: 0;
}

.alerts-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

.alert {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .form-container {
    min-height: 100vh;
  }
}
</style>
