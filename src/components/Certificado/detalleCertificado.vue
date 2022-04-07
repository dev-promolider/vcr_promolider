<template>
    <div> 
        <div class="container " >
           
           <div class="position-relative moveras shadow p-3 mb-5 bg-white" v-for="items in certificado" :key="items.id" >

            
                <p class="text-dark display-4 font-weight-bold">Certificado de finalización</p>
                <div class="ml-5 mr-5 mt-5 px-3">
                     
                <p class="text-dark text-center px-5 ">Este documento certifica que <strong>{{nombre}} {{apellido}}</strong> a completado con exito  <strong> {{items.courses[0].course_time}}  </strong>  horas del curso en línea <strong>{{items.courses[0].title}} </strong> {{items.completed_date}}</p>
                </div>
               
               <div class="container ">
                   <hr class="w-50 mb-0 mt-5">
                   <p >David Ernesto Bojorge Sequera, Instructor</p>
               </div>
            

           </div>
        


        </div>
     
    </div>
</template>

<script>
export default {
    name: 'VirtualClassroomDetallecertificado',

    data() {
        return {
            informacion:[],
            certificado:[],
            cursos:[],
            nombre:'',
            apellido:''


        };
    },

    mounted() {
        
    },

    methods: {
        getAttributes() {
     this.axios.get("/purchased/certificate-data").then((datos) => {
       
         this.informacion =datos.data.data;
         this.nombre = this.informacion.name;
         this.apellido = this.informacion.last_namee;
          this.certificado = this.informacion.purchaseds;
        
        
        console.log(this.cursos)
        });
  },
    },
    created() {
  this.getAttributes();
},
};
</script>

<style lang="scss" scoped>
  .moveras{
    margin-right:auto;
    margin-left:auto;
    margin-top:4%;
    width: 70%;
    height: 85%;
    background: rgb(241, 241, 241);
    padding-top:5%;
    border-radius: 20px 20px 10px 20px;
    border: 2px solid rgb(197, 197, 197);
}
</style>