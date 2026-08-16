<template>
  <header class="top-navbar" ref="topbar">
    <!-- Brand -->
    <div class="topbar-brand tw-flex tw-items-center">
      <img v-show="!isDarkMode" src="@/assets/logos/navbar-b.webp" alt="Promolíder" class="tw-h-6 tw-w-auto" />
      <img v-show="isDarkMode" src="@/assets/logos/navbar-w.webp" alt="Promolíder" class="tw-h-6 tw-w-auto" />
    </div>

    <!-- Actions -->
    <div class="topbar-actions">

      <!-- Daily Question -->
      <button
        v-if="examDaily"
        @click="isQuestionModalOpen = true"
        class="topbar-icon-btn"
        title="Pregunta Diaria"
        id="topbar-btn-question"
      >
        <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="topbar-icon-label">Pregunta</span>
      </button>

      <!-- Wishlist -->
      <div class="topbar-wishlist-menu tw-relative">
        <button @click="openWishlistModal" class="topbar-icon-btn tw-relative" title="Lista de Deseos" id="topbar-btn-wishlist">
          <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span v-if="wishlistCount > 0" class="topbar-badge badge-cart">{{ wishlistCount }}</span>
          <span class="topbar-icon-label">Deseos</span>
        </button>

        <transition name="dropdown">
          <WishlistModal />
        </transition>
      </div>

      <!-- Cart -->
      <div class="topbar-cart-menu tw-relative">
        <button @click="openCartModal" class="topbar-icon-btn tw-relative" title="Carrito" id="topbar-btn-cart">
          <svg class="tw-w-5 tw-h-5 tw-text-[#18d600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"></path>
          </svg>
          <span v-if="itemCount > 0" class="topbar-badge badge-cart">{{ itemCount }}</span>
          <span class="topbar-icon-label">Carrito</span>
        </button>

        <transition name="dropdown">
          <ShoppingCartModal v-show="isCartOpen" />
        </transition>
      </div>

      <!-- Notifications -->
      <div class="topbar-notif-menu tw-relative">
        <button @click="openNotificationsPanel" class="topbar-icon-btn tw-relative" title="Notificaciones" id="topbar-btn-notifications">
          <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <span v-if="unreadCount > 0" class="topbar-badge badge-notif">{{ unreadCount > 9 ? '9+' : unreadCount }}</span>
          <span class="topbar-icon-label">Notifs.</span>
        </button>

        <transition name="dropdown">
          <div v-if="isNotifPanelOpen" class="notif-flyout" id="topbar-notif-dropdown">
            <div class="nf-header-top">
              <h2 class="nf-title-main">Notificaciones</h2>
            </div>
            <div class="nf-tabs">
              <button 
                class="nf-tab-btn" 
                :class="{ 'active': activeNotifTab === 'aula' }"
                @click="activeNotifTab = 'aula'"
              >
                Aula Virtual
              </button>
              <button 
                class="nf-tab-btn" 
                :class="{ 'active': activeNotifTab === 'crm' }"
                @click="activeNotifTab = 'crm'"
              >
                CRM
                <span v-if="notificationsList.length > 0" class="nf-tab-badge">{{ notificationsList.length }}</span>
              </button>
            </div>

            <div class="nf-body">
              <template v-if="activeNotifTab === 'crm'">
                <div v-if="isLoadingNotifications" class="tw-space-y-3">
                <div v-for="i in 3" :key="i" class="tw-animate-pulse tw-flex tw-items-center tw-gap-4 tw-p-4 tw-rounded-2xl" style="background-color: var(--card-sub-bg, #f8fafc);">
                  <div class="tw-w-10 tw-h-10 tw-rounded-full" style="background-color: var(--border-color, #e5e7eb);"></div>
                  <div class="tw-flex-1 tw-space-y-2">
                    <div class="tw-h-3 tw-rounded tw-w-3/4" style="background-color: var(--border-color, #e5e7eb);"></div>
                    <div class="tw-h-3 tw-rounded tw-w-1/2" style="background-color: var(--border-color, #e5e7eb);"></div>
                  </div>
                </div>
              </div>

              <div v-else-if="notificationsList.length === 0" class="tw-flex tw-flex-col tw-items-center tw-py-10 tw-text-center">
                <div class="tw-w-16 tw-h-16 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-4" style="background-color: var(--card-sub-bg, #f8fafc);">
                  <svg class="tw-w-8 tw-h-8" style="color: var(--text-muted, #6b7280);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </div>
                <h3 class="tw-font-bold tw-text-base tw-mb-2" style="color: var(--text-bold, #111827);">Sin notificaciones</h3>
                <p class="tw-text-sm tw-max-w-[240px]" style="color: var(--text-muted, #6b7280);">Te avisaremos cuando haya novedades importantes.</p>
              </div>

              <div v-else class="tw-space-y-3">
                <div v-for="(item, index) in notificationsList" :key="index" class="nf-item">
                  <div class="nf-item-avatar">
                    <img v-if="item.avatar && !item.avatar.includes('default')" :src="item.avatar" class="tw-w-full tw-h-full tw-object-cover" @error="onAvatarError" />
                    <svg v-else class="tw-w-5 tw-h-5 tw-text-[#18d600]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                  <div class="tw-flex-1 tw-min-w-0">
                    <div class="tw-flex tw-justify-between tw-items-start tw-gap-2 tw-mb-1">
                      <h4 class="tw-font-bold tw-text-sm tw-leading-snug" style="color: var(--text-bold, #111827);">{{ item.title }}</h4>
                      <span class="tw-text-[11px] tw-font-semibold tw-shrink-0" style="color: var(--text-muted, #6b7280);">{{ formatDate(item.created_at) }}</span>
                    </div>
                    <p class="tw-text-xs tw-line-clamp-2" style="color: var(--text-muted, #6b7280);">{{ item.subtitle }}</p>
                  </div>
                </div>
              </div>
            </template>

              <template v-if="activeNotifTab === 'aula'">
                <div class="tw-flex tw-flex-col tw-items-center tw-py-12 tw-text-center">
                  <p class="tw-text-base" style="color: var(--text-muted, #6b7280);">Sin notificaciones.</p>
                </div>
              </template>
            </div>

            <div class="nf-footer">
              <button @click="isNotifPanelOpen = false" class="nf-close-all-btn">Entendido</button>
            </div>
          </div>
        </transition>
      </div>

      <!-- Dark Mode Toggle -->
      <button @click="toggleDarkMode" class="topbar-icon-btn" :title="isDarkMode ? 'Modo Claro' : 'Modo Oscuro'" id="topbar-btn-darkmode">
        <svg v-if="isDarkMode" class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <svg v-else class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
        <span class="topbar-icon-label">{{ isDarkMode ? 'Claro' : 'Oscuro' }}</span>
      </button>

      <!-- Divider -->
      <div class="topbar-divider"></div>

      <!-- User Avatar Dropdown -->
      <div class="topbar-user-menu" ref="userMenu">
        <button @click="isUserMenuOpen = !isUserMenuOpen" class="topbar-avatar-btn" id="topbar-btn-avatar">
          <div class="topbar-avatar">
            <img v-if="userPhoto" :src="userPhoto" class="tw-w-full tw-h-full tw-object-cover tw-rounded-[10px]" @error="onMainAvatarError" />
            <span v-else>{{ userInitials }}</span>
          </div>
          <div class="topbar-user-info">
            <span class="topbar-user-name">{{ userName }}</span>
            <span class="topbar-user-role">{{ role || 'Estudiante' }}</span>
          </div>
          <svg
            class="tw-w-4 tw-h-4 tw-text-slate-400 tw-transition-transform tw-duration-200 tw-flex-shrink-0"
            :class="isUserMenuOpen ? 'tw-rotate-180' : ''"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <!-- Dropdown -->
        <transition name="dropdown">
          <div v-if="isUserMenuOpen" class="user-dropdown" id="topbar-user-dropdown">
            <router-link :to="{ name: 'perfil' }" @click.native="isUserMenuOpen = false" class="dropdown-item">
              <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Mi Perfil</span>
            </router-link>
            <router-link :to="{ name: 'option-preferences' }" @click.native="isUserMenuOpen = false" class="dropdown-item">
              <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Preferencias</span>
            </router-link>
            <div class="dropdown-separator"></div>
            <button @click="closeSession" class="dropdown-item dropdown-logout">
              <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <!-- ======================== DAILY QUESTION MODAL ======================== -->
    <div v-if="isQuestionModalOpen" class="tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-bg-black/60 tw-backdrop-blur-sm" @click.self="isQuestionModalOpen = false">
      <div class="tw-bg-white tw-rounded-3xl tw-w-full tw-max-w-lg tw-mx-4 tw-shadow-2xl">
        <div class="tw-flex tw-justify-between tw-items-center tw-px-6 tw-py-4 tw-border-b tw-border-gray-100">
          <h5 class="tw-text-[#18d600] tw-font-bold tw-text-xl tw-font-outfit">Pregunta diaria</h5>
          <button @click="isQuestionModalOpen = false" class="tw-text-gray-400 hover:tw-text-gray-600 tw-p-1 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors">
            <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="tw-p-6">
          <QuestionDaily />
        </div>
      </div>
    </div>

    <!-- Global click-away overlay -->
    <div v-if="isNotifPanelOpen || isCartOpen || isWishlistOpen" class="tw-fixed tw-inset-0 tw-z-40" @click="isNotifPanelOpen = false; toggleCart(false); toggleWishlist(false);"></div>
  </header>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import QuestionDaily from "@/components/Student/questions/daily/index";
import ShoppingCartModal from "@/components/Cart/ShoppingCartModal.vue";
import WishlistModal from "@/components/Wishlist/WishlistModal.vue";
import { authGet, clearAuth } from "@/helpers/authStorage";

export default {
  name: "TopBar",
  components: { QuestionDaily, ShoppingCartModal, WishlistModal },
  data() {
    return {
      isDarkMode: false,
      isQuestionModalOpen: false,
      isNotifPanelOpen: false,
      activeNotifTab: 'crm',
      isUserMenuOpen: false,
      isLoadingNotifications: false,
      notificationsList: [],
      unreadCount: 0,
      role: null,
      userName: "",
      userPhoto: null,
    };
  },
  computed: {
    ...mapState("course", ["examDaily"]),
    ...mapGetters("cart", ["itemCount", "isCartOpen"]),
    ...mapGetters("wishlist", ["wishlistCount", "isWishlistOpen"]),
    userInitials() {
      const name = this.userName || "U";
      const parts = name.trim().split(" ");
      if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
      return name.substring(0, 2).toUpperCase();
    },
  },
  methods: {
    ...mapActions("cart", ["toggleCart"]),
    ...mapActions("wishlist", ["toggleWishlist", "fetchWishlist"]),
    openCartModal() {
      if (this.isCartOpen) {
        this.toggleCart(false);
      } else {
        this.isUserMenuOpen = false;
        this.isNotifPanelOpen = false;
        this.toggleWishlist(false);
        this.toggleCart(true);
      }
    },
    openWishlistModal() {
      if (this.isWishlistOpen) {
        this.toggleWishlist(false);
      } else {
        this.isUserMenuOpen = false;
        this.isNotifPanelOpen = false;
        this.toggleCart(false);
        this.toggleWishlist(true);
      }
    },
    openNotificationsPanel() {
      if (this.isNotifPanelOpen) {
        this.isNotifPanelOpen = false;
      } else {
        this.isUserMenuOpen = false;
        this.toggleCart(false);
        this.toggleWishlist(false);
        this.isNotifPanelOpen = true;
        this.fetchNotifications();
      }
    },
    async fetchNotifications() {
      this.isLoadingNotifications = true;
      try {
        const resp = await this.axios.get("/notifications/list");
        let rawList = [];
        if (resp && resp.data) {
          if (Array.isArray(resp.data)) rawList = resp.data;
          else if (Array.isArray(resp.data.data)) rawList = resp.data.data;
        }
        this.notificationsList = rawList.map((e) => ({
          id: e.id || Math.random(),
          title: e.title || e.titulo || "Notificación",
          subtitle: e.body || e.mensaje || e.content || "",
          avatar: e.photo || e.avatar || require("@/assets/logo-inicial.png"),
          created_at: e.created_at || e.fecha || new Date().toISOString(),
        }));
        this.unreadCount = this.notificationsList.length;
      } catch (e) {
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
      } catch (e) { return dateStr; }
    },
    onAvatarError(e) {
      if (e && e.target) e.target.src = require("@/assets/logo-inicial.png");
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("app_theme", this.isDarkMode ? "dark" : "light");
      if (this.isDarkMode) {
        document.documentElement.classList.add("dark-mode", "dark", "tw-dark");
        document.body.classList.add("dark-mode", "dark", "tw-dark");
      } else {
        document.documentElement.classList.remove("dark-mode", "dark", "tw-dark");
        document.body.classList.remove("dark-mode", "dark", "tw-dark");
      }
    },
    initDarkMode() {
      this.isDarkMode = localStorage.getItem("app_theme") === "dark";
      if (this.isDarkMode) {
        document.documentElement.classList.add("dark-mode", "dark", "tw-dark");
        document.body.classList.add("dark-mode", "dark", "tw-dark");
      }
    },
    closeSession() {
      clearAuth();
      this.$router.push({ name: "Login" });
    },
    async getRole() {
      try {
        const response = await this.axios.get("/dashboard/getattributes");
        if (response.data && response.data.data) {
          this.role = response.data.data.role;
        }
      } catch (error) {
        this.role = "";
      }
    },
    loadUserName() {
      // 1. Leer nombre desde sessionStorage (donde authGet guarda datos sensibles)
      const name = authGet("name_user");
      const lastName = authGet("last_name_user");
      const photo = authGet("photo_user");
      
      if (photo && photo !== "null" && photo !== "undefined") {
        this.userPhoto = photo;
      }

      if (name) {
        this.userName = lastName ? `${name} ${lastName}` : name;
        return;
      }
      // 2. Si sessionStorage está vacío, pedir al backend el usuario autenticado
      this.axios.get("/profile/info").then((res) => {
        const u = res && (res.data.user || res.data.data || res.data);
        if (u) {
          if (u.name) {
            this.userName = u.last_name ? `${u.name} ${u.last_name}` : u.name;
          } else {
            this.userName = "Mi cuenta";
          }
          if (u.photo && !u.photo.includes("default")) {
            this.userPhoto = u.photo;
          }
        }
      }).catch(() => {
        this.userName = "Mi cuenta";
      });
    },
    onMainAvatarError() {
      this.userPhoto = null; // fallback to initials
    },
    handleOutsideClick(e) {
      if (this.$refs.userMenu && !this.$refs.userMenu.contains(e.target)) {
        this.isUserMenuOpen = false;
      }
    },
  },
  mounted() {
    this.initDarkMode();
    this.loadUserName();
    this.getRole();
    this.fetchNotifications();
    this.fetchWishlist();
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>

<style scoped>
/* =============================================
   TOP NAVBAR
============================================= */
.top-navbar {
  position: sticky;
  top: 0;
  z-index: 28;
  height: 56px;
  background-color: var(--card-bg, #ffffff);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
}

/* Brand */
.topbar-brand {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.topbar-title {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-bold, #111827);
}
.topbar-subtitle {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted, #6b7280);
}

/* Actions row */
.topbar-actions {
  display: flex;
  align-items: center;
  gap: 2px;
}

.topbar-icon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-muted, #6b7280);
  transition: all 0.15s ease;
  position: relative;
}
.topbar-icon-btn:hover {
  background-color: var(--card-sub-bg, rgba(128, 128, 128, 0.15));
  color: var(--text-bold, #111827);
}
.topbar-icon-label {
  display: none; /* Hide labels for a more delicate look */
}

/* Badge */
.topbar-badge {
  position: absolute;
  top: 4px; right: 4px;
  min-width: 16px; height: 16px;
  border-radius: 8px;
  font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  padding: 0 3px; line-height: 1;
}
.badge-cart {
  background-color: #18d600 !important;
  color: #0b1120 !important;
}
.badge-notif {
  background-color: #ef4444 !important;
  color: #ffffff !important;
}

/* Divider */
.topbar-divider {
  width: 1px; height: 28px;
  background-color: var(--border-color, #e5e7eb);
  margin: 0 8px; flex-shrink: 0;
}

/* User menu */
.topbar-user-menu { position: relative; }

.topbar-avatar-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px 6px 6px;
  border-radius: 12px;
  border: 1px solid var(--border-color, #e5e7eb);
  background: var(--card-sub-bg, #f8fafc);
  cursor: pointer;
  transition: all 0.15s ease;
}
.topbar-avatar-btn:hover {
  border-color: #18d600;
  background: rgba(24, 214, 0, 0.04);
}
.dark .topbar-avatar-btn {
  background: transparent;
  border-color: #374151; /* Tailwind gray-700 */
}
.dark .topbar-avatar-btn:hover {
  background: #1f2937; /* Tailwind gray-800 */
  border-color: #18d600;
}

.topbar-avatar {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #18d600, #0db800);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 12px; font-weight: 700;
  font-family: 'Outfit', sans-serif; flex-shrink: 0;
}

.topbar-user-info {
  display: flex; flex-direction: column;
  text-align: left; line-height: 1.2;
}
.topbar-user-name {
  font-size: 13px; font-weight: 700;
  font-family: 'Outfit', sans-serif;
  color: var(--text-bold, #111827);
  max-width: 120px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.topbar-user-role {
  font-size: 10px; font-weight: 600;
  color: var(--text-muted, #6b7280);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Dropdown */
.user-dropdown {
  position: absolute;
  top: calc(100% + 10px); right: 0;
  min-width: 200px;
  background-color: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 16px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.16);
  overflow: hidden; z-index: 9999;
}

.dropdown-item {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px;
  font-size: 13px; font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--text-bold, #111827);
  text-decoration: none;
  background: transparent; border: none;
  width: 100%; cursor: pointer;
  transition: background 0.12s ease;
}
.dropdown-item:hover { background-color: var(--card-sub-bg, #f8fafc); }

.dropdown-separator {
  height: 1px;
  background-color: var(--border-color, #e5e7eb);
  margin: 4px 0;
}
.dropdown-logout { color: #ef4444; }
.dropdown-logout:hover { background-color: rgba(239, 68, 68, 0.08); }

/* Dropdown animation */
.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

/* =============================================
   NOTIFICATIONS FLYOUT (NOW DROPDOWN)
============================================= */
.notif-flyout {
  position: absolute;
  top: calc(100% + 12px); right: -100px;
  width: 400px;
  max-width: calc(100vw - 32px);
  background-color: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 20px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.15);
  display: flex; flex-direction: column;
  overflow: hidden; z-index: 9999;
  transform-origin: top right;
  color: var(--text-bold, #111827);
}

@keyframes flyIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.nf-header-top {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 20px 10px 20px;
}
.nf-title-main {
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem; font-weight: 800;
  color: var(--text-bold, #111827);
  margin: 0;
}
.nf-settings-link {
  font-size: 0.9rem; font-weight: 500;
  color: #8b5cf6; text-decoration: none;
  transition: opacity 0.2s;
}
.nf-settings-link:hover { opacity: 0.8; }

.nf-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  padding: 0 10px;
}
.nf-tab-btn {
  flex: 1; padding: 12px 10px;
  background: transparent; border: none;
  font-size: 0.95rem; font-weight: 600;
  color: var(--text-muted, #9ca3af);
  border-bottom: 2px solid transparent;
  cursor: pointer; transition: all 0.2s;
  display: flex; justify-content: center; align-items: center; gap: 6px;
}
.nf-tab-btn.active {
  color: var(--text-bold, #111827);
  border-bottom-color: var(--text-bold, #111827);
}
.nf-tab-badge {
  background-color: #ef4444; color: white;
  font-size: 0.7rem; font-weight: 700;
  padding: 2px 6px; border-radius: 10px;
}

.nf-body {
  max-height: 400px; overflow-y: auto; padding: 16px;
  background-color: var(--card-bg, #ffffff);
}
.nf-body::-webkit-scrollbar { width: 4px; }
.nf-body::-webkit-scrollbar-thumb { background: var(--border-color, #e5e7eb); border-radius: 4px; }

.nf-item {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 12px; border-radius: 14px;
  background-color: var(--card-sub-bg, #f8fafc);
  border: 1px solid var(--border-color, transparent);
  margin-bottom: 10px; transition: border-color 0.15s ease;
}
.nf-item:hover { border-color: #18d600; }

.nf-item-avatar {
  width: 40px; height: 40px; flex-shrink: 0;
  border-radius: 12px; overflow: hidden;
  background-color: rgba(24,214,0,0.1);
  border: 1px solid rgba(24,214,0,0.2);
  display: flex; align-items: center; justify-content: center;
}

.nf-footer {
  padding: 16px 20px;
  background-color: var(--card-bg, #ffffff);
  border-top: 1px solid var(--border-color, #e5e7eb);
}
.nf-close-all-btn {
  width: 100%;
  padding: 12px;
  background-color: var(--text-bold, #111827);
  color: var(--card-bg, #ffffff);
  border: none; border-radius: 12px;
  font-weight: 700; font-size: 0.95rem;
  cursor: pointer; transition: opacity 0.2s;
}
.nf-close-all-btn:hover { opacity: 0.9; }
</style>
