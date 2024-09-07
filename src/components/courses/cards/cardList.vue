<template>
    <div class="card-list">
        <div v-for="course in courses" :key="course.id" class="course-card mb-3">
            <div class="tarjeta-cursos">
                <div class="column image-column">
                    <img :src="course.url_portada" alt="no image" class="img-fluid img-cursos-portad">
                </div>
                <div class="column info-column">
                    <h4 class="course-title">{{ course.title }}</h4>
                    <div class="text-primary-pl valoracion-curso">
                        <v-rating class="custom-rating" style="display: inline" color="warning" hover readonly length="5"
                            size="25" :value="parseFloat(course.ranking_by_user)" half-increments></v-rating>
                    </div>
                    <p class="course-category">{{ getCategoryName(course.id_categories) }}</p>
                </div>
                <div class="column price-column">
                    <div class="course-price">
                        <span class="current-price">{{ course.price_with_discount.toFixed(2) }}$</span>
                        <span class="original-price">{{ course.price }}$</span>
                    </div>
                    <button class="btn btn-primary">COMPRAR</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CardList',
    data() {
        return {
            categories: [],
        };
    },
    props: {
        courses: {
            type: Array,
            required: true
        }
    },
    async created() {
        try {
            const response = await axios.get('category/list');
            this.categories = response.data.data;
            console.log("categorias:", response.data.data);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    },
    methods: {
        truncateDescription(description) {
            const maxLength = 100;
            if (description.length > maxLength) {
                return description.substring(0, maxLength) + '...';
            }
            return description;
        },
        getCategoryName(id) {
            const category = this.categories.find(cat => cat.id === id);
            return category ? category.name : 'Categoría no encontrada';
        }
    }
}
</script>
 
<style scoped>
.card-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.tarjeta-cursos {
    display: flex;
    flex-direction: row;
    height: 125px;
    /* Asegúrate de que la altura sea la que desees */
    border-radius: 15px;
    border: 1px solid #ddd;
    padding: 5px;
    /* Ajuste para márgenes internos */
    box-shadow: 0 0 15px rgba(75, 75, 75, 0.5);
    transition: 0.5s;
    background-color: white;
}

.tarjeta-cursos:hover {
    transform: scale(1.05);
    transition: 0.5s;
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

.info-column {
    flex: 2;
    padding-left: 10px;
}

.price-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* Centra verticalmente */
    align-items: center;
    /* Centra horizontalmente */
    gap: 5px;
    /* Espacio entre los elementos */
}

.img-cursos-portad {
    border-radius: 10px;
    height: 100%;
    /* Asegúrate de que la imagen llene la altura del contenedor */
    width: auto;
    /* Ajusta el ancho automáticamente para mantener la proporción */
    object-fit: cover;
    /* Cubre el área del contenedor sin distorsionar la imagen */
}

.course-title {
    font-size: 1em;
    font-weight: 480;
    margin: 0;
}

.course-category {
    font-size: 0.75em;
    color: #757575;
}

.valoracion-curso {
    margin: 10px 0;
}

.course-price {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Alinea los precios y el botón al centro */
}

.current-price {
    color: #20E404;
    font-size: 1.1em;
    font-weight: 490;
    margin: 0;
}

.original-price {
    color: #ff0000;
    font-size: 0.7em;
    font-weight: 500;
    text-decoration: line-through;
    margin: 0;
}

.btn-primary {
    background: linear-gradient(to right, #20E404, #1CAC0B);
    color: white;
    border: none;
    font-size: 0.8em;
    font-weight: 500;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: center;
    width: 100px;
    height: 25px;
    padding: 0;
}

.btn-primary:hover {
    transform: scale(1.1);
}
</style>
