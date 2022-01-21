<template>
    <div class="all-course">
        <Prueba/>
    
    </div>
</template>
<script>
import Prueba from '@/components/course/Prueba.vue';
export default {
    name: 'Cursos',
    components:{
        Prueba        
    }
}
</script>
<style scoped>
    .all-course{
        flex-grow: 1;
        padding: 10px 2px;
        max-height: 100%;
        overflow: auto;
    }
</style>