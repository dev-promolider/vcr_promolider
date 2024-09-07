
<!--<template>
  <div class="row text-left px-3 mt-0 h-100 h2" style="background-color: #ff2b2b">
      <div class="col-md-12 text-white px-5" style="font-weight: 400; font-size: 0.9em; color: aqua;">{{title}}</div>
   </div>
</template>-->

<template>
    <div class="row" style="width: 50%;">
        <div class="text-left px-5 mt-0 h-100 h2 section-title">
            <div class="col-md-12 px-5">{{ title }}</div>
        </div>
    </div>
    <!--<div class="row text-left px-3 mt-0 h-50 h2 section-title">
        <div class="col-md-6 px-5">{{ title }}</div>
        <div class="text-right col-md-6 px-5">{{ title }}</div>
    </div>-->
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
 
<style scoped>
.section-title {
    font-size: 2rem;
    color: #636363;
    font-weight: 600;
    margin-top: 30px;
    margin-left: 20px;
}
</style>
  