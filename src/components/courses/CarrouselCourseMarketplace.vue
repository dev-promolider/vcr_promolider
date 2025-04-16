<template>
  <main>
    <vue-horizontal>
      <section class="item" v-for="course in courses" :key="`${course.id}-${course.title}`">
        <Card :course="course" :cardType="cardType" :categories="categories" :viewMode="viewMode" />
      </section>
    </vue-horizontal>
  </main>
</template>

<script>
import axios from "axios";
import Card from "@/components/courses/cards/marketplace.vue";

export default {
  name: "CarrouselCourseMarketplace",
  components: {
    Card,
  },
  async created() {
    try {
      const response = await axios.get("category/list");
      this.categories = response.data.data;
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  },
  props: {
    courses: {
      type: Array,
      default: () => [],
    },
    viewMode: {
      type: String,
      default: "marketplace",
    },
  },
  data() {
    return {
      peeked: false,
      timeout: null,
      baseURL: "http://promolider.xyz/storage/",
      cardType: 1,
      Allcourses: [],
      categories: [],
    };
  },
  methods: {},
};
</script>

<style scoped>
.header {
  margin-bottom: 16px;
}

.item {
  width: 300px !important;
  padding: 0px 0px 0px 0px;
}
</style>
