<template>
 <div id="Attribute">

      <!-- este componente sera para mostrar los atributos del cliente -->

  <!-- <div id="Attribute" class="container"> -->
    <!-- <div class="post" v-for="respuestas in respuesta" :key="respuestas" > -->
      
    <!-- <div class="row justify-content-center">
      <div v-for="item in info" :key="item.id">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">cliente</h5>
              <p class="card-text">
                {{ item.client_name }} {{ item.client_last_name }}
              </p>

              <p class="card-text">curso :{{ item.course }}</p>
              <p class="card-text"> pyment : {{ item.payment_id }}</p>
              <p class="card-text">
                duracion del curso : {{ item.created_at }}
              </p>
              <p class="card-text">
                Precio : {{ item.price }} modalidad : {{ item.client_account }}
              </p>

              <a href="#" class="btn btn-primary">Ver curso</a>
            </div>
          </div>
          
        </div>
      </div>
    </div> -->

    
  </div>
</template>
<script>
export default {
  name: "Attribute",
  data() {
    return {
      // info: [],
    };
  },
  // methods: {
  //   getAttributes() {
    

  //     this.axios.get("dashboard/saleshistory").then((respuesta) => {
  //       this.info = respuesta.data.data;
  //       console.log(this.info);
  //     });
  //   },
  // },
  // created() {
  //   this.getAttributes();
  // },
};
</script>
