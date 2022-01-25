<template>
            <div>
               <div class="contenedor-temario bg-white">    
                       <div class="row">
                           <div class="container">
                            <h5 class="ml-5 mt-4"><i class="fas fa-list-alt mr-2"></i>Temario</h5>
                           </div>
                        </div>

                        <div class="col temario">
                            <ul class="ml-5 mt-2" >
                                <li class="nav-temario" > <span v-b-toggle.collapse-1> <strong> 1. Edición</strong> </span>
                                    <b-collapse id="collapse-1">
                                    <ul >
                                        <li><input checked type="checkbox"><a href="#"  >Intro</a></li> 
                                        <li><input type="checkbox"><a href="#" >Importando Archivos</a></li>
                                        <li><input type="checkbox"><a href="#" >Editando archivos</a></li>  
                                        <li><input type="checkbox"><a href="#" >Importando audio</a></li>  
                                        <li><input type="checkbox"><a href="#" >Eliminando Sonidos</a></li>  
                                    </ul>
                                    </b-collapse>
                                </li>

                                <li class="nav-temario my-2" v-b-toggle.collapse-2> <strong>2. Renderizado</strong>
                                    <b-collapse id="collapse-2">
                                    <ul>
                                        <li><input type="checkbox"><a href="#" class="active">Intro</a></li> 
                                        <li><input type="checkbox"><a href="#" class="active">Importando Archivos</a></li>
                                        <li><input type="checkbox"><a href="#" class="active">Editando archivos</a></li>  
                                        <li><input type="checkbox"><a href="#" class="active">Importando audio</a></li>  
                                        <li><input type="checkbox"><a href="#" class="active">Eliminando Sonidos</a></li>  
                                    </ul>
                                    </b-collapse>
                                </li>
                                
                            </ul>
                            
                        </div>

                        <div class="row py-3 progressBar">
                            <div class="col-2">
                                <span class="ml-5">75%</span>
                            </div>
                            <div class="col-10">
                                <div class="progress mr-5 rounded-pill">
                                    <div class="progress-bar bg-secondary progress-bar-striped w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                 </div>
                            </div>
        
                        </div>
 
                   
               </div>
            </div> 
</template>

<script>
    
</script>

<style scoped>

    /*contenedor*/
    .contenedor-temario{
        width: 100%;
        height: 100%;
        border-radius: 15px;
        font-size: 12px ;
        margin: auto;
    }

    .temario{
        width: 100%;
        height: 330px;
        overflow-y: scroll ;
    }

    ul{
        font-size: 15px;
    }

    .temario::-webkit-scrollbar {
    display: none;
    }

    /* Lista de reproduccion */

    ul{
        list-style: none;
    }

    .nav-temario{
        transform: translateY(0%);
    }

    /* Linea vertical */
    .nav-temario ul::after{
        content: "";
        position: absolute;
        width: 2px;
        height: calc(100% - 50px);
        left: 20px;
        top: 12px;
        background: black;
        z-index: -1;
        margin-top: 29px;
    }

    .nav-temario ul li{
        padding: 12px 0;
    }

    .nav-temario ul li a {
        text-decoration: none;
        position: relative;
        color: black;
        font-size: 12px;
        line-height: 1rem;
        font-weight: 500;
        top: 8px;
    }

    /* Pintando el checkbox */
    input[type="checkbox"]{
        appearance: none;
        -webkit-appearance: none;
        position: absolute;
        height: 24px;
        width: 24px;
        left: 9px;
        border-radius:50% ;
        cursor: pointer;
        align-items: center;
        justify-content: center;
    }

    input[type="checkbox"]:after{
        font-family: "Font Awesome 5 Free";
        content: "\f058";
        color: black;
        font-size: 24px;
        background: white;
    }

    input[type="checkbox"]:checked{
        font-family: "Font Awesome 5 Free";
        content: "\f058";
        font-weight: 900;
        color: black;
        font-size: 24px;
    }

    /* Barra de progreso */
    .progressBar{
        font-size: 12px;
    }

</style>
