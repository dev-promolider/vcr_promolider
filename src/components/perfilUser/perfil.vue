<template>
  <div class="contenedor container text-capitalize">
    <div class="row text-center">

      <div class="cuadro1 col-md-5 text-center">

          <div class="row m-2 bg-white shadow bg-body rounded text-center w-100">


            <div class="d-flex flex-column justify-content-center align-items-center parrafos my-3 w-100">


                <img :src="this.picture" alt="" class="imagen img-fluid rounded-start mt-2" style="width: 150px; height:150px;"/>
                <label for="">Editar <img class="lapiz" src="../../assets/logo-lapiz.svg" alt="" @click="editarImg"/></label>
                

                  <div v-if="mostrar" class="editImg w-100">

                    <div class="d-flex flex-column p-2 w-100">
                      <div class="m-2 w-100">
                        <img :src='this.picture' class="img-edit img-fluid rounded-start my-3" alt="..." style="width: 150px; height:150px;" />
                      </div>
                      <div class="m-2">
                        <input
                          type="file"
                          @change="onFileSelected"
                          class="bg-success col-10"
                        />
                      </div>
                      <div class="m-2">

                          <button @click="onUpload" class="col-5 mr-2 btn btn-success">CARGAR</button>
                          <button @click="editarImg" class="col-5 ml-2 btn btn-success">SALIR</button>
                      </div>

                      
                    </div>
                    
                  </div>
                
              

              <div class="">
                <p class="text-dark mt-3">{{ userUp.name }}</p>
              </div>
              <div class="">
                <p class="text-dark">{{ userUp.email }}</p>
              </div>

              <div class="">
                <p class="text-dark">
                <strong> Rol de usuario:</strong> {{ userUp.rol }}
              </p>
              </div>
              <div class="">
                <p class="text-dark">
                <strong>Plan actual:</strong> {{ userUp.plan }}
              </p>
              </div>
              <div class="">
                <p class="text-dark text-center">
                  Lima,Peru
                  <img class="icoban" src="../../assets/logo-bandera.svg" />
                </p>
              </div>
            </div>

          </div>
       

          
          <div class="row m-2 bg-white shadow bg-body rounded text-center w-100">

            <div class="row d-flex flex-column justify-content-center align-items-center text-center my-3 " action="">

              <p class="text-dark m-2">cambiar contraseña</p>
            <div>
                <input
                class="contraseña col-12 bg-light border border-secundary rounded m-2"
                type="text"
                required
                placeholder="Contraseña"
                 />
            </div>
              
            <div>
              <input
                class="contraseña col-12 bg-light border border-secundary rounded m-2"
                type="text"
                required
                placeholder="Repetir Contraseña"
              />
            </div>
              <div class="mt-2">
                <input
                  class="btn-custom  "
                  type="submit"
                  value="Guardar"
                  name=""
                  id=""
                />
              </div>
            </div>

          </div>
          

      </div>


      <div class="cuadro2 col-md-7 text-center ">

        <div class="bg-white shadow bg-body rounded w-100 d-flex flex-column justify-content-center align-items-center m-2">
            <div class="mb-3 mt-5">
                
                <input
                  class="bg-light border border-secundary rounded text-center col-5 mr-2"
                  v-model="userUp.name"
                  type="text"
                  required
                  placeholder="Nombres"
                />

                <input
                  class="bg-light border border-secundary rounded text-center col-5 ml-2"
                  v-model="userUp.last_name"
                  type="text"
                  required
                  placeholder="Apellidos"
                />
              </div>

              <div class="my-3">
                <input
                class="bg-light border border-secundary rounded col-5 mr-2"
                type="text"
                required
                placeholder="Ciudad"
                v-model="userUp.city"
              />

              <select
                class="paisApi bg-light border border-secundary rounded  col-5 ml-2"
                v-model="userUp.country"
              >
                <option value="" selected></option>
                <option v-for="pais in namePais" :key="pais.common">
                  {{ pais.common }}
                </option>
              </select>
              </div>

              <div class="my-3">
                <input
              class=" col-5 bg-light border border-secundary rounded mr-2"
              type="text"
              required
              placeholder="Genero"
              disabled
            />
            <input
              class=" col-5 bg-light rounded border border-secundary ml-2"
              v-model="userUp.date_birth"
              type="date"
              required
              placeholder="Fecha de nacimiento"
            />
              </div>

              <div class="biografia my-3">
               <textarea
              class="bg-light border border-secundary rounded p-2"
              v-model="userUp.biography"
              name=""
              id=""
              required
              placeholder="Biografia"
              style="width: 350px; height: 150px;"
            ></textarea>
            </div>

            <div class="botonguardar my-3">
            <input
              @click="userUpdate"
              class="btn-custom "
              type="submit"
              value="Guardar"
              name=""
              id=""
            />
          </div>

        </div>

        
      </div>

    </div>

    <div v-if="subido" class="subiendo d-flex flex-column justify-content-center align-items-center">
    <div class="spinner-grow" style="width: 10rem; height: 10rem;" role="status">
     <span class="visually-hidden"></span>
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
      subido:null,
      mostrar: null,
      selectedFile: null,
      picture: localStorage.getItem("photo_user"),

      photo: "",
      userUp: {
        email: localStorage.getItem("email_user"),
        name: localStorage.getItem("name_user"),
        last_name: localStorage.getItem("last_name_user"),
        date_birth: localStorage.getItem("date_birth_user"),
        country: localStorage.getItem("country_user"),
        biography: localStorage.getItem("biography_user"),
        city: localStorage.getItem("city"),
        rol: "",
        plan: "",
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
    this.userAccountType();
  },
  computed: {
    ...mapState("user", ["id_user"]),
  },
  methods: {
    userUpdate() {
      this.axios
        .post("/user/update", this.userUp)
        .then(() => {
          //console.log("este"+res.data);
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

    userAccountType() {
      this.axios.get("dashboard/getattributes").then((r) => {
        const rs = r.data.data;
        this.userUp.plan = rs.accountType;
        this.userUp.rol = rs.role;
      });
    },

    editarImg() {
      this.mostrar = !this.mostrar;
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];

    },

    onUpload() {
      const fd = new FormData();
      fd.append("user-photo", this.selectedFile, this.selectedFile.name);

      this.subido = true;
      this.axios
        .post("/profile/upload-photo", fd)
        .then(() => {
          this.list();
          
        })
        .catch(() => {});
    },

    list() {
      this.axios.get(`/profile/info`).then((res) => {
        localStorage.setItem("photo_user", res.data.photo);
        console.log(res);
        this.subido = false;
        alert("SU NUEVA IMAGEN SE ACTUALIZO CON EXITO")
        location. reload()
      });

      
    },
  },
};
</script>



<style scope>
.userico {
  width: 35px;
}
.editImg {
  z-index: 100;
  position: absolute;
  background: rgba(103, 99, 99, 0.676);
  border-radius: 15px;
  box-shadow: 1px 1px 2px 4px rgb(116, 177, 104);
}
.imagen {
  border-radius:50%;
}
.img-edit{
  border-radius:50%;
}
.subiendo{
  background: rgba(110, 181, 108, 0.602);
  position: absolute;
  top:0x;
  bottom:0;
  right:0;
  left:0;
  z-index: 1000;
  height:100%;
  width: 100%;
}
</style>