<template>
  <div :title="course.title" class="course-card mb-5 ml-5" v-if="course" @click="
    cardType == 1
      ? action(course.id, course.slug)
      : cardType == 4
        ? getCertificates(course)
        : goToCourse(course.id)
    ">
    <div class="tarjeta-cursos">
      <div>
        <img :src="course.url_portada" alt="no image" class="img-fluid img-cursos-portad">
      </div>
      <div class="valoracion-curso">
        <v-rating style="display: inline" color="warning" hover readonly length="5" size="25"
          :value="parseFloat(course.ranking_by_user)" half-increments></v-rating>
      </div>
      <div class="info-curso">
        <p class="titulo-curso">
          {{ course.title }}
        </p>
      </div>
      <div class="row precios-comprar">
        <div class="col precios-curso">
          <p class="precio-descuento">${{ course.price_with_discount.toFixed(2) }}</p>
          <p class="precio-original">${{ course.price }}</p>
        </div>
        <div class="col btn-col">
          <button class="btn-comprar">
            {{ viewMode === 'myCourses' ? 'Ver mi curso' : 'COMPRAR' }}
          </button>
        </div>
        <p class="categoria-curso">{{ getCategoryName(course.id_categories) }}</p>
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
      categoria: null,
    };
  },
  props: {
    course: {
      type: Object,
      required: true
    },
    cardType: {
      type: Number,
      required: true
    },
    width: Number,
    height: {
      type: String,
      default: "100%",
    },
    categories: {
      type: Array,
      default: () => []
    },
    viewMode: {
      type: String,
      default: 'marketplace' // Valor por defecto
    },
  },
  methods: {
    getCategoryName(id) {
      const category = this.categories.find(cat => cat.id === id);
      return category ? category.name : 'Categoría no encontrada';
    },
    calcDiscount(price) {
      var disc = price * (this.certificateDisc / 100);
      return price - disc;
    },
    getDiscount() {
      this.spin = true;
      this.axios.get("/course/certificate-discount").then((datos) => {
        this.certificateDisc = datos.data;
        this.spin = false;
      }).catch(() => {
        this.spin = false;
      });
    },
    action(id, slug) {
      this.$router
        .push({ name: "buy-cursos", params: { ide: id, slug: slug } })
        .catch(() => { });
    },
    getCertificates(course) {
      this.$emit("selectedCertificate", course);
    },
    async goToCourse(id) {
      let dataRequest;
      await this.axios
        .get(`purchased/show-class-seen?course_id=${id}`)
        .then((res) => {
          dataRequest = res.data.data;
          this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);
        });
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
              .catch(() => { });
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
          .catch(() => { });
      }
    },
  },
  created() {
    this.getDiscount();
  },
};
</script>

<style scoped>
.course-card {
  border-radius: 10px;
  transition: 0.3s;
  width: 235px;
}

.course-card:hover {
  transform: scale(1.05);
}

.tarjeta-cursos {
  width: 235px;
  height: 330px;
  border-radius: 10px;
  border-color: #7F7F7F;
  box-shadow: 0 0 15px rgba(75, 75, 75, 0.577);
}

.img-cursos-portad {
  border-radius: 15px;
  padding: 5px;
  height: 154px;
  width: 100%;
  object-fit: cover;
}

.valoracion-curso {
  display: flex;
  justify-content: left;
  align-items: left;
  padding: 0px;
}

.info-curso {
  margin-left: 10px;
  text-align: left;
}

.titulo-curso {
  font-size: 1em;
  font-weight: 480;
  margin: 0;
}

.precios-comprar {
  display: flex;
  justify-content: space-between;
  margin: 0;
}

.precios-curso {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.precio-descuento {
  color: #20E404;
  font-size: 1em;
  font-weight: 490;
  margin: 0;
}

.precio-original {
  color: #ff0000;
  font-size: 0.7em;
  font-weight: 500;
  text-decoration: line-through;
  margin: 0;
}

.btn-col {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.btn-comprar {
  background: linear-gradient(to right, #20E404, #1CAC0B);
  color: white;
  border: none;
  font-size: 0.8em;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
  width: 100px;
  height: 25px;
}

.btn-comprar:hover {
  transform: scale(1.1);
}

.categoria-curso {
  font-size: 0.75em;
  color: #757575;
  margin-left: 15px;
}
</style>
