<template>
    <div class="mt-4">
        <div class="lista">
            <p >Lista de Cursos</p>
        </div>
        
        <div class="marco">
            <Carousel :per-page="4" >
        <Slide v-for="course in courses" :key="course.id" >

            <div class="contenido">

                    <img :src="course.image" alt="" width="250" height="150" >
                    
                    <div class="precio">
                        <p >
                        {{course.price}}
                    </p>
                    </div>
                    
                    <div class="titulo">
                        <p >
                       Curso : {{course.title}}
                    </p>
                    </div>
                     
                    <div class="descripcion">
                        <p >
                        {{course.description}}
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
    name: 'VirtualClassroomCarrousel',
    components:{
        Carousel,
        Slide
    },

    props:{
        courses:{
            type:Array
        },
    },
    data() {
        return {
            
        };
    },



};
</script>

<style lang="scss" scoped>

.marco{
    border:2px solid rgb(116, 115, 115);
    margin-bottom: 20px;
    width: 85%;
    margin-right: 10px;
    margin-left: 10px;
}
.contenido{
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
  
}

.lista{
    width: 200px;

    margin-right: auto;
    margin-left: auto;
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