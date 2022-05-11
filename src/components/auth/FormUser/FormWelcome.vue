<template>
    <div class="welcome">
        <img src="https://promolider.org/sistema/images/5.jpg" height="852px" width="870px">
       
        <transition name="fade" >
            <div class="welcome-text mx-5" v-if="show" >
                Bienvenido a <span>Promolíder</span>
                <transition name="fade" >
                    <div class="paragraph-welcome" v-if="showName">Por favor inicie sesión en su cuenta y comience la aventura.</div>
                </transition>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'FormWelcome',
    data() {
        return{
            show: false,
            showName: false
        }
    },
    methods:{
        fadeMe() {
           setTimeout(() => {
               this.show = !this.show
               setTimeout(()=> {
                   this.showName = !this.showName
               }, 500)
           }, 450);
        },
    },
    created(){
        this.fadeMe()
    },
}
</script>
<style lang="scss" scoped>
    .welcome{
      position: relative;
      display: block;
    }
    .welcome img{
        object-fit: cover;
        width: 100%;
        height: 100vh;
    }
   
    .welcome-text{
        font-size: 65px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 300px auto;    
        text-align: center;
        color: white;
    }
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 1.5s
    }

    .fade-enter,
    .fade-leave-to
    {
    opacity: 0
    }
    .paragraph-welcome{
        font-size: 20px;
    }
    @media (max-width: 783px) {
        .welcome-text{
                font-size: 56px;
        }
    }
   
</style>