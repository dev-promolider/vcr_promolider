<template>
    <div class="mt-4 corrector">
        <div class="title">
            <p >Lista de Cursos</p>
        </div>
        
        <div class="marco">
            <Carousel :per-page="4" >
        <Slide v-for="course in courses" :key="course.id"  >

            <div class="contenido">

                    <img :src="course.image" alt="" width="250" height="150"   >
                    
                    <div class="precio">
                        <p >
                        S/{{course.price}}
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
            type: Array
        },
    },
    data() {
        return {
            
        };
    },

    methods: {

        

        // mostrar(id){
            // this.$router.push("/buy-cursos/ " + id);
           
        // }

    }



};
</script>

<style lang="scss" scoped>
.corrector{
    width:1150px;
   
}

.marco{
    border: 1px solid rgb(214, 214, 214);
    // margin-bottom: 20px;
    opacity: .8;
    width: 97%;
    // background: rgb(222, 237, 250);
    margin-right: auto;
    margin-left: auto;
}
.contenido{
    width: 100%;
    margin-left: 15px;
    margin-right: 10px;
    margin-top: 20px;
  
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