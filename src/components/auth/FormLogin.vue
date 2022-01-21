<template>
  <div>
    <b-form @submit.prevent="singin">
      <b-form-group class="my-2  subtitle" label="Email*">
        <b-form-input
          class="rounded-pill"
          type="text"
          v-model="form.username"
          placeholder="Example@gmail.com"
        ></b-form-input>
      </b-form-group>

      <b-form-group class="my-2 subtitle" label="Password*">
        <b-form-input
          class="rounded-pill holder-form"
          type="password"
          v-model="form.password"
          placeholder="Min. 8 caracteres"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-checkbox-group>
          <b-form-checkbox class="subtitle" value="me">Recuerdame</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button 
        class="submit-iniciar rounded-pill bg-success"
        type="submit"
        block
        variant="primary"
        >Sign In</b-button
      >
    </b-form>
  </div>
    <!-- <form @submit.prevent="singin">
      <div class="form-values d-flex flex-column">
        <label for="" class="subtitle">Email*</label>
        <input
          class="holder-form"
          type="text"
          placeholder="Example@gmail.com"
          v-model="form.username"
        />
      </div>
      <div class="form-values d-flex flex-column">
        <label for="" class="subtitle">Password*</label>
        <input
          class="holder-form"
          type="password"
          placeholder="Min. 8 caracteres"
          v-model="form.password"
        />
      </div>
      <div class="form-check d-flex justify-content-between p-0">
        <label class="remember d-flex" for="">
          <input type="checkbox" name="" id="" />Recuérdame
        </label>
        <a class="change" href="">¿Has olvidado tu contraseña?</a>
      </div>
      <div>
        <button class="loguear text-white" type="submit">iniciar Sesión</button>
      </div>
    </form>
  </div> -->
</template>

<script>
export default {
  name: "FormLogin",
  data() {
    return {
      form: {
        username: "user-brayan ",
        password: "secret",
      
      },
    };
  },
  props:{
    
  },
  methods: {
    singin() {
      this.axios.post("/auth/login", this.form).then((r) => {
        const d = r.data;
        // const infor= d.data.user.status_user;
        const authToken = d.data.access_token;
       
          console.log(d.data)
        localStorage.setItem("access_token", authToken);
        // if(infor==1){
            window.location.reload(true)
            // this.$router.push("/preferences")
        // }else{
          
        //   window.location.reload(true)
          // this.$router.push("/preferences")
        // }
        // window.location.reload(true);
      
        
      });
    },
  },
};
</script>
<style>
:root {
  --color-prin: #5cc151;
}
.submit-iniciar {
  background: var(--color-prin);
}
.subtitle {
  font-weight: bold;
  font-size: 14px;
}
.holder-form {
  border: 1px solid #c4c4c4;
  border-radius: 30px;
  font-size: 12px;
  padding: 8px 10px;
  padding-left: 21px;
}
.form-values {
  margin-bottom: 30px;
}
.remember {
  font-size: 12px;
}
.remember input {
  align-self: center;
}
.change {
  color: var(--color-prin);
  font-size: 12px;
}
.loguear {
  border: 1px;
  background-color: var(--color-prin);
  border-radius: 30px;
  width: 100%;
  height: 50px;
}
.form-check {
  margin-bottom: 25px;
  flex-flow: row wrap;
}
.form-check > a {
  font-weight: bold;
}
</style>
