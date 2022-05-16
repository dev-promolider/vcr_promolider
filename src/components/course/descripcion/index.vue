<template>
  <div class="mytabs">
    <ul class="nav nav-tabs d-flex flex-row" id="myTab" role="tablist" >
         
            <li class="nav-item" role="presentation" @click="changeTab(1)" :class="{active: isActive == 1}">
              <a
                class="nav-link text-center"
                id="home-tab"
                data-toggle="tab"
                href="#resumen"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                >Resumen</a
              >
            </li>

            <li class="nav-item " role="presentation" @click="changeTab(2)" :class="{active:isActive == 2}">
              <a
                class="nav-link text-center"
                id="home-tab"
                data-toggle="tab"
                href="#recursos"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                >Recursos</a
              >
            </li>

             <li class="nav-item " role="presentation" @click="changeTab(3)" :class="{active: isActive == 3}">
              <a
                class="nav-link text-center"
                id="home-tab"
                data-toggle="tab"
                href="#pruebas"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                >Pruebas</a
              >
            </li>
            
          </ul>

          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active border-box"
              id="resumen"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
            <div class="mx-4 mt-4">
              <p class="text-justify">
                {{ lesson.description }}
              </p>
            </div>

            </div>
            <div
              class="tab-pane fade border-box"
              id="recursos"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div class="mx-4 mt-4">
                <div v-if="!isResources">
                  <p> Esta clase no tiene recursos ... </p>
                </div>

                <div v-else> 
                  <ul class="list-group list-group-flush" >
                    <li class="list-group-item" v-for="(resource,index) in resources" :key="index">
                      Recurso {{index+1}}.
                      <a class="ml-3 text-decoration-none text-success" @click="downloadResource(resource)"> 
                        <i class="fas fa-download mr-1"></i> {{ getNameResource(resource.resource_file) }}            
                      </a>
                    </li>                              
                  </ul>
                </div>

              </div>
            </div>
            <div
              class="tab-pane fade  border-box"
              id="pruebas"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
            <div class="mt-4" v-if="dataEx===500">
              <p> No existen pruebas... </p>
            </div>
            <div class="mx-4 mt-4" v-else>
              <p class="text-justify">
                  <button @click="Testing"  class="test">Realizar prueba</button>
              </p>
            </div>

            </div>

          </div>
  </div>
</template>

<script>


  import { mapState, mapActions } from 'vuex';

  export default {
    name: "Descripcion",
    data(){
      return{
        isActive: 1
      }
    },
    computed:{
      ...mapState('course',['lesson','resources','isResources','dataEx'])
    },
    methods:{

      ...mapActions('course',{
        getResources: 'getResources',
        getTest: 'getTest'
      }),

      changeTab( el ){
        this.isActive = el

      },

      //Se necesita una funcion para recojer los recursos descargables
      downloadResource(resource){
        this.axios.get(`class-resource/download-resource?id=${resource.id}`,{responseType: "blob"} ).then(
            (res) => {
            var FILE = window.URL.createObjectURL(new Blob([res.data]));

            var docUrl = document.createElement('a');
            docUrl.href = FILE;
            docUrl.setAttribute('download', `${resource.resource_file}`);
            document.body.appendChild(docUrl);
            docUrl.click();
        })
      },
      
      Testing(){

        this.$router.push({name: 'test' , params:{ id: this.examen.data}})
      },

      //Extraer nombre del recurso
      getNameResource(filepath){
        let filenameWithExtension = filepath.replace(/^.*[\\/]/, '');
        return filenameWithExtension;
      },
       

    },
    created(){
      this.getResources(this.$route.query.class)
      this.getTest(this.$route.query.course)
    },
    updated(){
    }

  }
</script>

<style scoped>
.tab-pane{
  width: 100%;
  height: 215px;
  overflow-y: auto ;
}
.tab-pane::-webkit-scrollbar{
  display: none;
}
.nav-item{
  margin-left:25px  !important;
  margin-bottom: 0px !important;
}
.nav-link{
  border: none !important;
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
  width: 161px;
  height: 37px;
  border-bottom: solid #E5E5E5  0.2px !important;
}
.nav-tabs li { 
  /* Makes a horizontal row */
  float: left; 
	
  /* So the psueudo elements can be
     abs. positioned inside */
  position: relative; 
  cursor: pointer;
}
.nav-tabs a { 
  /* Make them block level
     and only as wide as they need */
  float: left; 
  text-decoration: none;
  
  /* Default colors */ 
  color: white;
  background: #C4C4C4; 
  font-size: 18px;
}
.nav-tabs .active {
  /* Highest, active tab is on top */
  z-index: 3;
  pointer-events: none;
}
.nav-tabs .active a { 
  /* Colors when tab is active */
  background: white; 
  color: black; 
}
.nav-tabs .nav-item:before, .nav-tabs .nav-item:after, 
.nav-tabs .nav-link:before, .nav-tabs .nav-link:after {
  /* All pseudo elements are 
     abs. positioned and on bottom */
  position: absolute;
  bottom: 0 ;
}
/* Only the first, last, and active
   tabs need pseudo elements at all */
.nav-tabs .nav-item:after,   .nav-tabs .nav-item a:after,
.nav-tabs .nav-item:before, .nav-tabs .nav-item a:before,
.nav-tabs .active:after,   .nav-tabs .active:before, 
.nav-tabs .active a:after, .nav-tabs .active a:before {
  content: "";
}
.nav-tabs .active:before, .nav-tabs .active:after {
  background: white; 
  
  /* Squares below circles */
  z-index: 1;
}
/* Squares */
.nav-tabs li:before, .nav-tabs li:after {
  background: #C4C4C4;;
  width: 10px;
  height: 10px;
}
.nav-tabs li:before {
  left: -10px;      
}
.nav-tabs li:after { 
  right: -10px;
}
/* Circles */
.nav-tabs li a:after, .nav-tabs li a:before {
  width: 20px; 
  height: 20px;
  /* Circles are circular */
  -webkit-border-radius: 10px;
  -moz-border-radius:    10px;
  border-radius:         10px;
  background: var(--bg-content);
  
  /* Circles over squares */
  z-index: 2;
}
.nav-tabs .active a:after, .nav-tabs .active a:before {
  background: var(--bg-content);
  z-index: 3;
}
/* First and last tabs have different
   outside color needs */
.nav-tabs li a:before {
  left: -20px;
}
.nav-tabs li a:after {
  right: -20px;
}
.test {
  color: rgb(255, 255, 255);
  background-color: #28a745 ;
  padding: 5px 15px;
  margin: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
}
</style>