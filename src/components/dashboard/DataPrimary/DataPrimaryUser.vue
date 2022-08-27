<template>
  <div class="row text-center bg-white">
    <div class="col-md-3">
      <div v-if="loading" class="my-2">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </div>

      <div v-else>
        <p v-if="mostrar" class="kpi-content">
          {{ courses }}
        </p>
      </div>

      <p>Mis Cursos</p>
    </div>

    <div class="col-md-3">
      <div v-if="loading" class="my-2">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </div>

      <div v-else>
        <p v-if="mostrar" class="kpi-content">$ {{ payment }}</p>
      </div>

      <p>Mis Ventas</p>
    </div>

    <div class="col-md-3">
      <div v-if="loading" class="my-2">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </div>

      <div v-else>
        <p v-if="mostrar" class="kpi-content">{{ typePlans.toUpperCase() }}</p>
      </div>

      <p>Mis Membresía</p>
    </div>

    <div class="col-md-3">
      <div v-if="loading" class="my-2">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </div>

      <div v-else>
        <p v-if="mostrar" class="kpi-content">{{ affilates }}</p>
      </div>

      <p>Mis Afiliados</p>
    </div>

    <!-- <div class="col-md-3">
      <div v-if="loading" class="my-2">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </div>

      <div v-else>
        <p v-if="mostrar" class="kpi-content">
          {{ points || 0 }}
        </p>
      </div>

      <p>Mis Puntos</p>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DataPrimaryUser",
  comoponents: {},
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
      });
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>
<style scoped>
.kpi-content {
  font-size: 1.4em;
  display: inline;
  padding: 0px;
}
</style>
