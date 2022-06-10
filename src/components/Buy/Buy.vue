<template>
  <div class="div-pagar">
    <h3 class="mb-5"><strong>Pagar</strong></h3>

    <div class="row">
      <div class="col-md-8">
        <div>
          <p class="subt my-5 text-start">
            <strong>Direccion de facturacion</strong>
          </p>
          <div class="d-flex">
            <p class="text-start flex-grow-1">Pais</p>
            <p class="">Necesario</p>
          </div>
          <div class="d-flex">
            <img src="@/components/Buy/imagenes/mundo.svg" width="30" alt="" />
            <b-form-select v-model="selectedPais" :options="options">
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select an option --</b-form-select-option
                >
              </template>
            </b-form-select>
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
            <p class="">Coneccion Segura</p>
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
                    <div class="m-0 subt">
                      <img
                        src="@/components/Buy/imagenes/tarjeta.svg"
                        width="25"
                        alt=""
                      />
                      Tarjera de credito/debito
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
                    Paypal
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
          <p class="">S/.Price</p>
        </div>
        <hr />
        <div class="d-flex">
          <p class="text-start flex-grow-1"><strong>Total:</strong></p>
          <p class=""><strong>S/.Price</strong></p>
        </div>
        <button class="btn btn-success w-100 p-3 my-2">Completar pago</button>
        <p class="text-start mt-1">
          Al completar la compra, aceptas Condiciones de uso.
        </p>
        <p class="text-start">
          PROMOLIDER esta obligado por ley a recaudar los impuestos sobre las
          transacciones de las compras realizadas en determinadas juridicciones
          discales.
        </p>
      </div>
    </div>

    <div class="col-md-8">
      <p class="subt text-start my-5"><strong>Resumen del pedido</strong></p>
      <div class="d-flex">
        <p class="text-start flex-grow-1">Curso Name</p>
        <p class="">S/.Price</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Buy",
  data: function () {
    return {
      selectedPago: null,
      selectedPais: null,
      options: [
        { value: "A", text: "Peru" },
        { value: "B", text: "Venezuela" },
      ],
    };
  },
};
</script>
<style scoped>
.div-pagar {
  padding: 3% 2% 10% 2%;
  border: 1px solid #000;
  border-radius: 15px;
}
.subt {
  font-size: 20px;
}
.imgs {
}
@media screen and (max-width: 400px) {
  .subt {
    font-size: 15px;
  }
}
</style>
