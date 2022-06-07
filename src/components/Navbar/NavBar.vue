<template>
     <div class="nav-bar">
        <ul class="nav-bar__list" >
          
                  <ul class="nav-bar__listitem nav-sub-h1 justify-content-center align-items-center" v-if="examDaily" >

                    <li class="nav-item " data-toggle="modal" data-target="#question" >
                      <i class="fas fa-question black" :class="[tooltip ? 'pulse ' : '']"></i>
                    </li>
                    <div class="tooltip-box d-flex"  v-if="tooltip">Gana puntos contestando preguntas. 
                      <i style="cursor: pointer"  class="fas fa-times  close-tool" @click="hideToolTip"></i>
                    </div>
                    <div class="circle"></div>
                    
                  </ul>  

                <li class="nav-bar__listitem d-flex align-items-center " style=" font-size: 18px" v-if="puntos" >
                      <i class="fas fa-medal black" style="font-size:15px; width: 12px"></i>
                      <div class="mx-1">{{puntos}}</div>
                      <div>Pts.</div>
                </li>
               
                <ul class="nav nav-sub-h1 justify-content-center align-items-center" v-if="courseSelect" :title="msjCompletedClass">
                  <li class="nav-item">
                    <v-progress-circular
                      :rotate="-90"
                      :size="40"
                      :width="5"
                      :value="progressCourseSelect"
                      color="teal"
                    >
                      <i class="fas fa-trophy"></i>
                    </v-progress-circular>
                  </li>
                </ul>
                <li class="nav-bar__listitem">
                   <i class="fas fa-bell black"></i>
                </li>
                  <li class="nav-bar__listitem" @click="isDropNav = true" ><i class="fas fa-ellipsis-v black"  ></i>
                    <ul class="nav-bar__listitemdrop" :class="[ isDropNav ?  'showDrop' : '']"  v-on:mouseleave="hideDrop()" >
                      
                        

                                  <router-link v-for="(link, index) in links" :key="index" :to="{ name:  link.nameRouter }"  >
                                          <li v-on:click="link.available ? `${link.funcion()}` : '' ">
                                            {{link.nombre}}
                                          </li>
                                    </router-link>

                    

                    </ul>

                  </li>
        </ul>
        <!-- Modal -->
          <div class="modal fade" id="question"  tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
              <div class="modal-content">
                <div class="modal-body">
                  <QuestionDaily />
                </div>
              </div>
            </div>
          </div>
      </div>
</template>

<script>

import { mapGetters } from "vuex";
import { mapState } from "vuex";
import QuestionDaily from "../Student/questions/daily/index";

export default {
  name: "NavBar",
  data() {
    return {
      isDropNav: false,
      vermenu: true,
      link: "",
      name: "",
      interval: {},
      value: 0,
      tooltip: false,
      item: 0,
      photo:localStorage.getItem("photo_user"),
      links: [
        { nombre: 'Mi perfil', nameRouter: 'perfil' },
        { nombre: 'Mis preferencias', nameRouter: 'option-preferences' },
        { nombre: 'Cerrar Sesión', nameRouter: 'Login' , funcion : this.closeSesion , available: true },
      ],
      points:null,
    };
  },
  components:{
    QuestionDaily
    
  },
  computed: {
    // ...mapState(['title','count']),
    ...mapState('sections', {
      //titulo: state => state.title
      titulo: state => state.topSection
    }),

    ...mapState('course',['progressCourseSelect','courseSelect','msjCompletedClass','examDaily']),

    ...mapGetters('course',{
      vuexTitle: "title",
    }),

  },
  mounted() {
    this.desplegar();
    this.showToolTip();
    this.getPoints();
  
  },
  methods: {
    showDrop( f ){
        this.isDropNav = f 
    },
    desplegar() {
      this.vermenu = !this.vermenu;
    },
    closeSesion() {
      localStorage.removeItem("access_token"); 
      localStorage.removeItem('status_user');
      localStorage.removeItem('name_user');  
    },
    hideToolTip(){
        if( this.item == 0 ) {
          this.tooltip = false
          localStorage.setItem('item', 1)
        }
    },
    showToolTip(){
      this.item = localStorage.getItem('item')  || 0

      if( this.item == 0) {
        this.tooltip = true
      }
    },
    hideDrop(){
        this.isDropNav = false
    },
    
  getPoints(){
      this.axios.get(`profile/points/${localStorage.getItem('id_user')}`)
      .then(data =>{
        this.points = data.data.total
      })
      .catch(()=>{})
    },
  },
};

</script>

<style lang="scss" scoped>
$clr-primary: #60d950;
$clr-primary-hover: #fce4ec;
$clr-primary-dark: #ec407a;
$clr-gray150: #f4f6fb;
$clr-gray200: #eef1f6;
$clr-gray300: #e1e5ee;
$clr-gray400: #767b91;
$clr-gray500: #4f546c;
$clr-gray600: #2a324b;
$clr-gray700: #161d34;

/*   border radius */
$radius: 0.2rem;

.showDrop{
  visibility: visible !important;
  opacity: 1 !important;
}
.nav-bar i{
  color: white;
}
.nav-bar a{
  color: #161d34;
  text-decoration: none;
}
.black{
  color: #0b0e18 !important;
}

@media screen and (max-width: 1023px) {
  .nav-bar {
    &__list{
      &logo{
        padding-left: 90px;
      }
    }
  }
}
// Navbar //
.nav-bar {
  z-index: 30;
  background: $clr-primary;
  
  &__list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 1rem;
    
    &logo {
      
      list-style: none;
      margin-right: auto;
      cursor: pointer;
      font-weight: bold;
      font-size: 30px;
      color: rgb(28, 35, 43) ;

      svg {
        width: 2.5rem;
        transition: fill 250ms ease-in;

        &:hover,
        &:focus {
          fill: $clr-primary;
        }
      }
    }

    &item {
      list-style: none;
      position: relative;
      padding: 1.5rem 0.7rem;
      cursor: pointer;

    

      &drop {
        position: absolute;
        top: 1rem;
        right: 0;
        background-color: #ffffff;
        border-radius: $radius;
        display: flex;
        flex-direction: column;
        align-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 200ms ease-in-out;
        font-size: 14px;
        box-shadow: 0 0 2px 2px rgb(224, 224, 224);
       
        
        li {
          display: flex;
          align-items: center;
          list-style: none;
          border-radius: $radius;
          transition: background-color 200ms ease-in-out;
          padding: 0 16px;
          min-height: 48px;
          white-space: nowrap;
          &:hover,
          &:focus {
            background-color: $clr-gray150;
          }
        }
      }
    }
  }

   
}

.tooltip-box{
  position: absolute;
  background: #000000;
  color: #ffffff;
  padding: 8px 15px;
  font-size: 12px;
  z-index: 20;
  top: 60px;
  width: 230px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 2px 2px 2px 2px #000000;
  opacity: 80%;
}
.tooltip-box:hover{
  opacity: 100%;
  transition: 0.3s ease-in;
}
.tooltip-box::after{
  content: "";
  display: block;
  border-bottom: 7px solid #131b1e;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  position: absolute;
  top: -7px;
  left: calc(50% - 7px);

}
.pulse{
    animation: pulse 2s infinite;
}
@keyframes pulse{
  0%{
    color: #ddce00be;
  }
  100%{
    color: #000000;
  }
}
</style>