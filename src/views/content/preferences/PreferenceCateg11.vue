<template>
  <div class="container my-5">
    <h2 class="text-center font-weight-bold ">Seleccione las categorias de su preferencia</h2>
    
    <p class="text-justify my-5">
        Selecciona al menos 3 categorias de cursos que sean de su agrado, 
        esto le ayudara a obtener recomendaciones personalizadas. Las 
        categorías seleccionas no se mostrarán públicamente.
    </p>

    <div class="container-fluid">
      <div class="row d-flex justify-content-center my-5">
        <div class="category " v-for="items in item" :key="items.id">
            <input type="checkbox" :name=items.name :id=items.name>
            <label :for=items.name class="category-logo text-center cursor-pointer"><i class="fas fa-book"></i></label>
            <label :for=items.name class="category-name text-center cursor-pointer">{{ items.name }}</label>
        </div>
    </div>
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
.container-fluid{
    min-height: 50vh !important;
}
input[type="checkbox"]{
  display: none;
}
.category-logo{
    font-size: 60px;
    color: var(--first-color-green);
    transition: 1s;
}
.category-name{
  font-size: 25px;
  font-weight: bolder;
  color: var(--first-color-green);
  transition: 1s;
}

.category{
  width: 12rem !important;
  margin: 5px;
  display: flex;
  flex-direction: column;
}


input[type="checkbox"]:checked + label, 
input[type="checkbox"]:checked + label  + label{
    color: green !important;
}

input[type="checkbox"]:hover + label, 
input[type="checkbox"]:hover + label  + label{
  text-shadow: 1px 1px 5px rgb(26, 26, 26);
  transform: translateY(-10px) !important;
}

input[type="checkbox"]:hover + label{
  animation: temblar 1s infinite alternate;
}

@media (max-width:480px){
  .category{
    flex-direction: row ;
    align-items: center;
    width: 80% !important;
  }
  .category-name{
    margin-left: 10px;
  }
}

@keyframes temblar {
  0%{
    transform: rotate(15deg);
  }
  50%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(-15deg);
  }
}


</style>