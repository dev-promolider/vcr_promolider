<template>
  <div class="contenedor">
    <div class="cuadro1">
      <div class="cuadro1-1">
        <div class="perfil">
          <div class="imagen1">
            <img :src="photo" alt="" />
          </div>
          <div class="pais">
            <img class="icoban" src="../../assets/logo-bandera.svg" />
            <p>Lima,Peru</p>
          </div>
        </div>

        <div class="parrafos">
          <div class="p1">
            <p>{{ cuaDetalles }}</p>
          </div>
          <div class="p2">
            <p>{{ userUp.email }}</p>
          </div>
        </div>
      </div>

      <div class="cuadro1-2">
        <form class="formulario1-2" action="">
          <p>cambiar contraseña</p>
          <br />

          <input
            class="contraseña"
            type="text"
            required
            placeholder="contraseña"
          />
          <br />
          <br />
          <input
            class="contraseña"
            type="text"
            required
            placeholder="repetir contraseña"
          />
          <br />
          <br />

          <p>Si no quieres cambiar tu contraseña deja esto en blanco</p>
          <br />
          <br />
          <div class="botonguardar1">
            <input
              class="btn-custom"
              type="submit"
              value="Guardar"
              name=""
              id=""
            />
          </div>
        </form>
      </div>
    </div>

    <div class="cuadro2">
      <div class="cuadro2-1">
        <div class="imagen">
          <img :src="photo" alt="" />
          <div>
            <img class="lapiz" src="../../assets/logo-lapiz.svg" alt="" />
          </div>
        </div>

        <div class="data1">
          <div class="nombre">
            <img class="userico" src="../../assets/userico.svg" alt="" />

            <div class="nombresCompletos">
              <div class="bordeado"> <input v-model="userUp.name" type="text" required placeholder="Nombres"/>   </div>
              <div class="bordeado"> <input v-model="userUp.last_name" type="text" required placeholder="Apellidos" />   </div>
              
            </div>
          </div>

          <div class="region">
          
          
          <input type="text" required placeholder="Ciudad" />
            <!-- <select class="ciudadApi" > 
                <option value="" selected> Ciudad</option>
            </select>  -->



            <select class="paisApi" > 
                
                <option value="" selected >--seleccionar--</option>
                <option v-for="pais in namePais" :key="pais.common" value=""> {{pais.common}} </option>
            </select> 

          </div>
        </div>
      </div>
      <div class="data2">
        <input type="text" required placeholder="Genero" />
        <input v-model="userUp.date_birth" type="date" required placeholder="Fecha de nacimiento"
        />
      </div>
      <div class="biografia">
        <textarea v-model="userUp.biography"
          name=""
          id=""
          cols="30"
          rows="10"
          required  
          placeholder="Biografia"
        ></textarea>
      </div>
      <div class="botonguardar">
        <input 
          @click="userUpdate"
          class="btn-custom"
          type="submit"
          value="Guardar"
          name=""
          id=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "perfil",



  data() {
    return {
      photo: "",

      userUp: {
        email: " ",
        name: "",
        last_name: "",
        date_birth: "",
        id_country: "",
        biography:"",
      },

    cuaDetalles:"",

     pais:[],
     namePais:[],
      
    };
  },
  created() {
    this.userUp.last_name = localStorage.getItem("last_name_user");
    this.photo = localStorage.getItem("photo_user");
    this.userUp.date_birth = localStorage.getItem("date_birth_user");
    this.userUp.email = localStorage.getItem("email_user");
    this.userUp.name = localStorage.getItem("name_user");
    this.cuaDetalles= localStorage.getItem("name_user");
    this.userUp.biography= localStorage.getItem("biography_user");
    
    this.userUp.id_country = localStorage.getItem("id_country_user");
    this.obtenePaises();
  },
  methods: {
    userUpdate() {
      this.axios.post("/user/update",this.userUp).then((res) =>{
        console.log(res.status);
      }).catch((error)=>{
        console.log(error);
      })
    },
    
    
    async obtenePaises(){
      let url = 'https://restcountries.com/v3.1/all';
      const res = await fetch(url);
      const listPaises = await res.json();
      this.paises = listPaises;
      this.paises.forEach(pais => {
      this.namePais.push(pais.name);
      // console.log(this.namePais);

      console.log(pais.name.common == 'Peru'? pais.name.common : '');
      });
    }
  },
  mounted() {},
};
</script>



<style scope>
.contenedor {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 23px 89px 131px 92px;
  gap: 27px;
}
.cuadro1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 757px;
  background: #e5e5e5;
  gap: 30px;
}

.cuadro1-1 {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 328px;
  height: 231px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #97f18d;
  gap: 28px;
  padding: 47px 50px 45px 46px;
}
.perfil {
  display: flex;
  width: 88px;
  gap: 15px;
  flex-direction: column;
}
.pais {
  display: flex;
}
@media only screen and (max-width: 671px) {
}
.pais p {
  width: 100%;
  margin: 0;
  /* text-indent: 20px; */
  font-size: 11px;
  text-align: center;
}

.parrafos {
  display: flex;
  flex-direction: column;
  height: 84px;
}

.p1 p {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  text-align: left;
}
.p2 p {
  display: flex;
  font-size: 11px;
  text-align: left;
  flex-wrap: wrap;
}
.icoban {
  height: 18px;
  width: 18px;
}
.imagen1 {
  display: flex;
  width: 84px;
  height: 84px;
}
.imagen1 img {
  border-radius: 50%;
  width: 100%;
}
.cuadro1-2 {
  display: flex;
  flex-direction: column;
  width: 328px;
  height: 496px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #97f18d;
}

.cuadro2 {
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 624px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #97f18d;
  padding: 50px 60px;
  gap: 28px;
}
.formulario1-2 {
  width: 80%;
  margin: auto;
}
.formulario1-2 .contraseña {
  width: 100%;
  border-radius: 10px;
  background: #f7f7f7;
  border: none;
  height: 47px;
  text-indent: 20px;
}
.formulario1-2 p {
  text-align: start;
}
.botonguardar1, .botonguardar {
  text-align: center;
}
.cuadro2-1 {
  display: flex;
  width: 100%;
  height: 135px;
  gap: 20px;
}
.imagen {
  display: flex;
  position: relative;
  width: 134px;
  height: 134px;
}
.imagen img {
  border-radius: 50%;
}

.imagen div {
  display: flex;
  position: absolute;
  width: 24px;
  height: 24px;

  right: 0;
  bottom: 20px;
  border-radius: 50%;
}
.lapiz {
  width: 100%;
  height: 100%;
}

.data1 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 100%;
  gap: 15px;
}

.nombre {
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
  /* background: #da3636; */
  padding-left:5px;  /* */
  gap:10px;
  border-radius: 10px;
}

.userico {
  width: 24px;
  height: 24px;
}
.nombre input {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: #f7f7f7;
  text-indent:10px;   /* sirve para dar espacio entre el cuadro con la letra escrita (dentro) */
  /* gap: 20px; */
}



.nombresCompletos {
display:flex;
  width:100%;
  height: 100%; 
  gap: 15px;
}
.bordeado{
  width:50%;
  height: 100%;
}


/* .nombresCompletos input:focus{
  /* para quitar el fondo por defecto del input */
/* outline:none;
} */ 

.region {
  display: flex;
  width: 100%;
  gap: 20px;
  height: 50%;
}
.region input {
  width: 50%;
  border-radius: 10px;
  border: none;
  background: #f7f7f7;
  text-indent: 20px;
}

.paisApi {
  height: 100%;
width: 50%;
 border-radius: 10px;
 background: #f7f7f7;
 text-indent: 20px;
}
.ciudadApi{
   height: 100%;
width: 50%;
 border-radius: 10px;
 background: #f7f7f7;
 text-indent: 20px;
}

.data2 {
  display: flex;
  height: 53px;
  width: 100%;
  gap: 21px;
}
.data2 input {
  width: 50%;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: #f7f7f7;
  text-indent: 20px;
}
.biografia {
  width: 100%;
  height: 121px;
}

.biografia textarea {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: #f7f7f7;
  text-indent: 20px;
  padding: 2px;
}
.biografia textarea::placeholder {
  padding-top: 20px;
}

</style>