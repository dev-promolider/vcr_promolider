<template>
  <div class="corrector">
    <div class="title">
      <p>ultimos cursos</p>
    </div>

    <div class="total">
      <Carousel :per-page="3">
        <Slide v-for="lastCourse in lastCourses" :key="lastCourse.id">
          <div class="contenido">
            <img :src="lastCourse.image" alt="" width="300" height="150" />

            <div class="titulo">
              <p> {{ lastCourse.title }}</p>
            </div>

            <div class="descripcion">
              <p>
                {{ lastCourse.description }}
              </p>
            </div>
            <div class="precio">
              <div
                class="spinner-border spinner-border-sm ml-auto mr-auto"
                v-if="loading"
                role="status"
              ></div>
              <p v-if="mostrar">S/{{ lastCourse.price }}</p>
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
  name: "VirtualClassroomLastCourses",
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
    lastCourses: {
      type: Array,
    },
  },

  mounted() {
    if (this.lastCourses) {
      this.mostrar = true;
      this.loading = false;
    }
  },

  methods: {
    //          getAttributes() {
    //       this.axios.get("course/last-courses-rep").then((datos) => {
    //             console.log(datos)
    //             console.log("hola mundo")
    //    });

    //    },

    created() {
      this.getAttributes();
    },
  },
};
</script>

<style lang="scss" scoped>
.corrector {
  width: 1228px;
  margin-right: auto;
  margin-left: auto;
}
.total {
  border: 1px solid rgb(214, 214, 214);
  opacity: 0.8;
  margin-bottom: 20px;
  width: 90%;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 20px;
 background: rgb(253, 253, 253);
}
.contenido {
  width: 25%;
  margin-left: 40px;
  margin-right: 10px;
  margin-top: 20px;
}
.contenido:hover{
    background: #b9c6e9;
     opacity: 0.6;
     width: 81%;
     height: 57%;
     cursor: pointer;
}

.title {
  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
  background: #d7ddf0;
  width: 180px;
  overflow: hidden;
  padding: 14px 0px 0px 0px;
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
  width: 320px;
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
  text-align: left;
  margin-bottom: 0px;
  color: rgb(129, 11, 11);
  font-weight: 800;
  font-size: 20px;
  margin-top:5px;
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
  font-size: 13px;
  text-align: left;
}
</style>
