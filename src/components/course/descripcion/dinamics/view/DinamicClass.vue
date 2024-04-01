<template>
    <v-container fluid class="fill-height ma-0 pa-0">
        <template v-if="!datos && !isLoadingGame">
            <div class="h2 text-center">Not found</div>
        </template>

        <template v-if="datos === 'No hay datos'">
            <div class="h2 text-center">No Hay Datos</div>
        </template>
        <template v-if="datos.game">
            <v-container fluid class="fill-height" style="min-height: 100vh;">
                <v-row>
                    <v-col class="col-games" cols="12" xl="7">
                        <div class="aux-game">
                            <h1 style="font-weight: bold; font-size: 40px;">{{ datos.game.title }}</h1>
                            <template v-if="datos.game.game_type === 'Ahorcado'">
                                <AhorcadoDinamic :datos="datos" />
                                <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                                    quisquam deserunt earum
                                    facere dignissimos deleniti eaque distinctio expedita, consectetur similique
                                    perferendis
                                    mollitia illo quam odit et adipisci in! Corrupti, similique!</p>
                            </template>
                            <template v-else-if="datos.game.game_type === 'Pares de cartas'">
                                <CardsDinamic />
                                <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                                    quisquam deserunt earum
                                    facere dignissimos deleniti eaque distinctio expedita, consectetur similique
                                    perferendis
                                    mollitia illo quam odit et adipisci in! Corrupti, similique!</p>
                            </template>
                            <template v-else-if="datos.game.game_type === 'Búho'">
                                <pruebaJuego :data="datos" />
                                <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                                    quisquam deserunt earum
                                    facere dignissimos deleniti eaque distinctio expedita, consectetur similique
                                    perferendis
                                    mollitia illo quam odit et adipisci in! Corrupti, similique!</p>
                            </template>
                            <template v-else-if="datos.game.game_type === 'Word Wheel'">
                                <WordWheel :data="datos" />
                                <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                                    quisquam deserunt earum
                                    facere dignissimos deleniti eaque distinctio expedita, consectetur similique
                                    perferendis
                                    mollitia illo quam odit et adipisci in! Corrupti, similique!</p>
                            </template>
                        </div>
                        <div v-if="isSmallScreen" class="aux-ranking">
                                                    <Ranking></Ranking>
                                                </div>
                        <div  v-else class="aux-comment">
                            <Comentarios></Comentarios>
                        </div>
                        
                    </v-col>
                    <v-col class="col-rank" cols="12" xl="5" >

                        <div  v-if="isSmallScreen" class="aux-comment">
                            <Comentarios></Comentarios>
                        </div>
                        <div v-else class="aux-ranking">
                            <Ranking></Ranking>
                        </div>

                    </v-col>
                    <!-- <v-col class="col-comment" cols="12" xl="7" order-sm="3">
                        

                    </v-col> -->
                </v-row>
            </v-container>




        </template>

        <template>
            <div class="text-center" v-if="!datos && isLoadingGame">
                <v-progress-circular indeterminate color="dark" size="50">
                </v-progress-circular>
            </div>
        </template>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import CommentsDynamic from "@/components/ComentariosDinamica/CommentsDynamic";
import AhorcadoDinamic from '../components/Ahorcado/Ahorcado.vue'
import CardsDinamic from '../components/CardsGame/CardsDinamic.vue'
import pruebaJuego from '../../../../../views/content/pruebaJuego.vue';
import Ranking from '../../../../Ranking/Ranking.vue';
import WordWheel from '../components/WordWheel/WordWheel.vue';

export default {
    name: 'DinamicClass',
    components: {
        AhorcadoDinamic,
        CardsDinamic,
        pruebaJuego,
        Comentarios: CommentsDynamic,
        Ranking,
        WordWheel
    },
    data() {
        return {
            isLoadingGame: true,
            datos: {
                detail: {},
                game: {}
            },
            windowWidth: window.innerWidth
        }
    },
    computed: {
    isSmallScreen() {
      return this.windowWidth < 1200;
    }
  },
    methods: {
        ...mapActions('course', ['getDataDinamic']),

        async getDataActive() {
            this.isLoadingGame = true

            const { ok, data } = await this.getDataDinamic(+this.$route.params.id)
            if (!ok) return
            this.datos = data
            this.isLoadingGame = false
        },

    },
    created() {
        this.getDataActive()
    }
}
</script>

<style scoped>
.container {
    padding: 40px;
    max-width: none !important;
}
h1{
    margin: 0 !important;
}
.description {
    font-weight: 400;
    font-size: 20px;
}
.col-games,.col-rank,.col-comment{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
}
.aux-game {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 95%;
    min-height: 32vw;
}
.aux-comment{
    width: 95%;
}
.aux-ranking{
    width: 95%;
}



</style>