<template>
  <div class="book-page">
    <div v-if="loading" class="state-card">
      Cargando contenido del libro...
    </div>

    <div v-else-if="error" class="state-card state-card-error">
      {{ error }}
    </div>

    <template v-else>
      <!-- Título -->
      <section class="book-title-section">
        <h1>{{ book.title }}</h1>
        <p v-if="book.course_about">{{ book.course_about }}</p>
      </section>

      <!-- Hero principal -->
      <section
        class="book-hero"
      >
        <div class="book-cover-area">
          <div class="book-cover-glow"></div>

          <img
            class="book-cover"
            :src="absoluteUrl(book.url_portada)"
            :alt="book.title"
          />
        </div>

        <div class="book-summary-area">
          <article class="summary-card">
            <div class="summary-icon"><FileTextIcon /></div>

            <div>
              <h3>Descripción</h3>
              <p>{{ book.description || 'Sin descripción disponible.' }}</p>
            </div>
          </article>

          <article class="summary-card">
            <div class="summary-icon"><TargetIcon /></div>

            <div>
              <h3>Qué aprenderás</h3>

              <ul v-if="willLearnList.length">
                <li v-for="(item, index) in willLearnList" :key="'learn-' + index">
                  {{ item }}
                </li>
              </ul>

              <p v-else>No se registró información.</p>
            </div>
          </article>

          <article class="summary-card">
            <div class="summary-icon"><UsersIcon /></div>

            <div>
              <h3>¿Para quién es este contenido?</h3>

              <ul v-if="courseForList.length">
                <li v-for="(item, index) in courseForList" :key="'for-' + index">
                  {{ item }}
                </li>
              </ul>

              <p v-else>No se registró información.</p>
            </div>
          </article>

          <button
            class="download-all-btn"
            type="button"
            :disabled="!book.files || book.files.length === 0"
            @click="readOnline(book.files && book.files[0])"
          >
            <span><BookOpenIcon /></span>
            Leer en línea
          </button>

          <button
            v-if="canDownload"
            class="download-all-btn"
            type="button"
            :disabled="!book.files || book.files.length === 0"
            @click="downloadAllFiles"
          >
            <span><DownloadIcon /></span>
            Descargar todo
          </button>

          <p v-else class="online-only-note">
            <LockIcon size="14" /> Este libro es de lectura en línea. El autor no habilitó la descarga.
          </p>
        </div>
      </section>

      <!-- Tabs -->
      <nav class="book-tabs">
        <button
          type="button"
          :class="{ active: activeTab === 'contents' }"
          @click="activeTab = 'contents'"
        >
          Contenidos
        </button>

        <button
          type="button"
          :class="{ active: activeTab === 'about' }"
          @click="activeTab = 'about'"
        >
          Sobre
        </button>
      </nav>

      <!-- Contenido inferior -->
      <section class="book-body">
        <div class="book-main-card">
          <div v-if="activeTab === 'contents'">
            <div class="card-header">
              <h2>Archivos incluidos</h2>
              <p>
                Descarga los archivos del libro y accede a todo el contenido cuando quieras.
              </p>
            </div>

            <div v-if="book.files && book.files.length" class="files-table">
              <div class="files-table-head">
                <span>Nombre del archivo</span>
                <span class="d-flex justify-content-center">Formato</span>
                <span class="d-flex justify-content-center">Tamaño</span>
                <span></span>
              </div>

              <div
                v-for="file in book.files"
                :key="file.id"
                class="file-row"
              >
                <div class="file-name-cell">
                  <strong>{{ file.file_name }}</strong>
                </div>

                <div class="format-badge d-flex justify-content-center">
                  <span :class="'format-' + normalizedFileType(file.file_type)">
                    {{ normalizedFileType(file.file_type).toUpperCase() }}
                  </span>
                </div>

                <div class="file-size d-flex justify-content-center">
                  {{ formatSize(file.size) }}
                </div>

                <div class="file-actions">
                  <button
                    class="download-file-btn"
                    type="button"
                    title="Leer en línea"
                    @click="readOnline(file)"
                  >
                    <BookOpenIcon size="16" />
                  </button>

                  <button
                    v-if="canDownload"
                    class="download-file-btn"
                    type="button"
                    title="Descargar archivo"
                    @click="downloadFile(file)"
                  >
                    <DownloadIcon size="16" />
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="empty-files">
              Este libro aún no tiene archivos disponibles.
            </div>
          </div>

          <div v-else>
            <div class="card-header">
              <h2>Sobre este libro</h2>
              <p>
                {{ book.course_about || book.description || 'Sin información adicional.' }}
              </p>
            </div>
          </div>
        </div>

        <aside class="book-info-card">
          <h2>Información del libro</h2>

          <div class="info-item">
            <div class="info-icon info-icon-green">
              <UserIcon size="18" />
            </div>

            <div>
              <h4>Autor</h4>
              <p>{{ book.author || 'No especificado' }}</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon info-icon-orange">
              <ZapIcon size="18" />
            </div>

            <div>
              <h4>Acceso inmediato</h4>
              <p>Descarga disponible al completar tu compra</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon info-icon-blue">
              <CalendarIcon size="18" />
            </div>

            <div>
              <h4>Última actualización</h4>
              <p>{{ formatDate(book.updated_at) }}</p>
            </div>
          </div>
        </aside>
      </section>
    </template>

    <!-- Lector en línea -->
    <div v-if="readerFile" class="reader-backdrop" @click.self="closeReader">
      <div class="reader-dialog">
        <div class="reader-header">
          <div class="reader-titles">
            <h5>{{ book.title }}</h5>
            <span>{{ readerFile.file_name }}</span>
          </div>
          <button type="button" class="reader-close" @click="closeReader" aria-label="Cerrar">&times;</button>
        </div>

        <div class="reader-body">
          <iframe :src="readerFile.url + '#toolbar=0&navpanes=0'" title="Lector del libro"></iframe>
        </div>

        <div v-if="!canDownload" class="reader-footer">
          <LockIcon size="14" />
          <span>Lectura en línea. El autor de este libro no habilitó la descarga.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DownloadIcon,
  FileTextIcon,
  UsersIcon,
  TargetIcon,
  UserIcon,
  ZapIcon,
  CalendarIcon,
  BookOpenIcon,
  LockIcon
} from "vue-feather-icons";

export default {
  name: "BookContent",

  data() {
    return {
      book: null,
      loading: false,
      error: null,
      activeTab: "contents",
      readerFile: null,

      // Ajusta esto según tu proyecto.
      // Si tus URLs ya vienen completas, no afecta.
      backendUrl:
        process.env.VUE_APP_BACKEND_URL ||
        process.env.MIX_APP_URL ||
        "",
    };
  },

  components: {
    DownloadIcon,
    FileTextIcon,
    UsersIcon,
    TargetIcon,
    UserIcon,
    ZapIcon,
    CalendarIcon,
    BookOpenIcon,
    LockIcon
  },

  computed: {
    // El productor decide si su libro solo se lee en línea o además se descarga.
    canDownload() {
      return this.book && this.book.can_download === true;
    },

    willLearnList() {
      return this.toList(this.book && this.book.will_learn);
    },

    courseForList() {
      return this.toList(this.book && this.book.course_for);
    },
  },

  created() {
    this.getBook();
  },

  watch: {
    "$route.params.id"() {
      this.getBook();
    },
  },

  methods: {
    async getBook() {
      this.loading = true;
      this.error = null;

      const bookId = this.$route.params.id;

      await this.axios
        .get(`/course/${bookId}/book-access`)
        .then((response) => {
          const data = response.data.data || {};

          // El endpoint devuelve la ficha, los archivos con URL temporal y si
          // el productor permite descargarlos.
          this.book = {
            ...(data.book || {}),
            files: data.files || [],
            can_download: data.can_download === true,
          };
        })
        .catch((error) => {
          console.error(error);
          this.error =
            error.response && error.response.status === 403
              ? "Necesitas adquirir este libro para acceder a su contenido."
              : "No se pudo cargar el contenido del libro.";
        })
        .finally(() => {
          this.loading = false;
        });
    },

    readOnline(file) {
      if (!file || !file.url) return;

      this.readerFile = file;
      document.body.style.overflow = "hidden";
    },

    closeReader() {
      this.readerFile = null;
      document.body.style.overflow = "";
    },

    toList(value) {
      if (!value) return [];

      if (Array.isArray(value)) {
        return value.filter(Boolean);
      }

      return String(value)
        .split(/\r?\n|;|\|/)
        .map((item) => {
          return item
            .replace(/^[-•*]\s*/, "")
            .trim();
        })
        .filter(Boolean);
    },

    normalizedFileType(type) {
      if (!type) return "file";

      const cleanType = String(type).toLowerCase();

      if (cleanType.includes("pdf")) return "pdf";
      if (cleanType.includes("epub")) return "epub";

      return cleanType.replace(".", "");
    },

    absoluteUrl(url) {
      if (!url) return "";

      if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
      }

      const baseUrl = this.backendUrl.replace(/\/$/, "");
      const cleanUrl = url.startsWith("/") ? url : `/${url}`;

      return `${baseUrl}${cleanUrl}`;
    },

    formatSize(size) {
      if (!size) return "-";

      if (typeof size === "string" && isNaN(Number(size))) {
        return size;
      }

      const bytes = Number(size);

      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;

      return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    },

    formatDate(date) {
      if (!date) return "-";

      return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(date));
    },

    downloadFile(file) {
      const link = document.createElement("a");

      link.href = this.absoluteUrl(file.url);
      link.download = file.file_name || "archivo";
      link.target = "_blank";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    downloadAllFiles() {
      if (!this.book.files || this.book.files.length === 0) return;

      this.book.files.forEach((file, index) => {
        setTimeout(() => {
          this.downloadFile(file);
        }, index * 400);
      });
    },
  },

  beforeDestroy() {
    // Evita dejar el scroll bloqueado si se navega con el lector abierto.
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
/* Lector en línea */
.reader-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.reader-dialog {
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 1000px;
  height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
}

.reader-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 20px;
  border-bottom: 1px solid #e5e3dc;
}

.reader-titles h5 {
  margin: 0;
  font-weight: 800;
  font-size: 1rem;
  color: #18181b;
}

.reader-titles span {
  font-size: 0.8rem;
  color: #71717a;
}

.reader-close {
  background: transparent;
  border: none;
  font-size: 28px;
  line-height: 1;
  color: #71717a;
  cursor: pointer;
}

.reader-body {
  flex: 1;
  background: #52525b;
  min-height: 0;
}

.reader-body iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.reader-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-top: 1px solid #e5e3dc;
  background: #faf9f5;
  font-size: 0.82rem;
  color: #71717a;
}

.online-only-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0 0 0;
  font-size: 0.82rem;
  color: #71717a;
}

.book-page {
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding: 38px 40px 48px;
  color: #172033;
}

.book-title-section {
  margin-bottom: 22px;
}

.book-title-section h1 {
  margin: 0;
  font-size: 38px;
  line-height: 1.15;
  font-weight: 700;
  color: #0b0f18;
}

.book-title-section p {
  margin: 10px 0 0;
  font-size: 17px;
  color: #4d5a73;
}

/* Hero */

.book-hero {
  display: grid;
  grid-template-columns: 39% 61%;
  min-height: 410px;
  padding: 28px;
  border-radius: 13px;
  border: 1px solid #f1e4c8;
  overflow: hidden;

  background:
    radial-gradient(
      circle at 18% 58%,
      rgba(255, 193, 7, 0.28) 0%,
      rgba(255, 193, 7, 0.12) 35%,
      rgba(255, 255, 255, 0) 68%
    ),
    linear-gradient(
      105deg,
      rgba(255, 244, 214, 0.95) 0%,
      rgba(255, 255, 255, 0.92) 58%,
      rgba(255, 255, 255, 0.98) 100%
    );

  box-shadow: 0 18px 45px rgba(23, 32, 51, 0.05);
}

.book-cover-area {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 350px;
}

.book-cover-glow {
  position: absolute;
  width: 360px;
  height: 150px;
  bottom: 0px;
  border-radius: 50%;
  background: rgba(255, 193, 7, 0.18);
  filter: blur(5px);
}

.book-cover {
  position: relative;
  z-index: 2;
  width: auto;
  max-width: 245px;
  max-height: 330px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 22px 42px rgba(13, 20, 33, 0.24);
}

.book-summary-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 13px;
}

.summary-card {
  display: grid;
  grid-template-columns: 54px 1fr;
  gap: 16px;
  align-items: flex-start;

  padding: 18px 22px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(218, 223, 232, 0.85);
  box-shadow: 0 8px 22px rgba(23, 32, 51, 0.05);
}

.summary-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #079516;
  font-weight: 800;
  font-size: 22px;
  background: rgba(7, 149, 22, 0.11);
}

.summary-card h3 {
  margin: 0 0 7px;
  font-size: 16px;
  font-weight: 700;
  color: #101828;
}

.summary-card p,
.summary-card li {
  font-size: 14px;
  line-height: 1.6;
  color: #34405a;
}

.summary-card p {
  margin: 0;
}

.summary-card ul {
  margin: 0;
  padding-left: 18px;
}

.download-all-btn {
  width: 235px;
  height: 52px;
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  border: none;
  border-radius: 7px;
  background: #009914;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 153, 20, 0.22);
}

.download-all-btn:hover {
  background: #008712;
}

.download-all-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* Tabs */

.book-tabs {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  border-bottom: 1px solid #e3e8ef;
}

.book-tabs button {
  position: relative;
  padding: 16px 22px 15px;
  border: none;
  background: transparent;
  color: #26344d;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.book-tabs button.active {
  color: #009914;
}

.book-tabs button.active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 3px;
  border-radius: 5px 5px 0 0;
  background: #009914;
}

/* Body */

.book-body {
  display: grid;
  grid-template-columns: 1fr 330px;
  gap: 26px;
  margin-top: 12px;
}

.book-main-card,
.book-info-card {
  background: #ffffff;
  border: 1px solid #e6ebf2;
  border-radius: 13px;
  box-shadow: 0 14px 34px rgba(23, 32, 51, 0.05);
}

.book-main-card {
  padding: 26px;
}

.card-header {
  background: transparent;
  border: none;
  padding: 0;
}

.card-header h2,
.book-info-card h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #172033;
}

.card-header p {
  margin: 7px 0 22px;
  color: #526079;
  font-size: 14px;
}

.files-table {
  width: 100%;
}

.files-table-head,
.file-row {
  display: grid;
  grid-template-columns: 1fr 150px 140px 74px;
  align-items: center;
  column-gap: 18px;
}

.files-table-head {
  padding: 0 0 12px;
  border-bottom: 1px solid #e6ebf2;
  color: #58647a;
  font-size: 13px;
}

.file-row {
  min-height: 64px;
  padding: 0;
  margin-bottom: 8px;
  background: #ffffff;
}

.file-name-cell {
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
}

.file-name-cell strong {
  font-size: 14px;
  color: #202a3d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-icon {
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 9px;
  font-size: 9px;
  font-weight: 900;
}

.file-icon-pdf {
  background: #ffecec;
  color: #f22020;
}

.file-icon-epub {
  background: #e8f7ef;
  color: #00a86b;
}

.file-icon-file {
  background: #eef2f8;
  color: #4d5a73;
}

.format-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 54px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
}

.format-pdf {
  border-radius: 999px;
  padding: 4px 12px;
  color: #ff2323;
  background: #ffe4e4;
}

.format-epub {
  border-radius: 999px;
  padding: 4px 12px;
  color: #188b31;
  background: #dff2df;
}

.format-file {
  border-radius: 999px;
  padding: 4px 12px;
  color: #4d5a73;
  background: #eef2f8;
}

.file-size {
  color: #536179;
  font-size: 14px;
}

.file-actions {
  display: flex;
  justify-content: flex-end;
}

.download-file-btn {
  width: 48px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid #49bd55;
  color: #009914;
  background: #ffffff;
  line-height: 1;
  font-weight: 700;
  cursor: pointer;
}

.download-file-btn:hover {
  background: #f0fff2;
}

.empty-files {
  padding: 28px;
  border: 1px dashed #d5dce7;
  border-radius: 10px;
  color: #536179;
  text-align: center;
}

/* Info card */

.book-info-card {
  padding: 26px;
  align-self: start;
}

.info-item {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 14px;
  align-items: flex-start;
  margin-top: 24px;
}

.info-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 800;
}

.info-icon-green {
  color: #079516;
  background: rgba(7, 149, 22, 0.11);
}

.info-icon-orange {
  color: #ff8a00;
  background: rgba(255, 138, 0, 0.12);
}

.info-icon-blue {
  color: #1684ff;
  background: rgba(22, 132, 255, 0.12);
}

.info-item h4 {
  margin: 0 0 5px;
  color: #172033;
  font-size: 14px;
  font-weight: 700;
}

.info-item p {
  margin: 0;
  color: #526079;
  font-size: 14px;
  line-height: 1.45;
}

/* Estados */

.state-card {
  padding: 26px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e6ebf2;
  color: #526079;
}

.state-card-error {
  color: #c62828;
  background: #fff5f5;
  border-color: #ffcaca;
}

/* Responsive */

@media (max-width: 1100px) {
  .book-hero {
    grid-template-columns: 1fr;
  }

  .book-body {
    grid-template-columns: 1fr;
  }

  .book-summary-area {
    justify-content: flex-start;
  }
}

@media (max-width: 720px) {
  .book-page {
    padding: 24px 16px 36px;
  }

  .book-title-section h1 {
    font-size: 30px;
  }

  .book-hero {
    padding: 20px;
  }

  .files-table-head {
    display: none;
  }

  .file-row {
    grid-template-columns: 1fr 52px;
    row-gap: 10px;
  }

  .file-name-cell {
    grid-column: 1 / 2;
  }

  .file-row > div:nth-child(2),
  .file-row > div:nth-child(3) {
    display: none;
  }

  .file-actions {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  .download-all-btn {
    width: 100%;
  }
}
</style>