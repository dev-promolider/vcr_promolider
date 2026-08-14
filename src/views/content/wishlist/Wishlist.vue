<template>
  <div class="wishlist-page-wrapper">
    <h1 class="wishlist-main-title">Lista de Deseos</h1>
    
    <div class="wishlist-layout">
      <!-- Main Column: Items List -->
      <div class="wishlist-left-col">
        <h3 class="wishlist-items-count">{{ wishlistCount }} {{ wishlistCount === 1 ? 'curso' : 'cursos' }} en tu lista</h3>
        
        <div v-if="wishlistItems.length === 0" class="wishlist-empty-message">
          Tu lista de deseos está vacía. Sigue explorando para encontrar tu próximo curso favorito.
          <button @click="goToMarketplace" class="wishlist-keep-shopping-btn">Explorar cursos</button>
        </div>
        
        <div v-else class="wishlist-full-list">
          <div v-for="item in wishlistItems" :key="item.id" class="wishlist-page-item">
            <div class="item-img-container">
              <img :src="getCover(item)" :alt="item.title" class="item-img" @error="onImgError" />
            </div>
            
            <div class="item-info">
              <h4 class="item-title tw-line-clamp-2">{{ item.title }}</h4>
              <p class="item-author" v-if="item.author_name">Por {{ item.author_name }}</p>
            </div>
            
            <div class="item-actions">
              <button @click="removeItem(item.id)" class="item-action-btn">Eliminar</button>
              <button @click="moveToCart(item)" class="item-action-btn">Añadir a la cesta</button>
            </div>
            
            <div class="item-price-col">
              <span class="item-price">${{ parseFloat(item.price || 0).toFixed(2) }}</span>
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
  name: 'WishlistPage',
  data() {
    return {
      defaultCover: require('@/assets/background-login.webp'),
    };
  },
  computed: {
    ...mapGetters('wishlist', [
      'wishlistItems',
      'wishlistCount',
    ]),
  },
  methods: {
    ...mapActions('wishlist', ['removeFromWishlist']),
    ...mapActions('cart', ['addToCart']),
    getCover(item) {
      if (!item.url_portada) return this.defaultCover;
      if (item.url_portada.startsWith('http')) return item.url_portada;
      return 'https://promolider-storage-user.s3-accelerate.amazonaws.com/' + item.url_portada;
    },
    onImgError(e) {
      if (e && e.target) e.target.src = this.defaultCover;
    },
    async removeItem(id) {
      await this.removeFromWishlist(id);
      if (this.$message) {
        this.$message.success("Eliminado de la lista de deseos");
      }
    },
    async moveToCart(item) {
      this.addToCart(item);
      await this.removeFromWishlist(item.id);
      if (this.$message) {
        this.$message.success("Añadido a la cesta");
      }
    },
    goToMarketplace() {
      this.$router.push({ name: 'courses' }).catch(() => {});
    },
  },
  mounted() {
    this.$store.dispatch('wishlist/fetchWishlist');
  }
};
</script>

<style scoped>
.wishlist-page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  color: var(--text-bold, #111827);
  font-family: 'Outfit', sans-serif;
}

.wishlist-main-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: var(--text-bold, #111827);
}

.wishlist-layout {
  display: flex;
  flex-direction: column;
}

.wishlist-left-col {
  width: 100%;
}

.wishlist-items-count {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.wishlist-empty-message {
  padding: 40px 0;
  font-size: 1.1rem;
  color: var(--text-bold, #111827);
  text-align: left;
}

.wishlist-keep-shopping-btn {
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
  transition: all 0.2s;
}
.wishlist-keep-shopping-btn:hover {
  background-color: #18d600;
  color: #000000;
}

.wishlist-full-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wishlist-page-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 0;
  border-top: 1px solid var(--border-color, #e5e7eb);
}
@media (min-width: 768px) {
  .wishlist-page-item {
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
}
.item-action-btn:hover {
  text-decoration: underline;
}

.item-price-col {
  min-width: 100px;
  text-align: right;
}
@media (min-width: 768px) {
  .item-price-col {
    text-align: right;
  }
}

.item-price {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-bold, #111827);
}
</style>
