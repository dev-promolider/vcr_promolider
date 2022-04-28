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
                    <li class="nav-temario" :title="model.name" > <span v-b-toggle="model.name.replace(/ /g, '')"> <strong> {{index + 1 }}. {{model.name}} </strong> </span>
                        <b-collapse visible :id="model.name.replace(/ /g, '')">
                        <ul >
                            <li v-for="(less,index) in course.modules[index].lessons" :key=index >
                                <input type="checkbox" v-model="completedLessons" :value=less.id @click="checkClass(less.id)">
                                <a @click="changeClass(less)" :class="{'activo':less.name===clase}"  :title="less.name" >{{less.name}}  </a> <!--v-bind="less.name===clase ? urlClass=less.url : '' " -->
                            </li>  
                        </ul>
                        </b-collapse>
                    </li>
                                
                </ul>                    
            </div>

            <!-- Barra de progreso -->
            <div class="row py-3 ">
                <div class="col-2  pl-5" >
                    <span>{{progress}}%</span>
                </div>
                <div class="col-9  mt-1">
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
@import './style.css';
</style>
