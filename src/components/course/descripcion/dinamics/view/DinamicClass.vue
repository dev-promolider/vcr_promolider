<template>
   <v-container >

        <template v-if="id === 1">
              <AhorcadoDinamic  />
        </template>
        <template v-else-if="id === 2">
              <CardsDinamic />
        </template>
        <template v-if="!id && !isLoadingGame" >
              <div class="h2 text-center">Not found</div>
        </template>
       
         <template >
            <div class="text-center" v-if="!id  && isLoadingGame " >
                <v-progress-circular indeterminate color="success" size="50">

                </v-progress-circular>
            </div>
         </template>
   </v-container>
</template>

<script>
import AhorcadoDinamic  from '../components/Ahorcado/Ahorcado.vue'
import CardsDinamic  from '../components/CardsGame/CardsDinamic.vue'
export default {
    name: 'DinamicClass',
    components:{
        AhorcadoDinamic,
        CardsDinamic,
    },
    data(){
        return {
            id: +this.$route.params.id,
            isLoadingGame: true
        }
    },
}
</script>

<style>

</style>