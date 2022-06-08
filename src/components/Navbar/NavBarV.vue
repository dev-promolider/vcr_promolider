<template>
  <div >
     <div class="barrita" @click="showDrawer" :class="[isShowDrawer ? '' : 'barrita-hide']" >
        <i class="fas fa-bars"></i>
      </div>
    <v-card >
      <v-navigation-drawer
        permanent
        expand-on-hover
        height="100vh"
        class="color-drawer rounded-0"
        :class="isShowDrawer ? 'isShowDrawer' : 'isHideDrawer' "
      >
        <v-list>
          <v-list-item link class="px-2" :to="{name: 'perfil'}" >
            <v-list-item-avatar  >
              <v-img  src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item style="color:white"  class="px-2">
              <v-list-item-content>
                <v-list-item-title style="font-size: 15px">
                  {{name}}
                </v-list-item-title>
                <v-list-item-subtitle style="color:white; font-size: 14px">{{email}}</v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
          </v-list-item>

        </v-list>


        <v-list
          nav
          dense
        >

          <v-list-item 
            link  
            v-for="(link, index ) in listNavBar" 
            :key="index" 
            :to="{name: link.path}"  
            class="text-decoration-none" style="color:white; font-size: 18px"
          >
            <v-list-item-icon>
              <i :class="`${link.icon} `" ></i>
            </v-list-item-icon>
            <v-list-item-title style="font-size: 15px; padding-left: 15px" >{{link.nombre}}</v-list-item-title>
          </v-list-item>
          
        </v-list>
        <template v-slot:append>
          <div >
            <v-list nav dense>
                <v-list-item class="mb-2">
                  <v-list-item-icon >
                    <img width="18px" src="@/assets/icon-promolider.png" alt="promolider">
                  </v-list-item-icon>
                  <v-list-item-title >
                      <h3 style="color:white; letter-spacing: 3.5px; padding-top: 3px">Promolíder</h3>
                  </v-list-item-title>
                </v-list-item>
              <v-list-item link  :to="{ name: 'preguntas-frecuentes'}" style="color:white; font-size: 18px" class="text-decoration-none">
                  <v-list-item-icon>
                    <i class="fas fa-question" style=" font-size: 13px; margin-top: 5px"></i>
                  </v-list-item-icon>
                  <v-list-item-title style="color:white; font-size: 14px; letter-spacing: 1.3px;" >Preguntas Frecuentes</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </template>
      </v-navigation-drawer>
    </v-card>

  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "NavBarV",
  data(){
    return {
      isShowDrawer: null,
      email: localStorage.getItem("email_user"),
      name: localStorage.getItem("name_user"),
      listNavBar:[
        { nombre: 'Inicio', icon: 'fas fa-home' , path: 'home'},
        { nombre: 'Marketplace', icon: 'fas fa-store' , path: 'courses'},
        { nombre: 'Mi Aprendizaje', icon: 'fas fa-book' , path: 'suscription-user'},
        { nombre: 'Mis Certificaciones', icon: 'fas fa-graduation-cap' , path: 'certificado-user'},
        { nombre: 'Mensajes', icon: 'fas fa-envelope' , path: 'messages'},
        { nombre: 'Logros', icon: 'fas fa-trophy' , path: 'logros'},
        { nombre: 'LeaderBoard', icon: 'fas fa-star' , path: 'leaderBoard'},
      ]
    }
  },
  computed: {
    ...mapState("sections", ["topSection"]),
  },
  methods: {
    showDrawer(){
      this.isShowDrawer = !this.isShowDrawer
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scope>
.color-drawer{
   background: rgb(53,66,74);
   background: radial-gradient(circle, rgb(38, 46, 52) 0%, rgba(19,27,30,1) 45%);
}
@media screen and ( max-width: 1024px ) {
    .isShowDrawer{
    visibility: visible;
    opacity: 1;
    width: 50px !important;
  }
  .isHideDrawer{
    visibility: hidden;
    opacity: 0;
    width: 0px !important;
  }
  .barrita{
    visibility: visible !important;
  }
}

.barrita-hide{
  left: 10px !important;
}

.barrita{
  position: absolute;
  top: 0;
  left: 70px;
  margin-top: 18px;
  z-index: 31;
  font-size: 30px;
  visibility: hidden;
  cursor: pointer;
}
  // @media screen and (max-width: 1024px) {

  //   .color-drawer{
  //     width: 0px !important;
  //     opacity: 0;
  //   }
  // }

// :root {
//   --text-size: 14px;
//   --active-link: 4px solid #1ae800;
//   --opcion-link: invert(0.5) sepia(5%) saturate(5162%) hue-rotate(64deg)
//     brightness(96%) contrast(92%);
// }
// .contenedor-preguntas{
//   position: absolute;
//   bottom: 0;
//   left: 0;
// }
// .preguntas{
//   position: relative;
//   min-width: 200px;
// }
// .link-pregunta{
//   font-size: 15px !important;
// }
// .content-navbarv {
//   width: 220px;
//   height: 93%;
//   overflow: scroll;
// }
// .title-aula {
//   display: flex;
//   align-items: center;
//   height: 104px;
//   padding: 6px 0px 0px 18px;
// }
// .title-aula > img {
//   width: 151px;
//   height: 37px;
// }
// .sidebar{
//   min-width: 220px;
// }
// .nav-item {
//   margin-bottom: 13px;
// }
// .link-v {
//   font-size: var(--text-size);
//   color: #fff;
// }
// .is-active {
//   border-left: var(--active-link);
//   filter: var(--opcion-link);
// }
// .is-active-pregunta{
//   filter: var(--opcion-link);
// }
// .link-v:hover {
//   filter: var(--opcion-link);
// }
// .nav-link > img {
//   width: 24px;
//   height: 24px;
//   margin-right: 10px;
// }
// .iconos{
//   font-size: 18px !important;
//   padding-right: 10px;
//   width: 30px;
// }
</style>
