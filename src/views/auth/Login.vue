<template>
  <div>
    <section class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <Form-Welcome />
      </div>
      <div
        class="col-md-4 offset-md-4 col-xs-4 offset-xs-4 col-sm-6 offset-sm-3 mt-5 p-4 justify-content-center"
        style="background-color: #35424a; border-radius: 20px 20px"
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
@media (max-width: 1000px) {
  .background {
    opacity: 0 !important;
  }
  .v-application--wrap {
    background-color: #35424a ;
  }
}
:root {
  --color-refere: #000000;
}
/* .title {
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 57px;
  color: var(--sixth-color-green);
  text-align: center;
}
.contenido {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
} */
/* .sect-formulario,
.bienvenido {
  width: 50%;
  background-color: #fff;
}
.sect-formulario {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.sect-formulario > p {
  display: block;
  width: 68%;
  height: 35px;
  align-self: center;
  padding: 0 30px;
  margin: 0;
}
.formulario {
  align-self: center;
  width: 100%;
  max-width: 550px;
  padding: 100px 30px 30px;
  margin-bottom: 10px;
}

.img-welcome {
  margin-bottom: 30px;
}
.form-logueo {
  margin-bottom: 35px;
} */
.title {
  font-weight: bold;
  font-size: 36px;
}
/* p {
  color: var(--color-refere);
  font-weight: 500;
  size: 14px;
}
.icons-promolide img {
  width: 30px;
  height: 30px;
  margin-left: 5px;
}
.logo-promolider {
  text-align: center;
} */
.text-logo {
  font-weight: 600;
  font-size: 20px;
  padding-bottom: 10px;
  color: #ffffff;
  letter-spacing: 0.2em;
  margin-left: 0.5em;
}
/* @media (max-width: 783px) {
  .contenido {
    flex-direction: column-reverse;
    height: auto;
  }
  .sect-formulario,
  .bienvenido {
    width: 100%;
  }
  .formulario {
    width: 90%;
  }
  .sect-formulario > p {
    width: 100%;
  }
}
@media (max-width: 1200px) {
  .formulario {
    width: 100%;
  }
} */
::-webkit-scrollbar {
  display: none;
}
</style>
