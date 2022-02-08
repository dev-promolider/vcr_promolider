<template>
  <div class="container-courses">
    <div class="spinner" v-if="lord">
     
    </div>   
    <div class="buscador" v-if="guardar">
      <input type="text" placeholder="buscar el curso requerido" />
      <img src="@/assets/logo.png" alt="" />
    </div>


  <PreferecesSection :movies="movies" v-if="guardar" />
  <MoviesSection :courses="courses" v-if="guardar"/>
 

  </div>
</template>

<script>
// import Spinner from '@/components/auth/Spinner.vue'
import PreferecesSection from '@/components/courses/Carrousel-preferences.vue'
import MoviesSection from '@/components/courses/Carrousel-cursos.vue'
export default {
  name: "Courses",
  components: {
    // Spinner
    MoviesSection,
    PreferecesSection

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
        // {id:1, banner: 'https://picsum.photos/600/300/?image=25' },
        // {id:2, banner: 'https://picsum.photos/600/300/?image=25' },
        // {id:3, banner: 'https://picsum.photos/600/300/?image=25' },

        // {id:4, banner: 'https://picsum.photos/600/300/?image=25' },
        // {id:5, banner: 'https://picsum.photos/600/300/?image=25' },
        // {id:6, banner: 'https://picsum.photos/600/300/?image=25' },

        // {id:7, banner: 'https://picsum.photos/600/300/?image=25' },
        // {id:8, banner: 'https://picsum.photos/600/300/?image=25' },
        // {id:9, banner: 'https://picsum.photos/600/300/?image=25' },

        // {id:10, banner: 'https://picsum.photos/600/300/?image=25' },
        // {id:11, banner: 'https://picsum.photos/600/300/?image=25' },
        // {id:12, banner: 'https://picsum.photos/600/300/?image=25' },
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
        const array2 =datos.data.data;
        // this.informacion = array[0].courses_related;
        // console.log(array[0].courses_related)
        // console.log(array2[1].last_courses)
      //  this.informacion.forEach(cursos =>{
         
      //  })
         this.courses = array[0].courses_related;
          this.movies = array2[1].last_courses;
          // console.log(this.courses)

        

          
        // for (let i = this.informacion.length; i < this.limite; i++) {
        //   this.informacion.push(this.total[i]);
        //   this.lorde = false;
          //console.log("funciona")
        // }

      });
    },
    aumentar() {
      this.limite += 5;
      this.lorde = true;
      if (this.informacion.length == this.total.length - 1) {
        this.prendido = false;
        this.lorde = false;
        this.noexis = true;
         
      }
      // this.informacion.forEach(cursos=>{
      //   this.age =cursos.id + 1
      //   console.log(this.age)
      // })
      this.getAttributes();
    },

    goToClass(courseId){
      this.$router.push({
        name: 'course-user',
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

/* links
https://www.tiktok.com/@rubentuestaok/video/7057606896286502149 
https://www.tiktok.com/@_ismaelsanchez18/video/7059826752171969798
*/

.container-courses{
  display: flex;
  flex-direction: column;
  margin:0px;
  width: 100%;
  max-height: 100%;
}
.spinner {
  border: 9px solid rgba(0, 0, 0, 0.3);
  width: 106px;
  height: 106px;
  border-radius: 50%;
  border-left-color: #078812;
  margin-left: 485px;
  margin-top: 200px;
  animation: spin 1s ease infinite;
  position: absolute;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.buscador {
 
  background: rgb(255, 255, 255);
  width: 340px;
  height: 48px;
  margin-left: 710px;
  margin-right: 0px;
  display: flex;
  align-items: center;
  border: 1px solid #c4c4c4;
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
  overflow: auto;
  margin-right: auto;
  margin-left: auto;
  height: 70%;
  display: flex;
  gap: 15px;
  position: relative;
  
}
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
  position: relative;
  right: 0;
  margin-top: 40px;
}
/* terimna aqui!! */
</style>
