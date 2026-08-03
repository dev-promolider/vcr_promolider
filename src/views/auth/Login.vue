<template>
  <div class="tw-min-h-screen tw-w-full tw-bg-[#121317]">
    <FormLogin />
  </div>
</template>

<script>
import FormLogin from "@/components/auth/FormUser/FormLogin.vue";

export default {
  name: "Login",
  components: {
    FormLogin,
  },
};
</script>
