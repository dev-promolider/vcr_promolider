<template>

    <div class="contenedor-temario bg-white col" > 

            <!-- Cabecera temario -->
            <div class="row " >
                <div class="container">
                <h5 class="ml-5 mt-4"><i class="fas fa-clone mr-2"></i>Temario</h5>
                </div>
            </div>            

            <!-- Cuerpo temario -->
            <div class="col temario ">
                <div class="d-flex justify-content-center spinner" v-if="cargar">
                       <b-spinner label="Large Spinner" variant="secondary"></b-spinner>
                   </div>

                <ul class="ml-5 mt-2" v-for="(model,index) in modules" :key=index v-else>
                    <li class="nav-temario"  > <span v-b-toggle="model.name"> <strong> {{index + 1 }}. {{model.name}} </strong> </span>
                        <b-collapse visible :id="model.name">
                        <ul >
                            <li v-for="(less,index) in modules[index].lessons" :key=index >
                                <input type="checkbox" v-model="completedLessons" :value=less.name >
                                <a @click="changeClass(less)" :class="{'activo':less.name===clase}" v-bind="less.name===clase ? urlClass=less.url : '' " >{{less.name}}  </a>
                            </li>  
                        </ul>
                        </b-collapse>
                    </li>
                                
                </ul>                    
            </div>

            <!-- Barra de progreso -->
            <div class="row py-3 ">
                <div class="col-md-2 col-sm-12 pl-5" >
                    <span>{{progress}}%</span>
                            </div>
                <div class="col-9 mt-1">
                        <b-progress animated :value="progress" variant="secondary" class="mr-2" ></b-progress> 
                        <p> URL ---> {{ urlClass }}</p>                        
                </div>
            </div>            
    </div>       
             
</template>

<script>
    export default{
        name:"Temario",
        data(){
            return{
                modules: null,
                lessons:null,
                progress: 0,
                allLessons:0,
                completedLessons: [],
                cargar: true,
                clase: null,
                urlClass: null 
            }
        },
        methods:{
            
            // Funcion para mostrar temario del curso
            getTemary(){
                this.axios.get('course/temary/get-all-class/'+this.$route.query.course).then((res)=>{
                this.cargar=false;
                this.modules = res.data.data.modules;

                // Calculando todas las lecciones
                for(let i=0; i<this.modules.length; i++){
                    this.allLessons += this.modules[i].lessons.length
                }
            });
            },

            // Funcion para calcular el progreso del curso
            getProgress(){
                const completed = Object.keys(this.completedLessons).length;
                const progress = Math.round((completed/this.allLessons)*100);
                if(isNaN(progress)){
                    this.progress=0;
                }else{
                    this.progress = progress;
                }
            },    
            
            // Cambiar de clase
            changeClass(less){
                if(less.name!=this.$route.query.class){
                    this.urlClass=less.url;
                    this.$router.push({
                        query: {
                            course: this.$route.query.course,
                            class: less.name 
                        }
                    });
                    this.$emit('urlClass',this.urlClass);
                }
            }

        },
        created(){
            // Ejecutar funciones locales
            this.getTemary();
        },
        updated(){
            this.getProgress();
        },
        watch:{
            "$route.query.class":{
                immediate: true,
                handler(titleClass){
                    this.clase=titleClass;
                }
            }
        }
        

    getProgress() {
      const completed = Object.keys(this.completedLessons).length;
      this.progress = Math.round((completed / this.allLessons) * 100);
    },
  },
  created() {
    // Ejecutar funciones locales
    this.getTemary();
  },
  mounted() {
    // Ejecutar funciones globales
  },
  updated() {
    this.getProgress();
  },
};
</script>

<style scoped>
/*contenedor*/
.contenedor-temario {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  font-size: 12px;
  margin: auto;
}

    /*contenedor*/
    .contenedor-temario{
        width: 100%;
        height: 100%;
        border-radius: 25px;
        margin: auto;
        position: relative;
        overflow: auto ;
    }

    .temario{
        width: 100%;
        height: 70%;
        overflow-y: scroll ;
    }

    ul{
        font-size: 16px;
    }

/* Lista de reproduccion */

    .contenedor-temario::-webkit-scrollbar {
    display: none;
    }

    /* Lista de reproduccion */

.nav-temario {
  transform: translateY(0%);
}

/* Linea vertical */
.nav-temario ul::after {
  content: "";
  position: absolute;
  width: 2px;
  height: calc(100% - 50px);
  left: 20px;
  top: 12px;
  background: black;
  z-index: -1;
  margin-top: 29px;
}

    /* Linea vertical */
    .nav-temario ul::after{
        content: "";
        position: absolute;
        width: 2px;
        height: calc(100% - 50px);
        left: 20px;
        top: 15px;
        background: black;
        z-index: -1;
        margin-top: 29px;
    }

.nav-temario ul li a {
  text-decoration: none;
  position: relative;
  color: black;
  font-size: 12px;
  line-height: 1rem;
  font-weight: 500;
  top: 8px;
}

.nav-temario ul li a {
        text-decoration: none;
        position: relative;
        color: black;
        font-size: 14px;
        line-height: 1rem;
        font-weight: 500;
        top: 8px;
    }

/* Pintando el checkbox */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  position: absolute;
  height: 24px;
  width: 24px;
  left: 9px;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

input[type="checkbox"]:after {
  font-family: "Font Awesome 5 Free";
  content: "\f058";
  color: black;
  font-size: 24px;
  background: white;
}

input[type="checkbox"]:checked {
  font-family: "Font Awesome 5 Free";
  content: "\f058";
  font-weight: 900;
  color: black;
  font-size: 24px;
}

    .spinner{
        margin-top: 25% ;
    }

    .activo{
        color: rgb(87, 167, 8) !important;
        font-weight: bold !important;
    }
    
    .progressBar {
  font-size: 12px;
}
</style>
