<template>
  <div v-if="show" class="modal fade show d-block share-modal-container" tabindex="-1" style="background: rgba(0,0,0,0.5); z-index: 9999;">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content tw-rounded-xl tw-border-0 tw-shadow-2xl dark:tw-bg-gray-800">
        <div class="modal-header tw-border-b tw-border-gray-200 dark:tw-border-gray-700 share-modal-header">
          <h5 class="modal-title tw-font-bold share-modal-title">Compartir Curso</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body tw-p-6">
          <p class="share-modal-text tw-mb-4">
            Copia este enlace para compartir el curso. Cualquier persona que se registre usando este enlace formará parte de tu red.
          </p>
          
          <div class="input-group mb-4">
            <input type="text" class="form-control share-modal-input" :value="shareLink" readonly ref="linkInput">
            <button class="btn tw-text-white tw-font-semibold hover:tw-opacity-90" style="background-color: var(--primary-color, #18d600); border-color: var(--primary-color, #18d600);" type="button" @click="copyLink">
              <i class="fas fa-copy me-1"></i> Copiar
            </button>
          </div>

          <p class="tw-text-sm tw-font-semibold share-modal-text-sm tw-mb-3">Compartir en redes sociales:</p>
          <div class="tw-flex tw-gap-3">
            <a :href="whatsappLink" target="_blank" style="background-color: #25D366;" class="btn tw-text-white hover:tw-opacity-90 tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center">
              <i class="fab fa-whatsapp"></i>
            </a>
            <a :href="facebookLink" target="_blank" style="background-color: #1877F2;" class="btn tw-text-white hover:tw-opacity-90 tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a :href="twitterLink" target="_blank" style="background-color: #1DA1F2;" class="btn tw-text-white hover:tw-opacity-90 tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center">
              <i class="fab fa-twitter"></i>
            </a>
            <a :href="linkedinLink" target="_blank" style="background-color: #0A66C2;" class="btn tw-text-white hover:tw-opacity-90 tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" @click="copyLink" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);" class="btn tw-text-white hover:tw-opacity-90 tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center" title="Copiar enlace e ir a Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a :href="messengerLink" target="_blank" style="background-color: #0084FF;" class="btn tw-text-white hover:tw-opacity-90 tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center" title="Compartir en Messenger">
              <i class="fab fa-facebook-messenger"></i>
            </a>
            <a :href="telegramLink" target="_blank" style="background-color: #24A1DE;" class="btn tw-text-white hover:tw-opacity-90 tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center" title="Compartir en Telegram">
              <i class="fab fa-telegram-plane"></i>
            </a>
          </div>
          
          <div v-if="copied" class="alert alert-success tw-mt-4 tw-mb-0 tw-py-2 tw-text-sm">
            ¡Enlace copiado al portapapeles!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    shareLink: {
      type: String,
      required: true
    },
    courseTitle: {
      type: String,
      default: 'este curso'
    }
  },
  data() {
    return {
      copied: false
    }
  },
  computed: {
    encodedLink() {
      return encodeURIComponent(this.shareLink);
    },
    encodedText() {
      return encodeURIComponent(`Te invito a conocer ${this.courseTitle} en Promolíder: `);
    },
    whatsappLink() {
      return `https://api.whatsapp.com/send?text=${this.encodedText}${this.encodedLink}`;
    },
    facebookLink() {
      return `https://www.facebook.com/sharer/sharer.php?u=${this.encodedLink}`;
    },
    twitterLink() {
      return `https://twitter.com/intent/tweet?text=${this.encodedText}&url=${this.encodedLink}`;
    },
    linkedinLink() {
      return `https://www.linkedin.com/sharing/share-offsite/?url=${this.encodedLink}`;
    },
    messengerLink() {
      return `fb-messenger://share/?link=${this.encodedLink}`;
    },
    telegramLink() {
      return `https://t.me/share/url?url=${this.encodedLink}&text=${this.encodedText}`;
    }
  },
  methods: {
    closeModal() {
      this.copied = false;
      this.$emit('close');
    },
    copyLink() {
      const input = this.$refs.linkInput;
      input.select();
      input.setSelectionRange(0, 99999); 
      navigator.clipboard.writeText(this.shareLink).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 3000);
      }).catch(err => {
        console.error('Error al copiar: ', err);
      });
    }
  }
}
</script>

<style scoped>
.modal.show {
  backdrop-filter: blur(4px);
}
<style>
.share-modal-container .modal-content {
  transition: all 0.3s ease;
}

/* Dark Mode Overrides for ShareModal */
.dark-mode .share-modal-container .modal-content {
  background-color: #1f2937 !important;
  border-color: #374151 !important;
}
.dark-mode .share-modal-container .modal-header {
  border-bottom-color: #374151 !important;
}
.dark-mode .share-modal-container .modal-title {
  color: #f9fafb !important;
}
.dark-mode .share-modal-container .share-modal-text {
  color: #d1d5db !important;
}
.dark-mode .share-modal-container .share-modal-text-sm {
  color: #d1d5db !important;
}
.dark-mode .share-modal-container .share-modal-input {
  background-color: #111827 !important;
  border-color: #374151 !important;
  color: #f9fafb !important;
}
.dark-mode .share-modal-container .btn-close {
  filter: invert(1) grayscale(100%) brightness(200%);
}
</style>
