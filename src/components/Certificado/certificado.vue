<template>
    <div>
        <div class=" w-75 container mt-5">
            <div class="col col-md-6 col-lg-12">
            <div class="category-logo container d-flex row text-center cursor-pointer ">

                <div class="ml-5"  @click="escoger()"><i class="fas fa-book"></i></div>
                <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
                <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
                <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
                <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
                <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
                <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
                <div class="ml-5" @click="escoger()"><i class="fas fa-book"></i></div>
            
              </div>
        </div>
        </div>
        
        
            
      
    </div>
</template>

<script>
export default {
    name: 'VirtualClassroomCertificado',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        escoger(){
            this.$router.push('/detalle-certificado')
        }
    },
};
</script>

<style lang="scss" scoped>

.category-logo {
  font-size: 150px;
  color: seagreen;
  transition: 1s;
}
</style>