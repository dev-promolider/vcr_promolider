<template>
  <main class="contents-page">
    <!-- 
      COMPONENTE FUTURO:
      <ContentsToolbar />
    -->
    <section class="contents-header">
      <div>
        <h1>Mis infoproductos</h1>
        <p>Administra los cursos y libros que has creado</p>
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
    <section class="tabs-section">
      <button
        class="tab-btn"
        :class="{ active: activeType === 'course' }"
        type="button"
        @click="changeType('course')"
      >
        Cursos
      </button>

      <button
        class="tab-btn"
        :class="{ active: activeType === 'book' }"
        type="button"
        @click="changeType('book')"
      >
        Libros
      </button>
    </section>

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
          <div class="card-image-wrapper">
            <img
              :src="getImage(item)"
              :alt="item.title"
              class="card-image"
            />

            <span
              v-if="isCourse(item) && item.course_level"
              class="level-badge"
            >
              {{ item.course_level }}
            </span>
          </div>

          <div class="card-content">
            <h3>{{ item.title }}</h3>

            <!-- <p class="description">
              {{ item.description || 'Sin descripción disponible.' }}
            </p> -->

            <!-- CARD DE CURSO -->
            <template v-if="isCourse(item)">
              <div class="rating-row">
                <span class="stars">★★★★★</span>

                <span class="rating-text">
                  {{ item.ranking_by_user || '0.0' }}
                </span>
              </div>

              <div class="price-row">
                <strong>
                  {{ formatPrice(item.price, item.currency) }}
                </strong>

                <span
                  v-if="item.price_base && Number(item.price_base) > Number(item.price)"
                  class="old-price"
                >
                  {{ formatPrice(item.price_base, item.currency) }}
                </span>
              </div>
            </template>

            <!-- CARD DE LIBRO -->
            <template v-else>
              <div class="rating-row">
                <span class="stars">★★★★★</span>

                <span class="rating-text">
                  {{ item.ranking_by_user || '0.0' }}
                </span>
              </div>

              <div class="book-price">
                {{ formatPrice(item.price, item.currency) }}
              </div>

              <div class="format-row">
                <span
                  v-if="hasBookFormat(item, 'pdf')"
                  class="format-badge pdf"
                >
                  PDF
                </span>

                <span
                  v-if="hasBookFormat(item, 'epub')"
                  class="format-badge epub"
                >
                  EPUB
                </span>
              </div>
            </template>
          </div>

          <div class="card-footer">
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
      activeType: 'course',
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
        type: this.activeType,
        sort_by: this.sortBy,
        order: this.order,
        per_page: this.perPage,
        page: this.page
      }

      if (this.search.trim()) {
        params.search = this.search.trim()
      }

      await this.axios
        .get('/me/infoproducts', { params })
        .then((response) => {
          const responseData = response.data

          this.infoproducts = responseData.data || []

          if (this.infoproducts.length === 0) {
            this.notInfoproducts = true
          }

          if (responseData.meta) {
            this.page = responseData.meta.current_page || 1
            this.lastPage = responseData.meta.last_page || 1
            this.perPage = responseData.meta.per_page || this.perPage
            this.total = responseData.meta.total || 0
          } else {
            this.total = this.infoproducts.length
            this.lastPage = 1
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

    changeType(type) {
      if (this.activeType === type) return

      this.activeType = type
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
      return item.type === 'Curso' || item.type === 'course' || this.activeType === 'course'
    },

    getImage(item) {
      if (!item.url_portada) return 'https://placehold.co/600x360?text=Contenido';
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

.contents-header h1 {
  font-size: 32px;
  color: #111827;
  margin: 0 0 8px;
}

.contents-header p {
  margin: 0;
  color: #667085;
  font-size: 16px;
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
  border-color: var(--hm-primary, #10B981);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

.search-box span {
  color: #78716C;
}

.search-box input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  background: transparent;
  color: #1C1917;
}

.filter-btn,
.sort-select {
  height: 48px;
  border: 1px solid var(--hm-border, #E5E3DC);
  background: var(--hm-surface-cream, #FAF9F5);
  border-radius: 12px;
  padding: 0 18px;
  font-weight: 600;
  color: #1C1917;
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
  background: transparent;
  border: none;
  padding: 0 24px 16px;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  cursor: pointer;
  position: relative;
}

.tab-btn.active {
  color: #059212;
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
  grid-template-columns: repeat(5, minmax(240px, 1fr));
  gap: 24px;
}

.content-card {
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(16, 24, 40, 0.06);
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.content-card:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 28px rgba(16, 24, 40, 0.1);
}

.card-image-wrapper {
  position: relative;
  height: 180px;
  background: #f2f4f7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.level-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #fff2df;
  color: #f97316;
  font-size: 11px;
  font-weight: 700;
  border-radius: 999px;
  padding: 6px 10px;
  text-transform: uppercase;
}

.card-content {
  padding: 20px 20px 12px;
  flex: 1;
}

.card-content h3 {
  margin: 0 0 12px;
  color: #111827;
  font-size: 17px;
  line-height: 1.35;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

.description {
  color: #667085;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 18px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.stars {
  color: #f5b301;
  font-size: 24px;
  letter-spacing: 1px;
}

.rating-text {
  color: #475467;
  font-size: 14px;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.price-row strong,
.book-price {
  color: #059212;
  font-size: 24px;
  font-weight: 700;
}

.old-price {
  color: #667085;
  text-decoration: line-through;
  font-size: 14px;
}

.format-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
}

.format-badge {
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}

.format-badge.pdf {
  background: #fee4e2;
  color: #d92d20;
}

.format-badge.epub {
  background: #e7f0e7;
  color: #475467;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  background: none;
}

.primary-action {
  flex: 1;
  height: 48px;
  border: none;
  background: linear-gradient(to right, #20e404, #1cac0b);
  color: white;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.primary-action:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(32, 228, 4, 0.3);
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