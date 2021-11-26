<template>
  <div class="content"> 
    <div class="nav-v">
        <NavBarV/>
    </div>
    <div class="content-user">
      <div>
        <ContentUser/>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>

import NavBarV from '@/components/NavBarV.vue';
import ContentUser from "./content/ContentUser.vue";
export default {
  components: {
    ContentUser,
    NavBarV
  }
};
</script>
<style scope>

  .content{
    width: 100%;
    min-height: 100%;
    display: flex;
  }
  .nav-v{
    width: 20%;
    min-height:100%;
  }
  .content-user{
    width: 80%;
  }
</style>