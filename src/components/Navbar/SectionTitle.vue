<template>
    <div class="row" style="width: 50%">
        <div class="text-left px-5 mt-0 h-100 h2 section-title">
            <div class="col-md-12 px-5">{{ title }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Default-name",
        },
    },
};
</script>

<style scoped>
.section-title {
    font-size: 2rem;
    color: #636363;
    font-weight: 600;
    margin-top: 30px;
    margin-left: 20px;
}

@media screen and (max-width: 768px) {
    .row {
        width: 100% !important;
    }

    .section-title {
        font-size: 1.5rem;
        margin-top: 15px;
        margin-left: 10px;
    }

    .section-title .col-md-12 {
        padding-left: 15px !important;
        padding-right: 15px !important;
    }
}
</style>
