<template>
  <div class="container-fluid" >

    <!-- Primera sección -->
    <div class="row my-5">
      <!-- Detalles del curso -->
      <div class="col-lg-4 col-md-12 pr-5 detailsCourse">
        <h3 class="font-weight-bold title-course" :class="{loader: !titulo , 'loader-titles': !titulo}">{{ titulo }}</h3>

        <ul class="pl-3 mb-5 list-unstyled">
          <li class="my-1" :class="{loader: !level, 'loader-text-small': !level}" ><i class="fas fa-chart-line mr-3"></i><strong>Nivel:</strong> {{level}}</li>
          <li class="my-1" :class="{loader: !fecha_creacion, 'loader-text-small': !fecha_creacion}" ><i class="fas fa-calendar-alt mr-3"></i><strong>Fecha de lanzamiento:</strong> {{fecha_creacion}} </li>
          <li class="my-1" :class="{loader: !categoria, 'loader-text-small': !categoria}" ><i class="fas fa-bezier-curve mr-2"></i><strong>Categoria del curso:</strong> {{ categoria }}</li>
        </ul>
        <div >
          <button v-if="false" class="btn-custom"  @click="BuyCourse()" 
        :class="{loader: !titulo }">Comprarlo por S/.{{precio}} soles</button>
        </div>

        <div v-if="mostrara">
          <button class="btn-custom"  @click="GoCourse()" >
        <span> Curso ya adquirido <br> Ir a Aprendisaje</span></button>
        </div>
        
      </div>

      <!-- Imagen del curso -->
      <div class="col-lg-8 pr-0 pl-4" :class="{loader: !img, 'loader-img-course': !img}">
        <img :src="img" class="img-course"  />
      </div>
    </div>
    

    <!-- Seccion inferior -->
    <div class="row">
      <div class="col-lg-9 col-md-12 mt-4">
        <div class="border-box p-5">
          <h5 class="font-weight-bold" :class="{loader: !descripcion, 'loader-text-small': !descripcion}">Descripción del curso</h5>
          <p class=" text-justify my-4" :class="{loader: !descripcion, 'loader-descriptions': !descripcion}">
            {{ descripcion}}
          </p>

          <h5 class="font-weight-bold" :class="{loader: !curso_detalle, 'loader-text-small': !curso_detalle}">Acerca de este curso</h5>
          <p class=" text-justify my-4" :class="{loader: !curso_detalle, 'loader-descriptions': !curso_detalle}">
            {{ curso_detalle}}
          </p>

          <h5 class="font-weight-bold" :class="{loader: !aprendera, 'loader-text-small': !aprendera}">¿Qué prenderás?</h5>
          <p class=" text-justify my-4" :class="{loader: !aprendera, 'loader-descriptions': !aprendera}">
            {{ aprendera}}
          </p>

          <h5 class="font-weight-bold" :class="{loader: !previos, 'loader-text-small': !previos}">¿Qué conocimientos previos necesitas?</h5>
          <p class=" text-justify my-4" :class="{loader: !previos, 'loader-descriptions': !previos}">
            {{ previos}}
          </p>

          <h5 class="font-weight-bold" :class="{loader: !dirigido, 'loader-text-small': !dirigido}">¿A quién está dirigido?</h5>
          <p class=" text-justify my-4" :class="{loader: !dirigido, 'loader-descriptions': !dirigido}">
            {{ dirigido}}
          </p>

        </div>

        <!-- Lista -->
        <div >
          <h4 class="font-weight-bold my-5" :class="{loader: isLoading, 'loader-text-small': isLoading}">Temario del curso </h4>
          <div v-if="isLoading" class="loader loader-temary"></div> 
          <ul class="list-group" >
            <li class="list-group-item px-5 py-4" v-for="(model,index) in course.modules" :key="index">
              <span v-b-toggle="model.name.replace(/ /g, '')" class="cursor-pointer"> <strong> {{index + 1 }}. {{model.name}}</strong> </span>
              <b-collapse :visible="index===0" :id="model.name.replace(/ /g, '')">
                <ul class="list-unstyled ml-3">
                  <li v-for="(less,index) in course.modules[index].lessons" :key=index class="my-4">
                      <div class="cursor-pointer" v-if="course.modules[0].lessons[0].id===less.id " @click="getVideo(less.id)" data-toggle="modal" data-target="#video">
                        <i class="far fa-play-circle text-success mr-3"></i>{{less.name}}
                      </div>
                      <div v-else>
                        <i class="fas fa-lock mr-3"></i>{{less.name}}
                      </div>
                    </li>
                </ul>
              </b-collapse>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-lg-3 col-md-12 mt-4 pr-0">
        <!-- Productor -->
        <div class="border-box p-5">
          <h5 class="font-weight-bold" :class="{loader: !nameProductor, 'loader-text-small': !nameProductor}">Productor</h5>
          <div class="row mt-3 productor">
            <div class="col-xl-4 col-lg-12 col-md-3 col-sm-3 image" >
              <img class="rounded-circle img-productor loader loader-img-productor"  :src=imgProductor />
            </div>
            <div class="col-xl-8 col-lg-12 col-md-9 col-sm-9 detalles">
              <span class="font-weight-bold" >{{ nameProductor }}</span>
              <p class="text-justify" :class="{loader: !nameProductor, 'loader-text-small': !nameProductor}"> {{ emailProductor }} </p>
            </div>
          </div>
        </div>

        <!-- Recomendaciones -->
        <div class="mt-4">
          <h5 class="font-weight-bold my-5" :class="{loader: loadingRelated, 'loader-text-small': loadingRelated}">Recomendaciones</h5>
          <div v-if="loadingRelated">
              <div class="loader loader-card my-4"></div>
              <div class="loader loader-card my-4"></div>
              <div class="loader loader-card my-4"></div>
          </div>
          <div class="card-container">
            <!-- card course -->
            <div class="border-box mb-4 cardCursos cursor-pointer" v-for="course in courses1" :key="course.id" >
              <Card :course="course" :cardType="1"/>
            </div>
        </div>

        </div>
      </div>
    </div>

    <!-- Video-Modal -->
    <div class="modal fade" id="video"  tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <h3 class="modal-title text-white text-center" id="staticBackdropLabel">{{ titulo }}</h3>
          </div>
          <div class="modal-body">
            <div class="video">
              <Video v-if="renderVideo"/>
              <div v-else class="center-spinner">
                <b-spinner style="width: 3rem; height: 3rem;" variant="secondary" label="Large Spinner"></b-spinner>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import Video from "@/components/course/video";
  import Card from "@/components/courses/cards";

  import { mapState, mapActions } from 'vuex';

export default {
  name: "VirtualClassroomBuyCursos",

  data() {
    return {
      inactive:false,
      baseURL: "http://promolider.xyz/storage/",
      nameProductor:'',
      emailProductor:'',
      items: [],
      pao_id: null,
      precio: "",
      descripcion: "",
      level: "",
      img: "",
      titulo: "",
      curso_detalle: "",
      aprendera: "",
      previos: "",
      dirigido: "",
      lecciones:[],
      lecciones2 :[],
      lecciones3 :[],
      lecciones4:[],
      description:"",
      limite : 4,
      courses:[],
      courses1:[],
      loadingRelated:true,
      fecha_creacion:null,
      categoria:null,
      ocultar:true,
      mostrara:true,
      imgProductor: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHiElEQVR4nO3OsQnAQBAEse+/6XMThoFFgXK9u3sAAPwnDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJo8AACwJg8AAKzJAwAAa/IAAMCaPAAAsCYPAACsyQMAAGvyAADAmjwAALAmDwAArMkDAABr8gAAwJoPMFknr0qyl3UAAAAASUVORK5CYII='
    };
  },
  components: {
    Video,
    Card
  },
  computed:{
     ...mapState('course',['course','renderVideo','isLoading'])
  },

  methods: {
    ...mapActions('course',{
        getCourse: 'getCourse',
        getVideo: 'getVideo'
      }),


    BuyCourse(){
      this.$router.push("/suscription-user")
      
      this.axios.post('/cart/buy-course', {
          "course_id": this.pao_id
        
      }
      )
      .then((resp) => {
        if (resp.data.status == 200) {
          this.ocultar = true;
          this.mostrara = false;
        }
      })
      
    },

    GoCourse(){
      this.$router.push("/suscription-user")
    },



    getAttributes() {
        this.pao_id = this.$route.params.ide;

        this.axios.get("course/details/" + this.pao_id).then((datos) => {
          this.items = datos.data.data[0];

          // Verificar si el curso esta activo o no
          // if(this.items.status!=1){
          //   console.log('Curso incativo') ;
          //   this.inactive=true;
          //   this.$router.push('/courses');
            
          // }else{
          //   console.log('Curso activo')
          // }

          this.precio = this.items.price;
          switch(this.items.course_level_id){
            case 1:
              this.level = 'Básico';
              break;
            case 2:
              this.level = 'Intermedio';
              break;
            case 3:
              this.level = 'Avanzado';
              break;
          }
          this.img = this.items.url_portada;
          this.titulo = this.items.title;
          this.descripcion = this.items.description;
          this.curso_detalle = this.items.course_about;
          this.aprendera = this.items.will_learn;
          this.previos = this.items.prev_knowledge;
          this.dirigido = this.items.course_for;

          // Formateando fecha
          const fecha= new Date(this.items.created_at);
          let options = { year: 'numeric', month: 'long', day: 'numeric' };
          this.fecha_creacion=fecha.toLocaleDateString("es-ES", options)

          this.axios.get('category/list').then((res)=>{
            for(const index in res.data.data){
              if(res.data.data[index].id==this.items.id_categories){
              this.categoria=res.data.data[index].name;
            }
            }
          })

          this.axios.get(`user/show?id=${this.items.user_id}`).then((res)=>{
            this.nameProductor = res.data.fullName ;
            this.emailProductor = res.data.email;
            this.imgProductor= '/img/logo-perfil.beab7730.png'
          });
        })
        
        

        this.axios.get("course/related-courses").then((datos) => {
          this.lord = false;
          this.guardar = true;
          this.loading = false;
          this.mostrar = true;
          // const array = datos.data.data;
          this.courses = datos.data.data;
          // this.informacion = array[0].courses_related;
          // console.log(array[0].courses_related)
          // console.log(array2[1].last_courses)
          //  this.informacion.forEach(cursos =>{

          //  })
          this.courses1 =this.courses.slice(0,3)
          this.loadingRelated=false;
        });

      // this.axios.get("/user/show/2").then((r) => {
      //  console.log(r)
      // });

    },
  },
  created() {
    this.getAttributes();
    this.getCourse(this.$route.params.ide);
    this.validar();

  },
};
</script>

<style scoped>
.container-fluid{
  width: 90%;
  margin-inline: auto;
  padding-bottom: 50px;
}
.title-course{
  text-transform: uppercase;
}
.img-course{
  width: 100%;
  max-height: 427px;
  border-radius: 25px;
}
.img-card{
  width: 100%;
  border-radius: 25px 25px 0px 0;
  height: 50%;
}
@media (max-width:700px) and (min-width:577px) {
  .img-card{
    height: 40%;
  }
}
.img-productor{
  width: 50px !important;
  height: 50px !important;
  
}

.list-group{
  border-radius: 25px;
}
.video{
  width: 100%;
  margin: auto;
  height: 600px;
}

.puntuacion{
  font-size: 1.04rem;
}

.detalles p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


@media (max-width:1500px){
  .detalles {
    font-size: 10px;
  }
  
}
@media (max-width:1200px){
  .img-productor{
    width: 70% !important;
    height: 80% !important;
    margin-left: 25% !important;
  }

  
}

@media (max-width: 991px) {
  .loader-img-course{
    display: none !important;
  }
  .img-course{
    display: none !important;
  }
  .detailsCourse{
    display: flex;
    flex-direction: column;
    justify-content: center !important;
    text-align: center !important;
    padding-right: 1rem !important;
  }
  .detailsCourse p{
    text-align: center !important;
  }
  p{
    padding-right:0 !important ;
  }
  
  .cardCursos{
    width: 40% !important;
    flex: none !important;
  }
  .card-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .detalles {
    font-size: 20px;
  }
}

@media (max-width:576px){
  .img-productor{
    width: 155% !important;
    margin-left: 0 !important;
  }
  .productor{
    display: flex !important;
    flex-direction:row !important;
  }

  .productor .image{
    width: 20% !important;
  }

  .productor .detalles{
    width: 80% !important;
  }

  .cardCursos{
    width: 100% !important;
    flex: none !important;
  }
}


  /* Animaciones de carga para cada elemento */

  .loader-titles{
    height: 40px;
    width: 100%;
  }

  .loader-descriptions{
    height: 50px;
  }

  .loader-text-small{
    height:30px;
    width: 70%;
  }

  .loader-card{
    height: 300px;
  }

  .loader-temary{
    height: 800px;
  }

  .loader-img-productor{
    height: 100% ;
    width: 100% ;
  }

  .loader-img-course{
    height: 427px;
  }  

</style>
