<template>
<div style="background: white; padding-top: 0 !important; height: 100%" >

    <div style="max-width: 1300px; margin: 0 auto; width: 85%" v-if="isLoadingSearchCourse">
            <h1 :class="[this.$vuetify.breakpoint.xs ? 'h6 font-weight-bold text-start pt-3 ml-3 pt-2' : 'h2 font-weight-bold pt-5']">{{6.762}} resultados para  "{{this.$route.query.q}}"</h1>
            
           <v-row class="mt-3" no-gutters>
               
                 <v-col  cols="auto" >
                     <v-btn color="dark" outlined height="49px" tile @click="showSlideFilter = !showSlideFilter">
                        <v-icon>
                            mdi-filter-variant
                        </v-icon>
                        Filtrar
                    </v-btn>
                   
                </v-col>
                <v-col  class="ml-2" md="2" >
                    <v-select
                        height="50px" 
                        large
                        dense
                        label="Ordenar por"
                        color="grey"
                        class="rounded-0"
                        v-model="select"
                        :items="items"
                        item-text="state"
                        persistent-hint
                        return-object
                        outlined
                    ></v-select>
                </v-col>
                 <v-col cols="auto" class="ml-auto pt-5" v-show="!this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm" >
                   <div class="subtitle">{{6.762}} resultados</div>
                </v-col>
            </v-row>
            <v-row class="mt-0" >
               
                <v-col v-if="showSlideFilter" class="slide-filter mt-2"  :class="[showSlideFilter ? 'expanded' : '']" sm="3" v-show="!this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm && !this.$vuetify.breakpoint.md">
                    <v-expansion-panels multiple accordion flat   >
                        <v-expansion-panel
                         style=" border-top: 1px solid #d1d7dc"
                        v-for="(item,i) in 5"
                        :key="i"
                        >
                        <v-expansion-panel-header class="font-weight-bold">
                            Tema
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row>
                                <v-col cols="12" >
                                    <v-checkbox 
                                        no-messages
                                        color="black"
                                        class="mt-0"
                                        v-model="checkbox"
                                        :label="`checkbox 1: ${checkbox.toString()}`"
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
                <v-col  sm="mr-auto" >
                     <v-card class="mb-2" v-for="i in 10" :key="i" elevation="0">
                        <v-row no-gutters>
                            <v-col sm="auto" cols="3">
                                <v-img class="m-2" src="https://cdn.vuetifyjs.com/images/cards/cooking.png" max-width="260px" max-height="145px" >
                                
                                </v-img>
                            </v-col>
                            <v-col sm="mr-auto">
                                <div class="m-1">

                                    <div class="font-weight-bold" :class="[$vuetify.breakpoint.xs && 'text-mobile' ]">Diseño Web Desde Cero a Avanzado 45h Curso COMPLETO</div>
                               
                                    <div class="caption" v-if="!$vuetify.breakpoint.xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos maiores est nostrum vero earum ducimus perferendis.</div>
                               
                                    <div class="text--secondary" :class="[$vuetify.breakpoint.xs ? 'text-mobile': 'caption' ]" >Administrator</div>

                                    <div class="d-flex align-center">
                                        <div class="font-weight-bold" :class="[$vuetify.breakpoint.xs ? 'text-mobile' : 'subtitle-1']" style="color: #b4690e">4.7</div>
                                        <v-rating
                                        readonly
                                        dense
                                        :size="$vuetify.breakpoint.xs  ? '10' : '13'"
                                        color="yellow darken-3"
                                        background-color="grey darken-1"
                                        half-increments
                                        v-model="raiting"
                                        ></v-rating>
                                    </div>
                                    <div class="d-flex">
                                        <div class="text--secondary" :class="[$vuetify.breakpoint.xs ? 'text-mobile' : 'caption' ]" >79 horas totales - 800 clases - Principante </div>
                                    </div>
                                    <div class="text-start d-flex"  v-if="$vuetify.breakpoint.xs">
                                        <div class="font-weight-bold mr-1 " :class="[$vuetify.breakpoint.xs && 'text-mobile' ]">S/.47.00</div>
                                        <div class="text-decoration-line-through text--secondary" :class="[$vuetify.breakpoint.xs ? 'text-mobile' : 'caption' ]">S/.299.99</div>
                                    </div>
                                </div>
                            </v-col>
                            <v-col sm="mr-auto" cols="2" v-if="!$vuetify.breakpoint.xs">
                                <div class="ma-2 text-end">
                                    <div class="font-weight-bold" :class="[$vuetify.breakpoint.xs && 'text-mobile' ]">S/.47.00</div>
                                    <div class="text-decoration-line-through text--secondary" :class="[$vuetify.breakpoint.xs ? 'text-mobile' : 'caption' ]">S/.299.99</div>
                                </div>
                            </v-col>
                        </v-row>
                     <v-divider></v-divider>
                     </v-card>
                </v-col>
                <v-overlay
                    :value="overlay"
                    color="white"
                    opacity="0.3"
                    z-index="9"
                >
                <v-progress-circular color="green" indeterminate size="64"></v-progress-circular>
                </v-overlay>
            </v-row>
            <div class="text-center py-5">
                <v-pagination
                circle
                v-model="page"
                :length="15"
                :total-visible="5"
                color="green"
                ></v-pagination>
            </div>
           
    </div>
    <div class="text-center pt-5" style="height: 90vh" v-else>
        <v-progress-circular color="green" indeterminate size="80">

        </v-progress-circular>
    </div>
    
</div>

</template>

<script>
export default {
    data(){
        return {
            showSlideFilter: false,
            checkbox: false,
            select: { state: 'Mas relevantes'},
            items: [
                { state: 'Mas relevantes' },
                { state: 'Los más comentados' },
                { state: 'Mejor valorados'},
                { state: 'Más recientes' },
            ],
            page: 1,
            raiting: 3.5,
            overlay: false,
            isLoadingSearchCourse: false
        }
    },
    mounted(){
        this.redirectHome()
        setTimeout(() => {
            this.isLoadingSearchCourse = true
        }, 2000)
    },
    methods:{
        redirectHome(){
            if( !this.$route.query.q ){
                this.$router.push({name: 'home'})
            }

        }
    },
    destroyed(){
        clearTimeout()
    }
    
}
</script>

<style scoped>
    .text-mobile{
        font-size: 10px;
    }
     .slide-filter{
        overflow-x: hidden;
        width: 0px;
        transition: width 0.4s linear;
    }
    .slide-filter.expanded{
        width: 300px;
    }
</style>