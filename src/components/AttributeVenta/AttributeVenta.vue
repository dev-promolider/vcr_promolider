<template>
  <div class="container">
    <Spinner v-if="lord" />

    <div class="row container">
      <div class="contenidos" v-for="item in seleccionar" :key="item.id">
        <b-card
          title="Cursos De Reforzamiento"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-0 emparejar"
        >
          <b-card-text>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              obcaecati minima vero laborum placeat odit quam sapiente, quae
              autem quisquam,.
            </p>
            <p>Empezaste el curso : {{ item.created_at }}</p>
          </b-card-text>

          <b-button class="El_button" href="#" variant="primary"
            >Ver Progreso completo</b-button
          >
        </b-card>

        <b-list-group-item class="cliente">
          
          <span> {{ item.client_name }} {{ item.client_last_name }}</span>
         
      </b-list-group-item>
 
          
            
      </div>
      <button v-on:click="aumentar()" > cargar más cursos</button>
    </div>
    
    <div class="movere">
        <button v-on:click="aumentar()" v-if="prendido" > cargar más cursos</button>

            <div >
  <b-spinner  label="Loading..." v-if="lorde"></b-spinner>
</div>
    </div>

    
  </div>
</template>

<script>
import Spinner from "@/components/auth/Spinner/Spinner.vue";
export default {
  name: "AttributeVenta",
  components: {
    Spinner,
  },
  data() {
    return {
      seleccionar: [],
      lord: true,
      limite:2,
      lorde:false,
      prendido:true
    };
  },

  methods: {
    // getAttributes() {
    //   this.axios.get("dashboard/saleshistory").then((respuesta) => {
    //     this.lord = false;
    //     this.seleccionar = respuesta.data.data;
        // console.log(this.seleccionar);
      getAttributes() {
      this.axios.get("dashboard/saleshistory").then((respuesta) => {
        this.lord = false;
        const array = respuesta.data;
        //  console.log(array);
      
             for(let i=this.seleccionar.length; i<this.limite ; i++){
                
             this.seleccionar.push(array.data[i]) 
             this.lorde = false
           }
        
      });
    },

    aumentar() {
      this.limite += 2;
      this.lorde= true;
      this.prendido=false;
      this.getAttributes();
      
    
    },
    
  },

  created() {
    this.getAttributes();
  },
};
</script>

<style >
.contenidos {
  margin-top: 0px;
  margin-bottom: 35px;
  margin-left: 25px;
}

.cliente {
  width: 100%;
  border-radius: 0px;
  margin-left: 0px;
  text-align: center;
 
}
p {
  text-align: center;
  /* margin-top: 19px; */
}
.El_button {
  margin-left: 45px;
}
span {
  margin-left: 0%;
  font-weight: 700;
}

.movere{
  display: flex;
  margin-left: 400px;
 
}
</style>
