<template>
  <div class="keep-learning-wrapper tw-h-full">
    <!-- Skeleton Screen mientras carga el endpoint -->
    <div v-if="isLoadingCourses" class="welcome-premium-banner skeleton-banner">
      <div class="tw-flex tw-flex-col tw-gap-3">
        <div class="tw-w-48 tw-h-8 tw-bg-white/20 tw-animate-pulse tw-rounded-lg"></div>
        <div class="tw-w-3/4 tw-h-4 tw-bg-white/20 tw-animate-pulse tw-rounded-lg"></div>
        <div class="tw-w-1/2 tw-h-4 tw-bg-white/20 tw-animate-pulse tw-rounded-lg"></div>
        <div class="tw-w-40 tw-h-12 tw-bg-white/20 tw-animate-pulse tw-rounded-full tw-mt-4"></div>
      </div>
    </div>

    <!-- Contenido Real al finalizar la llamada JSON del endpoint -->
    <template v-else>
      <transition name="fade">
        <div v-if="isWelcomeActive" class="welcome-premium-banner tw-flex tw-flex-col sm:tw-flex-row tw-items-center sm:tw-items-start tw-justify-between">
          
          <!-- Banner Text Content -->
          <div class="tw-flex tw-flex-col tw-justify-center tw-z-10 tw-max-w-lg tw-text-center sm:tw-text-left">
            <h2 class="welcome-title">¡Bienvenido a tu Aula Virtual, {{ user || 'Estudiante' }}!</h2>
            <p class="welcome-subtitle">
              Estás a un paso de potenciar tus habilidades. Explora nuestro catálogo de cursos diseñados por expertos y comienza tu camino hacia el éxito hoy mismo.
            </p>
            <div class="tw-mt-6">
              <router-link :to="{ name: 'courses' }" class="premium-explore-btn">
                <span>Explorar Cursos</span>
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </router-link>
            </div>
          </div>

          <!-- Banner Graphic/Illustration (CSS shapes) -->
          <div class="banner-graphic-container tw-hidden sm:tw-block tw-relative tw-w-48 tw-h-48 tw-shrink-0">
            <div class="graphic-circle graphic-circle-1"></div>
            <div class="graphic-circle graphic-circle-2"></div>
            <svg class="graphic-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>

          <!-- Decoraciones de fondo absolutas -->
          <div class="bg-decoration shape-1"></div>
          <div class="bg-decoration shape-2"></div>
        </div>
      </transition>

      <Card v-if="!isWelcomeActive && lastCourses" :course="lastCourses" :cardType="3" :width="100" />
    </template>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import Card from "@/components/courses/cards";
import { authGet } from "@/helpers/authStorage";
export default {
  components: {
    Card,
  },
  name: "KeepLearning",
  data() {
    return {
      isLoadingCourses: true,
      isWelcomeActive: false,
      lastCourses: null,
      user: authGet("name_user"),
    };
  },
  methods: {
    async getAttributes() {
      try {
        let lastCourse;
        const resp = await this.axios.get("course/last-courses-rep");

        if (resp && resp.data && (resp.data.status === 200 || resp.data.data)) {
          const coursesData = resp.data.data || [];
          if (Array.isArray(coursesData) && coursesData.length > 0) {
            this.isLoadingCourses = false;
            this.isWelcomeActive = false;

            lastCourse = this.filterCourseInactive(coursesData);
            if (lastCourse && lastCourse.id) {
              try {
                const { data } = await this.axios.get(
                  `purchased/show-class-seen?course_id=${lastCourse.id}`
                );
                const { name } = (data && data.data) ? data.data : {};
                lastCourse.last_class_reprod = name || "";
              } catch (e) {
                lastCourse.last_class_reprod = "";
              }
              this.lastCourses = lastCourse;
            } else {
              this.isWelcomeActive = true;
            }
          } else {
            this.isWelcomeActive = true;
          }
        } else {
          this.isWelcomeActive = true;
        }
      } catch (error) {
        this.isWelcomeActive = true;
      } finally {
        this.isLoadingCourses = false;
      }
    },
    filterCourseInactive(data) {
      var courseFilter = data.filter((course) => {
        return course.status != 0;
      });

      return courseFilter.splice(-1)[0];
    },
    classvideo() {
      this.$router.push(`/course-user?course=${5}&class=${"Documentacion"}`);
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter, .fade-leave-to { opacity: 0; }

.keep-learning-wrapper {
  width: 100%;
  height: 100%;
}

.welcome-banner-card {
  background: #FAF9F5 !important;
  display: flex;
  flex-direction: column;
}

.welcome-premium-banner {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 40px;
  min-height: 220px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.2);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 24px;
}

/* Background Decorations */
.bg-decoration {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  pointer-events: none;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: rgba(16, 185, 129, 0.15); /* Emerald accent */
  top: -100px;
  right: -50px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: rgba(59, 130, 246, 0.15); /* Blue accent */
  bottom: -80px;
  left: 10%;
}

/* Text Styles */
.welcome-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 12px 0;
  background: linear-gradient(to right, #ffffff, #a7f3d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
}

.welcome-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
}

/* Premium Button */
.premium-explore-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 14px 28px;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.premium-explore-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(16, 185, 129, 0.35);
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
}

.premium-explore-btn .btn-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.premium-explore-btn:hover .btn-icon {
  transform: translateX(4px);
}

/* Graphic Illustration */
.banner-graphic-container {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.graphic-circle {
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.graphic-circle-1 {
  width: 140px;
  height: 140px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  animation: pulse-slow 4s infinite alternate;
}

.graphic-circle-2 {
  width: 90px;
  height: 90px;
  background: rgba(16, 185, 129, 0.2);
  animation: pulse-slow 3s infinite alternate-reverse;
}

.graphic-icon {
  width: 48px;
  height: 48px;
  color: #34d399;
  z-index: 20;
  position: relative;
  filter: drop-shadow(0 4px 12px rgba(16, 185, 129, 0.4));
}

@keyframes pulse-slow {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

/* Responsiveness */
@media (max-width: 640px) {
  .welcome-premium-banner {
    padding: 30px 20px;
    text-align: center;
  }
  .welcome-title {
    font-size: 1.75rem;
  }
}

/* Fade Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
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

.learning {
  background: #fff;
  border-radius: 15px;
  border-color: #efefef;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 30px 42px 50px;
  height: 100%;
}

.learning p {
  text-align: start;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #131b1e;
}

.modules {
  padding-left: 20px;
}

.modules li {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  list-style: none;
}

.btn-course {
  display: flex;
  justify-content: flex-end;
}

.btn-course button {
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  border: none;
  color: #fff;
  display: grid;
  place-content: center;
  width: 181px;
  height: 37px;
  background: linear-gradient(181.51deg, #1ae800 -146.2%, #97f18d 98.72%);
  border-radius: 15px;
}
</style>
