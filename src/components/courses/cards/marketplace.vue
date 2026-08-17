<template>
  <div
    class="mc-card-wrapper"
    v-if="course"
    @mouseenter="showPopover"
    @mouseleave="startHidePopover"
  >
    <!-- TARJETA BASE -->
    <div class="mc-card" @click="handleCardClick">
      <div class="mc-card__img-wrap">
        <img :src="coverUrl" :alt="course.title" class="mc-card__img" @error="onImgError" />
        <div class="mc-card__tags">
          <span class="mc-tag mc-tag--type">{{ Number(course.product_type_id) === 2 ? 'EBOOK' : 'CURSO' }}</span>
          <span v-if="course.price === 0" class="mc-tag mc-tag--gratis">GRATIS</span>
          <span v-if="isBestRated" class="mc-tag mc-tag--best">⭐ Mejor Valorado</span>
          <span v-if="isNew" class="mc-tag mc-tag--new">NUEVO</span>
          <span v-if="hasDiscount" class="mc-tag mc-tag--deal">OFERTA</span>
        </div>
      </div>

      <div class="mc-card__body">
        <h3 class="mc-card__title">{{ course.title }}</h3>
        <p v-if="course.name" class="mc-card__author">{{ course.name }} {{ course.last_name }}</p>

        <div class="mc-card__rating">
          <span class="mc-rating__score">{{ ratingScore }}</span>
          <span class="mc-rating__stars">
            <span v-for="i in 5" :key="i" class="mc-star" :class="getStarClass(i)">★</span>
          </span>
        </div>

        <div class="mc-card__price">
          <span class="mc-price--main">${{ displayPrice }}</span>
          <span v-if="hasDiscount" class="mc-price--original">${{ course.price }}</span>
        </div>
      </div>
    </div>

    <!-- POPOVER — renderizado via portal-vue para escapar del overflow -->  
    <portal to="marketplace-popovers">
      <transition name="popover-anim">
        <div
          v-if="popoverVisible"
          class="mc-popover-fixed"
          :class="[popoverPositionClass]"
          :style="popoverStyle"
          @mouseenter="keepPopover"
          @mouseleave="startHidePopover"
        >
          <!-- Triángulo (apuntador) -->
          <div class="mc-pop__arrow"></div>

          <h4 class="mc-pop__title">{{ course.title }}</h4>

          <div class="mc-pop__badges">
            <span v-if="isBestRated" class="mc-tag-badge mc-tag-badge--brand">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Mejor Valorado
            </span>
            <span v-else-if="isNew" class="mc-tag-badge mc-tag-badge--brand">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Nuevo
            </span>
            <span v-if="course.updated_at" class="mc-pop__updated">
              Actualizado <span class="tw-font-bold">{{ formatMonthYear(course.updated_at) }}</span>
            </span>
          </div>

          <p class="mc-pop__meta">
            {{ getLevelText(course.course_level_id) }}
            <span v-if="getCategoryName(course.id_categories)"> · {{ getCategoryName(course.id_categories) }}</span>
          </p>

          <p class="mc-pop__desc">
            {{ course.course_about || course.description || 'Desarrolla nuevas habilidades con este contenido diseñado para avanzar a tu ritmo.' }}
          </p>

          <ul class="mc-pop__learn" v-if="willLearnList.length">
            <li v-for="(item, i) in willLearnList" :key="i">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              {{ item }}
            </li>
          </ul>

          <div class="mc-pop__actions">
            <button v-if="isMyCourse" class="mc-btn mc-btn--primary mc-btn--full" style="opacity: 0.9; cursor: default;" @click.stop>
              Eres el creador
            </button>
            <template v-else>
              <button v-if="course.price === 0" class="mc-btn mc-btn--primary mc-btn--full" @click.stop="handleCardClick">
                Inscribirse gratis
              </button>
              <div v-else class="mc-pop__btn-row">
                <button class="mc-btn mc-btn--primary mc-btn--flex" @click.stop="handleCardClick">
                  Comprar Ahora
                </button>
                <button class="mc-btn mc-btn--icon-round" title="Añadir a la cesta" @click.stop="addToCart">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </button>
                <button
                  class="mc-btn mc-btn--icon-round"
                  :class="{ 'active-wish': inWishlist }"
                  title="Guardar en favoritos"
                  @click.stop="toggleWishlist"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
            </template>
          </div>
        </div>
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "MarketplaceCard",
  props: {
    course: { type: Object, required: true },
    cardType: { type: Number, default: 1 },
    categories: { type: Array, default: () => [] },
    viewMode: { type: String, default: "marketplace" },
  },
  data() {
    return {
      popoverVisible: false,
      popoverStyle: {},
      popoverPositionClass: 'mc-pop--right',
      hideTimer: null,
    };
  },
  computed: {
    ...mapGetters('wishlist', ['wishlistItems']),
    isMyCourse() {
      const currentUserId = localStorage.getItem("id_user");
      return currentUserId && Number(this.course.user_id) === Number(currentUserId);
    },
    inWishlist() {
      return this.wishlistItems.some(item => item.id === this.course.id);
    },
    coverUrl() {
      if (!this.course?.url_portada) return require("@/assets/background-login.webp");
      if (this.course.url_portada.startsWith("http"))
        return this.course.url_portada.replace("s3.sa-east-1", "s3-accelerate");
      return "https://promolider-storage-user.s3-accelerate.amazonaws.com/" + this.course.url_portada;
    },
    ratingScore() {
      return parseFloat(this.course.ranking_by_user || 5).toFixed(1);
    },
    isBestRated() {
      return parseFloat(this.course.ranking_by_user || 0) >= 4.5;
    },
    isNew() {
      if (!this.course.created_at) return false;
      return (Date.now() - new Date(this.course.created_at)) / (1000 * 60 * 60 * 24 * 30) <= 3;
    },
    hasDiscount() {
      return this.course.price_with_discount != null && this.course.price_with_discount < this.course.price;
    },
    discountPct() {
      if (!this.hasDiscount) return 0;
      return Math.round(100 - (this.course.price_with_discount / this.course.price) * 100);
    },
    displayPrice() {
      if (this.course.price === 0) return '0';
      const p = this.hasDiscount ? this.course.price_with_discount : this.course.price;
      return Number(p).toFixed(2);
    },
    willLearnList() {
      if (!this.course.will_learn) return [];
      return this.course.will_learn.split(/\n|;/).map(s => s.trim()).filter(Boolean).slice(0, 4);
    },
  },
  methods: {
    ...mapActions('wishlist', ['addToWishlist', 'removeFromWishlist']),
    onImgError(e) {
      if (e?.target) e.target.src = require("@/assets/background-login.webp");
    },
    getStarClass(i) {
      const v = parseFloat(this.course.ranking_by_user || 5);
      if (i <= Math.floor(v)) return 'filled';
      if (i === Math.ceil(v) && v % 1 >= 0.5) return 'half';
      return 'empty';
    },
    getLevelText(id) {
      return { 1: "Básico", 2: "Intermedio", 3: "Avanzado" }[id] || "Básico";
    },
    getLevelClass(id) {
      return { 1: "level-basic", 2: "level-intermediate", 3: "level-advanced" }[id] || "level-basic";
    },
    getCategoryName(id) {
      if (!Array.isArray(this.categories)) return "";
      const cat = this.categories.find(c => c?.id === id);
      return cat ? cat.name : "";
    },
    formatMonthYear(d) {
      if (!d) return '';
      const date = new Date(d);
      const m = date.toLocaleDateString('es-ES', { month: 'long' });
      return `${m} de ${date.getFullYear()}`;
    },
    handleCardClick() {
      if (this.cardType === 4) {
        this.$router.push({ name: "buy-certificate", params: { courseId: this.course.id } });
      } else if (Number(this.course.product_type_id) === 2) {
        this.$router.push({ name: "buy-books", params: { ide: this.course.id, slug: this.course.slug } });
      } else {
        this.$router.push({ name: "buy-cursos", params: { ide: this.course.id, slug: this.course.slug } });
      }
    },
    addToCart() {
      if (!this.course) return;
      const item = {
        id: this.course.id,
        title: this.course.title,
        price: parseFloat(this.course.price_with_discount > 0 ? this.course.price_with_discount : (this.course.price || this.course.precio || 0)),
        precio: parseFloat(this.course.precio || this.course.price || 0),
        url_portada: this.course.url_portada,
        category: this.course.categoria || 'Curso',
        slug: this.course.slug,
      };
      this.$store.dispatch('cart/addToCart', item);
      this.popoverVisible = false; // Hide popover after adding to cart
    },
    async toggleWishlist() {
      if (this.inWishlist) {
        await this.removeFromWishlist(this.course.id);
        if (this.$message) this.$message.success('Eliminado de la lista de deseos');
      } else {
        const item = {
          id: this.course.id,
          title: this.course.title,
          price: parseFloat(this.course.price_with_discount > 0 ? this.course.price_with_discount : (this.course.price || this.course.precio || 0)),
          url_portada: this.course.url_portada,
          author_name: this.course.author_name || (this.course.user ? `${this.course.user.name} ${this.course.user.last_name || ''}` : ''),
        };
        await this.addToWishlist(item);
        if (this.$message) this.$message.success('Añadido a la lista de deseos');
      }
    },
    showPopover() {
      clearTimeout(this.hideTimer);
      const rect = this.$el.getBoundingClientRect();
      const pw = 340;
      const gap = 16;
      const vw = window.innerWidth;
      
      let left = rect.right + gap;
      this.popoverPositionClass = 'mc-pop--right';
      
      if (left + pw > vw - 16) {
        left = rect.left - pw - gap;
        this.popoverPositionClass = 'mc-pop--left';
      }
      
      // Centrar verticalmente respecto a la tarjeta si es posible
      const ph = 460;
      const vh = window.innerHeight;
      let top = rect.top - (ph / 2) + (rect.height / 2);
      
      // Ajuste para que no se salga de la pantalla por arriba o por abajo
      if (top < 16) top = 16;
      if (top + ph > vh - 16) top = vh - ph - 16;
      
      // Calcular la posición Y relativa para la flecha
      const arrowY = rect.top + (rect.height / 2) - top;

      this.popoverStyle = {
        top: top + 'px',
        left: left + 'px',
        width: pw + 'px',
        '--arrow-y': arrowY + 'px'
      };
      this.popoverVisible = true;
    },
    keepPopover() {
      clearTimeout(this.hideTimer);
    },
    startHidePopover() {
      this.hideTimer = setTimeout(() => {
        this.popoverVisible = false;
      }, 150);
    },
  },
  beforeDestroy() {
    clearTimeout(this.hideTimer);
    this.popoverVisible = false;
  },
};
</script>

<style scoped>
/* ========= TARJETA ========= */
.mc-card-wrapper {
  width: 230px;
  flex-shrink: 0;
}

.mc-card {
  background: transparent;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mc-card__img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #e2e8f0;
}

.mc-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mc-card__tags {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 2;
}

.mc-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.63rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  line-height: 1.6;
}

.mc-tag--gratis { background: var(--primary-color); color: #fff; }
.mc-tag--type { background: #334155; color: #fff; }
.mc-tag--best { background: #fef08a; color: #854d0e; }
.mc-tag--new { background: #dbeafe; color: #1d4ed8; }
.mc-tag--deal { background: #fce7f3; color: #9d174d; }

.mc-card__body {
  padding: 8px 0px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.mc-card__title {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-bold);
  margin: 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mc-card__author {
  font-size: 0.73rem;
  color: var(--text-muted);
  margin: 0;
}

.mc-card__rating { display: flex; align-items: center; gap: 4px; margin-top: 2px; }
.mc-rating__score { font-size: 0.78rem; font-weight: 700; color: #b45309; }
.mc-rating__stars { display: flex; gap: 1px; }
.mc-star { font-size: 0.83rem; }
.mc-star.filled { color: #f59e0b; }
.mc-star.half { color: #f59e0b; opacity: 0.55; }
.mc-star.empty { color: #d1d5db; }

.mc-card__price { display: flex; align-items: baseline; gap: 6px; margin-top: 4px; }
.mc-price--main { font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 800; color: var(--primary-color); }
.mc-price--original { font-size: 0.78rem; color: #9ca3af; text-decoration: line-through; }

.mc-card__footer { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 4px; }
.mc-level-badge { font-size: 0.66rem; font-weight: 700; padding: 2px 7px; border-radius: 20px; }
.level-basic { background: rgba(24,214,0,0.12); color: var(--primary-color); }
.level-intermediate { background: #fef3c7; color: #d97706; }
.level-advanced { background: #fee2e2; color: #dc2626; }
.mc-category { font-size: 0.68rem; color: var(--text-muted); }

/* ========= POPOVER FIJO ========= */

/* Transición */
.popover-anim-enter-active,
.popover-anim-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.popover-anim-enter-from,
.popover-anim-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
.popover-anim-enter-to,
.popover-anim-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>

<style>
/* Global — el popover se renderiza en body, fuera del scoped */
.mc-popover-fixed {
  position: fixed;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d1d7dc;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  padding: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
    
    /* Flecha del popover */
    .mc-pop__arrow {
      position: absolute;
      top: var(--arrow-y, 50%);
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-style: solid;
    }
    
    .mc-pop--right .mc-pop__arrow {
      left: -9px;
      border-width: 10px 10px 10px 0;
      border-color: transparent #fff transparent transparent;
      filter: drop-shadow(-2px 0px 1px rgba(0,0,0,0.05));
    }
    
    .mc-pop--left .mc-pop__arrow {
      right: -9px;
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent #fff;
      filter: drop-shadow(2px 0px 1px rgba(0,0,0,0.05));
    }
    
    .mc-pop__title {
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 1.15rem;
      color: #1c1d1f;
      margin: 0;
      line-height: 1.3;
    }
    
    .mc-pop__badges { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    
    .mc-tag-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
    }
    
    .mc-tag-badge--brand { background: var(--primary-color, #18d600); color: #fff; }
    
    .mc-pop__updated { font-size: 0.75rem; color: var(--primary-color, #18d600); font-weight: 600; }
    .mc-pop__meta { font-size: 0.75rem; color: #6a6f73; margin: 0; }
    .mc-pop__desc {
      font-size: 0.85rem;
      color: #1c1d1f;
      margin: 0;
      line-height: 1.5;
    }
    
    .mc-pop__learn {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .mc-pop__learn li {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 0.85rem;
      color: #1c1d1f;
      line-height: 1.4;
    }
    
    .mc-pop__learn svg {
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .mc-pop__actions { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
    .mc-pop__btn-row { display: flex; gap: 12px; align-items: center; }
    
    .mc-btn {
      border: none;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }
    
    .mc-btn--primary { 
      background: var(--primary-color, #18d600); 
      color: #fff; 
      padding: 14px 16px;
      border-radius: 4px;
    }
    .mc-btn--primary:hover { background: var(--primary-hover, #119e00); }
    .mc-btn--full { width: 100%; }
    .mc-btn--flex { flex: 1; }
    
    .mc-btn--icon-round {
      width: 48px;
      height: 48px;
      padding: 0;
      background: #fff;
      border: 1px solid #1c1d1f;
      border-radius: 50%;
      color: #1c1d1f;
      flex-shrink: 0;
    }
    
    .mc-btn--icon-round:hover { background: #f7f9fa; }
    .mc-btn--icon-round.active-wish svg { fill: #1c1d1f; }

    /* ========= DARK MODE POPOVER ========= */
    .dark .mc-popover-fixed {
      background: #1f2937; /* Tailwind gray-800 */
      border-color: #374151; /* Tailwind gray-700 */
    }
    .dark .mc-pop--right .mc-pop__arrow {
      border-color: transparent #1f2937 transparent transparent;
    }
    .dark .mc-pop--left .mc-pop__arrow {
      border-color: transparent transparent transparent #1f2937;
    }
    .dark .mc-pop__title {
      color: #f3f4f6; /* Tailwind gray-100 */
    }
    .dark .mc-pop__desc {
      color: #e5e7eb; /* Tailwind gray-200 */
    }
    .dark .mc-pop__meta {
      color: #9ca3af; /* Tailwind gray-400 */
    }
    .dark .mc-pop__learn li {
      color: #e5e7eb;
    }
    .dark .mc-pop__learn svg {
      stroke: #9ca3af;
    }
    .dark .mc-btn--icon-round {
      background: transparent;
      border-color: #4b5563; /* Tailwind gray-600 */
      color: #f3f4f6;
    }
    .dark .mc-btn--icon-round:hover {
      background: #374151; /* Tailwind gray-700 */
    }
    .dark .mc-btn--icon-round.active-wish svg { fill: #f3f4f6; }
</style>