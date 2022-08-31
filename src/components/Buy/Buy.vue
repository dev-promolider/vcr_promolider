<template>
  <div class="bg-light">
    <div v-if="paidFor">
      <div style="padding: 150px 0">
        <v-card class="elevation-0" color="transparent">
          <v-row justify="center" class="text-center">
            <v-icon color="green" size="200"> mdi-check-circle-outline </v-icon>
            <v-card-text class="h1 text-success"> Gracias! </v-card-text>
            <v-card-text class="h5">
              Tu compra ha sido realizada con exito.
            </v-card-text>
            <v-btn
              color="#000000"
              class="text-white"
              @click="$router.push({ name: 'suscription-user' })"
            >
              Ir a mi aprendizaje
            </v-btn>
          </v-row>
        </v-card>
      </div>
    </div>
    <div v-else class="div-pagar">
      <h2 class="mb-5"><strong>Pagar</strong></h2>

      <div class="row">
        <div class="col-md-8">
          <div>
            <p class="subt my-5 text-start">
              <strong>Dirección de facturación</strong>
            </p>
            <div
              class="d-flex m-0 pb-0 px-0"
              :class="[!this.$vuetify.breakpoint.xs && 'col-5']"
            >
              <p class="text-start flex-grow-1 mb-3 font-weight-bold">País</p>
              <p class="mb-3 text-secondary">Necesario</p>
            </div>
            <div
              class="col-5 py-2 px-3 m-0 border border-dark"
              :class="[this.$vuetify.breakpoint.xs && 'w-full']"
            >
              <v-select
                solo
                flat
                background-color="transparent"
                v-model="selectedPais"
                :items="states"
                item-text="state"
                label="Select"
                hide-details
                prepend-icon="mdi-earth"
                single-line
                class="m-0 p-0"
                outline
              ></v-select>
            </div>
          </div>

          <div class="my-5">
            <div class="d-flex">
              <p class="subt text-start flex-grow-1 mt-5">
                <strong>Método de pago</strong>
              </p>
              <p class="mt-5" style="font-size: 0.74rem">
                Conexión Segura
                <img
                  src="@/components/Buy/imagenes/candado.svg"
                  width="20"
                  alt=""
                />
              </p>
            </div>
            <div>
              <div>
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio
                    style="padding: 15px 50px"
                    v-model="selectedPago"
                    :aria-describedby="ariaDescribedby"
                    name="some-radios"
                    value="A"
                    class="border bg-white"
                    checked="true"
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
                <div class="col-md-12">
                  <p class="subt text-start my-5">
                    <strong>Resumen del pedido</strong>
                  </p>
                  <div class="d-flex align-items-center">
                    <v-avatar rounded="0" class="mr-5">
                      <v-img :src="itemCouse.url_portada"> </v-img>
                    </v-avatar>
                    <p class="text-start flex-grow-1 text-capitalize">
                      <strong>{{ itemCouse.title }}</strong>
                    </p>
                    <p class="">${{ itemCouse.price_with_discount }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <p class="subt my-5 text-start"><strong>Resumen</strong></p>
          <div class="d-flex">
            <p class="text-start flex-grow-1">Precio original:</p>
            <p class="">${{ itemCouse.price_with_discount }}</p>
          </div>
          <hr />
          <div class="d-flex">
            <p class="text-start flex-grow-1"><strong>Total:</strong></p>
            <p class="">
              <strong>${{ itemCouse.price_with_discount }}</strong>
            </p>
          </div>
          <div>
            <div ref="paypal"></div>
          </div>
          <p class="text-start mt-1 subtitle-2 text-secondary">
            Al completar la compra, aceptas <span>Condiciones de uso.</span>
          </p>
          <p class="text-start subtitle-2 text-secondary">
            PROMOLIDER está obligado por ley a recaudar los impuestos sobre las
            transacciones de las compras realizadas en determinadas
            jurisdicciones discales.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Buy",

  data() {
    return {
      id_course: this.$route.params.ide,
      itemCouse: {},
      selectedPago: "A",
      selectedPais: "Perú",
      states: [],
      loaded: false,
      paidFor: false,
    };
  },

  methods: {
    getDatosCourse() {
      this.axios.get("/course/details/" + this.id_course).then((res) => {
        this.itemCouse = res.data.data[0];
      });
    },
    setLoaded() {
      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
            tagline: "false",
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.itemCouse.title,
                  amount: {
                    currency_code: "USD",
                    value: this.itemCouse.price_with_discount,
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            const id = this.id_course;
            const axios = this.axios;
            this.paidFor = true;

            return axios
              .post("/cart/buy-course", { id_course: id })
              .then(function () {
                return actions.order.capture().then(function () {});
              })
              .catch((err) => {
                console.log(err);
              });
          },
          onError: function (err) {
            throw new Error(err);
          },
        })
        .render(this.$refs.paypal);
    },
    async isCourseBougth(id_course) {
      if (!id_course) return;

      const { data } = await this.axios("course/purchased-courses");
      const isPurchased = data.data.find((e) => e.id == id_course);

      if (!isPurchased) return;
      this.$router.push({ name: "home" });
    },
    async getCountries() {
      const { data } = await this.axios.get("/countries");
      this.states = data.map((e) => {
        return { state: e.name };
      });
    },
  },
  created() {
    this.getCountries();
    this.isCourseBougth(this.$route.params.ide);
    this.getDatosCourse();
  },
  mounted() {
    const script = document.createElement("script");
    // script.src ="https://www.paypal.com/sdk/js?client-id=AYOK28eEHBZ3pPlAoSWcvUwO5ke7jzrpz4kteGxTz3bwM1yV21T9jZd4EEEt5KKHjgPjzFxxOXYDm6Fz&components=buttons"
    const client_id = "AYOK28eEHBZ3pPlAoSWcvUwO5ke7jzrpz4kteGxTz3bwM1yV21T9jZd4EEEt5KKHjgPjzFxxOXYDm6Fz";
    script.src = `https://www.paypal.com/sdk/js?client-id=${client_id}&components=buttons`;
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
};
</script>
<style scoped>
.div-pagar {
  padding: 10px 2% 20px 2%;
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
.w-full {
  max-width: 100% !important;
}
.paypal-buttons > iframe {
  z-index: 10 !important;
}
</style>
