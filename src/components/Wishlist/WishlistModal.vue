<template>
  <div v-show="isWishlistOpen" class="wishlist-dropdown-container">
    <div class="wishlist-minimal-dropdown">
      
      <!-- Empty State -->
      <div v-if="wishlistItems.length === 0" class="wishlist-empty-state">
        <p class="tw-text-sm tw-text-gray-500 tw-text-center tw-py-4">Tu lista de deseos está vacía.</p>
        <button @click="goToMarketplace" class="wishlist-link-btn">Explorar cursos</button>
      </div>

      <!-- Items List -->
      <div v-else class="wishlist-items-list">
        <div v-for="item in wishlistItems" :key="item.id" class="wishlist-item">
          <div class="wishlist-item-img-container">
            <img :src="getCover(item)" :alt="item.title" class="wishlist-item-img" @error="onImgError" />
          </div>
          
          <div class="wishlist-item-details">
            <h4 class="wishlist-item-title tw-line-clamp-2">{{ item.title }}</h4>
            <div class="wishlist-item-price-row">
              <span class="wishlist-item-price">${{ parseFloat(item.price || 0).toFixed(2) }}</span>
            </div>
            <!-- Actions -->
            <div class="wishlist-actions tw-mt-1">
              <button @click="moveToCart(item)" class="wishlist-action-btn">Añadir a la cesta</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="wishlistItems.length > 0" class="wishlist-footer">
        <div class="wishlist-buttons-row">
          <button @click="goToWishlistPage" class="wishlist-checkout-btn">Ir a la lista de deseos</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'WishlistModal',
  data() {
    return {
      defaultCover: require('@/assets/background-login.webp'),
    };
  },
  computed: {
    ...mapGetters('wishlist', [
      'wishlistItems',
      'isWishlistOpen',
    ]),
  },
  methods: {
    ...mapActions('wishlist', ['toggleWishlist', 'removeFromWishlist']),
    ...mapActions('cart', ['addToCart']),
    
    closeWishlist() { this.toggleWishlist(false); },
    getCover(item) {
      if (!item.url_portada) return this.defaultCover;
      if (item.url_portada.startsWith('http')) return item.url_portada;
      return 'https://promolider-storage-user.s3-accelerate.amazonaws.com/' + item.url_portada;
    },
    onImgError(e) { if (e && e.target) e.target.src = this.defaultCover; },
    goToMarketplace() {
      this.closeWishlist();
      if (this.$route.name !== 'courses') {
        this.$router.push({ name: 'courses' }).catch(() => {});
      }
    },
    goToWishlistPage() {
      this.closeWishlist();
      if (this.$route.name !== 'wishlist') {
        this.$router.push({ name: 'wishlist' }).catch(() => {});
      }
    },
    async moveToCart(item) {
      // Add to cart
      this.addToCart(item);
      // Remove from wishlist
      await this.removeFromWishlist(item.id);
      
      if (this.$message) {
        this.$message.success('Añadido a la cesta');
      }
    }
  },
  mounted() {
    // We should fetch the wishlist initially, but perhaps it's better done in App.vue or TopBar
  }
};
</script>

<style scoped>
.wishlist-dropdown-container {
  /* relative positioning handled by parent */
}
.wishlist-minimal-dropdown {
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

.wishlist-empty-state {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wishlist-link-btn {
  color: #18d600;
  font-weight: 600;
  font-size: 0.9rem;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 8px;
}

.wishlist-items-list {
  max-height: 220px;
  overflow-y: auto;
}

.wishlist-items-list::-webkit-scrollbar { width: 4px; }
.wishlist-items-list::-webkit-scrollbar-track { background: transparent; }
.wishlist-items-list::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

.wishlist-item {
  display: flex;
  padding: 16px;
  gap: 12px;
  border-bottom: 1px solid var(--border-color, #f1f5f9);
  transition: background-color 0.2s;
  position: relative;
}

.wishlist-item-img-container {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f1f5f9;
}

.wishlist-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wishlist-item-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wishlist-item-title {
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  line-height: 1.2;
  color: var(--text-bold, #111827);
}

.wishlist-item-price {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-bold, #111827);
}

.wishlist-actions {
  display: flex;
  gap: 8px;
}

.wishlist-action-btn {
  background: none;
  border: none;
  color: #18d600;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}
.wishlist-action-btn:hover {
  text-decoration: underline;
}

.wishlist-footer {
  padding: 16px;
  background-color: var(--card-bg, #ffffff);
}

.wishlist-buttons-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wishlist-checkout-btn {
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
.wishlist-checkout-btn:hover {
  background-color: #18d600;
  color: #000000;
}
</style>
