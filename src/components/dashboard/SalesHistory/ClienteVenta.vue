<template>
  <div id="ClienteVenta" class="">
    <div class="marco">
      <div class="titulos">
        <p class="titulo_dentro">Última Ventas</p>
        <router-link to="/attribute"
          ><p class="titulo_esquina text-success">
            ver progreso completo
          </p></router-link
        >
      </div>

      <div class="mover ml-2 mt-2 text-center" >
      <span v-if="loading" > Sin resultados </span>
      <div
        class="cliente"
        v-for="(item, index) in info"
        :key="index"
        v-on:click="mostrar(item.payment_id)"
      >
        <b-list-group-item class="d-flex align-items-center color">
          <b-avatar
            variant="info"
            size="1.9rem"
            src="https://placekitten.com/300/300"
            class="ml-2"
          ></b-avatar>
          <span class="mr-auto  cliente_user" style="font-size:15px"
            >{{ item.client }} {{ item.client_last_name }}</span
          >
          <span class="cursos mx-3" style="font-size:15px">{{ item.title }}</span>
          <span class="cursos mx-3" style="font-size:15px"> $ {{ item.price }}</span>
        </b-list-group-item>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClienteVenta",
  components: {
    
  },
  data() {
    return {
      info: [],
      loading: true,
      desabilitado: 0,
      
    };
  },
  methods: {
    getAttributes() {
      
      this.axios.get("/reports/last-sells?n_sells=3")
      .then((respuesta) => { 
        this.info = respuesta.data.data;
        

        if (this.info.length >= 1){
            this.loading = false;
        }
      });
    },

    mostrar(id) {
      this.$router.push("/attribute-user/ " + id);
    },

  },
  created() {
    this.getAttributes();
  },
};
</script>
<style scoped>

.mover {
  margin-left: 30%;
}
.cliente {
  border-radius: 0.9rem;
  max-width: 95%;
  margin: auto;
}
.cliente .color {
  background: #35424a;
  margin-bottom: 13px;
  height: 64px;
  cursor: pointer;
}

.cliente .color:hover {
  background: #131b1e;
}

.marco {
  border: 1px solid #efefef;
  border-radius: 15px;
  background: white;
  width: 100%;
}
.titulos {
  display: flex;
}
.titulos .titulo_dentro {
  margin-bottom: 30px;
  margin-left: 32px;
  margin-top: 34px;
  font-weight: 300;
  font-size: 18px;
  text-align: center;
  width: 120px;
  height: 21px;
  line-height: 21.09px;
}
.titulos .titulo_esquina {
  margin-bottom: 0px;
  width: 120px;
  float: right;
  margin-top: 38px;
  margin-right: 34px;
  font-size: 0.7rem;
  margin-left: 92px;
  color: #1ae800;
  height: 14px;
  text-align: center;
}

.cliente_user {
  font-size: 30px;
  color: white;
  font-weight: 300px;
  margin-left: 20px;
}
.cursos {
  font-size: 10px;
  color: white;
  font-weight: 700;
  margin-right: 15px;
}

</style>
