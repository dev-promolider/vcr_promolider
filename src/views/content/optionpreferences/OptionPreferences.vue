<template>
  <div class="preferences-wrapper p-3 md:p-4">
    <SectionTitle title="Mis preferencias" />

    <!-- Subtítulo explicativo & Contador de Selección -->
    <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
      <p class="preferences-subtitle mb-0">
        Selecciona como mínimo 3 categorías de tu interés para personalizar tus recomendaciones.
      </p>
      <div class="selection-counter-badge px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-2" :class="list.length >= 3 ? 'counter-valid' : 'counter-warning'">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ list.length }} seleccionadas (mínimo 3)</span>
      </div>
    </div>

    <!-- 1. SKELETON SCREENS GRID: Mientras se cargan las categorías de la API -->
    <div v-if="!isLoading" class="container-fluid px-0">
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="i in 8" :key="i">
          <div class="skeleton-preference-card p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div class="skeleton-box" style="width: 44px; height: 44px; border-radius: 14px;"></div>
              <div class="skeleton-box" style="width: 80px; height: 26px; border-radius: 20px;"></div>
            </div>
            <div class="skeleton-box mb-2" style="width: 70%; height: 20px; border-radius: 6px;"></div>
            <div class="skeleton-box" style="width: 90%; height: 14px; border-radius: 6px;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. GRID DE CATEGORÍAS REALES -->
    <div v-else class="container-fluid px-0">
      <div class="row g-4">
        <div
          v-for="preference in preferences"
          :key="preference.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        >
          <div
            :class="['preference-card p-4', { active: isSelected(preference.id) }]"
            @click="editPreference(preference)"
          >
            <!-- Fila Superior: Ícono de categoría + Badge de estado -->
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="category-icon-wrapper">
                <img v-if="isImgUrl(preference.icon)" :src="getCategoryImgUrl(preference)" class="category-img" @error="onImgError" />
                <svg v-else width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="getCategorySvgD(preference)"></path>
                </svg>
              </div>

              <!-- Indicador de selección -->
              <div :class="['status-chip d-flex align-items-center gap-1.5 px-3 py-1', isSelected(preference.id) ? 'chip-active' : 'chip-inactive']">
                <svg v-if="isSelected(preference.id)" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg v-else width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
                </svg>
                <span>{{ isSelected(preference.id) ? 'Elegido' : 'Elegir' }}</span>
              </div>
            </div>

            <!-- Contenido: Título y Descripción -->
            <div class="preference-info">
              <h4 class="preference-title mb-1">{{ preference.name }}</h4>
              <p class="preference-desc mb-0">Cursos e infoproductos destacados de {{ preference.name.toLowerCase() }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SectionTitle from "../../../components/Navbar/SectionTitle.vue";

export default {
  name: "Preferences",
  components: {
    SectionTitle,
  },

  data() {
    return {
      preferences: [],
      list: [],
      formData: [],
      list_init: [],
      isLoading: false,
    };
  },
  created() {
    this.setPreferencesList();
    this.listPreferences();
  },
  methods: {
    onImgError(e) {
      if (e && e.target) {
        e.target.style.display = "none";
      }
    },
    isSelected(categoryId) {
      return this.list.includes(categoryId);
    },
    isImgUrl(icon) {
      if (!icon || typeof icon !== "string") return false;
      return icon.startsWith("http://") || icon.startsWith("https://") || icon.includes("/uploads/") || icon.includes("/storage/") || icon.endsWith(".png") || icon.endsWith(".jpg") || icon.endsWith(".svg") || icon.endsWith(".webp");
    },
    getCategoryImgUrl(preference) {
      if (!preference || !preference.icon) return "";
      const icon = preference.icon;
      if (icon.startsWith("http://") || icon.startsWith("https://") || icon.startsWith("data:")) {
        return icon;
      }
      const cleanPath = icon.startsWith("/") ? icon : `/${icon}`;
      const baseUrl = process.env.VUE_APP_API_URL_IMAGE || "https://api.promolider.email";
      return `${baseUrl}${cleanPath}`;
    },
    getCategorySvgD(preference) {
      const name = (preference && preference.name ? preference.name : "").toLowerCase();
      if (name.includes("web") || name.includes("sitio") || name.includes("internet")) {
        return "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9";
      }
      if (name.includes("negocio") || name.includes("business") || name.includes("empresa")) {
        return "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
      }
      if (name.includes("marketing") || name.includes("publicidad") || name.includes("promocion")) {
        return "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A2.5 2.5 0 013 11.2V9.8a2.5 2.5 0 012.436-2.483L17 6.5M17 6.5l3 3.5m-3-3.5L14 3";
      }
      if (name.includes("diseño") || name.includes("design") || name.includes("arte")) {
        return "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01";
      }
      if (name.includes("personal") || name.includes("liderazgo") || name.includes("desarrollo")) {
        return "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z";
      }
      if (name.includes("salud") || name.includes("fitness") || name.includes("vida")) {
        return "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z";
      }
      if (name.includes("finanza") || name.includes("dinero") || name.includes("inversion")) {
        return "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
      }
      if (name.includes("programación") || name.includes("codigo") || name.includes("app") || name.includes("tecnología")) {
        return "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4";
      }
      if (name.includes("enseñanza") || name.includes("academia") || name.includes("educación") || name.includes("curso")) {
        return "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z";
      }
      return "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z";
    },
    async listPreferences() {
      try {
        const resp = await this.axios.get("category/list");
        if (resp && resp.status == 200 && resp.data) {
          const data = resp.data.data || [];
          this.preferences = data;
          this.isLoading = true;
        }
      } catch (e) {
        this.isLoading = true;
      }
    },
    async editPreference(preference) {
      if (this.list.includes(preference.id)) {
        // Prevent deselecting if less than 3
        if (this.list.length <= 3) {
           this.makeToast("danger", "Debe mantener al menos 3 categorías seleccionadas");
           return;
        }
        const index = this.list.indexOf(preference.id);
        this.list.splice(index, 1);
        await this.toRegister([preference.id], "delete");
      } else {
        this.list.push(preference.id);
        await this.toRegister([preference.id], "save");
      }
    },
    async toRegister(array, accion) {
      let preferences = { categorys: array };
      const url =
        accion == "save"
          ? "/preferences/add"
          : "/preferences/delete-preferences";
      const text = accion == "save" ? "registradas" : "eliminadas";

      try {
        const resp = await this.axios.post(url, preferences);
        if (resp.status === 200) {
          this.makeToast("success", "Categorías " + text + " correctamente");
          await this.setPreferencesList();
        } else {
          this.makeToast("danger", "Error al intentar registrar los cambios");
          await this.setPreferencesList();
        }
      } catch (e) {
        this.makeToast("danger", "Error de red al actualizar preferencias");
        this.isLoading = true;
      }
    },
    async setPreferencesList() {
      try {
        const resp = await this.axios.get("preferences/show-preferences");
        if (resp && resp.status == 200 && resp.data) {
          const data = resp.data.data || [];
          this.list = [];
          this.list_init = [];
          for (let i = 0; i < data.length; i++) {
            if (!this.list.includes(data[i].categories_id)) {
              this.list.push(data[i].categories_id);
              this.list_init.push(data[i].categories_id);
            }
          }
          this.isLoading = true;
        }
      } catch (e) {
        this.isLoading = true;
      }
    },
    makeToast(variant, msg) {
      this.$bvToast.toast(msg, {
        title: "Categorías",
        variant: variant,
        toaster: "b-toaster-top-center",
        solid: true,
      });
    },
  },
};
</script>

<style scoped>
.preferences-wrapper {
  min-height: 85vh;
}

.preferences-subtitle {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--text-muted, #71717A);
}

.selection-counter-badge {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.counter-valid {
  background: rgba(16, 185, 129, 0.15) !important;
  color: var(--primary-color) !important;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.counter-warning {
  background: rgba(245, 158, 11, 0.15) !important;
  color: #F59E0B !important;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

/* Card General */
.preference-card {
  background: var(--card-sub-bg, #FAF9F5);
  border: 1px solid var(--border-color, #E5E3DC);
  border-radius: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  user-select: none;
}

.preference-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(16, 185, 129, 0.15) !important;
  border-color: var(--primary-color) !important;
}

/* Card Seleccionada */
.preference-card.active {
  background: var(--card-sub-bg, #FFFFFF) !important;
  border: 2px solid var(--primary-color) !important;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2) !important;
}

/* Icono Badge de Categoría */
.category-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(16, 185, 129, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  flex-shrink: 0;
}

.category-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* Chip de Estado */
.status-chip {
  border-radius: 20px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.chip-active {
  background: rgba(16, 185, 129, 0.2) !important;
  color: var(--primary-color) !important;
  border: 1px solid var(--primary-color);
}

.chip-inactive {
  background: rgba(255, 255, 255, 0.05) !important;
  color: var(--text-muted, #71717A) !important;
  border: 1px solid var(--border-color, #E5E3DC);
}

.preference-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.05rem !important;
  font-weight: 700 !important;
  color: var(--text-bold, #18181B) !important;
  line-height: 1.3;
}

.preference-desc {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.82rem !important;
  color: var(--text-muted, #71717A) !important;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Guardar Button */
.save-preferences-btn {
  background-color: var(--primary-color) !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 14px !important;
  padding: 12px 28px !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35) !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  cursor: pointer;
}

.save-preferences-btn:hover {
  background-color: var(--primary-hover) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.45) !important;
}

/* Skeleton */
.skeleton-preference-card {
  height: 150px;
  border-radius: 20px;
  background: var(--card-sub-bg, #FAF9F5);
  border: 1px solid var(--border-color, #E5E3DC);
}

.skeleton-box {
  background-color: var(--border-color, #E5E3DC);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.5) 20%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  background-position: -150px 0;
  border-radius: 8px;
  animation: skeleton-shimmer 1.6s infinite ease-in-out;
}

@keyframes skeleton-shimmer {
  to {
    background-position: calc(100% + 150px) 0;
  }
}
</style>
