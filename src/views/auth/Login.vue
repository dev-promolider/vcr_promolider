<template>
  <div class="login-wrapper">
    <section class="login-container">
      <div class="welcome-section">
        <FormWelcome />
      </div>
      <div class="form-section">
        <FormLogin />
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
}

.login-container {
  display: flex;
  min-height: 100vh;
}

.welcome-section {
  flex: 1;
  position: relative;
}

.form-section {
  width: 450px;
  background: rgba(53, 66, 74, 0.95);
  z-index: 2;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column-reverse;
  }

  .welcome-section {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .form-section {
    width: 100%;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }
}
</style>
