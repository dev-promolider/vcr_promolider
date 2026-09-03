<template>
  <div class="hero-slider-wrapper tw-relative tw-w-full tw-overflow-hidden tw-shadow-md slider-height">
      <!-- Banners -->
      <transition-group name="fade" tag="div" class="tw-absolute tw-inset-0">
        <div 
          v-for="(banner, index) in banners" 
          :key="banner.id" 
          v-show="currentIndex === index"
          class="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-cursor-pointer"
          @click="goToMarketplace(banner.filter)"
        >
          <!-- Imagen de fondo -->
          <img 
            :src="banner.image" 
            :alt="banner.title" 
            class="tw-w-full tw-h-full tw-object-cover tw-object-center" 
          />
          
          <!-- Gradiente de superposición para texto -->
          <div class="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-black/80 tw-via-black/40 tw-to-transparent tw-flex tw-flex-col tw-justify-center tw-p-8 md:tw-p-16">
            <h2 class="tw-text-2xl md:tw-text-4xl tw-font-bold tw-text-white tw-mb-3 tw-font-outfit tw-max-w-xl">
              {{ banner.title }}
            </h2>
            <p class="tw-text-sm md:tw-text-lg tw-text-gray-200 tw-mb-6 tw-max-w-lg">
              {{ banner.subtitle }}
            </p>
            <div>
              <button class="tw-bg-[var(--primary-color)] hover:tw-bg-green-600 tw-text-white tw-font-bold tw-py-2 tw-px-6 md:tw-py-3 md:tw-px-8 tw-rounded-xl tw-transition-all tw-transform hover:tw-scale-105 tw-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                {{ banner.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Indicadores (Dots) -->
      <div class="tw-absolute tw-bottom-4 tw-left-0 tw-right-0 tw-flex tw-justify-center tw-gap-2 tw-z-10">
        <button 
          v-for="(_, index) in banners" 
          :key="'dot-'+index"
          @click="setSlide(index)"
          class="tw-w-3 tw-h-3 tw-rounded-full tw-transition-all"
          :class="currentIndex === index ? 'tw-bg-white tw-w-8' : 'tw-bg-white/50 hover:tw-bg-white/80'"
          aria-label="Ir a diapositiva"
        ></button>
      </div>
      
      <!-- Controles Laterales -->
      <button @click="prevSlide" class="tw-absolute tw-left-4 tw-top-1/2 tw--translate-y-1/2 tw-w-10 tw-h-10 tw-rounded-full tw-bg-black/30 hover:tw-bg-black/50 tw-text-white tw-flex tw-items-center tw-justify-center tw-transition-colors tw-z-10">
        <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button @click="nextSlide" class="tw-absolute tw-right-4 tw-top-1/2 tw--translate-y-1/2 tw-w-10 tw-h-10 tw-rounded-full tw-bg-black/30 hover:tw-bg-black/50 tw-text-white tw-flex tw-items-center tw-justify-center tw-transition-colors tw-z-10">
        <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
  </div>
</template>

<script>
export default {
  name: "HeroBannerSlider",
  data() {
    return {
      currentIndex: 0,
      slideInterval: null,
      // Banners por defecto (mock) hasta tener endpoint
      banners: [
        {
          id: 1,
          title: "¡Potencia tu Liderazgo!",
          subtitle: "Descubre nuestra nueva colección de cursos de desarrollo personal y profesional.",
          buttonText: "Ver Cursos",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1280&h=720&auto=format&fit=crop",
          filter: "liderazgo"
        },
        {
          id: 2,
          title: "Oferta Especial en Marketing",
          subtitle: "Aprovecha descuentos únicos en todas nuestras rutas de Marketing Digital.",
          buttonText: "Aprovechar Oferta",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1280&h=720&auto=format&fit=crop",
          filter: "marketing"
        },
        {
          id: 3,
          title: "Cursos Gratuitos para Ti",
          subtitle: "Empieza hoy mismo con nuestros minicursos seleccionados sin costo.",
          buttonText: "Explorar Gratis",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1280&h=720&auto=format&fit=crop",
          filter: "free"
        }
      ]
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.banners.length;
      this.resetInterval();
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.banners.length) % this.banners.length;
      this.resetInterval();
    },
    setSlide(index) {
      this.currentIndex = index;
      this.resetInterval();
    },
    startInterval() {
      this.slideInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.banners.length;
      }, 5000);
    },
    resetInterval() {
      clearInterval(this.slideInterval);
      this.startInterval();
    },
    goToMarketplace(filter) {
      // Redirige al marketplace con el query param del filtro
      this.$router.push({ name: 'courses', query: { categoria: filter } }).catch(() => {});
    }
  },
  mounted() {
    this.startInterval();
  },
  beforeDestroy() {
    clearInterval(this.slideInterval);
  }
};
</script>

<style scoped>
.slider-height {
  height: 250px;
}
@media (min-width: 768px) {
  .slider-height {
    height: 350px;
  }
}
@media (min-width: 1024px) {
  .slider-height {
    height: 380px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
