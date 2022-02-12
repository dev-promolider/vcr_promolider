<template>
    <div class="corrector">
        <p> cursos de interes</p>
<div class="total">
 <Carousel :per-page="3" >

        <Slide v-for="interesCourse in interesCourses" :key="interesCourse.id">

             <div class="contenido">

                    <img :src="interesCourse.image" alt="" width="250" height="150">
                    
                    <div class="precio">
                        <p >
                        {{interesCourse.price}}
                    </p>
                    </div>
                    
                    <div class="titulo">
                        <p >
                       Curso : {{interesCourse.title}}
                       <br>
                       nacimiento : {{interesCourse.created_at}}
                    </p>
                    </div>
                     
                    <div class="descripcion">
                        <p >
                        {{interesCourse.description}}
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
    name: 'VirtualClassroomInteresCourses',
 components:{
        Carousel,
        Slide
    },
    data() {
        return {
            
        };
    },

    props:{
        interesCourses:{
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
    border:1px solid rgb(172, 171, 170);
       opacity: .8;
    // background: rgb(250, 239, 231);
    margin-bottom: 20px;
    width: 81%;
    margin-right: auto;
    margin-left: auto;
    // margin-right: 10px;
    // margin-left: 10px;
}
.contenido{
    
    width: 10%;
    margin-left: 45px;
    margin-right: 10px;
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