<template>
    <div class="corrector">
        <p> Cursos recien lanzados</p>
        <div class="total">
             <Carousel :per-page="2" >
        <Slide v-for="relatedCourse in relatedCourses" :key="relatedCourse.id">
           
            
             <div class="contenido">
                        <!-- <div class="imag"> -->
                            <img  :src="relatedCourse.image" alt="" width="250" height="150">
                        <!-- </div> -->
                    
                    
                    <div class="precio">
                        <p >
                        {{relatedCourse.price}}
                    </p>
                    </div>
                    
                    <div class="titulo">
                        <p >
                       Curso : {{relatedCourse.title}}
                       <br>
                       nacimiento : {{relatedCourse.created_at}}
                    </p>
                    </div>
                     
                    <div class="descripcion">
                        <p >
                        {{relatedCourse.description}}
                    </p>
                    </div>
                    

            </div>
           
        </Slide>
         </Carousel>
        </div>
    </div>
</template>

<script>
import { Carousel , Slide } from 'vue-carousel'
export default {
    name: 'VirtualClassroomRelatedCourses',

    components:{
         Carousel,
        Slide
    },

    data() {
        return {
            
        };
    },
     props:{
        relatedCourses:{
            type: Array
        },
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.corrector{
  width:1150px;
   
}

.total{
   border:1px solid rgb(187, 187, 187);
//    background-color: rgb(238, 236, 243);
   opacity: .8;
    margin-bottom: 20px;
    width: 52%;
        
   
    margin-right: 10px;
    margin-left: 18px;
}
.contenido{
    
    width: 100%;
    margin-left: 35px;
    margin-right: auto;
    margin-top: 20px;
  
}

.titulo{
    
    
    
    width: 250px;
}
.titulo p{
    text-align: left;
    margin-bottom: 0px;
    color:black;
    font-weight: 800;
}

.precio{
   
    width: 250px;
    
}
.precio p{
    text-align: left;
    margin-bottom: 0px;
    color:rgb(129, 11, 11);
    font-weight: 700;
}
.descripcion{
    width: 250px;
}
.descripcion p{
     display: -webkit-box;
      margin-bottom: 0px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  font-size: 13px;
   text-align: left;
}
</style>