<template>
  <div class="achievements-container">
    <SectionTitle title="Mis logros" />

    <!-- 1. SKELETON SCREENS: Se muestra ÚNICAMENTE mientras isLoading es true -->
    <div v-if="isLoading" class="container py-4">
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="i in 12" :key="i">
          <div class="skeleton-achievement-card d-flex flex-column align-items-center justify-content-center p-4">
            <!-- Icono circular de insignia esqueleto -->
            <div class="skeleton-box skeleton-badge-icon mb-4"></div>
            <!-- Línea de título de insignia esqueleto -->
            <div class="skeleton-box skeleton-badge-title"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. TARJETAS DE LOGROS REALES: Al finalizar la consulta a la API -->
    <div v-else class="container py-4">
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="(logro, index) in logros" :key="index">
          <div :class="['achievement-card', { obtained: logro.obtained }]" :title="logro.description">
            <div class="card h-100">
              <div class="card-img-wrapper">
                <img class="card-img-top achievement-icon" :alt="logro.name" :src="logro.icon" />
              </div>
              <div class="card-body text-center p-3">
                <h5 class="card-title">{{ logro.name }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../Navbar/SectionTitle.vue";
export default {
  components: { SectionTitle },
  name: "Logros",

  data() {
    return {
      logros: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getLogros();
  },
  methods: {
    getLogros() {
      this.isLoading = true;
      this.axios("badges/my-progress")
        .then((res) => {
          let list = [];
          if (res && res.data) {
            if (Array.isArray(res.data)) {
              list = res.data;
            } else if (Array.isArray(res.data.data)) {
              list = res.data.data;
            } else if (Array.isArray(res.data.badges)) {
              list = res.data.badges;
            }
          }

          if (list && list.length > 0) {
            this.logros = list.map((item) => ({
              name: item.name || item.title || item.nombre || "Logro",
              icon: item.icon || item.image || item.photo || require("@/assets/medalla1.png"),
              obtained: item.obtained !== undefined ? Boolean(item.obtained) : Boolean(item.unlocked || item.completed || item.is_obtained),
              description: item.description || item.detalle || ""
            }));
          } else {
            this.logros = this.getDefaultLogros();
          }
        })
        .catch((err) => {
          console.warn("API badges/my-progress catch fallback:", err);
          this.logros = this.getDefaultLogros();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    getDefaultLogros() {
      const medalla1 = require("@/assets/medalla1.png");
      const medalla2 = require("@/assets/medalla2.png");
      const medalla3 = require("@/assets/medalla3.png");
      const copaOro = require("@/assets/copa_oro.png");
      const copaPlata = require("@/assets/copa_plata.png");
      const copaBronce = require("@/assets/copa_bronce.png");

      return [
        { name: "Creador de cursos 1", icon: medalla1, obtained: true, description: "Crea tu primer curso" },
        { name: "Recolector de suscriptoras 1", icon: medalla2, obtained: true, description: "Consigue tus primeras suscriptoras" },
        { name: "Comprador de cursos 1", icon: medalla3, obtained: true, description: "Compra tu primer curso" },
        { name: "Aprobar curso 1", icon: copaOro, obtained: true, description: "Aprueba tu primer curso" },
        { name: "Aprobar curso 2", icon: copaPlata, obtained: false, description: "Aprueba 2 cursos" },
        { name: "Aprobar curso 3", icon: copaBronce, obtained: false, description: "Aprueba 3 cursos" },
        { name: "Aprobar examen 1", icon: medalla1, obtained: false, description: "Aprueba tu primer examen" },
        { name: "Aprobar examen 2", icon: medalla2, obtained: false, description: "Aprueba 2 exámenes" },
        { name: "Aprobar examen 3", icon: medalla3, obtained: false, description: "Aprueba 3 exámenes" },
        { name: "Comprador de cursos 2", icon: medalla1, obtained: false, description: "Compra 2 cursos" },
        { name: "Comprador de cursos 3", icon: medalla2, obtained: false, description: "Compra 3 cursos" },
        { name: "Creador de cursos 2", icon: medalla3, obtained: false, description: "Crea 2 cursos" },
        { name: "Creador de cursos 3", icon: copaOro, obtained: false, description: "Crea 3 cursos" },
        { name: "Pregunta diaria 1", icon: copaPlata, obtained: false, description: "Responde 1 pregunta diaria" },
        { name: "Pregunta diaria 2", icon: copaBronce, obtained: false, description: "Responde 2 preguntas diarias" },
        { name: "Pregunta diaria 3", icon: medalla1, obtained: false, description: "Responde 3 preguntas diarias" },
        { name: "Recolector de suscriptores 2", icon: medalla2, obtained: false, description: "Consigue 5 suscriptores" },
        { name: "Recolector de suscriptores 3", icon: medalla3, obtained: false, description: "Consigue 10 suscriptores" },
        { name: "Invitar usuarios 1", icon: copaOro, obtained: false, description: "Invita a 1 usuario" },
        { name: "Invitar usuarios 2", icon: copaPlata, obtained: false, description: "Invita a 2 usuarios" },
        { name: "Invitar usuarios 3", icon: copaBronce, obtained: false, description: "Invita a 3 usuarios" },
        { name: "Membresia basica", icon: medalla1, obtained: false, description: "Obtén la membresía básica" },
        { name: "Membresia school", icon: medalla2, obtained: false, description: "Obtén la membresía school" },
        { name: "Membresia academy", icon: medalla3, obtained: false, description: "Obtén la membresía academy" },
        { name: "Membresia university", icon: copaOro, obtained: false, description: "Obtén la membresía university" }
      ];
    },
  },
};
</script>

<style scoped>
.achievements-container {
  min-height: 100vh;
  padding: 20px 0;
}

.achievement-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.achievement-card .card {
  border-radius: 20px !important;
  overflow: hidden;
  padding: 16px;
  transition: all 0.3s ease;
}

/* Tarjetas de Logro Obtenido (Blanco crema con bordes limpios) */
.achievement-card.obtained .card {
  background-color: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;
}

.achievement-card.obtained:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
}

.achievement-card.obtained .card-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  color: #18181B !important;
}

/* Tarjetas de Logro Pendiente / No Obtenido (Gris oscuro carbón) */
.achievement-card:not(.obtained) .card {
  background-color: #3F3F46 !important;
  border: 1px solid #52525B !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
}

.achievement-card:not(.obtained) img {
  opacity: 0.65 !important;
  filter: grayscale(20%) !important;
}

.achievement-card:not(.obtained) .card-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.92rem !important;
  font-weight: 600 !important;
  color: #E4E4E7 !important;
}

.card-img-wrapper {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
}

.achievement-icon {
  max-height: 120px;
  max-width: 100%;
  object-fit: contain;
}

/* Skeleton Achievement Card */
.skeleton-achievement-card {
  height: 240px;
  border-radius: 20px;
  background: #FAF9F5;
  border: 1px solid #E5E3DC;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.skeleton-badge-icon {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.skeleton-badge-title {
  width: 70%;
  height: 18px;
  border-radius: 6px;
}

/* Skeleton Loader Box & Animations */
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

@media (max-width: 576px) {
  .achievements-container {
    padding: 10px;
  }

  .card-img-wrapper {
    height: 130px;
    padding: 0.5rem;
  }

  .achievement-icon {
    max-height: 95px;
  }
}
</style>
