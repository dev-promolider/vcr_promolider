<template>
  <div>
    <!-- Mobile hamburger button -->
    <button
      @click="isMobileOpen = true"
      class="lg:tw-hidden tw-fixed tw-top-4 tw-left-4 tw-z-50 tw-w-10 tw-h-10 tw-bg-[#0f172a] tw-text-white tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-border tw-border-white/10"
    >
      <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Mobile overlay -->
    <div
      v-if="isMobileOpen"
      @click="isMobileOpen = false"
      class="tw-fixed tw-inset-0 tw-bg-black/60 tw-backdrop-blur-sm tw-z-40 lg:tw-hidden"
    ></div>

    <!-- Sidebar con hover-expand -->
    <aside
      :class="[
        'sidebar',
        (isHovered || isMobileOpen) ? 'expanded' : 'collapsed',
        isMobileOpen ? 'mobile-open' : ''
      ]"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Header Logo -->
      <div class="sidebar-header">
        <div class="tw-flex tw-items-center tw-overflow-hidden">
          <div class="sidebar-logo-container tw-mr-3">
            <img src="@/assets/logo-inicial.png" alt="Promolíder" class="tw-h-6 tw-w-auto" />
          </div>
          <div v-show="isHovered || isMobileOpen" class="tw-flex tw-flex-col tw-overflow-hidden tw-transition-opacity tw-duration-200">
            <span class="tw-text-white tw-font-outfit tw-font-bold tw-text-base tw-leading-tight">Promolíder</span>
            <span class="sidebar-subtitle tw-text-xs tw-font-semibold">Aula Virtual</span>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="sidebar-scroll">
        <nav class="sidebar-nav" v-if="showNav">
          <!-- Main nav links -->
          <div v-for="(link, index) in listNavBar" :key="index">
            <router-link
              v-if="!(role === 'Distributor' && link.nombre === 'Mis cursos')"
              :to="{ name: link.path }"
              @click.native="isMobileOpen = false"
              class="nav-item"
              exact-active-class="active"
              :title="(!isHovered && !isMobileOpen) ? link.nombre : ''"
            >
              <span class="nav-item-icon">
                <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon"></path>
                </svg>
              </span>
              <span v-show="isHovered || isMobileOpen" class="nav-item-text">{{ link.nombre }}</span>
            </router-link>
          </div>

          <!-- Separator -->
          <div class="sidebar-divider"></div>

          <!-- Preferences -->
          <router-link :to="{ name: 'option-preferences' }" @click.native="isMobileOpen = false" class="nav-item" exact-active-class="active" :title="(!isHovered && !isMobileOpen) ? 'Preferencias' : ''">
            <span class="nav-item-icon">
              <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </span>
            <span v-show="isHovered || isMobileOpen" class="nav-item-text">Preferencias</span>
          </router-link>

          <!-- FAQ -->
          <router-link :to="{ name: 'preguntas-frecuentes' }" @click.native="isMobileOpen = false" class="nav-item" exact-active-class="active" :title="(!isHovered && !isMobileOpen) ? 'Ayuda & FAQ' : ''">
            <span class="nav-item-icon">
              <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </span>
            <span v-show="isHovered || isMobileOpen" class="nav-item-text">Ayuda & FAQ</span>
          </router-link>
        </nav>

        <!-- Loading skeletons -->
        <nav class="sidebar-nav" v-else>
          <div v-for="n in 8" :key="n" class="tw-h-6 tw-w-4/5 tw-rounded tw-mx-auto tw-my-4 tw-bg-gray-800 tw-animate-pulse"></div>
        </nav>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "NavBarV",
  data() {
    return {
      isMobileOpen: false,
      isHovered: false,
      showNav: false,
      role: null,
      listNavBar: [
        { nombre: "Inicio", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", path: "home" },
        { nombre: "Mi aprendizaje", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", path: "suscription-user" },
        { nombre: "Mis infoproductos", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", path: "myCourses" },
        { nombre: "Marketplace", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", path: "courses" },
        { nombre: "Mis exámenes", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z", path: "examenes" },
        { nombre: "Mis certificaciones", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222", path: "certificado-user" },
        { nombre: "Mensajes", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", path: "messages" },
        { nombre: "Logros", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", path: "logros" },
        { nombre: "Clasificación", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", path: "leaderBoard" },
      ],
    };
  },
  methods: {
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
    this.getRole();
    this.$root.$on("toggle-sidebar", () => {
      this.isMobileOpen = !this.isMobileOpen;
    });
  },
  beforeDestroy() {
    this.$root.$off("toggle-sidebar");
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

.sidebar.expanded {
  width: 260px;
}

/* Mobile */
@media (max-width: 1023px) {
  .sidebar {
    position: fixed;
    inset: 0;
    top: 0; left: 0; bottom: 0;
    width: 260px !important;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 50;
  }
  .sidebar.mobile-open {
    transform: translateX(0);
  }
}

/* Header */
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

.sidebar-logo-container {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sidebar.collapsed:not(:hover) .sidebar-logo-container {
  margin-right: 0 !important;
}

.sidebar-subtitle {
  color: var(--sidebar-link, #d1d5db);
}

/* Scrollable area */
.sidebar-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
}
.sidebar-scroll::-webkit-scrollbar { width: 4px; }
.sidebar-scroll::-webkit-scrollbar-track { background-color: var(--sidebar-bg, #0b1120); }
.sidebar-scroll::-webkit-scrollbar-thumb { border-radius: 4px; background-color: rgba(24, 214, 0, 0.15); }

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0 12px;
}

/* Nav items */
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  color: var(--sidebar-link, #d1d5db);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Plus Jakarta Sans', sans-serif;
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

.nav-item-text {
  overflow: hidden;
  white-space: nowrap;
}

.nav-item:hover {
  background-color: rgba(24, 214, 0, 0.1);
  color: #ffffff;
}

.nav-item.active {
  background-color: #18d600 !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 14px rgba(24, 214, 0, 0.4) !important;
}

/* Collapsed state: center icons */
.sidebar.collapsed:not(:hover) .nav-item {
  justify-content: center;
  padding: 10px 0;
}

/* Divider */
.sidebar-divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.08);
  margin: 6px 4px;
}
</style>
