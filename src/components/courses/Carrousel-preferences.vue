<template>
  <div>
    <div>
      <div class="titulo">
        <p class="texto">Tus preferencias</p>
      </div>

      <div class="contenedor">
        <div class="carrusel">
          <Carousel :per-page="2" class="cajas">
            <Slide v-for="movie in movies" :key="movie.id">
              <b-card
                :img-src="movie.image"
                img-alt="Image"
                img-top
                style="max-width: 15rem"
                class="mb-2"
              >
                <b-card-text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </b-card-text>

                <b-button href="#" variant="primary">Go somewhere</b-button>
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
      mostrando: [],
      gaa: []
    };
  },
  methods: {
    datos() {
        console.log(this.movies);
        this.movies.forEach(ele => {
            this.gaa.push(ele)
            for( const aa of  this.gaa){
            this.mostrando.push(aa);
            }
        })
        console.log(this.mostrando)
    },
  },
  created() {
    this.datos();
  },
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
