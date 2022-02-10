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
          <p v-if="mostrar" style="font-size: 2.5rem;" class="font-weight-bold text-white">{{courses}}</p>
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
          <p class="font-weight-bold mt-4" style="font-size: 1.4rem;" v-if="mostrar">S/.{{ payment }}</p>
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
          <p>Plan</p>
          <p class="font-weight-bold" style="font-size: 1.7rem;" v-if="mostrar"> {{ typePlans.toUpperCase() }}</p>
          <p> <i class="fas fa-infinity mr-2"></i> días restantes</p>
        </li>

        <li class="four">
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <p v-if="mostrar" class="font-weight-bold" style="font-size: 2.5rem;">{{ affilates }}</p>
          <p>Afiliado</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import {useDispatch} from 'vuex';
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
  width: 100%;
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
  padding: 1%;
  flex-grow: 1;

  border: 0.5px solid rgb(236, 236, 236);
}
.one {
  border-radius: 25px 0px 0px 25px;
  background: #99CC93;
}
.four {
  border-radius: 0px 25px 25px 0px;
}
</style>
