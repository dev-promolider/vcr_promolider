<template>
  <div class="welcome-container">
    <img class="background-image" src="@/assets/background-login.webp" alt="Background" />
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: "FormWelcome",
};
</script>

<style scoped>
.welcome-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .welcome-container {
    height: 100vh;
  }
}
</style>
