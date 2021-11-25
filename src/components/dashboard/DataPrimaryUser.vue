
 <template>
  <div class="contenedor mt-4 ">

   
     <ul class="d-flex">

      <li class="one" > <p>{{ courses }} </p> 
      <p> Cursos</p>
      </li>
      <li> 
        <p>S/.{{ payment }} </p>
        <p> Ventas</p>
         </li>
      <li> 
        <p>Plan </p>
        <p>{{ typePlans }}</p>
         </li>
      <li class="four"> <p>{{ affilates }}</p> 
        <p>Afiliado</p>
      </li>
    </ul> 
  </div>
</template>
<script>
export default {
  name: "DataPrimaryUser",
  data() {
    return {
      courses: 0,
      payment: 0,
      typePlans: "",
      affilates: 0,
    };

    
  },
  methods: {
    getAttributes() {
      this.axios.get("dashboard/getattributes").then((r) => {
        const rs = r.data.data;
        this.courses = rs.totalCourses  ;
        this.payment = Math.round(rs.totalPayments) ;
        this.typePlans = rs.accountType;
        this.affilates = rs.totalClients;
        //  console.log(r);
        
        
      });

      //UNICA MODIFICACION

        // añadi la api y un for each para recorrer el arreglo
      this.axios.get("dashboard/saleshistory").then((response)=>{
           const respuesta = response.data.data;
           console.log(respuesta.client_last_name);
          respuesta.forEach( nombre =>{
              console.log(nombre.course)
            
          })
		
       })
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>
<style scoped>
 /* ul{
  display: flex;
  margin: 2%;
  */
 .contenedor{
   width: 100%;
  
   display: flex;
    justify-content: center;   
   
 }
 ul{
   
   width: 80%;
   justify-content: space-between;
   padding: 0px;
   
 }
  li{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
     background: rgb(253, 253, 253);
     text-align: center;
     color:black;
     width: 50%;
     list-style: none;
     padding: 5%;
     flex-grow: 1;
   
     border: 0.5px solid rgb(236, 236, 236);
  
     
  }  
  .one{
    border-radius: 15px 0px 0px 15px;
    background: rgb(120, 202, 38);
    
  }
  .four{
    border-radius: 0px 15px 15px 0px;
  }
 
</style>>
  

 }
  li{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
     background: rgb(253, 253, 253);
     text-align: center;
     color:black;
     width: 50%;
     list-style: none;
     padding: 5%;
     flex-grow: 1;
   
     border: 0.5px solid rgb(236, 236, 236);
  
     
  }  
  .one{
    border-radius: 15px 0px 0px 15px;
    background: rgb(120, 202, 38);
    
  }
  .four{
    border-radius: 0px 15px 15px 0px;
  }
 