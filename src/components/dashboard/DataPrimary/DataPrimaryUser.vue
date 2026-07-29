<template>
  <div class="kpi-container row text-center align-center">
    <!-- 1. MIS CURSOS -->
    <div class="col-12 col-sm-6 col-md-3 kpi-col">
      <div class="kpi-card-item d-flex align-center justify-center p-2">
        <div class="kpi-icon-badge badge-emerald mr-3">
          <v-icon color="#10B981" size="22">mdi-school-outline</v-icon>
        </div>
        <div class="text-left">
          <div v-if="loading" class="my-1">
            <div class="skeleton-box" style="width: 50px; height: 24px; border-radius: 6px;"></div>
          </div>
          <div v-else class="kpi-value">
            {{ courses !== '' ? courses : 0 }}
          </div>
          <span class="kpi-label d-block">Mis Cursos</span>
        </div>
      </div>
    </div>

    <!-- 2. MIS VENTAS -->
    <div class="col-12 col-sm-6 col-md-3 kpi-col border-left-divider">
      <div class="kpi-card-item d-flex align-center justify-center p-2">
        <div class="kpi-icon-badge badge-emerald mr-3">
          <v-icon color="#10B981" size="22">mdi-currency-usd</v-icon>
        </div>
        <div class="text-left">
          <div v-if="loading" class="my-1">
            <div class="skeleton-box" style="width: 75px; height: 24px; border-radius: 6px;"></div>
          </div>
          <div v-else class="kpi-value text-emerald">
            {{ formattedPayment }}
          </div>
          <span class="kpi-label d-block">Mis Ventas</span>
        </div>
      </div>
    </div>

    <!-- 3. MIS MEMBRESÍA -->
    <div class="col-12 col-sm-6 col-md-3 kpi-col border-left-divider">
      <div class="kpi-card-item d-flex align-center justify-center p-2">
        <div class="kpi-icon-badge badge-amber mr-3">
          <v-icon color="#F59E0B" size="22">mdi-crown-outline</v-icon>
        </div>
        <div class="text-left">
          <div v-if="loading" class="my-1">
            <div class="skeleton-box" style="width: 85px; height: 24px; border-radius: 6px;"></div>
          </div>
          <div v-else class="kpi-value text-uppercase" style="font-size: 1.3rem;">
            {{ typePlans ? typePlans : 'BÁSICA' }}
          </div>
          <span class="kpi-label d-block">Mis Membresía</span>
        </div>
      </div>
    </div>

    <!-- 4. MIS AFILIADOS -->
    <div class="col-12 col-sm-6 col-md-3 kpi-col border-left-divider">
      <div class="kpi-card-item d-flex align-center justify-center p-2">
        <div class="kpi-icon-badge badge-indigo mr-3">
          <v-icon color="#6366F1" size="22">mdi-account-group-outline</v-icon>
        </div>
        <div class="text-left">
          <div v-if="loading" class="my-1">
            <div class="skeleton-box" style="width: 50px; height: 24px; border-radius: 6px;"></div>
          </div>
          <div v-else class="kpi-value">
            {{ affilates !== '' ? affilates : 0 }}
          </div>
          <span class="kpi-label d-block">Mis Afiliados</span>
        </div>
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
