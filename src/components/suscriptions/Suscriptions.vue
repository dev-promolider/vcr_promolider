<template>
  <div style="min-height: 100vh">
    <section-title title="Mi aprendizaje" />

    <div class="row mt-5 ml-1">
      <div class="col-md-12" v-if="loading">
        <loadingCourses />
      </div>

      <div class="no-result sad-face" v-if="caritas">
        <span>Sin resultados</span>
      </div>

      <div
        class="col-md-4 col-lg-3 col-sm-6 col-xs-12 px-5"
        v-for="(item, index) in informacion"
        :key="index"
      >
        <Card :course="item" :cardType="cardType" />
      </div>
    </div>

  <div class="row mt-5 ml-1">
    <div v-if="this.coursView > 0 && !loading">
        <CarrouselCourseViewed />
    </div>
  </div>  
  </div>
</template>

<script>
import Card from "@/components/courses/cards";
import loadingCourses from "@/components/courses/loadingCourses";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import SectionTitle from "../Navbar/SectionTitle.vue";
import CarrouselCourseViewed from "@/components/courses/CarrouselCourseViewed";
export default {
  name: "Suscription",
  components: {
    CarrouselCourseViewed,
    loadingCourses,
    Card,
    SectionTitle,
  },
  data() {
    return {
      informacion: [],
      loading: true,
      carita: true,
      caritas: false,
      cardType: 2,
      coursView: null,
    };
  },

  computed: {
    ...mapGetters("lastMessage", ["getLastMessages"]),
    ...mapMutations("course", ["SET_PRODUCTOR"]),
    ...mapState("course", ["course"]),
  },
  methods: {
    ...mapActions("course", {
      getCourse: "getCourse",
    }),

    mostrarAprendiendo() {
      let datos = null;
      this.axios.get("course/last-courses-rep").then((res) => {
        datos = res.data.data;
        this.coursView = datos.length;
      });
    },

    getAttributes() {
      this.axios.get("course/purchased-courses").then((datos) => {
        this.loading = false;
        this.informacion = datos.data.data;

        if (this.informacion.length == 0) {
          this.carita = false;
          this.caritas = true;
        }
      });
    },
  },

  created() {
    this.getAttributes();
    this.mostrarAprendiendo();
  },
};
</script>

<style scoped>
/* main {
  padding: 12px 0.5px !important;
}
.row {
  height: 100%;
}

.titulo {
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: left;
} */

/* .bordeas {
  border-radius: 20px 20px 0px 0px;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}
.bordea {
  border-radius: 20px 20px 20px 20px;
  transition: 1s;
}

.bordea:hover {
  transform: scale(1.05);
}

.carita {
  position: absolute;
  top: 0;
  height: 50%;
} */
</style>
