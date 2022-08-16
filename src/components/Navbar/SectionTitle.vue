
<template>
  <div class="row text-left px-3 mt-0 h-100 h2" style="background-color: #35424a">
      <div class="col-md-12 text-white px-5" style="font-weight: 400; font-size: 0.8em">{{title}}</div>
   </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Default-name'
        }
    }
}
</script>

<style>

</style>