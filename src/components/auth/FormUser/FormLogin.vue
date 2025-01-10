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

    <!-- Logo -->
    <div class="logo-container">
      <img src="@/assets/logo-inicial.png" alt="Logo" class="logo-image" />
      <div class="text-logo">Promolíder</div>
    </div>

    <!-- Login Form -->
    <b-form @submit.prevent="signin" class="login-form">
      <b-form-group class="form-group" label="Usuario *">
        <b-form-input class="form-input" type="text" v-model="form.username" placeholder="Ingrese su usuario"
          required></b-form-input>
      </b-form-group>

      <b-form-group class="form-group" label="Contraseña *">
        <div class="password-input-container">
          <b-form-input class="form-input" :type="showPassword ? 'text' : 'password'" v-model="form.password"
            placeholder="Ingrese su contraseña" required></b-form-input>
          <button type="button" class="password-toggle" @click="showPassword = !showPassword">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
      </b-form-group>

      <div class="form-options">
        <b-form-checkbox v-model="rememberMe"> Recuérdame </b-form-checkbox>
        <button type="button" class="forgot-password" @click="dialog2 = true">
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <b-button type="submit" class="submit-button"> Ingresar </b-button>
    </b-form>

    <!-- Footer -->
    <div class="footer">
      <h5>
        Copyright © {{ year }}. Todos los derechos reservados para Promolíder
      </h5>
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
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo-image {
  height: 50px;
  width: auto;
}

.text-logo {
  color: white;
  font-size: 1.5rem;
  margin-left: 1rem;
  letter-spacing: 0.2em;
}

.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  color: white;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.form-input {
  border-radius: 25px;
  padding: 0.75rem 1rem;
  background: white;
  border: none;
}

.password-input-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  color: white;
}

.forgot-password {
  color: #1ae800;
  background: none;
  border: none;
  font-size: 0.9rem;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  border-radius: 25px;
  background: #1ae800;
  border: none;
  color: white;
  font-weight: 500;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background: #15cc00;
}

.footer {
  text-align: center;
  margin-top: 2rem;
}

.footer h5 {
  color: #989898;
  font-size: 0.7rem;
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
