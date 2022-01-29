<template>
  <div class="container-courses">
    <div class="spinners" v-if="lord">
      <b-spinner
        variant="success"
        type="grow"
        label="Spinning"
        class="mr-4"
      ></b-spinner>
      <b-spinner
        variant="success"
        type="grow"
        label="Spinning"
        class="mr-4"
      ></b-spinner>
      <b-spinner
        variant="success"
        type="grow"
        label="Spinning"
        class="mr-4"
      ></b-spinner>
      <b-spinner
        variant="success"
        type="grow"
        label="Spinning"
        class="mr-4"
      ></b-spinner>
    </div>   
    <div class="buscador" v-if="guardar">
      <input type="text" placeholder="buscar el curso requerido" />
      <img src="@/assets/logo.png" alt="" />
    </div>

    <div class="Todo">
      <div class="relacionados">
        <p>Cursos Relacionados</p>
      </div>

      <div class="avanza">
        <div class="contenidos" v-for="items in informacion" :key="items.id">
          <div>
            <b-img
              src="https://picsum.photos/300/150/?image=41"
              fluid
              alt="Responsive image"
            ></b-img>
          </div>
          <b-card-text class="mt-3">
            <p class="titulos">S/. {{ items.price }}</p>
          </b-card-text>

          <div class="descripcion">
            <span class="ml-2"> Descripcion :</span>
            <p>
              {{ items.description }}
            </p>
          </div>
          <b-button class="El_button1" variant="primary" @click="goToClass(items.id)">Ver Progreso completo</b-button>
        </div>
      </div>
    </div>

    <div class="movere">
      <button v-on:click="aumentar()" v-if="prendido">cargar más cursos</button>

      <div>
        <b-spinner label="Loading..." v-if="lorde"></b-spinner>
      </div>
    </div>
    <div v-if="noexis">
      <p>no existe mas datos</p>
    </div>
    <div class="ulti">
      <p>ultimos agregados</p>
    </div>     
  </div>
</template>

<script>
// import Spinner from '@/components/auth/Spinner.vue'
export default {
  name: "Prueba",
  components: {
    // Spinner
  },
  data() {
    return {
      informacion: [],
      lord: true,
      limite: 3,
      lorde: false,
      prendido: true,
      guardar: false,
      total: [],
      noexis: false
    };
  },

  methods: {
    getAttributes() {
      this.axios.get("course/list").then((datos) => {
        this.lord = false;
        this.guardar = true;
        
        const array = datos.data.data;
        this.total = array[0].courses_related;
        for (let i = this.informacion.length; i < this.limite; i++) {
          this.informacion.push(this.total[i]);
          this.lorde = false;
        }
      });
    },

    aumentar() {
      this.limite += 3;
      this.lorde = true;
      if (this.informacion.length == this.total.length - 1) {
        this.prendido = false;
        this.lorde = false;
        this.noexis = true;
      }

      this.getAttributes();
    },

    goToClass(courseId){
      this.$router.push({
        name: 'curso',
        query: { 
          course: courseId,
          class: 1
          }
        }
      );
    }

  },
  created() {
    this.getAttributes();
  },
};
</script>

<style  scoped>
.container-courses{
  display: flex;
  flex-direction: column;
  margin:0px;
  width: 100%;
  max-height: 100%;
}
.spinners {
  width: 100%;
  height: 100vh;  
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(236, 236, 236);
  transition: clip-path 0.4s ease-in-out;
  /* position: fixed; */
  top: 0;
  left: 0;
}
.buscador {
  align-self: flex-end;
  background: rgb(255, 255, 255);
  width: 280px;
  height: 38px;
  margin-right: 0px;
  display: flex;
  align-items: center;
  border: 0.5px solid #c4c4c4;
  border-radius: 15px;
  box-sizing: border-box;
}
.buscador input {
  width: 348px;
  height: 14px;
  border: none;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
}
.buscador input:focus {
  /* para quitar el color de marco de 
    input */
  margin: 0;
  outline: none;
}

.buscador img {
  width: 42px;
  height: 35px;
}

.relacionados {
  background: rgb(202, 202, 202);
  width: 200px;
  margin-top: 30px;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
}

.titulos {
  text-align: left;
  font-weight: bold;
  color: black;
  font-size: 0.9rem;
}
.El_button1 {
  margin-left: 45px;
  margin-bottom: 10px;
}
.avanza {
  display: flex;
  flex-wrap: wrap;
  margin-right: 45px;
  margin-left: 45px;
  margin-top: 40px;
}
.contenidos {
  margin-left: 30px;
  width: 210px;
  /* height: 280px; */
}
.movere {
  display: flex;
  margin-left: 45%;
}

.descripcion span {
  color: rgb(85, 20, 146);
}

.descripcion p {
  margin-top: 5px;
  text-align: center;
  padding: 0px 15px;
  font-size: 1.2rem;
  /* font-weight: bold; */
  color: rgb(17, 16, 16);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.ulti {
  margin-top: 20px;
}
</style>