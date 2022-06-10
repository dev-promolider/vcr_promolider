<template>
  <div class="contenido">
    <section class="sect-formulario">
      <div class="formulario ">
        
        <div class="form-logueo">
          <h2 class="title">INICIAR SESIÓN<Nav></Nav></h2>
        </div>
        <!-- CERRAR SESION -->
        <FormLogin  />
      </div>
      <div class="logo-promolider d-flex justify-content-center  align-items-center mt-3">
          <img src="@/assets/logo-inicial.png" class="mx-1 " /> 
          <div class="text-logo">
            Promolíder
          </div>
      </div>
      <p class="mt-3">Siguenos en:</p>
      <div class="icons-promolide d-flex justify-content-center">
        <a href="https://www.facebook.com/Promolider-101670701715747" target="_blank">
          <img src="./icons/facebook-icon.png" ref="www.google.com">
        </a>
        <a href="https://www.instagram.com/promoliderorg/" target="_blank">
          <img src="./icons/instagram-icon.png" >
        </a>
        <a href="http://www.linkedin.com/company/promolíder/?originalSubdomain=pe" target="_blank">
          <img src="./icons/linked-icon.png" >
        </a>
        <a href="https://promolider.org/" target="_blank">
          <img src="./icons/web-icon.png" >
        
        </a>
        <a href="https://www.youtube.com/channel/UCj-NmJXOnJt55aDRh1R0LLg/featured" target="_blank">
          <img src="./icons/youtube-icon.png" target="_blank">
        </a>
      </div>
        <p class="my-5">Copyright &copy; 2021. Todos los derechos reservados para Promolíder</p>

    </section>
    <section class="bienvenido">
      <Form-Welcome />
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
  methods:{
    
  }
};
</script>
<style scope>
:root {
  --color-refere: #000000;
}
.title{
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
}
.sect-formulario,
.bienvenido {
  width: 50%;
  background-color: #fff;
}
.sect-formulario {
  height: 100vh ;
  display: flex;
  flex-direction: column;
  background-color: #FFF;
}
.sect-formulario >p{
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
}
.title {
  font-weight: bold;
  font-size: 36px;
}
p {
  color: var(--color-refere);
  font-weight: 500;
  size: 14px;
}
.icons-promolide img{
  width: 30px;
  height: 30px;
  margin-left: 5px;
}
.logo-promolider{
  text-align: center;
}
.text-logo{
  font-weight: 600;
  font-size: 20px;
  padding-bottom: 10px;
}
@media (max-width: 783px) {
  .contenido {
    flex-direction: column-reverse;
    height: auto;
  }
  .sect-formulario, .bienvenido{
    width: 100%;
  }
  .formulario{
    width: 90%;
  }
  .sect-formulario >p{
    width: 100% ;
    
  } 
       
}
@media (max-width: 1200px) {
  .formulario{
    width: 100%;
  }
       
}
::-webkit-scrollbar {
    display: none;
}
</style>
