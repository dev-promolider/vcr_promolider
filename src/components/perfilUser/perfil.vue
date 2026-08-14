<template>
  <div class="tw-min-h-[85vh] tw-p-4">
    <section-title title="Ajustes de perfil" />

    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-12 tw-gap-6 tw-mt-4">
      <!-- Tarjeta Resumen de Perfil Izquierda -->
      <div class="tw-col-span-1 md:tw-col-span-4">
        <div class="profile-card-panel tw-border tw-rounded-[24px] tw-shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:tw-shadow-[0_8px_32px_rgba(0,0,0,0.37)] tw-p-4 md:tw-p-6 tw-flex tw-flex-col tw-backdrop-blur-md" style="background-color: var(--card-bg); border-color: var(--border-color);">
          <div class="tw-flex tw-flex-col tw-items-center tw-text-center">
            <!-- Avatar con botón de cámara flotante -->
            <div class="tw-relative tw-w-[130px] tw-h-[130px] tw-rounded-full tw-p-1 tw-border-2 tw-shadow-[0_6px_18px_rgba(0,0,0,0.06)] tw-mb-4" style="background-color: var(--card-sub-bg); border-color: var(--border-color);">
              <img
                :src="picture || defaultAvatar"
                class="tw-w-full tw-h-full tw-rounded-full tw-object-cover"
                alt="Foto de perfil"
                @error="onAvatarError"
              />
              <button class="tw-absolute tw-bottom-1 tw-right-1 tw-w-9 tw-h-9 tw-rounded-full tw-bg-[var(--primary-color)] tw-border-[3px] tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-shadow-[0_4px_10px_rgba(16,185,129,0.3)] hover:tw-scale-110 hover:tw-bg-[var(--primary-hover)] tw-transition-all tw-duration-200" style="border-color: var(--card-sub-bg);" @click="modalImage = true" title="Cambiar foto">
                <svg class="tw-w-4 tw-h-4 tw-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </button>
            </div>

            <!-- Nombre de usuario -->
            <h3 class="tw-font-outfit tw-font-bold tw-text-xl tw-mb-3" style="color: var(--text-bold);">{{ userUp.name || name || 'Usuario' }}</h3>

            <!-- Chips de Rol y Membresía -->
            <div class="tw-flex tw-flex-wrap tw-justify-center tw-gap-2 tw-mb-5">
              <span v-if="userUp.rol" class="tw-font-jakarta tw-text-sm tw-font-semibold tw-border tw-px-3 tw-py-1 tw-rounded-full tw-inline-flex tw-items-center" style="color: var(--primary-color); background-color: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.3);">
                <svg class="tw-w-4 tw-h-4 tw-mr-1" style="color: var(--primary-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                Rol: {{ userUp.rol }}
              </span>
              <span v-if="userUp.plan" class="tw-font-jakarta tw-text-sm tw-font-semibold tw-border tw-px-3 tw-py-1 tw-rounded-full tw-inline-flex tw-items-center" style="color: var(--primary-color); background-color: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.3);">
                <svg class="tw-w-4 tw-h-4 tw-mr-1" style="color: var(--primary-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                Membresía: {{ userUp.plan }}
              </span>
            </div>
          </div>

          <!-- Detalles adicionales del usuario -->
          <div class="tw-pt-4 tw-border-t" style="border-color: var(--border-color);">
            <h5 class="tw-font-outfit tw-font-bold tw-text-base tw-mb-4" style="color: var(--text-bold);">Detalles</h5>

            <div class="tw-flex tw-items-center tw-mb-4">
              <svg class="tw-w-5 tw-h-5 tw-mr-3" style="color: var(--text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <div>
                <span class="tw-font-jakarta tw-text-xs tw-block" style="color: var(--text-muted);">Nombre completo</span>
                <p class="tw-font-outfit tw-text-[0.92rem] tw-font-semibold tw-m-0" style="color: var(--text-bold);">{{ name || userUp.name || '---' }}</p>
              </div>
            </div>

            <div class="tw-flex tw-items-center">
              <svg class="tw-w-5 tw-h-5 tw-mr-3" style="color: var(--text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <div>
                <span class="tw-font-jakarta tw-text-xs tw-block" style="color: var(--text-muted);">Correo electrónico</span>
                <p class="tw-font-outfit tw-text-[0.92rem] tw-font-semibold tw-m-0" style="color: var(--text-bold);">{{ email || userUp.email || '---' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel Derecha de Ajustes (Cuenta y Seguridad) -->
      <div class="tw-col-span-1 md:tw-col-span-8">
        <div class="profile-card-panel tw-border tw-rounded-[24px] tw-shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:tw-shadow-[0_8px_32px_rgba(0,0,0,0.37)] tw-overflow-hidden tw-backdrop-blur-md" style="background-color: var(--card-bg); border-color: var(--border-color);">
          
          <!-- Native Tabs Header -->
          <div class="profile-tabs-header tw-flex tw-border-b" style="background-color: var(--card-sub-bg); border-color: var(--border-color);">
            <button v-for="(ltab, index) in listTabs" :key="index" @click="tab = index" :class="['tw-px-6 tw-py-4 tw-font-outfit tw-font-bold tw-text-[0.95rem] tw-capitalize tw-transition-colors tw-flex tw-items-center tw-gap-2 tw-outline-none', tab === index ? 'tw-border-b-2 tw-border-[var(--primary-color)]' : 'hover:tw-text-[var(--primary-color)]']" :style="{ color: tab === index ? 'var(--primary-color)' : 'var(--text-muted)' }">
              <svg v-if="ltab.icon === 'account'" class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <svg v-if="ltab.icon === 'lock-outline'" class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              {{ ltab.title }}
            </button>
          </div>

          <!-- Native Tabs Content -->
          <div class="tw-p-4 md:tw-p-6">
            
            <!-- Tab: Cuenta -->
            <div v-show="tab === 0" class="tw-w-full">
              <h4 class="tw-font-outfit tw-font-bold tw-text-[1.15rem] tw-mb-5" style="color: var(--text-bold);">Editar Perfil</h4>
              <form @submit.prevent="userUpdate">
                <div class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-6 tw-w-full">
                  <div class="tw-flex-1 tw-flex tw-flex-col tw-gap-4">
                    <div>
                      <label class="tw-block tw-text-sm tw-font-semibold tw-mb-1" style="color: var(--text-muted);">Usuario</label>
                      <input type="text" v-model="dataUser.name" class="profile-input-field tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-[var(--primary-color)] focus:tw-outline-none" style="background-color: var(--input-bg); border-color: var(--border-color); color: var(--text-bold);" />
                    </div>
                    <div>
                      <label class="tw-block tw-text-sm tw-font-semibold tw-mb-1" style="color: var(--text-muted);">Teléfono</label>
                      <input type="text" v-model="dataUser.phone" class="profile-input-field tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-[var(--primary-color)] focus:tw-outline-none" style="background-color: var(--input-bg); border-color: var(--border-color); color: var(--text-bold);" />
                    </div>
                    <div>
                      <label class="tw-block tw-text-sm tw-font-semibold tw-mb-1" style="color: var(--text-muted);">Nro. de documento</label>
                      <input type="text" v-model="dataUser.nro_document" class="profile-input-field tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-[var(--primary-color)] focus:tw-outline-none" style="background-color: var(--input-bg); border-color: var(--border-color); color: var(--text-bold);" />
                    </div>
                  </div>
                  <div class="tw-flex-1 tw-flex tw-flex-col tw-gap-4">
                    <div>
                      <label class="tw-block tw-text-sm tw-font-semibold tw-mb-1" style="color: var(--text-muted);">Correo electrónico</label>
                      <input type="email" v-model="dataUser.email" class="profile-input-field tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-[var(--primary-color)] focus:tw-outline-none" style="background-color: var(--input-bg); border-color: var(--border-color); color: var(--text-bold);" />
                    </div>
                    <div>
                      <label class="tw-block tw-text-sm tw-font-semibold tw-mb-1" style="color: var(--text-muted);">Tipo de documento</label>
                      <select v-model="dataUser.id_document_type" class="profile-input-field tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-[var(--primary-color)] focus:tw-outline-none" style="background-color: var(--input-bg); border-color: var(--border-color); color: var(--text-bold);">
                        <option value="" disabled>Seleccione una opción</option>
                        <option v-for="doc in docTypes" :key="doc.id" :value="doc.id" style="background-color: var(--card-sub-bg); color: var(--text-bold);">{{ doc.document }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="tw-flex tw-justify-end tw-mt-6">
                  <button type="submit" :disabled="isLoadingUpdateUser" class="tw-w-full sm:tw-w-auto tw-bg-[var(--primary-color)] hover:tw-bg-[var(--primary-hover)] tw-text-white tw-font-bold tw-py-3 tw-px-6 tw-rounded-xl tw-transition-colors disabled:tw-opacity-60 disabled:tw-cursor-not-allowed tw-flex tw-items-center tw-justify-center">
                    <svg class="tw-w-5 tw-h-5 tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{{ isLoadingUpdateUser ? 'Guardando...' : 'Guardar Cambios' }}</span>
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Tab: Seguridad -->
            <div v-show="tab === 1" class="tw-w-full">
              <h4 class="tw-font-outfit tw-font-bold tw-text-[1.15rem] tw-mb-5" style="color: var(--text-bold);">Cambiar Contraseña</h4>
              <form @submit.prevent="changePassword()">
                <div class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-6 tw-w-full">
                  <div class="tw-flex-1 tw-flex tw-flex-col tw-gap-4">
                    <div>
                      <label class="tw-block tw-text-sm tw-font-semibold tw-mb-1" style="color: var(--text-muted);">Contraseña actual</label>
                      <div class="tw-relative">
                        <input :type="value ? 'password' : 'text'" v-model="actual_pass" class="profile-input-field tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-[var(--primary-color)] focus:tw-outline-none" style="background-color: var(--input-bg); border-color: var(--border-color); color: var(--text-bold);" />
                        <button type="button" @click="value = !value" class="tw-absolute tw-right-3 tw-top-1/2 tw--translate-y-1/2 hover:tw-text-[var(--primary-color)] tw-mt-0.5" style="color: var(--text-muted);">
                          <svg v-if="value" class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          <svg v-else class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="tw-flex-1 tw-flex tw-flex-col tw-gap-4">
                    <div>
                      <label class="tw-block tw-text-sm tw-font-semibold tw-mb-1" style="color: var(--text-muted);">Nueva contraseña</label>
                      <div class="tw-relative">
                        <input :type="value ? 'password' : 'text'" v-model="new_pass" class="profile-input-field tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-[var(--primary-color)] focus:tw-outline-none" style="background-color: var(--input-bg); border-color: var(--border-color); color: var(--text-bold);" />
                        <button type="button" @click="value = !value" class="tw-absolute tw-right-3 tw-top-1/2 tw--translate-y-1/2 hover:tw-text-[var(--primary-color)] tw-mt-0.5" style="color: var(--text-muted);">
                          <svg v-if="value" class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          <svg v-else class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label class="tw-block tw-text-sm tw-font-semibold tw-mb-1" style="color: var(--text-muted);">Repetir nueva contraseña</label>
                      <div class="tw-relative">
                        <input :type="value2 ? 'password' : 'text'" v-model="repeat_pass" class="profile-input-field tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg focus:tw-ring-2 focus:tw-ring-[var(--primary-color)] focus:tw-outline-none" style="background-color: var(--input-bg); border-color: var(--border-color); color: var(--text-bold);" />
                        <button type="button" @click="value2 = !value2" class="tw-absolute tw-right-3 tw-top-1/2 tw--translate-y-1/2 hover:tw-text-[var(--primary-color)] tw-mt-0.5" style="color: var(--text-muted);">
                          <svg v-if="value2" class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          <svg v-else class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="tw-font-jakarta tw-text-[0.82rem] tw-mb-6 tw-mt-2 tw-flex tw-items-center" style="color: var(--text-muted);">
                  <svg class="tw-w-4 tw-h-4 tw-mr-1" style="color: var(--text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Mínimo 8 caracteres de largo, mayúsculas y símbolos
                </p>
                <div class="tw-flex tw-justify-start">
                  <button class="tw-w-full sm:tw-w-auto tw-bg-[var(--primary-color)] hover:tw-bg-[var(--primary-hover)] tw-text-white tw-font-bold tw-py-3 tw-px-6 tw-rounded-xl tw-transition-colors tw-flex tw-items-center tw-justify-center" type="submit">
                    <svg class="tw-w-5 tw-h-5 tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span>Cambiar contraseña</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals (Reemplazo de v-dialog y v-file-input) -->
    <div v-if="modalImage" class="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black/50 tw-backdrop-blur-sm" @click.self="onCancel">
      <div class="tw-bg-white dark:tw-bg-[#161e2e] tw-border dark:tw-border-[rgba(255,255,255,0.1)] tw-rounded-[24px] tw-w-full tw-max-w-[490px] tw-mx-4 tw-p-6 tw-overflow-hidden tw-shadow-2xl">
        <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-6">
          <div class="tw-w-[140px] tw-h-[140px] tw-rounded-full tw-overflow-hidden tw-bg-gray-100 dark:tw-bg-[#0a0f18] tw-border-4 tw-border-white dark:tw-border-[#161e2e] tw-shadow-sm">
            <img v-if="pictureModal" :src="pictureModal" class="tw-w-full tw-h-full tw-object-cover" alt="Previsualización" />
            <img v-else :src="picture || defaultAvatar" class="tw-w-full tw-h-full tw-object-cover" alt="Actual" />
          </div>
        </div>

        <div class="tw-mb-6">
          <label class="tw-block tw-text-sm tw-font-semibold tw-text-gray-700 dark:tw-text-[#94a3b8] tw-mb-2">Buscar Imagen</label>
          <input type="file" accept="image/*" @change="file = $event.target.files[0]; onFileSelected()" class="tw-w-full tw-border tw-border-gray-300 dark:tw-border-[rgba(255,255,255,0.1)] tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 dark:tw-text-[#e2e8f0] tw-file:mr-4 tw-file:py-2 tw-file:px-4 tw-file:rounded-full tw-file:border-0 tw-file:text-sm tw-file:font-semibold tw-file:bg-[var(--primary-color)]/10 tw-file:text-[var(--primary-color)] hover:tw-file:bg-[var(--primary-color)]/20 tw-transition-colors tw-cursor-pointer focus:tw-outline-none" />
        </div>

        <div class="tw-flex tw-justify-end tw-gap-3">
          <button @click="onCancel" class="tw-px-4 tw-py-2 tw-text-gray-600 dark:tw-text-[#94a3b8] tw-font-medium hover:tw-bg-gray-100 dark:hover:tw-bg-white/5 tw-rounded-lg tw-transition-colors">
            Cancelar
          </button>
          <button @click="onUpload" :disabled="loadingSaveImage" class="tw-px-4 tw-py-2 tw-bg-[var(--primary-color)] tw-text-white tw-font-medium hover:tw-bg-[var(--primary-hover)] tw-rounded-lg tw-transition-colors disabled:tw-opacity-50">
            {{ loadingSaveImage ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Snackbars (Reemplazo de v-snackbar) -->
    <div v-if="alertUpdateUser" class="tw-fixed tw-bottom-6 tw-left-1/2 tw--translate-x-1/2 tw-z-50 tw-bg-gray-900 tw-text-white tw-px-5 tw-py-3 tw-rounded-xl tw-shadow-2xl tw-flex tw-items-center tw-justify-between tw-min-w-[300px] tw-animate-bounce">
      <span class="tw-font-jakarta tw-text-sm">Datos actualizados correctamente</span>
      <button @click="alertUpdateUser = false" class="tw-text-red-400 hover:tw-text-red-300 tw-font-bold tw-text-sm tw-ml-6 focus:tw-outline-none">Cerrar</button>
    </div>

    <div v-if="snackbar" class="tw-fixed tw-bottom-6 tw-left-1/2 tw--translate-x-1/2 tw-z-50 tw-bg-gray-900 tw-text-white tw-px-5 tw-py-3 tw-rounded-xl tw-shadow-2xl tw-flex tw-items-center tw-justify-between tw-min-w-[300px] tw-animate-bounce">
      <span class="tw-font-jakarta tw-text-sm">{{ message }}</span>
      <button @click="snackbar = false" class="tw-text-red-400 hover:tw-text-red-300 tw-font-bold tw-text-sm tw-ml-6 focus:tw-outline-none">Cerrar</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import SectionTitle from "../Navbar/SectionTitle.vue";
import { authGet, authSet } from "@/helpers/authStorage";
export default {
  name: "perfil",
  components: {
    SectionTitle,
  },
  data() {
    return {
      isActiveAlertUser: false,
      msgUpdateUser: false,
      alertUpdateUser: false,
      pictureModal: null,
      isLoadingUpdateUser: false,
      loadingSaveImage: false,
      file: null,
      modalImage: false,
      value: String,
      value2: String,
      menu: false,
      tab: 0, 
      message: "",
      listTabs: [
        { icon: "account", title: "Cuenta" },
        { icon: "lock-outline", title: "Seguridad" },
      ],
      subido: null,
      mostrar: null,
      selectedFile: null,
      picture: authGet("photo_user"),

      photo: "",
      userUp: {
        email: authGet("email_user"),
        name: authGet("name_user"),
        last_name: authGet("last_name_user"),
        date_birth: authGet("date_birth_user"),
        country: authGet("country_user"),
        biography: authGet("biography_user"),
        city: authGet("city"),
        rol: "",
        plan: "",
      },
      cuaDetalles: "",
      pais: [],
      namePais: [],
      compEmail: authGet("email_user"),
      varEmail: 0,
      varCountryInit: [],
      actual_pass: "",
      new_pass: "",
      repeat_pass: "",
      snackbar: false,
      dataUser: [],
      docTypes: [],
      name: "",
      defaultAvatar: "https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240",
      email: "",
    };
  },
  created() {
    this.photo = authGet("photo_user");
    this.userUp.email = authGet("email_user");
    this.cuaDetalles = authGet("name_user");
    this.userAccountType();
    this.getUserInfo();
    this.getDocumentTypes();
  },
  computed: {
    ...mapState("user", ["id_user"]),
  },
  methods: {
    onAvatarError(e) {
      if (e && e.target) {
        e.target.src = this.defaultAvatar;
      }
    },
    async getDocumentTypes() {
      await this.axios.get("/listDocumentType").then((response) => {
        this.docTypes = response.data;
      });
    },

    async getUserInfo() {
      await this.axios.get("/profile/info").then((response) => {
        this.dataUser = response.data;
        this.name = response.data.name;
        this.email = response.data.email;
      });
    },

    async changePassword() {
      if (this.validatePass()) {
        const form = {
          actual_pass: this.actual_pass,
          new_pass: this.new_pass,
          repeat_pass: this.repeat_pass,
        };
        await this.axios.post("/profile/change-pass", form).then((response) => {
          this.message = response.data;
          this.snackbar = true;
          this.actual_pass = "";
          this.new_pass = "";
          this.repeat_pass = "";
        });
      }
    },

    validatePass() {
      if (this.actual_pass == "") {
        this.message = "Todos los campos son requeridos";
        this.snackbar = true;
        return false;
      } else if (this.new_pass == "") {
        this.message = "Todos los campos son requeridos";
        this.snackbar = true;
        return false;
      } else if (this.repeat_pass == "") {
        this.message = "Todos los campos son requeridos";
        this.snackbar = true;
        return false;
      } else if (
        this.new_pass.length < 8 ||
        this.actual_pass < 8 ||
        this.repeat_pass < 8
      ) {
        this.message = "La contraseña debe tener como mínimo 8 caracteres";
        this.snackbar = true;
        return false;
      } else if (this.new_pass != this.repeat_pass) {
        this.message = "Las contraseñas no coinciden";
        this.snackbar = true;
        return false;
      }
      return true;
    },

    userUpdate() {
      if (this.validateForm()) {
        this.isLoadingUpdateUser = true;
        this.axios
          .post("/user/update", this.dataUser)
          .then((res) => {
            this.getUserInfo();
            this.isLoadingUpdateUser = false;
            this.alertUpdateUser = true;
            this.msgUpdateUser = res.data.message;
            this.isActiveAlertUser = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    validateForm() {
      if (this.email != this.dataUser.email) {
        const formdata = new FormData();
        formdata.append("new_email", this.dataUser.email);

        this.axios.post("/user/verify-unique-email", formdata).then((res) => {
          if (res.data) {
            this.message =
              "El correo ingresado ya fue registrado anteriormente";
            this.snackbar = true;
            return false;
          }
        });
      }
      if (
        this.dataUser.email == "" ||
        this.dataUser.name == "" ||
        this.dataUser.phone == "" ||
        this.dataUser.doc_type_id == "" ||
        this.dataUser.number_doc == ""
      ) {
        this.message = "Todos los campos son requeridos";
        this.snackbar = true;
        return false;
      }
      return true;
    },

    userAccountType() {
      this.axios.get("dashboard/getattributes").then((r) => {
        const rs = r.data.data;
        this.userUp.plan = rs.accountType;
        this.userUp.rol = rs.role;
      });
    },

    editarImg() {
      this.mostrar = !this.mostrar;
    },

    onFileSelected() {
      this.selectedFile = this.file;

      if (!this.file) {
        return;
      }
      const fr = new FileReader();
      fr.onload = () => (this.pictureModal = fr.result);
      fr.readAsDataURL(this.selectedFile);
    },

    onCancel() {
      this.pictureModal = null;
      this.modalImage = false;
      this.file = null;
    },

    onUpload() {
      if (this.selectedFile != null) {
        this.loadingSaveImage = true;

        const fd = new FormData();
        fd.append("user-photo", this.selectedFile, this.selectedFile.name);

        this.subido = true;
        this.axios
          .post("/profile/upload-photo", fd)
          .then(() => {
            this.list();
          })
          .catch(() => { });
      }
    },

    list() {
      this.axios.get(`/profile/info`).then((res) => {
        authSet("photo_user", res.data.photo);
        this.subido = false;
        this.file = null;
        this.loadingSaveImage = false;
        location.reload();
      });
    },

    getCountry() {
      this.axios.get("/public/countries").then((res) => {
        this.pais = res.data;

        for (var i = 0, l = this.pais.length; i < l; i++) {
          if (this.userUp.country == this.pais[i].id) {
            this.varCountryInit = this.pais[i];
          }
        }

        this.namePais = this.pais.map((element) => {
          return element.name;
        });
      });
    },
  },
};
</script>
