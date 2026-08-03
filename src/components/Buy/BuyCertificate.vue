<template>
  <div class="tw-bg-gray-100 dark:tw-bg-transparent tw-min-h-screen tw-p-4 md:tw-p-8 lg:tw-p-12">
    <div v-if="paidFor">
      <div class="tw-py-36 tw-flex tw-justify-center">
        <div class="tw-bg-transparent tw-shadow-none tw-text-center">
          <svg class="tw-w-48 tw-h-48 tw-text-green-500 tw-mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 class="tw-text-4xl tw-text-green-500 tw-font-bold tw-mt-4">Gracias!</h1>
          <p class="tw-text-xl tw-mt-2 tw-text-gray-700 dark:tw-text-gray-300">Tu compra ha sido realizada con exito.</p>
          <button @click="$router.push({ name: 'certificado-user' })" class="tw-mt-6 tw-bg-black dark:tw-bg-emerald-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-md hover:tw-bg-gray-800 dark:hover:tw-bg-emerald-700 tw-transition-colors">
            Ir a mis certificados
          </button>
        </div>
      </div>
    </div>
    <div v-else class="tw-bg-white dark:tw-bg-[rgba(22,30,46,0.65)] dark:tw-border dark:tw-border-[rgba(255,255,255,0.08)] dark:tw-text-white tw-rounded-[15px] tw-p-4 md:tw-p-8 tw-shadow-sm">
      <h2 class="tw-text-2xl tw-font-bold tw-mb-8">Pagar</h2>
      <div class="tw-flex tw-flex-wrap tw--mx-4">
        <div class="tw-w-full md:tw-w-2/3 tw-px-4">
          <div>
            <p class="tw-text-xl md:tw-text-2xl tw-font-bold tw-my-6 tw-text-left">Dirección de facturación</p>
            <div class="tw-flex tw-items-center tw-justify-between tw-mb-3 lg:tw-w-5/12">
              <p class="tw-font-bold">País</p>
              <p class="tw-text-gray-500 dark:tw-text-gray-400">Necesario</p>
            </div>
            <div class="tw-border tw-border-gray-900 dark:tw-border-gray-600 tw-py-2 tw-px-3 tw-w-full lg:tw-w-5/12 tw-rounded-lg">
              <select v-model="selectedPais" class="tw-w-full tw-bg-transparent dark:tw-bg-[#161e2e] dark:tw-text-white tw-outline-none">
                <option v-for="state in states" :key="state.state" :value="state.state" class="dark:tw-bg-[#161e2e] dark:tw-text-white">{{ state.state }}</option>
              </select>
            </div>
          </div>

          <div class="tw-my-10">
            <div class="tw-flex tw-justify-between tw-items-end tw-mt-10">
              <p class="tw-text-xl md:tw-text-2xl tw-font-bold">Método de pago</p>
              <p class="tw-text-[0.74rem] tw-flex tw-items-center tw-gap-1">
                Conexión Segura
                <img src="@/components/Buy/imagenes/candado.svg" width="20" alt="Candado" />
              </p>
            </div>
            <div class="tw-mt-4">
              <div class="tw-border tw-border-gray-300 dark:tw-border-gray-700 tw-bg-white dark:tw-bg-[#161e2e] tw-px-4 tw-py-3 md:tw-px-12 md:tw-py-4 tw-rounded-md tw-flex tw-items-center tw-gap-3">
                <input type="radio" v-model="selectedPago" value="A" class="tw-w-4 tw-h-4 tw-accent-green-500" checked />
                <div class="tw-flex tw-items-center tw-gap-2">
                  <img src="@/components/Buy/imagenes/paypal.svg" width="25" alt="Paypal" />
                  <span class="tw-font-bold">Paypal</span>
                </div>
              </div>
              <div class="tw-mt-10">
                <p class="tw-text-xl md:tw-text-2xl tw-font-bold tw-my-6">Resumen del pedido</p>
                <div class="tw-flex tw-items-center">
                  <img :src="certificate.url_portada" class="tw-w-16 tw-h-16 tw-object-cover tw-mr-5 tw-rounded-lg" alt="Portada" />
                  <p class="tw-flex-grow tw-font-bold tw-capitalize">Certificado de {{ certificate.title }}</p>
                  <p class="tw-font-bold">${{ finalPrice }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tw-w-full md:tw-w-1/3 tw-px-4">
          <p class="tw-text-xl md:tw-text-2xl tw-font-bold tw-my-6">Resumen</p>
          <div class="tw-flex tw-justify-between">
            <p>Precio original:</p>
            <p>${{ certificatePrice }}</p>
          </div>
          <hr class="tw-my-4 tw-border-gray-300" />
          <div class="tw-flex tw-justify-between tw-font-bold tw-text-lg">
            <p>Total:</p>
            <p>${{ finalPrice }}</p>
          </div>
          <div class="tw-mt-6 tw-relative tw-z-10">
            <div ref="paypal"></div>
          </div>
          <p class="tw-text-sm tw-text-gray-500 tw-mt-4">
            Al completar la compra, aceptas <span>Condiciones de uso.</span>
          </p>
          <p class="tw-text-sm tw-text-gray-500 tw-mt-2">
            PROMOLIDER está obligado por ley a recaudar los impuestos sobre las transacciones de las compras realizadas en determinadas jurisdicciones discales.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BuyCertificate",

  data() {
    return {
      selectedPago: "A",
      selectedPais: "Perú",
      states: [],
      loaded: false,
      paidFor: false,
      certificate: [],
      certificateDisc: 0,
      finalPrice: 0,
      certificatePrice: 0,
    };
  },

  methods: {
    getCertificate() {
      this.axios
        .get(
          `/course/certificate/data?course_id=${this.$route.params.courseId}`
        )
        .then((datos) => {
          this.certificate = datos.data;
          this.certificatePrice = datos.data.data.certificate_price;
        });
    },
    getDiscount() {
      this.spin = true;
      this.axios.get("/course/certificate-discount").then((datos) => {
        this.certificateDisc = datos.data;
        this.calcDiscount(this.certificate.data.certificate_price);
      });
    },

    calcDiscount(price) {
      var disc = price * (this.certificateDisc / 100);
      this.finalPrice = price - disc;
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
                  description: this.certificate.title,
                  amount: {
                    currency_code: "USD",
                    value: this.finalPrice,
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            const id = this.certificate.id;
            const axios = this.axios;
            this.paidFor = true;

            return axios
              .post("/cart/buy-certificate", { id_course: id })
              .then(function () {
                return actions.order.capture().then(function () { });
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
    async getCountries() {
      const { data } = await this.axios.get("/countries");
      this.states = data.map((e) => {
        return { state: e.name };
      });
    },
  },
  created() {
    this.getCountries();
  },
  mounted() {
    this.getCertificate();
    this.getDiscount();
    const script = document.createElement("script");
    const client_id =
      "AYOK28eEHBZ3pPlAoSWcvUwO5ke7jzrpz4kteGxTz3bwM1yV21T9jZd4EEEt5KKHjgPjzFxxOXYDm6Fz";
    script.src = `https://www.paypal.com/sdk/js?client-id=${client_id}&components=buttons`;
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
};
</script>
