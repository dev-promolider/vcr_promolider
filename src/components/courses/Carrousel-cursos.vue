<template>
  <div class="mt-4 corrector">
    <div class="title">
      <p>Lista de Cursos</p>
    </div>

    <div class="marco">
      <Carousel :per-page="4">
        <Slide v-for="course in courses" :key="course.id">
          <div class="contenido">
            <img :src="course.image" alt="" width="250" height="150" />

            <div class="titulo">
              <p> {{ course.title }}</p>
            </div>

            <div class="descripcion">
              <p>
                {{ course.description }}
              </p>
            </div>
            <div class="precio">
              <div
                class="spinner-border spinner-border-sm ml-auto mr-auto"
                v-if="loading"
                role="status"
              ></div>
              <p v-if="mostrar">S/{{ course.price }}</p>
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
  name: "VirtualClassroomCarrousel",
  components: {
    Carousel,
    Slide,
  },

  props: {
    courses: {
      type: Array,
    },
  },
  data() {
    return {
      loading: true,
      mostrar: false,
    };
  },

  mounted() {
    if (this.courses) {
      (this.loading = false), (this.mostrar = true);
    }
  },
  methods: {
    // mostrar(id){
    // this.$router.push("/buy-cursos/ " + id);
    // }
  },
};
</script>

<style lang="scss" scoped>
.corrector {
  width: 1150px;
  margin-right: auto;
  margin-left: auto;
}

.marco {
  border: 2px solid rgb(221, 220, 220);
   background: rgb(253, 253, 253);
  // margin-bottom: 20px;
  opacity: 0.8;
  width: 97%;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 20px;
}
.contenido {
  width: 100%;
  margin-left: 15px;
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
.title {
  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
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
.title p {
  color: #4b4747;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
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
  margin-top: 1px;
  margin-bottom: 0px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
 font-size: 15px;
  text-align: left;
  color:rgb(190, 160, 26);
}
</style>
