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
        width: 95%;
        margin: 3%;
    }
</style>