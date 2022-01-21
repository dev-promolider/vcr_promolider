<template>
  <div class="contenedor">


    <div class="cuadro1">
      <div class="cuadro1-1">
          <p>jesus galvez</p>

      </div>

      <div class="cuadro1-2"> 

    

          <form class="formulario1-2" action="">
             <p>cambiar contraseña</p>
          <br> 

          <input class="contraseña" type="text" required  placeholder="contraseña">
          <br>
          <br>
           <input class="contraseña" type="text" required  placeholder="repetir contraseña">
           <br>
           <br>
          
           <p>Si no quieres cambiar tu contraseña deja esto en blanco</p>
           <br>
           <br>
           
           <input class="boton1-2" type="submit" value="Guardar" name="" id="">
          </form>
      </div>
    </div>

    <div class="cuadro2">
        <div class="cuadro2-1">
            <div class="imagen">
                <img src="../../assets/logo-perfil.png" alt="">
            
            </div>

            <div class="data1">
                 <div class="nombre">
                     
                    <input type="text" required placeholder="Nombre completo"> 
                      </div>

                 <div class="region">
                     <input type="text" required placeholder="Ciudad">
                     <input type="text" required placeholder="Pais">
                      </div>

            </div>
        </div>
     </div>
  
  
  
  </div>
</template>

<script>
export default {};
</script>

<style scope>

.contenedor{
    display: flex;
    width: 100%;
    height:100% ;
    padding:10px 67px;
    gap:15px;
}
 .cuadro1 {
     display: flex;
flex-direction:column;
width: 30%;
height:100% ;
background: #E5E5E5;
gap: 15px;

 }

 .cuadro1-1{
  height:30%;
  background: #fff;
 border-radius:10px;
 border: 1px solid #97F18D;
 }
 .cuadro1-2{
     display:flex;
     flex-direction: column;
     

  height:50%;
  background: #fff;
  border-radius:10px;
  border: 1px solid #97F18D;
  
 }


.cuadro2{
    display: flex;
    flex-direction: column;
width: 70%;
height:60% ;
background-color: white;
border-radius:10px;
border: 1px solid #97F18D;
padding:60px 50px ;
}
.formulario1-2{
  
    width: 80%;
    margin:auto;
  
}
.formulario1-2 .contraseña{
    width: 100%;
    border-radius:10px;
   background: #F7F7F7;
   border: none;
   height: 47px;
   text-indent: 20px;
}
.formulario1-2 p{
    text-align: start;
}
.boton1-2{
    background-color:#97F18D;
    border-radius:10px;
    border: none;
   height: 47px;
   width: 100%;
   color: #fff;
   
}
.cuadro2-1{
    display: flex;
    width: 100%;
    height: 135px;

    
}
.imagen{
    display: flex;
width:134px;
height:134px;

}
.imagen img{
   border-radius:50%; 

}

.data1{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    gap: 15px; 
       

}
.nombre{
    width:100% ;
    height: 50%;
    
}
.nombre input{
  width:100% ; 
  height: 100%; 
border-radius: 10px;
border: none;
background: #F7F7F7;
text-indent: 20px;
}
.region{
    display: flex;
    width:100% ;
    gap:  20px;
    height: 50%;


}
.region input{
width:50% ;
border-radius: 10px;
border: none;
background: #F7F7F7;
text-indent: 20px;
}

.data2{
    display: flex;
}
</style>