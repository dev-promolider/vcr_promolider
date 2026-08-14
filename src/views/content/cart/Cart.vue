<template>
  <div class="cart-page-wrapper">
    <h1 class="cart-main-title">Cesta</h1>
    
    <div class="cart-layout">
      <!-- Left Column: Items List -->
      <div class="cart-left-col">
        <h3 class="cart-items-count">{{ itemCount }} {{ itemCount === 1 ? 'curso en la cesta' : 'cursos en la cesta' }}</h3>
        
        <div v-if="cartItems.length === 0" class="cart-empty-message">
          Tu cesta está vacía. Sigue comprando para encontrar un curso.
          <button @click="goToMarketplace" class="cart-keep-shopping-btn">Seguir comprando</button>
        </div>
        
        <div v-else class="cart-full-list">
          <div v-for="item in cartItems" :key="item.id" class="cart-page-item">
            <div class="item-img-container">
              <img :src="getCover(item)" :alt="item.title" class="item-img" @error="onImgError" />
            </div>
            
            <div class="item-info">
              <h4 class="item-title tw-line-clamp-2">{{ item.title }}</h4>
              <p class="item-author" v-if="item.author_name">Por {{ item.author_name }}</p>
            </div>
            
            <div class="item-actions">
              <button @click="removeItem(item.id)" class="item-action-btn">Eliminar</button>
              <button @click="saveForLater(item)" class="item-action-btn">Mover a lista de deseos</button>
            </div>
            
            <div class="item-price-col">
              <span class="item-price">${{ parseFloat(item.price).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column: Summary & Checkout -->
      <div class="cart-right-col" v-if="cartItems.length > 0">
        <div class="cart-summary-box">
          <span class="summary-label">Total:</span>
          <span class="summary-total">${{ subtotal.toFixed(2) }}</span>
          
          <button @click="proceedToCheckout" :disabled="isProcessing" class="summary-checkout-btn">
            {{ isProcessing ? 'Procesando...' : 'Procede a pagar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CartPage',
  data() {
    return {
      defaultCover: require('@/assets/background-login.webp'),
      isProcessing: false,
    };
  },
  computed: {
    ...mapGetters('cart', [
      'cartItems',
      'itemCount',
      'subtotal',
    ]),
  },
  methods: {
    ...mapActions('cart', ['removeFromCart', 'clearCart']),
    ...mapActions('wishlist', ['addToWishlist']),
    getCover(item) {
      if (!item.url_portada) return this.defaultCover;
      if (item.url_portada.startsWith('http')) return item.url_portada;
      return 'https://promolider-storage-user.s3-accelerate.amazonaws.com/' + item.url_portada;
    },
    onImgError(e) {
      if (e && e.target) e.target.src = this.defaultCover;
    },
    removeItem(id) {
      this.removeFromCart(id);
    },
    async saveForLater(item) {
      await this.addToWishlist(item);
      this.removeFromCart(item.id);
      if (this.$message) {
        this.$message.success("Movido a lista de deseos");
      }
    },
    goToMarketplace() {
      this.$router.push({ name: 'courses' }).catch(() => {});
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
.cart-page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  color: var(--text-bold, #111827);
  font-family: 'Outfit', sans-serif;
}

.cart-main-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: var(--text-bold, #111827);
}

.cart-layout {
  display: flex;
  gap: 40px;
  flex-direction: column;
}
@media (min-width: 1024px) {
  .cart-layout {
    flex-direction: row;
    align-items: flex-start;
  }
}

.cart-left-col {
  flex: 1;
}

.cart-right-col {
  width: 100%;
}
@media (min-width: 1024px) {
  .cart-right-col {
    width: 320px;
    position: sticky;
    top: 100px;
  }
}

.cart-items-count {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.cart-empty-message {
  padding: 40px 0;
  font-size: 1.1rem;
  color: var(--text-bold, #111827);
  text-align: left;
}

.cart-keep-shopping-btn {
  display: block;
  margin-top: 16px;
  padding: 12px 24px;
  background-color: var(--text-bold, #111827);
  color: var(--card-bg, #ffffff);
  border: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: opacity 0.2s;
}
.cart-keep-shopping-btn:hover {
  opacity: 0.9;
}

.cart-full-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-page-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 0;
  border-top: 1px solid var(--border-color, #e5e7eb);
}
@media (min-width: 768px) {
  .cart-page-item {
    flex-direction: row;
  }
}

.item-img-container {
  width: 160px;
  height: 90px;
  flex-shrink: 0;
  background-color: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border-color, #e5e7eb);
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.item-author {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  min-width: 140px;
}

.item-action-btn {
  background: none;
  border: none;
  color: #18d600;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.2s;
}
.item-action-btn:hover {
  text-decoration-color: currentColor;
}

.item-price-col {
  min-width: 100px;
  text-align: right;
}

.item-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-bold, #111827);
}

.cart-summary-box {
  background-color: transparent;
  display: flex;
  flex-direction: column;
}

.summary-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 4px;
}

.summary-total {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-bold, #111827);
  margin-bottom: 20px;
}

.summary-checkout-btn {
  width: 100%;
  padding: 16px;
  background-color: var(--text-bold, #111827);
  color: var(--card-bg, #ffffff);
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.summary-checkout-btn:hover:not(:disabled) {
  background-color: #18d600;
  color: #000000;
}
.summary-checkout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
