<template>
  <div
    :title="course.title"
    class="course-card mb-5"
    v-if="course"
    @click="
      cardType == 1
        ? action(course.id)
        : cardType == 4
        ? getCertificates(course)
        : goToCourse(course.id)
    "
  >

    <div class="tarjeta-cursos">
      <img :src="course.url_portada" alt="no image" class="img-fluid img-cursos-portad">
      <div class="text-primary-pl valoracion-curso">

      <v-rating
                style="display: inline"
                color="warning"
                hover
                readonly
                length="5"
                size="15"
                :value="parseFloat(course.ranking_by_user)"
                half-increments
              ></v-rating>
      
      </div>
      <div class="fila-tarjeta bg-terciary-pl">
        <div class="colum-tarjeta text-white">
          <span class="descuento-tarjeta"> %{{course.du}}</span>
        </div>

        <p
                class="fila-precio text-primary-pl"
                v-if="course.price == 0"
              >
                <img src="@/assets/free.png" alt="" width="20" /> GRATIS
        </p>

        <div class="colum-tarjeta">
          <div v-if="course.price > 0" class="fila-precio text-primary-pl">${{ course.price_with_discount.toFixed(2) }}</div>
          <div v-if="course.price > 0" class="fila-precio-anterior text-white">${{ course.price.toFixed(2) }}</div>
        </div>


        <div class="colum-tarjeta">
          <button class="btn bg-primary-pl">COMPRAR</button>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      photo: null,
      certificateDisc: 0,
    };
  },
  props: {
    course: {
      type: Object,
    },
    cardType: Number,
    width: Number,
    height: {
      type: String,
      default: "100%",
    },
    /* isMouseOverActive: {
      type: Boolean,
      default: false
    } */
  },
  methods: {
    calcDiscount(price){
      var disc = price*(this.certificateDisc/100);
      return price-disc;
    },
    getDiscount() {
      this.spin = true;
      this.axios.get("/course/certificate-discount").then((datos) => {
        this.certificateDisc = datos.data;
        this.spin = false;
      }).catch( ()=>{
        this.spin = false;
      });
    },
    // Evento hover para cambiar el background del aula virtual
    /* mouseOver(course){
       this.$store.commit("course/COURSE_HOVER", course);
    }, */

    // Evento cuando se quita el cursor de la card para quitar el background
    /*  mouseleave(){
      this.$store.commit("course/COURSE_HOVER", []);
    }, */

    // Accion para la card de tipo 1
    action(id) {
      /* this.mouseleave() */
      this.$router
        .push({ name: "buy-cursos", params: { ide: id } })
        .catch(() => {});
    },
    getCertificates(course) {
      this.$emit("selectedCertificate", course);
    },
    // Accion par el tipo de card 2 y 3 que redirecciona a ver el curso
    async goToCourse(id) {
      /* this.mouseleave() */
      let dataRequest;

      // Verificamos la ultima clase vista del curso y el tiempo de reproduccion de dicha clase
      await this.axios
        .get(`purchased/show-class-seen?course_id=${id}`)
        .then((res) => {
          dataRequest = res.data.data;
          this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);
        });

      // Verificamos si el usuario ya vio alguna clase, de otro modo le redireccionamos a la primera clase
      if (!dataRequest.name) {
        await this.axios
          .get("course/temary/get-all-class/" + id)
          .then((res) => {
            let fistClass = res.data.data.modules[0].lessons[0].name;
            this.$router
              .push({
                name: "curso",
                query: {
                  course: id,
                  class: fistClass,
                  rate: this.course.ranking_by_user,
                },
              })
              .catch(() => {});
            // this.$router
            //   .push(`course-user?course=${id}&class=${fistClass}`)
            //   .catch(() => {});
            //this.$router.push({ name: 'foo', params: {title: 'test title' }})
          });
      } else {
        this.$router
          .push({
            name: "curso",
            query: {
              course: id,
              class: dataRequest.name,
              rate: this.course.ranking_by_user,
            },
          })
          .catch(() => {});

        /*   this.$router
          .push(`course-user?course=${id}&class=${dataRequest.name}`)
          .catch(() => {});   */
      }
    },
  },

  created() {
    this.getDiscount();
  },

  /* destroyed(){
    this.mouseleave()
  } */
};
</script>

<style scoped>
.border-radius-image {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.border-radius-2 {
  border-bottom-left-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
}
.card-img-top {
  min-height: 210px;
  max-height: 210px;
}

.name{
  min-height: 45px;
  max-height: 45px;
}

.cert{
  min-height: 45px;
  max-height: 45px;
}

.course-title {
  font-size: 1.2em;
  display: inline;

  font-weight: 500;
}

.lesson-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.course-productor {
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.course-card {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  transition: 0.5s;
  max-width: 265px;
  min-width: 265px;
}
.course-card:hover {
  transform: scale(1.1);
  transition: 0.8s;
  cursor: pointer;
}

.image {
  min-height: 150px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  cursor: pointer;
  height: 100%;
}

.content {
  background: #EBEBEC;
  transition: 1s;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.name {
  margin-left: 4px;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 15px;
}

.producer {
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 300;
  line-height: 2rem;
  margin-bottom: 8px;
  color: #6b6b6b;
  line-clamp: 2;
}

/* .date {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
} */

/* .stars,
.stars h5 {
  font-size: 12px;
} */
.money {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.5;
  color: #131b1e;
}
.btn-play {
  position: relative;
  background: #ffffff;
}

.image:hover {
  transition: 0.8s;
}

.btn-play:after {
  font-family: "Font Awesome 5 Free";
  content: "\f144";
  color: rgba(25, 232, 0, 0.561);
  font-size: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -60px;
  margin-left: -40px;
  filter: inherit;
}

.content-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* Colores de fondo promolíder */
.bg-primary-pl {
  background-color: #1ae600;
}
.bg-secondary-pl {
  background-color: #35424a;
}
.bg-terciary-pl {
  background-color: #131b1e;
}
.bg-aux-pl {
  background-color: #e6e6e6;
}
/* Colores de texto promolíder */
.text-primary-pl {
  color: #1ae600;
}
.text-secondary-pl {
  color: #35424a;
}
.text-terciary-pl {
  color: #131b1e;
}
.tarjeta-cursos{
  width: 235px;

}
.img-cursos-portad{
  border-radius: 10px 10px 0px 0px;
  height: 154px;
}

.fila-tarjeta {
  display: flex;
  flex-direction: row;
  border-radius: 0px 0px 10px 10px;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0px;
}
.colum-tarjeta {
  display: flex;
  flex-direction: column;
}
.descuento-tarjeta {
  border: 1px solid white;
  border-radius: 8px;
  padding: 9px 6px;
  font-weight: 600;
}
.valoracion-curso {
  padding: 5px;
  font-weight: 600;
  text-align: right;
  background-color:white;
}
.colum-tarjeta button {
  font-size: 14px;
  font-weight: 700;
  padding: 5px 5px;
  border-radius: 8px;
}
.fila-precio {
  font-size: 18px;
  font-weight: 600;
}
.fila-precio-anterior {
  font-size: 14px;
  text-decoration-line: line-through;
}
</style>
