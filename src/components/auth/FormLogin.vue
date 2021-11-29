<template>
  <div>
    <b-form @submit.prevent="singin">
      <b-form-group
        class="my-2"
      >
        <b-form-input
          type="text"
          v-model="form.username"
          placeholder="Username"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        class="my-2"
      >
        <b-form-input
          type="password"
          v-model="form.password"
          placeholder="Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" block variant="primary">Sign In</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  name: "FormLogin",
  data() {
    return {
      form: {
        username: "",
        password: "",
      }
    };
  },
  methods: {
      singin(){
          this.axios.post('/auth/login', this.form)
          .then(r => {
              const d = r.data;
              const authToken = d.data.access_token;
              localStorage.setItem('access_token', authToken);
              this.$router.push('/')
              
          })
      }
  }
};
</script>
