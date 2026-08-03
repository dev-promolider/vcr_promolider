<template>
  <div v-if="isCartOpen" class="cart-modal-backdrop" @click.self="closeCart">
    <!-- Main Shopping Cart Modal Card -->
    <div class="cart-modal-container">
      
      <!-- Modal Header -->
      <div class="cart-modal-header">
        <div class="header-title-group">
          <div class="header-icon-badge">
            <svg class="cart-svg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"></path>
            </svg>
          </div>
          <h2 class="cart-main-title">
            Tu Carrito de Compras
          </h2>
        </div>

        <div class="header-right-group">
          <span class="cart-items-counter">
            {{ itemCount }} {{ itemCount === 1 ? 'curso' : 'cursos' }}
          </span>
          <button @click="closeCart" class="cart-close-btn" title="Cerrar">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Body (Scrollable Items List) -->
      <div class="cart-modal-body">
        
        <!-- Empty Cart State -->
        <div v-if="cartItems.length === 0" class="empty-cart-box">
          <div class="empty-cart-icon-wrapper">
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h3 class="empty-cart-title">Tu carrito está vacío</h3>
          <p class="empty-cart-subtitle">
            Añade algunos cursos desde el catálogo para inscribirte o comprarlos juntos.
          </p>
          <button @click="goToMarketplace" class="btn-primary-green">
            Explorar Cursos
          </button>
        </div>

        <!-- Cart Items List -->
        <div v-else class="cart-items-list">
          <div 
            v-for="item in cartItems" 
            :key="item.id"
            class="cart-item-card"
          >
            <!-- Item Thumbnail -->
            <div class="item-cover-wrapper">
              <img 
                :src="getCover(item)" 
                :alt="item.title"
                class="item-cover-img"
                @error="onImgError"
              />
            </div>

            <!-- Item Details -->
            <div class="item-content-wrapper">
              <div class="item-top-row">
                <div class="item-info">
                  <h4 class="item-title">
                    {{ item.title }}
                  </h4>
                  <p class="item-unit-price">
                    ${{ parseFloat(item.price).toFixed(2) }} por curso
                  </p>
                </div>

                <!-- Price Top Right -->
                <span class="item-total-price">
                  ${{ (parseFloat(item.price) * (parseInt(item.quantity) || 1)).toFixed(2) }}
                </span>
              </div>

              <div class="item-bottom-row">
                <!-- Quantity Controls -->
                <div class="qty-pill-container">
                  <button 
                    @click="decrementQty(item.id)"
                    class="qty-btn"
                    :disabled="item.quantity <= 1"
                    title="Disminuir"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                  </button>

                  <span class="qty-number-text">
                    {{ item.quantity }}
                  </span>

                  <button 
                    @click="incrementQty(item.id)"
                    class="qty-btn"
                    title="Aumentar"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>

                <!-- Trash Delete Button -->
                <button 
                  @click="removeItem(item.id)"
                  class="trash-btn"
                  title="Eliminar curso del carrito"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Modal Footer / Order Summary -->
      <div v-if="cartItems.length > 0" class="cart-modal-footer">
        <div class="summary-rows">
          <div class="summary-row">
            <span class="summary-label">Subtotal</span>
            <span class="summary-value">${{ subtotal.toFixed(2) }}</span>
          </div>

          <div class="summary-row">
            <span class="summary-label">Gastos de emisión</span>
            <span class="summary-value">${{ shippingAmount.toFixed(2) }}</span>
          </div>

          <div class="summary-row">
            <span class="summary-label">Impuestos (8%)</span>
            <span class="summary-value">${{ taxAmount.toFixed(2) }}</span>
          </div>

          <div class="summary-total-row">
            <span class="total-label">Total</span>
            <span class="total-amount-highlight">
              ${{ total.toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- Checkout Action Button -->
        <button 
          @click="proceedToCheckout"
          :disabled="isProcessing"
          class="btn-primary-green btn-full-width"
        >
          <span>{{ isProcessing ? 'Procesando...' : (total === 0 ? 'Inscribirme a Todos Gratis' : 'Proceder al Pago') }}</span>
        </button>
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
      'itemCount',
      'subtotal',
      'taxAmount',
      'shippingAmount',
      'total',
    ]),
  },
  methods: {
    ...mapActions('cart', [
      'toggleCart',
      'removeFromCart',
      'incrementQty',
      'decrementQty',
      'clearCart',
    ]),

    closeCart() {
      this.toggleCart(false);
    },

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

    removeItem(id) {
      this.removeFromCart(id);
    },

    goToMarketplace() {
      this.closeCart();
      if (this.$route.name !== 'courses') {
        this.$router.push({ name: 'courses' }).catch(() => {});
      }
    },

    async proceedToCheckout() {
      if (this.cartItems.length === 0) return;

      this.isProcessing = true;
      try {
        const response = await this.axios.post('/pay/course-openpay', {
          cart_items: this.cartItems,
          total_amount: this.total,
        });

        const paymentUrl = response.data?.payment_url || response.data?.url || response.data?.redirect_url || response.data?.data?.payment_url;

        if (paymentUrl) {
          this.clearCart();
          this.closeCart();
          window.location.href = paymentUrl;
          return;
        }

        if (this.$message) {
          this.$message.error('No se pudo obtener la URL de la pasarela de pago');
        }
      } catch (error) {
        console.error('Error al solicitar la pasarela de pago', error);
        if (this.$message) {
          this.$message.error('Ocurrió un problema al conectar con la pasarela de pago');
        }
      } finally {
        this.isProcessing = false;
      }
    },
  },
};
</script>

<style scoped>
/* =========================================================
   SOLID NON-TRANSPARENT BRAND DESIGN SYSTEM (DARK MODE)
========================================================= */

.cart-modal-backdrop {
  position: fixed !important;
  inset: 0 !important;
  z-index: 9999 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 16px !important;
  background-color: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(8px) !important;
}

.cart-modal-container {
  position: relative !important;
  width: 100% !important;
  max-width: 620px !important;
  max-height: 88vh !important;
  background-color: #0F172A !important; /* Solid Slate 900 Background */
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 24px !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7) !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
  animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  color: #FFFFFF !important;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* HEADER */
.cart-modal-header {
  padding: 24px !important;
  background-color: #0B1120 !important; /* Solid Header */
  border-bottom: 1px solid #1E293B !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

.header-title-group {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
}

.header-icon-badge {
  width: 42px !important;
  height: 42px !important;
  border-radius: 14px !important;
  background-color: rgba(24, 214, 0, 0.15) !important;
  border: 1px solid rgba(24, 214, 0, 0.3) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.cart-svg-icon {
  width: 24px !important;
  height: 24px !important;
  color: #18d600 !important;
}

.cart-main-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.35rem !important;
  font-weight: 700 !important;
  color: #FFFFFF !important;
  margin: 0 !important;
}

.header-right-group {
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
}

.cart-items-counter {
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  color: #9CA3AF !important;
}

.cart-close-btn {
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  background-color: #1E293B !important;
  color: #9CA3AF !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.cart-close-btn:hover {
  background-color: #334155 !important;
  color: #FFFFFF !important;
}

/* BODY */
.cart-modal-body {
  padding: 24px !important;
  overflow-y: auto !important;
  flex: 1 !important;
  background-color: #0F172A !important;
}

/* EMPTY STATE */
.empty-cart-box {
  padding: 40px 20px !important;
  text-align: center !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

.empty-cart-icon-wrapper {
  width: 70px !important;
  height: 70px !important;
  border-radius: 50% !important;
  background-color: #1E293B !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #64748B !important;
  margin-bottom: 16px !important;
}

.empty-cart-title {
  font-size: 1.2rem !important;
  font-weight: 700 !important;
  color: #FFFFFF !important;
  margin-bottom: 8px !important;
}

.empty-cart-subtitle {
  font-size: 0.9rem !important;
  color: #9CA3AF !important;
  max-width: 300px !important;
  margin-bottom: 24px !important;
}

/* ITEMS LIST */
.cart-items-list {
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
}

.cart-item-card {
  background-color: #1E293B !important; /* Solid Slate 800 */
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 18px !important;
  padding: 16px !important;
  display: flex !important;
  gap: 16px !important;
  align-items: center !important;
  transition: border-color 0.2s ease !important;
}

.cart-item-card:hover {
  border-color: rgba(24, 214, 0, 0.3) !important;
}

.item-cover-wrapper {
  width: 88px !important;
  height: 88px !important;
  border-radius: 14px !important;
  overflow: hidden !important;
  background-color: #0F172A !important;
  flex-shrink: 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.item-cover-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.item-content-wrapper {
  flex: 1 !important;
  min-width: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
}

.item-top-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 12px !important;
  margin-bottom: 12px !important;
}

.item-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.05rem !important;
  font-weight: 700 !important;
  color: #FFFFFF !important;
  margin: 0 0 4px 0 !important;
  line-height: 1.3 !important;
}

.item-unit-price {
  font-size: 0.85rem !important;
  color: #9CA3AF !important;
  margin: 0 !important;
}

.item-total-price {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.2rem !important;
  font-weight: 700 !important;
  color: #FFFFFF !important;
  flex-shrink: 0 !important;
}

.item-bottom-row {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

.qty-pill-container {
  display: inline-flex !important;
  align-items: center !important;
  gap: 4px !important;
  background-color: #0F172A !important;
  border: 1px solid #334155 !important;
  border-radius: 12px !important;
  padding: 4px !important;
}

.qty-btn {
  width: 28px !important;
  height: 28px !important;
  border-radius: 8px !important;
  background-color: #1E293B !important;
  color: #FFFFFF !important;
  border: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: background-color 0.2s ease !important;
}

.qty-btn:hover:not(:disabled) {
  background-color: #334155 !important;
}

.qty-btn:disabled {
  opacity: 0.3 !important;
  cursor: not-allowed !important;
}

.qty-number-text {
  width: 32px !important;
  text-align: center !important;
  font-weight: 700 !important;
  font-size: 0.9rem !important;
  color: #FFFFFF !important;
}

.trash-btn {
  background-color: rgba(239, 68, 68, 0.1) !important;
  color: #EF4444 !important;
  border: 1px solid rgba(239, 68, 68, 0.2) !important;
  border-radius: 12px !important;
  padding: 8px !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.2s ease !important;
}

.trash-btn:hover {
  background-color: #EF4444 !important;
  color: #FFFFFF !important;
}

/* FOOTER & SUMMARY */
.cart-modal-footer {
  padding: 24px !important;
  background-color: #0B1120 !important; /* Solid Dark Footer */
  border-top: 1px solid #1E293B !important;
}

.summary-rows {
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
  margin-bottom: 20px !important;
}

.summary-row {
  display: flex !important;
  justify-content: space-between !important;
  font-size: 0.95rem !important;
}

.summary-label {
  color: #9CA3AF !important;
}

.summary-value {
  color: #FFFFFF !important;
  font-weight: 600 !important;
}

.summary-total-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: baseline !important;
  padding-top: 14px !important;
  border-top: 1px solid #1E293B !important;
  margin-top: 4px !important;
}

.total-label {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #FFFFFF !important;
}

.total-amount-highlight {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.8rem !important;
  font-weight: 800 !important;
  color: #18d600 !important;
}

.btn-primary-green {
  background-color: #18d600 !important;
  color: #0F172A !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 800 !important;
  font-size: 1.05rem !important;
  padding: 16px 24px !important;
  border-radius: 16px !important;
  border: none !important;
  cursor: pointer !important;
  box-shadow: 0 4px 20px rgba(24, 214, 0, 0.35) !important;
  transition: all 0.2s ease !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.btn-primary-green:hover {
  background-color: #119e00 !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 25px rgba(24, 214, 0, 0.5) !important;
}

.btn-full-width {
  width: 100% !important;
}

/* Custom Scrollbar */
.cart-modal-body::-webkit-scrollbar {
  width: 6px;
}
.cart-modal-body::-webkit-scrollbar-track {
  background: #0F172A;
}
.cart-modal-body::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
</style>
