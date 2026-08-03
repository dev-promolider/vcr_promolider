<template>
  <div>
    <!-- Botón hamburguesa flotante para móviles -->
    <button 
      @click="isSidebarOpen = true" 
      class="lg:tw-hidden tw-fixed tw-top-4 tw-left-4 tw-z-40 tw-w-10 tw-h-10 tw-bg-[#0f172a] tw-text-white tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-lg"
    >
      <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>

    <!-- Capa oscura de fondo para móviles cuando el sidebar está abierto -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false" 
      class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-40 lg:tw-hidden"
    ></div>

    <!-- Sidebar Aside colapsable por defecto con Hover-Expand en Desktop -->
    <aside 
      :class="[
        'sidebar',
        (isHovered || isSidebarOpen) ? 'expanded' : 'collapsed',
        isSidebarOpen ? 'mobile-open' : ''
      ]"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Header Logo / Brand -->
      <div class="sidebar-header tw-justify-center lg:tw-justify-start">
        <div class="tw-flex tw-items-center tw-overflow-hidden">
          <div class="sidebar-logo-container tw-w-9 tw-h-9 tw-rounded-lg tw-bg-white/10 tw-border tw-border-white/20 tw-flex tw-items-center tw-justify-center tw-shrink-0 tw-mr-3">
            <img src="@/assets/logo-inicial.png" alt="Promolíder" class="sidebar-logo-img tw-h-6 tw-w-auto" />
          </div>
          <div v-show="isHovered || isSidebarOpen" class="tw-flex tw-flex-col tw-overflow-hidden tw-transition-opacity tw-duration-200">
            <span class="tw-text-white tw-font-outfit tw-font-bold tw-text-lg tw-leading-tight">Promolíder</span>
            <span class="sidebar-subtitle tw-text-xs tw-font-semibold">Aula Virtual</span>
          </div>
        </div>
      </div>

      <!-- Navigation Links Principales -->
      <div class="sidebar-scroll">
        <nav class="sidebar-nav">
          <template v-if="showNav">
            <!-- NAVEGACIÓN SUPERIOR -->
            <template v-for="(link, index) in listNavBar">
              <div v-if="!(role === 'Distributor' && link.nombre === 'Mis cursos')" :key="'top-' + index">
                <router-link 
                  :to="{ name: link.path }"
                  @click.native="isSidebarOpen = false"
                  class="nav-item"
                  active-class="active"
                  :title="(!isHovered && !isSidebarOpen) ? link.nombre : ''"
                >
                  <span class="nav-item-icon">
                    <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon"></path>
                    </svg>
                  </span>
                  <span v-show="isHovered || isSidebarOpen" class="nav-item-text">{{ link.nombre }}</span>
                </router-link>
              </div>
            </template>

            <!-- LÍNEA SEPARADORA HORIZONTAL -->
            <div class="sidebar-divider"></div>

            <!-- NAVEGACIÓN INFERIOR (VISIBLES EN COLAPSE Y EXPANDED) -->
            
            <!-- Carrito de Compras -->
            <button @click="openCartModal" class="nav-item tw-w-full" :title="(!isHovered && !isSidebarOpen) ? 'Carrito' : ''">
              <span class="nav-item-icon tw-relative">
                <svg class="tw-w-5 tw-h-5 tw-text-[#18d600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"></path>
                </svg>
                <span v-if="!isHovered && !isSidebarOpen && itemCount > 0" class="tw-absolute tw--top-1.5 tw--right-1.5 tw-bg-[#18d600] tw-text-slate-950 tw-text-[10px] tw-font-bold tw-w-4 tw-h-4 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                  {{ itemCount }}
                </span>
              </span>
              <span v-show="isHovered || isSidebarOpen" class="nav-item-text tw-flex tw-items-center tw-justify-between tw-w-full">
                <span>Carrito</span>
                <span v-if="itemCount > 0" class="tw-bg-[#18d600] tw-text-slate-950 tw-text-xs tw-font-bold tw-px-2 tw-py-0.5 tw-rounded-full">
                  {{ itemCount }}
                </span>
              </span>
            </button>

            <!-- Pregunta Diaria -->
            <button v-if="examDaily" @click="isQuestionModalOpen = true" class="nav-item tw-w-full" :title="(!isHovered && !isSidebarOpen) ? 'Pregunta Diaria' : ''">
              <span class="nav-item-icon">
                <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </span>
              <span v-show="isHovered || isSidebarOpen" class="nav-item-text">Pregunta Diaria</span>
            </button>

            <!-- Notificaciones -->
            <button @click="openNotificationsModal" class="nav-item tw-w-full" :title="(!isHovered && !isSidebarOpen) ? 'Notificaciones' : ''">
              <span class="nav-item-icon tw-relative">
                <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                <span v-if="!isHovered && !isSidebarOpen && unreadCount > 0" class="tw-absolute tw--top-1 tw--right-1 tw-bg-rose-500 tw-w-2.5 tw-h-2.5 tw-rounded-full tw-border tw-border-gray-900"></span>
              </span>
              <span v-show="isHovered || isSidebarOpen" class="nav-item-text tw-flex tw-items-center tw-justify-between tw-w-full">
                <span>Notificaciones</span>
                <span v-if="unreadCount > 0" class="tw-bg-rose-500 tw-text-white tw-text-xs tw-font-bold tw-px-2 tw-py-0.5 tw-rounded-full">
                  {{ unreadCount }}
                </span>
              </span>
            </button>

            <!-- Mi Perfil -->
            <router-link :to="{ name: 'perfil' }" @click.native="isSidebarOpen = false" class="nav-item" active-class="active" :title="(!isHovered && !isSidebarOpen) ? 'Mi Perfil' : ''">
              <span class="nav-item-icon">
                <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </span>
              <span v-show="isHovered || isSidebarOpen" class="nav-item-text">Mi Perfil</span>
            </router-link>

            <!-- Preferencias -->
            <router-link :to="{ name: 'option-preferences' }" @click.native="isSidebarOpen = false" class="nav-item" active-class="active" :title="(!isHovered && !isSidebarOpen) ? 'Preferencias' : ''">
              <span class="nav-item-icon">
                <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </span>
              <span v-show="isHovered || isSidebarOpen" class="nav-item-text">Preferencias</span>
            </router-link>

            <!-- Modo Claro -->
            <button @click="toggleDarkMode" class="nav-item tw-w-full" :title="(!isHovered && !isSidebarOpen) ? 'Modo Claro' : ''">
              <span class="nav-item-icon">
                <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </span>
              <span v-show="isHovered || isSidebarOpen" class="nav-item-text">Modo Claro</span>
            </button>

            <!-- Cerrar Sesión -->
            <button @click="closeSession" class="nav-item tw-w-full tw-text-rose-400 hover:tw-bg-rose-500/10 hover:tw-text-rose-400" :title="(!isHovered && !isSidebarOpen) ? 'Cerrar Sesión' : ''">
              <span class="nav-item-icon">
                <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </span>
              <span v-show="isHovered || isSidebarOpen" class="nav-item-text tw-font-bold">Cerrar Sesión</span>
            </button>
            
            <!-- LÍNEA SEPARADORA HORIZONTAL -->
            <div class="sidebar-divider"></div>

            <!-- Ayuda & FAQ -->
            <router-link :to="{ name: 'preguntas-frecuentes' }" @click.native="isSidebarOpen = false" class="nav-item" :title="(!isHovered && !isSidebarOpen) ? 'Ayuda & FAQ' : ''">
              <span class="nav-item-icon">
                <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </span>
              <span v-show="isHovered || isSidebarOpen" class="nav-item-text">Ayuda & FAQ</span>
            </router-link>
          </template>
          <template v-else>
            <div v-for="qty in listNavBar.length" :key="qty" class="tw-h-6 tw-w-4/5 tw-rounded tw-mx-auto tw-my-4 tw-bg-gray-800 tw-animate-pulse"></div>
          </template>
        </nav>
      </div>
    </aside>

    <!-- Modal Pregunta Diaria -->
    <div v-if="isQuestionModalOpen" class="tw-fixed tw-inset-0 tw-z-60 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50 tw-backdrop-blur-sm" @click.self="isQuestionModalOpen = false">
      <div class="tw-bg-white tw-rounded-3xl tw-w-full tw-max-w-lg tw-mx-4 tw-shadow-2xl">
        <div class="tw-flex tw-justify-between tw-items-center tw-px-6 tw-py-4 tw-border-b tw-border-gray-100">
          <h5 class="tw-text-[#18d600] tw-font-bold tw-text-xl tw-font-outfit">Pregunta diaria</h5>
          <button @click="isQuestionModalOpen = false" class="tw-text-gray-400 hover:tw-text-gray-600">
            <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="tw-p-6">
          <QuestionDaily />
        </div>
      </div>
    </div>

    <!-- Panel Flotante de Notificaciones que sale del Sidebar -->
    <div v-if="isNotifModalOpen">
      <!-- Overlay transparente invisible para cerrar al hacer clic afuera sin bloquear la pantalla -->
      <div class="tw-fixed tw-inset-0 tw-z-[9990]" @click="isNotifModalOpen = false"></div>

      <!-- Contenedor del Panel Flotante Lateral -->
      <div :class="['notif-sidebar-flyout', (isHovered || isSidebarOpen) ? 'pos-expanded' : 'pos-collapsed']">
        
        <!-- Header -->
        <div class="cart-modal-header">
          <div class="header-title-group">
            <div class="header-icon-badge">
              <svg class="cart-svg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </div>
            <h2 class="cart-main-title">Notificaciones</h2>
          </div>

          <div class="header-right-group">
            <span class="cart-items-counter" v-if="notificationsList.length > 0">
              {{ notificationsList.length }} {{ notificationsList.length === 1 ? 'notificación' : 'notificaciones' }}
            </span>
            <button @click="isNotifModalOpen = false" class="cart-close-btn" title="Cerrar">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="cart-modal-body">
          <!-- Loading State -->
          <div v-if="isLoadingNotifications" class="tw-space-y-3 tw-p-2">
            <div v-for="i in 3" :key="i" class="tw-animate-pulse tw-flex tw-items-center tw-gap-4 tw-p-4 tw-rounded-[18px] tw-bg-[#1E293B]">
              <div class="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#334155]"></div>
              <div class="tw-flex-1 tw-space-y-2">
                <div class="tw-h-3 tw-bg-[#334155] tw-rounded tw-w-3/4"></div>
                <div class="tw-h-3 tw-bg-[#334155] tw-rounded tw-w-1/2"></div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="notificationsList.length === 0" class="empty-cart-box">
            <div class="empty-cart-icon-wrapper">
              <svg width="36" height="36" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </div>
            <h3 class="empty-cart-title">Sin notificaciones por ahora</h3>
            <p class="empty-cart-subtitle">
              Te avisaremos cuando haya novedades, certificados o publicaciones importantes.
            </p>
          </div>

          <!-- Notifications List -->
          <div v-else class="cart-items-list">
            <div
              v-for="(item, index) in notificationsList"
              :key="index"
              class="cart-item-card tw-cursor-default"
            >
              <div class="item-cover-wrapper tw-w-10 tw-h-10 tw-rounded-xl tw-bg-[#0F172A] tw-flex tw-items-center tw-justify-center tw-shrink-0">
                <img v-if="item.avatar && !item.avatar.includes('default')" :src="item.avatar" class="tw-w-full tw-h-full tw-object-cover" @error="onAvatarError" />
                <div v-else class="tw-w-full tw-h-full tw-rounded-xl tw-bg-[#18d600]/15 tw-border tw-border-[#18d600]/30 tw-flex tw-items-center tw-justify-center tw-text-[#18d600]">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>

              <div class="item-content-wrapper">
                <div class="item-top-row tw-mb-1">
                  <h4 class="item-title tw-text-sm tw-m-0">{{ item.title }}</h4>
                  <span class="tw-text-[11px] tw-text-[#9CA3AF] tw-font-semibold tw-shrink-0">{{ formatDate(item.created_at) }}</span>
                </div>
                <p class="item-unit-price tw-text-xs tw-text-[#9CA3AF] tw-line-clamp-2">{{ item.subtitle }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="cart-modal-footer">
          <button @click="isNotifModalOpen = false" class="btn-primary-green btn-full-width">
            <span>Entendido</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import QuestionDaily from "@/components/Student/questions/daily/index";
import { authGet, clearAuth } from "@/helpers/authStorage";

export default {
  name: "NavBarV",
  components: {
    QuestionDaily,
  },
  data() {
    return {
      isDarkMode: false,
      isSidebarOpen: false,
      isHovered: false,
      isQuestionModalOpen: false,
      isNotifModalOpen: false,
      isLoadingNotifications: false,
      notificationsList: [],
      unreadCount: 0,
      showNav: false,
      role: null,
      listNavBar: [
        { nombre: "Inicio", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", path: "home" },
        { nombre: "Mi aprendizaje", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", path: "suscription-user" },
        { nombre: "Mis infoproductos", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", path: "myCourses" },
        { nombre: "Marketplace", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", path: "courses" },
        { nombre: "Mis exámenes", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z", path: "examenes" },
        {
          nombre: "Mis certificaciones",
          icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
          path: "certificado-user",
        },
        { nombre: "Mensajes", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", path: "messages" },
        { nombre: "Logros", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", path: "logros" },
        { nombre: "Clasificación", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", path: "leaderBoard" },
      ],
    };
  },
  computed: {
    ...mapState("sections", ["topSection"]),
    ...mapState("course", ["points", "examDaily"]),
    ...mapGetters("cart", ["itemCount"]),
  },
  methods: {
    ...mapActions("course", ["getPoints"]),
    ...mapActions("cart", ["toggleCart"]),
    openCartModal() {
      this.isSidebarOpen = false;
      this.toggleCart(true);
    },
    openNotificationsModal() {
      this.isSidebarOpen = false;
      this.isNotifModalOpen = true;
      this.fetchNotifications();
    },
    async fetchNotifications() {
      this.isLoadingNotifications = true;
      try {
        const resp = await this.axios.get("/notifications/list");
        if (resp && resp.data) {
          let rawList = [];
          if (Array.isArray(resp.data)) {
            rawList = resp.data;
          } else if (Array.isArray(resp.data.data)) {
            rawList = resp.data.data;
          }
          this.notificationsList = rawList.map((e) => ({
            id: e.id || Math.random(),
            title: e.title || e.titulo || "Notificación",
            subtitle: e.body || e.mensaje || e.content || "",
            avatar: e.photo || e.avatar || require("@/assets/logo-inicial.png"),
            created_at: e.created_at || e.fecha || new Date().toISOString()
          }));
          this.unreadCount = this.notificationsList.length;
        } else {
          this.notificationsList = [];
          this.unreadCount = 0;
        }
      } catch (e) {
        console.warn("Could not fetch notifications:", e);
        this.notificationsList = [];
        this.unreadCount = 0;
      } finally {
        this.isLoadingNotifications = false;
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return "";
      try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
      } catch (e) {
        return dateStr;
      }
    },
    onAvatarError(e) {
      if (e && e.target) {
        e.target.src = require("@/assets/logo-inicial.png");
      }
    },
    toggleCollapse() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.applyDarkMode(this.isDarkMode);
    },
    applyDarkMode(isDark) {
      localStorage.setItem("app_theme", isDark ? "dark" : "light");
      if (isDark) {
        document.documentElement.classList.add("dark-mode", "dark");
        document.body.classList.add("dark-mode", "dark");
      } else {
        document.documentElement.classList.remove("dark-mode", "dark");
        document.body.classList.remove("dark-mode", "dark");
      }
    },
    initDarkMode() {
      const savedTheme = localStorage.getItem("app_theme");
      this.isDarkMode = savedTheme === "dark";
      this.applyDarkMode(this.isDarkMode);
    },
    async fetchUserPoints() {
      try {
        const userId = authGet("id_user");
        if (userId) {
          await this.getPoints(userId);
        }
      } catch (e) {
        console.warn("Error fetching points:", e);
      }
    },
    closeSession() {
      clearAuth();
      this.$router.push({ name: "Login" });
    },
    async getRole() {
      try {
        const response = await this.axios.get("/user/get-rolename");
        this.role = response.data.data;
      } catch (error) {
        this.role = "";
      } finally {
        this.showNav = true;
      }
    },
  },
  mounted() {
    this.initDarkMode();
    this.getRole();
    this.fetchUserPoints();
    this.fetchNotifications();
    
    this.$root.$on('toggle-sidebar', () => {
      this.isSidebarOpen = !this.isSidebarOpen;
    });
  },
  beforeDestroy() {
    this.$root.$off('toggle-sidebar');
  },
};
</script>

<style scoped>
/* ============================
   SIDEBAR HOVER-EXPAND SYSTEM
============================ */
.sidebar {
  width: 80px;
  background-color: var(--sidebar-bg, #0b1120);
  color: var(--white, #ffffff);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 50;
  flex-shrink: 0;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
}

.sidebar.expanded,
.sidebar:hover {
  width: 260px;
}

/* Mobile: oculto por defecto, visible con overlay */
@media (max-width: 1023px) {
  .sidebar {
    position: fixed;
    inset: 0;
    top: 0;
    left: 0;
    bottom: 0;
    width: 260px !important;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 50;
  }
  .sidebar.mobile-open {
    transform: translateX(0);
  }
}

/* ============================
   HEADER / LOGO
============================ */
.sidebar-header {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: var(--sidebar-logo-bg, #0f172a);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.sidebar.collapsed:not(:hover) .sidebar-header {
  justify-content: center;
  padding: 0;
}

.sidebar.collapsed:not(:hover) .sidebar-logo-container {
  margin-right: 0;
}

.sidebar-logo-container {
  flex-shrink: 0;
}

.sidebar-subtitle {
  color: var(--sidebar-link, #d1d5db);
}

/* ============================
   SCROLLABLE NAV AREA
============================ */
.sidebar-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0 12px;
}

/* ============================
   NAV ITEMS
============================ */
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  color: var(--sidebar-link, #d1d5db);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  white-space: nowrap;
}

.nav-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.nav-item:hover {
  background-color: var(--sidebar-hover-bg, rgba(24, 214, 0, 0.1));
  color: #ffffff;
}

/* Active State — Fondo verde neón sólido */
.nav-item.active {
  background-color: #18d600 !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 14px rgba(24, 214, 0, 0.4) !important;
}

.nav-item.active .nav-item-icon {
  color: #ffffff !important;
}

/* En modo colapsado (80px sin hover): centrar el icono dentro del contenedor */
.sidebar.collapsed:not(:hover) .nav-item {
  justify-content: center;
  padding: 10px 0;
}

/* Divisores horizontales */
.sidebar-divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.08);
  margin: 6px 4px;
}

/* =========================================================
   SIDEBAR FLYOUT PANEL FOR NOTIFICATIONS
========================================================= */
.notif-sidebar-flyout {
  position: fixed !important;
  top: 90px !important;
  bottom: 30px !important;
  width: 440px !important;
  max-width: calc(100vw - 100px) !important;
  background-color: #0F172A !important; /* Mismo Slate 900 sólido del carrito */
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 24px !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.75) !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
  z-index: 9995 !important;
  transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
  animation: flyoutSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  color: #FFFFFF !important;
}

.notif-sidebar-flyout.pos-collapsed {
  left: 92px !important;
}

.notif-sidebar-flyout.pos-expanded {
  left: 272px !important;
}

@keyframes flyoutSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 1023px) {
  .notif-sidebar-flyout {
    left: 16px !important;
    right: 16px !important;
    width: auto !important;
    top: 70px !important;
    bottom: 20px !important;
  }
}

/* =========================================================
   CART & NOTIFICATIONS MODAL DESIGN SYSTEM (SOLID SLATE DARK MODE)
========================================================= */

.cart-modal-backdrop {
  position: fixed !important;
  inset: 0 !important;
  z-index: 9999 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 16px !important;
  background-color: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(8px) !important;
}

.cart-modal-container {
  position: relative !important;
  width: 100% !important;
  max-width: 580px !important;
  max-height: 88vh !important;
  background-color: #0F172A !important; /* Solid Slate 900 Background */
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 24px !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7) !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
  animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  color: #FFFFFF !important;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* HEADER */
.cart-modal-header {
  padding: 24px !important;
  background-color: #0B1120 !important;
  border-bottom: 1px solid #1E293B !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

.header-title-group {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
}

.header-icon-badge {
  width: 42px !important;
  height: 42px !important;
  border-radius: 14px !important;
  background-color: rgba(24, 214, 0, 0.15) !important;
  border: 1px solid rgba(24, 214, 0, 0.3) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.cart-svg-icon {
  width: 24px !important;
  height: 24px !important;
  color: #18d600 !important;
}

.cart-main-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.35rem !important;
  font-weight: 700 !important;
  color: #FFFFFF !important;
  margin: 0 !important;
}

.header-right-group {
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
}

.cart-items-counter {
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  color: #9CA3AF !important;
}

.cart-close-btn {
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  background-color: #1E293B !important;
  color: #9CA3AF !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.cart-close-btn:hover {
  background-color: #334155 !important;
  color: #FFFFFF !important;
}

/* BODY */
.cart-modal-body {
  padding: 24px !important;
  overflow-y: auto !important;
  flex: 1 !important;
  background-color: #0F172A !important;
}

/* EMPTY STATE */
.empty-cart-box {
  padding: 40px 20px !important;
  text-align: center !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

.empty-cart-icon-wrapper {
  width: 70px !important;
  height: 70px !important;
  border-radius: 50% !important;
  background-color: #1E293B !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #64748B !important;
  margin-bottom: 16px !important;
}

.empty-cart-title {
  font-size: 1.2rem !important;
  font-weight: 700 !important;
  color: #FFFFFF !important;
  margin-bottom: 8px !important;
}

.empty-cart-subtitle {
  font-size: 0.9rem !important;
  color: #9CA3AF !important;
  max-width: 320px !important;
  margin-bottom: 24px !important;
}

/* ITEMS LIST */
.cart-items-list {
  display: flex !important;
  flex-direction: column !important;
  gap: 14px !important;
}

.cart-item-card {
  background-color: #1E293B !important; /* Solid Slate 800 */
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 18px !important;
  padding: 16px !important;
  display: flex !important;
  gap: 16px !important;
  align-items: center !important;
  transition: border-color 0.2s ease !important;
}

.cart-item-card:hover {
  border-color: rgba(24, 214, 0, 0.3) !important;
}

.item-cover-wrapper {
  width: 48px !important;
  height: 48px !important;
  border-radius: 14px !important;
  overflow: hidden !important;
  background-color: #0F172A !important;
  flex-shrink: 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.item-content-wrapper {
  flex: 1 !important;
  min-width: 0 !important;
}

.item-top-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 12px !important;
}

.item-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.05rem !important;
  font-weight: 700 !important;
  color: #FFFFFF !important;
  margin: 0 !important;
  line-height: 1.3 !important;
}

.item-unit-price {
  font-size: 0.85rem !important;
  color: #9CA3AF !important;
  margin: 4px 0 0 0 !important;
}

/* FOOTER */
.cart-modal-footer {
  padding: 24px !important;
  background-color: #0B1120 !important;
  border-top: 1px solid #1E293B !important;
}

.btn-primary-green {
  background-color: #18d600 !important;
  color: #0F172A !important;
  font-family: 'Outfit', sans-serif !important;
  font-weight: 800 !important;
  font-size: 1.05rem !important;
  padding: 16px 24px !important;
  border-radius: 16px !important;
  border: none !important;
  cursor: pointer !important;
  box-shadow: 0 4px 20px rgba(24, 214, 0, 0.35) !important;
  transition: all 0.2s ease !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.btn-primary-green:hover {
  background-color: #119e00 !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 25px rgba(24, 214, 0, 0.5) !important;
}

.btn-full-width {
  width: 100% !important;
}

/* Custom Scrollbar */
.cart-modal-body::-webkit-scrollbar {
  width: 6px;
}
.cart-modal-body::-webkit-scrollbar-track {
  background: #0F172A;
}
.cart-modal-body::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}

/* ============================
   SCROLLBAR CUSTOMIZATION
============================ */
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-track {
  background-color: var(--sidebar-bg, #0b1120);
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: var(--sidebar-hover-bg, rgba(24, 214, 0, 0.1));
}
</style>
