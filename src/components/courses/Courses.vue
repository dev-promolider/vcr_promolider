<template>
  <div class="container-courses">
    <div class="spinners" v-if="lord">
      <div class="loader">Loading...</div>
    </div>   
    <div class="buscador" v-if="guardar">
      <input type="text" placeholder="buscar el curso requerido" />
      <img src="@/assets/logo.png" alt="" />
    </div>

<Carrousel :movies="movies" v-if="guardar"/>
<CarrouselCourses :courses ="courses" v-if="guardar" />

<!-- <div class="caja">

  <button class="boton1">A</button>
  <div class="cajita" v-for="items in informacion" :key="items.id">

    <img :src="items.image" width="270" height="158" alt="">

  </div>
<button class="boton2" v-on:click="aumentar()">A</button>
</div> -->

<!-- https://www.youtube.com/watch?v=JbXLkhIfSTQ -->
  
  </div>
</template>

<script>
// import Spinner from '@/components/auth/Spinner.vue'
import Carrousel from '@/components/courses/Carrousel-preferences.vue';
import CarrouselCourses from '@/components/courses/Carrousel-cursos.vue'
export default {
  name: "Prueba",
  components: {
    // Spinner
    Carrousel,
    CarrouselCourses

  },
  data() {
    return {
      informacion: [],
      lord: true,
      limite: 5,
      lorde: false,
      prendido: true,
      guardar: false,
      total: [],
      noexis: false,
      loading: true,
      mostrar:false,

      title:'1231',
      age: 123,
      courses:[
       
      ],
      movies:[
        {id:1, banner: 'https://picsum.photos/600/300/?image=25' },
        {id:2, banner: 'https://picsum.photos/600/300/?image=25' },
        {id:3, banner: 'https://picsum.photos/600/300/?image=25' },

        {id:4, banner: 'https://picsum.photos/600/300/?image=25' },
        {id:5, banner: 'https://picsum.photos/600/300/?image=25' },
        {id:6, banner: 'https://picsum.photos/600/300/?image=25' },

        {id:7, banner: 'https://picsum.photos/600/300/?image=25' },
        {id:8, banner: 'https://picsum.photos/600/300/?image=25' },
        {id:9, banner: 'https://picsum.photos/600/300/?image=25' },

        {id:10, banner: 'https://picsum.photos/600/300/?image=25' },
        {id:11, banner: 'https://picsum.photos/600/300/?image=25' },
        {id:12, banner: 'https://picsum.photos/600/300/?image=25' },
      ]
      
    };
  },
  methods: {
    getAttributes() {
      this.axios.get("course/list").then((datos) => {
        this.lord = false;
        this.guardar = true;
         this.loading= false;
          this.mostrar=true;
        const array = datos.data.data;
        // const array2 =datos.data.data;
        // this.informacion = array[0].courses_related;
        console.log(array[0].courses_related)
      //  console.log(array2[1].last_courses)
      //  this.informacion.forEach(cursos =>{
         
      //  })
         this.courses = array[0].courses_related;
      

         console.log(this.courses)
        
        // for (let i = this.informacion.length; i < this.limite; i++) {
        //   this.informacion.push(this.total[i]);
        //   this.lorde = false;
          //console.log("funciona")
      //   }
      });
    
    },
    // aumentar() {
    //   this.limite += 5;
    //   this.lorde = true;
    //   if (this.informacion.length == this.total.length - 1) {
    //     this.prendido = false;
    //     this.lorde = false;
    //     this.noexis = true;
         
    //   }
      // this.informacion.forEach(cursos=>{
      //   this.age =cursos.id + 1
      //   console.log(this.age)
      // })
      // this.getAttributes();
    // },

    somar(){
      return this.age + this.title
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
/* contenedores de imagenes nuevo!*/ 
.caja{
  width: 100%;
  max-width: 100%;
  overflow:auto;
  margin-right: auto;
  margin-left: auto;
  height: 70%;
  display: flex;
  gap: 15px;
  position: relative;
  
}
/* .caja::-webkit-scrollbar{
  width:0;
} */
.cajita{
  width: 600px;
  height: 158px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.boton1{
  position: absolute;
  margin-top: 50px;
  left: 0;
  
}
.boton2{
  position: absolute;
  right: 0;
  margin-top: 40px;
}
/* terimna aqui!! */

.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(167, 133, 133, 0.2);
  border-right: 1.1em solid rgba(167, 133, 133, 0.2);
  border-bottom: 1.1em solid rgba(167, 133, 133, 0.2);
  border-left: 1.1em solid #32a141;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>