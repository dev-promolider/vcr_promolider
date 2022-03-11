<template>
  <div class="contenido my-5">


      <div class="alerta " v-if="alertita">
          <div class="header">
            <p>ACCION  NO  REQUERIDA!!</p>
             <button class="cerrar" @click="closeAlert">X</button>
          </div>

          <div class="exis">

              <div class="ima">
  
              </div>
              <div class="la_ima">
                <p>X</p>
              </div>
            <p class="letra">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt temporibus soluta corporis facilis iste assumenda dicta maxime </p>

            <div class="line">

            </div>

            <button class="close" @click="closeAlert">Close</button>
          </div>

    </div>
    
    
    <h2 class="text-center font-weight-bold ">Seleccione las categorias de su preferencia</h2>

    <p class="text-justify my-5" >
        Selecciona al menos 3 categorias de cursos que sean de su agrado, 
        esto le ayudara a obtener recomendaciones personalizadas. Las 
        categorías seleccionas no se mostrarán públicamente.
    </p>

    <div class="container-fluid" v-if="muestra">
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

    <div class="row d-flex justify-content-end" v-if="muestra" >
      <button class="btn-custom" v-on:click="cambiar" >Continuar <i class="fas fa-angle-double-right"></i></button> 
    </div>

    

  </div>
</template>

<script>
export default {
  data() {
    return {
      item: null,
      alertita:false,
      muestra:true,
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
      }else if(this.preferences.categorys.length < 3){
        
           this.alertita =true;
           this.muestra=false;

      }
      
    },
    closeAlert(){
             this.alertita=false;
             this.muestra =true;
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

.contenido{
  position:relative;
}

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
    width: 80% !important;
  }
  .loader-logo{
    height: 80px;
    width: 60%;
    margin-inline: auto;
  }

  .loader-name{
    margin-top: 1rem;
    height: 25px;
    width: 90%;
    margin-inline: auto;
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

.alerta{
  position:fixed;
  border-radius: 15px 15px 15px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10%;
  left: 25%;
  width: 50%;
  height: 58%;
  background: rgb(236, 236, 236);
  color:white;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.4);
  animation: temblare 1s infinite alternate;

}
@keyframes temblare {
  from{
      transform: translateX(0);
  }
  to{
    
    transform: translateY(1vh);

  }
}

.header{
  border-radius: 15px 15px 0px 0px;
  background: #e24f4f;
  height: 15%;
  opacity: 0.85;
  display: flex;
}
.header p{
  margin: auto 0px auto 5%;
  color: rgb(255, 255, 255);
  text-align: center;
  
  font-weight: 900;
  font-size: 1.7rem;
}
.cerrar{
  margin: 2px 8px 2px auto;
  background: none;
  color: white;
  border: none;
  width: 8%;
  height: 90%;
  font-size: 1.9rem;
  font-weight: 900;
  cursor: pointer;
  
}
.exis{
  margin-left: auto;
  margin-right: auto;
 
  
  
}

.ima{
  /* text-align: center;
  margin:30px auto 0px auto;
  font-size: 55px;
  color:#e24f4f;
  font-weight: 700;
  height: 80px;
  width: 80px;
  border: 3px solid #e24f4f;
  border-radius: 50%;
  box-sizing: border-box;
  padding-top:0px; */

  border: 7px solid rgba(0, 0, 0, 0.3);
  width: 106px;
  height: 106px;
  border-radius: 50%;
  border-color: #e01616;
  margin-right: auto;
  margin-left: auto;
  margin-top: 5%;
  animation: spin 2s ease infinite;
  position: relative;
  overflow: hidden;
  
  
  
}

@keyframes spin {
  0% {
    transform: rotate(50deg);
    border-color: #b1aaaa;
    width: 108px;
    height: 108px;
  
  }
  
  100% {
    transform: rotate(350deg);
    border-color: #e01616;
    width: 108px;
    height: 108px;
  
  }
}

.la_ima{
 
 width: 100%;
  height:15%;
  position:absolute;
  box-sizing: border-box;
  top:26%;
  
}
.la_ima p{
font-size: 55px;
  color:#e24f4f;
  font-weight: 700;
   text-align: center;
  
}

.letra{
  text-align: center;
  font-size: 19px;
  margin-top:20px;
  padding-top:10px;
  padding-right: 30px;
  padding-left: 30px;
}
.line{
  bottom: 60px;
  width: 85%;
  margin: 35px auto auto auto;
  height: 1px;
  background: silver;
}
.close{
  position:absolute;
  right: 45px;
  bottom: 25px;
  border:2px solid #e24f4f; 
  border-radius: 3px;
  color:#e24f4f;
  padding: 8px 10px;
  font-size: 18px;
  cursor:pointer; 
  transition: all 300ms;
 
}

.close:hover{
   transform: scale(1.15);
    color:white;
    font-weight: 300;
    background:#e24f4f ;
   opacity: 0.7;
   transition: .5s;
}
</style>