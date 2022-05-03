import { mapState } from 'vuex';
<template>
    <!-- Seccion inferior del video -->
  <div class="container-fluid mt-3">
      <div class="row" style="width: 100%">
          <div class="col-lg-8 col-md-12">
            <h4 class="font-weight-bold"> {{$route.query.class}} </h4>
            <div class="d-flex mt-2">
              <img src="../../../assets/logo-perfil.png" class="rounded-circle" style="height: 46px">
                <div class="d-flex flex-column ml-4">
                  <span class="font-weight-bold">{{Titulo}}</span>
                  <span>{{Productor}}</span>
                  
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

import { mapState, mapGetters} from 'vuex';

export default {
    name:"DatosCurso",

    components: {
    
  },
  computed: {
    ...mapState( {
      //titulo: state => state.title
      Productor: state => state.course.productor[0],
      Titulo: state => state.course.productor[1]
    }),

    ...mapGetters( 'course', {
      elProductor:'getProductor',
      
    }),
  },
  /* watch:{
            "$route.query.class":{
                immediate: true,
                handler(titleClass){
                    this.clase=titleClass;
                    console.log("este es"+this.clase);
                }
            },
        }, */
}
</script>

<style scoped>

</style>
