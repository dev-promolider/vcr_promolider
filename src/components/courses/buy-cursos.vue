<template>
<div class="bg-light">
  <div class="container-fluid">
    <!-- Primera sección -->
    <div class="row py-5">
      <!-- Detalles del curso -->
      <div class="col-lg-4 col-md-12 pr-5 detailsCourse">
        <h3
          class="mb-4 font-weight-bold"
          :class="{ loader: !titulo, 'loader-titles': !titulo }"
        >
          {{ titulo }}
        </h3>

        <ul class="pl-3 mb-5 list-unstyled">
          <li
            class="my-1"
            :class="{ loader: !level, 'loader-text-small': !level }"
          >
            <i class="fas fa-chart-line mr-3"></i><strong>Nivel:</strong>
            {{ level }}
          </li>
          <li
            class="my-1"
            :class="{
              loader: !fecha_creacion,
              'loader-text-small': !fecha_creacion,
            }"
          >
            <i class="fas fa-calendar-alt mr-3"></i><strong>Publicado:</strong>
            {{ fecha_creacion }}
          </li>
          <li
            class="my-1"
            :class="{ loader: !categoria, 'loader-text-small': !categoria }"
          >
            <i class="fas fa-bezier-curve mr-2"></i><strong>Categoría:</strong>
            {{ categoria }}
          </li>
        </ul>
        <div>
          <button
            v-if="this.courseFilter == false"
            class="btn-custom"
            @click="BuyCourse()"
            style="
              font-size: 18px;
              color: black;
              font-weight: 600;
              line-height: 1.5rem;
            "
            :class="{ loader: !titulo }"
          >
            <!--<img v-if="this.precio == '' " width="25" :src="require('@/assets/free.png')" alt="">-->
            {{
              this.price_with_discount > 0
                ? "Comprar ahora $" + this.price_with_discount + ""
                : "Inscribete ahora"
            }}
          </button>
        </div>

        <div v-if="this.courseFilter == true">
          <button class="btn-custom" @click="GoCourse()">
            <span>
              Curso ya adquirido <br />
              Ir a Aprendisaje</span
            >
          </button>
        </div>
      </div>

      <!-- Imagen del curso -->
      <div
        class="col-lg-8 pr-0 pl-4"
        :class="{ loader: !img, 'loader-img-course': !img }"
      >
        <img :src="img" class="img-course" />
      </div>
    </div>

    <!-- Seccion inferior -->
    <div class="row">
      <div class="col-lg-9 col-md-12 mt-4">
        <div class="border-box">
          <v-expansion-panels accordion v-if="isDetailsLoading">
            <v-expansion-panel>
              <v-expansion-panel-header style="font-weight: bold">
                Descripción del curso
              </v-expansion-panel-header>
              <v-expansion-panel-content class="text-justify">
                {{ descripcion }}
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header style="font-weight: bold">
                Acerca de este curso
              </v-expansion-panel-header>
              <v-expansion-panel-content class="text-justify">
                {{ curso_detalle }}
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header style="font-weight: bold">
                ¿Qué aprenderás?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="text-justify">
                {{ aprendera }}
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header style="font-weight: bold">
                ¿Qué conocimientos previos necesitas?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="text-justify">
                {{ previos }}
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header style="font-weight: bold">
                ¿A quién está dirigido?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="text-justify">
                {{ dirigido }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-skeleton-loader v-else type="sentences@5"></v-skeleton-loader>
        </div>

        <!-- Lista -->
        <div>
          <h4
            class="font-weight-bold my-5"
            :class="{ loader: isLoading, 'loader-text-small': isLoading }"
          >
            Temario del curso
          </h4>
          <div v-if="isLoading" class="loader loader-temary"></div>
          <ul class="list-group" v-if="course">
            <li
              class="list-group-item"
              v-for="(model, index) in course.modules"
              :key="index"
            >
              <span
                v-b-toggle="model.name.replace(/ /g, '')"
                class="cursor-pointer"
              >
                <strong> {{ index + 1 }}. {{ model.name }}</strong>
              </span>
              <b-collapse
                :visible="index === 0"
                :id="model.name.replace(/ /g, '')"
              >
                <ul class="list-unstyled">
                  <li
                    v-for="(less, index) in course.modules[index].lessons"
                    :key="index"
                    class="my-4"
                  >
                    <div
                      class="cursor-pointer"
                      v-if="course.modules[0].lessons[0].id === less.id"
                      @click="getVideo(less.id)"
                      data-toggle="modal"
                      data-target="#video"
                    >
                      <i class="far fa-play-circle text-success mr-3"></i
                      >{{ less.name }}
                    </div>
                    <div v-else>
                      <i class="fas fa-lock mr-3"></i>{{ less.name }}
                    </div>
                  </li>
                </ul>
              </b-collapse>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-lg-3 col-md-12 mt-4 pr-0">
        <!-- Productor -->
        <v-card
          v-if="isDetailsLoading"
          elevation="1"
          class="rounded-lg"
          :class="[
            this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
              ? ''
              : 'avatar-productor',
          ]"
        >
          <v-list>
            <v-list-item>
              <v-list-item-avatar width="80px" height="80px">
                <v-img :src="imgProductor"> </v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ nameProductor }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ emailProductor }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-skeleton-loader
          v-else
          type="list-item-avatar-two-line"
        ></v-skeleton-loader>
        <!-- Recomendaciones -->
        <div class="mt-4">
          <h5
            class="font-weight-bold my-3"
            :class="{
              loader: loadingRelated,
              'loader-text-small': loadingRelated,
            }"
          >
            Recomendaciones
          </h5>
          <div v-if="loadingRelated">
            <div class="loader loader-card my-4"></div>
            <div class="loader loader-card my-4"></div>
            <div class="loader loader-card my-4"></div>
          </div>
          <div class="card-container">
            <!-- card course -->
            <div
              class="mb-4 cursor-pointer"
              v-for="course in courses1"
              :key="course.id"
            >
              <Card :course="course" :cardType="1" :isMouseOverActive="true" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video-Modal -->
    <div
      class="modal fade"
      id="video"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <h3
              class="modal-title text-white text-center"
              id="staticBackdropLabel"
            >
              {{ titulo }}
            </h3>
          </div>
          <div class="modal-body">
            <div class="video">
              <Video v-if="renderVideo" />
              <div v-else class="center-spinner">
                <b-spinner
                  style="width: 3rem; height: 3rem"
                  variant="secondary"
                  label="Large Spinner"
                ></b-spinner>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Video from "@/components/course/video";
import Card from "@/components/courses/cards";

import { mapState, mapActions } from "vuex";

export default {
  name: "VirtualClassroomBuyCursos",

  props: ["ide"],
  data() {
    return {
      inactive: false,
      baseURL: "http://promolider.xyz/storage/",
      nameProductor: "",
      emailProductor: "",
      items: [],
      pao_id: null,
      precio: "",
      price_with_discount: "",
      descripcion: "",
      level: "",
      img: "",
      titulo: "",
      curso_detalle: "",
      aprendera: "",
      previos: "",
      dirigido: "",
      lecciones: [],
      lecciones2: [],
      lecciones3: [],
      lecciones4: [],
      description: "",
      limite: 4,
      courses: [],
      courses1: [],
      loadingRelated: true,
      fecha_creacion: null,
      categoria: null,
      isDetailsLoading: false,
      courseFilter: null,
      imgProductor: null,
    };
  },
  components: {
    Video,
    Card,
  },
  computed: {
    ...mapState("course", ["course", "renderVideo", "isLoading"]),
  },

  methods: {
    ...mapActions("course", {
      getCourse: "getCourse",
      getVideo: "getVideo",
      buyCourse: "buyCourse",
    }),

    // Redirección a la vista para comprar el curso
    async BuyCourse() {
      if (this.precio === 0) {
        const { ok } = await this.buyCourse(this.pao_id);
        if (!ok) return;
        this.$router.push({ name: "suscription-user" });
      } else {
        this.$router.push("/buy/" + this.pao_id);
      }
    },

    FilterBtn() {
      this.axios("course/purchased-courses").then((res) => {
        let idcourse = res.data.data;
        var id_course = idcourse.map(function (idcourse) {
          return idcourse.id;
        });
        //console.log(id_course);
        this.courseFilter = id_course.some(
          (id_cours) => id_cours == this.$route.params.ide
        );
        //console.log(this.courseFilter);
      });
    },

    GoCourse() {
      this.$router.push("/suscription-user");
    },

    // Obtenemos todos lo atributos necesarios para mostrar del curso
    getAttributes() {
      this.pao_id = this.$route.params.ide;

      // API para obtener los detalles
      this.axios.get("course/details/" + this.pao_id).then((datos) => {
        this.items = datos.data.data[0];

        this.precio = this.items.price;
        this.price_with_discount = this.items.price_with_discount;

        // Obtenemos el nivel del curso
        switch (this.items.course_level_id) {
          case 1:
            this.level = "Básico";
            break;
          case 2:
            this.level = "Intermedio";
            break;
          case 3:
            this.level = "Avanzado";
            break;
        }
        this.img = this.items.url_portada;
        this.titulo = this.items.title;
        this.descripcion = this.items.description;
        this.curso_detalle = this.items.course_about;
        this.aprendera = this.items.will_learn;
        this.previos = this.items.prev_knowledge;
        this.dirigido = this.items.course_for;
        this.isDetailsLoading = true;

        // Convertimos la fecha en formato (12 de mayo del 2022)
        const fecha = new Date(this.items.created_at);
        let options = { year: "numeric", month: "long", day: "numeric" };
        this.fecha_creacion = fecha.toLocaleDateString("es-ES", options);

        // Obtenemos la categoria del curso que corresponde al id de la respuesta
        this.axios.get("category/list").then((res) => {
          for (const index in res.data.data) {
            if (res.data.data[index].id == this.items.id_categories) {
              this.categoria = res.data.data[index].name;
            }
          }
        });

        // Obtenemos los datos del productor
        this.axios.get(`user/show?id=${this.items.user_id}`).then((res) => {
          this.nameProductor = res.data.fullName;
          this.emailProductor = res.data.email;
          this.imgProductor = res.data.photo;
        });
      });

      // Obtenemos algunos cursos similares para recomendar
      this.axios.get("course/related-courses").then((datos) => {
        this.lord = false;
        this.guardar = true;
        this.loading = false;
        this.mostrar = true;
        this.courses = datos.data.data;
        this.courses1 = this.courses.slice(0, 3);
        this.loadingRelated = false;
      });
    },
  },
  watch: {
    ide() {
      this.getAttributes();
    },
  },
  created() {
    // Llamamos a la funcion que trae los atributos
    this.getAttributes();
    // Obtenemos el temario del curso
    this.getCourse(this.$route.params.ide);

    this.FilterBtn();
  },
};
</script>

<style scoped>
.avatar-productor {
  width: 300px;
}
.container-fluid {
  width: 97%;
  margin-inline: auto;
  padding-bottom: 50px;
  background-image: none !important ;
}
.title-course {
  text-transform: uppercase;
}
.img-course {
  width: 100%;
  max-width: 900px;
  max-height: 427px;
  border-radius: 25px;
}
.img-card {
  width: 100%;
  border-radius: 25px 25px 0px 0;
  height: 50%;
}
@media (max-width: 700px) and (min-width: 577px) {
  .img-card {
    height: 40%;
  }
}
.img-productor {
  width: 100% !important;
  height: 100% !important;
  max-width: 100px;
  max-height: 100px;
}

.list-group {
  padding-left: 0;
  border-radius: 25px;
}
.video {
  width: 100%;
  margin: auto;
  height: 600px;
}

.puntuacion {
  font-size: 1.04rem;
}

.detalles p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 1800px) {
  .container-fluid {
    width: 76%;
  }
}

@media (max-width: 1500px) {
  .detalles {
    font-size: 10px;
  }
}
@media (max-width: 1200px) {
  .img-productor {
    width: 70% !important;
    height: 80% !important;
  }
}

@media (max-width: 991px) {
  .loader-img-course {
    display: none !important;
  }
  .img-course {
    display: none !important;
  }
  .detailsCourse {
    display: flex;
    flex-direction: column;
    justify-content: center !important;
    text-align: center !important;
    padding-right: 1rem !important;
  }
  .detailsCourse p {
    text-align: center !important;
  }
  p {
    padding-right: 0 !important ;
  }

  .cardCursos {
    width: 40% !important;
    flex: none !important;
  }
  .card-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .detalles {
    font-size: 20px;
  }
}

@media (max-width: 576px) {
  .img-productor {
    width: 155% !important;
    margin-left: 0 !important;
  }
  .productor {
    display: flex !important;
    flex-direction: row !important;
  }

  .productor .image {
    width: 20% !important;
  }

  .productor .detalles {
    width: 80% !important;
  }

  .cardCursos {
    width: 100% !important;
    flex: none !important;
  }
}

/* Animaciones de carga para cada elemento */

.loader-titles {
  height: 40px;
  width: 100%;
}

.loader-descriptions {
  height: 50px;
}

.loader-text-small {
  height: 30px;
  width: 70%;
}

.loader-card {
  height: 300px;
}

.loader-temary {
  height: 800px;
}

.loader-img-productor {
  height: 100%;
  width: 100%;
}

.loader-img-course {
  height: 427px;
}
</style>
