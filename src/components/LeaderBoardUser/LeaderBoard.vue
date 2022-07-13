<template>
  <div style="min-height: 700px">
    <div class="row text-left px-3 h2" style="background-color: #35424a">
      <div class="col-md-12 text-white px-5">Tabla de clasificación</div>
    </div>

    <div class="caja container">
      <div
        class="tittle card m-3 w-50 position-absolute text-center border-gradient border-gradient-green"
      >
        <h3 class="">Top Promolíder</h3>
      </div>
      <div class="puntos card mt-5 border-gradient border-gradient-green p-2">
        <div class="m-sm-4">
          <div
            class="table text-center"
            v-for="(dato, index) in datos"
            :key="index"
          >
            <div class="tablita col-2">
              <p>{{ index + 1 }}</p>
            </div>
            <div class="tablita col-2">
              <v-avatar size="50"><img :src="dato.photo" alt="" /></v-avatar>
            </div>
            <div class="tablita col-5">
              <p>{{ dato.name }}</p>
            </div>
            <div class="tablita col-3">
              <p>{{ dato.total }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeaderBoard",

  data() {
    return {
      datos: null,
    };
  },

  mounted() {},

  methods: {
    getRanking() {
      this.axios.get("classroom-points/ranking").then((res) => {
        console.log(res.data);
        this.datos = res.data;
      });
    },
  },
  created() {
    this.getRanking();
  },
};
</script>

<style lang="scss" scoped>
.caja {
  background: #1ae800;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  margin-top: 3%;
  margin-bottom: 3%;
  height: auto;
}
.tittle {
  background: linear-gradient(#1ae800, #1ae800) padding-box,
    linear-gradient(to right, #35424a, #35424a) border-box;
  border-radius: 15px;
  border: 4px solid transparent;
  z-index: 1;
  top: 0;
  left: 25%;
}
.puntos {
  background: linear-gradient(#1ae800, #1ae800) padding-box,
    linear-gradient(to right, #35424a, #35424a) border-box;
  border: 4px solid transparent;
  border-radius: 15px;
}
.table {
  border-radius: 15px;
  box-shadow: 1px 1px 5px #131b1e;
  display: flex;
  justify-content: end;
  align-items: center;
}
p {
  font-size: 20px;
  margin-bottom: 0px;
}
h3 {
  color: #131b1e;
  margin-bottom: 0px;
}

img {
  width: 60px;
}

@media screen and(min-width:1260px) {
  .caja {
    width: 60%;
  }
}
@media screen and(max-width:830px) {
  h3 {
    font-size: 25px;
    margin: 5px;
  }
  p {
    font-size: 15px;
  }
  img {
    width: 40px;
  }
}
@media screen and(max-width: 560px) {
  h3 {
    font-size: 15px;
    margin: 0;
    padding: 0;
  }
  p {
    font-size: 12px;
    margin: 0;
    padding: 0;
  }
  img {
    width: 30px;
    padding: 0;
    margin: 0;
  }
}
.backgro {
  background: #131b1e;
  opacity: 0.9;
  z-index: 10;
}
.titulo {
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: left;
}
</style>
