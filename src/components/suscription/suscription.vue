<template>
  <div>
    <div class="w-100 backgro px-4 py-3">
      <p class="titulo mt-auto mb-auto ml-5">Mi aprendizaje</p>
    </div>

    <div class="row mr-5 ml-5 mover">
      <div
        class="col col-md-6 col-lg-4 card-group"
        v-for="(item, index) in informacion"
        :key="index"
      >
        <div class="card mb-3 mt-3 bordea cursor-pointer" @click="getCourse(item.id,'Que es Laravel')">
          <div class="">
            <img
              :src="item.url_portada"
              width="100%"
              height="200"
              class="bordeas"
            />
          </div>

          <div class="card-body bg-white text-dark">
            <h4
              class="
                text-center text-capitalize
                font-weight-bold
              "
            >
              {{ item.title }}
            </h4>
          </div>
          <div class="d-flex">
            <b-avatar
              class="mb-3 ml-2"
              variant="info"
              src="https://placekitten.com/200/200"
            ></b-avatar>
            <p class="m-1 ml-2 ">
              {{ item.name + " " + item.last_name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Eliminar from "@/views/content/contenedor/Contenedor.vue"
export default {
  name: "VirtualClassroomSuscription",
  components: {
    // Eliminar,
  },
  data() {
    return {
      informacion: [],
    };
  },

  mounted() {},

  methods: {
    getAttributes() {
      this.axios.get("course/purchased-courses").then((datos) => {
        this.informacion = datos.data.data;
        console.log(this.informacion);
      });
    },

    getCourse(id,clase){
      this.$router.push(`course-user?course=${id}&class=${clase}`)
    }
  },

  created() {
    this.getAttributes();
  },
};
</script>

<style lang="scss" scoped>
.backgro {
  background: rgb(12, 12, 12);
  opacity: 0.9;
  position: fixed;
  z-index: 10;
}
.mover {
  margin-top: 96px;
}
.titulo {
  color: white;
  font-size: 2.56rem;
  font-weight: 700;
  text-align: left;
}

.bordeas {
  border-radius: 20px 20px 0px 0px;
}
.bordea {
  border-radius: 20px 20px 20px 20px;
  transition: 1s;
}

.bordea:hover {
  transform: scale(1.05);
}
</style>
