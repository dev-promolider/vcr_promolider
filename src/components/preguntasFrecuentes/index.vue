<template>
  <div class="faq-page-wrapper container-fluid py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-xl-9 col-lg-10">
        <div class="faq-card p-4 p-md-5">
          <!-- Header Centrado -->
          <div class="faq-header-text text-center mb-4">
            <span class="faq-subtitle d-block mb-1">Resolvemos tus dudas</span>
            <h2 class="faq-main-title">Preguntas Frecuentes</h2>
          </div>

          <!-- Filtros por Categoría (Pills) -->
          <div class="faq-categories-wrapper d-flex flex-wrap justify-content-center gap-2 mb-4 pb-2">
            <button
              v-for="cat in categories"
              :key="cat.id"
              :class="['faq-category-btn', { active: activeCategory === cat.id }]"
              @click="activeCategory = cat.id"
            >
              {{ cat.name }}
            </button>
          </div>

          <!-- Skeleton Loading -->
          <div v-if="loading || preguntasF === null" class="faq-skeleton-list">
            <div v-for="i in 5" :key="i" class="faq-skeleton-item p-4 mb-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="skeleton-box" style="width: 70%; height: 20px; border-radius: 6px;"></div>
                <div class="skeleton-box" style="width: 24px; height: 24px; border-radius: 50%;"></div>
              </div>
            </div>
          </div>

          <!-- Estado Vacío -->
          <div v-else-if="filteredQuestions.length === 0" class="empty-faq text-center py-5">
            <v-icon color="#A1A1AA" size="48" class="mb-3">mdi-help-circle-outline</v-icon>
            <h5 class="empty-title mb-1">No hay preguntas registradas</h5>
            <p class="empty-desc text-muted mb-0">No se encontraron preguntas frecuentes en esta categoría.</p>
          </div>

          <!-- Lista de Preguntas (Acordeón) -->
          <div v-else class="faq-accordion-list">
            <div
              v-for="(preg, index) in filteredQuestions"
              :key="index"
              :class="['faq-accordion-item', { open: openIndex === index }]"
            >
              <div
                class="faq-item-header p-4 d-flex align-items-center justify-content-between"
                @click="toggleAccordion(index)"
              >
                <h5 class="faq-question-text mb-0">{{ preg.question || preg.titulo || preg.name }}</h5>
                <button :class="['faq-toggle-icon', { active: openIndex === index }]">
                  <v-icon :color="openIndex === index ? 'var(--primary-color)' : '#71717A'" size="22">
                    {{ openIndex === index ? 'mdi-close' : 'mdi-plus' }}
                  </v-icon>
                </button>
              </div>

              <div v-show="openIndex === index" class="faq-item-body px-4 pb-4">
                <p class="faq-answer-text mb-0">{{ preg.answer || preg.respuesta || preg.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "preguntas-frecuentes",
  data() {
    return {
      preguntasF: null,
      openIndex: null,
      loading: false,
      activeCategory: "all",
      categories: [
        { id: "all", name: "Todas" },
        { id: "courses", name: "Cursos" },
        { id: "platform", name: "Plataforma" },
        { id: "certificates", name: "Certificados" },
        { id: "payments", name: "Pagos" },
      ],
    };
  },
  computed: {
    filteredQuestions() {
      if (!this.preguntasF || !Array.isArray(this.preguntasF)) {
        return [];
      }
      if (this.activeCategory === "all") {
        return this.preguntasF;
      }
      return this.preguntasF.filter((item) => {
        if (!item.category) return true;
        return (
          item.category.toLowerCase().includes(this.activeCategory.toLowerCase()) ||
          this.activeCategory === "all"
        );
      });
    },
  },
  methods: {
    toggleAccordion(index) {
      this.openIndex = this.openIndex === index ? null : index;
    },
    async getPreguntas() {
      try {
        this.loading = true;
        const res = await this.axios.get("frequent-questions");
        this.preguntasF = (res && Array.isArray(res.data)) ? res.data : (res.data ? [res.data] : []);
      } catch (error) {
        console.error("Error al cargar preguntas frecuentes:", error);
        this.preguntasF = [];
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.getPreguntas();
  },
};
</script>

<style scoped>
.faq-page-wrapper {
  min-height: 85vh;
}

/* Tarjeta Principal */
.faq-card {
  background: #FAF9F5 !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 24px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
}

.faq-subtitle {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.9rem !important;
  color: #71717A !important;
  font-weight: 600 !important;
}

.faq-main-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 800 !important;
  font-size: 2.1rem !important;
  color: #18181B !important;
}

/* Pills de Categorías */
.faq-category-btn {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  color: #71717A !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 600 !important;
  font-size: 0.9rem !important;
  padding: 8px 20px !important;
  border-radius: 24px !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
  cursor: pointer;
}

.faq-category-btn:hover {
  border-color: var(--primary-color) !important;
  color: var(--primary-color) !important;
}

.faq-category-btn.active {
  background: var(--primary-color) !important;
  color: #FFFFFF !important;
  border-color: var(--primary-color) !important;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3) !important;
}

/* Items del Acordeón */
.faq-accordion-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.faq-accordion-item {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 18px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  overflow: hidden;
}

.faq-accordion-item:hover {
  border-color: #CBD5E1 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04) !important;
}

.faq-accordion-item.open {
  border: 2px solid var(--primary-color) !important;
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.03) 0%, #FFFFFF 100%) !important;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.12) !important;
}

.faq-item-header {
  cursor: pointer;
  user-select: none;
}

.faq-question-text {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.05rem !important;
  color: #18181B !important;
  line-height: 1.4;
}

.faq-toggle-icon {
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  flex-shrink: 0;
  margin-left: 16px;
}

.faq-accordion-item.open .faq-toggle-icon {
  background: rgba(16, 185, 129, 0.1);
}

.faq-answer-text {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.95rem !important;
  color: #71717A !important;
  line-height: 1.6;
  border-top: 1px dashed #E5E3DC;
  padding-top: 14px;
}

/* Skeleton Loading */
.faq-skeleton-item {
  background: #FFFFFF;
  border: 1px solid #E5E3DC;
  border-radius: 18px;
}

.skeleton-box {
  background-color: #E5E3DC;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.5) 20%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  background-position: -150px 0;
  animation: skeleton-shimmer 1.6s infinite ease-in-out;
}

@keyframes skeleton-shimmer {
  to {
    background-position: calc(100% + 150px) 0;
  }
}
</style>
