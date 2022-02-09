<template>
  <div>
    <div>
      <div class="titulo">
        <p class="texto">Tus preferencias</p>
      </div>

      <div class="contenedor">
        <div class="carrusel">
          <Carousel :per-page="2" class="cajas">
            <Slide v-for="curso in cursos" :key="curso.id">
              <b-card
                :img-src=curso.image
                img-alt="Image"
                img-top
                style="min-width:250px; height:120px; ;"
                class="mb-2"
              >
                <b-card-text>
                  <p class="description-course">{{curso.description}}</p>
                </b-card-text>

                <b-button  variant="primary">{{curso.title}}</b-button>
              </b-card>
            </Slide>
          </Carousel>
        </div>
      </div>
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
    movies: {
      type: Array,
    },
  },
  data() {
    return {
      preferens: [],
      cursos: [],
    };
  },
  methods: {
    datos() {
      this.movies.forEach((datos) => {
        this.preferens.push(datos);
      });
      console.log(this.preferens);
      const categorias = this.preferens.map((p) => {
        for (const i in p) {
          return p[i];
        }
      });
      categorias.forEach((cat) => {
        for (const i in cat) {
          this.cursos.push(cat[i]);
        }
      });
      console.log(this.cursos);
    },
  },
  created() {
    this.datos();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.titulo {
  margin-left: 160px;

  width: 300px;
  padding-left: 70px;
}
.texto {
  color: rgb(117, 117, 117);
  width: 158px;
  text-align: left;
  font-weight: 900;
  font-size: 1.25rem;
}
.contenedor {
  background: rgb(116, 115, 115);
  width: 680px;
  border: 1px solid rgb(121, 112, 112);
  border-radius: 10px 10px 10px 10px;
  margin-left: 15px;
}
.carrusel {
  margin-top: 30px;
  height: 150px;
  width: 680px;
}

.cajas {
  margin-right: 95px;
  position: 10px;
}
</style>
