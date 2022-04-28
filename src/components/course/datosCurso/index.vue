<template>
    <!-- Seccion inferior del video -->
  <div class="container-fluid mt-3">
      <div class="row" style="width: 100%">
          <div class="col-lg-8 col-md-12">
            <h4 class="font-weight-bold"> Sesión 1. Renderizado de Videos </h4>
            <div class="d-flex mt-2">
              <img src="../../../assets/logo-perfil.png" class="rounded-circle" style="height: 46px">
                <div class="d-flex flex-column ml-4">
                  <span class="font-weight-bold">Curso de Edición</span>
                  <span>Rafael Gonzales</span>
                </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-12 d-flex align-items-start flex-row justify-content-end mt-2 ">
            <b-button-group size="sm" class="btn-group">
                <b-button class="btn-back px-4"><i class="fas fa-backward"></i></b-button>
                <b-button class="btn-next px-4">Siguiente Clase <i class="fas fa-forward ml-1"></i></b-button>
            </b-button-group>
          </div>
        </div>
  </div>
</template>

<script>
export default {
    name:"DatosCurso"
}
</script>

<style scoped>
@import './style.css';
</style>
