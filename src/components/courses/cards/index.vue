<template>
    <div class="card" @click="cardType == 1 ? action(course.id): goToCourse(course.id)" @mouseover="mouseOver(course)" @mouseleave="mouseleave()">
        <div
              :class="[{'btn-play':cardType == 3},'image']"
              :style="{ background: `url(${course.url_portada})` }"
        ></div>
        <div class="content">
            <p class="m-0 name text-left text-capitalize">
              {{ course.title }}
            </p>
            <p class="m-0 title text-left" v-if="cardType == 1">
              {{ course.name }}
            </p>

            <div class="d-flex stars" v-if="cardType == 1">
                  <h5 class="font-weight-bold text-warning puntuacion mr-2" >3,5</h5>
                  <i class="fas fa-star text-warning"></i>
                  <i class="fas fa-star text-warning"></i>
                  <i class="fas fa-star text-warning"></i>
                  <i class="fas fa-star-half-alt text-warning"></i>
                  <i class="far fa-star text-warning"></i>
            </div>

            <div class="date" v-if="cardType == 1">
              <p class="m-0 money text-left">S/. {{ course.price }}</p>
            </div>
            <div class="d-flex mt-2" v-if="cardType == 2">
              <b-avatar
                class="mb-3 ml-2"
                variant="info"
                src="https://placekitten.com/200/200"
              ></b-avatar>
              <p class="m-1 ml-2 ">
                {{ course.name + " " + course.last_name }}
              </p>
          </div>
          <div class="d-flex mt-2" v-if="cardType == 3">
              <p class="m-1 ml-2 ">
                {{ course.last_class_reprod }}
              </p>
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "Card",
  data() {
    return {
      
    };
  },
  props: {
    course: {
      type: Array,
    },
    cardType:Number
  },
  methods: {
    mouseOver(course){
      this.$store.commit("course/COURSE_HOVER", course);
    },

    mouseleave(){
      this.$store.commit("course/COURSE_HOVER", []);
    },
    
    action(id){
      this.mouseleave()
      this.$router.push('/buy-cursos/' + id)
      window.location.reload(true);
    },

    async goToCourse(id){
      this.mouseleave()
      let dataRequest;
      await this.axios.get(`purchased/show-class-seen?course_id=${id}`).then((res)=>{
        dataRequest = res.data.data;
        this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);
      });
      if(!dataRequest.name){
        await this.axios.get('course/temary/get-all-class/' + id).then(
          (res) => {
            let fistClass = res.data.data.modules[0].lessons[0].name;
            this.$router.push(`course-user?course=${id}&class=${fistClass}`)
          }
        )
      }else{
        this.$router.push(`course-user?course=${id}&class=${dataRequest.name}`)
      }
    }
  },

  destroyed(){
    this.mouseleave()
  }

}
</script>

<style scoped>
.card {
  /* background: linear-gradient(to right, rgba(15, 32, 39, 0.609), rgba(32, 58, 67, 0.609), rgba(44, 83, 100, 0.609));  */
  overflow: hidden;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 2px 2px 10px #131b1e, 0.144;
  transition: 1s; 
  max-width: 300px;
  min-width: 300px;
}
.card:hover{
  transform: scale(1.04);
}
.image {
  min-height: 150px;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  cursor: pointer;
}

.content {
  padding: 12px 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* background: rgba(175, 175, 175, 0.256); */
  transition: 1s;
}
.content:hover {
  cursor: pointer;
  background: #fff;
  transition: 0.8s;
}

.name {
  margin-left: 4px;
  font-size: 18px;
  font-weight: 700;
  line-height: 15px;
}

.title {
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 15px;
  margin-bottom: 8px;
  color: #C4C4C4;
  line-clamp: 2;
  overflow: hidden;
}

.date {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
}

.stars, .stars h5 {
  font-size: 12px;
}
.money{
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  color: #131b1e
}
.btn-play{
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
