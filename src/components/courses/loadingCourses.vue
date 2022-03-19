<template>
  <div>
      <div v-for="item in [1,2,3]" :key="item.index" class="mb-5">
      <div class="loader loader-titles"></div>
      <div class="row my-3">
          <div class="loader loader-card mx-3" v-for="item in [1,2,3,4,5]" :key="item.index"></div>
      </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'loadingCourses'
}
</script>

<style>
.loader-titles{
    height: 30px;
    width: 300px;
}

.loader-card{
    height: 220px;
    width: 253px;
}

</style>