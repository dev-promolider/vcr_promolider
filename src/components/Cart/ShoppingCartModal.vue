<template>
  <div v-show="isCartOpen" class="cart-dropdown-container">
    <div class="cart-minimal-dropdown">
      
      <!-- Empty State -->
      <div v-if="cartItems.length === 0" class="cart-empty-state">
        <p class="tw-text-sm tw-text-gray-500 tw-text-center tw-py-4">Tu carrito está vacío.</p>
        <button @click="goToMarketplace" class="cart-link-btn">Seguir comprando</button>
      </div>

      <!-- Items List -->
      <div v-else class="cart-items-list">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="cart-item-img-container">
            <img :src="getCover(item)" :alt="item.title" class="cart-item-img" @error="onImgError" />
          </div>
          
          <div class="cart-item-details">
            <h4 class="cart-item-title tw-line-clamp-2">{{ item.title }}</h4>
            <p class="cart-item-author" v-if="item.author_name">{{ item.author_name }}</p>
            <div class="cart-item-price-row">
              <span class="cart-item-price">${{ parseFloat(item.price).toFixed(2) }}</span>
            </div>
          </div>
          
        </div>
      </div>

      <!-- Footer (Total and Checkout) -->
      <div v-if="cartItems.length > 0" class="cart-footer">
        <div class="cart-total-row">
          <span class="cart-total-label">Total:</span>
          <span class="cart-total-value">${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="cart-buttons-row">
          <button @click="goToCartPage" class="cart-secondary-btn">Ir a la cesta</button>
          <button @click="proceedToCheckout" :disabled="isProcessing" class="cart-checkout-btn">
            {{ isProcessing ? 'Procesando...' : 'Proceder al Pago' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ShoppingCartModal',
  data() {
    return {
      defaultCover: require('@/assets/background-login.webp'),
      isProcessing: false,
    };
  },
  computed: {
    ...mapGetters('cart', [
      'cartItems',
      'isCartOpen',
      'subtotal', // We use subtotal directly as total, bypassing fees/taxes logic for courses
    ]),
  },
  methods: {
    ...mapActions('cart', ['toggleCart', 'removeFromCart', 'clearCart']),
    closeCart() { this.toggleCart(false); },
    getCover(item) {
      if (!item.url_portada) return this.defaultCover;
      if (item.url_portada.startsWith('http')) return item.url_portada;
      return 'https://promolider-storage-user.s3-accelerate.amazonaws.com/' + item.url_portada;
    },
    onImgError(e) { if (e && e.target) e.target.src = this.defaultCover; },
    goToMarketplace() {
      this.closeCart();
      if (this.$route.name !== 'courses') {
        this.$router.push({ name: 'courses' }).catch(() => {});
      }
    },
    goToCartPage() {
      this.closeCart();
      if (this.$route.name !== 'cart') {
        this.$router.push({ name: 'cart' }).catch(() => {});
      }
    },
    async proceedToCheckout() {
      if (this.cartItems.length === 0) return;
      this.isProcessing = true;
      try {
        const response = await this.axios.post('/pay/course-openpay', {
          cart_items: this.cartItems,
          total_amount: this.subtotal,
        });
        const paymentUrl = response.data?.payment_url || response.data?.url || response.data?.redirect_url || response.data?.data?.payment_url;
        if (paymentUrl) {
          this.clearCart();
          this.closeCart();
          window.location.href = paymentUrl;
          return;
        }
        if (this.$message) this.$message.error('No se pudo obtener la URL de la pasarela de pago');
      } catch (error) {
        if (this.$message) this.$message.error('Ocurrió un problema al conectar con la pasarela de pago');
      } finally {
        this.isProcessing = false;
      }
    },
  },
};
</script>

<style scoped>
.cart-minimal-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 320px;
  background-color: var(--bg-main, #1e293b);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  color: var(--text-bold, #111827);
}

.cart-empty-state {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-link-btn {
  color: #18d600;
  font-weight: 600;
  font-size: 0.9rem;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 8px;
}

.cart-items-list {
  max-height: 220px;
  overflow-y: auto;
}

.cart-items-list::-webkit-scrollbar { width: 4px; }
.cart-items-list::-webkit-scrollbar-track { background: transparent; }
.cart-items-list::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

.cart-item {
  display: flex;
  padding: 16px;
  gap: 12px;
  border-bottom: 1px solid var(--border-color, #f1f5f9);
  transition: background-color 0.2s;
  position: relative;
}

.cart-item:hover {
  /* Hover effect removed per request */
}

.cart-item-img-container {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f1f5f9;
}

.cart-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cart-item-title {
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  line-height: 1.2;
  color: var(--text-bold, #111827);
  padding-right: 20px; /* space for trash */
}

.cart-item-author {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0 0 4px 0;
}

.cart-item-price {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-bold, #111827);
}

.cart-footer {
  padding: 16px;
  background-color: var(--card-bg, #ffffff);
}

.cart-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.cart-total-label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-bold, #111827);
}

.cart-total-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-bold, #111827);
}

.cart-buttons-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-secondary-btn {
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: var(--text-bold, #111827);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}
.cart-secondary-btn:hover {
  background-color: #18d600;
  color: #000000;
  border-color: #18d600;
}

.cart-checkout-btn {
  width: 100%;
  padding: 12px;
  background-color: var(--text-bold, #111827);
  color: var(--card-bg, #ffffff);
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.cart-checkout-btn:hover:not(:disabled) {
  background-color: #18d600;
  color: #000000;
}
.cart-checkout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
