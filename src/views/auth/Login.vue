<template>
  <div>
    <section class="row">
      <div
        class="col-md-7 col-lg-8 col-sm-6"
        style="max-width: 100%; height: 105vh; padding: 0px"
      >
        <Form-Welcome />
      </div>
      <!-- class="col-md-4 offset-md-4 col-xs-4 offset-xs-4 col-sm-6 offset-sm-3 mt-5 p-4 " -->
      <div
        class="col-md-5 col-lg-4 p-5 col-xs-12 col-sm-6"
        style="background-color: #35424a"
      >
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
  methods: {},
};
</script>
<style scope>
/* @media (max-width: 1000px) {
  .background {
    opacity: 0 !important;
  }
  .v-application--wrap {
    background-color: #35424a;
  }
} */
:root {
  --color-refere: #000000;
}

.title {
  font-weight: bold;
  font-size: 36px;
}

.text-logo {
  font-weight: 600;
  font-size: 20px;
  padding-bottom: 10px;
  color: #ffffff;
  letter-spacing: 0.2em;
  margin-left: 0.5em;
}
</style>
