<template>
  <div>
    <Spinner v-if="lord" />
    <div class="container borde" v-for="items in informacion" :key="items.id">
      <b-card  class="tamaño mb-2">
        <b-card-text>Alumno Del Curos</b-card-text>
        <b-card-text> <img v-bind:src="items.user.photo" alt="" /></b-card-text>
        <b-card-text> {{ items.user.last_name }}</b-card-text>
        <b-card-text> {{ items.user.phone }} </b-card-text>
        <b-card-text> {{ items.user.email }} </b-card-text>
        <b-card-text>
          fecha de nacimineto : {{ items.user.date_birth }}
        </b-card-text>
        <b-card-text>
          modalidad : {{ items.user.account_type.account }}
        </b-card-text>
        <b-card-text>
          precio del curso : {{ items.user.account_type.price }}
        </b-card-text>
        <b-card-text> profesor : {{ items.user.fullName }} </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/auth/Spinner/Spinner.vue'
export default {
  name: "AttributeUser",
  components:{
    Spinner
  },
  data() {
    return {
      payment_id: null,
      informacion: [],
      lord:true
    };
  },

  methods: {
    getAttributes() {
      this.payment_id = this.$route.params.id;
      // console.log(this.payment_id);

      this.axios
        .get("dashboard/saleshistory/" + this.payment_id)
        .then((datos) => {
          this.lord=false
          // console.log(datos.data.data);
          this.informacion = datos.data.data;
        });
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>
<style>
.borde{
  border:1px solid black;
  
}
.tamaño{
 width: 400px;
}  
</style>