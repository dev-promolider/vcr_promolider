<template>
  <div class="mb-3 px-4" style="border-radius: 20px; margin-top: 40px; margin-right: 10px">
    <div class="docente">
      <div class="row no-gutters h-100">
        <!-- Primera columna -->
        <div class="col-2 col-md-2 mt-3 justify-content-center align-items-center">
          <v-img :src="imgProductor" alt="Imagen del docente" class="imagen-docente" />
        </div>

        <!-- Segunda columna -->
        <div class="col-10 col-md-10">
          <div class="h-100 d-flex flex-column">
            <!-- Fila 1 -->
            <div class="docente-header d-flex align-items-center">
              <p class="text-left" style="
                  font-size: 1.2em;
                  font-weight: 600;
                  margin-left: 20px;
                  margin-top: 30px;
                ">
                Docente
              </p>
            </div>

            <!-- Fila 2 para el nombre y el correo -->
            <div class="d-flex flex-column flex-lg-row justify-content-between flex-grow-1">
              <!-- Nombre -->
              <div class="d-flex align-items-center">
                <p class="text-left" style="
                    font-size: 0.9em;
                    font-weight: 400;
                    margin-left: 20px;
                    margin-top: 10px;
                  ">
                  {{ nameProductor }}
                </p>
              </div>

              <!-- Correo -->
              <div class="d-flex align-items-center mt-2 mt-md-0">
                <p class="text-left" style="
                    font-size: 0.9em;
                    font-weight: 400;
                    margin-left: 20px;
                    margin-right: 20px;
                    margin-top: 10px;
                  ">
                  {{ emailProductor }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Docente",
  data() {
    return {
      error: false,
      lessonId: "",
      courseInfo: [],

      imgProductor: null,
      nameProductor: "",
      emailProductor: "",
    };
  },
  components: {},
  computed: {
    ...mapState("course", ["lesson", "renderVideo", "courseSelect"]),
  },
  methods: {
    async getCourseInfo() {
      await this.axios
        .get("course/details/" + this.$route.query.course)
        .then((response) => {
          console.log(response);
          this.courseInfo = response.data.data;

          this.axios
            .get(`user/show?id=${this.courseInfo.user_id}`)
            .then((res) => {
              this.nameProductor = res.data.fullName;
              this.emailProductor = res.data.email;
              this.imgProductor = res.data.photo;
            });
        });
    },
  },
  mounted() {
    this.getCourseInfo();
  },
};
</script>

<style scoped>
.docente {
  background-color: white;
  border-radius: 30px;
  height: auto;
  /* Permitir que el contenedor crezca */
}

.row {
  height: 100%;
}

.no-gutters {
  margin-right: 0;
  margin-left: 0;
}

.col-2,
.col-10 {
  padding-right: 0;
  padding-left: 0;
}

.docente-header {
  height: 35px;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex-grow-1 {
  flex-grow: 1;
}

.align-items-center {
  align-items: center;
}

.text-left {
  text-align: left;
}

.imagen-docente {
  margin-left: 15px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
