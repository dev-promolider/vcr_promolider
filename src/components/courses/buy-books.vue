<template>
  <div class="product-detail-wrapper w-100">
    <!-- HEADER OSCURO -->
    <div class="udemy-dark-header udemy-bg-dark tw-text-white tw-pt-8 tw-pb-12">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-xl-11">
            <div class="row">
              <div class="col-12 col-lg-8">
                <!-- Breadcrumb -->
                <nav aria-label="breadcrumb" class="mb-4">
                  <ol class="breadcrumb custom-breadcrumb bg-transparent p-0 mb-0">
                    <li class="breadcrumb-item"><router-link to="/courses" class="udemy-text-link hover:tw-text-white tw-font-bold tw-transition-colors">Libros</router-link></li>
                    <li class="breadcrumb-item active tw-text-gray-300" aria-current="page"><span class="tw-text-gray-500 tw-mx-2">></span>{{ categoria || 'General' }}</li>
                    <li class="breadcrumb-item active text-truncate max-w-200 tw-text-gray-300" aria-current="page"><span class="tw-text-gray-500 tw-mx-2">></span>{{ titulo || 'Detalle' }}</li>
                  </ol>
                </nav>

                <h1 class="product-main-title mb-3 tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-white tw-leading-tight" :class="{ loader: !titulo }">
                  {{ titulo }}
                </h1>

                <p class="product-description-subtitle mb-4 tw-text-lg tw-text-gray-200" v-if="descripcion">
                  {{ descripcion.length > 200 ? descripcion.substring(0, 200) + '...' : descripcion }}
                </p>

                <div class="d-flex flex-wrap align-items-center gap-3 mb-3">
                  <span class="bestseller-badge udemy-bg-badge udemy-text-badge tw-font-bold tw-px-2 tw-py-1 tw-text-xs">EBOOK</span>

                  <div class="d-flex align-items-center rating-reviews-row">
                    <span class="rating-score-text font-weight-bold udemy-text-rating tw-mr-1">{{ ratingAverage }}</span>
                    <span class="udemy-text-rating tw-mr-2">★★★★★</span>
                    <span class="rating-count-text udemy-text-link tw-mr-3">({{ ratingsList.length }} valoraciones)</span>
                    <span class="tw-text-gray-200">{{ lectores }} lectores</span>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-1 mb-2 tw-text-sm">
                  <span class="tw-text-gray-200">Escrito por</span>
                  <span class="udemy-text-link tw-underline">{{ nameProductor || 'Autor Oficial' }}</span>
                </div>

                <div class="d-flex flex-wrap align-items-center gap-4 tw-text-sm tw-text-gray-200 mt-3">
                  <div class="d-flex align-items-center gap-1">
                    <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Publicado: {{ fecha_creacion || 'Reciente' }}</span>
                  </div>
                  <div class="d-flex align-items-center gap-1">
                    <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                    <span>{{ language }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CONTENIDO PRINCIPAL -->
    <div class="container-fluid py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-11">

          <template v-if="processPay">
            <Openpay :openpayData="openpayData"></Openpay>
          </template>

          <div class="row position-relative">
            <!-- Columna Izquierda -->
            <div class="col-12 col-lg-8 pr-lg-5">
              <!-- Lo que aprenderás -->
              <div class="tw-border tw-border-gray-300 dark:tw-border-gray-700 tw-p-6 tw-mb-8 tw-bg-white dark:udemy-bg-dark" v-if="parseList(aprendera).length">
                <h2 class="tw-text-2xl tw-font-bold tw-mb-4 tw-text-gray-900 dark:tw-text-white">Lo que aprenderás</h2>
                <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                  <div class="d-flex align-items-start gap-2" v-for="(item, index) in parseList(aprendera)" :key="index">
                    <svg class="tw-w-5 tw-h-5 tw-mt-0.5 tw-text-gray-900 dark:tw-text-gray-300 tw-flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span class="tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">{{ item }}</span>
                  </div>
                </div>
              </div>

              <!-- Este libro incluye -->
              <div class="tw-mb-8">
                <h2 class="tw-text-xl tw-font-bold tw-mb-4 tw-text-gray-900 dark:tw-text-white">Este libro incluye:</h2>
                <div class="row g-3 tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">
                  <div class="col-12 col-md-6 d-flex align-items-center gap-2">
                    <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    <span>Libro digital completo</span>
                  </div>
                  <div class="col-12 col-md-6 d-flex align-items-center gap-2">
                    <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    <span>Descarga inmediata</span>
                  </div>
                  <div class="col-12 col-md-6 d-flex align-items-center gap-2">
                    <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    <span>Acceso en dispositivos móviles</span>
                  </div>
                  <div class="col-12 col-md-6 d-flex align-items-center gap-2">
                    <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <span>Acceso de por vida</span>
                  </div>
                </div>
              </div>

              <!-- Requisitos -->
              <div class="tw-mb-8" v-if="parseList(previos).length">
                <h2 class="tw-text-2xl tw-font-bold tw-mb-4 tw-text-gray-900 dark:tw-text-white">Requisitos</h2>
                <ul class="tw-list-disc tw-pl-5 tw-mb-6 tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">
                  <li v-for="(item, index) in parseList(previos)" :key="'prev-'+index" class="tw-mb-1">{{ item }}</li>
                </ul>
              </div>

              <!-- Descripción -->
              <div class="tw-mb-10">
                <h2 class="tw-text-2xl tw-font-bold tw-mb-4 tw-text-gray-900 dark:tw-text-white">Descripción</h2>
                <div class="product-description-text tw-text-sm tw-text-gray-700 dark:tw-text-gray-300 tw-whitespace-pre-line tw-leading-relaxed">
                  {{ descripcion }}

                  <template v-if="curso_detalle">
                    <br><br>
                    <strong>Acerca de este libro:</strong>
                    <br>{{ curso_detalle }}
                  </template>

                  <template v-if="dirigido">
                    <br><br>
                    <strong>¿A quién está dirigido?</strong>
                    <br>{{ dirigido }}
                  </template>
                </div>
              </div>

              <!-- Valoraciones -->
              <div class="reviews-card p-4 mb-4">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <h4 class="section-card-heading mb-0">Valoraciones de lectores</h4>
                  <span class="verified-purchases-badge" v-if="ratingsList.length">
                    <svg class="tw-w-4 tw-h-4 tw-mr-1.5 udemy-text-primary tw-inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    Reseñas verificadas
                  </span>
                </div>

                <div v-if="!ratingsList.length" class="text-center py-4 text-muted">
                  <p class="mb-0 font-weight-500">Aún no hay valoraciones registradas para este libro.</p>
                </div>

                <div v-else class="row g-3">
                  <div v-for="(review, rIdx) in ratingsList" :key="rIdx" class="col-12 col-md-6">
                    <div class="student-review-item p-3">
                      <div class="d-flex align-items-center justify-content-between mb-2">
                        <div class="d-flex align-items-center">
                          <div class="review-avatar mr-2">
                            {{ reviewerName(review).charAt(0).toUpperCase() }}
                          </div>
                          <div>
                            <h6 class="reviewer-name mb-0">{{ reviewerName(review) }}</h6>
                            <span class="review-time text-muted">{{ review.created_at || 'Reciente' }}</span>
                          </div>
                        </div>
                        <span class="udemy-text-rating">★ {{ review.rating || review.rate || 5 }}</span>
                      </div>
                      <p class="review-text mb-0">
                        {{ review.comment || review.comments || review.description || 'Sin comentario.' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Columna Derecha: Tarjeta Flotante -->
            <div class="col-12 col-lg-4 tw-relative tw-z-10 udemy-lg-mt-negative">
              <div class="udemy-sticky-card tw-bg-white dark:tw-bg-gray-800 tw-shadow-2xl tw-border tw-border-gray-200 dark:tw-border-gray-700 tw-top-8 tw-sticky tw-rounded-lg tw-overflow-hidden">
                <!-- Portada / Video promocional -->
                <div class="product-media-container tw-w-full tw-bg-black tw-relative" style="cursor: pointer;">
                  <template v-if="isPlayingVideo && tymedia === 1">
                    <video
                      :src="videoimg"
                      controls
                      autoplay
                      class="vcr-promo-video"
                      style="width: 100%; border-radius: 8px 8px 0 0;"
                      referrerpolicy="no-referrer"
                    ></video>
                  </template>

                  <template v-else>
                    <img
                      :src="coverUrl"
                      class="promo-thumbnail"
                      :alt="titulo"
                      referrerpolicy="no-referrer"
                      @error="onImgError"
                    />

                    <div
                      v-if="tymedia === 1"
                      class="promo-play-overlay"
                      @click="isPlayingVideo = true"
                    >
                      <div class="promo-play-btn">
                        <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span class="promo-play-label">Vista previa de este libro</span>
                    </div>
                  </template>
                </div>

                <div class="tw-p-6">
                  <!-- Precio -->
                  <div class="d-flex flex-column mb-3">
                    <div class="tw-text-3xl tw-font-extrabold tw-text-gray-900 dark:tw-text-white tw-flex tw-items-center tw-gap-2">
                      <span>${{ price_with_discount > 0 ? price_with_discount : precio }}</span>
                      <span class="tw-text-base tw-font-semibold tw-text-gray-500">USD</span>
                    </div>
                    <div v-if="precio > 0 && precio !== importeCurso" class="tw-mt-1 tw-flex tw-items-center tw-gap-2">
                      <span class="tw-line-through tw-text-gray-500 tw-text-sm">${{ precio }}</span>
                    </div>
                  </div>

                  <div class="tw-px-6 tw-pb-6">
                    <!-- Botones de Acción -->
                    <div class="action-buttons-wrapper d-flex flex-column gap-3 mb-4">
                      <template v-if="!isOwner">
                        <button v-if="courseFilter == false && precio == 0" class="tw-w-full udemy-bg-primary hover:udemy-bg-primary tw-text-white tw-font-bold tw-py-3 tw-px-4 tw-border-none tw-cursor-pointer tw-text-lg tw-transition-colors" @click="inscribirCursoGratis()" :class="{ loader: !titulo }">
                          Obtener Gratis
                        </button>

                        <button v-if="courseFilter == false && precio > 0" class="tw-w-full udemy-bg-primary hover:udemy-bg-primary tw-text-white tw-font-bold tw-py-3 tw-px-4 tw-border-none tw-cursor-pointer tw-text-lg tw-transition-colors" data-toggle="modal" data-target="#paymentModal" :class="{ loader: !titulo }">
                          {{ price_with_discount > 0 ? `Comprar ahora` : "Obtener ahora" }}
                        </button>

                        <button v-if="courseFilter == false" @click="addCurrentBookToCart" class="tw-w-full tw-bg-white hover:tw-bg-gray-100 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 tw-border tw-border-gray-900 dark:tw-border-gray-500 tw-text-gray-900 dark:tw-text-white tw-font-bold tw-py-3 tw-px-4 tw-cursor-pointer tw-transition-colors d-flex align-items-center justify-content-center">
                          Añadir a la cesta
                        </button>

                        <button @click="shareURL" class="tw-w-full tw-bg-transparent hover:tw-bg-gray-100 dark:hover:tw-bg-gray-700 tw-text-gray-900 dark:tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-cursor-pointer tw-border-none tw-transition-colors tw-text-sm tw-mt-2 d-flex align-items-center justify-content-center">
                          <svg width="18" height="18" class="tw-w-4.5 tw-h-4.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                          Compartir libro
                        </button>
                      </template>

                      <template v-else>
                        <button class="tw-w-full udemy-bg-primary hover:udemy-bg-primary tw-text-white tw-font-bold tw-py-3 tw-px-4 tw-border-none tw-cursor-pointer tw-text-lg tw-transition-colors" @click="goToBook(pao_id)" :class="{ loader: !titulo }">
                          Leer mi libro
                        </button>
                      </template>

                      <template v-if="courseFilter">
                        <button class="tw-w-full udemy-bg-primary hover:udemy-bg-primary tw-text-white tw-font-bold tw-py-3 tw-px-4 tw-border-none tw-cursor-pointer tw-text-lg tw-transition-colors" @click="goToBook(pao_id)">
                          <span>Libro ya adquirido - Leer ahora</span>
                        </button>
                      </template>
                    </div>

                    <!-- Garantías -->
                    <div class="trust-features-list border-top-subtle pt-4 mb-4">
                      <div class="trust-feature-item d-flex align-items-start mb-3">
                        <svg width="20" height="20" class="tw-w-5 tw-h-5 mr-3 mt-1" style="color: var(--primary-color); flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        <div>
                          <span class="trust-title">Acceso inmediato</span>
                          <p class="trust-desc mb-0">Lectura online y descarga disponibles al instante.</p>
                        </div>
                      </div>

                      <div class="trust-feature-item d-flex align-items-start mb-3">
                        <svg width="20" height="20" class="tw-w-5 tw-h-5 mr-3 mt-1" style="color: var(--primary-color); flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        <div>
                          <span class="trust-title">Descarga en PDF</span>
                          <p class="trust-desc mb-0">Guárdalo en tu dispositivo y léelo sin conexión.</p>
                        </div>
                      </div>

                      <div class="trust-feature-item d-flex align-items-start">
                        <svg width="20" height="20" class="tw-w-5 tw-h-5 mr-3 mt-1" style="color: var(--primary-color); flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                        <div>
                          <span class="trust-title">Pago 100% Seguro</span>
                          <p class="trust-desc mb-0">Transacciones protegidas con cifrado bancario SSL.</p>
                        </div>
                      </div>
                    </div>

                    <!-- Autor -->
                    <div class="productor-card-box p-3 border-top-subtle">
                      <div class="d-flex align-items-center">
                        <div class="productor-avatar mr-3">
                          <img :src="imgProductor || defaultAvatar" alt="Autor" class="rounded-circle" @error="onAvatarError" />
                        </div>
                        <div class="overflow-hidden">
                          <h6 class="productor-name text-truncate mb-0">{{ nameProductor || 'Autor Oficial' }}</h6>
                          <span class="productor-email text-truncate text-muted d-block small">{{ emailProductor }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Libros Recomendados -->
          <div v-if="shouldShowRecommendations" class="recommendations-section mt-5 pt-4 border-top-subtle">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h3 class="section-card-heading mb-0">Libros Recomendados</h3>
            </div>

            <div v-if="loadingRelated" class="text-center py-4 text-muted">
              Cargando recomendaciones...
            </div>

            <div v-else class="row g-3">
              <div class="col-12 col-md-4" v-for="book in filteredRecommendations" :key="book.id">
                <Card :course="book" :cardType="1" :isMouseOverActive="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Metodos de Pago -->
    <div class="modal fade" id="paymentModal" ref="paymentModal" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              MÉTODOS DE PAGO
            </h5>
            <button type="button" class="close" @click="closePaymentModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <select class="custom-select" v-model="payment_method_id">
              <option v-for="item in paymentMethod" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>

            <div class="form-group col-12 mb-0" v-if="payment_method_id == 5">
              <p class="font-weight-bold">
                Saldo Billetera: $/ {{ saldoTotal }}
              </p>
              <p class="font-weight-bold">
                Precio Libro: $/ {{ importeCurso }}
              </p>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closePaymentModal">
              Salir
            </button>
            <button type="button" v-show="shouldDisplayBuyButton" @click="setBuyCourse" class="btn btn-success"
              :disabled="loadingCourse">
              {{ loadingCourse ? "Procesando..." : "Comprar" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/courses/cards";
import Openpay from "@/components/Buy/openpay.vue";
import $ from "jquery";

export default {
  name: "VirtualClassroomBuyBooks",
  metaInfo() {
    return {
      title: this.titulo,
      meta: [
        { property: "og:title", content: this.titulo },
        { property: "og:description", content: this.descripcion },
        { property: "og:image", content: this.img },
      ],
    };
  },
  props: ["ide"],
  components: {
    Card,
    Openpay,
  },
  data() {
    return {
      defaultCover: require("@/assets/background-login.webp"),
      defaultAvatar: "https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240",
      nameProductor: "",
      emailProductor: "",
      items: [],
      pao_id: null,
      price_with_discount: "",
      descripcion: "",
      img: "",
      titulo: "",
      curso_detalle: "",
      aprendera: "",
      previos: "",
      dirigido: "",
      language: "Español",
      courses: [],
      loadingRelated: true,
      showRecommendations: true,
      fecha_creacion: null,
      categoria: null,
      isDetailsLoading: false,
      courseFilter: false,
      imgProductor: null,
      isOwner: false,
      isPlayingVideo: false,
      openpayData: [],
      processPay: false,
      videoimg: "",
      tymedia: 0,
      lectores: 0,
      ratings: [],
      saldoTotal: 0,
      importeCurso: 0,
      paymentMethod: [],
      payment_method_id: 1,
      precio: 0,
      user_id: null,
      loadingCourse: false,
    };
  },
  computed: {
    shouldDisplayBuyButton() {
      if (
        this.payment_method_id === 1 ||
        (this.payment_method_id === 5 && this.saldoTotal >= this.importeCurso)
      ) {
        return true;
      }
      return false;
    },

    ratingsList() {
      if (Array.isArray(this.ratings) && this.ratings.length > 0) {
        return this.ratings;
      }
      if (this.items && Array.isArray(this.items.ratings) && this.items.ratings.length > 0) {
        return this.items.ratings;
      }
      return [];
    },

    ratingAverage() {
      if (!this.ratingsList.length) return "5.0";
      const total = this.ratingsList.reduce(
        (sum, r) => sum + (parseFloat(r.rating || r.rate) || 0),
        0
      );
      return (total / this.ratingsList.length).toFixed(1);
    },

    filteredRecommendations() {
      if (!this.courses || !this.pao_id) return [];
      return this.courses
        .filter((book) => book.id !== parseInt(this.pao_id))
        .slice(0, 3);
    },

    shouldShowRecommendations() {
      return !this.isOwner && !this.courseFilter && this.showRecommendations;
    },

    coverUrl() {
      const raw = this.items?.url_portada || this.img || '';
      if (!raw) return this.defaultCover;
      if (raw.startsWith('http')) return raw.replace('s3.sa-east-1', 's3-accelerate');
      return 'https://promolider-storage-user.s3-accelerate.amazonaws.com/' + raw;
    },
  },

  methods: {
    // ── Notificaciones internas (sin librería externa) ──────────────────
    showMsg(type, text) {
      const colors = { success: '#18d600', error: '#ef4444', info: '#3b82f6', warning: '#f59e0b' };
      const icons = { success: '✔', error: '✖', info: 'ℹ', warning: '⚠' };
      const toast = document.createElement('div');
      toast.textContent = (icons[type] || 'ℹ') + '  ' + text;
      Object.assign(toast.style, {
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999,
        background: colors[type] || '#333', color: '#fff',
        padding: '12px 20px', borderRadius: '10px', fontFamily: 'Outfit, sans-serif',
        fontSize: '14px', fontWeight: '600', boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        maxWidth: '340px', transition: 'opacity 0.4s', opacity: '1',
      });
      document.body.appendChild(toast);
      setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3000);
    },

    // El endpoint de valoraciones devuelve el autor anidado en `user`.
    reviewerName(review) {
      return (review.user && review.user.name) || review.username || review.user_name || 'Lector';
    },

    parseList(text) {
      if (!text) return [];
      return text.split('\n').map(t => t.replace(/^- /, '').trim()).filter(t => t.length > 0);
    },

    onImgError(e) {
      if (e && e.target) e.target.src = this.defaultCover;
    },

    onAvatarError(e) {
      if (e && e.target) e.target.src = this.defaultAvatar;
    },

    addCurrentBookToCart() {
      const item = {
        id: this.pao_id || this.ide,
        title: this.titulo,
        price: parseFloat(this.price_with_discount > 0 ? this.price_with_discount : this.precio) || 0,
        precio: parseFloat(this.precio) || 0,
        price_with_discount: parseFloat(this.price_with_discount) || 0,
        url_portada: this.img,
        categoria: this.categoria,
        slug: this.$route.params.slug,
      };
      this.$store.dispatch("cart/addToCart", item);
      this.showMsg('success', 'Libro añadido a la cesta');
    },

    shareURL() {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => this.showMsg('success', 'Enlace copiado al portapapeles'))
        .catch((err) => console.error("Failed to copy: ", err));
    },

    // Un libro no tiene temario: se abre directamente en el lector.
    goToBook(id) {
      this.$router.push({ name: "book", params: { id } }).catch(() => { });
    },

    GoCourse() {
      this.$router.push("/suscription-user");
    },

    getWalletUser() {
      this.axios
        .get(`/reports/mymovements/${this.user_id}`)
        .then((response) => {
          this.saldoTotal = response.data.data.reduce((saldo, transaction) => {
            if (transaction.status === 1 || transaction.status === 0) {
              if (transaction.type === 1) {
                return saldo + transaction.amount;
              } else if (transaction.type === 0) {
                if (transaction.id_receiver === this.user_id) {
                  return saldo + transaction.amount;
                }
                return saldo - transaction.amount;
              }
            }
            return saldo;
          }, 0);
        })
        .catch((error) => {
          console.error("Error al obtener movimientos:", error);
          this.saldoTotal = 0;
        });
    },

    getPaymentMethod() {
      this.axios
        .get(`/config/payment-method/list-array`)
        .then((response) => {
          this.paymentMethod = response.data.filter(
            (data) => !["Efectivo", "Paypal", "Transferencia"].includes(data.name)
          );
        })
        .catch((error) => console.error("Error al obtener métodos de pago:", error));
    },

    async setBuyCourse() {
      try {
        this.loadingCourse = true;

        if (this.payment_method_id === 1) {
          await this.BuyCourse();
        } else if (this.payment_method_id === 5) {
          if (this.saldoTotal < this.importeCurso) {
            this.closePaymentModal();
            this.showMsg('error', 'Saldo insuficiente en la billetera');
            return;
          }

          const form = {
            course_id: this.pao_id,
            user_id: this.user_id,
            type_purchase: 2,
          };

          const response = await this.axios.post("course/buy-purchased-course", form);

          const verificacion = await this.axios.get("course/purchased-courses");
          const comprados = verificacion.data.data || [];
          const yaComprado = comprados.some((item) => item.id === this.pao_id);

          if (yaComprado) {
            this.closePaymentModal();
            this.courseFilter = true;
            this.showMsg('info', 'El libro ya está en tu biblioteca');
            setTimeout(() => this.goToBook(this.pao_id), 1500);
            return;
          }

          if (response.data && response.data.status === "ok") {
            await this.getWalletUser();
            this.closePaymentModal();
            this.courseFilter = true;
            this.showMsg('success', 'La compra se ha realizado con éxito');
            setTimeout(() => this.goToBook(this.pao_id), 1500);
          } else {
            throw new Error(response.data?.message || "Error desconocido en la compra");
          }
        }
      } catch (error) {
        console.error("Error en la compra:", error);

        if (
          error.response?.status === 200 ||
          error.response?.data?.message?.includes("ya adquirido")
        ) {
          this.closePaymentModal();
          this.courseFilter = true;
          await this.FilterBtn();
          this.showMsg('info', 'El libro ya ha sido adquirido');
          setTimeout(() => this.goToBook(this.pao_id), 1500);
        } else {
          this.showMsg(
            'error',
            error.response?.data?.message ||
            error.message ||
            "Ocurrió un error al procesar la compra"
          );
        }
      } finally {
        this.loadingCourse = false;
      }
    },

    closePaymentModal() {
      try {
        if (this.$refs.paymentModal) {
          $(this.$refs.paymentModal).modal("hide");
          $(".modal-backdrop").remove();
          $("body").removeClass("modal-open").css("padding-right", "");
        }
      } catch (error) {
        console.error("Error al cerrar el modal:", error);
      }
    },

    async inscribirCursoGratis() {
      try {
        const form = {
          course_id: this.pao_id,
          type_purchase: 3,
          user_id: this.user_id,
        };

        const response = await this.axios.post("course/buy-purchased-course", form);

        if (response.data.status === "ok") {
          this.showMsg('success', 'Has obtenido el libro exitosamente');
          setTimeout(() => this.goToBook(this.pao_id), 1500);
        } else if (response.status === 200) {
          this.showMsg('info', 'Ya tienes este libro en tu biblioteca');
          setTimeout(() => this.goToBook(this.pao_id), 1500);
        } else {
          throw new Error(response.data.message || "Error al obtener el libro");
        }
      } catch (error) {
        console.error("Error al obtener el libro:", error);

        if (error.response?.status === 200) {
          this.showMsg('info', 'Ya tienes este libro en tu biblioteca');
          setTimeout(() => this.goToBook(this.pao_id), 1500);
        } else {
          this.showMsg(
            'error',
            error.response?.data?.message ||
            error.message ||
            "Ocurrió un error al obtener el libro"
          );
        }
      }
    },

    async BuyCourse() {
      try {
        const response = await this.axios.post("/pay/course-openpay", {
          course_id: this.pao_id,
        });
        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
        } else {
          throw new Error("No se recibió la URL de pago");
        }
      } catch (error) {
        console.error("Error al procesar el pago:", error);
        this.showMsg('error', 'Ocurrió un error al procesar el pago. Por favor, intente nuevamente.');
      }
    },

    FilterBtn() {
      return this.axios
        .get("course/purchased-courses")
        .then((res) => {
          const comprados = res.data.data || [];
          this.courseFilter = comprados.some(
            (item) => item.id == this.$route.params.ide
          );
        })
        .catch((error) => console.error("Error al verificar compras:", error));
    },

    getRatings() {
      this.axios
        .get(`marketing/courses/${this.pao_id}/ratings`)
        .then((res) => {
          const data = res.data?.data || res.data || [];
          this.ratings = Array.isArray(data) ? data : [];
        })
        .catch((error) => console.error("Error al obtener valoraciones:", error));
    },

    getAttributes() {
      this.pao_id = this.$route.params.ide;
      this.getRatings();

      this.axios
        .get("marketing/courses/" + this.pao_id)
        .then((datos) => {
          this.items = datos.data.data;

          this.importeCurso = this.items.price;
          this.precio = this.items.old_price > 0 ? this.items.old_price : this.items.price_base;
          this.price_with_discount = this.items.price;

          this.isOwner = this.items.owner;
          this.showRecommendations = !this.items.owner;

          this.videoimg = this.items.path_url || "";

          if (this.videoimg && this.videoimg.toLowerCase().endsWith(".mp4")) {
            this.tymedia = 1;
            this.videoimg = this.videoimg.startsWith('http')
              ? this.videoimg
              : 'https://promolider-storage-user.s3-accelerate.amazonaws.com/' + this.videoimg;
          } else {
            this.tymedia = 2;
            this.img = this.videoimg;
          }

          this.titulo = this.items.title;
          this.descripcion = this.items.description;
          this.curso_detalle = this.items.course_about;
          this.aprendera = this.items.will_learn;
          this.previos = this.items.prev_knowledge;
          this.dirigido = this.items.course_for;
          this.language = this.items.language || "Español";
          this.isDetailsLoading = true;

          const fecha = new Date(this.items.created_at);
          this.fecha_creacion = fecha.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          this.axios
            .get("category/list")
            .then((res) => {
              const categoria = (res.data.data || []).find(
                (c) => c.id == this.items.id_categories
              );
              if (categoria) this.categoria = categoria.name;
            })
            .catch((error) => console.error("Error al obtener categorías:", error));

          this.axios
            .get(`user/show?id=${this.items.user_id}`)
            .then((res) => {
              this.nameProductor = res.data.fullName;
              this.emailProductor = res.data.email;
              this.imgProductor = res.data.photo;
            })
            .catch(() => {
              // El endpoint user/show aún no existe en la API nueva:
              // se usan los datos del propio libro como respaldo.
              this.nameProductor = this.items.author_name || "Autor Oficial";
            });
        })
        .catch((error) => console.error("Error al obtener el libro:", error));

      this.axios
        .get("course/list-available-books")
        .then((datos) => {
          this.courses = datos.data.data || [];
          this.loadingRelated = false;
        })
        .catch((error) => {
          console.error("Error al obtener libros relacionados:", error);
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
    this.getAttributes();
    this.FilterBtn();
    this.getPaymentMethod();
  },
};
</script>

<style scoped>
.product-detail-wrapper {
  min-height: 85vh;
  background: transparent;
}

/* Breadcrumb */
.custom-breadcrumb .breadcrumb-item,
.custom-breadcrumb .breadcrumb-item a {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.88rem !important;
  color: #71717A !important;
  text-decoration: none !important;
}

.custom-breadcrumb .breadcrumb-item.active {
  color: #18181B !important;
  font-weight: 600 !important;
}

.max-w-200 {
  max-width: 240px;
}

/* Cabecera del Producto */
.bestseller-badge {
  background: #FEF3C7 !important;
  color: #B45309 !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.72rem !important;
  font-weight: 800 !important;
  padding: 4px 10px !important;
  border-radius: 12px !important;
  letter-spacing: 0.5px;
}

.product-main-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 800 !important;
  font-size: 1.85rem !important;
  line-height: 1.3 !important;
}

.rating-score-text {
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  color: #18181B;
}

.rating-count-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.85rem;
}

/* Contenedor Multimedia */
.product-media-container {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 20px !important;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04) !important;
}

/* Tarjetas de Contenido */
.reviews-card {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 20px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03) !important;
}

.section-card-heading {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 800 !important;
  font-size: 1.2rem !important;
  color: #18181B !important;
}

.product-description-text {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.95rem !important;
  color: #71717A !important;
  line-height: 1.65 !important;
}

.border-top-subtle {
  border-top: 1px solid #E5E3DC !important;
}

/* Reseñas */
.verified-purchases-badge {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8rem;
  color: var(--primary-color);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.student-review-item {
  background: #FAF9F5 !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 14px !important;
}

.review-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--primary-color);
  color: #FFFFFF;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.reviewer-name {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 0.9rem !important;
  color: #18181B !important;
}

.review-time {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.72rem;
}

.review-text {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.88rem !important;
  color: #71717A !important;
  line-height: 1.5 !important;
}

/* Trust features */
.trust-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  color: #18181B;
  display: block;
}

.trust-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.78rem;
  color: #71717A;
}

/* Autor */
.productor-avatar {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
}

.productor-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1.5px solid #E5E3DC;
}

.productor-name {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 0.92rem !important;
  color: #18181B !important;
}

.productor-email {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.78rem;
}

.udemy-bg-dark { background-color: #1c1d1f !important; }
.udemy-text-link { color: #c0c4fc !important; }
.udemy-text-rating { color: #f69c08 !important; }
.udemy-bg-badge { background-color: #eceb98 !important; }
.udemy-text-badge { color: #3d3c0a !important; }
.udemy-bg-primary { background-color: #18d600 !important; }
.udemy-text-primary { color: var(--primary-color) !important; }

@media (min-width: 992px) {
  .udemy-lg-mt-negative { margin-top: -450px !important; }
}

/* Thumbnail + Play Overlay */
.promo-thumbnail {
  width: 100%;
  display: block;
  object-fit: cover;
  aspect-ratio: 16 / 9;
  filter: brightness(0.72);
  transition: filter 0.25s ease;
}
.product-media-container:hover .promo-thumbnail {
  filter: brightness(0.55);
}

.promo-play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

.promo-play-btn {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  border: 3px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 24px rgba(0,0,0,0.45);
  transition: transform 0.2s ease, background 0.2s ease;
}
.promo-play-overlay:hover .promo-play-btn {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.30);
}

.promo-play-label {
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-shadow: 0 1px 6px rgba(0,0,0,0.7);
  letter-spacing: 0.3px;
}
</style>
