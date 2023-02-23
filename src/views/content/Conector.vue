<template>
<div></div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        async start() {
            this.$router.push(`/buy-cursos/${this.$route.params.value}`).catch(() => {});
        }
    },
    mounted() {
        this.start();
    },
}
</script>
