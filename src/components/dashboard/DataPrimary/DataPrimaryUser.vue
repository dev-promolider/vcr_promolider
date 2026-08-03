<template>
  <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4 tw-w-full">
    <!-- 1. MIS CURSOS -->
    <div class="kpi-card tw-p-4 tw-rounded-2xl tw-border tw-shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:tw-shadow-md hover:tw--translate-y-0.5 tw-transition-all tw-flex tw-items-center tw-gap-4" style="background-color: var(--card-sub-bg); border-color: var(--border-color);">
      <div class="kpi-icon-badge tw-w-12 tw-h-12 tw-rounded-xl tw-bg-[#18d600]/10 tw-text-[#18d600] tw-flex tw-items-center tw-justify-center tw-shrink-0">
        <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
      </div>
      <div class="tw-text-left tw-flex-1 tw-min-w-0">
        <div v-if="loading" class="tw-w-12 tw-h-6 tw-bg-gray-200 dark:tw-bg-gray-800 tw-animate-pulse tw-rounded tw-mb-1"></div>
        <div v-else class="tw-font-outfit tw-text-2xl tw-font-bold tw-leading-tight tw-truncate" style="color: var(--text-bold);">
          {{ courses !== '' ? courses : 0 }}
        </div>
        <span class="tw-font-jakarta tw-text-xs tw-font-semibold tw-block" style="color: var(--text-muted);">Mis Cursos</span>
      </div>
    </div>

    <!-- 2. MIS VENTAS -->
    <div class="kpi-card tw-p-4 tw-rounded-2xl tw-border tw-shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:tw-shadow-md hover:tw--translate-y-0.5 tw-transition-all tw-flex tw-items-center tw-gap-4" style="background-color: var(--card-sub-bg); border-color: var(--border-color);">
      <div class="kpi-icon-badge tw-w-12 tw-h-12 tw-rounded-xl tw-bg-amber-500/10 tw-text-amber-500 tw-flex tw-items-center tw-justify-center tw-shrink-0">
        <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <div class="tw-text-left tw-flex-1 tw-min-w-0">
        <div v-if="loading" class="tw-w-16 tw-h-6 tw-bg-gray-200 dark:tw-bg-gray-800 tw-animate-pulse tw-rounded tw-mb-1"></div>
        <div v-else class="tw-font-outfit tw-text-2xl tw-font-bold tw-leading-tight tw-truncate" style="color: var(--text-bold);">
          {{ formattedPayment }}
        </div>
        <span class="tw-font-jakarta tw-text-xs tw-font-semibold tw-block" style="color: var(--text-muted);">Mis Ventas</span>
      </div>
    </div>

    <!-- 3. MIS MEMBRESÍA -->
    <div class="kpi-card tw-p-4 tw-rounded-2xl tw-border tw-shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:tw-shadow-md hover:tw--translate-y-0.5 tw-transition-all tw-flex tw-items-center tw-gap-4" style="background-color: var(--card-sub-bg); border-color: var(--border-color);">
      <div class="kpi-icon-badge tw-w-12 tw-h-12 tw-rounded-xl tw-bg-indigo-500/10 tw-text-indigo-500 tw-flex tw-items-center tw-justify-center tw-shrink-0">
        <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
      </div>
      <div class="tw-text-left tw-flex-1 tw-min-w-0">
        <div v-if="loading" class="tw-w-20 tw-h-6 tw-bg-gray-200 dark:tw-bg-gray-800 tw-animate-pulse tw-rounded tw-mb-1"></div>
        <div v-else class="tw-font-outfit tw-text-2xl tw-font-bold tw-leading-tight tw-uppercase tw-truncate" style="color: var(--text-bold);">
          {{ typePlans ? typePlans : 'BÁSICA' }}
        </div>
        <span class="tw-font-jakarta tw-text-xs tw-font-semibold tw-block" style="color: var(--text-muted);">Mis Membresía</span>
      </div>
    </div>

    <!-- 4. MIS AFILIADOS -->
    <div class="kpi-card tw-p-4 tw-rounded-2xl tw-border tw-shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:tw-shadow-md hover:tw--translate-y-0.5 tw-transition-all tw-flex tw-items-center tw-gap-4" style="background-color: var(--card-sub-bg); border-color: var(--border-color);">
      <div class="kpi-icon-badge tw-w-12 tw-h-12 tw-rounded-xl tw-bg-sky-500/10 tw-text-sky-500 tw-flex tw-items-center tw-justify-center tw-shrink-0">
        <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
      </div>
      <div class="tw-text-left tw-flex-1 tw-min-w-0">
        <div v-if="loading" class="tw-w-10 tw-h-6 tw-bg-gray-200 dark:tw-bg-gray-800 tw-animate-pulse tw-rounded tw-mb-1"></div>
        <div v-else class="tw-font-outfit tw-text-2xl tw-font-bold tw-leading-tight tw-truncate" style="color: var(--text-bold);">
          {{ affilates !== '' ? affilates : 0 }}
        </div>
        <span class="tw-font-jakarta tw-text-xs tw-font-semibold tw-block" style="color: var(--text-muted);">Mis Afiliados</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DataPrimaryUser",
  components: {},
  data() {
    return {
      courses: "",
      payment: "",
      typePlans: "",
      affilates: "",
      mostrar: false,
      loading: true,
    };
  },
  computed: {
    ...mapState("course", ["points"]),
    formattedPayment() {
      if (this.payment === "" || this.payment === null || this.payment === undefined) return "$0";
      const num = Number(this.payment);
      if (isNaN(num)) return `$${this.payment}`;
      return `$${num.toLocaleString("en-US")}`;
    },
  },
  methods: {
    getAttributes() {
      this.axios.get("dashboard/getattributes").then((r) => {
        this.loading = false;
        this.mostrar = true;
        const rs = r.data.data;
        this.courses = rs.totalCourses;
        this.payment = Math.round(rs.totalPayments);
        this.typePlans = rs.accountType;
        this.affilates = rs.totalClients;
      }).catch(() => {
        this.loading = false;
        this.mostrar = true;
      });
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>

<style scoped>
.kpi-container {
  margin: 0;
}

.kpi-card-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 14px;
}

.kpi-card-item:hover {
  transform: translateY(-2px);
}

.kpi-icon-badge {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.badge-emerald {
  background-color: rgba(16, 185, 129, 0.12) !important;
}

.badge-amber {
  background-color: rgba(245, 158, 11, 0.12) !important;
}

.badge-indigo {
  background-color: rgba(99, 102, 241, 0.12) !important;
}

.kpi-value {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.65rem !important;
  font-weight: 800 !important;
  color: #18181B !important;
  line-height: 1.2 !important;
  letter-spacing: -0.02em;
}

.text-emerald {
  color: #10B981 !important;
}

.kpi-label {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.85rem !important;
  font-weight: 600 !important;
  color: #71717A !important;
  margin-top: 2px;
}

@media (min-width: 768px) {
  .border-left-divider {
    border-left: 1px solid #E5E3DC;
  }
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
</style>
