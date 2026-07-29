<template>
  <div class="card-sales p-3 d-flex flex-column">
    <!-- Encabezado del contenedor (Siempre visible de forma instantánea) -->
    <div class="header d-flex align-center justify-space-between mb-3">
      <h3 class="header-title m-0">Ventas</h3>
      <router-link to="/attribute" class="header-link text-decoration-none">Todas las ventas</router-link>
    </div>

    <!-- Contenido dinámico dependiente de la respuesta JSON del endpoint -->
    <div class="sales-content-area flex-grow-1">
      <!-- 1. SKELETON SCREEN: Se muestra ÚNICAMENTE mientras el endpoint está cargando -->
      <div v-if="info == null" class="skeleton-sales-wrapper py-1">
        <div v-for="i in 3" :key="i" class="skeleton-sale-item d-flex align-items-center mb-2 p-2">
          <div class="skeleton-box mr-3" style="width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;"></div>
          <div class="flex-grow-1">
            <div class="skeleton-box mb-2" style="width: 65%; height: 16px; border-radius: 6px;"></div>
            <div class="skeleton-box" style="width: 40%; height: 14px; border-radius: 6px;"></div>
          </div>
        </div>
      </div>

      <!-- 2. ESTADO VACÍO: Si el endpoint retorna 0 ventas -->
      <div v-else-if="info.length === 0 || info == 0" class="center-element no-result my-4 text-center">
        <v-icon color="#A1A1AA" size="32" class="mb-1">mdi-chart-line-variant</v-icon>
        <p class="text-muted m-0" style="font-size: 0.88rem;">No existen ventas registradas</p>
      </div>

      <!-- 3. RENDERIZADO DE VENTAS REALES: Al retornar el JSON funcional -->
      <div v-else class="sales-list">
        <div
          v-for="(item, index) in info"
          :key="index"
          class="sale-item d-flex align-center justify-space-between p-3 mb-2"
          @click="mostrar(item.payment_id)"
        >
          <div class="d-flex align-center overflow-hidden mr-2">
            <b-avatar variant="success" :src="item.photo || 'https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240'" size="40" class="mr-3 flex-shrink-0"></b-avatar>
            <div class="sale-info overflow-hidden">
              <span class="sale-client font-weight-bold d-block text-truncate">{{ item.client }} {{ item.client_last_name }}</span>
              <span class="sale-title text-muted text-truncate d-block">{{ item.title }}</span>
            </div>
          </div>

          <div class="text-right flex-shrink-0">
            <span class="sale-price font-weight-bold d-block" style="color: #10B981">${{ item.price }}</span>
            <span class="sale-date text-muted d-block" style="font-size: 0.78rem">{{ item.created_at }}</span>
          </div>
        </div>
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
      info: null,
      desabilitado: 0,
    };
  },
  methods: {
    getAttributes() {
      this.axios.get("/reports/last-sells?n_sells=3").then((respuesta) => {
        const data = respuesta && respuesta.data && respuesta.data.data ? respuesta.data.data : [];
        this.info = data;

        for (let index = 0; index < this.info.length; index++) {
          const rawDate = this.info[index].created_at;
          if (!rawDate) {
            this.info[index].created_at = "Reciente";
          } else {
            const fecha = new Date(rawDate);
            if (isNaN(fecha.getTime())) {
              this.info[index].created_at = "Reciente";
            } else {
              let options = { year: "numeric", month: "numeric", day: "numeric" };
              this.info[index].created_at = fecha.toLocaleDateString("es-ES", options);
            }
          }
        }
      }).catch(() => {
        this.info = [];
      });
    },

    mostrar(id) {
      this.$router.push({
        name: "buy-details",
        params: { id: id },
      });
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style scoped>
.card-sales {
  background: #FAF9F5 !important;
  border-radius: 20px !important;
  border: 1px solid #E5E3DC !important;
  min-height: 280px;
}

.header-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.1rem !important;
  color: #18181B !important;
}

.header-link {
  font-family: 'Outfit', sans-serif !important;
  color: #10B981 !important;
  font-weight: 600 !important;
  font-size: 0.88rem !important;
}

.sale-item {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 14px !important;
  transition: all 0.2s ease !important;
  cursor: pointer;
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

/* Skeleton Loader Box & Animations */
.skeleton-box {
  background-color: #E5E3DC;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.5) 20%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  background-position: -150px 0;
  border-radius: 8px;
  animation: skeleton-shimmer 1.6s infinite ease-in-out;
}

@keyframes skeleton-shimmer {
  to {
    background-position: calc(100% + 150px) 0;
  }
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
