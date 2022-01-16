<template>
  <div class="tomalo">
    <div class="preferencias">
      <p class="letra">Preferencias:</p>
    </div>

    <div class="cajitas" v-for="items in item" :key="items.id">
      <button class="caja">{{ items.name }}</button>
    </div>

    <div class="escoger">
      <p class="seleccionar">Selecciopne 1 a 3 categorias de su preferencia</p>
    </div>

    <button class="botoncito" v-on:click="cambiar">Siguiente</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: [],
    };
  },
  methods: {
    getAttributes() {
      this.axios.get("/category/list").then((respuesta) => {
        this.item = respuesta.data.data;
        console.log(this.item);
      });
    },
    cambiar() {
      console.log("estoy funcioando mamon");
    },
  },

  created() {
    this.getAttributes();
  },
};
</script>

<style>
.tomalo {
  margin-left: 15%;
  margin-right: 20%;
}

.letra {
  text-align: left;
  color: rgb(0, 0, 0);
  font-size: 1.42rem;
  font-weight: 800;
}
.cajitas {
  display: inline-block;
  margin-top: 15px;
}
.caja {
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  width: 230px;
  height: 40px;
  text-align: center;
  margin-left: 15px;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgb(179, 179, 179);
}
.caja:focus {
  outline: none;
}
.curso {
  padding-top: 8px;
}

.escoger {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.seleccionar {
  text-align: left;
  color: darkblue;
  font-weight: 700;
  margin-top: 150px;
}

.botoncito {
  width: 200px;
  height: 35px;
  color: darkblue;
  border-radius: 7px 7px 7px 7px;
  margin-left: 550px;
  border: 2px solid rgb(212, 212, 212);
  margin-bottom: 20px;
  font-weight: 500;
}
.botoncito:focus {
  outline: none;
}
</style>