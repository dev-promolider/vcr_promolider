<template>
  <div class="profile-page-wrapper p-4">
    <section-title title="Ajustes de perfil" />

    <v-row class="mt-2">
      <!-- Tarjeta Resumen de Perfil Izquierda -->
      <v-col cols="12" md="4">
        <div class="profile-card p-4">
          <div class="d-flex flex-column align-center text-center">
            <!-- Avatar con botón de cámara flotante -->
            <div class="avatar-container mb-3 position-relative">
              <img
                :src="picture || defaultAvatar"
                class="profile-avatar-img"
                alt="Foto de perfil"
                @error="onAvatarError"
              />
              <button class="avatar-edit-badge" @click="modalImage = true" title="Cambiar foto">
                <v-icon color="#FFFFFF" size="18">mdi-camera</v-icon>
              </button>
            </div>

            <!-- Nombre de usuario -->
            <h3 class="user-display-name mb-2">{{ userUp.name || name || 'Usuario' }}</h3>

            <!-- Chips de Rol y Membresía -->
            <div class="d-flex flex-wrap justify-center gap-2 mb-4">
              <span v-if="userUp.rol" class="profile-chip">
                <v-icon color="#10B981" size="14" class="mr-1">mdi-shield-account-outline</v-icon>
                Rol: {{ userUp.rol }}
              </span>
              <span v-if="userUp.plan" class="profile-chip">
                <v-icon color="#10B981" size="14" class="mr-1">mdi-crown-outline</v-icon>
                Membresía: {{ userUp.plan }}
              </span>
            </div>
          </div>

          <!-- Detalles adicionales del usuario -->
          <div class="profile-details-section pt-3 border-top-subtle">
            <h5 class="details-section-title mb-3">Detalles</h5>

            <div class="detail-item d-flex align-center mb-3">
              <v-icon color="#71717A" size="20" class="mr-3">mdi-account-outline</v-icon>
              <div>
                <span class="detail-label">Nombre completo</span>
                <p class="detail-value mb-0">{{ name || userUp.name || '---' }}</p>
              </div>
            </div>

            <div class="detail-item d-flex align-center">
              <v-icon color="#71717A" size="20" class="mr-3">mdi-email-outline</v-icon>
              <div>
                <span class="detail-label">Correo electrónico</span>
                <p class="detail-value mb-0">{{ email || userUp.email || '---' }}</p>
              </div>
            </div>
          </div>
        </div>
      </v-col>

      <!-- Panel Derecha de Ajustes (Cuenta y Seguridad) -->
      <v-col cols="12" md="8">
        <div class="profile-form-card overflow-hidden">
          <v-tabs v-model="tab" color="#10B981" background-color="#FFFFFF" slider-color="#10B981" class="custom-profile-tabs border-bottom-subtle">
            <v-tab v-for="(ltab, index) in listTabs" :key="index" class="profile-tab-btn">
              <v-icon left size="20"> mdi-{{ ltab.icon }} </v-icon>
              {{ ltab.title }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab" class="profile-tabs-content p-4">
            <v-tab-item v-for="(item, index) in listTabs" :key="index">
              <!-- Tab: Cuenta -->
              <div v-if="item.title === 'Cuenta'" class="form-tab-container">
                <h4 class="form-section-title mb-4">Editar Perfil</h4>
                <v-form @submit.prevent="userUpdate">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field label="Usuario" outlined dense v-model="dataUser.name" class="custom-input"></v-text-field>
                      <v-text-field label="Teléfono" outlined dense v-model="dataUser.phone" class="custom-input"></v-text-field>
                      <v-text-field label="Nro. de documento" outlined dense v-model="dataUser.nro_document" class="custom-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field label="Correo electrónico" outlined dense v-model="dataUser.email" class="custom-input"></v-text-field>
                      <v-select
                        v-model="dataUser.id_document_type"
                        :items="docTypes"
                        item-value="id"
                        item-text="document"
                        label="Tipo de documento"
                        outlined
                        dense
                        class="custom-input"
                        no-data-text="No hay datos"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <div class="d-flex justify-end mt-2">
                    <button class="save-profile-btn d-flex align-center" type="submit" :disabled="isLoadingUpdateUser">
                      <v-icon color="#FFFFFF" size="18" class="mr-2">mdi-check</v-icon>
                      <span>{{ isLoadingUpdateUser ? 'Guardando...' : 'Guardar Cambios' }}</span>
                    </button>
                  </div>
                </v-form>
              </div>

              <!-- Tab: Seguridad -->
              <div v-if="item.title === 'Seguridad'" class="form-tab-container">
                <h4 class="form-section-title mb-4">Cambiar Contraseña</h4>
                <v-form @submit.prevent="changePassword()">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Contraseña actual"
                        outlined
                        dense
                        v-model="actual_pass"
                        name="actual_password"
                        :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (value = !value)"
                        :type="value ? 'password' : 'text'"
                        class="custom-input"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Nueva contraseña"
                        outlined
                        dense
                        v-model="new_pass"
                        name="new_password"
                        :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (value = !value)"
                        :type="value ? 'password' : 'text'"
                        class="custom-input"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Repetir nueva contraseña"
                        outlined
                        dense
                        v-model="repeat_pass"
                        name="repeat_password"
                        :append-icon="value2 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (value2 = !value2)"
                        :type="value2 ? 'password' : 'text'"
                        class="custom-input"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <p class="pass-info-text text-muted mb-4">
                    <v-icon color="#71717A" size="16" class="mr-1">mdi-information-outline</v-icon>
                    Mínimo 8 caracteres de largo, mayúsculas y símbolos
                  </p>
                  <div class="d-flex justify-start">
                    <button class="save-profile-btn d-flex align-center" type="submit">
                      <v-icon color="#FFFFFF" size="18" class="mr-2">mdi-lock-reset</v-icon>
                      <span>Cambiar contraseña</span>
                    </button>
                  </div>
                </v-form>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>
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
      defaultAvatar: "https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240",
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
    onAvatarError(e) {
      if (e && e.target) {
        e.target.src = this.defaultAvatar;
      }
    },
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

<style scoped>
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
}

.profile-page-wrapper {
  min-height: 85vh;
}

/* Tarjeta izquierda de perfil */
.profile-card {
  background: #FAF9F5 !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 24px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
}

.avatar-container {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  padding: 4px;
  background: #FFFFFF;
  border: 2px solid #E5E3DC;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.profile-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-edit-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #10B981;
  border: 3px solid #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.avatar-edit-badge:hover {
  transform: scale(1.1);
  background: #059669;
}

.user-display-name {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.25rem !important;
  color: #18181B !important;
}

.profile-chip {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #10B981;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
}

.border-top-subtle {
  border-top: 1px solid #E5E3DC !important;
}

.border-bottom-subtle {
  border-bottom: 1px solid #E5E3DC !important;
}

.details-section-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  color: #18181B !important;
}

.detail-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #71717A;
  display: block;
}

.detail-value {
  font-family: 'Outfit', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  color: #18181B;
}

/* Tarjeta derecha de formulario */
.profile-form-card {
  background: #FAF9F5 !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 24px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
}

.custom-profile-tabs {
  background-color: #FFFFFF !important;
}

.profile-tab-btn {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 0.95rem !important;
  text-transform: capitalize !important;
  letter-spacing: normal !important;
}

.profile-tabs-content {
  background: transparent !important;
}

.form-section-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.15rem !important;
  color: #18181B !important;
}

.save-profile-btn {
  background-color: #10B981 !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 10px 24px !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.92rem !important;
  font-weight: 700 !important;
  transition: all 0.2s ease !important;
  cursor: pointer;
}

.save-profile-btn:hover {
  background-color: #059669 !important;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35) !important;
}

.save-profile-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pass-info-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.82rem;
  color: #71717A !important;
}

.v-dialog {
  background-color: #FFFFFF !important;
  border-radius: 20px !important;
}
</style>
