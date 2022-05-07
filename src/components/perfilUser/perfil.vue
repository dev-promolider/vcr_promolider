<template>
  <div class="contenedor text-capitalize">
    <div class="cuadro1 bg-white shadow bg-body rounded " >
     
      <div class="parrafos ">
        <div class="img1 ">
          <img src="../../assets/logo-perfil.png" alt=""  class="imagen1 "/>
        </div>
        <div class="p1">
          <p class="text-dark ">{{ userUp.name }}</p>
        </div>
        <div class="p2">
          <p class="text-dark">{{ userUp.email }}</p>
        </div>
      </div>
      <div class="perfil">
        <p class="text-dark "><strong> Rol de usuario:</strong> {{ userUp.rol }}</p>
        <p class="text-dark "><strong>Plan actual:</strong> {{ userUp.plan }}</p>
        <div class="pais">
          <p class="text-dark text-center">Lima,Peru
            <img class="icoban" src="../../assets/logo-bandera.svg" />
          </p>
        </div>
      </div>

    </div>

    <div class="cuadro2 bg-white shadow p-3 mb-5 bg-body rounded text-center">
      <form class="formulario1-2  " action="">
        <p class=" parrafo text-dark my-5" >cambiar contraseña</p>
        <!-- style="font-family: Arial black" -->
        <input
          class="contraseña my-4 col-10 bg-light border border-white"
          type="text"
          required
          placeholder="contraseña"
        />

        <input
          class="contraseña my-4 col-10 bg-light border border-white"
          type="text"
          required
          placeholder="repetir contraseña"
        />

        <div class="botonguardar1">
          <input
            class="btn-custom col-5 mt-5"
            type="submit"
            value="Guardar"
            name=""
            id=""
          />
        </div>
      </form>
    </div>

    <div class="cuadro3 bg-white shadow p-3 mb-5 bg-body rounded text-center">

      <div class="cuadro2-1 mt-5">

        <div class="img2">
          <img src="../../assets/logo-perfil.png" alt="" class="imagen2" />
          <div>
            <img class="lapiz m-2" src="../../assets/logo-lapiz.svg" alt="" />
          </div>
        </div>

        
          <div class="nombre mt-5">

            <div class="icon-user ">
                <img
                  class="userico "
                  src="../../assets/userico.svg"
                  alt=""
                />
              </div>

            <div class=" ">
                <input
                  class="bg-light border border-white rounded text-center"
                  v-model="userUp.name"
                  type="text"
                  required
                  placeholder="Nombres"
                />

                <input
                  class="bg-light border border-white rounded text-center"
                  v-model="userUp.last_name"
                  type="text"
                  required
                  placeholder="Apellidos"
                />
            </div>
          </div>

          <div class="region my-4">
            <input
              class=" bg-light border border-white rounded col-5 mr-2"
              type="text"
              required
              placeholder="Ciudad"
              v-model="userUp.city"
            />
            <!-- <select class="ciudadApi" > 
                <option value="" selected> Ciudad</option>
            </select>  -->

            <select
              class="paisApi bg-light  rounded p-2 col-5 ml-2"
              v-model="userUp.country"
            >
              <option value="" selected></option>
              <option v-for="pais in namePais" :key="pais.common">
                {{ pais.common }}
              </option>
            </select>
          </div>
        
      </div>


      <div class="data2 my-4">
        <input
          class="mx-2 col-4 bg-light border border-white p-2"
          type="text"
          required
          placeholder="Genero"
          disabled
        />
        <input
          class="mx-2 col-6 bg-light border border-white rounded p-2"
          v-model="userUp.date_birth"
          type="date"
          required
          placeholder="Fecha de nacimiento"
        />
      </div>

      <div class="biografia my-5">
        <textarea
          class="col-10 bg-light border border-white rounded"
          v-model="userUp.biography"
          name=""
          id=""
          required
          placeholder="Biografia"
          style="height: 100px"
        ></textarea>
      </div>
      <div class="botonguardar mt-5">
        <input
          @click="userUpdate"
          class="btn-custom col-4"
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
import { mapState } from "vuex";

export default {
  name: "perfil",

  data() {
    return {
      photo: "",

      userUp: {
        email: "",
        name: localStorage.getItem("name_user"),
        last_name: localStorage.getItem("last_name_user"),
        date_birth: localStorage.getItem("date_birth_user"),
        country: localStorage.getItem("country_user"),
        biography: localStorage.getItem("biography_user"),
        city: localStorage.getItem("city"),
        rol: "",
        plan: ""
      },

      cuaDetalles: "",

      pais: [],
      namePais: [],
      
    };
  },
  created() {
    //this.userUp.last_name = localStorage.getItem("last_name_user");
    this.photo = localStorage.getItem("photo_user");
    //this.userUp.date_birth = localStorage.getItem("date_birth_user");
    this.userUp.email = localStorage.getItem("email_user");
    //this.userUp.name = localStorage.getItem("name_user");
    this.cuaDetalles = localStorage.getItem("name_user");
    //this.userUp.biography= localStorage.getItem("biography_user");
    //this.userUp.city= localStorage.getItem("city");

    //this.userUp.country = localStorage.getItem("country_user");
    this.obtenePaises();
    this.userAccountType()
  
  },
  computed: {
    ...mapState("user", ["id_user"]),
  },
  methods: {
    userUpdate() {
      this.axios
        .post("/user/update", this.userUp)
        .then(() => {
          // console.log(res);
        })
        .catch(() => {
          //console.log(error);
        });

      this.axios
        .get(`/user/show?id=${localStorage.getItem("id_user")}`)
        .then((res) => {
          localStorage.setItem("name_user", res.data.name);
          localStorage.setItem("last_name_user", res.data.last_name);
          localStorage.setItem("date_birth_user", res.data.date_birth);
          localStorage.setItem("country_user", res.data.country);
          localStorage.setItem("biography_user", res.data.biography);
          localStorage.setItem("city", res.data.city);
        });
    },

    async obtenePaises() {
      let url = "https://restcountries.com/v3.1/all";
      const res = await fetch(url);
      const listPaises = await res.json();
      this.paises = listPaises;
      this.paises.forEach((pais) => {
        this.namePais.push(pais.name);
        // console.log(this.namePais);

        //console.log(pais.name.common == 'Peru'? pais.name.common : '');
      });
    },


    userAccountType(){
      this.axios.get("dashboard/getattributes").then((r) => {
        const rs = r.data.data;
        this.userUp.plan = rs.accountType;
        this.userUp.rol = rs.role;
      })
    }
  },
  mounted() {},
};
</script>



<style scope>
.contenedor {
  width: 100%;
  height: 100%;
  padding: 20px 20px 20px 20px;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, minmax(min(100%, 15rem), 1fr));
}

.cuadro1 {
  
  grid-column: 1/2;
  grid-row: 1/2;
  display: grid;
  grid-template-rows: (2, 1fr);
}

.cuadro2 {
  grid-column: 1/2;
  grid-row: 2/4;
}

.cuadro3 {
  grid-column: 2/4;
  grid-row: 1/4;
}

.parrafos {
  overflow:hidden;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  
  
}

.perfil {
  grid-row: 2/3;
  padding-left: 5% ;
  margin-top: 5px;
  margin-bottom: 5px;
}

.imagen1{
  border-radius: 50%;
  width: 40%;
}
.img1{
  grid-column: 1/2;
  grid-row: 1/3;
  align-items: center;
  display: flex;
  justify-content: center;
}


.p1{
  grid-column: 2/4;
  grid-row: 1/2;
  display: flex;
  justify-content: flex-start;
  margin-top: 30px;
}
.p2{
  grid-column: 2/4;
  grid-row: 2/3;
  display: flex;
}


.cuadro2-1{
display: grid;
grid-template-columns: repeat(7, 1fr);
grid-template-rows: repeat(2, 1fr);
}
.img2{
  grid-column: 1/3;
  grid-row: 1/3;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.nombre{
  grid-column: 3/8;
  grid-row: 1/2;
  display: flex;
  margin-top: 15px;
}
.region{
  grid-column: 3/8;
  grid-row: 2/3;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.imagen2{
  border-radius: 50%;
  width: 50%;
}



@media only screen and (max-width: 1100px) {
  .contenedor {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 25rem), 1fr));
  }

  .cuadro1 {
    grid-column: 1/2;
    grid-row: 1/2;
  }

  .cuadro2 {
    grid-column: 1/2;
    grid-row: 2/3;
  }

  .cuadro3 {
    grid-column: 1/2;
    grid-row: 3/4;
  }
  
}

@media only screen and (max-width: 700px) {

.cuadro2-1{
  overflow:hidden;
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-template-rows: repeat(3, 1fr);
text-align: center;
vertical-align: middle;
}
.img2{
  width: 30%;
  grid-column: 1/6;
  grid-row: 1/2;
  margin: auto;
  margin-top: 20px;
}
.nombre{
  grid-column: 1/6;
  grid-row: 2/3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}
.region{
  grid-column: 1/6;
  grid-row: 3/4;
  display: flex;
  justify-content: center;
  margin: auto;
}

}


</style>