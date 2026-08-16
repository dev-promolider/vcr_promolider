<template>
  <div class="product-detail-wrapper w-100">
    <!-- UDEMY STYLE DARK HEADER BANNER -->
    <div class="udemy-dark-header udemy-bg-dark tw-text-white tw-pt-8 tw-pb-12">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-xl-11">
            <div class="row">
              <div class="col-12 col-lg-8">
                <!-- Breadcrumb Navigation -->
                <nav aria-label="breadcrumb" class="mb-4">
                  <ol class="breadcrumb custom-breadcrumb bg-transparent p-0 mb-0">
                    <li class="breadcrumb-item"><router-link to="/courses" class="udemy-text-link hover:tw-text-white tw-font-bold tw-transition-colors">Cursos</router-link></li>
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
                  <span class="bestseller-badge udemy-bg-badge udemy-text-badge tw-font-bold tw-px-2 tw-py-1 tw-text-xs">LO MÁS VENDIDO</span>
                  
                  <div class="d-flex align-items-center rating-reviews-row">
                    <span class="rating-score-text font-weight-bold udemy-text-rating tw-mr-1">4.8</span>
                    <v-rating color="#F59E0B" hover readonly length="5" size="14" value="4.8" half-increments class="p-0 tw-mr-2"></v-rating>
                    <a href="#" class="rating-count-text udemy-text-link hover:tw-text-white tw-underline tw-mr-3">(112 valoraciones)</a>
                    <span class="tw-text-gray-200">10,665 estudiantes</span>
                  </div>
                </div>
                
                <div class="d-flex align-items-center gap-1 mb-2 tw-text-sm">
                  <span class="tw-text-gray-200">Creado por</span>
                  <a href="#" class="udemy-text-link hover:tw-text-white tw-underline">{{ nameProductor || 'Instructor Oficial' }}</a>
                </div>
                
                <div class="d-flex flex-wrap align-items-center gap-4 tw-text-sm tw-text-gray-200 mt-3">
                  <div class="d-flex align-items-center gap-1">
                    <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Última actualización: {{ approvalDateField ? '8/2026' : 'Reciente' }}</span>
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
    <!-- MAIN CONTENT AREA -->
    <div class="container-fluid py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-11">
          
          <template v-if="processPay">
            <Openpay :openpayData="openpayData"></Openpay>
          </template>

          <div class="row position-relative">
            <!-- Columna Izquierda: Contenido Principal -->
            <div class="col-12 col-lg-8 pr-lg-5">
              <!-- Lo que aprenderás (Estilo Udemy Box) -->
              <div class="tw-border tw-border-gray-300 dark:tw-border-gray-700 tw-p-6 tw-mb-8 tw-bg-white dark:udemy-bg-dark">
                <h2 class="tw-text-2xl tw-font-bold tw-mb-4 tw-text-gray-900 dark:tw-text-white">Lo que aprenderás</h2>
                <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                  <div class="d-flex align-items-start gap-2" v-for="(item, index) in parseList(aprendera)" :key="index">
                    <svg class="tw-w-5 tw-h-5 tw-mt-0.5 tw-text-gray-900 dark:tw-text-gray-300 tw-flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span class="tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">{{ item }}</span>
                  </div>
                </div>
              </div>

              <!-- Este curso incluye (Tech Specs) -->
              <div class="tw-mb-8">
                <h2 class="tw-text-xl tw-font-bold tw-mb-4 tw-text-gray-900 dark:tw-text-white">Este curso incluye:</h2>
                <div class="row g-3 tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">
                  <div class="col-12 col-md-6 d-flex align-items-center gap-2">
                    <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <span>Video bajo demanda de nivel {{ level }}</span>
                  </div>
                  <div class="col-12 col-md-6 d-flex align-items-center gap-2" v-if="includes.includes('resources')">
                    <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    <span>Recursos descargables</span>
                  </div>
                  <div class="col-12 col-md-6 d-flex align-items-center gap-2" v-if="includes.includes('mobile')">
                    <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    <span>Acceso en dispositivos móviles</span>
                  </div>
                  <div class="col-12 col-md-6 d-flex align-items-center gap-2" v-if="items.certificate == 1">
                    <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                    <span>Certificado de finalización</span>
                  </div>
                </div>
              </div>

              <!-- Requisitos -->
              <div class="tw-mb-8">
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
                    <strong>Acerca de este curso:</strong>
                    <br>{{ curso_detalle }}
                  </template>
                  
                  <template v-if="dirigido">
                    <br><br>
                    <strong>¿A quién está dirigido?</strong>
                    <br>{{ dirigido }}
                  </template>
                </div>
              </div>

            <!-- Temario del Curso -->
            <div class="temary-card p-4 mb-4">
              <h4 class="section-card-heading mb-4">Temario y Lecciones</h4>
              <div v-if="isLoading" class="loader loader-temary py-4 text-center">Cargando temario...</div>
              
              <div v-else-if="course && course.modules" class="accordion-syllabus">
                <div v-for="(model, index) in course.modules" :key="index" class="module-item mb-3">
                  <div class="module-header p-3 d-flex align-items-center justify-content-between" v-b-toggle="'module-' + index">
                    <h6 class="module-title mb-0">
                      <span class="module-index mr-2">{{ index + 1 }}.</span>
                      {{ model.name }}
                    </h6>
                    <svg class="tw-w-5 tw-h-5 tw-text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>

                  <b-collapse :visible="index === 0" :id="'module-' + index" class="module-collapse">
                    <ul class="lessons-list list-unstyled p-3 mb-0">
                      <li v-for="(less, lIndex) in model.lessons" :key="lIndex" class="lesson-item py-2 d-flex align-items-center justify-content-between border-bottom-subtle">
                        <div class="d-flex align-items-center cursor-pointer" v-if="model.lessons[0].id === less.id" @click="getVideo(less.id)" data-toggle="modal" data-target="#video">
                          <svg class="tw-w-5 tw-h-5 tw-mr-2 udemy-text-primary tw-inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span class="lesson-name active-lesson">{{ less.name }}</span>
                        </div>
                        <div v-else class="d-flex align-items-center text-muted">
                          <svg class="tw-w-4.5 tw-h-4.5 tw-mr-2 tw-text-gray-400 tw-inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                          </svg>
                          <span class="lesson-name">{{ less.name }}</span>
                        </div>
                        <span v-if="model.lessons[0].id === less.id" class="preview-badge">Vista previa</span>
                      </li>
                    </ul>
                  </b-collapse>
                </div>
              </div>
            </div>

            <!-- Reseñas y Valoraciones de Estudiantes -->
            <div class="reviews-card p-4 mb-4">
              <div class="d-flex align-items-center justify-content-between mb-4">
                <h4 class="section-card-heading mb-0">Valoraciones de estudiantes</h4>
                <span class="verified-purchases-badge" v-if="ratingsList && ratingsList.length">
                  <svg class="tw-w-4 tw-h-4 tw-mr-1.5 udemy-text-primary tw-inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  Reseñas verificadas
                </span>
              </div>

              <!-- Si no hay reseñas en el endpoint -->
              <div v-if="!ratingsList || ratingsList.length === 0" class="text-center py-4 text-muted">
                <p class="mb-0 font-weight-500">Aún no hay valoraciones registradas para este curso.</p>
              </div>

              <!-- Si existen reseñas en el endpoint -->
              <div v-else class="row g-3">
                <div v-for="(review, rIdx) in ratingsList" :key="rIdx" class="col-12 col-md-6">
                  <div class="student-review-item p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                      <div class="d-flex align-items-center">
                        <div class="review-avatar mr-2">
                          {{ (review.username || review.user_name || 'U').charAt(0).toUpperCase() }}
                        </div>
                        <div>
                          <h6 class="reviewer-name mb-0">{{ review.username || review.user_name || 'Estudiante' }}</h6>
                          <span class="review-time text-muted">{{ review.created_at || 'Reciente' }}</span>
                        </div>
                      </div>
                      <v-rating color="#F59E0B" readonly length="5" size="14" :value="parseFloat(review.rating || review.rate || 5)" class="p-0"></v-rating>
                    </div>
                    <p class="review-text mb-0">
                      {{ review.comment || review.comments || review.description || 'Sin comentario.' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Tarjeta Flotante (Udemy Sidebar Card) -->
          <div class="col-12 col-lg-4 tw-relative tw-z-10 udemy-lg-mt-negative">
            <div class="udemy-sticky-card tw-bg-white dark:tw-bg-gray-800 tw-shadow-2xl tw-border tw-border-gray-200 dark:tw-border-gray-700 tw-top-8 tw-sticky tw-rounded-lg tw-overflow-hidden">
              <!-- Contenedor Multimedia Principal (Video / Imagen) movido aquí -->
              <div class="product-media-container tw-w-full tw-bg-black">
                <div v-if="tymedia == 1" class="video-container" :class="{ loader: !videoimg }">
                  <video-player
                    class="video-player-box"
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="true"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @statechanged="playerStateChanged($event)"
                    @ready="playerReadied"
                  >
                  </video-player>
                </div>
                <div v-else class="image-container" :class="{ loader: !img }">
                  <img :src="img || defaultCover" class="product-main-img tw-w-full tw-h-auto tw-object-cover" :alt="titulo" @error="onImgError" />
                </div>
              </div>

              <div class="tw-p-6">
                <!-- Tarjeta de Precio -->
                <div class="d-flex flex-column mb-3">
                  <div class="tw-text-3xl tw-font-extrabold tw-text-gray-900 dark:tw-text-white tw-flex tw-items-center tw-gap-2">
                    <span>${{ price_with_discount > 0 ? price_with_discount : precio }}</span> <span class="tw-text-base tw-font-semibold tw-text-gray-500">USD</span>
                  </div>
                  <div v-if="precio > 0 && precio !== importeCurso" class="tw-mt-1 tw-flex tw-items-center tw-gap-2">
                    <span class="tw-line-through tw-text-gray-500 tw-text-sm">${{ precio }}</span>
                  </div>
                </div>

                <div class="tw-px-6 tw-pb-6">
                <!-- Botones de Acción de Compra -->
                <div class="action-buttons-wrapper d-flex flex-column gap-3 mb-4">
                  <template v-if="!isOwner">
                    <button v-if="courseFilter == false && precio == 0" class="tw-w-full udemy-bg-primary hover:udemy-bg-primary tw-text-white tw-font-bold tw-py-3 tw-px-4 tw-border-none tw-cursor-pointer tw-text-lg tw-transition-colors" @click="inscribirCursoGratis()" :class="{ loader: !titulo }">
                      Inscribirse Gratis
                    </button>

                    <button v-if="courseFilter == false && precio > 0" class="tw-w-full udemy-bg-primary hover:udemy-bg-primary tw-text-white tw-font-bold tw-py-3 tw-px-4 tw-border-none tw-cursor-pointer tw-text-lg tw-transition-colors" data-toggle="modal" data-target="#paymentModal" :class="{ loader: !titulo }">
                      {{ price_with_discount > 0 ? `Comprar ahora` : "Inscribirte ahora" }}
                    </button>

                    <button v-if="courseFilter == false" @click="addCurrentCourseToCart" class="tw-w-full tw-bg-white hover:tw-bg-gray-100 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 tw-border tw-border-gray-900 dark:tw-border-gray-500 tw-text-gray-900 dark:tw-text-white tw-font-bold tw-py-3 tw-px-4 tw-cursor-pointer tw-transition-colors d-flex align-items-center justify-content-center">
                      Añadir a la cesta
                    </button>
                    
                    <button @click="shareURL" class="tw-w-full tw-bg-transparent hover:tw-bg-gray-100 dark:hover:tw-bg-gray-700 tw-text-gray-900 dark:tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-cursor-pointer tw-border-none tw-transition-colors tw-text-sm tw-mt-2 d-flex align-items-center justify-content-center">
                      <svg width="18" height="18" class="tw-w-4.5 tw-h-4.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                      Compartir curso
                    </button>
                  </template>

                  <template v-else>
                    <button class="tw-w-full udemy-bg-primary hover:udemy-bg-primary tw-text-white tw-font-bold tw-py-3 tw-px-4 tw-border-none tw-cursor-pointer tw-text-lg tw-transition-colors" @click="goToCourse(pao_id)" :class="{ loader: !titulo }">
                      Ir al curso
                    </button>
                  </template>

                  <template v-if="courseFilter">
                    <button class="tw-w-full udemy-bg-primary hover:udemy-bg-primary tw-text-white tw-font-bold tw-py-3 tw-px-4 tw-border-none tw-cursor-pointer tw-text-lg tw-transition-colors" @click="GoCourse()">
                      <span>Curso ya adquirido - Ir a Aprendizaje</span>
                    </button>
                  </template>
                </div>

              <!-- Garantías y Características de Confianza (Trust Features) -->
              <div class="trust-features-list border-top-subtle pt-4 mb-4">
                <div class="trust-feature-item d-flex align-items-start mb-3">
                  <svg width="20" height="20" class="tw-w-5 tw-h-5 mr-3 mt-1 text-emerald-500" style="color: var(--primary-color); flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <div>
                    <span class="trust-title">Acceso inmediato</span>
                    <p class="trust-desc mb-0">Acceso de por vida a todas las lecciones y archivos.</p>
                  </div>
                </div>

                <div class="trust-feature-item d-flex align-items-start mb-3">
                  <svg width="20" height="20" class="tw-w-5 tw-h-5 mr-3 mt-1 text-emerald-500" style="color: var(--primary-color); flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                  <div>
                    <span class="trust-title">Certificado Oficial</span>
                    <p class="trust-desc mb-0">Certificado digital al completar el curso.</p>
                  </div>
                </div>

                <div class="trust-feature-item d-flex align-items-start">
                  <svg width="20" height="20" class="tw-w-5 tw-h-5 mr-3 mt-1 text-emerald-500" style="color: var(--primary-color); flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <div>
                    <span class="trust-title">Pago 100% Seguro</span>
                    <p class="trust-desc mb-0">Transacciones protegidas con cifrado bancario SSL.</p>
                  </div>
                </div>
              </div>

              <!-- Tarjeta de Instructor / Productor -->
              <div class="productor-card-box p-3 border-top-subtle">
                <div class="d-flex align-items-center">
                  <div class="productor-avatar mr-3">
                    <img :src="imgProductor || defaultAvatar" alt="Productor" class="rounded-circle" @error="onImgError" />
                  </div>
                  <div class="overflow-hidden">
                    <h6 class="productor-name text-truncate mb-0">{{ nameProductor || 'Instructor Oficial' }}</h6>
                    <span class="productor-email text-truncate text-muted d-block small">{{ emailProductor }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección de Cursos Recomendados / Relacionados -->
        <div v-if="shouldShowRecommendations" class="recommendations-section mt-5 pt-4 border-top-subtle">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h3 class="section-title mb-0">
              <v-icon color="var(--primary-color)" size="24" class="mr-2">mdi-grid</v-icon>
              Cursos Recomendados
            </h3>
          </div>

          <div v-if="loadingRelated" class="text-center py-4">
            <b-spinner variant="success" label="Cargando recomendaciones"></b-spinner>
          </div>

          <div v-else class="row g-3">
            <div class="col-12 col-md-4" v-for="course in filteredRecommendations" :key="course.id">
              <Card :course="course" :cardType="1" :isMouseOverActive="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Modal Video -->
    <div class="modal fade" id="video" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <h3 class="modal-title text-white text-center" id="staticBackdropLabel">
              {{ titulo }}
            </h3>
          </div>
          <div class="modal-body">
            <div class="video">
              <Video v-if="renderVideo" />
              <div v-else class="center-spinner">
                <b-spinner style="width: 3rem; height: 3rem" variant="secondary" label="Large Spinner"></b-spinner>
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
                Precio Curso: $/ {{ importeCurso }}
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
</div>
</div>
</template>

<script>
import Video from "@/components/course/video";
import Card from "@/components/courses/cards";
import Openpay from "@/components/Buy/openpay.vue";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import "vue-video-player/src/custom-theme.css";
import { mapState, mapActions } from "vuex";
import $ from "jquery";

export default {
  name: "VirtualClassroomBuyCursos",
  metaInfo() {
    return {
      title: this.titulo,
      meta: [
        {
          property: "og:title",
          content: this.titulo,
        },
        {
          property: "og:description",
          content: this.descripcion,
        },
        {
          property: "og:image",
          content: this.img,
        },
      ],
    };
  },
  props: ["ide"],
  data() {
    return {
      defaultCover: require("@/assets/background-login.webp"),
      defaultAvatar: "https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240",
      inactive: false,
      baseURL: "http://promolider.xyz/storage/",
      nameProductor: "",
      emailProductor: "",
      items: [],
      pao_id: null,
      price_with_discount: "",
      descripcion: "",
      level: "",
      img: "",
      titulo: "",
      curso_detalle: "",
      aprendera: "",
      previos: "",
      dirigido: "",
      language: "Español",
      includes: [],
      lecciones: [],
      lecciones3: [],
      lecciones4: [],
      lecciones5: [],
      description: "",
      limite: 4,
      courses: [],
      courses1: [],
      loadingRelated: true,
      showRecommendations: true,
      fecha_creacion: null,
      categoria: null,
      isDetailsLoading: false,
      courseFilter: false,
      approvalDateField: null,
      imgProductor: null,
      isOwner: false,
      openpayData: [],
      processPay: false,
      videoimg: "",
      playerOptions: {
        responsive: true,
        fluid: true,
        preload: "auto",
        autoplay: false,
        muted: false,
        language: "es",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "Video/mp4",
            src: "",
          },
        ],
        poster: "",
        controlBar: {
          durationDisplay: true,
          timeDivider: true,
        },
      },
      tymedia: 0,
      saldoTotal: 0,
      importeCurso: 0,
      paymentMethod: [],
      payment_method_id: 1,
      precio: 0,
      showModal: false,
      user_id: null,
      loadingCourse: false,
    };
  },
  components: {
    Video,
    Card,
    Openpay,
    videoPlayer,
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
    player() {
      return this.$refs.videoPlayer.player;
    },
    ...mapState("course", ["course", "renderVideo", "isLoading", "allRating"]),

    ratingsList() {
      if (Array.isArray(this.allRating) && this.allRating.length > 0) {
        return this.allRating;
      }
      if (this.allRating && Array.isArray(this.allRating.data) && this.allRating.data.length > 0) {
        return this.allRating.data;
      }
      if (this.items && Array.isArray(this.items.ratings) && this.items.ratings.length > 0) {
        return this.items.ratings;
      }
      if (this.items && Array.isArray(this.items.reviews) && this.items.reviews.length > 0) {
        return this.items.reviews;
      }
      return [];
    },

    filteredRecommendations() {
      if (!this.courses || !this.pao_id) return [];

      return this.courses
        .filter((course) => course.id !== parseInt(this.pao_id))
        .slice(0, 3);
    },

    shouldShowRecommendations() {
      return !this.isOwner && !this.courseFilter && this.showRecommendations;
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
    addCurrentCourseToCart() {
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
    },
    onImgError(e) {
      if (e && e.target) {
        e.target.src = this.defaultCover;
      }
    },
    ...mapActions("course", {
      getCourse: "getCourse",
      getVideo: "getVideo",
      getRating: "getRating",
    }),

    shareURL() {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    },

    onPlayerPlay(player) {
      console.log("player play!", player);
    },

    onPlayerPause(player) {
      console.log("player pause!", player);
    },

    onPlayerLoadeddata() { },

    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
    },

    playerReadied(player) {
      console.log("the player is readied", player);
    },

    closeModal() {
      this.payment_method_id = 1;
    },

    getWalletUser() {
      this.axios
        .get(`/reports/mymovements/${this.user_id}`)
        .then((response) => {
          try {
            this.saldoTotal = response.data.data.reduce(
              (saldo, transaction) => {
                if (transaction.status === 1 || transaction.status === 0) {
                  if (transaction.type === 1) {
                    return saldo + transaction.amount;
                  } else if (transaction.type === 0) {
                    if (transaction.id_receiver === this.user_id) {
                      return saldo + transaction.amount;
                    } else {
                      return saldo - transaction.amount;
                    }
                  }
                }
                return saldo;
              },
              0
            );
          } catch (error) {
            console.error("Error al calcular el saldo:", error);
            this.saldoTotal = 0;
            this.showMsg('error',"Error al calcular el saldo de la billetera");
          }
        })
        .catch((error) => {
          console.error("Error al obtener movimientos:", error);
          this.saldoTotal = 0;
          this.showMsg('error',
            "Error al obtener los movimientos de la billetera"
          );
          console.error("Detalles completos:", JSON.stringify(error, null, 2));
        });
    },

    getPaymentMethod() {
      this.axios.get(`/config/payment-method/list-array`).then((response) => {
        this.paymentMethod = response.data.filter(
          (data) => !["Efectivo", "Paypal", "Transferencia"].includes(data.name)
        );
      });
    },

    async goToCourse(id) {
      let dataRequest;

      try {
        const response = await this.axios.get(
          `purchased/show-class-seen?course_id=${id}`
        );
        dataRequest = response.data.data;
        this.$store.commit("course/UPDATE_TIME", dataRequest.display_time);

        if (!dataRequest.name) {
          const responseTemary = await this.axios.get(
            `course/temary/get-all-class/${id}`
          );
          let firstClass = responseTemary.data.data.modules[0].lessons[0].name;
          this.$router
            .push({
              name: "curso",
              query: {
                course: id,
                class: firstClass,
                rate: this.course.ranking_by_user,
              },
            })
            .catch(() => { });
        } else {
          this.$router
            .push({
              name: "curso",
              query: {
                course: id,
                class: dataRequest.name,
                rate: this.course.ranking_by_user,
              },
            })
            .catch(() => { });
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    },

    async setBuyCourse() {
      try {
        this.loadingCourse = true;
        console.log("Iniciando proceso de compra...");

        if (this.payment_method_id === 1) {
          await this.BuyCourse();
        } else if (this.payment_method_id === 5) {
          if (this.saldoTotal < this.importeCurso) {
            this.closePaymentModal();
            this.showMsg('error',"Saldo insuficiente en la billetera");
            return;
          }

          const form = {
            course_id: this.pao_id,
            user_id: this.user_id,
            type_purchase: 2,
          };

          console.log("Enviando solicitud de compra:", form);

          const response = await this.axios.post(
            "course/buy-purchased-course",
            form
          );
          console.log("Respuesta recibida:", response.data);

          const verificacionCurso = await this.axios.get(
            "course/purchased-courses"
          );
          const cursosComprados = verificacionCurso.data.data;
          const cursoYaComprado = cursosComprados.some(
            (curso) => curso.id === this.pao_id
          );

          if (cursoYaComprado) {
            this.closePaymentModal();
            this.courseFilter = true;
            this.showMsg('success',"El curso ya está en tu biblioteca");
            setTimeout(() => {
              this.$router.push("/suscription-user");
            }, 1500);
            return;
          }

          if (response.data && response.data.status === "ok") {
            await this.getWalletUser();
            this.closePaymentModal();
            this.courseFilter = true;
            this.showMsg('success',"La compra se ha realizado con éxito");

            setTimeout(() => {
              this.$router.push("/suscription-user");
            }, 1500);
          } else {
            throw new Error(
              response.data?.message || "Error desconocido en la compra"
            );
          }
        }
      } catch (error) {
        console.error("Error completo:", error);
        console.error("Detalles de la respuesta:", error.response?.data);

        if (
          error.response?.status === 200 ||
          (error.response?.data?.message &&
            error.response?.data?.message.includes("ya adquirido"))
        ) {
          this.closePaymentModal();
          this.courseFilter = true;
          await this.FilterBtn();
          this.showMsg('info',"El curso ya ha sido adquirido");
          setTimeout(() => {
            this.$router.push("/suscription-user");
          }, 1500);
        } else {
          this.showMsg('error',
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

    openPaymentModal() {
      try {
        if (this.$refs.paymentModal) {
          $(this.$refs.paymentModal).modal("show");
        }
      } catch (error) {
        console.error("Error al abrir el modal:", error);
      }
    },

    async inscribirCursoGratis() {
      try {
        this.$store.commit("course/SET_LOADING", true);

        const form = {
          course_id: this.pao_id,
          type_purchase: 3,
          user_id: this.user_id,
        };

        const response = await this.axios.post(
          "course/buy-purchased-course",
          form
        );

        // El backend nuevo responde con HTTP 201 y message:'saved data'
        // El backend antiguo respondía con status:'ok'
        const isSuccess =
          response.data.status === "ok" ||
          response.data.message === "saved data" ||
          response.status === 201;

        if (isSuccess) {
          this.showMsg('success',"Te has inscrito exitosamente al curso");
          this.courseFilter = true; // marcar como inscrito de inmediato
          setTimeout(() => {
            this.$router.push("/suscription-user");
          }, 1500);
        } else if (response.status === 200) {
          this.showMsg('info',"Ya estás inscrito en este curso");
          setTimeout(() => {
            this.$router.push("/suscription-user");
          }, 1500);
        } else {
          throw new Error(
            response.data.message || "Error al inscribirse al curso"
          );
        }
      } catch (error) {
        console.error("Error completo al inscribirse al curso:", error);

        if (error.response?.status === 201 || error.response?.status === 200) {
          this.showMsg('success',"Te has inscrito exitosamente al curso");
          this.courseFilter = true;
          setTimeout(() => {
            this.$router.push("/suscription-user");
          }, 1500);
        } else {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Ocurrió un error al inscribirse al curso";
          this.showMsg('error',errorMessage);
        }
      } finally {
        this.$store.commit("course/SET_LOADING", false);
      }
    },

    async BuyCourse() {
      try {
        const form = {
          course_id: this.pao_id,
        };
        const response = await this.axios.post("/pay/course-openpay", form);
        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
        } else {
          throw new Error("No se recibió la URL de pago");
        }
      } catch (error) {
        console.error("Error al procesar el pago:", error);
        this.showMsg('error',
          "Ocurrió un error al procesar el pago. Por favor, intente nuevamente."
        );
      }
    },

    FilterBtn() {
      this.axios("course/purchased-courses").then((res) => {
        let idcourse = res.data.data;
        if (!Array.isArray(idcourse)) {
          this.courseFilter = false;
          return;
        }
        var id_course = idcourse.map(function (idcourse) {
          return idcourse.id;
        });
        this.courseFilter = id_course.some(
          (id_cours) => id_cours == this.$route.params.ide
        );
      }).catch(() => {
        // Si falla la petición, asumimos que el curso no está comprado
        this.courseFilter = false;
      });
    },

    GoCourse() {
      this.$router.push("/suscription-user");
    },

    parseList(text) {
      if (!text) return [];
      return text.split('\n').map(t => t.replace(/^- /, '').trim()).filter(t => t.length > 0);
    },
    
    getAttributes() {
      this.pao_id = this.$route.params.ide;
      this.axios.get("marketing/courses/" + this.pao_id).then((datos) => {
        this.items = datos.data.data;
        
        // Precio y Precio Tachado
        this.importeCurso = this.items.price;
        this.precio = this.items.old_price > 0 ? this.items.old_price : this.items.price_base;
        this.price_with_discount = this.items.price;
        
        this.isOwner = this.items.owner;
        this.showRecommendations = !this.items.owner;

        switch (this.items.course_level_id) {
          case 1: this.level = "Principiante"; break;
          case 2: this.level = "Intermedio"; break;
          case 3: this.level = "Avanzado"; break;
          case 4: this.level = "Todos los niveles"; break;
        }
        this.videoimg = this.items.path_url || "";

        if (this.videoimg && this.videoimg.toLowerCase().endsWith(".mp4")) {
          this.tymedia = 1;
          this.$set(this.playerOptions.sources, 0, {
            type: "video/mp4",
            src: this.videoimg,
          });
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
        
        try {
          this.includes = typeof this.items.includes === 'string' ? JSON.parse(this.items.includes) : (this.items.includes || []);
        } catch(e) {
          this.includes = [];
        }   this.previos = this.items.prev_knowledge;
        this.dirigido = this.items.course_for;
        this.isDetailsLoading = true;

        const fecha = new Date(this.items.created_at);
        let options = { year: "numeric", month: "long", day: "numeric" };
        this.fecha_creacion = fecha.toLocaleDateString("es-ES", options);

        this.axios.get("category/list").then((res) => {
          console.log("CATEGORIAAAAS", res.data.data);
          for (const index in res.data.data) {
            if (res.data.data[index].id == this.items.id_categories) {
              this.categoria = res.data.data[index].name;
            
              // Aquí probablemente está mal el acceso a user_id
              // Esto depende de la estructura de `res.data`, que parece incorrecta
              this.user_id = res.data.status?.id || null;
            
              // ✅ Agrega este log justo antes de llamar getWalletUser
              console.log("🧪 User ID que se usará para billetera:", this.user_id);
            
              // Verifica que user_id sea válido antes de continuar
              if (this.user_id) {
                this.getWalletUser();
              } else {
                console.warn("⚠️ No se pudo obtener el user_id. No se llamó getWalletUser.");
              }
            }
          }
        });

        this.axios.get(`user/show?id=${this.items.user_id}`).then((res) => {
          this.nameProductor = res.data.fullName;
          this.emailProductor = res.data.email;
          this.imgProductor = res.data.photo;
        });
      });

      this.axios.get("course/related-courses").then((datos) => {
        this.lord = false;
        this.guardar = true;
        this.loading = false;
        this.mostrar = true;
        this.courses = datos.data.data;
        this.courses1 = this.filteredRecommendations;
        this.loadingRelated = false;
      });
    },
  },
  watch: {
    ide() {
      this.getAttributes();
    },
  },
  mounted() { },
  created() {
    this.getAttributes();
    this.getCourse(this.$route.params.ide);
    if (this.$route.params.ide) {
      this.getRating(this.$route.params.ide);
    }

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

.category-badge-tag,
.level-badge-tag {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  color: #18181B !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.78rem !important;
  font-weight: 600 !important;
  padding: 4px 12px !important;
  border-radius: 14px !important;
}

.product-main-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 800 !important;
  font-size: 1.85rem !important;
  line-height: 1.3 !important;
  /* color se hereda del contexto: blanco en header oscuro, oscuro en el resto */
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

/* Contenedor Multimedia Principal */
.product-media-container {
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 20px !important;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04) !important;
}

.product-main-img {
  width: 100%;
  max-height: 480px;
  object-fit: cover;
  display: block;
}

.rounded-20 {
  border-radius: 20px !important;
}

/* Ficha Técnica / Specs */
.specs-grid-card {
  background: #FAF9F5 !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 20px !important;
}

.specs-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.05rem !important;
  color: #18181B !important;
}

.spec-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #71717A;
  display: block;
}

.spec-value {
  font-family: 'Outfit', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  color: #18181B;
}

/* Tarjetas de Contenido */
.product-content-card,
.temary-card,
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

.section-sub-heading {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.02rem !important;
  color: #18181B !important;
}

.product-description-text,
.product-sub-text {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.95rem !important;
  color: #71717A !important;
  line-height: 1.65 !important;
}

/* Temario Acordeón */
.module-item {
  border: 1px solid #E5E3DC !important;
  border-radius: 14px !important;
  overflow: hidden;
}

.module-header {
  background: #FAF9F5 !important;
  cursor: pointer;
  user-select: none;
}

.module-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 0.95rem !important;
  color: #18181B !important;
}

.lesson-name {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.88rem !important;
}

.active-lesson {
  font-weight: 600 !important;
  color: #18181B !important;
}

.preview-badge {
  font-family: 'Outfit', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--primary-color);
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
}

.border-bottom-subtle {
  border-bottom: 1px solid #E5E3DC !important;
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

.rating-pill {
  font-family: 'Outfit', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 16px;
  background: #FAF9F5;
  border: 1px solid #E5E3DC;
  color: #71717A;
  cursor: pointer;
}

.rating-pill.active {
  background: var(--primary-color);
  color: #FFFFFF;
  border-color: var(--primary-color);
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

/* Tarjeta Sticky Lateral de Compra */
.sticky-buy-card {
  position: sticky;
  top: 90px;
  background: #FFFFFF !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 20px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
}

.main-price {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 800 !important;
  font-size: 2rem !important;
  color: var(--primary-color) !important;
}

.currency-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #71717A;
}

.old-price {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: #9CA3AF;
  text-decoration: line-through;
}

.favorite-btn {
  background: #FAF9F5;
  border: 1px solid #E5E3DC;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.favorite-btn:hover {
  background: #FFFFFF;
  border-color: #EF4444;
}

.limited-discount-tag {
  background: #FEE2E2 !important;
  color: #EF4444 !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  font-size: 0.78rem !important;
  padding: 4px 10px !important;
  border-radius: 10px !important;
}

.stock-text {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  color: var(--primary-color);
}

.btn-primary-buy {
  width: 100%;
  background: var(--primary-color) !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 14px !important;
  padding: 12px 20px !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  cursor: pointer;
  transition: all 0.25s ease !important;
}

.btn-primary-buy:hover {
  background: var(--primary-hover) !important;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35) !important;
}

.btn-secondary-share {
  width: 100%;
  background: #FFFFFF !important;
  color: #18181B !important;
  border: 1px solid #E5E3DC !important;
  border-radius: 14px !important;
  padding: 10px 20px !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 0.9rem !important;
  font-weight: 700 !important;
  cursor: pointer;
  transition: all 0.25s ease !important;
}

.btn-secondary-share:hover {
  border-color: var(--primary-color) !important;
  color: var(--primary-color) !important;
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

/* Productor / Instructor Card */
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

.video-player-box {
  width: 100%;
  max-height: 480px;
}

:deep(.video-js) {
  border-top-left-radius: 8px !important;
  border-top-right-radius: 8px !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

@media (max-width: 991px) {
  .sticky-buy-card {
    position: static;
  }
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
</style>

