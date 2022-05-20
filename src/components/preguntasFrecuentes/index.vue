<template>
    <div class="container d-flex justify-content-center mt-5"> 
        <div class="col-md-7 col-sm-12 col-lg-6">
            <h1 class="text-center mb-4 ">Preguntas frecuentes</h1>
            <ul class="list-group list-unstyled" >
                <li class="item-question px-5 py-4" v-for="(item,index) in preguntas" :key="index">
                    <div class="d-flex justify-content-between cursor-pointer" v-b-toggle="item.pregunta.replace(/ /g, '')" @click="rotate === index ? rotate = null: rotate =index" >
                        <h5 class="font-weight-bolder">  {{item.pregunta}}</h5>
                        <button :class="['btn-plus',{ 'btn-plus-rotate' : rotate === index}]"><i class="fas fa-plus text-right"></i></button>
                    </div>
                    <b-collapse :id="item.pregunta.replace(/ /g, '')" class="mt-3" accordion="my-accordion">
                        <p class="text-left">{{item.respuesta}}</p>
                    </b-collapse>
                </li>
            </ul>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'preguntas-frecuentes',
    data(){
        return{
            preguntas:[
                {
                    pregunta: 'How long will this promo last?',
                    respuesta: 'This limited-time promo will be available only from Thursday, May 5 at 00:00 UTC to Thursday, July 1 at 14:00 UTC.'
                },
                {
                    pregunta: 'How to top up assets to my Nexo account?',
                    respuesta: 'Buy digital assets directly with your credit or debit card – our easiest and fastest option!'
                },
                {
                    pregunta: 'When will I get my $100 welcome bonus?',
                    respuesta: 'You will get your $100 reward within 30 days of passing Identity Verification and topping up the equivalent of $1,500 or more of any asset supported on the Nexo platform.'
                },
                {
                    pregunta: 'How to get the additional bonus of $50 in BTC?',
                    respuesta: 'Want to earn even more? Simply swap at least $1,500 on the Nexo Exchange during the 30-day hold period and get an additional $50 in BTC.'
                },
            ],
            rotate:null
        }
    }
}
</script>

<style scoped>
.item-question{
    border-bottom: 1px solid rgba(29, 29, 29, 0.102);
}
.btn-plus{
    font-size: 15px;
    color: green;
    transition: 1s;  
}
.btn-plus-rotate{
    transform: rotate(137deg);
    transition: 1s;
}
</style>