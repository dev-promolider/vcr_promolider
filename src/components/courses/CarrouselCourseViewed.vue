<template>
  <div class="row mb-4" v-if="lastCourses.length >0">
    <h3 class="font-weight-bold">{{ nameUser }}, continuemos nuestro aprendizaje</h3>
    <vue-horizontal responsive class="carrousel this"
      >.
      <section v-for="course in courses" :key="course.id">
        <div class="card" @click="classvideo(course.id, course.last_class_reprod)">
          <img :src="course.url_portada" class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title font-weight-bolder text-justify">
              {{ course.title }}
            </h5>
            <p class="card-text text-justify">
              {{ course.description.slice(0, 50) }} ...
            </p>
            <label class="font-weight-bolder text-success price"
              >S/{{ course.price }}</label
            >
          </div>
        </div>
      </section>
    </vue-horizontal>
  </div>
</template>

<script>
// For convenience sake, I import a collection of images from unsplash.

export default {
  name: "CarrouselCourseViewed",
  data() {
    return {
      nameUser: localStorage.getItem("name_user"),
      lastCourses: [],
      peeked: false,
      timeout: null,
      baseURL: "http://promolider.xyz/storage/",
    };
  },
  // props: {
  //   courses: {
  //     type: Array,
  //   },
  // },
  methods: {
    getAttributes() {
      this.axios.get("course/last-courses-rep")
      .then((datos) => {
        this.lastCourses = this.filterCourseInactive(datos.data.data);
      });
    },
    filterCourseInactive(data){
      var courseFilter = data.filter((course)=>{
          return course.status!=0; 
      });

      return courseFilter;
    },
    classvideo(idCourse, idClass) {
      this.router.push("/course-user", {
        query: {
          course: idCourse,
          class: "clase" + idClass,
        },
      });
    },
  },
};
</script>

<style scoped>
.card-body {
  position: relative;
  margin-top: -20px;
}

.card-body p {
  margin-top: -8px;
}

.card img {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.price {
  position: absolute;
  bottom: 5px;
  right: 25px;
  font-size: 20px;
}

.carrousel {
  width: 100%; /*97.3*/
  margin: auto;
}

.card {
  border: none !important;
  background: transparent;
  height: 100% !important;
  width: 100% !important;
  transition: 1s;
  border-radius: 15px;
}

.card:hover {
  cursor: pointer;
  background: white;
  transition: 1s;
}

.card-img-top {
  height: 50%;
}

.this >>> .v-hl-btn {
  filter: invert(1);
}

.this >>> .v-hl-btn-next {
  transform: translateX(0);
}

.this >>> .v-hl-btn-prev {
  top: 0;
}

.this >>> .v-hl-btn-prev svg {
  margin: 0;
  padding: 4px;
  height: 30px;
  width: 30px;
}
</style>