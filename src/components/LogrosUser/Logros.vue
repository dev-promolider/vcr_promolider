<template>
  <div class="achievements-container">
    <section-title title="Mis logros" />

    <div v-if="!isLoading" class="container py-4">
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(logro, index) in logros" :key="index">
          <div :class="['achievement-card', { obtained: logro.obtained }]" :title="logro.description">
            <div class="card h-100">
              <div class="card-img-wrapper">
                <img class="card-img-top achievement-icon" :alt="logro.name" :src="logro.icon" />
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ logro.name }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-if="isLoading">
      <div class="container">
        <div class="row g-4">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="i in 12" :key="i">
            <v-skeleton-loader class="skeleton-card" type="image"></v-skeleton-loader>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import SectionTitle from "../Navbar/SectionTitle.vue";
export default {
  components: { SectionTitle },
  name: "Logros",

  data() {
    return {
      logros: null,
      isLoading: true,
    };
  },
  mounted() {
    this.getLogros();
  },
  methods: {
    getLogros() {
      this.axios("badges/my-progress")
        .then((res) => {
          this.logros = res.data;
        })
        .catch(() => {
          this.logros = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
.achievements-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;
}

.achievement-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.achievement-card .card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  background-color: transparent;
}

.achievement-card.obtained .card {
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.achievement-card.obtained:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-img-wrapper {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.achievement-icon {
  max-height: 150px;
  max-width: 100%;
  object-fit: contain;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #343a40;
  text-align: center;
}

/* Estilos para logros no obtenidos */
.achievement-card:not(.obtained) .card {
  background-color: #808080;
}

.achievement-card:not(.obtained) img {
  opacity: 0.4;
}

.achievement-card:not(.obtained) .card-title {
  color: #afafaf;
  opacity: 0.4;
}

.skeleton-card {
  height: 300px;
  border-radius: 12px;
  background-color: #f0f0f0;
}

@media (max-width: 576px) {
  .achievements-container {
    padding: 10px;
  }

  .card-img-wrapper {
    height: 180px;
    padding: 1rem;
  }

  .achievement-icon {
    max-height: 120px;
  }
}
</style>
