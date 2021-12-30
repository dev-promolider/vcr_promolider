<template>
    <div>
       <div class="title-aula">
           <img src="../assets/logo-aula.png" >
        </div>
        <div>
            <ul class="nav ">
                <li class="nav-item" :class="{'is-active': isActive('/')}">
                    <router-link to="/" class="nav-link link-v" :class="{'is-active': isActive('/')}">
                        <img src="./../assets/home.svg" alt="">
                        Inicio
                    </router-link>
                </li>
                <li class="nav-item" :class="{'is-active': isActive('cursos')}">
                    <router-link to="cursos" class="nav-link link-v" :class="{'is-active': isActive('cursos')}">
                        <img src="./../assets/courses.svg" alt="">
                        Cursos
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/cursos" class="nav-link link-v">
                        <img src="./../assets/messange.svg" alt="">
                        Mensajes
                    </router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link link-v" href="#">
                        <img src="./../assets/sales.svg" alt="">
                        Ventas
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link link-v" href="#">
                        <img src="./../assets/estadisticas.svg" alt="">
                        Estadisitcas
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link link-v" href="#">
                        <img src="./../assets/roles-permisos.svg" alt="">
                        Roles y Permisos
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
     name: 'NavBarV',
     methods:{
         isActive(path){
            if(path === '/'){
                return this.$route.name === "Dashboard"
            }
             return this.$route.path.includes(path);
         },
     },
     mounted(){  
         console.log(this.$route)
     }
}
</script>
<style scope>
    
    :root{
        --text-size: 14px;
        --active-link: 2px solid #5cc151;
        --opcion-link: invert(0.5) sepia(5%) saturate(5162%) hue-rotate(64deg) brightness(96%) contrast(92%);
    }
    template{
        width: 100%;
        height: 100%;
    }
    .title-aula{
        display: flex;
        align-items: center;
        height: 104px;
        padding: 6px 0px 0px 18px;
    }
    .title-aula >img{
        width: 151px;
        height: 37px;
    }
    .nav{
        display: flex;
        flex-direction: column;
    }
    .nav-item{
        margin-bottom: 13px;
    }
    .link-v{
        font-size: var(--text-size);
        color: #fff;
        padding: 0;
    }
    .is-active{
        border-left: var(--active-link);
        filter: var(--opcion-link)
    }
    .link-v:hover{
        filter: var(--opcion-link);
    }
    .nav-link >img{
        width: 24px;
        height: 24px;
        margin-right: 20px;
    }

</style>
