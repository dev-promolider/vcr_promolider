<template>
  <div class="tomalo">
    <div class="preferencias">
      <p class="letra">Preferencias:</p>
    </div>

    <div class="cajitas" v-for="items in item" :key="items.id">
      <button @click="escoger(items.id)" class="caja">{{ items.name }}</button>
    </div>

    <div class="escoger">
      <p class="seleccionar">Seleccione 1 a 3 categorias de su preferencia</p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      item: null,
      preferencias:{
        category : ''
      }
    };
  },
 
  methods: {
    escoger(id){
      console.log(id);
      this.preferencias.category = id
      console.log("It is category: " + this.preferencias.category);

    },
    getAttributes() {
      this.axios.get("category/list").then((respuesta) => {
        this.item = respuesta.data.data;
        // console.log(this.item);
      });
    },

    
  },

  created() {
    this.getAttributes();
  },
};
</script>

<style>
.tomalo {
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  width: 900px;
  background: rgb(189, 189, 233);
  padding:20px 20px 50px 20px;
  border-radius:20px 20px 20px 20px;
}

.letra {
  text-align: left;
  color: rgb(27, 10, 66);
  font-size: 38px;
  font-weight: 800;
}
.cajitas {
  display: inline-block;
  margin-top: 25px;
  
  
}
.caja {
  background-color: rgb(240, 200, 200);
  box-shadow: 0px 4px 6px rgba(104, 104, 104, 0.1);
  font-size: 18px;
  font-weight: 700;
  color: rgb(86, 86, 202);
  width: 250px;
  height: 50px;
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
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
}

.seleccionar {
  text-align: left;
  color: rgb(22, 22, 51);
  font-weight: 700;
  margin-top: 50px;
}


</style>