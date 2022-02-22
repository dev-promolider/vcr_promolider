<template>
  <div class="corrector">
    <div class="title">
      <p>cursos de interes</p>
    </div>

    <div class="total">
      <Carousel :per-page="4">
        <Slide v-for="interesCourse in interesCourses" :key="interesCourse.id">
          <div class="contenido">
            <img :src="interesCourse.image" alt="" width="250" height="150" />

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
  mounted() {
    if (this.interesCourses) {
      this.mostrar = true;
      this.loading = false;
    }
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.corrector {
  width: 1228px;
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
  border: 1px solid rgb(214, 214, 214);
  opacity: 0.8;
  background: rgb(253, 253, 253);
  margin-bottom: 20px;
  width: 81%;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 20px;
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
.contenido {
  width: 10%;
  margin-left: 45px;
  margin-right: 10px;
  margin-top: 20px;
}
.contenido:hover{
    background: #b9c6e9;
     opacity: 0.6;
     width: 81.5%;
     height: 51%;
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
  font-weight: 800;
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
  font-size: 13px;
  text-align: left;
}
</style>
