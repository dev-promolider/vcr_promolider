<template>
    <div class="corrector">
        <div class="title">
            <p> cursos de interes</p>
        </div>
        
<div class="total">
 <Carousel :per-page="3" >

        <Slide v-for="interesCourse in interesCourses" :key="interesCourse.id">

             <div class="contenido">

                    <img :src="interesCourse.image" alt="" width="250" height="150">
                    
                    <div class="precio">
                        <p >
                        S/{{interesCourse.price}}
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
    border:1px solid rgb(214, 214, 214);;
       opacity: .8;
    // background: rgb(250, 239, 231);
    margin-bottom: 20px;
    width: 81%;
    margin-right: auto;
    margin-left: auto;
    // margin-right: 10px;
    // margin-left: 10px;
}
.title{
font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; 
background: #d7ddf0;
width: 210px;
overflow: hidden; 
padding: 14px 2px 2px 2px;
border-radius: 25px 25px 25px 25px; 
-moz-border-radius: 25px 25px 25px 25px; 
-webkit-border-radius: 25px 25px 25px 25px; 
border: 2px solid #b9c6e9;
margin-left: auto;
margin-right: auto;
margin-bottom: 20px;
margin-top: 20px;
}
.title p{
    color: #4b4747; 
    font-size: 16px; 
font-weight: 700;
text-align: center; 
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