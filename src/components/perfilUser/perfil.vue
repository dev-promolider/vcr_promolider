<template>
  <div style="min-height: 700px">
    <section-title title="Ajustes de perfil" />
    <v-row class="p-3">
      <v-col cols="12" sm="9" md="4">
        <v-card elevation="2">
          <v-card elevation="0" class="d-flex flex-column justify-center align-center pt-5">
            <v-badge @click.native="modalImage = true" bordered icon="mdi-camera" overlap bottom offset-x="30"
              offset-y="30" style="cursor: pointer">
              <v-avatar size="140">
                <v-img :src="this.picture"> </v-img>
              </v-avatar>
            </v-badge>

            <v-card-title>
              {{ this.userUp.name }}
            </v-card-title>
            <v-chip-group>
              <v-chip color="green" outlined>Rol : {{ userUp.rol }}</v-chip>
            </v-chip-group>
            <v-chip-group>
              <v-chip color="green" outlined>Membresia : {{ userUp.plan }}</v-chip>
            </v-chip-group>
          </v-card>

          <v-list class="flex-start justify-start">
            <v-subheader class="h5">Detalles</v-subheader>

            <v-divider style="margin: 5px 15px"></v-divider>
            <v-list-item style="min-height: 30px">
              <v-list-item-content>
                <v-list-item-title><span>Nombre:</span> {{ name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item style="min-height: 30px">
              <v-list-item-content>
                <v-list-item-title><span>Correo:</span> {{ email }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="8">
        <v-card elevation="2">
          <v-tabs show-arrows v-model="tab" dark>
            <v-tab v-for="(ltab, index) in listTabs" :key="index">
              <v-icon left> mdi-{{ ltab.icon }} </v-icon>
              {{ ltab.title }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(item, index) in listTabs" :key="index">
              <v-card v-if="item.title === 'Cuenta'">
                <v-card-title class="pb-0"> Editar Perfil </v-card-title>
                <v-form class="mx-5" @submit.prevent="userUpdate">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field class="mt-5" label="Usuario" outlined dense v-model="dataUser.name"></v-text-field>

                      <v-text-field class="mt-5" label="Teléfono" outlined dense
                        v-model="dataUser.phone"></v-text-field>
                      <v-text-field class="mt-5" label="Nro. de documento" outlined dense
                        v-model="dataUser.nro_document"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field class="mt-5" label="Correo electrónico" outlined dense
                        v-model="dataUser.email"></v-text-field>
                      <v-select v-model="dataUser.id_document_type" :items="docTypes" item-value="id"
                        item-text="document" label="Tipo de documento" outlined dense class="mt-5"
                        no-data-text="No hay datos"></v-select>
                    </v-col>
                  </v-row>
                  <div class="text-end">
                    <v-btn style="text-transform: capitalize; font-size: 1rem" color="success" class="my-3"
                      type="submit" :loading="isLoadingUpdateUser">
                      Guardar Cambios
                    </v-btn>
                  </div>
                </v-form>
              </v-card>
              <v-card v-if="item.title === 'Seguridad'">
                <v-card-title class="pb-0"> Cambiar Contraseña </v-card-title>
                <v-form class="mx-5" @submit.prevent="changePassword()">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field class="mt-5" label="Contraseña actual" outlined dense v-model="actual_pass"
                        name="actual_password" :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (value = !value)" :type="value ? 'password' : 'text'">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field class="mt-5" label="Nueva contraseña" outlined dense v-model="new_pass"
                        name="new_password" :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (value = !value)" :type="value ? 'password' : 'text'">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field class="mt-5" label="Repetir nueva contraseña" outlined dense v-model="repeat_pass"
                        name="repeat_password" :append-icon="value2 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (value2 = !value2)" :type="value2 ? 'password' : 'text'">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <div>Mínimo 8 caracteres de largo, mayúsculas y símbolos</div>
                  <v-btn style="text-transform: capitalize; font-size: 1rem" color="success" class="my-4" type="submit">
                    Cambiar contraseña
                  </v-btn>
                </v-form>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modals -->
    <v-dialog @click:outside="onCancel" v-model="modalImage" max-width="490">
      <v-card class="p-2">
        <div class="d-flex flex-column justify-center align-center pt-5">
          <v-avatar size="140">
            <v-img v-if="pictureModal" alt="..." :src="this.pictureModal">
            </v-img>
            <v-img v-else alt="..." :src="this.picture"> </v-img>
          </v-avatar>
        </div>

        <template>
          <v-file-input label="Buscar Imagen" v-model="file" type="file" @change="onFileSelected" class="px-1"
            prepend-icon="mdi-camera" accept="image/*"></v-file-input>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" outlined @click="onCancel">
            Cancelar
          </v-btn>

          <v-btn :loading="loadingSaveImage" color="success" outlined @click="onUpload">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="alertUpdateUser">
      Datos actualizados correctamente

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="alertUpdateUser = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar">
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SectionTitle from "../Navbar/SectionTitle.vue";

export default {
  name: "perfil",
  components: {
    SectionTitle,
  },
  data() {
    return {
      isActiveAlertUser: false,
      msgUpdateUser: false,
      alertUpdateUser: false,
      pictureModal: null,
      isLoadingUpdateUser: false,
      loadingSaveImage: false,
      file: null,
      modalImage: false,
      value: String,
      value2: String,
      menu: false,
      tab: null,
      message: "",
      listTabs: [
        { icon: "account", title: "Cuenta" },
        { icon: "lock-outline", title: "Seguridad" },
      ],
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
      compEmail: localStorage.getItem("email_user"),
      varEmail: 0,
      varCountryInit: [],
      actual_pass: "",
      new_pass: "",
      repeat_pass: "",
      snackbar: false,
      dataUser: [],
      docTypes: [],
      name: "",
      email: "",
    };
  },
  created() {
    this.photo = localStorage.getItem("photo_user");
    this.userUp.email = localStorage.getItem("email_user");
    this.cuaDetalles = localStorage.getItem("name_user");
    this.userAccountType();
    this.getUserInfo();
    this.getDocumentTypes();
  },
  computed: {
    ...mapState("user", ["id_user"]),
  },
  methods: {
    async getDocumentTypes() {
      await this.axios.get("/listDocumentType").then((response) => {
        this.docTypes = response.data;
      });
    },

    async getUserInfo() {
      await this.axios.get("/profile/info").then((response) => {
        this.dataUser = response.data;
        this.name = response.data.name;
        this.email = response.data.email;
      });
    },

    async changePassword() {
      if (this.validatePass()) {
        const form = {
          actual_pass: this.actual_pass,
          new_pass: this.new_pass,
          repeat_pass: this.repeat_pass,
        };
        await this.axios.post("/profile/change-pass", form).then((response) => {
          this.message = response.data;
          this.snackbar = true;
          this.actual_pass = "";
          this.new_pass = "";
          this.repeat_pass = "";
        });
      }
    },

    validatePass() {
      if (this.actual_pass == "") {
        this.message = "Todos los campos son requeridos";
        this.snackbar = true;
        return false;
      } else if (this.new_pass == "") {
        this.message = "Todos los campos son requeridos";
        this.snackbar = true;
        return false;
      } else if (this.repeat_pass == "") {
        this.message = "Todos los campos son requeridos";
        this.snackbar = true;
        return false;
      } else if (
        this.new_pass.length < 8 ||
        this.actual_pass < 8 ||
        this.repeat_pass < 8
      ) {
        this.message = "La contraseña debe tener como mínimo 8 caracteres";
        this.snackbar = true;
        return false;
      } else if (this.new_pass != this.repeat_pass) {
        this.message = "Las contraseñas no coinciden";
        this.snackbar = true;
        return false;
      }
      return true;
    },

    userUpdate() {
      if (this.validateForm()) {
        this.isLoadingUpdateUser = true;
        this.axios
          .post("/user/update", this.dataUser)
          .then((res) => {
            this.getUserInfo();
            this.isLoadingUpdateUser = false;
            this.alertUpdateUser = true;
            this.msgUpdateUser = res.data.message;
            this.isActiveAlertUser = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    validateForm() {
      if (this.email != this.dataUser.email) {
        const formdata = new FormData();
        formdata.append("new_email", this.dataUser.email);

        this.axios.post("/user/verify-unique-email", formdata).then((res) => {
          if (res.data) {
            this.message =
              "El correo ingresado ya fue registrado anteriormente";
            this.snackbar = true;
            return false;
          }
        });
      }
      if (
        this.dataUser.email == "" ||
        this.dataUser.name == "" ||
        this.dataUser.phone == "" ||
        this.dataUser.doc_type_id == "" ||
        this.dataUser.number_doc == ""
      ) {
        this.message = "Todos los campos son requeridos";
        this.snackbar = true;
        return false;
      }
      return true;
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

    onFileSelected() {
      this.selectedFile = this.file;

      if (!this.file) {
        return;
      }
      const fr = new FileReader();
      fr.onload = () => (this.pictureModal = fr.result);
      fr.readAsDataURL(this.selectedFile);
    },

    onCancel() {
      this.pictureModal = null;
      this.modalImage = false;
      this.file = null;
    },

    onUpload() {
      if (this.selectedFile != null) {
        this.loadingSaveImage = true;

        const fd = new FormData();
        fd.append("user-photo", this.selectedFile, this.selectedFile.name);

        this.subido = true;
        this.axios
          .post("/profile/upload-photo", fd)
          .then(() => {
            this.list();
          })
          .catch(() => { });
      }
    },

    list() {
      this.axios.get(`/profile/info`).then((res) => {
        localStorage.setItem("photo_user", res.data.photo);
        this.subido = false;
        this.file = null;
        this.loadingSaveImage = false;
        location.reload();
      });
    },

    getCountry() {
      this.axios.get("/public/countries").then((res) => {
        this.pais = res.data;

        for (var i = 0, l = this.pais.length; i < l; i++) {
          if (this.userUp.country == this.pais[i].id) {
            this.varCountryInit = this.pais[i];
          }
        }

        this.namePais = this.pais.map((element) => {
          return element.name;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contenedor-profile {
  display: grid;
  gap: 20px;
  grid-template-columns: 30% 70%;
  padding: 15px 30px;
}

.profile-tabs {
  margin-top: 68px;
}

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

.v-dialog {
  background-color: white !important;
}
</style>
