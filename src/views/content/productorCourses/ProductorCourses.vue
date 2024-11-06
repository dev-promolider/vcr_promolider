<template>
  <div style="min-height: 100vh">
    <SectionTitle title="Mis cursos" class="mt-5" />
    <div class="row px-4">
      <div class="col-md-12 col-sm-12">
        <div v-if="notCourses" class="mb-4">
          <div class="text-center">
            <div class="no-result sad-face"></div>
            <span>Lo sentimos, aún no hay cursos disponibles.</span>
          </div>
        </div>

        <div class="mt-5" v-if="loading">
          <loadingCourses />
        </div>

        <div class="mb-4 ml-2 cursor-pointer"  v-if="data.length > 0 && !loading">
          <CarrouselCourseMarketplace :courses="data" viewMode="myCourses" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarrouselCourseMarketplace from "@/components/courses/CarrouselCourseMarketplace";
import loadingCourses from "@/components/courses/loadingCourses";
import SectionTitle from "@/components/Navbar/SectionTitle.vue";

export default {
  data() {
    return {
      data: [],
      loading: true,
      notCourses: false,
    };
  },
  components: {
    loadingCourses,
    SectionTitle,
    CarrouselCourseMarketplace,
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await this.axios.get("/course/list-actives/producer").then((response) => {
        if (response.data.data.length === 0) {
          this.notCourses = true;
        } else {
          this.data = response.data.data;
        }
      });
      this.loading = false;
    },
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
