<template>
    <div class="row px-3 py-5">
        <div class="col-12" v-if="products.length == 0">
            <div class="text-center py-5"><strong>Aún no ha adquirido un curso</strong></div>
        </div>
        <template v-else>
            <div class="col-12 col-sm-4 order-2 order-md-1">
                <div>
                    <div v-for="product in products" :key="product.id">
                        <div class="card py-1" @click="examList(product)">
                            <div class="row">
                                <div class="col-4 mx-auto text-center d-flex align-items-center">
                                    <img class="img-thumbnail" :src=product.url_portada>
                                </div>
                                <div class="col-8 px-1">
                                    <div class="card-body pl-0">
                                        <p class="card-title"> <strong>{{ product.title }}</strong> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-8 order-1 order-md-2">
                <div v-if="waitSelection">
                    <div class="text-center py-10">
                        <strong>Seleccione un curso</strong>
                    </div>
                </div>
                <div v-else>
                    <div class="pb-4">
                        <strong class="pb-4">{{productSelected.nombre}}</strong>
                        <p v-if="exam_progress != 'empty'"><strong>Progreso actual: </strong>{{exam_progress}}%</p>
                        <p v-else><strong>Progreso actual: </strong>0%</p>
                        <v-progress-linear
                        v-model="exam_progress"
                        color="#1ae800"
                        ></v-progress-linear>
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
                                        <tr v-for="exam in exams_class" :key="exam.id" class="">
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
                                                <!-- <button class="btn btn-warning boton-color" @click="Testing(exam)">Realizar examen</button> -->
                                            </td>
                                            </template>
                                        </tr>
                                        <tr v-for="exam in exams_module" :key="exam.id" class="">
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
                                                <!-- <button class="btn btn-warning boton-color" @click="Testing(exam)">Realizar examen</button> -->
                                            </td>
                                            </template>
                                        </tr>
                                        <tr class="">
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
                                                <!-- <button class="btn btn-warning boton-color" @click="Testing(exam_course)">Realizar examen</button> -->
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
        </template>
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
<style>
.boton-color{
    background-color: #1ae800;
    border-color: #1ae800;
}
</style>