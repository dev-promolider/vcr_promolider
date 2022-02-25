<template>
  <div>
    <div class="contenidos">
      <div class="titulo">
        {{ titulo }}
      </div>
      <div class="imagen">
         <img :src="img" alt="" width="280" height="150" />
      </div>
      <div class="level">
        <p> Nivel del curso : {{ level }}</p> 
      </div>
      <div class="descripcion">
        {{ descripcion }}
      </div>
      <div class="precios">
        S/ {{ precio }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualClassroomBuyCursos",

  data() {
    return {
      items: [],
      pao_id: null,
      precio: "",
      descripcion: "",
      level: "",
      img: "",
      titulo: "",
    };
  },

  methods: {
    getAttributes() {
      this.pao_id = this.$route.params.ides;
      console.log(this.pao_id);

      this.axios.get("course/details/" + this.pao_id).then((datos) => {
        this.items = datos.data.data;
        this.precio = this.items.price;
        this.level = this.items.level;
        this.img = this.items.image;
        this.titulo = this.items.title;
        this.descripcion = this.items.description;

        console.log(this.items);
      });
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style lang="scss" scoped>

.contenidos{
  border:1px solid rgb(199, 198, 198);
  border-radius: 20px;
  width:  700px;
  height: 400px;
  padding:20px;
  margin-top:50px;
   margin-right: auto;
  margin-left: auto;
}
.titulo{
  text-align: center;
  font-weight: 900;
  font-size: 26px;
}
.imagen{
  // background: saddlebrown;
  width: 400px;
  height: 200px;
  margin-right: auto;
  margin-left: auto;
  margin-top:10px;
  
  
}

.imagen img{
   margin:auto;
}

.precios {
  color: rgb(182, 28, 17);
  font-weight: 800;
  font-size: 19px;
  text-align: center;
}
.level p{
  color: rgb(199, 134, 13);
  font-weight: 800;
  font-size: 19px;
  text-align: center;
}

.descripcion{
   color: rgb(104, 95, 78);
  font-weight: 800;
  font-size: 19px;
  text-align: center;
}
</style>
