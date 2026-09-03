<template>
  <main v-if="lastCourses.length > 0" class="tw-w-full">
    <div class="tw-flex tw-items-center tw-justify-between tw-mb-6 tw-px-2 tw-mt-2">
      <div>
        <h3 class="tw-text-2xl tw-font-bold tw-text-gray-900 dark:tw-text-white tw-font-outfit">Continúa Aprendiendo</h3>
        <p class="tw-text-gray-500 tw-text-sm tw-mt-1">Retoma tus clases desde donde las dejaste.</p>
      </div>
      <!-- Enlace a Mi Aprendizaje -->
      <router-link to="/suscription-user" class="tw-flex tw-items-center tw-text-[var(--primary-color)] hover:tw-text-green-600 tw-font-bold tw-transition-colors">
        <span class="tw-hidden sm:tw-inline">Ir a Mi Aprendizaje</span>
        <span class="sm:tw-hidden">Ver todos</span>
        <svg class="tw-w-5 tw-h-5 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </router-link>
    </div>
    
    <!-- Carrusel Estandarizado -->
    <div class="mc-carousel tw-px-2">
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
          v-for="course in lastCourses"
          :key="course.id"
          class="mc-carousel__slide tw-w-[260px]"
        >
          <Card :course="course" :cardType="2" />
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
  </main>
</template>

<script>
import Card from "@/components/courses/cards/index.vue";
import { authGet } from "@/helpers/authStorage";

export default {
  name: "CarrouselCourseViewed",
  components: {
    Card,
  },
  data() {
    return {
      username: authGet("name_user"),
      lastCourses: [],
      canScrollLeft: false,
      canScrollRight: false,
    };
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
    async getAttributes() {
      try {
        const datos = await this.axios.get("course/last-courses-rep");
        const list = (datos && datos.data && datos.data.data) ? datos.data.data : [];
        if (!Array.isArray(list)) return;
        
        let filtered = this.filterCourseInactive(list);
        this.lastCourses = filtered;
        this.$nextTick(() => this.onScroll());
        
        for (let i = 0; i < this.lastCourses.length; i++) {
          this.axios
            .get(
              `marketing/courses/purchased/show-class-seen?course_id=${this.lastCourses[i].id}`
            )
            .then((res) => {
              const name = res.data && res.data.data ? res.data.data.name : null;
              if (!name) {
                this.axios
                  .get("course/temary/get-all-class/" + this.lastCourses[i].id)
                  .then((res) => {
                    if (res.data && res.data.data && res.data.data.modules && res.data.data.modules[0]) {
                      this.$set(this.lastCourses[i], 'last_class_reprod', res.data.data.modules[0].lessons[0].name);
                    }
                  })
                  .catch(() => {});
              } else {
                this.$set(this.lastCourses[i], 'last_class_reprod', name);
              }
            })
            .catch(() => {});
        }
      } catch (error) {
        this.lastCourses = [];
      }
    },

    filterCourseInactive(data) {
      return data.filter((course) => course.status != 0);
    },

    async classvideo(id) {
      let dataRequest;
      await this.axios
        .get(`marketing/courses/purchased/show-class-seen?course_id=${id}`)
        .then((res) => {
          dataRequest = res.data.data;
          this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);
        });
      if (dataRequest == "no existe") {
        this.getCourse(id);
        let fistClass = this.course.modules[0].lessons[0].name;
        this.$router.push(`course-user?course=${id}&class=${fistClass}`);
      } else {
        this.$router.push(`course-user?course=${id}&class=${dataRequest.name}`);
      }
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style scoped>
.mc-carousel {
  position: relative;
  overflow: visible;
}

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

.mc-carousel__slide {
  flex-shrink: 0;
  scroll-snap-align: start;
  overflow: visible;
}

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
