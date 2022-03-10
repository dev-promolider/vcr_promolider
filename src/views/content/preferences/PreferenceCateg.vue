<template>
  <div class="my-5">
    <h2 class="text-center font-weight-bold ">Seleccione las categorias de su preferencia</h2>

    <p class="text-justify my-5">
        Selecciona al menos 3 categorias de cursos que sean de su agrado, 
        esto le ayudara a obtener recomendaciones personalizadas. Las 
        categorías seleccionas no se mostrarán públicamente.
    </p>

    <div class="container-fluid">
      <div class="row d-flex justify-content-center my-5">
        <div v-if="isLoadingItems" class="row d-flex justify-content-center">
          <div v-for="itemNumber in loadingItems" :key="itemNumber.id" class="category mb-4">
            <label class="loader loader-logo"></label>
            <label class="loader loader-name"></label>
          </div>
        </div>
        <div class="category mb-4" v-for="items in item" :key="items.id">
            <input type="checkbox" :name=items.name :id=items.name>
            <label :for=items.name class="category-logo text-center cursor-pointer" @click="escoger(items.id)"><i class="fas fa-book"></i></label>
            <label :for=items.name class="category-name text-center cursor-pointer" @click="escoger(items.id)">{{ items.name }}</label>
        </div>
      </div>
    </div>

    <div class="row d-flex justify-content-end">
      <button class="btn-custom" v-on:click="cambiar" >Continuar <i class="fas fa-angle-double-right"></i></button> 
    </div>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: null,
      isLoadingItems: true,
      preferences: {
        categorys: []
      },
      loadingItems:[1,2,3,4,5,6,7,8,9,10]
    };
  },
 
  methods: {
    cambiar() {
      if (this.preferences.categorys.length == 3) {      
        this.axios.post('/preferences/add', this.preferences).then((r) => {
          console.log(r.data);
          const status_user = localStorage.getItem('status_preference');
          if (status_user == 0) {
            localStorage.removeItem('status_preference');
            window.location.reload(true);
          }
        }).catch(e => {
          console.log(e);
        })
      }else{
        alert("Selecciona 3 categorias de su gusto!")
      }

      
    },
    escoger(id){
      if (!this.preferences.categorys.includes(id)) {
        this.preferences.categorys.push(id)
        console.log(this.preferences)
      }else{
        const catg = this.preferences.categorys.indexOf(id);        
        this.preferences.categorys.splice(catg,1);
        console.log(this.preferences)
      }

    },
    getAttributes() {
      this.axios.get("category/list").then((respuesta) => {
        this.item = respuesta.data.data;
        this.isLoadingItems=false;
      });
    },

    
  },

  created() {
    this.getAttributes();

  },
};
</script>

<style scoped>

.loader-logo{
  height: 80px;
  width: 40%;
  margin-inline: auto;
}

.loader-name{
  margin-top: 1rem;
  height: 25px;
  width: 70%;
  margin-inline: auto;
}

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
    color: rgb(1, 97, 1) !important;
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