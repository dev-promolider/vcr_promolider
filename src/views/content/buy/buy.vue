<template lang="">
    <div class="buy">
        <Buy></Buy>
    </div>
</template>
<script>
import Buy from '@/components/Buy/Buy.vue'
export default {
    name: 'buy',
    components: {
        Buy
    }
    
}
</script>
<style scoped>
    .buy{
        width: 100%;
        max-width: 1200px;
        height: 90vh;
        max-height: 100%;
        margin: 0 auto;
    }
</style>