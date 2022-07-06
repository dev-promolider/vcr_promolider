<template>
   <v-container >
        <template v-if="!datos && !isLoadingGame" >
              <div class="h2 text-center">Not found</div>
        </template>

         <template v-if="datos === 'No hay datos'" >
              <div class="h2 text-center">No Hay Datos</div>
        </template>
       <template v-if="datos.game">

            <template v-if="datos.game.game_type === 'Ahorcado'">
                <AhorcadoDinamic :datos="datos"  />
            </template>
            <template v-else-if="datos.game.game_type === 'Pares de cartas'">
                <CardsDinamic  />
            </template>

       </template>

         <template >
            <div class="text-center" v-if="!datos  && isLoadingGame " >
                <v-progress-circular indeterminate color="dark" size="50">
                </v-progress-circular>
            </div>
         </template>
   </v-container>
</template>

<script>
import { mapActions } from 'vuex'

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
            isLoadingGame: true,
            datos: {
                detail:{},
                game:{}
            }
        }
    },
    methods:{
        ...mapActions('course', [ 'getDataDinamic' ]),

        async getDataActive(){
              this.isLoadingGame = true

              const { ok, data} = await this.getDataDinamic( +this.$route.params.id )
              
              if( !ok ) return 

              this.datos = data
              this.isLoadingGame = false
        },
       
    },
    created(){
        this.getDataActive()
    }
}
</script>

<style>

</style>