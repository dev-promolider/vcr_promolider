<template>
  <div
    class="course-card"
    v-if="course"
    @click="
      cardType == 1
        ? action(course.id)
        : cardType == 4
        ? getCertificates(course)
        : goToCourse(course.id)
    "
  >
    <div
      :class="[{ 'btn-play': cardType == 3 }, 'image']"
      :style="{ background: `url(${course.url_portada})` }"
    ></div>

    <div class="content p-3">
      <div class="row">
        <div
          class="col-md-12 col-lg-12 col-sm-12 col-xs-12"
          style="padding-top;0 px; padding-bottom: 0px"
        >
          <p class="text-left text-capitalize course-title">
            {{ course.title }}
          </p>
        </div>

        <div class="row pl-4" v-if="cardType == 1">
          <div
            class="col-md-12 col-lg-12 col-sm-12 col-xs-12 d-flex justify-content-between"
          >
            <div>
              <p class="text-right" v-if="cardType == 1">
                {{ course.name }}
              </p>
            </div>
            <div>
              <p class="text-right px-4" v-if="course.price > 0">
                S/. {{ course.price }}
              </p>
              <p class="text-right px-4" v-if="course.price == 0">
                <img src="@/assets/free.png" alt="" width="25" /> GRATIS
              </p>
            </div>
          </div>
        </div>

        <!-- <div class="d-flex stars" v-if="cardType == 1">
        <h5 class="font-weight-bold text-warning puntuacion mr-2">3,5</h5>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star text-warning"></i>
        <i class="fas fa-star-half-alt text-warning"></i>
        <i class="far fa-star text-warning"></i>
      </div> -->

        <div
          class="col-md-12 col-lg-12 col-sm-12 col-xs-12"
          style="padding-top;0 px; padding-bottom: 0px"
          v-if="cardType == 2"
        >
          <div class="row">
            <div class="col-md-2 col-sm-2 col-xs-2">
              <img
                :src="course.photo"
                class="rounded-circle"
                style="height: 30px"
              />
            </div>
            <div class="col-md-9 col-sm-9 col-xs-9 course-productor">
              <p>
                {{ course.name + " " + course.last_name }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="col-md-12 col-lg-12 col-sm-12 col-xs-12"
          v-if="cardType == 3"
        >
          <div class="row px-4" style="color: #464646">
            <p class="text-left">
              {{ course.last_class_reprod }}
            </p>
          </div>
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
              .push({name:'curso', query: {course: id , class: fistClass , rate : this.course.ranking_by_user}})
              .catch(() => {});
            // this.$router
            //   .push(`course-user?course=${id}&class=${fistClass}`)
            //   .catch(() => {});  
              //this.$router.push({ name: 'foo', params: {title: 'test title' }})
          });
      } else {
        this.$router
          .push({name:'curso', query: {course: id , class: dataRequest.name, rate : this.course.ranking_by_user }})
          .catch(() => {});

      /*   this.$router
          .push(`course-user?course=${id}&class=${dataRequest.name}`)
          .catch(() => {});   */
      }
    },
  },

  /* destroyed(){
    this.mouseleave()
  } */
};
</script>

<style scoped>
.course-title {
  font-size: 1.3em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}
.course-productor {
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.course-card {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 1px solid #e2e8f0;
  /* height: 100%;
  display: flex;
  flex-direction: column; */
  /* padding: 10px; */
  transition: 0.5s;
  max-width: 265px;
  min-width: 265px;
}
.course-card:hover {
  transform: scale(1.04);
}
.image {
  min-height: 150px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  cursor: pointer;
  height: 100%;
}

.content {
  /* padding: 12px 16px 0 0; */
  /* display: flex; */
  /* flex-direction: column; */
  /* gap: 5px; */
  background: rgba(175, 175, 175, 0.256);
  transition: 1s;
}
/* .content:hover {
  cursor: pointer;
  background: #fff;
  transition: 0.8s;
} */

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

.date {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
}

.stars,
.stars h5 {
  font-size: 12px;
}
.money {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.5;
  color: #131b1e;
}
.btn-play {
  position: relative;
  background: red;
}

.btn-play:after {
  font-family: "Font Awesome 5 Free";
  content: "\f144";
  color: rgba(96, 217, 80, 0.561);
  font-size: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -60px;
  margin-left: -40px;
}
</style>
