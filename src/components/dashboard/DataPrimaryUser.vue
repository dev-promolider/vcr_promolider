<template>
  <div>
    <ul>
      <li>{{ courses }} Cursos</li>
      <li>S/.{{ payment }} Ventas</li>
      <li>Plan {{ typePlans }}</li>
      <li>{{ affilates }} Afiliado</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "DataPrimaryUser",
  data() {
    return {
      courses: 0,
      payment: 0,
      typePlans: "",
      affilates: 0,
    };
  },
  methods: {
    getAttributes() {
      this.axios.get("dashboard/getattributes").then((r) => {
        const rs = r.data.data;
        this.courses = rs.totalCourses;
        this.payment = rs.totalPayments;
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
