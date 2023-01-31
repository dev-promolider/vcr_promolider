<template>
    <div>
        <div class="bg-dark">
          <FormResetPassword />
        </div>
    </div>
  </template>
  <script>
  import FormResetPassword from "@/components/auth/FormUser/FormResetPassword.vue";
  export default {
    name: "Login",
    components: {
      FormResetPassword,
    },
    methods: {},
  };
  </script>
  <style scope>
  .bg-dark {
    background-color: #35424a;
  }
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
  