<template>
  <div class="docente-card-wrapper mb-4">
    <div class="docente-card bg-white p-3 shadow-sm" style="border-radius: 20px;">
      <div class="d-flex align-items-center">
        <!-- Avatar del docente -->
        <div class="avatar-container mr-3 flex-shrink-0">
          <img 
            :src="formattedAvatar" 
            alt="Imagen del docente" 
            class="docente-avatar" 
            @error="onAvatarError"
          />
        </div>

        <!-- Información del docente -->
        <div class="docente-info overflow-hidden flex-grow-1">
          <div class="d-flex align-items-center justify-content-between mb-1">
            <span class="badge badge-emerald-subtle">
              <v-icon size="14" color="#10B981" class="mr-1">mdi-account-school-outline</v-icon>
              Docente
            </span>
          </div>

          <h6 class="docente-name text-truncate mb-1 font-weight-bold text-dark">
            {{ nameProductor || 'Cargando docente...' }}
          </h6>

          <p class="docente-email text-truncate mb-0 text-muted small" v-if="emailProductor">
            <v-icon size="13" color="#6B7280" class="mr-1">mdi-email-outline</v-icon>
            {{ emailProductor }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Docente",
  data() {
    return {
      courseInfo: [],
      imgProductor: null,
      nameProductor: "",
      emailProductor: "",
      defaultAvatar: require("@/assets/perfil-del-usuario.png"),
    };
  },
  computed: {
    ...mapState("course", ["lesson", "renderVideo", "courseSelect"]),
    formattedAvatar() {
      if (!this.imgProductor) return this.defaultAvatar;
      if (this.imgProductor.startsWith("http")) return this.imgProductor;
      return "https://promolider-storage-user.s3-accelerate.amazonaws.com/" + this.imgProductor;
    }
  },
  methods: {
    onAvatarError(e) {
      if (e && e.target) {
        e.target.src = this.defaultAvatar;
      }
    },
    async getCourseInfo() {
      const courseId = this.$route.query.course;
      if (!courseId) return;
      
      try {
        const response = await this.axios.get("course/details/" + courseId);
        if (response && response.data && response.data.data) {
          this.courseInfo = response.data.data;
          
          if (this.courseInfo.user_id) {
            const res = await this.axios.get(`user/show?id=${this.courseInfo.user_id}`);
            if (res && res.data) {
              this.nameProductor = res.data.fullName || res.data.name || "Docente";
              this.emailProductor = res.data.email || "";
              this.imgProductor = res.data.photo || null;
            }
          }
        }
      } catch (error) {
        console.warn("Error al cargar la información del docente:", error);
      }
    },
  },
  mounted() {
    this.getCourseInfo();
  },
};
</script>

<style scoped>
.docente-card {
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.docente-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #10B981;
}

.badge-emerald-subtle {
  background-color: #ECFDF5;
  color: #059669;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
}

.docente-name {
  font-size: 0.95rem;
}

.docente-email {
  font-size: 0.825rem;
}
</style>
