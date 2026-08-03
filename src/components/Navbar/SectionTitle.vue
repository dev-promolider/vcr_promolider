<template>
    <div class="tw-w-full md:tw-w-1/2">
        <div class="tw-text-left tw-h-full tw-text-[1.5rem] md:tw-text-[2rem] tw-font-semibold tw-mt-[15px] md:tw-mt-[30px] tw-ml-[10px] md:tw-ml-[20px]" style="color: var(--text-bold);">
            <div class="tw-w-full tw-px-[15px] md:tw-px-5">{{ title }}</div>
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
/* Estilos migrados a Tailwind CSS */
</style>
