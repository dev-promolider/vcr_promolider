<template>
  <div>
    <div class="marco p-3">
      <div class="header d-flex justify-content-between mb-2">
        <p style="font-size: 1em">Ventas</p>
        <router-link to="/attribute" class="text-decoration-none" style="font-size: 1em; color: #000000">Todas las
          ventas</router-link>
      </div>

      <div class="mover ml-2 mt-2 text-center">
        <span v-if="info == null">
          <div class="cajita d-flex align-items-center justify-content-center">
            cargando datos...
          </div>
          <div class="cajita d-flex align-items-center justify-content-center">
            cargando datos...
          </div>
          <div class="cajita d-flex align-items-center justify-content-center">
            cargando datos...
          </div>
        </span>

        <div v-if="info == 0" class="center-element no-result mt-3">
          <span>Sin resultados</span>
        </div>

        <div v-else class="cliente" v-for="(item, index) in info" :key="index" v-on:click="mostrar(item.payment_id)">
          <b-list-group-item class="d-flex align-items-center color">
            <div class="containerImg col-2">
              <v-avatar size="40">
                <img :src="item.photo" alt="Avatar" class="image" />
              </v-avatar>
              <div class="middle">
                <p class="text">
                  {{ item.client }} {{ item.client_last_name }}
                </p>
              </div>
            </div>
            <span class="cursos col-4 text-capitalize" style="
                font-size: 12px;
                margin-right: 0px;
                text-overflow: ellipsis;
              ">{{ item.title }}</span>
            <span class="cursos col-2" style="font-size: 12px; margin-right: 0px">
              ${{ item.price }}</span>
            <span class="cursos col-3" style="font-size: 12px; margin-right: 0px">{{ item.created_at }}</span>
          </b-list-group-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      info: null,
      desabilitado: 0,
    };
  },
  methods: {
    getAttributes() {
      this.axios.get("/reports/last-sells?n_sells=3").then((respuesta) => {
        console.log(respuesta.data);
        this.info = respuesta.data.data;

        for (let index = 0; index < this.info.length; index++) {
          const fecha = new Date(this.info[index].created_at);
          let options = { year: "numeric", month: "numeric", day: "numeric" };
          this.info[index].created_at = fecha.toLocaleDateString(
            "es-ES",
            options
          );
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
.cliente {
  border-radius: 0.9rem;
  max-width: 95%;
  margin: auto;
}

.cliente .color {
  background: #1ae800;
  margin-bottom: 13px;
  height: 64px;
  cursor: pointer;
}

.cliente .list-group-item {
  border: 1px solid #1ae800;
  padding: 0rem 0.5rem;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

.cliente .list-group-item span.cursos {
  margin-right: 0px !important;
}

.cliente .list-group-item span.cursos.col-5 {
  margin-right: 0px !important;
}

.cliente .list-group-item span.cursos.col-2 {
  margin-right: 5px !important;
}

.cliente .list-group-item span.cursos.col-3 {
  margin-right: 0 !important;
}

.marco {
  border-radius: 15px;
  width: 100%;
  height: 350px;
}

.titulos {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.titulos .titulo_dentro {
  margin-left: 32px;
  margin-top: 25px;
  font-weight: 300;
  font-size: 15px;
  text-align: center;
  width: 120px;
  height: 21px;
  line-height: 21.09px;
}

.titulos .titulo_esquina {
  width: 180px;
  float: right;
  margin-top: 20px;
  font-size: 15px;
  margin-right: 15px;
  color: #28c76f;
  height: 14px;
  text-align: center;
}

.cliente_user {
  font-size: 30px;
  color: #000000;
  font-weight: 300px;
  margin-left: 20px;
}

.cursos {
  font-size: 10px;
  color: #000000;
  font-weight: 500;
  padding: 0%;
}

.cajita {
  width: 100%;
  height: 70px;
  border-radius: 0.9rem;
  max-width: 95%;
  margin: 10px;
  animation: pulsos 1s infinite;
}

@keyframes pulsos {
  0% {
    background: #eee;
  }

  50% {
    background: #bfbfbf;
  }

  100% {
    background: #eee;
  }
}

.containerImg {
  position: relative;
  padding-top: 25px;
}

.image {
  width: 50px;
  height: 50px;
  display: block;
}

.text {
  width: 65px;
  color: rgb(253, 253, 253);
  font-size: 15px;
  font-weight: bold;
  border-radius: 25%;
}
</style>
