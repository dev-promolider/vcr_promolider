<template>
  <div class="keep-learning-wrapper">
    <!-- Skeleton Screen mientras carga el endpoint -->
    <div v-if="isLoadingCourses" class="welcome-banner-card hallmark-card skeleton-card">
      <div class="d-flex align-center mb-3">
        <div class="skeleton-box skeleton-badge mr-3"></div>
        <div class="flex-grow-1">
          <div class="skeleton-box skeleton-line-title mb-2"></div>
          <div class="skeleton-box skeleton-line-sub"></div>
        </div>
      </div>
      <div class="mt-4">
        <div class="skeleton-box skeleton-btn"></div>
      </div>
    </div>

    <!-- Contenido Real al finalizar la llamada JSON del endpoint -->
    <template v-else>
      <v-fade-transition>
        <div v-if="isWelcomeActive" class="welcome-banner-card hallmark-card">
          <div class="d-flex align-center mb-3">
            <div class="welcome-icon-badge mr-3">
              <v-icon color="#10B981" size="24">mdi-sparkles</v-icon>
            </div>
            <div>
              <h2 class="welcome-banner-title">¡Bienvenido de nuevo, {{ user || 'Estudiante' }}!</h2>
              <p class="welcome-banner-subtitle">En esta sección podrás visualizar tus cursos activos y alcanzar tus logros.</p>
            </div>
          </div>

          <div class="mt-4">
            <v-btn color="#10B981" dark class="marketplace-pill-btn" :to="{ name: 'courses' }">
              <span>Explorar Marketplace</span>
              <v-icon right size="18">mdi-store</v-icon>
            </v-btn>
          </div>
        </div>
      </v-fade-transition>

      <Card v-if="!isWelcomeActive && lastCourses" :course="lastCourses" :cardType="3" :width="100" />
    </template>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import Card from "@/components/courses/cards";
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
      user: localStorage.getItem("name_user"),
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
.keep-learning-wrapper {
  width: 100%;
  height: 100%;
}

.welcome-banner-card {
  background: #FAF9F5 !important;
  border-radius: 20px !important;
  border: 1px solid #E5E3DC !important;
  padding: 32px 36px !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
}

.welcome-icon-badge {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-banner-title {
  font-family: 'Outfit', sans-serif !important;
  color: #18181B !important;
  font-size: 1.6rem !important;
  font-weight: 700 !important;
  margin: 0 0 4px 0 !important;
}

.welcome-banner-subtitle {
  color: #71717A !important;
  font-size: 0.92rem !important;
  margin: 0 !important;
  line-height: 1.4;
}

.marketplace-pill-btn {
  border-radius: 9999px !important;
  background: linear-gradient(135deg, #34D399 0%, #10B981 100%) !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  text-transform: none !important;
  padding: 0 24px !important;
  height: 44px !important;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.28) !important;
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

.skeleton-badge {
  width: 48px;
  height: 48px;
  border-radius: 14px;
}

.skeleton-line-title {
  width: 60%;
  height: 24px;
  border-radius: 6px;
}

.skeleton-line-sub {
  width: 85%;
  height: 16px;
  border-radius: 6px;
}

.skeleton-btn {
  width: 170px;
  height: 44px;
  border-radius: 9999px;
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
