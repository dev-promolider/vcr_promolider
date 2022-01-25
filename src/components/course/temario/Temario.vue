<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                Acá va el video
            </div>

            <div class="col-md-4" >
               <div class="contenedor-temario bg-white my-2">    
                       <div class="row">
                           <div class="container">
                            <h5 class="ml-5 mt-4"><i class="fas fa-list-alt mr-2"></i>Temario</h5>
                           </div>
                        </div>

                        <div class="row temario">
                            <ul class="ml-5 mt-2" >
                                <li class="nav-temario"><strong> 1. Edición</strong>
                                    <ul>
                                        <li><input type="checkbox"><a href="#" class="active">Intro</a></li> 
                                        <li><input type="checkbox"><a href="#" class="active">Importando Archivos</a></li>
                                        <li><input type="checkbox"><a href="#" class="active">Editando archivos</a></li>  
                                        <li><input type="checkbox"><a href="#" class="active">Importando audio</a></li>  
                                        <li><input type="checkbox"><a href="#" class="active">Elimnado Sonidos</a></li>  
                                    </ul>
                                </li>
                            </ul>
                            <ul class="ml-5 mt-2" >
                                <li class="nav-temario"> 1. Edición
                                    <ul>
                                        <li><input type="checkbox"><a href="#" class="active">Intro</a></li> 
                                        <li><input type="checkbox"><a href="#" class="active">Importando Archivos</a></li>
                                        <li><input type="checkbox"><a href="#" class="active">Editando archivos</a></li>  
                                        <li><input type="checkbox"><a href="#" class="active">Importando audio</a></li>  
                                        <li><input type="checkbox"><a href="#" class="active">Elimnado Sonidos</a></li>  
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div class="row pt-3">
                            <div class="col-md-3">
                                <h5 class="ml-5">75%</h5>
                            </div>
                            <div class="col-md-9">
                                <div class="progress mr-5 rounded-pill">
                                    <div class="progress-bar bg-secondary progress-bar-striped w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                 </div>
                            </div>
        
                        </div>
 
                   
               </div>
            </div>

        </div>
    </div>    
</template>

<script>
    export default {
    data() {
      return {
        selected: [], // Must be an array reference!
        options: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' }
        ]
      }
    }
  }
</script>

<style scoped>

    /*contenedor*/
    .contenedor-temario{
        width: 379px;
        height: 451px;
        border-radius: 15px;
        font-size: 12px ;
    }

    .temario{
        width: 379px;
        height: 350px;
        overflow-y: scroll ;
    }

    ul{
        font-size: 14px;
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

    input[type="checkbox"]:checked:after{
        font-family: "Font Awesome 5 Free";
        content: "\f058";
        font-weight: 900;
        color: black;
        font-size: 24px;
        background: white;
    }
   
</style>
