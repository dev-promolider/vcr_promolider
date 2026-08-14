<template>
  <div class="mc-carousel">
    <button
      v-if="canScrollLeft"
      class="mc-carousel__btn mc-carousel__btn--left"
      @click="scrollLeft"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <div class="mc-carousel__track" ref="track" @scroll="onScroll">
      <div
        v-for="course in courses"
        :key="`${course.id}-${course.title}`"
        class="mc-carousel__slide"
      >
        <Card
          :course="course"
          :cardType="cardType"
          :categories="categories"
          :viewMode="viewMode"
        />
      </div>
    </div>

    <button
      v-if="canScrollRight"
      class="mc-carousel__btn mc-carousel__btn--right"
      @click="scrollRight"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import Card from "@/components/courses/cards/marketplace.vue";

export default {
  name: "CarrouselCourseMarketplace",
  components: { Card },
  props: {
    courses: { type: Array, default: () => [] },
    viewMode: { type: String, default: "marketplace" },
  },
  data() {
    return {
      cardType: 1,
      categories: [],
      canScrollLeft: false,
      canScrollRight: true,
    };
  },
  async created() {
    try {
      const response = await axios.get("category/list");
      this.categories = response.data.data || [];
    } catch (e) {
      this.categories = [];
    }
  },
  mounted() {
    this.$nextTick(() => this.onScroll());
  },
  methods: {
    onScroll() {
      const track = this.$refs.track;
      if (!track) return;
      this.canScrollLeft = track.scrollLeft > 10;
      this.canScrollRight =
        track.scrollLeft < track.scrollWidth - track.clientWidth - 10;
    },
    scrollLeft() {
      this.$refs.track?.scrollBy({ left: -280, behavior: "smooth" });
    },
    scrollRight() {
      this.$refs.track?.scrollBy({ left: 280, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
/* Contenedor principal: overflow visible para que el popover no se recorte */
.mc-carousel {
  position: relative;
  overflow: visible;
}

/* Track de scroll horizontal */
.mc-carousel__track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 16px;
  padding-top: 4px;
}

.mc-carousel__track::-webkit-scrollbar {
  display: none;
}

/* Slide individual: overflow visible para que el popover salga */
.mc-carousel__slide {
  flex-shrink: 0;
  scroll-snap-align: start;
  overflow: visible;
}

/* Botones de navegación */
.mc-carousel__btn {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  z-index: 20;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #374151;
}

.mc-carousel__btn:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
  box-shadow: 0 4px 14px rgba(24, 214, 0, 0.35);
}

.mc-carousel__btn--left {
  left: -19px;
}

.mc-carousel__btn--right {
  right: -19px;
}
</style>
