<template>
  <div id="ClienteVenta">
    <!-- <div  class="cliente" v-for="item in info" :key="item.id" > -->
    <div class="marco" style="width: 401px">
      <div class="titulos">
        <p class="titulo_dentro">Última Ventas</p>
        <p class="titulo_esquina">ver progreso completo</p>
      </div>
      <div
        class="cliente"
        v-for="item in info"
        :key="item.id"
        style="max-width: 336px"
        v-on:click="mostrar"
      >
        <b-list-group-item class="d-flex align-items-center color">
          <b-avatar
            variant="info"
            size="1.9rem"
            src="https://placekitten.com/300/300"
            class="mr-3"
          ></b-avatar>
          <span class="mr-auto cliente_user"
            >{{ item.client_last_name }} {{ item.client_name }}</span
          >
          <span class="cursos">{{ item.course }}</span>
        </b-list-group-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClienteVenta",
  data() {
    return {
      info: [],
    };
  },
  methods: {
    getAttributes() {
      this.axios.get("dashboard/saleshistory").then((respuesta) => {
        this.info = respuesta.data.data;
      });
    },

    mostrar() {
      console.log("si estsa funcionando");
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>
<style>
.cliente {
  border-radius: 0.9rem;

  margin-left: 32px;
  margin-right: 33px;
}
.cliente .color {
  background: #9fbdf8;
  margin-bottom: 13px;
  height: 64px;
}

.marco {
  border: 1px solid #efefef;
  margin-top: 39px;
  border-radius: 4%;
  padding-bottom: 28px;
  background: white;
  margin-right: 90px;
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
}
.cursos {
  font-size: 10px;
  color: white;
  font-weight: 700;
}
</style>
