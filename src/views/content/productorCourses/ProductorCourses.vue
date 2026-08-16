<template>
  <main class="contents-page">
    <!-- 
      COMPONENTE FUTURO:
      <ContentsToolbar />
    -->
    <section class="contents-header">
      <div>
        <span class="marketplace-subtitle d-block mb-1">Gestión de contenidos</span>
        <h1 class="marketplace-main-title">Mis infoproductos</h1>
      </div>

      <div class="contents-actions">
        <div class="search-box">
          <span><SearchIcon size="18" /></span>
          <!-- <span>⌕</span> -->

          <input
            v-model="search"
            type="text"
            placeholder="Buscar contenidos..."
            @keyup.enter="searchInfoproducts"
          />
        </div>

        <!-- <button class="filter-btn" type="button">
          ☰
          <span>Filtros</span>
        </button> -->

        <select
          v-model="sortOption"
          class="sort-select"
          @change="searchInfoproducts"
        >
          <option value="created_at_desc">Más recientes <ChevronDownIcon size="18" /></option>
          <option value="created_at_asc">Más antiguos <ChevronDownIcon size="18" /></option>
          <option value="title_asc">Título A-Z <ChevronDownIcon size="18" /></option>
          <option value="title_desc">Título Z-A <ChevronDownIcon size="18" /></option>
        </select>
      </div>
    </section>

    <!-- 
      COMPONENTE FUTURO:
      <ContentTabs />
    -->
    <!-- Sección de Filtros Premium -->
    <div class="tw-flex tw-flex-col tw-gap-5 tw-mb-8">
      <!-- Píldoras: Tipo de Contenido -->
      <div class="tw-flex tw-flex-col">
        <label class="tw-text-xs tw-font-bold tw-text-gray-500 dark:tw-text-gray-400 tw-uppercase tw-mb-2 tw-tracking-wide tw-font-outfit">Tipo de Contenido</label>
        <div class="tw-flex tw-gap-2 tw-overflow-x-auto hide-scrollbar tw-pb-1">
          <button 
            @click="setContentType(null)"
            :class="selectedProductTypeId === null ? 'tw-bg-hm-primary tw-text-white tw-border-hm-primary' : 'tw-bg-white dark:tw-bg-gray-800 tw-text-gray-700 dark:tw-text-gray-200 tw-border tw-border-gray-200 dark:tw-border-gray-700 hover:tw-border-hm-primary'"
            class="tw-px-4 tw-py-1.5 tw-rounded-full tw-font-semibold tw-text-sm tw-whitespace-nowrap tw-transition-colors tw-font-jakarta"
          >
            Cursos y Libros
          </button>
          <button 
            @click="setContentType(1)"
            :class="selectedProductTypeId === 1 ? 'tw-bg-hm-primary tw-text-white tw-border-hm-primary' : 'tw-bg-white dark:tw-bg-gray-800 tw-text-gray-700 dark:tw-text-gray-200 tw-border tw-border-gray-200 dark:tw-border-gray-700 hover:tw-border-hm-primary'"
            class="tw-px-4 tw-py-1.5 tw-rounded-full tw-font-semibold tw-text-sm tw-whitespace-nowrap tw-transition-colors tw-font-jakarta"
          >
            Solo Cursos
          </button>
          <button 
            @click="setContentType(2)"
            :class="selectedProductTypeId === 2 ? 'tw-bg-hm-primary tw-text-white tw-border-hm-primary' : 'tw-bg-white dark:tw-bg-gray-800 tw-text-gray-700 dark:tw-text-gray-200 tw-border tw-border-gray-200 dark:tw-border-gray-700 hover:tw-border-hm-primary'"
            class="tw-px-4 tw-py-1.5 tw-rounded-full tw-font-semibold tw-text-sm tw-whitespace-nowrap tw-transition-colors tw-font-jakarta"
          >
            Solo Libros / Ebooks
          </button>
        </div>
      </div>

      <!-- Píldoras: Filtro por Estado -->
      <div class="tw-flex tw-flex-col">
        <label class="tw-text-xs tw-font-bold tw-text-gray-500 dark:tw-text-gray-400 tw-uppercase tw-mb-2 tw-tracking-wide tw-font-outfit">Estado del Infoproducto</label>
        <div class="tw-flex tw-gap-2 tw-overflow-x-auto hide-scrollbar tw-pb-1">
          <button 
            @click="setStatusFilter(null)"
            :class="['filter-status-btn', 'status-all', { active: selectedStatus === null }]"
          >
            Todos
          </button>
          <button 
            @click="setStatusFilter(2)"
            :class="['filter-status-btn', 'status-2', { active: selectedStatus === 2 }]"
          >
            ● Activo
          </button>
          <button 
            @click="setStatusFilter(1)"
            :class="['filter-status-btn', 'status-1', { active: selectedStatus === 1 }]"
          >
            ● En espera
          </button>
          <button 
            @click="setStatusFilter(3)"
            :class="['filter-status-btn', 'status-3', { active: selectedStatus === 3 }]"
          >
            ● Con observaciones
          </button>
          <button 
            @click="setStatusFilter(0)"
            :class="['filter-status-btn', 'status-0', { active: selectedStatus === 0 }]"
          >
            ● Inactivo
          </button>
        </div>
      </div>
    </div>

    <section class="content-body">
      <div v-if="loading">
        <div>
          <div class="mb-5">
            <div class="d-flex loader-item flex-wrap my-3">
              <div class="loader loader-card mx-3 mt-3" v-for="item in [1, 2, 3, 4]" :key="item.index"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="state-box error">
        {{ error }}
      </div>

      <div v-else-if="infoproducts.length === 0" class="state-box">
        No tienes contenidos creados todavía.
      </div>

      <!-- 
        COMPONENTE FUTURO:
        <InfoproductGrid />
      -->
      <div v-else class="cards-grid">
        <article
          v-for="item in infoproducts"
          :key="item.id"
          class="content-card"
        >
          <div class="mc-card__img-wrap">
            <img
              :src="getImage(item)"
              :alt="item.title"
              class="mc-card__img"
              @error="onImgError"
            />
            <div class="mc-card__tags">
              <span class="mc-tag mc-tag--type">{{ isCourse(item) ? 'CURSO' : 'EBOOK' }}</span>
              <span v-if="Number(item.price) === 0" class="mc-tag mc-tag--gratis">GRATIS</span>
            </div>
            <div class="mc-card__status">
              <span :class="['status-badge', getStatusClass(item.status)]">
                {{ getStatusText(item.status) }}
              </span>
            </div>
          </div>

          <div class="mc-card__body">
            <h3 class="mc-card__title">{{ item.title }}</h3>
            <p v-if="item.name" class="mc-card__author">{{ item.name }} {{ item.last_name }}</p>

            <div class="mc-card__rating">
              <span class="mc-rating__score">{{ parseFloat(item.ranking_by_user || 5).toFixed(1) }}</span>
              <span class="mc-rating__stars">
                <span v-for="i in 5" :key="i" class="mc-star" :class="getStarClass(i, item.ranking_by_user || 5)">★</span>
              </span>
            </div>

            <div class="mc-card__price">
              <span class="mc-price--main">{{ formatPrice(item.price, item.currency) }}</span>
              <span
                v-if="item.price_base && Number(item.price_base) > Number(item.price)"
                class="mc-price--original"
              >
                {{ formatPrice(item.price_base, item.currency) }}
              </span>
            </div>
          </div>

          <div class="card-footer">
            <button
              v-if="parseInt(item.status) === 2 || parseInt(item.status) === 0"
              class="secondary-action"
              style="margin-right: 8px;"
              type="button"
              @click="toggleMarketplaceVisibility(item)"
              :disabled="item.isToggling"
            >
              <template v-if="item.isToggling">
                Cargando...
              </template>
              <template v-else>
                {{ parseInt(item.status) === 2 ? 'Ocultar' : 'Mostrar' }}
              </template>
            </button>
            <button
              class="primary-action"
              type="button"
              @click="goToInfoproduct(item)"
            >
              {{ isCourse(item) ? 'Ver contenido' : 'Ver libro' }}
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- 
      COMPONENTE FUTURO:
      <Pagination />
    -->
    <section
      v-if="!loading && infoproducts.length > 0"
      class="pagination-section"
    >
      <p>
        Mostrando {{ fromResult }} a {{ toResult }} de {{ total }} resultados
      </p>

      <div class="pagination-controls">
        <button
          type="button"
          :disabled="page === 1"
          @click="changePage(page - 1)"
        >
          ‹
        </button>

        <button class="current-page" type="button">
          {{ page }}
        </button>

        <button
          type="button"
          :disabled="page >= lastPage"
          @click="changePage(page + 1)"
        >
          ›
        </button>
      </div>

      <select v-model="perPage" @change="changePerPage">
        <option :value="8">8 por página</option>
        <option :value="12">12 por página</option>
        <option :value="16">16 por página</option>
        <option :value="24">24 por página</option>
      </select>
    </section>
  </main>
</template>

<script>
import { SearchIcon } from 'vue-feather-icons'

export default {
  name: 'MyContentsView',

  components: {
    SearchIcon
  },

  data() {
    return {
      selectedProductTypeId: null,
      selectedStatus: null,
      infoproducts: [],

      loading: false,
      error: null,
      notInfoproducts: false,

      search: '',
      sortOption: 'created_at_desc',

      page: 1,
      perPage: 8,
      total: 0,
      lastPage: 1
    }
  },

  computed: {
    sortBy() {
      const parts = this.sortOption.split('_')

      if (parts[0] === 'created') {
        return 'created_at'
      }

      return parts[0]
    },

    order() {
      if (this.sortOption === 'created_at_desc') return 'desc'
      if (this.sortOption === 'created_at_asc') return 'asc'
      if (this.sortOption === 'title_desc') return 'desc'

      return 'asc'
    },

    fromResult() {
      if (this.total === 0) return 0

      return (this.page - 1) * this.perPage + 1
    },

    toResult() {
      return Math.min(this.page * this.perPage, this.total)
    }
  },

  mounted() {
    this.fetchInfoproducts()
  },

  methods: {
    async fetchInfoproducts() {
      this.loading = true
      this.error = null
      this.notInfoproducts = false

      const params = {
        sort_by: this.sortBy,
        order: this.order,
        per_page: this.perPage,
        page: this.page
      }

      if (this.selectedProductTypeId !== null) {
        params.product_type_id = this.selectedProductTypeId
      }

      if (this.selectedStatus !== null) {
        params.status = this.selectedStatus
      }

      if (this.search.trim()) {
        params.search = this.search.trim()
      }

      await this.axios
        .get('/me/infoproducts', { params })
        .then((response) => {
          const responseData = response.data

          // Filtrar los que tienen estado null (recién creados, sin solicitar revisión)
          const validInfoproducts = (responseData.data || []).filter(item => item.status !== null && item.status !== undefined)

          this.infoproducts = validInfoproducts

          if (responseData.meta) {
            this.page = responseData.meta.current_page || 1
            this.lastPage = responseData.meta.last_page || 1
            this.perPage = responseData.meta.per_page || this.perPage
            this.total = responseData.meta.total || 0
          } else {
            this.total = this.infoproducts.length
            this.lastPage = 1
          }

          if (this.infoproducts.length === 0) {
            this.notInfoproducts = true
          }
        })
        .catch((error) => {
          console.error(error)

          this.error = 'No se pudieron cargar los contenidos.'
          this.infoproducts = []
          this.total = 0
          this.lastPage = 1
        })
        .finally(() => {
          this.loading = false
        })
    },

    searchInfoproducts() {
      this.page = 1
      this.fetchInfoproducts()
    },

    setContentType(typeId) {
      if (this.selectedProductTypeId === typeId) return

      this.selectedProductTypeId = typeId
      this.page = 1
      this.fetchInfoproducts()
    },

    setStatusFilter(status) {
      if (this.selectedStatus === status) return

      this.selectedStatus = status
      this.page = 1
      this.fetchInfoproducts()
    },

    changePage(newPage) {
      if (newPage < 1 || newPage > this.lastPage) return

      this.page = newPage
      this.fetchInfoproducts()
    },

    changePerPage() {
      this.page = 1
      this.fetchInfoproducts()
    },

    isCourse(item) {
      return Number(item.product_type_id) === 1 || item.type === 'Curso' || item.type === 'course'
    },

    onImgError(e) {
      if (e && e.target) {
        e.target.src = require("@/assets/background-login.webp");
      }
    },

    getImage(item) {
      if (!item || !item.url_portada) return require("@/assets/background-login.webp");
      return item.url_portada.startsWith('http') ? item.url_portada.replace('s3.sa-east-1', 's3-accelerate') : 'https://promolider-storage-user.s3-accelerate.amazonaws.com/' + item.url_portada;
    },

    formatPrice(value, currency) {
      const price = Number(value || 0)

      const currencyCode = currency || 'PEN'

      try {
        return new Intl.NumberFormat('es-PE', {
          style: 'currency',
          currency: currencyCode
        }).format(price)
      } catch (error) {
        return `S/ ${price.toFixed(2)}`
      }
    },

    hasBookFormat(item, format) {
      if (!item.book_formats || !Array.isArray(item.book_formats)) {
        return false
      }

      return item.book_formats.some(function (bookFormat) {
        if (!bookFormat.file_type) return false

        return String(bookFormat.file_type).toLowerCase() === format.toLowerCase()
      })
    },

    async toggleMarketplaceVisibility(item) {
      this.$set(item, 'isToggling', true)
      try {
        const endpoint = `/marketing/marketplace/${item.id}/toggle-visibility`
        await this.axios.post(endpoint)
        
        // Si el estado era activo (2), pasa a inactivo (0). Si era inactivo (0), pasa a activo (2)
        const currentStatus = parseInt(item.status)
        item.status = currentStatus === 2 ? 0 : 2
        item.marketplace_listed = currentStatus === 2 ? 0 : 1
        
        // Recargar la lista para reflejar los filtros actualizados y paginación real
        this.fetchInfoproducts()
      } catch (error) {
        console.error('Error toggling visibility:', error)
      } finally {
        this.$set(item, 'isToggling', false)
      }
    },

    getStarClass(i, rating) {
      const v = parseFloat(rating);
      if (i <= Math.floor(v)) return 'filled';
      if (i === Math.ceil(v) && v % 1 >= 0.5) return 'half';
      return 'empty';
    },

    getStatusText(status) {
      const s = Number(status);
      if (s === 0) return 'Inactivo';
      if (s === 1) return 'En espera';
      if (s === 2) return 'Activo';
      if (s === 3) return 'Con observaciones';
      return 'Inactivo';
    },

    getStatusClass(status) {
      const s = Number(status);
      if (s === 0) return 'status-inactive';
      if (s === 1) return 'status-waiting';
      if (s === 2) return 'status-active';
      if (s === 3) return 'status-observations';
      return 'status-inactive';
    },

    async goToInfoproduct(course) {
      try {
        const { id, ranking_by_user } = course;
        
        if (course.type === 'Libro') {
          this.$router.push({ name: 'book', params: { id } });
          return;
        }

        const res = await this.axios.get(`purchased/show-class-seen?course_id=${id}`);
        const dataRequest = (res && res.data && res.data.data) ? res.data.data : {};
          
        this.$store.commit("course/UPDATE_TIME", dataRequest.display_time || 0);
          
        if (!dataRequest.name) {
          const temaryRes = await this.axios.get("course/temary/get-all-class/" + id);
          const fistClass = temaryRes?.data?.data?.modules?.[0]?.lessons?.[0]?.name;
            
          const routeParams = {
            name: "curso",
            query: {
              course: id,
              class: fistClass || "",
              rate: ranking_by_user,
            },
          };
            
          this.$router.push(routeParams).catch(() => { });
        } else {
          const routeParams = {
            name: "curso",
            query: {
              course: id,
              class: dataRequest.name,
              rate: ranking_by_user,
            },
          };

          this.$router.push(routeParams).catch(() => { });
        }
      } catch (error) {
        console.error("Error al obtener información del curso:", error);
        if (course && course.id) {
          this.$router.push({ name: "curso", query: { course: course.id } }).catch(() => {});
        }
      }
    }
  }
}
</script>

<style scoped>

.loader-card {
  width: 326px;
  height: 469px;
}

.loader-item {
  gap: 3px;
}

.contents-page {
  padding: 48px 56px !important;
  background: #f8fafc;
  min-height: 100vh;
}

.contents-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 32px;
}



.contents-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  width: 280px;
  height: 48px;
  background: var(--hm-surface-cream, #FAF9F5);
  border: 1px solid var(--hm-border, #E5E3DC);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  transition: var(--hm-transition);
}

.search-box:focus-within {
  border-color: var(--hm-primary, var(--primary-color));
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

.search-box span {
  color: #78716C;
}

.search-box input {
  font-family: 'Outfit', sans-serif !important;
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  background: transparent;
  color: var(--text-bold, #1C1917);
}

.filter-btn,
.sort-select {
  font-family: 'Outfit', sans-serif !important;
  height: 48px;
  border: 1px solid var(--border-color, var(--hm-border, #E5E3DC));
  background: var(--card-bg, var(--hm-surface-cream, #FAF9F5));
  border-radius: 12px;
  padding: 0 18px;
  font-weight: 600;
  color: var(--text-bold, #1C1917);
  cursor: pointer;
  transition: var(--hm-transition);
}

.filter-btn:hover,
.sort-select:hover {
  background: var(--hm-surface-hover, #EFECE4);
  border-color: var(--hm-primary-border);
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-select {
  min-width: 190px;
}

.tabs-section {
  display: flex;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid #d9dee8;
  margin-bottom: 32px;
}

.tab-btn {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  background: transparent;
  border: none;
  padding: 0 24px 16px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-muted, #111827);
  cursor: pointer;
  transition: color 0.25s;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.tab-btn.active {
  color: #059212;
}

.filter-status-btn {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

/* Activo */
.filter-status-btn.status-2 {
  background: rgba(220, 252, 231, 0.15);
  color: #16a34a;
  border-color: rgba(22, 163, 74, 0.3);
}
.filter-status-btn.status-2.active {
  background: #dcfce7 !important;
  color: #15803d !important;
  border-color: #16a34a !important;
}

/* En espera */
.filter-status-btn.status-1 {
  background: rgba(255, 237, 213, 0.15);
  color: #ea580c;
  border-color: rgba(234, 88, 12, 0.3);
}
.filter-status-btn.status-1.active {
  background: #ffedd5 !important;
  color: #c2410c !important;
  border-color: #ea580c !important;
}

/* Con observaciones */
.filter-status-btn.status-3 {
  background: rgba(254, 249, 195, 0.15);
  color: #ca8a04;
  border-color: rgba(202, 138, 4, 0.3);
}
.filter-status-btn.status-3.active {
  background: #fef9c3 !important;
  color: #854d0e !important;
  border-color: #ca8a04 !important;
}

/* Inactivo */
.filter-status-btn.status-0 {
  background: rgba(254, 226, 226, 0.15);
  color: #dc2626;
  border-color: rgba(220, 38, 38, 0.3);
}
.filter-status-btn.status-0.active {
  background: #fee2e2 !important;
  color: #b91c1c !important;
  border-color: #dc2626 !important;
}

/* Todos */
.filter-status-btn.status-all {
  background: rgba(156, 163, 175, 0.15);
  color: #9ca3af;
  border-color: rgba(156, 163, 175, 0.3);
}
.filter-status-btn.status-all.active {
  background: #e5e7eb !important;
  color: #1f2937 !important;
  border-color: #9ca3af !important;
}
html.dark .filter-status-btn.status-all.active,
html.dark-mode .filter-status-btn.status-all.active {
  background: #374151 !important;
  color: #f9fafb !important;
  border-color: #4b5563 !important;
}

.tab-btn.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 3px;
  width: 100%;
  background: #059212;
  border-radius: 999px;
}

.content-body {
  min-height: 380px;
}

.state-box {
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 14px;
  padding: 48px;
  text-align: center;
  color: #667085;
  font-weight: 600;
}

.state-box.error {
  color: #b42318;
  background: #fff5f5;
  border-color: #fecdca;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.content-card {
  background: transparent;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.mc-card__img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #e2e8f0;
  border-radius: 8px;
}

.mc-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.content-card:hover .mc-card__img {
  transform: scale(1.05);
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

.mc-card__status {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: capitalize;
  letter-spacing: 0.3px;
}

.status-inactive { background: #fee2e2; color: #dc2626; }
.status-waiting { background: #ffedd5; color: #ea580c; }
.status-active { background: #dcfce7; color: #16a34a; }
.status-observations { background: #fef9c3; color: #ca8a04; }

.mc-card__body {
  padding: 10px 0px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.mc-card__title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  color: var(--text-bold);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mc-card__author {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0;
}

.mc-card__rating { display: flex; align-items: center; gap: 4px; margin-top: 2px; }
.mc-rating__score { font-size: 0.8rem; font-weight: 700; color: #b45309; }
.mc-rating__stars { display: flex; gap: 1px; }
.mc-star { font-size: 0.85rem; }
.mc-star.filled { color: #f59e0b; }
.mc-star.half { color: #f59e0b; opacity: 0.55; }
.mc-star.empty { color: #d1d5db; }

.mc-card__price { display: flex; align-items: baseline; gap: 8px; margin-top: 6px; }
.mc-price--main { font-family: 'Outfit', sans-serif !important; font-size: 1.05rem !important; font-weight: 700 !important; color: var(--primary-color); }
.mc-price--original { font-size: 0.8rem; color: #9ca3af; text-decoration: line-through; }

.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}

.primary-action {
  flex: 1;
  height: 38px;
  border: none;
  background: var(--primary-color, #18D600) !important;
  color: #FFFFFF !important;
  border-radius: 8px !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  transition: all 0.25s ease !important;
  cursor: pointer;
}

.primary-action:hover {
  background: var(--primary-hover, #15bc00) !important;
  transform: translateY(-1px);
}

.secondary-action {
  flex: 1;
  height: 38px;
  border: 1px solid var(--border-color, #e5e7eb) !important;
  background: transparent !important;
  color: var(--text-bold, #374151) !important;
  border-radius: 8px !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  transition: all 0.25s ease !important;
  cursor: pointer;
}

.secondary-action:hover:not(:disabled) {
  background: var(--card-sub-bg, #f3f4f6) !important;
}

.secondary-action:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.options-btn {
  width: 48px;
  height: 48px;
  border: 1px solid #d9dee8;
  background: #ffffff;
  border-radius: 8px;
  font-size: 22px;
  font-weight: 800;
  cursor: pointer;
}

.pagination-section {
  margin-top: 36px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
}

.pagination-section p {
  color: #344054;
  font-size: 14px;
  margin: 0;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-controls button {
  width: 40px;
  height: 40px;
  border: 1px solid #d9dee8;
  background: #ffffff;
  border-radius: 8px;
  cursor: pointer;
}

.pagination-controls button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-controls .current-page {
  background: #059212;
  color: #ffffff;
  border-color: #059212;
}

.pagination-section select {
  justify-self: end;
  height: 44px;
  border: 1px solid #d9dee8;
  background: #ffffff;
  border-radius: 8px;
  padding: 0 14px;
}

@media (max-width: 1200px) {
  .cards-grid {
    grid-template-columns: repeat(3, minmax(240px, 1fr));
  }
}

@media (max-width: 992px) {
  .contents-header {
    flex-direction: column;
  }

  .contents-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .search-box {
    min-width: 240px;
  }

  .cards-grid {
    grid-template-columns: repeat(2, minmax(240px, 1fr));
  }
}

@media (max-width: 640px) {
  .contents-page {
    padding: 32px 20px;
  }

  .contents-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box,
  .filter-btn,
  .sort-select {
    width: 100%;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .pagination-section {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .pagination-section select {
    justify-self: center;
  }
}
</style>