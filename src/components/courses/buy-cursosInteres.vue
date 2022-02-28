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
        <p>{{ descripcion }}</p> 
      </div>
      <div class="precios">
        <button > Comprar S/{{ precio }}</button>
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
      this.pao_id = this.$route.params.idese;
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
  border-radius: 15px;
  width:  700px;
  height: 450px;
  padding:20px;
  margin-top:50px;
   margin-right: auto;
  margin-left: 5%;
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
  //  object-fit: cover;
    transition: all 400ms;
  position:relative;
  border-radius: 0px;
}

.imagen img:hover{
  transform: scale(1.15);
   background: #b9c6e9;
   opacity: 0.6;
  // cursor: pointer;
}

.precios button{
  width: 100%;
  background: linear-gradient(180deg, #5CC151 -131.4%, #97F18D 100%);
  color: rgb(0, 0, 0);
  font-weight: 800;
  font-size: 19px;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  padding: 9px;
  border:2px solid rgb(207, 204, 204);
  border-radius: 20px;
   transition: all 400ms;
  position:relative;

}
.precios button:hover{
  background: linear-gradient(180deg, #4da043 -131.4%, #97F18D 90%);
  transform: scale(1.15);
  color:rgb(88, 50, 50);
}
.level p{
  color: rgb(199, 134, 13);
  font-weight: 800;
  font-size: 19px;
  text-align: center;
}

.descripcion{
    width: 80%;
  color: rgb(104, 95, 78);
  font-weight: 800;
  font-size: 19px;
  text-align: center;
  
  margin-right: auto;
  margin-left: auto;
}
.descripcion p{
  display: -webkit-box;
  margin-bottom: 0px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}
</style>
