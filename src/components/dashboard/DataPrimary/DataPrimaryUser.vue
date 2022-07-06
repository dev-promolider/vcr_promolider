<template>
  <div class="row text-center">
    <div class="col-12 col-md-6">
      <div class="row">
        <div class="one col-6 my-3">
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <div class="">
            <p
              v-if="mostrar"
              class="font-weight-bold text-white font-number my-1"
              style="color: black !important"
            >
              <strong>
                {{ courses }}
              </strong>
            </p>
            <p class="text-white mar-top" style="color: black !important">
              <strong>Mis Cursos</strong>
            </p>
          </div>
        </div>

        <div class="col-6 my-3">
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <div class="">
            <p class="font-weight-bold font-number my-1" v-if="mostrar">
              S/.{{ payment }}
            </p>
            <p class="mar-top">Mis Ventas</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="row">
        <div class="col-6">
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto mt-3 membresia"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>

          <p class="my-1">Mi Membresía</p>
          <div
            class="font-weight-bold font-role my-1 d-flex justify-content-center"
            v-if="mostrar"
          >
            {{ typePlans.toUpperCase() }}
            <div class="dropright">
              <i
                class="fas fa-question-circle ml-2"
                data-toggle="dropdown"
                aria-expanded="false"
              >
              </i>
              <div class="dropdown-menu info-membresia p-3">
                <p class="text-light text-left">
                  Los beneficios de tu menbresia son los siguientes:
                  <br /><br />
                  - Acceso a todos los cursos disponibles<br />
                  - Publicacion de cursos propios<br />
                  - Gestionar tus ingresos
                </p>
              </div>
            </div>
          </div>
          <p class=""><i class="fas fa-infinity mr-2"></i> días restantes</p>
        </div>

        <div class="four col-6 mt-2">
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <div class="">
            <p v-if="mostrar" class="font-weight-bold font-number my-1">
              {{ affilates }}
            </p>
            <p class="mar-top">Mis Afiliados</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
.info-membresia {
  background: #131b1e;
  font-size: 12px;
  max-width: 300px !important;
  min-width: 200px !important;
}

.fa-question-circle {
  font-size: 20px;
  cursor: pointer;
}
.contenedor {
  width: 100%;
  padding: 0;
  justify-content: center;
  background: transparent;
}
.attributes {
  width: 100%;
  gap: 2em;
  padding: 0px;
}
.item-attribute {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /* background: rgb(253, 253, 253); */
  position: relative;
  color: rgb(0, 0, 0);
  list-style: none;
  flex-grow: 1;
  border: 0.5px solid rgb(236, 236, 236);
}
.one {
  border-radius: 25px 25px;
}
.four {
  border-radius: 0px 25px 25px 0px;
}
.font-number {
  font-size: 2rem;
}
.font-role {
  font-size: 1.5rem;
}
</style>
