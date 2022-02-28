<template>
  <div class="corrector">
    <div class="title">
      <p>CURSOS RECIEN LANZADOS</p>
    </div>

    <div class="total">
      <Carousel :per-page="2">
        <Slide v-for="relatedCourse in relatedCourses" :key="relatedCourse.id">
          <div class="contenido">
            <!-- <div class="imag"> -->
            <img :src="relatedCourse.image" alt="" width="250" height="150" v-on:click="editar(relatedCourse.id)" />
            <!-- </div> -->

            <div class="titulo">
              <p>
                {{ relatedCourse.title }} 
                <!-- <br>
                       nacimiento : {{relatedCourse.created_at}} -->
              </p>
            </div>

            <div class="descripcion">
              <p>
                {{ relatedCourse.description }}
              </p>
            </div>

            <div class="precio">
              <div
                class="spinner-border spinner-border-sm ml-auto mr-auto"
                v-if="loading"
                role="status"
              ></div>
              <p v-if="mostrar">S/{{ relatedCourse.price }}</p>
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "VirtualClassroomRelatedCourses",

  components: {
    Carousel,
    Slide,
  },

  data() {
    return {
      loading: true,
      mostrar: false,
    };
  },
  props: {
    relatedCourses: {
      type: Array,
    },
  },

  mounted() {
    if (this.relatedCourses) {
      this.mostrar = true;
      this.loading = false;
    }
  },

  methods: {
     editar(id){
         this.$router.push('/buy-cursos/' + id)
       }
  },
};
</script>

<style lang="scss" scoped>
.corrector {
 width: 1150px;
  margin-right: auto;
  margin-left: auto;
}

.total {

 background: rgb(253, 253, 253);
 border: 2px solid rgb(221, 220, 220);
  //    background-color: rgb(238, 236, 243);
  opacity: 0.8;
  margin-bottom: 20px;
  width: 52%;

  margin-right: auto;
  margin-left: auto;
}
.contenido {
  width: 100%;
  margin-left: 35px;
  margin-right: auto;
  margin-top: 20px;
}
.contenido img {

  transition: all 300ms;
  position:relative;
}
.contenido img:hover{
  transform: scale(1.10);
   background: #b9c6e9;
   opacity: 0.6;
  cursor: pointer;
}

.title {
  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
  background: #d7ddf0;
  width: 280px;
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
.title p {
  margin-right: auto;
  margin-left: auto;
  color: #4b4747;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  display: block;
 font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
  white-space: nowrap;
  width: 24ch;
  // border-right: 4px solid;
  animation: typing 2s steps(12), blink .5s infinite step-end alternate;
  overflow: hidden;
}
@keyframes typing {
  from { width :0}
}
@keyframes blink {
  50% { border-color :transparent}
  
}

.titulo {
  width: 250px;
}
.titulo p {
 text-align: left;
  margin-top: 10px;
  margin-bottom: 0px;
  color: black;
  font-weight: 900;
  font-size: 20px;
}

.precio {
  width: 250px;
}
.precio p {
    margin-top:5px;
   text-align: left;
  margin-bottom: 0px;
  color: rgb(129, 11, 11);
  font-weight: 900;
  font-size: 20px;
}
.descripcion {
  width: 250px;
}
.descripcion p {
  display: -webkit-box;
  margin-bottom: 0px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  font-size: 15px;
  text-align: left;
  color:rgb(190, 160, 26);
}
</style>
