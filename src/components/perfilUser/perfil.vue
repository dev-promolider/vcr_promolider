<template>
  <div class="contenedor container text-capitalize">
    <div class="row text-center">
      <div class="cuadro1 col-md-5 text-center">
        <div class="row m-2 bg-white shadow bg-body rounded text-center w-100">
          <div
            class="
              d-flex
              flex-column
              justify-content-center
              align-items-center
              parrafos
              my-3
              w-100
            "
          >
            <img
              :src="this.picture"
              alt=""
              class="imagen img-fluid rounded-start mt-2"
              style="width: 150px; height: 150px"
            />
            <a href="#modal" class="open"
              ><label for=""
                >Editar
                <img
                  class="lapiz open"
                  src="../../assets/logo-lapiz.svg"
                  alt=""
                  @click="editarImg" /></label
            ></a>

            <div class="modal" id="modal">
              <a href="#" class="modal-bg"></a>
              <div class="modal-content">
                <a href="#" class="modal-exit">x</a>
                <div class="d-flex flex-column p-2 w-100">
                  <div class="m-2 w-100">
                    <img
                      :src="this.picture"
                      class="img-edit img-fluid rounded-start my-3"
                      alt="..."
                      style="width: 150px; height: 150px"
                    />
                  </div>
                  <div class="m-2">
                    <input
                      type="file"
                      @change="onFileSelected"
                      class="bg-success col-10"
                    />
                  </div>
                  <div class="m-2">
                    <button
                      @click="onUpload"
                      class="col-5 mr-2 btn btn-success"
                    >
                      CARGAR
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="">
              <p class="text-dark mt-3">{{ userUp.name }}</p>
            </div>
            <div class="text-lowercase">
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
          <div
            class="
              row
              d-flex
              flex-column
              justify-content-center
              align-items-center
              text-center
              my-3
            "
            action=""
          >
            <p class="text-dark m-2">cambiar contraseña</p>
            <div>
              <input
                class="
                  contraseña
                  col-12
                  bg-light
                  border border-secundary
                  rounded
                  m-2
                "
                type="text"
                required
                placeholder="Contraseña"
              />
            </div>

            <div>
              <input
                class="
                  contraseña
                  col-12
                  bg-light
                  border border-secundary
                  rounded
                  m-2
                "
                type="text"
                required
                placeholder="Repetir Contraseña"
              />
            </div>
            <div class="mt-2">
              <input
                class="btn-custom"
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
        <div
          class="
          container
            bg-white
            shadow
            bg-body
            rounded
            w-100
            d-flex
            flex-column
            justify-content-center
            align-items-center
            text-center
            px-4
            mt-2
          "
        >
          <div class="mb-3 mt-5 ">
            <div class="row row-cols-2">
              <label class="col-md-6 te"><strong>Nombre</strong></label>
              <label class="col-md-6"><strong>Apellido</strong></label>
              <div class="col-md-6 bg-light border border-secundary rounded">
                <input
                  class=""
                  v-model="userUp.name"
                  type="text"
                  required
                  placeholder="Apellidos"
                />
              </div>
              <div class="col-md-6 bg-light border border-secundary rounded">
                <input
                  class=""
                  v-model="userUp.last_name"
                  type="text"
                  required
                  placeholder="Apellidos"
                />
              </div>
            </div>
          </div>

          <div class="my-3">
            <div class="row row-cols-2">
              <label class="col-md-6"><strong>Ciudad</strong></label>
              <label class="col-md-6"><strong>Pais</strong></label>
              <div class="col-md-6 bg-light border border-secundary rounded">
                <input
              class=""
              type="text"
              required
              placeholder="Ciudad"
              v-model="userUp.city"
            />
              </div>
              <div class="col-md-6 bg-light border border-secundary rounded">
                <select
              class="
                paisApi
                bg-light
                border border-secundary
                rounded
              "
              v-model="userUp.country"
              style="width: 80%"
            >
              <option value="" selected></option>
              <option v-for="pais in namePais" :key="pais.common">
                {{ pais.common }}
              </option>
            </select>
              </div>
              </div>
         
          </div>

          <div class="my-3">

            <div class="row row-cols-2">
              <label class="col-md-6"><strong>Genero</strong></label>
              <label class="col-md-6"><strong>F. Naciemiento</strong></label>
              <div class="col-md-6 bg-light border border-secundary rounded ">
                <input
              class=""
              type="text"
              required
              placeholder="Genero"
              disabled
            />
              </div>
              <div class="col-md-6 bg-light border border-secundary rounded ">
                <input
              class=""
              v-model="userUp.date_birth"
              type="date"
              required
              placeholder="Fecha de nacimiento"
              style="width: 90%"
            />
              </div>
            </div>
            
          </div>

          <div class="biografia my-3">
            <div>
              <strong>Biografia</strong>
            </div>
            <textarea
              class="bg-light border border-secundary rounded p-2"
              v-model="userUp.biography"
              name=""
              id=""
              required
              placeholder="Biografia"
              style="width: 350px; height: 150px"
            ></textarea>
          </div>

          <div class="botonguardar my-3">
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
    </div>

    <div
      v-if="subido"
      class="
        subiendo
        d-flex
        flex-column
        justify-content-center
        align-items-center
      "
    >
      <div
        class="spinner-grow"
        style="width: 10rem; height: 10rem"
        role="status"
      >
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
      subido: null,
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

        location.reload();
      });
    },
  },
};
</script>



<style lang="scss" scoped>
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
  border-radius: 50%;
}
.img-edit {
  border-radius: 50%;
}
.subiendo {
  background: rgba(110, 181, 108, 0.602);
  position: absolute;
  top: 0x;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  width: 100%;
}

/* Modal container*/
.modal {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
}
/* Modal container gets target and it is shown and background modal too*/
.modal:target,
.modal:target .modal-bg {
  display: block;
  z-index: 100;
  opacity: 1;
  visibility: visible;
}
/* Background modal*/
.modal-bg:active,
.modal-bg:hover,
.modal-bg:visited,
.modal-bg:link {
  text-decoration: none;
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
  cursor: default;
}
/* Background modal overlaps to container*/
.modal:target .modal-bg {
  z-index: 200;
}
/* Modal content or body*/
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: white;
  width: 60%;
  height: auto;
  border-radius: 2rem;
  text-align: center;
  z-index: 300;
}

/* Modal is closed at lose target*/
.modal-exit:link,
.modal-exit:active,
.modal-exit:visited,
.modal-exit:hover {
  position: absolute;
  top: 5%;
  right: 5%;
  font-size: 1.5rem;
  text-decoration: none;
  color: #d20000;
  background: #198754;
  padding: 0 15px 0 15px;
  border-radius: 5px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
</style>