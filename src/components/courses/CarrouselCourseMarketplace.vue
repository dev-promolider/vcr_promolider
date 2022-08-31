<template>
  <main>
    <vue-horizontal>
      <section class="item" v-for="course in courses" :key="course.id">
        <Card :course="course" :cardType="cardType"/>
      </section>
    </vue-horizontal>
  </main>
</template>

<script>
import Card from "@/components/courses/cards/marketplace.vue";

export default {
  name: "CarrouselCourse",
  components: {
    Card,
  },
  data() {
    return {
      peeked: false,
      timeout: null,
      baseURL: "http://promolider.xyz/storage/",
      cardType: 1,
    };
  },
  props: {
    courses: {
      type: Array,
    },
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

  padding: 20px 0px 0px 0px;
}
</style>
