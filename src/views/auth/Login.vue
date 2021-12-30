<template>
  <div class="content">
    <section class="sect-formulario">
      <div class="formulario">
        <div class="img-welcome">
          <img src="@/assets/logo-inicial.png" />
        </div>
        <div class="form-logueo">
          <h2 class="title">Login</h2>
          <p>Por favor inicie sesión en su cuenta y comience la aventura</p>
        </div>
        <!-- CERRAR SESION -->
        <FormLogin  />
      </div>
      <p>Copyright © 2021. Todos los derechos reservados para Promolider</p>
    </section>
    <section class="bienvenido">
      <Form-Welcome />
    </section>
  </div>
</template>
<script>
import FormLogin from "@/components/auth/FormLogin.vue";
import FormWelcome from "@/components/auth/FormWelcome.vue";
export default {
  name: "Login",
  components: {
    FormLogin,
    FormWelcome,
  },
  methods:{

  }
};
</script>
<style scope>
:root {
  --color-refere: #747474;
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
}
.sect-formulario,
.bienvenido {
  width: 50%;
}
.sect-formulario {
  height: 100%;
  display: flex;
  flex-direction: column;

}
.sect-formulario >p{
    display: block;
    width: 68%;
    height: 10%;
    align-self: center;
    padding: 0 30px;
    margin: 0;
}
.formulario {
  align-self: center;
  width: 68%;
  height: 80%;
  padding: 30px 30px 30px; 
  margin-bottom: 10px;
}
.bienvenido{
}
.img-welcome {
  margin-bottom: 30px;
}
.form-logueo {
  margin-bottom: 35px;
}
.title {
  font-family: "Baloo 2", cursive;
  font-weight: 500;
  width: 124px;
  font-size: 36px;
}
p {
  color: var(--color-refere);
  font-weight: 500;
  size: 14px;
}
</style>
