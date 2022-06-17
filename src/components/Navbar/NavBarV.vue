<template>
  <div >
     
          <v-navigation-drawer
              v-model="drawer"
              app
              :permanent="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
              :expand-on-hover="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
              :mini-variant="mini"
              class="color-drawer rounded-0"
            >
              <v-list>
                <v-list-item class="px-2" link :to="{name: 'perfil'}" >
                    <v-list-item-avatar class="mr-1" >
                      <v-img :src="this.img"></v-img>
                    </v-list-item-avatar>
                    <v-list-item >
                    <v-list-item-content>
                      <v-list-item-title class="text-white">
                         {{name}}
                        </v-list-item-title>
                        <v-list-item-subtitle class="text-white">{{email}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                </v-list-item>
              </v-list>
                <v-list
                  nav
                  dense
                >
                  <v-list-item  link  v-for="(link, index ) in listNavBar" :key="index" :to="{name: link.path}"   >
                    <v-list-item-icon class="mr-3" >
                      <v-icon class="text-white" >{{`mdi-${link.icon}`}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title style="font-size: 15px"   class="text-white" >{{link.nombre}}</v-list-item-title>
                  </v-list-item>
                </v-list>


                  <template v-slot:append>
                    <div >
                      <v-list nav dense>
                          <v-list-item >
                            <v-list-item-icon style="margin-right: 5px" class="px-1">
                              <img width="18px"  src="@/assets/icon-promolider.png" alt="promolider">
                            </v-list-item-icon>
                            <v-list-item-title >
                                <h3 style="color:white; letter-spacing: 3.5px; padding-top: 3px">Promolíder</h3>
                            </v-list-item-title>
                          </v-list-item>
                        <v-list-item link  :to="{ name: 'preguntas-frecuentes'}" style="color:white; font-size: 18px" class="text-decoration-none">
                            <v-list-item-icon style="margin-right: 5px">
                              <v-icon  class="text-white">mdi-help</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title style="color:white; font-size: 14px; letter-spacing: 1.3px;" >Preguntas Frecuentes</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>
                  </template>
        </v-navigation-drawer>
    
    
      <NavBar @click="changeDrawer" />

  </div>
</template>
<script>
import { mapState } from "vuex";
import NavBar from '@/components/Navbar/NavBar.vue';
export default {
  name: "NavBarV",
  components:{
    NavBar
  },
  props:{

  },
  data(){
    return {
      drawer: null,
      isShowDrawer: null,
      email: localStorage.getItem("email_user"),
      name: localStorage.getItem("name_user"),
      img:localStorage.getItem("photo_user"),
      listNavBar:[
        { nombre: 'Inicio', icon: 'home' , path: 'home'},
        { nombre: 'Marketplace', icon: 'store' , path: 'courses'},
        { nombre: 'Mi Aprendizaje', icon: 'book' , path: 'suscription-user'},
        { nombre: 'Mis Certificaciones', icon: 'school' , path: 'certificado-user'},
        { nombre: 'Mensajes', icon: 'message-processing' , path: 'messages'},
        { nombre: 'Logros', icon: 'trophy' , path: 'logros'},
        { nombre: 'LeaderBoard', icon: 'star' , path: 'leaderBoard'},
      ],
      
    }
  },
  computed: {
    ...mapState("sections", ["topSection"]),
    mini: {
      get(){
        return !this.$vuetify.breakpoint.xs ? true : false
      },
      set( value ){
        return value 
      }
    }
  },
  methods: {
    changeDrawer( drawer ){
      this.drawer = drawer
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.color-drawer{
   background: rgb(53,66,74);
   background: radial-gradient(circle, rgb(38, 46, 52) 0%, rgba(19,27,30,1) 45%);
}
a:hover{
  text-decoration: none;
}
  
</style>
