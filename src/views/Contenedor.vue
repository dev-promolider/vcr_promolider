<template>
  <div class="content"> 
    <div class="nav-v">
        <NavBarV/>
    </div>
    <div class="content-user">
        <ContentUser/>
    </div>
  </div>
</template>
<script>

import NavBarV from '@/components/NavBarV.vue';
import ContentUser from "@/views/content/ContentUser.vue";
export default {
  name: 'Contenedor',
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
    width: 218px;
    min-height:100%;
    background: #494949;

  }
  .content-user{
    flex-grow: 1;
  }
</style>