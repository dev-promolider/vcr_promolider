<template>
  <div>
    <div class="alert alert-danger" role="alert" v-if="getStatusRequest=== 401">
      Usuario y/o contraseña incorrecta, vuelva a intentarlo 
    </div>
    <div class="alert alert-danger" role="alert" v-if="getStatusRequest=== 422">
      Asegurese de llenar todos los campos con el formato requerido
    </div>
    <div class="alert alert-success" role="alert" v-if="getStatusRequest=== 200">
      Sesión inciada exitosamente
    </div>
    <b-form @submit.prevent="singin">
      <b-form-group class="my-2  subtitle" label="Usuario *">
        <b-form-input
          class="rounded-pill"
          type="text"
          v-model="form.username"
          placeholder="Nombre de Usuario"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group class="my-2 subtitle" label="Password*">
        <b-form-input
          class="rounded-pill holder-form"
          type="password"
          v-model="form.password"
          placeholder="Min. 8 caracteres"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-checkbox-group>
          <b-form-checkbox class="subtitle" 
          value="me"
          name="checkbox-validation"
          >Recuerdame</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button 
        class="submit-iniciar rounded-pill"
        type="submit"
        block
        >Sign In</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
export default {
  name: "FormLogin",
  data() {
    return {
      form: {
        username: null,
        password: null,
      
      },
    };
  },
  props:{
    
  },
  methods: {
    ...mapActions('user',{
      actionUser: 'actionUser'}),
    
    singin() {
      this.actionUser(this.form)  
    },
  },
  computed:{
    ...mapGetters("user", ["getStatusRequest"])
     
  }
};
</script>
<style>
:root {
  --color-prin: #1ae800;
}
.submit-iniciar {
  background: var(--seventh-color-green) !important;
  border: none !important;
  color: white !important;
}
.submit-iniciar:hover{
  background: var(--eighth-color-green) !important;
}
.subtitle {
  font-weight: bold;
  font-size: 14px;
}
.holder-form {
  border: 1px solid #35424a;
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
