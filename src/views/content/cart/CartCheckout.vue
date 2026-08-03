<template>
  <div class="tw-min-h-full tw-py-6 tw-px-2 md:tw-px-6">
    <div class="tw-max-w-5xl tw-mx-auto">
      
      <!-- Back navigation link -->
      <div class="tw-mb-6 tw-flex tw-items-center tw-justify-between">
        <button 
          @click="$router.back()" 
          class="tw-inline-flex tw-items-center tw-gap-2 tw-text-slate-400 hover:tw-text-white tw-font-semibold tw-text-sm tw-transition-colors"
        >
          <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Volver a la tienda
        </button>

        <span class="tw-text-slate-400 tw-text-xs md:tw-text-sm tw-flex tw-items-center tw-gap-1.5">
          <svg class="tw-w-4 tw-h-4 tw-text-[#18d600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          Conexión Segura SSL
        </span>
      </div>

      <!-- Main Gateway Card -->
      <div class="tw-bg-[#0F172A] tw-border tw-border-slate-800 tw-rounded-3xl tw-p-6 md:tw-p-10 tw-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        <!-- Header -->
        <div class="tw-flex tw-items-center tw-justify-between tw-pb-6 tw-mb-8 tw-border-b tw-border-slate-800">
          <div class="tw-flex tw-items-center tw-gap-3">
            <div class="tw-w-12 tw-h-12 tw-rounded-2xl tw-bg-[#18d600]/15 tw-border tw-border-[#18d600]/30 tw-flex tw-items-center tw-justify-center">
              <svg class="tw-w-6 tw-h-6 tw-text-[#18d600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
            </div>
            <div>
              <h1 class="tw-text-2xl md:tw-text-3xl tw-font-bold tw-text-white tw-font-outfit mb-0">
                Pasarela de Pago CRM
              </h1>
              <p class="tw-text-slate-400 tw-text-xs md:tw-text-sm mb-0">
                Finaliza la inscripción de los cursos seleccionados en tu carrito
              </p>
            </div>
          </div>

          <span class="tw-bg-slate-800 tw-text-slate-300 tw-text-xs md:tw-text-sm tw-font-semibold tw-px-3 tw-py-1.5 tw-rounded-full tw-border tw-border-slate-700">
            {{ itemCount }} {{ itemCount === 1 ? 'curso' : 'cursos' }}
          </span>
        </div>

        <!-- Empty State -->
        <div v-if="cartItems.length === 0" class="tw-py-16 tw-text-center">
          <div class="tw-w-20 tw-h-20 tw-rounded-full tw-bg-slate-800 tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4">
            <svg class="tw-w-10 tw-h-10 tw-text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h2 class="tw-text-xl tw-font-bold tw-text-white tw-mb-2">Tu carrito está vacío</h2>
          <p class="tw-text-slate-400 tw-text-sm tw-mb-6">
            Añade algunos cursos al carrito para proceder con el pago.
          </p>
          <router-link to="/courses" class="tw-px-6 tw-py-3 tw-bg-[#18d600] hover:tw-bg-[#119e00] tw-text-slate-950 tw-font-bold tw-rounded-xl tw-transition-all tw-inline-block">
            Explorar Cursos
          </router-link>
        </div>

        <!-- Main Form Grid -->
        <div v-else class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-8">
          
          <!-- Left Column: Billing Details & Payment Methods -->
          <div class="lg:tw-col-span-7 tw-space-y-8">
            
            <!-- 1. Billing Country -->
            <div class="tw-bg-[#1E293B] tw-border tw-border-slate-800 tw-rounded-2xl tw-p-6">
              <h3 class="tw-text-lg tw-font-bold tw-text-white tw-font-outfit tw-mb-4 tw-flex tw-items-center tw-gap-2">
                <span class="tw-w-6 tw-h-6 tw-rounded-full tw-bg-[#18d600]/20 tw-text-[#18d600] tw-text-xs tw-flex tw-items-center tw-justify-center">1</span>
                Dirección de facturación
              </h3>

              <div class="tw-space-y-2">
                <label class="tw-text-xs tw-font-semibold tw-text-slate-300 uppercase tw-tracking-wider">
                  País de residencia
                </label>
                <select 
                  v-model="selectedPais" 
                  class="tw-w-full tw-bg-[#0F172A] tw-border tw-border-slate-700 tw-rounded-xl tw-px-4 tw-py-3 tw-text-white tw-font-medium focus:tw-outline-none focus:tw-border-[#18d600]"
                >
                  <option v-for="(c, idx) in countriesList" :key="idx" :value="c.state">
                    {{ c.state }}
                  </option>
                </select>
              </div>
            </div>

            <!-- 2. Payment Method Selector -->
            <div class="tw-bg-[#1E293B] tw-border tw-border-slate-800 tw-rounded-2xl tw-p-6">
              <h3 class="tw-text-lg tw-font-bold tw-text-white tw-font-outfit tw-mb-4 tw-flex tw-items-center tw-gap-2">
                <span class="tw-w-6 tw-h-6 tw-rounded-full tw-bg-[#18d600]/20 tw-text-[#18d600] tw-text-xs tw-flex tw-items-center tw-justify-center">2</span>
                Método de pago
              </h3>

              <!-- Payment Method Cards -->
              <div class="tw-space-y-3">
                
                <!-- Openpay Option -->
                <label 
                  class="tw-flex tw-items-center tw-justify-between tw-p-4 tw-rounded-xl tw-border tw-cursor-pointer tw-transition-all"
                  :class="selectedMethod === 'openpay' ? 'tw-bg-[#18d600]/10 tw-border-[#18d600]' : 'tw-bg-[#0F172A] tw-border-slate-800 hover:tw-border-slate-700'"
                >
                  <div class="tw-flex tw-items-center tw-gap-3">
                    <input type="radio" v-model="selectedMethod" value="openpay" class="tw-accent-[#18d600]" />
                    <div>
                      <span class="tw-text-white tw-font-bold tw-block">Tarjeta de Crédito / Débito (Openpay)</span>
                      <span class="tw-text-slate-400 tw-text-xs">Pago seguro con encriptación SSL mediante Openpay</span>
                    </div>
                  </div>
                  <svg class="tw-w-8 tw-h-8 tw-text-[#18d600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                </label>

                <!-- PayPal Option -->
                <label 
                  class="tw-flex tw-items-center tw-justify-between tw-p-4 tw-rounded-xl tw-border tw-cursor-pointer tw-transition-all"
                  :class="selectedMethod === 'paypal' ? 'tw-bg-[#18d600]/10 tw-border-[#18d600]' : 'tw-bg-[#0F172A] tw-border-slate-800 hover:tw-border-slate-700'"
                >
                  <div class="tw-flex tw-items-center tw-gap-3">
                    <input type="radio" v-model="selectedMethod" value="paypal" class="tw-accent-[#18d600]" />
                    <div>
                      <span class="tw-text-white tw-font-bold tw-block">PayPal</span>
                      <span class="tw-text-slate-400 tw-text-xs">Paga rápidamente con tu cuenta de PayPal</span>
                    </div>
                  </div>
                  <img src="@/components/Buy/imagenes/paypal.svg" width="28" alt="PayPal" />
                </label>

                <!-- Wallet Balance Option -->
                <label 
                  class="tw-flex tw-items-center tw-justify-between tw-p-4 tw-rounded-xl tw-border tw-cursor-pointer tw-transition-all"
                  :class="selectedMethod === 'wallet' ? 'tw-bg-[#18d600]/10 tw-border-[#18d600]' : 'tw-bg-[#0F172A] tw-border-slate-800 hover:tw-border-slate-700'"
                >
                  <div class="tw-flex tw-items-center tw-gap-3">
                    <input type="radio" v-model="selectedMethod" value="wallet" class="tw-accent-[#18d600]" />
                    <div>
                      <span class="tw-text-white tw-font-bold tw-block">Saldo Billetera</span>
                      <span class="tw-text-slate-400 tw-text-xs">Disponible: ${{ saldoTotal.toFixed(2) }} USD</span>
                    </div>
                  </div>
                  <svg class="tw-w-6 tw-h-6 tw-text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a1 1 0 11-2 0 1 1 0 012 0z"></path>
                  </svg>
                </label>

              </div>

              <!-- Extra Info for PayPal -->
              <div v-if="selectedMethod === 'paypal'" class="tw-mt-6 tw-pt-6 tw-border-t tw-border-slate-800">
                <div ref="paypal"></div>
              </div>

              <!-- Extra Info for Wallet -->
              <div v-if="selectedMethod === 'wallet'" class="tw-mt-6 tw-p-4 tw-bg-[#0F172A] tw-rounded-xl tw-border tw-border-slate-800">
                <div class="tw-flex tw-justify-between tw-text-sm tw-mb-2">
                  <span class="tw-text-slate-400">Saldo disponible en billetera:</span>
                  <span class="tw-text-white tw-font-bold">${{ saldoTotal.toFixed(2) }}</span>
                </div>
                <div class="tw-flex tw-justify-between tw-text-sm">
                  <span class="tw-text-slate-400">Total de la orden:</span>
                  <span class="tw-text-[#18d600] tw-font-bold">${{ total.toFixed(2) }}</span>
                </div>
                <p v-if="saldoTotal < total" class="tw-text-red-400 tw-text-xs tw-mt-3 tw-mb-0">
                  ⚠️ Saldo insuficiente en tu billetera. Por favor selecciona otro método de pago.
                </p>
              </div>

            </div>

          </div>

          <!-- Right Column: Order Summary -->
          <div class="lg:tw-col-span-5">
            <div class="tw-bg-[#1E293B] tw-border tw-border-slate-800 tw-rounded-2xl tw-p-6 tw-sticky tw-top-6">
              <h3 class="tw-text-lg tw-font-bold tw-text-white tw-font-outfit tw-mb-4">
                Resumen del pedido
              </h3>

              <!-- Cart Courses Mini List -->
              <div class="tw-space-y-3 tw-mb-6 tw-max-h-60 tw-overflow-y-auto custom-scrollbar">
                <div 
                  v-for="item in cartItems" 
                  :key="item.id"
                  class="tw-flex tw-items-center tw-gap-3 tw-p-3 tw-bg-[#0F172A] tw-rounded-xl tw-border tw-border-slate-800"
                >
                  <img :src="getCover(item)" :alt="item.title" class="tw-w-12 tw-h-12 tw-rounded-lg tw-object-cover tw-shrink-0" @error="onImgError" />
                  <div class="tw-flex-1 tw-min-w-0">
                    <h5 class="tw-text-white tw-font-bold tw-text-sm tw-truncate tw-mb-0">{{ item.title }}</h5>
                    <span class="tw-text-slate-400 tw-text-xs">${{ parseFloat(item.price).toFixed(2) }} × {{ item.quantity }}</span>
                  </div>
                  <span class="tw-text-white tw-font-bold tw-text-sm tw-shrink-0">
                    ${{ (parseFloat(item.price) * item.quantity).toFixed(2) }}
                  </span>
                </div>
              </div>

              <!-- Price Breakdown -->
              <div class="tw-space-y-2.5 tw-pt-4 tw-border-t tw-border-slate-800 tw-mb-6">
                <div class="tw-flex tw-justify-between tw-text-sm">
                  <span class="tw-text-slate-400">Subtotal</span>
                  <span class="tw-text-white tw-font-semibold">${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="tw-flex tw-justify-between tw-text-sm">
                  <span class="tw-text-slate-400">Gastos de emisión</span>
                  <span class="tw-text-white tw-font-semibold">${{ shippingAmount.toFixed(2) }}</span>
                </div>
                <div class="tw-flex tw-justify-between tw-text-sm">
                  <span class="tw-text-slate-400">Impuestos (8%)</span>
                  <span class="tw-text-white tw-font-semibold">${{ taxAmount.toFixed(2) }}</span>
                </div>
                <div class="tw-flex tw-justify-between tw-items-baseline tw-pt-3 tw-border-t tw-border-slate-800">
                  <span class="tw-text-white tw-font-bold tw-text-lg">Total</span>
                  <span class="tw-text-[#18d600] tw-font-extrabold tw-text-2xl">${{ total.toFixed(2) }}</span>
                </div>
              </div>

              <!-- Main Execute Payment Button -->
              <button 
                v-if="selectedMethod !== 'paypal'"
                @click="executePayment"
                :disabled="isProcessing || (selectedMethod === 'wallet' && saldoTotal < total)"
                class="tw-w-full tw-py-4 tw-px-6 tw-bg-[#18d600] hover:tw-bg-[#119e00] tw-text-slate-950 tw-font-bold tw-text-lg tw-rounded-xl tw-shadow-[0_4px_20px_rgba(24,214,0,0.35)] tw-transition-all disabled:tw-opacity-50"
              >
                {{ isProcessing ? 'Procesando Pago...' : (selectedMethod === 'openpay' ? 'Pagar con Openpay' : 'Pagar con Billetera') }}
              </button>

              <p class="tw-text-slate-400 tw-text-xs tw-mt-4 tw-text-center tw-mb-0">
                Al completar la compra aceptas los Términos y Condiciones del Aula Virtual Promolíder.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CartCheckout',
  data() {
    return {
      defaultCover: require('@/assets/background-login.webp'),
      selectedPais: 'Perú',
      countriesList: [
        { state: 'Perú' },
        { state: 'Colombia' },
        { state: 'México' },
        { state: 'Argentina' },
        { state: 'Chile' },
        { state: 'Ecuador' },
        { state: 'España' },
        { state: 'Estados Unidos' },
      ],
      selectedMethod: 'openpay', // 'openpay' | 'paypal' | 'wallet'
      saldoTotal: 0,
      isProcessing: false,
      userId: null,
    };
  },
  computed: {
    ...mapGetters('cart', [
      'cartItems',
      'itemCount',
      'subtotal',
      'taxAmount',
      'shippingAmount',
      'total',
    ]),
  },
  watch: {
    selectedMethod(newVal) {
      if (newVal === 'paypal') {
        this.$nextTick(() => {
          this.initPaypal();
        });
      }
    },
  },
  methods: {
    ...mapActions('cart', [
      'removeFromCart',
      'incrementQty',
      'decrementQty',
      'clearCart',
    ]),

    getCover(item) {
      if (!item.url_portada) return this.defaultCover;
      if (item.url_portada.startsWith('http')) return item.url_portada;
      return 'https://promolider-storage-user.s3-accelerate.amazonaws.com/' + item.url_portada;
    },

    onImgError(e) {
      if (e && e.target) {
        e.target.src = this.defaultCover;
      }
    },

    async getCountries() {
      try {
        const { data } = await this.axios.get('/countries');
        if (data && Array.isArray(data)) {
          this.countriesList = data.map((e) => ({ state: e.name }));
        }
      } catch (e) {
        console.warn('Using default countries list', e);
      }
    },

    async getWalletBalance() {
      try {
        this.userId = localStorage.getItem('id_user');
        if (!this.userId) return;
        const res = await this.axios.get(`/reports/mymovements/${this.userId}`);
        if (res.data && res.data.data) {
          this.saldoTotal = res.data.data.reduce((saldo, transaction) => {
            if (transaction.status === 1 || transaction.status === 0) {
              if (transaction.type === 1) return saldo + transaction.amount;
              if (transaction.type === 0) {
                return (transaction.id_receiver === this.userId)
                  ? saldo + transaction.amount
                  : saldo - transaction.amount;
              }
            }
            return saldo;
          }, 0);
        }
      } catch (e) {
        console.warn('Error fetching wallet balance', e);
      }
    },

    async executePayment() {
      if (this.cartItems.length === 0) return;
      this.isProcessing = true;

      try {
        if (this.selectedMethod === 'openpay') {
          // Openpay Payment Gateway
          const firstCourse = this.cartItems[0];
          const response = await this.axios.post('/pay/course-openpay', {
            course_id: firstCourse.id,
            id_course: firstCourse.id,
            cart_items: this.cartItems,
            total_amount: this.total,
          });

          const paymentUrl = response.data?.payment_url || response.data?.url || response.data?.redirect_url || response.data?.data?.payment_url;

          if (paymentUrl) {
            this.clearCart();
            window.location.href = paymentUrl;
            return;
          }
        } else if (this.selectedMethod === 'wallet') {
          // Saldo Billetera
          if (this.saldoTotal < this.total) {
            if (this.$message) this.$message.error('Saldo insuficiente en billetera');
            return;
          }

          for (const item of this.cartItems) {
            await this.axios.post('course/buy-purchased-course', {
              course_id: item.id,
              user_id: this.userId,
              type_purchase: 2,
            });
          }

          this.clearCart();
          if (this.$message) this.$message.success('¡Compra realizada con saldo de billetera!');
          this.$router.push({ name: 'suscription-user' }).catch(() => {});
          return;
        }

        // Fallback enrollment for free / manual
        for (const item of this.cartItems) {
          try {
            await this.axios.post('/cart/buy-course', { id_course: item.id });
          } catch (e) {
            console.warn(`Enrollment error for item ${item.id}`, e);
          }
        }
        this.clearCart();
        this.$router.push({ name: 'suscription-user' }).catch(() => {});
      } catch (err) {
        console.error('Error during checkout execution', err);
        if (this.$message) this.$message.error('Ocurrió un problema al procesar el pago');
      } finally {
        this.isProcessing = false;
      }
    },

    initPaypal() {
      if (window.paypal && this.$refs.paypal) {
        this.$refs.paypal.innerHTML = '';
        window.paypal.Buttons({
          style: { layout: 'vertical', color: 'gold', shape: 'rect' },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                description: `Compra de ${this.cartItems.length} cursos`,
                amount: { currency_code: 'USD', value: this.total.toFixed(2) },
              }],
            });
          },
          onApprove: async (data, actions) => {
            for (const item of this.cartItems) {
              await this.axios.post('/cart/buy-course', { id_course: item.id });
            }
            this.clearCart();
            await actions.order.capture();
            if (this.$message) this.$message.success('¡Pago con PayPal realizado exitosamente!');
            this.$router.push({ name: 'suscription-user' }).catch(() => {});
          },
        }).render(this.$refs.paypal);
      }
    },
  },

  created() {
    this.getCountries();
    this.getWalletBalance();
  },

  mounted() {
    if (!window.paypal) {
      const script = document.createElement('script');
      const client_id = 'AYOK28eEHBZ3pPlAoSWcvUwO5ke7jzrpz4kteGxTz3bwM1yV21T9jZd4EEEt5KKHjgPjzFxxOXYDm6Fz';
      script.src = `https://www.paypal.com/sdk/js?client-id=${client_id}&components=buttons`;
      document.body.appendChild(script);
    }
  },
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #0F172A;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
</style>
