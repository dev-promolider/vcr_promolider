<template>
  <main class="mb-4" :class="lastCourses.length > 0 ? 'main-content':'main-none'">
    <h4 class="font-weight-bold mb-4">
      {{ nameUser }}, continua aprendiendo
    </h4>
    <vue-horizontal class="horizontal"
      >.
      <section class="item" v-for="course in lastCourses" :key="course.id">
     
        <Card :course="course" :cardType="3"  />
       
        <!-- <div
          class="card"
        >
          <div class="content">
            <p class="m-0 card-title font-weight-bolder text-justify">
              {{ course.title }}
            </p>
            <ul class="modules">
              <li>
                <img src="@/assets/list-disc.svg" class="mr-1" />Continuar con {{ course.last_class_reprod }}
              </li>
            </ul>
          </div>
         <div class="btn-course">
            <button @click="classvideo(course.id)"
            >Continua el curso</button>
          </div>
        </div> -->
      </section>
    </vue-horizontal>
  </main>
</template>

<script>
// For convenience sake, I import a collection of images from unsplash.
import Card from "@/components/courses/cards"

export default {
  name: "CarrouselCourseViewed",
  components:{
    Card
  },
  data() {
    return {
      nameUser: localStorage.getItem("name_user"),
      lastCourses: [],
      peeked: false,
      timeout: null,
      baseURL: "http://promolider.xyz/storage/"
    };
  },
  methods: {
    async getAttributes() {
      await this.axios.get("course/last-courses-rep").then((datos) => {
        this.lastCourses = this.filterCourseInactive(datos.data.data);
        for(let i=0; i<this.lastCourses.length; i++){
          this.axios.get(`purchased/show-class-seen?course_id=${this.lastCourses[i].id}`).then((res)=>{
            this.lastCourses[i].last_class_reprod = res.data.data.name
          });
        }
      });
    },
    filterCourseInactive(data) {
      var courseFilter = data.filter((course) => {
        return course.status != 0;
      });
        if( this.$router.currentRoute.name === 'home') {
          return courseFilter.splice( 0 , courseFilter.length - 1);
        }else{
          return courseFilter;
        }
    },
    async classvideo(id) {
      let dataRequest;
      await this.axios.get(`purchased/show-class-seen?course_id=${id}`).then((res)=>{
        dataRequest = res.data.data;
        this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);
      });
      if(dataRequest == "no existe"){
        this.getCourse(id);
        let fistClass = this.course.modules[0].lessons[0].name;
        this.$router.push(`course-user?course=${id}&class=${fistClass}`)
      }else{
        this.$router.push(`course-user?course=${id}&class=${dataRequest.name}`)
      }
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<!--
## Responsive Logic
The margin removes the padding from the parent container and add it into vue-horizontal.
If the gap is less than margin, this causes overflow to show and peeks into the next content for better UX.
You can replace this section entirely for basic responsive CSS logic if you don't want this "peeking" experience
for the mobile web.
Note that this responsive logic is hyper sensitive to your design choices, it's not a one size fit all solution.
var() has only 95% cross browser compatibility, you should convert it to fixed values.

There are 2 set of logic:
0-768 for peeking optimized for touch scrolling.
>768 for navigation via buttons for desktop/laptop users.
-->
