<template>
  <div
    :title="course.title"
    class="course-card mb-5"
    v-if="course"
    @click="
      logCourseData(); // Muestra los datos del curso en la consola cuando se hace clic
      cardType == 1
        ? action(course.id,course.slug)
        : cardType == 4
        ? getCertificates(course)
        : goToCourse(course.id)
    "
  >
    <div class="tarjeta-cursos" >
      <div >
        <img :src="course.url_portada" alt="no image" class="img-fluid img-cursos-portad">
      </div>
      <div class="text-primary-pl valoracion-curso">
        <v-rating
          class="custom-rating"
          style="display: inline"
          color="warning"
          hover
          readonly
          length="5"
          size="25"
          :value="parseFloat(course.ranking_by_user)"
          half-increments
        ></v-rating>
      </div>
      <div class="fila-tarjeta">
        {{ course.title }}
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
  },
  methods: {
    getCourseInfo(){
      this.axios.get('course/details/' + this.$route.query.course).then((response) => {
        console.log(response)
        this.courseInfo = response.data.data
      })
    },
    logCourseData() {
      //console.log("Course Data:", this.course);
    },
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
    action(id,slug) {
      this.$router
        .push({ name: "buy-cursos", params: { ide: id, slug: slug } })
        .catch(() => {});
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
            let firstClass = res.data.data.modules[0].lessons[0].name;
            this.$router
              .push({
                name: "curso",
                query: {
                  course: id,
                  class: firstClass,
                  rate: this.course.ranking_by_user,
                },
              })
              .catch(() => {});
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
      }
    },
  },
  created() {
    this.getDiscount();
    this.logCourseData(); // Aquí llamamos al método para ver los datos en la consola
  },
};
</script>


<style scoped>

.tarjeta-cursos{
  width: 230px;
  height: 260px;
  border-radius: 10px;
  border-color: #7F7F7F;
  box-shadow: 0 0 15px rgba(75, 75, 75, 0.5);
}

.img-cursos-portad{
  border-radius: 20px;
  padding: 10px;
  height: 160px;
}

.valoracion-curso {
  padding: 5px;
  font-weight: 600;
  text-align: left;
}

.custom-rating .v-rating-icon {
  color: #FFD700 !important;
}

.custom-rating .v-rating-icon.v-rating-icon--empty {
  color: #FFD700 !important;
}

.custom-rating .v-rating-icon.v-rating-icon--full {
  color: #FFD700 !important;
}

.custom-rating .v-rating-icon.v-rating-icon--half {
  color: #FFD700 !important;
}

.custom-rating .v-rating-icon {
  margin-right: 2px;
}


.fila-tarjeta {
  align-items: left;
  margin-left: 15px;
  margin-top: 0;
  font-size: 1em;
  color:#131b1e
}




.course-card {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  transition: 0.5s;
  max-width: 230px;
  min-width: 230px;
}
.course-card:hover {
  transform: scale(1.1);
  transition: 0.8s;
  cursor: pointer;
}

</style>
