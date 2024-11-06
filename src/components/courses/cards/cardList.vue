<template>
    <div class="card-list-container">
        <div class="card-list">
            <div v-for="course in courses" 
                 :key="course.id" 
                 class="course-card"
                 @click="handleBuy(course)">
                <div class="tarjeta-cursos">
                    <div class="column image-column">
                        <img :src="course.url_portada" alt="no image" class="img-cursos-portad" />
                    </div>
                    <div class="column info-column">
                        <div class="course-info">
                            <h4 class="course-title">{{ course.title }}</h4>
                            <div class="text-primary-pl valoracion-curso">
                                <v-rating
                                    class="custom-rating"
                                    color="warning"
                                    hover
                                    readonly
                                    length="5"
                                    size="20"
                                    :value="parseFloat(course.ranking_by_user)"
                                    half-increments
                                ></v-rating>
                            </div>
                            <p class="course-category">
                                {{ getCategoryName(course.id_categories) }}
                            </p>
                        </div>
                    </div>
                    <div class="column price-column">
                        <div class="course-price">
                            <span class="current-price">${{ course.price_with_discount.toFixed(2) }}</span>
                            <span class="original-price">${{ course.price }}</span>
                        </div>
                        <button class="btn-primary" @click.stop="handleBuy(course)">
                            COMPRAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "CardList",
    data() {
        return {
            categories: [],
            cardType: 1,
        };
    },
    props: {
        courses: {
            type: Array,
            required: true,
        },
    },
    async created() {
        try {
            const response = await axios.get("category/list");
            this.categories = response.data.data;
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
        }
    },
    methods: {
        getCategoryName(id) {
            const category = this.categories.find((cat) => cat.id === id);
            return category ? category.name : "Categoría no encontrada";
        },
        handleBuy(course) {
            switch (this.cardType) {
                case 1:
                    this.action(course.id, course.slug);
                    break;
                case 4:
                    this.getCertificates(course);
                    break;
                default:
                    this.goToCourse(course.id);
                    break;
            }
        },
        action(id, slug) {
            this.$router.push({ 
                name: "buy-cursos", 
                params: { ide: id, slug: slug } 
            }).catch((error) => {
                console.error("Error al redirigir a buy-cursos:", error);
            });
        },
        getCertificates(course) {
            this.$emit("selectedCertificate", course);
        },
        async goToCourse(id) {
            let dataRequest;
            try {
                const res = await this.axios.get(
                    `purchased/show-class-seen?course_id=${id}`
                );
                dataRequest = res.data.data;
                this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);

                if (!dataRequest.name) {
                    const resClass = await this.axios.get(
                        "course/temary/get-all-class/" + id
                    );
                    let firstClass = resClass.data.data.modules[0].lessons[0].name;
                    await this.$router.push({
                        name: "curso",
                        query: {
                            course: id,
                            class: firstClass,
                            rate: this.course.ranking_by_user,
                        },
                    });
                } else {
                    await this.$router.push({
                        name: "curso",
                        query: {
                            course: id,
                            class: dataRequest.name,
                            rate: this.course.ranking_by_user,
                        },
                    });
                }
            } catch (error) {
                console.error("Error al redirigir a curso:", error);
            }
        },
    },
};
</script>

<style scoped>
.card-list-container {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 15px;
}

.card-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    width: 100%;
}

@media (min-width: 768px) {
    .card-list {
        grid-template-columns: repeat(1, 1fr);
    }
}

@media (min-width: 1024px) {
    .card-list {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
    }
}

.course-card {
    width: 100%;
    cursor: pointer;
}

.tarjeta-cursos {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

@media (min-width: 768px) {
    .tarjeta-cursos {
        flex-direction: row;
        align-items: center;
        height: 120px;
        padding: 12px;
    }
}

.column {
    padding: 8px;
}

.image-column {
    width: 100%;
    height: 160px;
}

@media (min-width: 768px) {
    .image-column {
        width: 140px;
        min-width: 140px;
        height: 100%;
        padding: 0;
        margin-right: 12px;
    }
}

.img-cursos-portad {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.info-column {
    flex: 1;
}

.course-title {
    font-size: 0.95rem;
    font-weight: 480;
    color: #2c3e50;
    margin: 0 0 6px 0;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.course-category {
    font-size: 0.75rem;
    color: #757575;
    margin: 2px 0 0 0;
    font-weight: normal;
}

.price-column {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
}

@media (min-width: 768px) {
    .price-column {
        width: 160px;
        min-width: 160px;
        flex-direction: column;
        align-items: flex-end;
        padding: 0;
        margin-left: 12px;
    }
}

.course-price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.current-price {
    font-size: 1rem;
    font-weight: 490;
    color: #20e404;
}

.original-price {
    font-size: 0.75rem;
    color: #ff0000;
    text-decoration: line-through;
    font-weight: normal;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #20e404, #1cac0b);
    color: white;
    font-weight: 500;
    font-size: 0.75rem;
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 90px;
    height: 28px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.valoracion-curso {
    margin: 4px 0;
}

.custom-rating {
    display: inline-flex !important;
    gap: 2px;
}

@media (max-width: 767px) {
    .course-price {
        align-items: flex-start;
    }
    
    .price-column {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
}
</style>
