<template>
  <div class="content-courses-recommend">
    <p class="title-recommend">Curso Recomendados</p>
    <vue-horizontal class="carrousel this">     
        <div v-for="course in relatedCourses" :key="course.id" class="item-course">
          <img :src="course.url_portada" alt="imagen-curso" />
          <div class="card-body">
            <h6>{{course.title}}</h6>
            <p>{{course.description}}</p>
          </div>
          <hr class="w-100 mb-0" />
          <div class="d-flex">
            <b-avatar
              class="ml-3 mb-2 mt-2"
              variant="info"
              src="https://placekitten.com/200/200"
            ></b-avatar>
            <p class="my-auto ml-3 mr-3">Aquino ondrad</p>
            <label class="font-weight-bolder price">
              S/{{ course.price }}</label>
          </div>
        </div>
        <!-- <div class="item-course">
          <img src="@/assets/cursos.jpg" alt="" />
          <div class="card-body">
            <h6>Curso de Ilustración</h6>
            <p>Lorem ipsum dolor s</p>
          </div>        
        </div>
        <div class="item-course">
          <img src="@/assets/cursos.jpg" alt="" />
          <div class="card-body">
            <h6>Curso de Ilustración</h6>
            <p>Lorem ipsum dolor</p>
          </div> 
        </div> -->

    </vue-horizontal>
  </div>
</template>

<script>
export default {
  name: "RecommendedCourse",
  data() {
    return{
      cuenta: localStorage.getItem("id_account_type"), 
      relatedCourses: [],
    }
  },
  methods: {
    async getAttributes() {
      await this.axios.get("course/released-courses").then((datos) => {
        this.relatedCourses = this.filterCourseInactive(datos.data.data);
      });
    },

    filterCourseInactive(data) {
      var courseFilter 
      if (this.cuenta == 5) {                   /* hice esto */
        courseFilter = data.filter((course) => {
          return course.status != 0 && course.course_level_id == 1;
        });
      } else {
        courseFilter = data.filter((course) => {
          return course.status != 0;
        });        
      }

      return courseFilter;  
    },
  },

  created() {
    this.getAttributes();
  },
};
</script>

<style scoped>
.content-courses-recommend {
    display: flex;
    flex-direction: column;
    padding: 40px 150px 0px 150px;
    gap: 35px;
}
.title-recommend{
    margin: 0;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #000;
}
.item-course {
  height: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  /* padding: 16px 24px; */
  background: #ffffff;
  margin-right: 20px;
}
.item-course img{
    width: 295px;
    height: 190px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
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
.card-body{
  width: 295px;
}
.card-body p{
  display: inline-block;
  overflow-wrap: break-word;
  word-wrap: break-word;
}
.price{
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items:center;
  margin: 0 12px 0 0;
}
/* .this >>> .v-hl-btn-prev svg {
  margin: 0;
  padding: 4px;
  height: 30px;
  width: 30px;
} */
@media (max-width:576px){
    .content-courses-recommend{
        padding-left: 22px;
        padding-right: 22px;
    }
}
</style>