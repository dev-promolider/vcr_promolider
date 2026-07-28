<template>
  <div class="login-wrapper">
    <section class="login-container">
      <div class="form-section">
        <FormLogin />
      </div>
      <div class="welcome-section">
        <FormWelcome />
      </div>
    </section>
  </div>
</template>

<script>
import FormLogin from "@/components/auth/FormUser/FormLogin.vue";
import FormWelcome from "@/components/auth/FormUser/FormWelcome.vue";

export default {
  name: "Login",
  components: {
    FormLogin,
    FormWelcome,
  },
};
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at 25% 50%, #0F1D17 0%, #080C0A 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.form-section {
  width: 35%;
  flex: 0 0 35%;
  max-width: 35%;
  background: transparent;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-section {
  width: 65%;
  flex: 0 0 65%;
  max-width: 65%;
  position: relative;
  height: 100vh;
}

@media (max-width: 960px) {
  .login-container {
    flex-direction: column;
  }

  .form-section {
    width: 100%;
    flex: 0 0 100%;
    max-width: 100%;
    min-height: 100vh;
  }

  .welcome-section {
    display: none;
  }
}
</style>
