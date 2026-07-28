<template>
  <div :title="course.title" class="course-card mb-5" v-if="course" @click="
    logCourseData(); // Muestra los datos del curso en la consola cuando se hace clic
  cardType == 1
    ? action(course.id, course.slug)
    : cardType == 4
      ? getCertificates(course)
      : goToCourse(course.id);
  ">
    <div class="tarjeta-cursos">
      <div>
        <img :src="course.url_portada ? (course.url_portada.startsWith('http') ? course.url_portada.replace('s3.sa-east-1', 's3-accelerate') : 'https://promolider-storage-user.s3-accelerate.amazonaws.com/' + course.url_portada) : ''" alt="no image" class="img-fluid img-cursos-portad" />
      </div>
      <div class="card-content">
        <div class="text-primary-pl valoracion-curso">
          <v-rating class="custom-rating" color="warning" hover readonly length="5" size="25"
            :value="parseFloat(course.ranking_by_user)" half-increments></v-rating>
        </div>
        <div class="titulo-curso">
          {{ course.title }}
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
  },
  methods: {
    getCourseInfo() {
      this.axios
        .get("course/details/" + this.$route.query.course)
        .then((response) => {
          console.log(response);
          this.courseInfo = response.data.data;
        });
    },
    logCourseData() {
      //console.log("Course Data:", this.course);
    },
    calcDiscount(price) {
      var disc = price * (this.certificateDisc / 100);
      return price - disc;
    },
    getDiscount() {
      this.spin = true;
      this.axios
        .get("/course/certificate-discount")
        .then((datos) => {
          this.certificateDisc = datos.data;
          this.spin = false;
        })
        .catch(() => {
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
    this.logCourseData(); // Aquí llamamos al método para ver los datos en la consola
  },
};
</script>

<style scoped>
.tarjeta-cursos {
  width: 230px;
  height: 260px;
  border-radius: 10px;
  border-color: #7f7f7f;
  box-shadow: 0 0 15px rgba(75, 75, 75, 0.5);
  display: flex;
  flex-direction: column;
}

.image-container {
  flex: 0 0 auto;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

.img-cursos-portad {
  border-radius: 20px;
  padding: 10px;
  height: 160px;
  width: 100%;
  object-fit: cover;
}

.valoracion-curso {
  padding: 5px;
  font-weight: 600;
  text-align: left;
}

.titulo-curso {
  font-size: 14px;
  font-weight: 700;
  color: var(--hm-text-heading, #0F172A);
  line-height: 1.35;
  max-height: 2.7em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  margin-top: 6px;
  margin-bottom: 8px;
}

.custom-rating .v-icon {
  padding: 0 !important;
}

.course-card {
  background: var(--hm-surface, #FFFFFF);
  border: 1px solid var(--hm-border, #E2E8F0);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--hm-shadow-sm, 0 1px 3px rgba(0,0,0,0.05));
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 240px;
  min-width: 230px;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -6px rgba(15, 23, 42, 0.12);
  border-color: rgba(16, 185, 129, 0.4);
  cursor: pointer;
}

.img-cursos-portad {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transition: transform 0.3s ease;
}

.course-card:hover .img-cursos-portad {
  transform: scale(1.03);
}

.card-content {
  padding: 14px 16px;
}

/* Tooltip para títulos largos */
.titulo-curso:hover {
  position: relative;
}

.titulo-curso[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
}
</style>
