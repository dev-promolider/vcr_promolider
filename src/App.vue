<template>
  <div id="app" class="tw-min-h-screen tw-bg-[#e2e8f0] dark:tw-bg-[#0a0f18] tw-font-jakarta-sans tw-text-gray-800 dark:tw-text-slate-200 tw-transition-colors tw-duration-300">
    <router-view />
    <!-- Portal destino para popovers del Marketplace (escapa del overflow del carousel) -->
    <portal-target name="marketplace-popovers" multiple />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    const savedTheme = localStorage.getItem("app_theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark-mode", "dark");
      document.body.classList.add("dark-mode", "dark");
    }
  },
};
</script>

<style>
/* Scrollbar personalizado */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px var(--primary-color);
  box-shadow: inset 0 0 6px var(--primary-color);
  border-radius: 10px;
  background-color: #121614;
}

::-webkit-scrollbar {
  width: 12px;
  background-color: #121614;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px var(--primary-color);
  box-shadow: inset 0 0 6px var(--primary-color);
  background-color: var(--primary-color);
}

/* Animacion esqueleto de pre-carga */
@keyframes load {
  0% {
    background: #ccc;
  }
  50% {
    background: #eee;
  }
  100% {
    background: #ccc;
  }
}

.loader {
  height: 50px;
  animation: load 2s linear infinite alternate;
  border-radius: 30px;
  color: transparent;
}

/* ======================================================
   REGULACIONES MODO OSCURO GLOBAL (PALETA CRM GLASSMORPHISM)
   ====================================================== */

/* 1. FAQ (Preguntas Frecuentes) */
html.dark-mode body .faq-card,
html.dark body .faq-card {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37) !important;
  backdrop-filter: blur(12px) !important;
}

html.dark-mode body .faq-main-title,
html.dark body .faq-main-title {
  color: #f8fafc !important;
}

html.dark-mode body .faq-subtitle,
html.dark body .faq-subtitle {
  color: #94a3b8 !important;
}

html.dark-mode body .faq-category-btn,
html.dark body .faq-category-btn {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #94a3b8 !important;
}

html.dark-mode body .faq-category-btn:hover,
html.dark body .faq-category-btn:hover {
  border-color: var(--primary-color) !important;
  color: var(--primary-color) !important;
}

html.dark-mode body .faq-category-btn.active,
html.dark body .faq-category-btn.active {
  background: var(--primary-color) !important;
  color: #FFFFFF !important;
  border-color: var(--primary-color) !important;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4) !important;
}

html.dark-mode body .faq-accordion-item,
html.dark body .faq-accordion-item {
  background: rgba(16, 24, 38, 0.6) !important;
  border-color: rgba(255, 255, 255, 0.06) !important;
}

html.dark-mode body .faq-accordion-item:hover,
html.dark body .faq-accordion-item:hover {
  border-color: rgba(255, 255, 255, 0.15) !important;
}

html.dark-mode body .faq-accordion-item.open,
html.dark body .faq-accordion-item.open {
  border-color: var(--primary-color) !important;
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 24, 38, 0.8) 100%) !important;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.2) !important;
}

html.dark-mode body .faq-question-text,
html.dark body .faq-question-text {
  color: #f8fafc !important;
}

html.dark-mode body .faq-answer-text,
html.dark body .faq-answer-text {
  color: #e2e8f0 !important;
  border-top-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .faq-skeleton-item,
html.dark body .faq-skeleton-item {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.06) !important;
}

html.dark-mode body .empty-title,
html.dark body .empty-title {
  color: #f8fafc !important;
}

html.dark-mode body .empty-desc,
html.dark body .empty-desc {
  color: #94a3b8 !important;
}

/* 2. PREFERENCIAS (OptionPreferences.vue) */
html.dark-mode body .preferences-subtitle,
html.dark body .preferences-subtitle {
  color: #94a3b8 !important;
}

html.dark-mode body .preference-card,
html.dark body .preference-card {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(12px) !important;
}

html.dark-mode body .preference-card:hover,
html.dark body .preference-card:hover {
  border-color: var(--primary-color) !important;
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.2) !important;
}

html.dark-mode body .preference-card.active,
html.dark body .preference-card.active {
  background: rgba(22, 30, 46, 0.85) !important;
  border-color: var(--primary-color) !important;
  box-shadow: 0 10px 28px rgba(16, 185, 129, 0.25) !important;
}

html.dark-mode body .preference-badge-icon,
html.dark body .preference-badge-icon {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

html.dark-mode body .preference-card.active .preference-badge-icon,
html.dark body .preference-card.active .preference-badge-icon {
  background: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}

html.dark-mode body .preference-title,
html.dark body .preference-title {
  color: #f8fafc !important;
}

html.dark-mode body .preference-description,
html.dark body .preference-description {
  color: #94a3b8 !important;
}

html.dark-mode body .preference-status-tag,
html.dark body .preference-status-tag {
  color: #94a3b8 !important;
  background: rgba(255, 255, 255, 0.06) !important;
}

html.dark-mode body .preference-status-tag.tag-active,
html.dark body .preference-status-tag.tag-active {
  color: var(--primary-color) !important;
  background: rgba(16, 185, 129, 0.18) !important;
}

html.dark-mode body .skeleton-preference-card,
html.dark body .skeleton-preference-card {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .skeleton-box,
html.dark body .skeleton-box {
  background-color: #161e2e !important;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0) 60%
  ) !important;
}

/* ======================================================
   3. MARKETPLACE (Courses.vue & Cards & Product Detail)
   ====================================================== */
html.dark-mode body .marketplace-card,
html.dark body .marketplace-card,
html.dark-mode body .tarjeta-cursos,
html.dark body .tarjeta-cursos,
html.dark-mode body .ecommerce-course-card,
html.dark body .ecommerce-course-card {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37) !important;
}

html.dark-mode body .marketplace-main-title,
html.dark body .marketplace-main-title,
html.dark-mode body .titulo-curso,
html.dark body .titulo-curso,
html.dark-mode body .card-title-text,
html.dark body .card-title-text,
html.dark-mode body .section-title,
html.dark body .section-title,
html.dark-mode body .product-main-title,
html.dark body .product-main-title,
html.dark-mode body .specs-title,
html.dark body .specs-title,
html.dark-mode body .section-card-heading,
html.dark body .section-card-heading,
html.dark-mode body .section-sub-heading,
html.dark body .section-sub-heading,
html.dark-mode body .module-title,
html.dark body .module-title,
html.dark-mode body .reviewer-name,
html.dark body .reviewer-name,
html.dark-mode body .productor-name,
html.dark body .productor-name,
html.dark-mode body .trust-title,
html.dark body .trust-title {
  color: #f8fafc !important;
}

html.dark-mode body .marketplace-subtitle,
html.dark body .marketplace-subtitle,
html.dark-mode body .categoria-curso,
html.dark body .categoria-curso,
html.dark-mode body .card-description-text,
html.dark body .card-description-text,
html.dark-mode body .rating-number-text,
html.dark body .rating-number-text,
html.dark-mode body .product-description-text,
html.dark body .product-description-text,
html.dark-mode body .product-sub-text,
html.dark body .product-sub-text,
html.dark-mode body .review-text,
html.dark body .review-text,
html.dark-mode body .trust-desc,
html.dark body .trust-desc,
html.dark-mode body .spec-label,
html.dark body .spec-label,
html.dark-mode body .currency-tag,
html.dark body .currency-tag {
  color: #94a3b8 !important;
}

html.dark-mode body .marketplace-search-input,
html.dark body .marketplace-search-input,
html.dark-mode body .cat-pill-btn,
html.dark body .cat-pill-btn,
html.dark-mode body .view-mode-toggle,
html.dark body .view-mode-toggle,
html.dark-mode body .empty-section,
html.dark body .empty-section,
html.dark-mode body .read-more-btn,
html.dark body .read-more-btn,
html.dark-mode body .specs-grid-card,
html.dark body .specs-grid-card,
html.dark-mode body .product-content-card,
html.dark body .product-content-card,
html.dark-mode body .temary-card,
html.dark body .temary-card,
html.dark-mode body .reviews-card,
html.dark body .reviews-card,
html.dark-mode body .module-header,
html.dark body .module-header,
html.dark-mode body .sticky-buy-card,
html.dark body .sticky-buy-card,
html.dark-mode body .student-review-item,
html.dark body .student-review-item,
html.dark-mode body .rating-pill,
html.dark body .rating-pill,
html.dark-mode body .btn-secondary-share,
html.dark body .btn-secondary-share,
html.dark-mode body .favorite-btn,
html.dark body .favorite-btn,
html.dark-mode body .category-badge-tag,
html.dark body .category-badge-tag,
html.dark-mode body .level-badge-tag,
html.dark body .level-badge-tag,
html.dark-mode body .product-media-container,
html.dark body .product-media-container {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  color: #e2e8f0 !important;
}

html.dark-mode body .cat-pill-btn.active,
html.dark body .cat-pill-btn.active,
html.dark-mode body .toggle-btn.active,
html.dark body .toggle-btn.active,
html.dark-mode body .rating-pill.active,
html.dark body .rating-pill.active {
  background: var(--primary-color) !important;
  color: #FFFFFF !important;
  border-color: var(--primary-color) !important;
}

html.dark-mode body .image-container,
html.dark body .image-container,
html.dark-mode body .card-image-wrapper,
html.dark body .card-image-wrapper {
  background: #0a0f18 !important;
}

html.dark-mode body .custom-breadcrumb .breadcrumb-item,
html.dark body .custom-breadcrumb .breadcrumb-item,
html.dark-mode body .custom-breadcrumb .breadcrumb-item a,
html.dark body .custom-breadcrumb .breadcrumb-item a {
  color: #94a3b8 !important;
}

html.dark-mode body .custom-breadcrumb .breadcrumb-item.active,
html.dark body .custom-breadcrumb .breadcrumb-item.active {
  color: #f8fafc !important;
}

/* ======================================================
   4. MIS INFOPRODUCTOS (ProductorCourses.vue)
   ====================================================== */
html.dark-mode body .contents-page,
html.dark body .contents-page {
  background: transparent !important;
}

html.dark-mode body .content-card,
html.dark body .content-card {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37) !important;
}

html.dark-mode body .contents-header h1,
html.dark body .contents-header h1,
html.dark-mode body .card-title,
html.dark body .card-title {
  color: #f8fafc !important;
}

html.dark-mode body .contents-header p,
html.dark body .contents-header p,
html.dark-mode body .description,
html.dark body .description,
html.dark-mode body .search-box span,
html.dark body .search-box span,
html.dark-mode body .rating-text,
html.dark body .rating-text {
  color: #94a3b8 !important;
}

html.dark-mode body .search-box,
html.dark body .search-box,
html.dark-mode body .filter-btn,
html.dark body .filter-btn,
html.dark-mode body .sort-select,
html.dark body .sort-select,
html.dark-mode body .options-btn,
html.dark body .options-btn,
html.dark-mode body .pagination-controls button,
html.dark body .pagination-controls button,
html.dark-mode body .pagination-section select,
html.dark body .pagination-section select,
html.dark-mode body .state-box,
html.dark body .state-box {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  color: #e2e8f0 !important;
}

html.dark-mode body .search-box input,
html.dark body .search-box input {
  color: #e2e8f0 !important;
}

html.dark-mode body .tab-btn,
html.dark body .tab-btn {
  color: #94a3b8 !important;
}

html.dark-mode body .tab-btn.active,
html.dark body .tab-btn.active {
  color: var(--primary-color) !important;
}

/* ======================================================
   5. MIS EXÁMENES (examenes.vue)
   ====================================================== */
html.dark-mode body .courses-wrapper,
html.dark body .courses-wrapper,
html.dark-mode body .exam-content,
html.dark body .exam-content {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37) !important;
}

html.dark-mode body .sidebar-main-title,
html.dark body .sidebar-main-title,
html.dark-mode body .course-card-title,
html.dark body .course-card-title,
html.dark-mode body .selected-course-title,
html.dark body .selected-course-title,
html.dark-mode body .section-card-title,
html.dark body .section-card-title,
html.dark-mode body .exam-name-text,
html.dark body .exam-name-text,
html.dark-mode body .empty-title,
html.dark body .empty-title,
html.dark-mode body .custom-table thead th,
html.dark body .custom-table thead th {
  color: #f8fafc !important;
}

html.dark-mode body .empty-subtitle,
html.dark body .empty-subtitle,
html.dark-mode body .progress-label,
html.dark body .progress-label {
  color: #94a3b8 !important;
}

html.dark-mode body .course-card-item,
html.dark body .course-card-item,
html.dark-mode body .selected-course-header,
html.dark body .selected-course-header,
html.dark-mode body .exams-list-card,
html.dark body .exams-list-card,
html.dark-mode body .empty-icon-circle,
html.dark body .empty-icon-circle {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .course-card-item.active,
html.dark body .course-card-item.active {
  background: rgba(16, 185, 129, 0.15) !important;
  border-color: var(--primary-color) !important;
}

html.dark-mode body .custom-table thead th,
html.dark body .custom-table thead th {
  background: #101725 !important;
}

html.dark-mode body .custom-table tbody td,
html.dark body .custom-table tbody td {
  border-bottom-color: rgba(255, 255, 255, 0.06) !important;
  color: #e2e8f0 !important;
}

html.dark-mode body .custom-progress,
html.dark body .custom-progress,
html.dark-mode body .course-img-wrapper,
html.dark body .course-img-wrapper,
html.dark-mode body .selected-img-wrapper,
html.dark body .selected-img-wrapper {
  background: #0a0f18 !important;
}

html.dark-mode body .alert-no-exams,
html.dark body .alert-no-exams {
  background: rgba(245, 158, 11, 0.12) !important;
  border-color: rgba(245, 158, 11, 0.3) !important;
}

html.dark-mode body .alert-title,
html.dark body .alert-title {
  color: #fbbf24 !important;
}

html.dark-mode body .alert-desc,
html.dark body .alert-desc {
  color: #fcd34d !important;
}

/* ======================================================
   6. MIS CERTIFICACIONES (certificado.vue)
   ====================================================== */
html.dark-mode body .certificate-container,
html.dark body .certificate-container {
  background: transparent !important;
}

html.dark-mode body .certificate-content,
html.dark body .certificate-content {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37) !important;
}

html.dark-mode body .info-item,
html.dark body .info-item,
html.dark-mode body .progress-wrapper,
html.dark body .progress-wrapper {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  color: #e2e8f0 !important;
}

html.dark-mode body .alert-no-certificate,
html.dark body .alert-no-certificate {
  background: rgba(245, 158, 11, 0.12) !important;
  border-color: rgba(245, 158, 11, 0.3) !important;
}

/* ======================================================
   7. CLASIFICACIÓN & RANKING (LeaderBoard.vue & Champions.vue & RankingCourse.vue)
   ====================================================== */
html.dark-mode body .leaderboard-card,
html.dark body .leaderboard-card,
html.dark-mode body .ranking-list-card,
html.dark body .ranking-list-card,
html.dark-mode body .current-user-card,
html.dark body .current-user-card {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37) !important;
}

html.dark-mode body .podium-main-title,
html.dark body .podium-main-title,
html.dark-mode body .player-name,
html.dark body .player-name,
html.dark-mode body .score-badge,
html.dark body .score-badge,
html.dark-mode body .user-card-title,
html.dark body .user-card-title,
html.dark-mode body .stat-value,
html.dark body .stat-value,
html.dark-mode body .ranking-header-title,
html.dark body .ranking-header-title,
html.dark-mode body .username,
html.dark body .username {
  color: #f8fafc !important;
}

html.dark-mode body .select-label,
html.dark body .select-label,
html.dark-mode body .select-arrow-icon,
html.dark body .select-arrow-icon,
html.dark-mode body .stat-label,
html.dark body .stat-label,
html.dark-mode body .user-stats,
html.dark body .user-stats {
  color: #94a3b8 !important;
}

html.dark-mode body .custom-course-select,
html.dark body .custom-course-select,
html.dark-mode body .player-card,
html.dark body .player-card {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  color: #e2e8f0 !important;
}

html.dark-mode body .gold-card,
html.dark body .gold-card {
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.15) 0%, rgba(22, 30, 46, 0.9) 100%) !important;
}

html.dark-mode body .silver-card,
html.dark body .silver-card {
  background: linear-gradient(180deg, rgba(148, 163, 184, 0.15) 0%, rgba(22, 30, 46, 0.9) 100%) !important;
  border-color: rgba(148, 163, 184, 0.3) !important;
}

html.dark-mode body .bronze-card,
html.dark body .bronze-card {
  background: linear-gradient(180deg, rgba(217, 119, 6, 0.15) 0%, rgba(22, 30, 46, 0.9) 100%) !important;
  border-color: rgba(217, 119, 6, 0.3) !important;
}

html.dark-mode body .border-bottom-subtle,
html.dark body .border-bottom-subtle {
  border-bottom-color: rgba(255, 255, 255, 0.06) !important;
}

/* ======================================================
   8. MENSAJES / CHAT (message/index.vue & style.css & MessengerColletion.vue)
   ====================================================== */
html.dark-mode body .chat-main-card,
html.dark body .chat-main-card,
html.dark-mode body .card-message,
html.dark body .card-message {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37) !important;
}

html.dark-mode body .sidebar-contacts,
html.dark body .sidebar-contacts,
html.dark-mode body .chat-header,
html.dark body .chat-header,
html.dark-mode body .message-input-wrapper,
html.dark body .message-input-wrapper {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .main-chat,
html.dark body .main-chat,
html.dark-mode body .chat-content,
html.dark body .chat-content,
html.dark-mode body .chat-input,
html.dark body .chat-input {
  background: #0a0f18 !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  color: #e2e8f0 !important;
}

html.dark-mode body .message-incoming .message-bubble,
html.dark body .message-incoming .message-bubble,
html.dark-mode body .message-item,
html.dark body .message-item {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .user-name,
html.dark body .user-name,
html.dark-mode body .section-title,
html.dark body .section-title,
html.dark-mode body .contact-name,
html.dark body .contact-name,
html.dark-mode body .chat-header-name,
html.dark body .chat-header-name,
html.dark-mode body .message-incoming .message-text,
html.dark body .message-incoming .message-text,
html.dark-mode body .empty-chat-title,
html.dark body .empty-chat-title,
html.dark-mode body .header-title,
html.dark body .header-title,
html.dark-mode body .message-user,
html.dark body .message-user {
  color: #f8fafc !important;
}

html.dark-mode body .last-message,
html.dark body .last-message,
html.dark-mode body .chat-header-status,
html.dark body .chat-header-status,
html.dark-mode body .empty-text,
html.dark body .empty-text,
html.dark-mode body .empty-chat-sub,
html.dark body .empty-chat-sub,
html.dark-mode body .message-body,
html.dark body .message-body {
  color: #94a3b8 !important;
}

html.dark-mode body .chat-item:hover,
html.dark body .chat-item:hover,
html.dark-mode body .contact-item:hover,
html.dark body .contact-item:hover {
  background: rgba(255, 255, 255, 0.04) !important;
}

html.dark-mode body .chat-item.active,
html.dark body .chat-item.active {
  background: rgba(16, 185, 129, 0.15) !important;
}

/* ======================================================
   9. DASHBOARD WIDGETS (KeepLearning, SalesHistory, Successes)
   ====================================================== */
html.dark-mode body .welcome-banner-card,
html.dark body .welcome-banner-card,
html.dark-mode body .card-sales,
html.dark body .card-sales,
html.dark-mode body .logros-card,
html.dark body .logros-card {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37) !important;
}

html.dark-mode body .welcome-banner-title,
html.dark body .welcome-banner-title,
html.dark-mode body .header-title,
html.dark body .header-title,
html.dark-mode body .cliente_user,
html.dark body .cliente_user,
html.dark-mode body .cursos,
html.dark body .cursos,
html.dark-mode body .logros-card-title,
html.dark body .logros-card-title,
html.dark-mode body .stepper-title,
html.dark body .stepper-title {
  color: #f8fafc !important;
}

html.dark-mode body .welcome-banner-subtitle,
html.dark body .welcome-banner-subtitle,
html.dark-mode body .logros-card-subtitle,
html.dark body .logros-card-subtitle,
html.dark-mode body .stepper-subtitle,
html.dark body .stepper-subtitle {
  color: #94a3b8 !important;
}

html.dark-mode body .sale-item,
html.dark body .sale-item,
html.dark-mode body .stepper-icon-wrapper,
html.dark body .stepper-icon-wrapper {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .learning,
html.dark body .learning {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .learning p,
html.dark body .learning p {
  color: #e2e8f0 !important;
}

html.dark-mode body .kpi-value,
html.dark body .kpi-value {
  color: #f8fafc !important;
}

html.dark-mode body .kpi-label,
html.dark body .kpi-label {
  color: #94a3b8 !important;
}

html.dark-mode body .border-left-divider,
html.dark body .border-left-divider {
  border-left-color: rgba(255, 255, 255, 0.08) !important;
}

/* ======================================================
   10. LOGROS (Logros.vue)
   ====================================================== */
html.dark-mode body .achievement-card.obtained .card,
html.dark body .achievement-card.obtained .card {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .achievement-card.obtained .card-title,
html.dark body .achievement-card.obtained .card-title {
  color: #f8fafc !important;
}

html.dark-mode body .skeleton-achievement-card,
html.dark body .skeleton-achievement-card {
  background: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

/* ======================================================
   11. CURSO / REPRODUCTOR & DINÁMICAS (Course.vue, ViewBook.vue, daily)
   ====================================================== */
html.dark-mode body .background,
html.dark body .background,
html.dark-mode body .sidebar,
html.dark body .sidebar {
  background-color: #0a0f18 !important;
}

html.dark-mode body .card.bg-white,
html.dark body .card.bg-white,
html.dark-mode body .docente-card,
html.dark body .docente-card,
html.dark-mode body .input-comment,
html.dark body .input-comment,
html.dark-mode body .comment-item.bg-white,
html.dark body .comment-item.bg-white,
html.dark-mode body .wrapper-stepper,
html.dark body .wrapper-stepper,
html.dark-mode body .book-main-card,
html.dark body .book-main-card,
html.dark-mode body .book-info-card,
html.dark body .book-info-card,
html.dark-mode body .summary-card,
html.dark body .summary-card,
html.dark-mode body .file-row,
html.dark body .file-row {
  background: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  color: #e2e8f0 !important;
}

html.dark-mode body .docente-name,
html.dark body .docente-name,
html.dark-mode body .summary-card h3,
html.dark body .summary-card h3,
html.dark-mode body .card-header h2,
html.dark body .card-header h2,
html.dark-mode body .book-info-card h2,
html.dark body .book-info-card h2,
html.dark-mode body .file-name-cell strong,
html.dark body .file-name-cell strong,
html.dark-mode body .book-title-section h1,
html.dark body .book-title-section h1 {
  color: #f8fafc !important;
}

html.dark-mode body .book-title-section p,
html.dark body .book-title-section p,
html.dark-mode body .summary-card p,
html.dark body .summary-card p,
html.dark-mode body .summary-card li,
html.dark body .summary-card li {
  color: #94a3b8 !important;
}

html.dark-mode body .book-tabs,
html.dark body .book-tabs {
  border-bottom-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .book-tabs button,
html.dark body .book-tabs button {
  color: #94a3b8 !important;
}

html.dark-mode body .download-file-btn,
html.dark body .download-file-btn {
  background: #161e2e !important;
  color: var(--primary-color) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

html.dark-mode body label[for],
html.dark body label[for] {
  color: #e2e8f0;
}

/* ======================================================
   12. KPI CARDS, BUSCADORES, PERFIL & PRODUCTO AMPLIADO
   ====================================================== */
html.dark-mode body .kpi-card,
html.dark body .kpi-card {
  background-color: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .mi-aprendizaje-search-input,
html.dark body .mi-aprendizaje-search-input {
  background-color: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #f8fafc !important;
}

html.dark-mode body .profile-card-panel,
html.dark body .profile-card-panel {
  background-color: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .profile-tabs-header,
html.dark body .profile-tabs-header {
  background-color: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .profile-input-field,
html.dark body .profile-input-field {
  background-color: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #f8fafc !important;
}

html.dark-mode body .read-more-btn,
html.dark body .read-more-btn {
  background-color: #161e2e !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
  color: #f8fafc !important;
}

html.dark-mode body .read-more-btn span,
html.dark body .read-more-btn span {
  color: #f8fafc !important;
}

html.dark-mode body .ecommerce-course-card:hover .read-more-btn,
html.dark body .ecommerce-course-card:hover .read-more-btn {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
  color: #ffffff !important;
}

html.dark-mode body .specs-grid-card,
html.dark body .specs-grid-card,
html.dark-mode body .product-content-card,
html.dark body .product-content-card,
html.dark-mode body .temary-card,
html.dark body .temary-card,
html.dark-mode body .reviews-card,
html.dark body .reviews-card {
  background-color: rgba(22, 30, 46, 0.65) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark-mode body .kpi-card div,
html.dark body .kpi-card div {
  color: #f8fafc !important;
}

html.dark-mode body .kpi-card span,
html.dark body .kpi-card span {
  color: #94a3b8 !important;
}

html.dark-mode body .profile-tabs-header button,
html.dark body .profile-tabs-header button {
  color: #f8fafc !important;
}

html.dark-mode body .cart-btn-icon,
html.dark body .cart-btn-icon {
  background-color: rgba(16, 185, 129, 0.15) !important;
  border-color: rgba(16, 185, 129, 0.4) !important;
  color: var(--primary-color) !important;
}

html.dark-mode body .cart-btn-icon svg,
html.dark body .cart-btn-icon svg {
  stroke: var(--primary-color) !important;
  color: var(--primary-color) !important;
}
</style>

