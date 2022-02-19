<template>
    <div class="contenedor-temario col border-box" > 
            <!-- Cabecera temario -->
            <div class="row " >
                <div class="container">
                <h5 class="ml-5 mt-4"><i class="fas fa-clone mr-2"></i>Temario</h5>
                </div>
            </div>            

            <!-- Cuerpo temario -->
            <div class="col temario ">
                <div class="center-spinner" v-if="isLoading">
                       <b-spinner label="Large Spinner" variant="secondary"></b-spinner>
                </div>

                <ul class="ml-5 mt-2" v-for="(model,index) in course.modules" :key=index v-else>
                    <li class="nav-temario" > <span v-b-toggle="model.name"> <strong> {{index + 1 }}. {{model.name}} </strong> </span>
                        <b-collapse visible :id="model.name">
                        <ul >
                            <li v-for="(less,index) in course.modules[index].lessons" :key=index >
                                <input type="checkbox" v-model="completedLessons" :value=less.id @click="checkClass(less.id)">
                                <a @click="changeClass(less)" :class="{'activo':less.name===clase}"  >{{less.name}}  </a> <!--v-bind="less.name===clase ? urlClass=less.url : '' " -->
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
                </div>
            </div>            
    </div>                   
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default{
        name:"Temario",
        data(){
            return{
                progress: 0,
                clase: null,
                completedLessons: []
            }
        },
        computed:{
            ...mapState('course',['course','allLessons','lesson','isLoading'])
        },
        methods:{
            
            ...mapActions('course',{
                getCourse: 'getCourse',
                getLesson: 'getLesson',
                getResources: 'getResources',
                getVideo: 'getVideo'
            }),
            
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
                // Enviando informacion de la nueva clase
                this.getLesson(less);

                //Buscando el recurso de la clase
                this.getResources(this.lesson.name)

                // Cambiando video de la clase
                this.getVideo(less.id)

                // Cambiando de ruta
                if(less.name!=this.$route.query.class){
                    this.$router.push({
                        query: {
                            course: this.$route.query.course,
                            class: less.name 
                        }
                    });
                }
            },

            // Clases completadas
            getCompletedLessons(id){
                this.axios.get(`purchased/show?course_id=${id}`).then((res)=>{
                    for(const index in res.data.data){
                        if(res.data.status[index]==="SEEN"){
                            this.completedLessons.push(res.data.data[index])
                        }
                    }
                });
            },

            // Enviando nueva clase vista
            checkClass(idClass){
                this.axios.put(`purchased/update?course_id=${this.$route.query.course}&class_id=${idClass}`)
            }

        },
        created(){
            // Enviando inforamcion del curso para obtener temario
            this.getCourse(this.$route.query.course);
            // Recibiendo las clases completadas del curso
            this.getCompletedLessons(this.$route.query.course);
        },
        updated(){
            // Actualizando la barra de progreso
            this.getProgress();
        },
        watch:{
            "$route.query.class":{
                immediate: true,
                handler(titleClass){
                    this.clase=titleClass;
                }
            },
        },
    }
</script>

<style scoped>
    /*contenedor*/
    .contenedor-temario {
    width: 100%;
    height: 100%;
    font-size: 12px;
    margin: auto;
    position: relative;
    overflow-y: scroll ;
    }
    .temario{
        width: 100%;
        height: 70%;
        overflow-y: scroll ;
    }
    ul{
        font-size: 20px;
    }
/* Lista de reproduccion */
    .contenedor-temario::-webkit-scrollbar, .temario::-webkit-scrollbar {
    display: none;
    }
    /* Lista de reproduccion */
.nav-temario {
  transform: translateY(0%);
  list-style: none;
}
/* Linea vertical */
.nav-temario ul::after {
  content: "";
  position: absolute;
  width: 3px;
  height: calc(100% - 70px);
  left: 20px;
  top: 19px;
  background: black;
  z-index: -1;
  margin-top: 29px;
}
.nav-temario ul li{
        padding: 12px 0;
    }
    .nav-temario ul li a {
  text-decoration: none;
  position: relative;
  color: black;
  font-size: 16px;
  line-height: 1rem;
  font-weight: 500;
  top: 2px;
  cursor: pointer;
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
  pointer-events:none;
}
    
    .activo{
        color: rgb(87, 167, 8) !important;
        font-weight: bold !important;
        pointer-events:none;
    }
    .progressBar {
  font-size: 12px;
}
</style>