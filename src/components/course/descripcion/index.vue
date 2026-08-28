<template>
  <div class="course-description tw-text-gray-700 tw-text-base md:tw-text-lg tw-leading-relaxed">
    {{ lesson.description }}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Descripcion",
  props: {
    id_lesson: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState("course", ["lesson"]),
  },
};
</script>

<style scoped>
.course-description {
  text-align: justify;
  white-space: pre-wrap;
}
</style>
