<template>
  <div>
    <div class="contenedor mt-4">
      <ul class="d-flex">
        <li class="one">
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <p v-if="mostrar" style="color:white">{{ courses }}</p>
          <p style="color:white">Cursos</p>
        </li>

        <li>
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <p v-if="mostrar">S/.{{ payment }}</p>
          <p>Ventas</p>
        </li>

        <li>
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <p v-if="mostrar">{{ typePlans }}</p>
          <p>Plan</p>
        </li>

        <li class="four">
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <p v-if="mostrar">{{ affilates }}</p>
          <p>Afiliado</p>
        </li>
      </ul>
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
/* ul{
  display: flex;
  margin: 2%;
  */
.contenedor {
  width: 100%;
  justify-content: center;
}
ul {
  width: 80%;
  justify-content: space-between;
  padding: 0px;
}
li {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background: rgb(253, 253, 253);
  text-align: center;
  color: black;
  width: 50%;
  list-style: none;
  padding: 5%;
  flex-grow: 1;

  border: 0.5px solid rgb(236, 236, 236);
}
.one {
  border-radius: 15px 0px 0px 15px;
  background: rgb(120, 202, 38);
}
.four {
  border-radius: 0px 15px 15px 0px;
}
</style>
