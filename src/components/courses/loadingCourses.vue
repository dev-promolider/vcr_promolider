<template>
  <div>
    <div v-for="item in [1, 2]" :key="item.index" class="mb-5">
      <div class="loader loader-titles"></div>
      <div class="d-flex loader-item flex-wrap my-3">
        <div
          class="loader loader-card mx-3 mt-3"
          v-for="item in [1, 2, 3, 4]"
          :key="item.index"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loadingCourses",
};
</script>

<style scoped>
.loader-titles {
  height: 30px;
  width: 300px;
}
.loader-card {
  width: 200px;
  height: 200px;
}
.loader-item {
  gap: 3px;
}
</style>
