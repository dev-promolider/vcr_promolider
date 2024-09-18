<template>
    <div class="row px-3 py-5">
        <!-- Columna de Cursos -->
        <div class="col-12 col-md-4 ps-5">
            <div v-if="products.length == 0" class="text-center py-5">
                <strong>Aún no ha adquirido un curso</strong>
            </div>
            <template v-else>
                <div v-for="product in products" :key="product.id" class="course-card mb-3" @click="examList(product)">
                    <div class="tarjeta-cursos">
                        <div class="column image-column">
                            <img class="img-cursos-portad" :src="product.url_portada" alt="no image">
                        </div>
                        <div class="column info-column">
                            <h4 class="course-title">{{ product.title }}</h4>
                            <div class="valoracion-curso">
                                <!-- Aquí puedes añadir una estrella o rating si es necesario -->
                                <!-- Ejemplo: <v-rating color="warning" readonly length="5" :value="product.rating"></v-rating> -->
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <!-- Columna de Detalles del Curso Seleccionado -->
        <div class="col-12 col-md-8 pe-5">
            <div v-if="waitSelection">
                <div class="text-center py-10">
                    <strong>Seleccione un curso</strong>
                </div>
            </div>
            <div v-else>
                <div class="selected-course-details">
                    <div class="selected-course-card">
                        <img class="selected-course-img" :src="productSelected.url_portada" alt="no image">
                        <div class="selected-course-info">
                            <h2>{{ productSelected.title }}</h2>
                            <p v-if="exam_progress != 'empty'"><strong>Progreso actual: </strong>{{exam_progress}}%</p>
                            <p v-else><strong>Progreso actual: </strong>0%</p>
                            <v-progress-linear
                                v-model="exam_progress"
                                color="#1ae800"
                            ></v-progress-linear>
                        </div>
                    </div>
        
                <div>
                    <p><strong>Lista de exámenes</strong></p>
                    <div v-if="exam_progress == 'empty'">
                        No hay exámenes para este curso
                    </div>
                    <div v-else>
                        <div class="py-2">
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th>Examen</th>
                                    <th>Estado/Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="exam in exams_class" :key="exam.id">
                                        <template v-if="exam.exist">
                                        <td>{{exam.name}}</td>
                                        <td v-if="exam.approved" class="text-success">
                                            Examen aprobado
                                        </td>
                                        <td v-else>
                                            <v-btn
                                            depressed
                                            color="#1ae800"
                                            class="text-white"
                                            @click="Testing(exam)"
                                            >Realizar examen
                                            </v-btn>
                                        </td>
                                        </template>
                                    </tr>
                                    <tr v-for="exam in exams_module" :key="exam.id">
                                        <template v-if="exam.exist">
                                        <td>{{exam.name}}</td>
                                        <td v-if="exam.approved" class="text-success">
                                            Examen aprobado
                                        </td>
                                        <td v-else>
                                            <v-btn
                                            depressed
                                            color="#1ae800"
                                            class="text-white"
                                            @click="Testing(exam)"
                                            >Realizar examen
                                            </v-btn>
                                        </td>
                                        </template>
                                    </tr>
                                    <tr>
                                        <template v-if="exam_course.exist">
                                        <td>{{exam_course.title}}</td>
                                        <td v-if="exam_course.approved" class="text-success">
                                            Examen aprobado
                                        </td>
                                        <td v-else>
                                            <v-btn
                                            depressed
                                            color="#1ae800"
                                            class="text-white"
                                            @click="Testing(exam_course)"
                                            >Realizar examen
                                            </v-btn>
                                        </td>
                                        </template>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            waitSelection: true,
            exam_course: [],
            exams_class: [],
            exams_module: [],
            exams_data: [],
            exam_progress: 0,
            productSelected: [],
        }
    },
    methods: {
        async getcourses() {
            this.loading = true;
            const { data } = await this.axios.get(
                `/course/purchased-courses`
                );
                this.products = data.data;
                this.loading = false;
            // try {
            //     const { data } = await this.$axios.get(
            //     `/course/purchased-courses`
            //     );
            //     this.products = data;
            //     console.log(data)
            //     this.loading = false;
            // } catch (error) {
            //     // reload page
            //     window.location.reload();
            // }
        },
        async examList(product){
            this.productSelected = product;
            await this.axios.get(`/course/exam/list?id=${product.id}`).then((response) => {
                this.exam_course = response.data.exam_course
                this.exams_class = response.data.exams_class
                this.exams_module = response.data.exams_module
                this.exams_data = response.data
                this.exam_progress = response.data.exam_progress
                this.waitSelection = false
            })
        },
        Testing(dataEx) {
          this.$router.push({
            name: "test",
            params: { id: dataEx.exam_id },
            query: {
                class: dataEx.slug,
                course: this.productSelected.id,
            },
          });
        },
    },
    mounted(){
        this.getcourses();
    }
}
</script>
<style scoped>
.course-card {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  transition: 0.5s;
  cursor: pointer;
  max-width: 100%;
  background-color: white !important;
}

.course-card:hover {
  transform: scale(1.05);
  transition: 0.8s;
}

.tarjeta-cursos {
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(75, 75, 75, 0.5);
  overflow: hidden;
  height: 100px;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
}

.image-column {
  flex: 1;
}

.curso-imagen {
  padding: 5px;
}

.img-cursos-portad {
  width: 100%;
  height: 100%; 
  object-fit: cover;
  border-radius: 10px; 
}

.info-column {
  flex: 2;
  padding-left: 10px;
}

.course-title {
  font-size: 1em;
  font-weight: 480;
  margin: 0;
}

.valoracion-curso {
  margin: 10px 0;
}

.fila-tarjeta {
  font-size: 1em;
  color: #131b1e;
}

@media (max-width: 767px) {
  .tarjeta-cursos {
    flex-direction: column;
  }
}

.selected-course-details {
    background-color: white !important;
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(75, 75, 75, 0.2);
    padding: 20px;
    margin-top: 20px;
}

.selected-course-card {
    display: flex;
    border-radius: 15px;
    /*box-shadow: 0 0 15px rgba(75, 75, 75, 0.5);*/
    overflow: hidden;
    background-color: white !important;
    margin-bottom: 20px;
}

.selected-course-img {
    width: 150px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
}

.selected-course-info {
    padding: 10px;
    flex: 1;
}

.selected-course-info h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
}

.selected-course-info p {
    font-size: 1em;
    margin: 5px 0;
}

@media (max-width: 767px) {
    .selected-course-card {
        flex-direction: column;
        align-items: center;
    }

    .selected-course-img {
        width: 100%;
        height: auto;
    }
}


</style>


