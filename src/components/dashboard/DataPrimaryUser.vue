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
          <p v-if="mostrar" class="font-weight-bold text-white font-number my-1">{{courses}}</p>
          <p class="text-white my-1">Cursos</p>
        </li>

        <li>
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <p class="font-weight-bold mt-2 font-number my-1" v-if="mostrar">S/.{{ payment }}</p>
          <p class=" my-1">Ventas</p>
        </li>

        <li>
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <p class=" my-1">Plan</p>
          <p class="font-weight-bold font-number my-1"  v-if="mostrar"> {{ typePlans.toUpperCase() }}</p>
          <p class=" my-1"> <i class="fas fa-infinity mr-2"></i> días restantes</p>
        </li>

        <li class="four">
          <div
            class="spinner-border spinner-border-sm ml-auto mr-auto"
            v-if="loading"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <p v-if="mostrar" class="font-weight-bold font-number my-1" >{{ affilates }}</p>
          <p class=" my-1">Afiliado</p>
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
  background: transparent;
}
ul {
  width: 100%;
  /* justify-content: space-between; */
  padding: 0px;
}
li {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background: rgb(253, 253, 253);
  text-align: center;
  color: black;
  /* width: 50%; */
  list-style: none;
  /* padding: 1%; */
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
/* .font-size-2-5{
  font-size: 2.5rem;
}
.font-size-1-4{
  font-size: 1.4rem;
} */
.font-number{
  font-size: 1.5rem;
}
</style>
