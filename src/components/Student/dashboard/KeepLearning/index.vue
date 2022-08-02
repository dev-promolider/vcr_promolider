<template>
    <div style="min-height: 100vh; width:100%" >
     <v-fade-transition>
         <v-card v-if="isWelcomeActive" elevation="0"  color="transparent" style="margin: 100px auto" class="d-flex justify-center align-center flex-column" >
            <v-card-title class="d-flex justify-center align-center ">
                <v-icon
                  large
                  left
                >
                  mdi-home
                </v-icon>
                <span class="text-h5 font-weight-light ">Bienvenido {{user}}.</span>
            </v-card-title>

            <v-btn color="success" :to="{name: 'courses'}" style="text-decoration: none">
              MarketPlace
            </v-btn>
            <v-card-text>
              <div class="subtitle text--primary text-h6 text-center">En está sección podrás visualizar tus cursos y alcanzar tus logros.</div>
            </v-card-text>
         </v-card>
     </v-fade-transition>
 
      
         <Card   :course="lastCourses" :cardType="3" :width="100"  /> 
   

       <v-skeleton-loader
          v-if="isLoadingCourses && !isWelcomeActive"
          type="image, image"
        ></v-skeleton-loader>
  
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
        isLoadingCourses: true,
        isWelcomeActive: false,
        lastCourses: null,
        user: localStorage.getItem('name_user')
    }
  },
  methods: {
    async getAttributes() {
      let lastCourse;
      const resp = await this.axios.get("course/last-courses-rep")

         if( resp.data.status === 200){
           this.isWelcomeActive = true
           if(Object.keys(resp.data.data).length > 0){
              this.isLoadingCourses = false 

              this.isWelcomeActive = false

              lastCourse = this.filterCourseInactive(resp.data.data);

              const { data } = await this.axios.get(`purchased/show-class-seen?course_id=${lastCourse.id}`)

              const { name } = data.data
              if(!name) lastCourse.last_class_reprod = ''

              lastCourse.last_class_reprod = name

              this.lastCourses = lastCourse
           }
        }



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