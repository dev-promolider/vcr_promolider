<template>
    <div>
        <div>
            <NavBar/>
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
export default {
    components:{
        NavBar
    },
    setup() {
        
    },
}
</script>