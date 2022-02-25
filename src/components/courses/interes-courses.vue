<template>
  <div class="corrector">
    <div class="title">
      <p>CURSOS DE INTERES</p>
    </div>

    <div class="total">
      <Carousel :per-page="4">
        <Slide v-for="interesCourse in interesCourses" :key="interesCourse.id">
          <div class="contenido">
            <img :src="interesCourse.image" alt="" width="250" height="150" v-on:click="editar(interesCourse.id)"/>

            <div class="titulo">
              <p>
                 {{ interesCourse.title }}
                <br />
                {{ interesCourse.created_at }}
              </p>
            </div>

            <div class="descripcion">
              <p>
                {{ interesCourse.description }}
              </p>
            </div>
            <div class="precio">
              <div class="spinner" v-if="loading"></div>
              <p v-if="mostrar">S/{{ interesCourse.price }}</p>
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
  name: "VirtualClassroomInteresCourses",
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
    interesCourses: {
      type: Array,
    },
  },
  methods:{
     editar(id){
         this.$router.push('/buy-cursos/' + id)
       }
  },
  mounted() {
    if (this.interesCourses) {
      this.mostrar = true;
      this.loading = false;
    }
  },


};
</script>

<style lang="scss" scoped>
.corrector {
  width: 1028px;
  margin-right: auto;
  margin-left: auto;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;
  transition-duration: 0.8s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.total {
  border: 2px solid rgb(221, 220, 220);
  opacity: 0.8;
  background: rgb(253, 253, 253);
  margin-bottom: 20px;
  width: 81%;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 20px;
}
.title {
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
  margin-top: 50px;
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
  width: 17ch;
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
.contenido {
  width: 10%;
  margin-left: 45px;
  margin-right: 10px;
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
