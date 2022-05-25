<template>
    <div>
     <Card :course="lastCourses" :cardType="3" :width="100" :height="250" />
   </div>
</template>

<script>
// import { mapState } from 'vuex'
import Card from '@/components/courses/cards';
export default {
  components:{
     Card
  },
  name: "KeepLearning",
  data(){
    return {
        lastCourses: {},
    }
  },
  methods: {
    getAttributes() {
      this.axios.get("course/last-courses-rep").then((datos) => {
        this.lastCourses = this.filterCourseInactive(datos.data.data);
      });
    },
    filterCourseInactive(data) {
      var courseFilter = data.filter((course) => {
        return course.status != 0;
      });
      

       return courseFilter.splice(  -1 )[0] ;
  
    },
    classvideo() {
      this.$router.push(`/course-user?course=${5}&class=${'Documentacion'}`) 
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style>

.learning {
  background: #fff;
  border-radius: 15px;
  border-color: #EFEFEF;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  padding: 40px 30px 42px 50px;
  height: 100%;
}
.learning p {
  text-align: start;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #131b1e;
}
.modules{
    padding-left: 20px;
}
.modules li {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  list-style: none;
}
.btn-course{
    display: flex;
    justify-content: flex-end;
}
.btn-course button {
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  border: none;
  color: #fff;
  display: grid;
  place-content: center;
  width: 181px;
  height: 37px;
  background: linear-gradient(181.51deg, #1ae800 -146.2%, #97f18d 98.72%);
  border-radius: 15px;
}
</style>