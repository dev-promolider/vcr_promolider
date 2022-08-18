<template>
    <div style="min-height: 100vh">
    <SectionTitle title="Mis cursos" />
    <div class="row px-4">
      <div class="col-md-12 col-sm-12">
        <div v-if="notCourses" class="mb-4">
          <h3 class="m-0 font-weight-bold">Cursos</h3>
          <div class="no-result sad-face">
            <span>Lo sentimos, aún no hay cursos disponibles.</span>
          </div>
        </div>

        <div class="mt-5" v-if="loading">
          <loadingCourses />
        </div>

        <div class="mb-4 ml-2" v-if="data.length > 0 && !loading">
          <!-- <h3 class="mb-1 font-weight-bold">Más recientes</h3> -->
          <CarrouselCourse :courses="data" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CarrouselCourse from "@/components/courses/CarrouselCourse"
import loadingCourses from "@/components/courses/loadingCourses";
import SectionTitle from "@/components/Navbar/SectionTitle.vue";
export default {
    data (){
        return{
            data: [],
            loading: true,
            notCourses: false,
        }
    },
    components: {
        CarrouselCourse,
        loadingCourses,
        SectionTitle,
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            await this.axios.get('/course/list-actives/producer').then((response) => {
                this.data = response.data.data;
            });
            this.loading = false
        }
    }
}
</script>