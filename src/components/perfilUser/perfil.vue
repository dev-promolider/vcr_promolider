<template>
  <div style="height: 100%" >
<div  class="d-grid" :class="[this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? 'flex-column' : 'contenedor-profile']">
      <div class="profile mx-1 "  >
         <div class="h2 py-3 text-secondary  mx-1" >Ajustes de Perfil</div>

          <v-card
            elevation="2"
          >
            <v-card elevation="0" class="d-flex flex-column justify-center align-center pt-5"
            >
           
              <v-badge  @click.native="modalImage = true"  bordered icon="mdi-camera"  overlap bottom offset-x="30" offset-y="30" style="cursor: pointer" >
                <v-avatar size="140">
                  <v-img
                      :src="this.picture"
                  >
                  </v-img>
                </v-avatar>
              </v-badge>
          
              <v-card-title>
                  {{this.userUp.name}}
              </v-card-title>
             <v-chip-group
                >
                  <v-chip  color="green" outlined>{{userUp.rol}}</v-chip>
                  <v-chip  color="green" outlined>{{userUp.plan}}</v-chip>
             </v-chip-group>
            </v-card>

        
            <v-list class="flex-start justify-start">
         
            <v-subheader class="h5">Detalles</v-subheader>
               
            <v-divider style="margin: 5px 15px"></v-divider>
                <v-list-item style="min-height: 30px">
                    <v-list-item-content>
                      <v-list-item-title><span>Usuario:</span> {{userUp.name}} </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item  style="min-height: 30px">
                    <v-list-item-content>
                      <v-list-item-title><span>Correo:</span> {{userUp.email}} </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                 <v-list-item  style="min-height: 30px">
                    <v-list-item-content>
                      <v-list-item-title><span>País:</span> Lima, Perú </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
          </v-list> 
          
          </v-card>

      </div>

      <div class="profile-tabs mx-2" style="width: 90%">
          <v-card elevation="0" >
         
              <v-tabs
                show-arrows
                v-model="tab"
                background-color="#000000"
                dark
              >
                <v-tab
                  v-for="(ltab, index) in listTabs"
                  :key="(index)"
                >
                <v-icon left>
                  mdi-{{ltab.icon}}
                </v-icon >
                  {{ltab.title}}
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item
                  v-for="(item, index) in listTabs"
                  :key="index"
                >
                  <v-card v-if="item.title === 'Cuenta'"  >
                     <v-card-title class="pb-0">
                        Editar Perfil
                    </v-card-title>
                    <v-form class="mx-5" @submit.prevent="userUpdate" >
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                          >
                          <v-text-field
                            class="mt-5"
                            label="Usuario"
                            outlined
                            dense
                            v-model="userUp.name"
                          ></v-text-field>
                            <v-text-field
                            class="mt-5"
                            label="Ciudad"
                            outlined
                            dense
                            v-model="userUp.city"
                          ></v-text-field>
                          <v-text-field
                            class="mt-5"
                            label="Género"
                            outlined
                            dense
                          ></v-text-field>
                          <v-textarea
                            outlined
                            name="input-7-4"
                            label="Biografia"
                            v-model="userUp.biography"
                          ></v-textarea>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                          >
                          <v-text-field
                            class="mt-5"
                            label="Apellido"
                            outlined
                            dense
                             v-model="userUp.last_name"
                          ></v-text-field>
                           <v-select
                            :items="namePais"
                            v-model="userUp.country"
                            label="Pais"
                            outlined
                            dense
                            class="mt-5"
                            no-data-text="No hay datos"
                          ></v-select>
                    
                          <v-menu
                              v-model="menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="userUp.date_birth"
                                  label="Cumpleaños"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  type="date"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                locale="es"
                                v-model="userUp.date_birth"
                                @input="menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                           
                        </v-row>
                          
                        <v-btn
                         style="text-transform: capitalize; font-size: 1rem"
                          color="success"
                          class="my-4"
                          type="submit"
                          :loading="isLoadingUpdateUser"
                        >
                          Guardar Cambios
                        </v-btn>
                    </v-form>
                  </v-card>
                    <v-card v-if="item.title === 'Seguridad'"  >
                        <v-card-title class="pb-0">
                          Cambiar Contraseña
                        </v-card-title>
                        <v-form class="mx-5 " @submit.prevent="">
                            
                            <v-row>
                               <v-col
                                  cols="12"
                                  sm="6"
                                >
                                  <v-text-field
                                    class="mt-5"
                                    label="Nueva Contraseña"
                                    outlined
                                    dense
                                     name="password"
                                    :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="() => (value = !value)"
                                    :type="value ? 'password' : 'text'"
                                  >
                                  </v-text-field>
                                  
                                </v-col>
                                <v-col
                                  cols="12" 
                                  sm="6">
                                  
                                  <v-text-field
                                    class="mt-5"
                                    label="Confirman Nueva Contraseña"
                                    outlined
                                    dense
                                    name="password"
                                    :append-icon="value2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="() => (value2 = !value2)"
                                    :type="value2 ? 'password' : 'text'"
                                  >
                                  </v-text-field>

                               
                                </v-col>
                            </v-row>
                            <div >Mínimo 8 caracteres de largo, mayúsculas y símbolos</div>  
                            <v-btn    
                              style="text-transform: capitalize; font-size: 1rem"
                              color="success"
                              class="my-4"
                              type="submit">
                               Cambiar Contraseña
                            </v-btn>
                        </v-form>

                    </v-card>

                </v-tab-item>
              </v-tabs-items>
          </v-card>
      </div>

    </div>

    <!-- Modals -->
      <v-dialog
          @click:outside="onCancel"
          v-model="modalImage"
          max-width="490"
        >
          <v-card class="p-2" >
              <div class="d-flex flex-column justify-center align-center pt-5">

                <v-avatar  size="140">
                  <v-img
                      v-if="pictureModal"
                       alt="..."
                      :src="this.pictureModal"
                  >
                  </v-img>
                  <v-img
                       v-else
                       alt="..."
                      :src="this.picture"
                  >
                  </v-img>
                </v-avatar>
              </div>
              
              <template >
                <v-file-input
                 label="Buscar Imagen"
                 v-model="file"
                 type="file"
                 @change="onFileSelected"
                 class="px-1"
                 prepend-icon="mdi-camera"
                 accept="image/*"
                ></v-file-input>
              </template>
         
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="red darken-1"
                outlined
                @click="onCancel"
              >
                Cancelar
              </v-btn>

              <v-btn
                :loading="loadingSaveImage"
                color="success"
                outlined
                @click="onUpload"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-snackbar
            v-model="alertUpdateUser"
            :color="isActiveAlertUser ? 'green' : 'red'"
            :icon="isActiveAlertUser ? 'mdi-check-circle' : 'mdi-alert-octagram'"
            timeout="2000"
          >
          <v-icon>
              mdi-check-circle
          </v-icon>
            {{msgUpdateUser}}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="alertUpdateUser = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "perfil",

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
      listTabs: [
        { icon: 'account' , title: 'Cuenta' },
        { icon: 'lock-outline' , title: 'Seguridad' }
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
      this.isLoadingUpdateUser = true
      this.axios
        .post("/user/update", this.userUp)
        .then(( res ) => {
          if(res.data.status === 200){
            this.isLoadingUpdateUser = false
            this.alertUpdateUser = true
            this.msgUpdateUser = res.data.message
            this.isActiveAlertUser = true
          }else{
            this.msgUpdateUser = 'Error al actualizar'
            this.isActiveAlertUser = false
          }
        })
        .catch(() => {
          //console.log(error);
        });

      this.axios.get(`/user/show?id=${localStorage.getItem("id_user")}`)
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

        this.namePais.push(pais.name.common);
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

    onFileSelected( ) {
      this.selectedFile = this.file;

      if( !this.file ){
        return
      }
      const fr = new FileReader()
      fr.onload = () => this.pictureModal = fr.result
      fr.readAsDataURL( this.selectedFile )

    },
    onCancel(){
        this.pictureModal = null
        this.modalImage = false
        this.file = null
    },
    onUpload() {
      if(this.selectedFile != null){
        this.loadingSaveImage = true

        const fd = new FormData();
        fd.append("user-photo", this.selectedFile, this.selectedFile.name);

       this.subido = true;
       this.axios
         .post("/profile/upload-photo", fd)
         .then(() => {
           this.list();
        })
        .catch(() => {});
     }
    },

    list() {
      this.axios.get(`/profile/info`).then((res) => {
        localStorage.setItem("photo_user", res.data.photo);
        this.subido = false;
        this.file = null
        this.loadingSaveImage = false
        location.reload();
      });
    },
  },
};
</script>



<style lang="scss" scoped>

.contenedor-profile{
  display: grid;
  gap: 20px;
  grid-template-columns: 30% 70%;
  padding: 15px 30px;
}
.profile-tabs{
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
</style>