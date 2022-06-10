<template>
  <div class="div-pagar">
    <h3 class="mb-5"><strong>Pagar</strong></h3>

    <div class="row">
      <div class="col-md-8 ">
        <div>
          <p class="subt my-5 text-start">
            <strong>Direccion de facturacion</strong>
          </p>
          <div class="d-flex">
            <p class="text-start flex-grow-1">Pais</p>
            <p class="">Necesario</p>
          </div>
          <div class="col-5 py-2 px-3 m-0 border border-dark">
           <v-select
          v-model="selectedPais"
          :items="states"
          menu-props="auto"
          label="Select"
          hide-details
          prepend-icon="mdi-map"
          single-line
          class="m-0 p-0"
        ></v-select>
          </div>
          <div>
            Selected: <strong>{{ selectedPais }}</strong>
          </div>
        </div>

        <div class="my-5">
          <div class="d-flex">
            <p class="subt text-start flex-grow-1">
              <strong>Metodo de pago</strong>
            </p>
            <p class="">Coneccion Segura <img src="@/components/Buy/imagenes/candado.svg" width="25" alt=""></p>
          </div>
          <div>
            <div>
              <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio
                  v-model="selectedPago"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  value="A"
                  class="border bg-white"
                >
                  <div class="d-flex">
                    <div class="m-0">
                      <img
                        src="@/components/Buy/imagenes/tarjeta.svg"
                        width="25"
                        alt=""
                      />
                      <strong>Tarjera de credito/debito</strong>
                    </div>
                  </div>
                </b-form-radio>
                <b-form-radio
                  v-model="selectedPago"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  value="B"
                  class="border bg-white"
                >
                  <p class="m-0">
                    <img
                      src="@/components/Buy/imagenes/paypal.svg"
                      width="25"
                      alt=""
                    />
                    <strong>Paypal</strong>
                  </p>
                </b-form-radio>
              </b-form-group>
              <div>
                Selected: <strong>{{ selectedPago }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <p class="subt my-5 text-start"><strong>Resumen</strong></p>
        <div class="d-flex">
          <p class="text-start flex-grow-1">Precio original:</p>
          <p class="">S/.{{itemCouse.price}}</p>
        </div>
        <hr />
        <div class="d-flex">
          <p class="text-start flex-grow-1"><strong>Total:</strong></p>
          <p class=""><strong>S/.{{itemCouse.price}}</strong></p>
        </div>
        <button class="btn btn-success w-100 p-3 my-2"><strong>Completar pago</strong></button>
        <p class="text-start mt-1">
          Al completar la compra, aceptas Condiciones de uso.
        </p>
        <p class="text-start ">
          PROMOLIDER esta obligado por ley a recaudar los impuestos sobre las
          transacciones de las compras realizadas en determinadas juridicciones
          discales.
        </p>
      </div>
    </div>

    <div class="col-md-8">
      <p class="subt text-start my-5"><strong>Resumen del pedido</strong></p>
      <div class="d-flex">
        <p class="text-start flex-grow-1"><strong>{{itemCouse.title}}</strong></p>
        <p class="">S/.{{itemCouse.price}}</p>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: "Buy",
  
  data() {
    return {
      pao_id: this.$route.params.ide,
      itemCouse:{},
      selectedPago: null,
      selectedPais: 'Peru',
      states: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
          'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
          'Oklahoma', 'Oregon', 'Palau', 'Peru', 'Pennsylvania', 'Puerto Rico',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
          'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
        ],
    };
  },
 
  methods: {
    
    getDatosCourse() {
      this.axios.get("/course/details/" + this.pao_id)
      .then((res) =>{
        this.itemCouse=res.data.data[0]
      })
    }
  },
  created(){
    this.getDatosCourse();
  },
};
</script>
<style scoped>
.div-pagar {
  padding: 3% 2% 10% 2%;
  border-radius: 15px;
}
.subt {
  font-size: 1.5em;
}

@media screen and (max-width: 400px) {
  .subt {
    font-size: 1em;
  }
}
</style>
