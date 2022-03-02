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
          
          <p>Nivel {{level}}</p>
          
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
            <p>Acerca de este curso</p>
            <p>{{ curso_detalle }}</p>
          </div>

          <div class="aprender">
            <div>
              <div class="pregunta">
                <p>Que aprenderas</p>
              </div>

              <p class="respuesta">{{ aprendera }}</p>
            </div>

            <div>
              <div class="pregunta">
                <p>Conocimientos previos</p>
              </div>

              <p class="respuesta">{{ previos }}</p>
            </div>

            <div>
              <div class="pregunta">
                <p>Va dirigido</p>
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

        <div class="recomendaciones">
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
        </div>

        <div class="recomendaciones">
          <img src="" alt="soy un video" />
        </div>
        <div class="recomendaciones2">
          <p>asfasf</p>
        </div>
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
           this.lecciones4 = this.lecciones2.slice(6,12)
          
        
        
        // this.lecciones2=this.lecciones.map( datos => datos.name)
        // for(let i=0 ;i<this.lecciones2.length; i++){
        //     this.lecciones3= this.lecciones2.push[i]
        //          console.log(this.lecciones3)
        // }
       
      
        console.log(this.items);
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
  height: 390px;
  overflow: auto;
 
}
.contenido1 {
  // background: darkblue;
  width: 60%;
  height: 356px;
  margin: 2px;
}
.titulo_red {
  // background: rgb(99, 75, 72);
  font-size: 20px;
  font-weight: 800;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 10px;
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
  color:black;

}
.el_button button {
  background: linear-gradient(180deg, #5cc151 -131.4%, #97f18d 100%);
  color: rgb(0, 0, 0);
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

}

.contenido2 {
  // background: darkgoldenrod;
  width: 40%;
  height: 356px;
  margin-top: 2px;
  margin-left: 35px;
}
.contenido2 img {
  width: 98%;
  height: 336px;
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
}

.temarios {
  width: 75%;
  margin-right: 10px;
  margin-left: 5px;
}

.acerca_todo {
  padding: 10px;
  // background: wheat;
}
.acerca p {
  text-align: left;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  color: #000000;
}

.aprender {
  display: flex;
}
.pregunta p {
  text-align: left;
}

.respuesta {
  color: violet;
  display: -webkit-box;
  text-align: left;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}

.titulo {
  margin-top: 20px;
  // background: blueviolet;
  width: 30%;
}
.titulo p {
  text-align: left;
  color: black;
  font-size: 28px;
  font-weight: 900;
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
  width: 95%;
  height: 191px;
  margin: 5px 5px 0px 4px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  border-radius: 15px 15px 0px 0px;
}

.recomendaciones2 {
  width: 95%;
  height: 58px;
  margin-left: 4px;
  margin-bottom: 17px;
  background: #ffffff;
  border: 1px solid #efefef;
  box-sizing: border-box;
  border-radius: 0px 0px 15px 15px;
}
</style>

