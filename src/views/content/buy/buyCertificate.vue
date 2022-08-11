<template lang="">
    <div class="buy">
        <BuyCertificate></BuyCertificate>
    </div>
</template>
<script>
import BuyCertificate from '@/components/Buy/BuyCertificate.vue'
export default {
    name: 'buyCertificate',
    components: {
        BuyCertificate
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