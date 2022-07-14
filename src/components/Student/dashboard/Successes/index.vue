<template>
  <div class="exitos">
    <div class="d-flex justify-content-between">
      <div class="header-logro">
        <img src="@/assets/cup.svg" alt="" />
        <p>Logros</p>
      </div>
      <div class="details-logros" @click="goLogros()">
        <p>Ver Logros</p>
      </div>
    </div>
    <ul class="logros-user">
      <li class="item-logros">
        <div class="content-progres">
          <span class="cp circle-progres-1"></span>
          <span class="lp line-progres-1"></span>
        </div>
        <p>Estudiar 2 horas al día</p>
      </li>
      <li class="item-logros">
        <div class="content-progres">
          <span class="cp circle-progres-2"></span>
          <span class="lp line-progres-2"></span>
        </div>
        <p>Invitar a 3 amigos afiliados</p>
      </li>
      <li class="item-logros">
        <div class="content-progres">
          <span class="cp circle-progres-3"></span>
          <span class="lp line-progres-3"></span>
        </div>
        <p>Aprobar 1 curso</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Successes",

  data() {
    return {
      coursView: null,
    };
  },
  methods: {
    goLogros() {
      this.$router.push("/logros").then();
    },

    created() {
      this.mostrarAprendiendo();
    },
  },
};
</script>
<style scoped>
@import "./style.css";
.exitos {
  display: flex;
  flex-direction: column;
  gap: 60px;
}
.logros-user {
  display: flex;
  flex-direction: column;
  margin: 0;
}
.item-logros {
  display: flex;
  gap: 2rem;
  height: auto;
}
.content-progres {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 11px;
  height: auto;
}
.cp {
  top: 0;
  background: #35424a;
  border-radius: 50%;
  width: 11px;
  height: 11px;
}
.circle-progres-1 {
  background: #1ae800;
}
.lp {
  width: 1px;
  height: 50px;
  background: #35424a;
}
.line-progres-1 {
  background: #1ae800;
}
.details-logros {
  cursor: pointer;
}
</style>
