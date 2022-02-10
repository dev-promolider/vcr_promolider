<template>
  <div>
    CURSOSSS!!!!!
  </div>
</template>

<script>
export default {
  name: "Prueba",
  components: {
    // Spinner
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
         
      })
         this.courses = array[0].courses_related;
          this.movies = array2[1].last_courses;
          // console.log(this.courses)

        

          
        // for (let i = this.informacion.length; i < this.limite; i++) {
        //   this.informacion.push(this.total[i]);
        //   this.lorde = false;
          //console.log("funciona")
    }
  }
}
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
  width: 340px;
  height: 48px;
  margin-left: 810px;
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
