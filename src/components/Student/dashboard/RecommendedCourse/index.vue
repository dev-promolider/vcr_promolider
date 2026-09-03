<template>
  <div class="tw-w-full">
    <div class="tw-flex tw-items-center tw-justify-between tw-mb-6 tw-px-2">
      <div>
        <h3 class="tw-text-2xl tw-font-bold tw-text-gray-900 dark:tw-text-white tw-font-outfit">Cursos Recomendados</h3>
        <p class="tw-text-gray-500 tw-text-sm tw-mt-1">Selección especial para seguir tu aprendizaje.</p>
      </div>
    </div>
    
    <div class="tw-px-2">
      <CarrouselCourseMarketplace :courses="datos" />
    </div>
  </div>
</template>

<script>
import CarrouselCourseMarketplace from "@/components/courses/CarrouselCourseMarketplace.vue";

export default {
  props:{
    datos: {
      type: Array
    }
  },
  components:{
    CarrouselCourseMarketplace
  },
  data() {
    return {
      model:null,
      isLoading: true
    };
  },
  methods: {
    editar(id,slug){
      this.$router.push('/buy-cursos/' + id+'/'+slug)
    }
  },
};
</script>
