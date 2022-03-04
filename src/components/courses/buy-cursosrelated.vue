<template>
  <div>
    <div class="contenedor">
      <div class="contenido1">
        <div class="titulo_red">Renderizado videos</div>

        <div class="texto">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus ab sit natus commodi hic modi quam nam maiores ea, sunt
            exercitationem, unde accusantium? Tempora repellendus esse dolore
            itaque similique repudiandae.
          </p>
        </div>

        <div class="nivel">
          
          <p> Nivel : {{level}}</p>
           <p> Fecha de Lanzamiento : {{level}}</p>
            <p> Categoria del curso : {{level}}</p>
          
          </div>
        <div class="el_button">
          <button>comprado por S/ {{ precio }}</button>
        </div>
      </div>

      <div class="contenido2">
        <img :src="img" alt="soy una imagen" />
      </div>
    </div>

    <div class="temas">
      <div class="temarios">
        <div class="acerca_todo">
          <div class="acerca">
            <p class="acercacourse">Acerca de este curso</p>
            <p class="curso_detalle">{{ curso_detalle }}</p>
          </div>

          <div class="aprender">
            <div>
              <div class="pregunta">
                <p>¿Que aprenderás?</p>
              </div>

              <p class="respuesta">{{ aprendera }}</p>
            </div>

            <div>
              <div class="pregunta">
                <p>¿Que Conocimientos previos necesitas?</p>
              </div>

              <p class="respuesta">{{ previos }}</p>
            </div>

            <div>
              <div class="pregunta">
                <p>¿A quién va dirigido este curso?</p>
              </div>

              <p class="respuesta">{{ dirigido }}</p>
            </div>
          </div>
        </div>

        <div class="titulo">
          <p>Temario del curso</p>
        </div>

        <div class="cursos">
          <p>1.{{edicion}}</p>
        
          <p class="leccion" v-for="leccion in lecciones3" :key="leccion.id">{{leccion.name}}</p>
        </div>

        <div class="cursos2">
          <p>2.{{renderizado}}</p>
          <p class="leccion" v-for="leccionn in lecciones4" :key="leccionn.id">{{leccionn.name}}</p>
        </div>
      </div>

      <div class="productor">
        <div class="recomendaciones1">
          <img src="" alt="soy un video" />
        </div>

        <div class="titulo_recom">
          <p>Recomendaciones</p>
        </div>
        
        <div class="reco">
           <div class="recomendaciones" v-for="course in courses1" :key="course.id">
          <div class="ima">
            <img :src="course.image" alt="soy un video"  />
            <div class="recomendaciones2">
          <p>asf}</p>
        </div>
          </div>
          
           
        </div>
        </div>
       
       

        <!-- <div class="recomendaciones">
          <img src="" alt="soy un video" />
        </div>
        <div class="recomendaciones2">
          <p>asfasf</p>
        </div>

        <div class="recomendaciones">
          <img src="" alt="soy un video" />
        </div>
        <div class="recomendaciones2">
          <p>asfasf</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualClassroomBuyCursos",

  data() {
    return {
      items: [],
      edicion:"",
      renderizado:"",
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
    courses1:[]
    };
  },

  methods: {
    getAttributes() {
      this.pao_id = this.$route.params.ide;
      console.log(this.pao_id);

      this.axios.get("course/details/" + this.pao_id).then((datos) => {
        this.items = datos.data.data;
        this.precio = this.items.price;
        this.level = this.items.level;
        this.img = this.items.image;
        this.titulo = this.items.title;
        this.descripcion = this.items.description;
        this.curso_detalle = this.items.course_about;
        this.aprendera = this.items.will_learn;
        this.previos = this.items.prev_knowledge;
        this.dirigido = this.items.course_for;
        this.edicion = this.items.modules[0].name;
        this.renderizado = this.items.modules[1].name;
        this.lecciones = this.items.lessons

          this.lecciones2= this.lecciones
              
          this.lecciones3 = this.lecciones2.slice(0,5)
           this.lecciones4 = this.lecciones2.slice(6,7)
          
        
        
        // this.lecciones2=this.lecciones.map( datos => datos.name)
        // for(let i=0 ;i<this.lecciones2.length; i++){
        //     this.lecciones3= this.lecciones2.push[i]
        //          console.log(this.lecciones3)
        // }
       
      
        console.log(this.items);
      });

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
        console.log(this.courses);
      });

    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style lang="scss" scoped>
.contenedor {
  // background: salmon;
  margin-right: auto;
  margin-left: auto;
  width: 95%;
  display: flex;
  padding: 10px;
  margin-top: 50px;
  height: 460px;
  overflow: hidden;
 
}
.contenido1 {
  // background: darkblue;
  width: 45%;
  height: 356px;
  margin: 2px;
}
.titulo_red {
  // background: rgb(99, 75, 72);
  
  font-weight: 800;
  margin-right: 10px;
  margin-left: 20px;
  margin-top: 10px;
  
font-family: Roboto;
font-style: normal;
font-weight: 900;
font-size: 24px;
line-height: 28px;

color: #494949;
}
.texto {
  // background: wheat;
  margin-top: 40px;
  margin-right: 20px;
  margin-left: 20px;
}
.texto p{
  text-align: left;
}
.nivel {
  // background: seagreen;
  width: 60%;
  margin-top: 20px;
  margin-right: auto;
  margin-left: 55px;
}

.nivel p{
  text-align: left;
 font-family: Roboto;
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 26px;
/* or 186% */


color: #494949;

}
.el_button button {
  background: linear-gradient(180deg, #5cc151 -131.4%, #97f18d 100%);
  
  font-weight: 800;
  font-size: 19px;
  text-align: center;
  margin-left: 20px;
  padding: 9px;
  border: 2px solid rgb(207, 204, 204);
  border-radius: 20px;
  position: relative;
  margin-top: 25px;
  width: 282px;
height: 43px;
padding-top: 5px;
color: #FFFFFF;

}

.contenido2 {
  // background: darkgoldenrod;
  width: 55%;
  height: 356px;
  margin-top: 2px;
  margin-left: 35px;
}
.contenido2 img {
  width: 98%;
  height: 416px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  border-radius: 15px;
}

.temas {
  // background: sandybrown;
  margin-right: auto;
  margin-left: auto;
  width: 95%;
  height: 72%;
  display: flex;
  padding: 10px;
  margin-top: 50px;
  // height: 390px;
  margin-bottom: 25px;
  margin-top: 25px;
  display: flex;
}
.leccion{
  width: 10%;
  margin-left: 55px;
  margin-top: 40px;
}

.temarios {
  width: 75%;
  margin-right: 10px;
  margin-left: 5px;
}

.acerca_todo {
  padding: 10px;
  
background: #FFFFFF;
border: 1px solid #EFEFEF;
box-sizing: border-box;
border-radius: 15px;
height: 35%;
  // background: wheat;
}
.acercacourse{
  font-weight: 700;
  font-size: 17px;
    text-align: left;
    font-style: normal;
    font-family: Roboto;
    color:black;
    margin-left: 45px;
      margin-top: 35px;
  
}
.curso_detalle {
  text-align: left;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  margin-top: 10px;
margin-left: 45px;
margin-right: 25px;
  color: #000000;
}

.aprender {
  display: flex;
}
.pregunta p {
  text-align: left;
  margin-left: 45px;
  font-family: Roboto;
font-style: normal;
font-weight: 800;
font-size: 15px;
line-height: 14px;
margin-right: 10px;
margin-top: 28px;
/* identical to box height */


color: #000000;
}

.respuesta {
  color: violet;
  display: -webkit-box;
  text-align: left;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
  margin-left: 65px;
  margin-right: 5px;
  margin-top: 10px;
}

.titulo {
  margin-top: 32px;
  margin-bottom: 40px;
  // background: blueviolet;
  width: 30%;
}
.titulo p {
  text-align: left;
  color: black;
 font-family: Roboto;
font-style: normal;
font-weight: 900;
font-size: 25px;
line-height: 21px;

color: #000000;
}

.cursos {
  margin-top: 20px;
  background: #ffffff;
  padding: 10px;
  border-radius: 15px 15px 0px 0px;
  box-sizing: border-box;
  border: 1px solid #efefef;
}

.cursos p {
  text-align: left;
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 14px;
  /* identical to box height */
  color: #000000;
}

.cursos2 {
  margin-top: 0.5px;
  background: #ffffff;
  padding: 10px;
  border-radius: 0px 0px 15px 15px;
  box-sizing: border-box;
  border: 1px solid #efefef;
}

.cursos2 p{
text-align: left;
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 14px;
  /* identical to box height */
  color: #000000;
}

.productor {
  // background: teal;
  width: 25%;
  height: 100%;
  padding-right: 1px;
}

.titulo_recom p {
  color: black;
  text-align: left;
  margin-left: 8px;
  margin-top: 33px;
  margin-bottom: 40px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

}
.reco{
  display: inline-block;
  width: 100%;
}
.ima img{
  width:100%;
  height: 150px;
}
.recomendaciones1 {
  width: 95%;
  background: #ffffff;
  margin: 5px 5px 5px 4px;
  height: 174px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  border-radius: 15px;
}

.recomendaciones {
  width: 100;
  height: 191px;
  margin: 5px 5px 30px 4px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  border-radius: 15px 15px 0px 0px;
  
}

.recomendaciones2 {
  width: 100%;
  height: 58px;
  margin-left: 0px;
  margin-bottom: 50px;
  background: #ffffff;
  border: 1px solid #efefef;
  box-sizing: border-box;
  border-radius: 0px 0px 15px 15px;
 
  
}
</style>
