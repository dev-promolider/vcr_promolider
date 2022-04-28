<template>
  <div id="ClienteVenta">
    <div class="marco" >
      <div class="titulos">
        <p class="titulo_dentro">Última Ventas</p>
        <router-link to="/attribute"
          ><p class="titulo_esquina text-success">ver progreso completo</p></router-link
        >
      </div>

      <div class="mover ml-2 mt-2" v-if="loading">
          
        <div class="decorar ">

          <p>Cargando....</p>

        </div>

        <div class="decorar mt-3">

          <p>Cargando....</p>

        </div>

        <div class="decorar mt-3">

          <p>Cargando....</p>

        </div>

      </div>

      <div
        class="cliente"
        v-for="(item, index) in info"
        :key="index"
        style="max-width: 336px"
        v-on:click="mostrar(item.payment_id)"
      >
        <b-list-group-item class="d-flex align-items-center color" >
          <b-avatar
            variant="info"
            size="1.9rem"
            src="https://placekitten.com/300/300"
            class="ml-2"
          ></b-avatar>
          <span class="mr-auto  cliente_user"
            >{{ item.client }} {{ item.client_last_name }}</span
          >
          <span class=" cursos ">{{ item.course }}</span>
        </b-list-group-item>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "ClienteVenta",
  components: {},
  data() {
    return {
      info: [],
      loading: true,
      desabilitado:0
    };
  },
  methods: {
    getAttributes() {
      this.axios.get("dashboard/saleshistory").then((respuesta) => {
        this.loading = false;
        this.info = respuesta.data.data;
        // console.log(this.info);
      
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

.decorar{
  background: rgb(235, 235, 235);
  color:rgb(14, 13, 13);
  width: 90%;
  margin:auto;
  height: 60px;
   border-radius: 0.9rem;

}
.decorar p{
  padding-top: 15px;
  font-weight: 700;
}
.mover {
  margin-left: 30%;
}
.cliente {
  border-radius: 0.9rem;
  margin-left: 32px;
  margin-right: 33px;
}
.cliente .color {
  background: #9fbdf8;
  margin-bottom: 13px;
  height: 64px;
  cursor: pointer;
}

.cliente .color:hover {
  background: #7e9bd4;
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
  color: #448f3c;
  height: 14px;
  text-align: center;
}

.cliente_user {
  font-size: 10px;
  color: white;
  font-weight: 300px;
  flex: right;
  margin-left: 20px;
}
.cursos {
  font-size: 10px;
  color: white;
  font-weight: 700;
  margin-right: 15px;
}
</style>
