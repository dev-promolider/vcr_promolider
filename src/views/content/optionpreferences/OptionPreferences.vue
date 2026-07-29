<template>
  <div class="preferences-wrapper p-4">
    <SectionTitle title="Mis preferencias" />

    <!-- Subtítulo explicativo -->
    <div class="preferences-header-info mb-4">
      <p class="preferences-subtitle">
        Selecciona como mínimo 3 categorías de tu interés para personalizar tus recomendaciones.
      </p>
    </div>

    <!-- 1. SKELETON SCREENS GRID: Mientras se cargan las categorías de la API -->
    <div v-if="!isLoading" class="container-fluid px-0">
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="i in 8" :key="i">
          <div class="skeleton-preference-card p-4">
            <div class="d-flex justify-space-between align-center mb-4">
              <div class="skeleton-box" style="width: 50%; height: 20px; border-radius: 6px;"></div>
              <div class="skeleton-box" style="width: 48px; height: 48px; border-radius: 50%;"></div>
            </div>
            <div class="skeleton-box mb-2" style="width: 80%; height: 14px; border-radius: 6px;"></div>
            <div class="skeleton-box" style="width: 40%; height: 14px; border-radius: 6px;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. GRID DE CATEGORÍAS REALES (Inspirado en la Imagen de Referencia) -->
    <div v-else class="container-fluid px-0">
      <div class="row g-4">
        <div
          v-for="preference in preferences"
          :key="preference.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        >
          <div
            :class="['preference-card', { active: isSelected(preference.id) }]"
            @click="editPreference(preference)"
          >
            <!-- Badge de icono circular arriba a la derecha (Estilo Imagen Referencia) -->
            <div class="preference-badge-icon">
              <v-icon :color="isSelected(preference.id) ? '#FFFFFF' : '#10B981'" size="24">
                {{ isSelected(preference.id) ? 'mdi-check' : getCategoryIcon(preference) }}
              </v-icon>
            </div>

            <!-- Título y detalles de la categoría -->
            <div class="preference-card-content">
              <h4 class="preference-title">{{ preference.name }}</h4>
              <p class="preference-description">
                Cursos de {{ preference.name.toLowerCase() }} e infoproductos destacados
              </p>
            </div>

            <!-- Pie de tarjeta con indicador de selección -->
            <div class="preference-card-footer d-flex align-center justify-space-between mt-3">
              <span :class="['preference-status-tag', { 'tag-active': isSelected(preference.id) }]">
                {{ isSelected(preference.id) ? 'Seleccionado' : 'Toca para elegir' }}
              </span>
              <v-icon size="18" :color="isSelected(preference.id) ? '#10B981' : '#A1A1AA'">
                {{ isSelected(preference.id) ? 'mdi-check-circle' : 'mdi-plus-circle-outline' }}
              </v-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de Guardar flotante/fijo -->
      <div class="d-flex justify-end mt-4 mb-5">
        <button class="save-preferences-btn d-flex align-center" @click="addPreferences">
          <v-icon color="#FFFFFF" size="20" class="mr-2">mdi-content-save-outline</v-icon>
          <span>Guardar preferencias</span>
        </button>
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
    isSelected(categoryId) {
      return this.list.includes(categoryId);
    },
    getCategoryIcon(preference) {
      if (preference && preference.icon && (preference.icon.includes("mdi-") || preference.icon.includes("fa-") || preference.icon.includes("bi-"))) {
        return preference.icon;
      }
      const name = (preference && preference.name ? preference.name : "").toLowerCase();
      if (name.includes("web") || name.includes("sitio")) return "mdi-web";
      if (name.includes("negocio") || name.includes("business")) return "mdi-briefcase-outline";
      if (name.includes("personal") || name.includes("desarrollo personal")) return "mdi-lightbulb-outline";
      if (name.includes("diseño") || name.includes("design")) return "mdi-palette-outline";
      if (name.includes("marketing") || name.includes("publicidad")) return "mdi-bullhorn-outline";
      if (name.includes("estilo") || name.includes("vida") || name.includes("lifestyle")) return "mdi-compass-outline";
      if (name.includes("salud") || name.includes("fitness")) return "mdi-heart-pulse";
      if (name.includes("enseñanza") || name.includes("academia") || name.includes("educación")) return "mdi-school-outline";
      if (name.includes("móvil") || name.includes("movil") || name.includes("app")) return "mdi-cellphone";
      if (name.includes("programación") || name.includes("lenguaje") || name.includes("codigo")) return "mdi-code-tags";
      if (name.includes("juegos") || name.includes("game")) return "mdi-controller";
      if (name.includes("finanza") || name.includes("dinero")) return "mdi-finance";
      if (name.includes("comunicación") || name.includes("media")) return "mdi-message-text-outline";
      if (name.includes("estrategia")) return "mdi-chess-knight";
      if (name.includes("proyecto")) return "mdi-folder-kanban-outline";
      if (name.includes("derecho") || name.includes("ley")) return "mdi-gavel";
      if (name.includes("transformación")) return "mdi-auto-fix";
      if (name.includes("liderazgo") || name.includes("líder")) return "mdi-account-group-outline";
      return "mdi-bookmark-star-outline";
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
    editPreference(preference) {
      if (this.list.includes(preference.id)) {
        const index = this.list.indexOf(preference.id);
        this.list.splice(index, 1);
      } else {
        this.list.push(preference.id);
      }
    },
    async addPreferences() {
      let array_save = [];
      let array_delete = [];

      this.list_init.forEach((preference) => {
        if (!this.list.includes(preference)) {
          array_delete.push(preference);
        }
      });

      this.list.forEach((preference) => {
        if (!this.list_init.includes(preference)) {
          array_save.push(preference);
        }
      });

      if (this.list.length >= 3) {
        this.isLoading = false;
        if (array_save.length != 0) {
          await this.toRegister(array_save, "save");
        }
        if (array_delete.length != 0) {
          await this.toRegister(array_delete, "delete");
        }
        if (array_delete.length == 0 && array_save.length == 0) {
          this.makeToast("success", "No se ha realizado ningún cambio");
          this.isLoading = true;
        }
      } else {
        this.makeToast("danger", "Debe seleccionar como mínimo 3 categorías");
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
  color: #71717A;
}

/* Card Estilo Imagen de Referencia */
.preference-card {
  background: #FAF9F5;
  border: 1px solid #E5E3DC;
  border-radius: 24px;
  padding: 24px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
}

.preference-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.12);
  border-color: #10B981;
}

/* Card Seleccionada / Activa */
.preference-card.active {
  background: #FFFFFF !important;
  border: 2px solid #10B981 !important;
  box-shadow: 0 10px 28px rgba(16, 185, 129, 0.18) !important;
}

/* Top-Right Badge Icon (Estilo Imagen Referencia) */
.preference-badge-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 1px solid #E5E3DC;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.preference-card.active .preference-badge-icon {
  background: #10B981 !important;
  border-color: #10B981 !important;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4) !important;
}

.preference-card-content {
  padding-right: 50px;
  margin-bottom: 16px;
}

.preference-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.2rem !important;
  font-weight: 700 !important;
  color: #18181B !important;
  line-height: 1.3;
  margin: 0 0 8px 0;
}

.preference-description {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.85rem !important;
  color: #71717A !important;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.preference-status-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: #71717A;
  background: rgba(0, 0, 0, 0.04);
  padding: 4px 12px;
  border-radius: 20px;
}

.preference-status-tag.tag-active {
  color: #10B981;
  background: rgba(16, 185, 129, 0.12);
}

/* Guardar Button */
.save-preferences-btn {
  background-color: #10B981 !important;
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
  background-color: #059669 !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.45) !important;
}

/* Skeleton Preference Card */
.skeleton-preference-card {
  height: 180px;
  border-radius: 24px;
  background: #FAF9F5;
  border: 1px solid #E5E3DC;
  position: relative;
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
  border-radius: 8px;
  animation: skeleton-shimmer 1.6s infinite ease-in-out;
}

@keyframes skeleton-shimmer {
  to {
    background-position: calc(100% + 150px) 0;
  }
}
</style>
