<template>
  <div
    class="scroll-y row p-2"
    v-if="muestra"
    style="background-color: #ffffff; min-height: 100vh"
  >
    <div class="col-md-12 mt-5 px-5 py-3">
      <p class="h1 text-center">Seleccione categorías de su interés</p>
      <p class="h5 text-center" style="color: #7e7e7e">
        Seleccione al menos 3 categorías, esto ayudará a obtener recomendaciones
        personalizadas
      </p>
    </div>

    <div
      class="w-50 container alert alert-danger alert-dismissible fade show"
      role="alert"
      v-if="alertita"
    >
      <div class="mx-auto w-100">
        <strong class="text-center">Seleccione mínimo 3 categorías</strong>
      </div>

      <button
        type="button"
        class="close"
        @click="closeAlert"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div v-if="isLoadingItems" class="row d-flex justify-content-center">
      <div
        v-for="itemNumber in loadingItems"
        :key="itemNumber.id"
        class="category mb-4"
      >
        <label class="loader loader-logo"></label>
        <label class="loader loader-name"></label>
      </div>
    </div>

    <div v-else class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
      <div class="row">
        <div
          class="col-md-2 col-xs-2 col-sm-3 col-lg-2"
          v-for="items in item"
          :key="items.id"
          :class="{ select: preferences.categorys.includes(items.id) }"
        >
          <div class="row">
            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 text-center">
              <input type="checkbox" :name="items.name" :id="items.name" />
              <label
                :for="items.name"
                class="category-logo cursor-pointer"
                @click="escoger(items.id)"
                ><i :class="items.icon"></i></label
              ><br />
              <label
                :for="items.name"
                class="category-name text-center cursor-pointer"
                @click="escoger(items.id)"
                >{{ items.name }}</label
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 text-right">
        <button
          class="btn-custom"
          v-on:click="cambiar"
          style="font-size: 1em; font-weight: 600"
        >
          Continuar <i class="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: null,
      alertita: false,
      muestra: true,
      isLoadingItems: true,
      preferences: {
        categorys: [],
      },
      loadingItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },

  methods: {
    cambiar() {
      if (this.preferences.categorys.length >= 3) {
        this.axios
          .post("/preferences/add", this.preferences)
          .then((r) => {
            console.log(r.data);
            const status_user = localStorage.getItem("status_preference");
            if (status_user == 0) {
              localStorage.removeItem("status_preference");
              window.location.reload(true);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (this.preferences.categorys.length < 3) {
        this.alertita = true;
        this.muestra = true;
      }
    },
    closeAlert() {
      this.alertita = false;
      this.muestra = true;
    },
    escoger(id) {
      if (!this.preferences.categorys.includes(id)) {
        this.preferences.categorys.push(id);
      } else {
        const catg = this.preferences.categorys.indexOf(id);
        this.preferences.categorys.splice(catg, 1);
      }
    },
    getAttributes() {
      this.axios.get("category/list").then((respuesta) => {
        this.item = respuesta.data.data;
        this.isLoadingItems = false;
      });
    },
  },

  created() {
    this.getAttributes();
  },
};
</script>

<style scoped>

.scroll-y {
overflow-y: auto;
max-height: 100vh;
}
.loader-logo {
  height: 80px;
  width: 40%;
  margin-inline: auto;
}

.loader-name {
  margin-top: 1rem;
  height: 25px;
  width: 70%;
  margin-inline: auto;
}

input[type="checkbox"] {
  display: none;
}
.category-logo {
  font-size: 2em;
  color: #aaaaaa;
  transition: 1s;
}

.category-name {
  font-size: 1em;
  font-weight: bolder;
  color: #aaaaaa;
  transition: 1s;
}

.category {
  width: 12rem !important;
  margin: 5px;
  display: flex;
  flex-direction: column;
  transition: 1s;
}

input[type="checkbox"]:hover + label {
  animation: temblar 1s 2.5 alternate;
}

.category:hover label,
.select label {
  color: #1ae800;
}

/* @media (max-width: 480px) {
  .category {
    width: 80% !important;
  }
  .loader-logo {
    height: 80px;
    width: 60%;
    margin-inline: auto;
  }

  .loader-name {
    margin-top: 1rem;
    height: 25px;
    width: 90%;
    margin-inline: auto;
  }
} */

@keyframes temblar {
  0% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(15deg);
  }
}

/* Animacion para mover iconos */
@keyframes temblare {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateY(1vh);
  }
}

/* .alerta{
  width: 35%;
  height: 35%;
  position:fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  background: none;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
  border-radius:15px 15px 15px 15px;
    animation: temblare 1s infinite alternate;
}

.costado{
  background:#f8cd56;
  width: 2%;
  height: 100%;
  border-radius:15px 0px 0px 15px;
 
}
.lateral{
background: rgb(255, 255, 255);
width: 98%;
height: 100%;
border-radius:0px 15px 15px 0px; */
/* display: flex; */

/* } */
/* .lateral i{
  color:#f8cd56;
  position:relative;
  font-size: 30px;
  margin-top:10%;
  margin-left:10%;
  height: 15%;
   width: 70%; 
   
}
.lateral p{
  width: 50%;
  color:black;
  
  font-size:23px;
  height: 100%;
  font-weight: 700;
  text-align: left;
  margin-left:5%;
  padding-top:5px;
  padding-bottom:5px;
 
}

.requisito{
 
  width: 90%;
  
  margin-left:auto;
  margin-right: auto;
  margin-top: 7%;
}
.requisito p{
   font-size:16px;
   font-weight: 600;
  text-align: justify;
  width: 90%;
}
.close {
  position: absolute;
  right: 45px;
  bottom: 25px;
  border: 2px solid #b88703;
  border-radius: 3px;
  color: #b88703;
  padding: 8px 10px;
  font-size: 18px;
  cursor: pointer;
  transition: all 300ms;
  left:15%;
  width: 30%;
}

.close:hover {
  transform: scale(1.15);
  color: rgb(20, 20, 20);
  font-weight: 700;
  background: #f8cd56;
  opacity: 0.7;
  transition: 0.5s;
  
} */
</style>
