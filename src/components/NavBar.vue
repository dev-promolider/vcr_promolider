<template>
  <div class="nav-general d-flex  ">
    <ul class="nav seccion justify-content-star align-items-center ">
        <li class="nav-item logo-king">
          <span class=" d-flex flex-grap nav-link active" href="#">
            <img class="img-king " src="../assets/logo-king.png" />
            <span class="ml-1">
              Sección de
            <b>Portada de información del curso</b></span>
          </span>
        </li>
    </ul>
    <div class="nav-horizontal flex-grow-2">
      <ul class="nav nav-sub-h1 justify-content-end align-items-center">
        <li class="nav-item">
          <span class="nav-link text-dark" href="#">
            <img class="img-puntos" src="../assets/logo-puntos.png" />
            <b>173</b> Puntos
          </span>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#">
            <img class="img-help" src="../assets/help.png" />
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <img class="img-help" src="../assets/notification.png" />
          </a>
        </li>
      </ul>
      <ul class="nav nav-sub-h2 justify-content-between align-items-center">
        <li class="nav-item logo-classroom ">
          <span class="nav-link active pl-2 pr-1" href="#">
            <img class="img-classroom" src="../assets/logo-aula3.png" />
          </span>
        </li>
        <li class="nav-item profile">
          <span class="submenu">
            <img class="img-photo" src="../assets/logo-perfil.png" />
            <img class="img-help" src="../assets/flecha-abajo.png" />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  mounted() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      this.$router.push("/signin");
    }
  },
};
</script>

<style>
.nav-general{
  width: 100vw;
  height: 113px;
  background-color: #fff; 
}
.seccion{
  width: 40.1%;
}
.nav-horizontal {
  display: flex;
  width: 59.9%;
  justify-content: end;
  padding-right: 20px;
}
.profile {
  position: relative;
  background: #ecf0f3;
  border-radius: 60px;
  border: none;
  width: 108px;
  height: 50px;
}
.submenu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 100%;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.img-puntos {
  width: 25px;
  height: 29.03px;
  margin-right: 8px;
}
.img-help {
  width: 32px;
  height: 32px;
}
.img-king {
  width: 24px;
  height: 24px;
}
.img-photo {
  width: 37.74px;
  height: 37.5px;
  border-radius: 160px;
}
.img-classroom {
    width: 151px;
    height: 37px;
  }
.logo-classroom {
  display: none;
}

@media only screen and (max-width: 671px){
  .nav-general{
    height: 130px;
    justify-content: space-between;
    align-items:center;
  }
  .nav-horizontal{
    width: 100%;
    justify-content: space-between;
    padding-right: 0px;
    background-color: rgb(255, 255, 255);
    flex-direction: column-reverse;
  }
  .nav-sub-h2{
    padding-bottom: 10px;
  }
  .logo-classroom {
    display: inline-block;
  }
  .seccion {
    width: 0%;
    visibility: hidden;
  }
  .logo-king {
    display: none;
  }
  .profile {
    margin-right: 8px;
  }
}
</style>