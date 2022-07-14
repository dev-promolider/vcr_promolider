<template>
    <div> 
        <div class="" >
           <!--
           <div class="position-relative moveras shadow p-3 mb-5 bg-white" v-for="items in certificado" :key="items.id" >    
                <p class="text-dark display-4 font-weight-bold">Certificado de finalización</p>
                <div class="ml-5 mr-5 mt-5 px-3">
                     
                <p class="text-dark text-center px-5 ">Este documento certifica que <strong>{{nombre}} {{apellido}}</strong> a completado con exito  <strong> {{items.courses[0].course_time}}  </strong>  horas del curso en línea <strong>{{items.courses[0].title}} </strong> {{items.completed_date}}</p>
                </div>
               
               <div class="container ">
                   <hr class="w-50 mb-0 mt-5">
                   <p >David Ernesto Bojorge Sequera, Instructor</p>
               </div>
           </div>-->
           <div class="row justify-content-center" >
                <div id="template" >
                    <div v-if="certificate" v-html="certificate.certificate" >                           
                    </div>
                </div>
           </div>
           <div class="row justify-content-center" >
                <button class="btn btn-outline-success mb-2 mt-5" @click="createPDF" >Descargar certificado</button>
           </div>
        </div>
    </div>
</template>

<script>
import html2pdf from "html2pdf.js";
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
    props: {
        certificate: {
        type: Object,
        },
    },
    mounted() {  
    },
    methods: {
        async createPDF(){
            let template = document.getElementById('template');
            
            html2pdf().from(template).set({
                //margin:       [0, 1 , 0, 0],
                filename: 'certificate.pdf',
                image: { type: "png", quality: 0.98 },
                html2canvas: { dpi: 192, letterRendering: true, useCORS: true },
                jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
            }).save();
        },
    },
    created() {
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
    border: 2px solid #35424a;
}
</style>