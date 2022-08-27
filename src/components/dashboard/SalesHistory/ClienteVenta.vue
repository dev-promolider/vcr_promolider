<template>
  <div>
    <div class="marco p-3 bg-white">
      <div class="header d-flex justify-content-between mb-2">
        <p style="font-size: 1em">Ventas</p>
        <router-link
          to="/attribute"
          class="text-decoration-none"
          style="font-size: 1em; color: #000000"
          >Todos las ventas</router-link
        >
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

        <div
          v-else
          class="cliente"
          v-for="(item, index) in info"
          :key="index"
          v-on:click="mostrar(item.payment_id)"
        >
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
            <span
              class="cursos col-5 text-capitalize"
              style="
                font-size: 12px;
                margin-right: 0px;
                text-overflow: ellipsis;
              "
              >{{ item.title }}</span
            >
            <span
              class="cursos col-2"
              style="font-size: 12px; margin-right: 0px"
            >
              ${{ item.price }}</span
            >
            <span
              class="cursos col-3"
              style="font-size: 12px; margin-right: 0px"
              >{{ item.created_at }}</span
            >
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
  background: #1AE800;
  margin-bottom: 13px;
  height: 64px;
  cursor: pointer;
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
  font-weight: 700;
  margin-right: 15px;
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
  /* opacity: 1; */
  display: block;
  height: auto;
  /* transition: 0.5s ease;
  transition: transform 0.2s; */
  /* backface-visibility: hidden; */
}

/* .middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 30%;
  left: 20%;
  bottom: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.containerImg:hover .image {
  transform: scale(1.5);
  opacity: 0.3;
}

.containerImg:hover .middle {
  transform: 1s escale(1.2);
  opacity: 1;
} */

.text {
  width: 65px;
  color: rgb(253, 253, 253);
  font-size: 15px;
  font-weight: bold;
  border-radius: 25%;
}

/* .img-chiqui{
  width: 35px;
  height: 35px;
  background: #f92672;
  transition: width 1s, height 1s,;
    

  &:hover {
    position: relative;
    width: 200px;
    height: 200px;
    z-index: 1;
    .cliente_user{
      position: absolute;
      z-index: 2;
      display: inline;
    }
  }
  
}



.cliente_user{
  display: none;
  font-size:15px;
  margin-left: 0px;
} */
</style>
