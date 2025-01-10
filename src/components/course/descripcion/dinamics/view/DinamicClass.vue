<template>
    <v-container fluid class="fill-height ma-0 pa-0" style="background-color: #f2f5fa">
        <template v-if="!datos && !isLoadingGame">
            <div class="h2 text-center">Not found</div>
        </template>

        <template v-if="datos === 'No hay datos'">
            <div class="h2 text-center">No Hay Datos</div>
        </template>
        <template v-if="datos.game">
            <v-container fluid class="fill-height" style="min-height: 100vh">
                <v-row>
                    <v-col class="col-games" cols="12" xl="7">
                        <div class="aux-game">
                            <h1 style="font-weight: bold; font-size: 40px">
                                {{ datos.game.title }}
                            </h1>
                            <template v-if="datos.game.game_type === 'Ahorcado'">
                                <AhorcadoDinamic :datos="datos" />
                                <div class="game-instructions">
                                    <h3>Instrucciones para jugar Ahorcado</h3>

                                    <ol>
                                        <li>
                                            <strong>Objetivo del juego</strong>
                                            <ul>
                                                <li>
                                                    Adivina la palabra completa antes de cometer 5
                                                    errores.
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            <strong>Cómo jugar</strong>
                                            <ul>
                                                <li>
                                                    Se te presenta una palabra oculta representada por
                                                    espacios en blanco.
                                                </li>
                                                <li>
                                                    Una pista te ayudará a identificar de qué palabra se
                                                    trata.
                                                </li>
                                                <li>
                                                    Usa el teclado en pantalla para seleccionar letras.
                                                </li>
                                                <li>
                                                    Cada letra correcta se revelará en su posición
                                                    correspondiente.
                                                </li>
                                                <li>Cada letra incorrecta cuenta como un error.</li>
                                            </ul>
                                        </li>

                                        <li>
                                            <strong>Reglas</strong>
                                            <ul>
                                                <li>
                                                    Tienes 5 intentos para equivocarte antes de perder el
                                                    juego.
                                                </li>
                                                <li>Las letras se marcan en verde si son correctas.</li>
                                                <li>
                                                    Las letras se marcan en rojo si son incorrectas.
                                                </li>
                                                <li>
                                                    Los botones de letras ya utilizadas se desactivan.
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            <strong>Estrategia</strong>
                                            <ul>
                                                <li>Presta atención a la pista proporcionada.</li>
                                                <li>Comienza seleccionando las vocales.</li>
                                                <li>
                                                    Piensa en palabras que coincidan con la pista y la
                                                    longitud.
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            <strong>Ganar o Perder</strong>
                                            <ul>
                                                <li>
                                                    Ganas si adivinas la palabra completa antes de cometer
                                                    5 errores.
                                                </li>
                                                <li>
                                                    Pierdes si cometes 5 errores sin adivinar la palabra.
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            <strong>Puntuación</strong>
                                            <ul>
                                                <li>Ganar el juego te otorga 10 puntos.</li>
                                                <li>Perder el juego te otorga 0 puntos.</li>
                                            </ul>
                                        </li>
                                    </ol>

                                    <p class="tip">
                                        <strong>Consejo:</strong> ¡Mantén la calma, piensa bien y
                                        diviértete!
                                    </p>
                                </div>
                            </template>
                            <template v-else-if="datos.game.game_type === 'Pares de cartas'">
                                <CardsDinamic />
                                <section class="objective">
                                    <h3>Objetivo del Juego</h3>
                                    <ul>
                                        <li>Encontrar todos los pares de cartas coincidentes</li>
                                        <li>
                                            Completar el juego con la menor cantidad de turnos posible
                                        </li>
                                    </ul>
                                </section>

                                <section class="game-rules">
                                    <h3>Reglas del Juego</h3>
                                    <ol>
                                        <li>
                                            <strong>Preparación</strong>
                                            <ul>
                                                <li>
                                                    Al cargar el juego, verás una cuadrícula de cartas
                                                    boca abajo
                                                </li>
                                                <li>
                                                    Las cartas están distribuidas en parejas, pero
                                                    mezcladas aleatoriamente
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            <strong>Inicio del Juego</strong>
                                            <ul>
                                                <li>Haz clic en el botón "Empezar" para comenzar</li>
                                                <li>El tiempo y los turnos comenzarán a contarse</li>
                                            </ul>
                                        </li>

                                        <li>
                                            <strong>Selección de Cartas</strong>
                                            <ul>
                                                <li>Haz clic en una carta para voltearla</li>
                                                <li>
                                                    Selecciona una segunda carta para intentar encontrar
                                                    su par
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            <strong>Coincidencia de Cartas</strong>
                                            <ul>
                                                <li>
                                                    Si las cartas volteadas son iguales, se quedarán
                                                    visibles
                                                </li>
                                                <li>
                                                    Si son diferentes, se volverán a voltear después de
                                                    unos segundos
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            <strong>Puntuación</strong>
                                            <ul>
                                                <li>Cada intento cuenta como un turno</li>
                                                <li>
                                                    El objetivo es completar el juego con la menor
                                                    cantidad de turnos
                                                </li>
                                                <li>Ganarás 10 puntos al completar el juego</li>
                                            </ul>
                                        </li>
                                    </ol>
                                </section>

                                <section class="game-controls">
                                    <h3>Controles</h3>
                                    <ul>
                                        <li>
                                            <strong>Empezar</strong>: Inicia el juego y comienza a
                                            contar el tiempo
                                        </li>
                                        <li>
                                            <strong>Reiniciar</strong>: Reinicia el juego, mezclando
                                            todas las cartas nuevamente
                                        </li>
                                    </ul>
                                </section>

                                <section class="tips">
                                    <h3>Consejos</h3>
                                    <ul>
                                        <li>
                                            Presta atención a la posición de las cartas cada vez que
                                            las voltees
                                        </li>
                                        <li>
                                            Intenta memorizar la ubicación de las cartas que ya has
                                            visto
                                        </li>
                                        <li>
                                            Concentración y memoria son clave para ganar rápidamente
                                        </li>
                                    </ul>
                                </section>
                            </template>
                            <template v-else-if="datos.game.game_type === 'Búho'">
                                <pruebaJuego :data="datos" />
                                <div class="game-instructions">
                                    <h3>Instrucciones para jugar Búho</h3>
                                    <ul>
                                        <li>
                                            <strong>Objetivo:</strong> Responde correctamente el mayor
                                            número de preguntas para ganar puntos.
                                        </li>
                                        <li>
                                            <strong>Cómo jugar:</strong>
                                            <ul>
                                                <li>Lee la pregunta que aparece en pantalla.</li>
                                                <li>
                                                    Selecciona la respuesta correcta entre las cuatro
                                                    opciones proporcionadas.
                                                </li>
                                                <li>
                                                    Recibirás retroalimentación inmediata indicando si tu
                                                    respuesta fue correcta o incorrecta.
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <strong>Puntuación:</strong>
                                            <ul>
                                                <li>Recibes 10 puntos por cada respuesta correcta.</li>
                                                <li>
                                                    No se otorgan puntos por respuestas incorrectas.
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <strong>Finalización:</strong> El juego termina cuando se
                                            hayan respondido todas las preguntas o se acabe el tiempo
                                            (si aplica).
                                        </li>
                                    </ul>
                                    <p class="tip">
                                        <strong>Consejo:</strong> ¡Piensa rápido, pero no apresures
                                        tus respuestas!
                                    </p>
                                </div>
                            </template>

                            <template v-else-if="datos.game.game_type === 'Word Wheel'">
                                <WordWheel :data="datos" />
                                <p class="description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                                    quisquam deserunt earum facere dignissimos deleniti eaque
                                    distinctio expedita, consectetur similique perferendis
                                    mollitia illo quam odit et adipisci in! Corrupti, similique!
                                </p>
                            </template>
                        </div>
                    </v-col>
                    <v-col class="col-rank" cols="12" xl="5">
                        <div class="aux-ranking">
                            <Ranking></Ranking>
                        </div>
                        <div class="aux-comment">
                            <Comentarios></Comentarios>
                        </div>
                    </v-col>
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
import { mapActions } from "vuex";
import CommentsDynamic from "@/components/ComentariosDinamica/CommentsDynamic";
import AhorcadoDinamic from "../components/Ahorcado/Ahorcado.vue";
import CardsDinamic from "../components/CardsGame/CardsDinamic.vue";
import pruebaJuego from "../../../../../views/content/pruebaJuego.vue";
import Ranking from "../../../../Ranking/Ranking.vue";
import WordWheel from "../components/WordWheel/WordWheel.vue";

export default {
    name: "DinamicClass",
    components: {
        AhorcadoDinamic,
        CardsDinamic,
        pruebaJuego,
        Comentarios: CommentsDynamic,
        Ranking,
        WordWheel,
    },
    data() {
        return {
            isLoadingGame: true,
            datos: {
                detail: {},
                game: {},
            },
            windowWidth: window.innerWidth,
        };
    },
    computed: {
        isSmallScreen() {
            return this.windowWidth < 1200;
        },
    },
    methods: {
        ...mapActions("course", ["getDataDinamic"]),

        async getDataActive() {
            this.isLoadingGame = true;

            const { ok, data } = await this.getDataDinamic(+this.$route.params.id);
            if (!ok) return;
            this.datos = data;
            this.isLoadingGame = false;
        },
    },
    created() {
        this.getDataActive();
    },
};
</script>

<style scoped>
.container {
    padding: 40px;
    max-width: none !important;
}

h1 {
    margin: 0 !important;
}

.description {
    font-weight: 400;
    font-size: 20px;
}

.col-games,
.col-rank,
.col-comment {
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
}

.aux-comment {
    width: 95%;
}

.aux-ranking {
    width: 95%;
}
</style>
