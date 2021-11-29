<template>
  <div id="ClienteVenta">
    <!-- <div  class="cliente" v-for="item in info" :key="item.id" > -->
      
     <b-list-group v-for="item in info" :key="item.id" style="max-width: 500px;">
     
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="info" src="https://placekitten.com/300/300" class="mr-3"></b-avatar>
        <span class="mr-auto">{{item.client_last_name}} {{item.client_name}}</span>
        <b-badge>{{item.course}}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "ClienteVenta",
  data() {
    return{
           info: [],
           
    };
  },
  methods: {
    getAttributes() {
    

      this.axios.get("dashboard/saleshistory").then((respuesta) => {
        this.info = respuesta.data.data;
       
      });
    },
  },
   created() {
    this.getAttributes();
  },
  
};
</script>
<style >
 .cliente{
   margin:15px;
 }
</style>
