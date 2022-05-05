<template>
    <div class="welcome">
        <p class="m-0">Bienvenido a <b>Promolider</b></p>
        <div class="img-one"> 
            <img src="@/assets/welcome1.jpg" >
        </div>
        <div class="img-two">
            <img src="@/assets/welcome2.jpg" >
        </div>
    </div>
</template>
<script>
export default {
    name: 'FormWelcome',
    setup() {
        
    },
}
</script>
<style lang="scss" scoped>
    .welcome{
        background-color:#35424a;
        position: relative;
        width: 100%;
        height: 100%;
    }
    .welcome p{
        color: #fff;
        text-align: center;
        font-size: 36px;
    }
    .img-one, .img-two{
        position: absolute;
        width: 409px;
        height: 223px;
    }
    .img-one{
        left: 15%;
        top: 30%;
    }
    .img-two{
        right: 15%;
        bottom: 30%;
    }
    .img-one img{
        width: 409px;
        height: 223px;
    }
    .img-two img{
        width: 409px;
        height: 223px;
    }
</style>