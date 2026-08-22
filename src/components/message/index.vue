<template>
  <div class="chat-wrapper">
    <div class="chat-main-card">
      <div class="row g-0 h-100">
        <!-- Sidebar de contactos -->
        <div class="col-12 col-md-4 col-lg-3 sidebar-contacts">
          <!-- Perfil del usuario actual -->
          <div class="user-profile p-3 border-bottom-subtle d-flex align-items-center">
            <div class="position-relative mr-3 flex-shrink-0">
              <img :src="user && user.photo_user ? user.photo_user : defaultAvatar" class="avatar" :alt="session_user_name" @error="onAvatarError" />
              <span class="status-badge"></span>
            </div>
            <div class="user-info overflow-hidden">
              <h6 class="user-name mb-0 text-truncate">{{ session_user_name }}</h6>
              <span class="user-status-text">En línea</span>
            </div>
          </div>

          <!-- Lista de chats activos -->
          <div class="chat-list-section p-3">
            <h6 class="section-title mb-3">Chats</h6>

            <!-- Buscador: filtra chats existentes y nuevos contactos,
                 diferenciando coincidencias por usuario y por curso -->
            <div class="chat-search mb-3">
              <i class="bi bi-search chat-search-icon"></i>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control chat-search-input"
                placeholder="Buscar usuarios o cursos..."
                autocomplete="off"
              />
              <button
                v-if="isSearching"
                type="button"
                class="btn chat-search-clear"
                title="Limpiar búsqueda"
                @click="searchQuery = ''"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>

            <!-- Resultados agrupados mientras se busca -->
            <template v-if="isSearching">
              <div v-if="searchResults.users.length > 0" class="mb-3">
                <h6 class="section-title mb-2">
                  <i class="bi bi-person me-1" style="color: #18d600"></i>
                  Usuarios
                </h6>
                <div
                  v-for="item in searchResults.users"
                  :key="'u-' + item.key"
                  :class="['chat-item', { active: isActiveConversation(item.conversationId) }]"
                  @click="openResult(item)"
                >
                  <div class="d-flex align-items-center">
                    <div class="position-relative mr-3 flex-shrink-0">
                      <img :src="item.photo || defaultAvatar" class="avatar-sm" :alt="item.title" @error="onAvatarError" />
                      <span class="status-badge-sm"></span>
                    </div>
                    <div class="chat-item-info overflow-hidden">
                      <h6 class="contact-name mb-1 text-truncate">{{ item.title }}</h6>
                      <p class="last-message mb-0 text-truncate">{{ item.subtitle }}</p>
                    </div>
                    <div class="result-meta">
                      <span v-if="item.unread > 0" class="unread-badge">
                        {{ item.unread > 9 ? '9+' : item.unread }}
                      </span>
                      <i
                        :class="item.iconClass"
                        class="kind-icon"
                        :title="item.source === 'chat' ? 'Chat existente' : 'Nuevo contacto'"
                        :style="{ color: item.source === 'chat' ? '#18d600' : '#b4690e' }"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="searchResults.courses.length > 0" class="mb-3">
                <h6 class="section-title mb-2">
                  <i class="bi bi-journal-bookmark me-1" style="color: #b4690e"></i>
                  Cursos
                </h6>
                <div
                  v-for="item in searchResults.courses"
                  :key="'c-' + item.key"
                  :class="['chat-item', { active: isActiveConversation(item.conversationId) }]"
                  @click="openResult(item)"
                >
                  <div class="d-flex align-items-center">
                    <div class="position-relative mr-3 flex-shrink-0">
                      <img :src="item.photo || defaultAvatar" class="avatar-sm" :alt="item.title" @error="onAvatarError" />
                      <span class="status-badge-sm"></span>
                    </div>
                    <div class="chat-item-info overflow-hidden">
                      <h6 class="contact-name mb-1 text-truncate">{{ item.title }}</h6>
                      <p class="last-message mb-0 text-truncate">{{ item.subtitle }}</p>
                    </div>
                    <div class="result-meta">
                      <span v-if="item.unread > 0" class="unread-badge">
                        {{ item.unread > 9 ? '9+' : item.unread }}
                      </span>
                      <i
                        :class="item.iconClass"
                        class="kind-icon"
                        :title="item.source === 'chat' ? 'Chat existente' : 'Nuevo contacto'"
                        :style="{ color: item.source === 'chat' ? '#18d600' : '#b4690e' }"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="searchResults.users.length === 0 && searchResults.courses.length === 0"
                class="empty-state py-4 text-center"
              >
                <i class="bi bi-binoculars empty-icon"></i>
                <p class="empty-text mb-0">Sin resultados para "{{ searchQuery }}"</p>
              </div>
            </template>

            <!-- Listas normales cuando no se está buscando -->
            <template v-else>
            <!-- Vista PROFESOR: cursos que dicta con chats activos, en acordeón -->
            <template v-if="hasTeacherChats">
              <div v-if="courseGroups.length > 0" class="course-groups">
                <div v-for="group in courseGroups" :key="'g-' + group.key" class="course-group">
                  <div class="course-group-header" @click="toggleGroup(group.key)">
                    <i :class="['bi', 'group-chevron', expandedGroups[group.key] ? 'bi-chevron-down' : 'bi-chevron-right']"></i>
                    <span class="group-title text-truncate" :title="group.title">{{ group.title }}</span>
                    <span v-if="group.unread > 0" class="unread-badge group-unread">
                      {{ group.unread > 9 ? '9+' : group.unread }}
                    </span>
                    <span class="group-count">{{ group.conversations.length }}</span>
                  </div>
                  <div v-show="expandedGroups[group.key]" class="course-group-body">
                    <div
                      v-for="contact in group.conversations"
                      :key="contact.conversationId"
                      :class="['chat-item', { active: contact.active }]"
                      @click="cambiarChat(contact.conversationId)"
                    >
                      <div class="d-flex align-items-center">
                        <div class="position-relative mr-3 flex-shrink-0">
                          <img :src="contact.photo || defaultAvatar" class="avatar-sm" :alt="contact.name" @error="onAvatarError" />
                          <span class="status-badge-sm"></span>
                        </div>
                        <div class="chat-item-info overflow-hidden">
                          <h6 class="contact-name mb-1 text-truncate">{{ contact.name }} {{ contact.lastname }}</h6>
                          <p class="last-message mb-0 text-truncate">{{ contact.last_message }}</p>
                        </div>
                        <span v-if="contact.unread > 0" class="unread-badge ml-auto">
                          {{ contact.unread > 9 ? '9+' : contact.unread }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="loading" class="empty-state py-4 text-center">
                <p class="empty-text mb-0">Cargando chats...</p>
              </div>
              <div v-else class="empty-state py-4 text-center">
                <i class="bi bi-chat-dots empty-icon"></i>
                <p class="empty-text mb-0">Aún no tienes chats activos con tus estudiantes</p>
              </div>
            </template>

            <!-- Vista ESTUDIANTE: lista plana de chats (igual que siempre) -->
            <template v-else>
            <div v-if="contacts.length > 0" class="chat-list">
              <div
                v-for="contact in contacts"
                :key="contact.conversationId"
                :class="['chat-item', { active: contact.active }]"
                @click="cambiarChat(contact.conversationId)"
              >
                <div class="d-flex align-items-center">
                  <div class="position-relative mr-3 flex-shrink-0">
                    <img :src="contact.photo || defaultAvatar" class="avatar-sm" :alt="contact.name" @error="onAvatarError" />
                    <span class="status-badge-sm"></span>
                  </div>
                  <div class="chat-item-info overflow-hidden">
                    <h6 class="contact-name mb-1 text-truncate">{{ contact.name }} {{ contact.lastname }}</h6>
                    <p class="last-message mb-0 text-truncate">{{ contact.last_message }}</p>
                  </div>
                  <span v-if="contact.unread > 0" class="unread-badge ml-auto">
                    {{ contact.unread > 9 ? '9+' : contact.unread }}
                  </span>
                </div>
              </div>
            </div>
            <div v-else-if="loading" class="empty-state py-4 text-center">
              <p class="empty-text mb-0">Cargando chats...</p>
            </div>
            <div v-else class="empty-state py-4 text-center">
              <i class="bi bi-chat-dots empty-icon"></i>
              <p class="empty-text mb-0">Comunícate con tus profesores y suscriptores</p>
            </div>
            </template>
            </template>
          </div>

          <!-- Nuevos contactos -->
          <div v-if="!isSearching" class="new-contacts-section p-3 border-top-subtle">
            <h6 class="section-title mb-2">Nuevos contactos</h6>
            <div v-if="contacts2.length > 0" class="new-contacts-list">
              <div v-for="contact in contacts2" :key="contact.course_id" class="contact-item" @click="openConversation(contact.course_id)">
                <div class="d-flex align-items-center">
                  <img :src="contact.photo || defaultAvatar" class="avatar-sm mr-3 flex-shrink-0" :alt="contact.name" @error="onAvatarError" />
                  <div class="overflow-hidden">
                    <h6 class="contact-name mb-0 text-truncate">{{ contact.name }}</h6>
                    <p class="last-message mb-0 text-truncate">{{ contact.course_title }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="empty-state py-2 text-center">
              <p class="empty-text mb-0">Necesitas estar inscrito en un curso</p>
            </div>
          </div>
        </div>

        <!-- Área principal del chat -->
        <div class="col-12 col-md-8 col-lg-9 main-chat">
          <div v-if="actualContact && actualContact.id" class="h-100 d-flex flex-column">
            <!-- Encabezado del chat -->
            <div class="chat-header p-3 border-bottom-subtle d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <img :src="actualContact.photo || defaultAvatar" class="avatar-sm mr-3 flex-shrink-0" :alt="actualContact.name" @error="onAvatarError" />
                <div>
                  <h6 class="chat-header-name mb-0">
                    {{ actualContact.name }} {{ actualContact.lastname || '' }}
                  </h6>
                  <span class="chat-header-status">
                    <span class="status-dot mr-1"></span>
                    {{ actualContact.course_title || 'Activo ahora' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Contenido del chat -->
            <div class="chat-content p-4" ref="chatContent">
              <div v-if="messagesLoading" class="text-center py-5">
                <p class="empty-text mb-0">Cargando mensajes...</p>
              </div>
              <div v-else-if="actualMessageContent.length == 0" class="empty-chat text-center my-auto py-5">
                <v-icon color="var(--primary-color)" size="48" class="mb-2">mdi-hand-wave-outline</v-icon>
                <h5 class="empty-chat-title mb-1">¡Saluda a {{ actualContact.name }}!</h5>
                <p class="empty-chat-sub mb-0">Envía un mensaje para iniciar la conversación</p>
              </div>

              <div v-else class="messages-container">
                <div
                  v-for="message in actualMessageContent"
                  :key="message.id"
                  :class="[
                    'message-group d-flex flex-column',
                    isMine(message.transmitter_id) ? 'message-outgoing' : 'message-incoming'
                  ]"
                >
                  <span class="sender-name mb-1">
                    {{ isMine(message.transmitter_id) ? 'Tú' : actualContact.name }}
                  </span>

                  <div class="message-bubble shadow-sm">
                    <div class="message-text">
                      {{ message.message }}
                    </div>
                  </div>

                  <span class="message-time mt-1">
                    {{ formatTime(message.created_at) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Input del mensaje -->
            <div class="message-input-wrapper p-3 border-top-subtle">
              <div class="input-group d-flex align-items-center">
                <input
                  type="text"
                  class="form-control chat-input"
                  v-model="message_input"
                  @keyup.enter="sendMessage"
                  placeholder="Escribe un mensaje..."
                  :disabled="sending"
                />
                <button class="btn send-btn ml-2" @click="sendMessage" :disabled="sending">
                  <v-icon color="#FFFFFF" size="20">mdi-send</v-icon>
                </button>
              </div>
            </div>
          </div>

          <!-- Estado inicial sin chat seleccionado -->
          <div v-else class="h-100 d-flex flex-column align-items-center justify-content-center p-5 text-center">
            <v-icon color="#A1A1AA" size="56" class="mb-3">mdi-forum-outline</v-icon>
            <h5 class="empty-chat-title mb-2">Selecciona una conversación</h5>
            <p class="empty-chat-sub">Elige un contacto de la lista para empezar a chatear</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { authGet } from "@/helpers/authStorage";
import echoHelper from "@/helpers/echo";

export default {
  props: {
    user: Object,
  },
  name: "message",
  data() {
    return {
      moment: moment,
      defaultAvatar: "https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240",
      conversations: [],
      contacts: [],
      contacts2: [],
      searchQuery: "",
      expandedGroups: {},
      actualConversation: null,
      actualContact: null,
      actualMessageContent: [],
      message_input: "",
      sending: false,
      loading: true,
      messagesLoading: false,
      currentChannel: null,
      previewChannel: null,
      session_user_name: `${authGet("name_user") || ""} ${authGet("last_name_user") || ""}`.trim(),
    };
  },
  computed: {
    myId() {
      return Number(this.user && this.user.id);
    },

    isSearching() {
      return !!(this.searchQuery && this.searchQuery.trim());
    },

    // Vista de profesor: se detecta por datos (conversaciones donde el
    // usuario es el teacher), no por id_account_type, porque en esta
    // plataforma un profesor puede tener el mismo account_type que un
    // estudiante.
    hasTeacherChats() {
      return this.contacts.some(
        (contact) => Number(contact.teacherId) === this.myId
      );
    },

    // Cursos que dicta el profesor con chats activos, agrupados para el
    // acordeón. Los cursos sin chats activos no aparecen (no existen en
    // conversations). Cualquier chat donde NO es el profesor va al final
    // en un grupo "Mis otros chats" para no perder información.
    courseGroups() {
      const dictated = [];
      const others = [];
      this.contacts.forEach((contact) => {
        if (Number(contact.teacherId) === this.myId) {
          dictated.push(contact);
        } else {
          others.push(contact);
        }
      });

      const map = new Map();
      dictated.forEach((contact) => {
        const key = contact.course_id != null ? contact.course_id : "sin-curso";
        if (!map.has(key)) {
          map.set(key, {
            key,
            title: contact.course_title || "Curso",
            conversations: [],
          });
        }
        map.get(key).conversations.push(contact);
      });

      const groups = Array.from(map.values()).map((group) => ({
        ...group,
        unread: group.conversations.reduce(
          (total, contact) => total + Number(contact.unread || 0),
          0
        ),
      }));

      if (others.length > 0) {
        groups.push({
          key: "__otros__",
          title: "Mis otros chats",
          conversations: others,
          unread: others.reduce(
            (total, contact) => total + Number(contact.unread || 0),
            0
          ),
        });
      }

      return groups;
    },

    // Resultados agrupados por tipo de coincidencia: usuarios (nombre del
    // contacto/profesor) y cursos (título del curso). Cubre tanto chats
    // existentes como nuevos contactos, sin llamadas al servidor.
    searchResults() {
      const query = this.normalizeText(this.searchQuery);
      if (!query) {
        return { users: [], courses: [] };
      }

      const users = [];
      const courses = [];

      this.contacts.forEach((contact) => {
        const fullName = this.normalizeText(`${contact.name} ${contact.lastname}`);
        const courseTitle = this.normalizeText(contact.course_title);
        const base = {
          photo: contact.photo,
          unread: Number(contact.unread || 0),
          conversationId: contact.conversationId,
          source: "chat",
        };

        if (fullName.includes(query)) {
          users.push({
            ...base,
            key: `chat-${contact.conversationId}`,
            iconClass: "bi bi-chat-text",
            title: `${contact.name} ${contact.lastname}`.trim(),
            subtitle: contact.last_message,
          });
        }
        if (courseTitle.includes(query)) {
          courses.push({
            ...base,
            key: `chat-course-${contact.conversationId}`,
            iconClass: "bi bi-journal-text",
            title: contact.course_title || "Curso",
            subtitle: `${contact.name} ${contact.lastname}`.trim(),
          });
        }
      });

      this.contacts2.forEach((course) => {
        const teacherName = this.normalizeText(course.name);
        const courseTitle = this.normalizeText(course.course_title);
        const base = {
          photo: course.photo,
          unread: 0,
          courseId: course.course_id,
          source: "new",
        };

        if (teacherName.includes(query)) {
          users.push({
            ...base,
            key: `new-${course.course_id}`,
            iconClass: "bi bi-chat-plus",
            title: course.name || "Usuario",
            subtitle: course.course_title,
          });
        }
        if (courseTitle.includes(query)) {
          courses.push({
            ...base,
            key: `new-course-${course.course_id}`,
            iconClass: "bi bi-bookmark-plus",
            title: course.course_title || "Curso",
            subtitle: course.name || "",
          });
        }
      });

      return { users, courses };
    },
  },
  methods: {
    onAvatarError(e) {
      if (e && e.target) {
        e.target.src = this.defaultAvatar;
      }
    },

    // Normaliza para comparar: minúsculas y sin tildes/acentos.
    normalizeText(value) {
      return String(value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    },

    isActiveConversation(conversationId) {
      return (
        conversationId != null &&
        this.actualConversation &&
        Number(this.actualConversation.id) === Number(conversationId)
      );
    },

    openResult(item) {
      if (item.conversationId != null) {
        this.cambiarChat(item.conversationId);
      } else if (item.courseId != null) {
        this.openConversation(item.courseId);
      }
      this.searchQuery = "";
    },

    // Despliega/colapsa un curso del acordeón del profesor.
    toggleGroup(groupKey) {
      this.$set(this.expandedGroups, groupKey, !this.expandedGroups[groupKey]);
    },

    isMine(transmitterId) {
      return Number(transmitterId) === this.myId;
    },

    formatTime(createdAt) {
      return createdAt ? moment(createdAt).format("hh:mm A") : "";
    },

    async listConversations() {
      const response = await this.axios.get("conversations");
      this.conversations = response.data.data || [];
      this.buildContacts();
    },

    buildContacts() {
      this.contacts = this.conversations.map((conversation) => {
        const other = Number(conversation.student_id) === this.myId
          ? conversation.teacher
          : conversation.student;
        const last = conversation.latest_message;

        return {
          conversationId: conversation.id,
          id: other ? other.id : null,
          name: other ? other.name || "" : "",
          lastname: other ? other.last_name || "" : "",
          photo: other && other.photo ? other.photo : null,
          course_title: conversation.course ? conversation.course.title : "",
          course_id: conversation.course_id,
          teacherId: conversation.teacher_id,
          studentId: conversation.student_id,
          last_message: last ? last.message : "Sin mensajes anteriores",
          last_message_time: last ? last.created_at : null,
          unread: Number(conversation.unread_messages_count) || 0,
          active: false,
        };
      });

      if (this.actualConversation) {
        const selected = this.contacts.find(
          (contact) => contact.conversationId === this.actualConversation.id
        );
        if (selected) {
          selected.active = true;
        }
      }
    },

    async listAvailableCourses() {
      try {
        const response = await this.axios.get("course/purchased-courses");
        const courses = response.data.data || [];
        const withConversation = new Set(
          this.conversations.map((conversation) => String(conversation.course_id))
        );

        this.contacts2 = courses
          .filter((course) => !withConversation.has(String(course.id)))
          .map((course) => ({
            course_id: course.id,
            id: course.author_id,
            name: `${course.author_name || ""} ${course.author_lastname || ""}`.trim() || course.title,
            photo: course.author_photo || null,
            course_title: course.title,
          }));
      } catch (error) {
        console.error("Error al cargar cursos comprados:", error);
        this.contacts2 = [];
      }
    },

    async cambiarChat(conversationId) {
      const contact = this.contacts.find(
        (item) => item.conversationId === conversationId
      );
      if (!contact) {
        return;
      }

      this.actualConversation =
        this.conversations.find((item) => item.id === conversationId) ||
        { id: conversationId };
      this.actualContact = contact;
      this.contacts.forEach((item) => {
        item.active = item.conversationId === conversationId;
      });

      this.leaveChannel();
      this.messagesLoading = true;
      this.actualMessageContent = [];

      try {
        const response = await this.axios.get(`conversations/${conversationId}/messages`);
        this.actualMessageContent = response.data.data || [];
        // Al abrirse la conversación el backend marca los mensajes como leídos.
        if (contact) {
          contact.unread = 0;
        }
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
        this.actualMessageContent = [];
      } finally {
        this.messagesLoading = false;
        this.$nextTick(this.scrollToBottom);
      }

      this.joinChannel(conversationId);
    },

    async sendMessage() {
      if (!this.actualConversation || this.sending) {
        return;
      }
      const text = (this.message_input || "").trim();
      if (!text) {
        return;
      }

      this.sending = true;
      this.message_input = "";

      try {
        const response = await this.axios.post(
          `conversations/${this.actualConversation.id}/messages`,
          { message: text }
        );
        const message = response.data.data;

        this.actualMessageContent.push(message);

        const contact = this.contacts.find(
          (item) => item.conversationId === this.actualConversation.id
        );
        if (contact) {
          contact.last_message = message.message;
          contact.last_message_time = message.created_at;
        }

        this.$nextTick(this.scrollToBottom);
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
        this.message_input = text;
      } finally {
        this.sending = false;
      }
    },

    async openConversation(courseId) {
      try {
        await this.axios.post("conversations", { course_id: courseId });
        await this.listConversations();
        await this.listAvailableCourses();

        const contact = this.contacts.find(
          (item) => Number(item.course_id) === Number(courseId)
        );
        if (contact) {
          await this.cambiarChat(contact.conversationId);
        }
      } catch (error) {
        console.error("Error al abrir conversación:", error);
      }
    },

    joinChannel(conversationId) {
      try {
        const Echo = echoHelper.get();
        this.leaveChannel();

        this.currentChannel = Echo.private(
          `chat.conversation.${conversationId}`
        ).listen(".message.sent", (event) => {
          if (this.isMine(event.transmitter_id)) {
            return;
          }

          const isCurrent =
            this.actualConversation &&
            Number(this.actualConversation.id) === Number(event.conversation_id);

          if (isCurrent) {
            this.actualMessageContent.push(event);
            this.$nextTick(this.scrollToBottom);
            // El chat está abierto: marcar como leído en el servidor.
            this.axios
              .post(`conversations/${event.conversation_id}/read`)
              .catch(() => {});
          } else {
            const pending = this.contacts.find(
              (item) => item.conversationId === Number(event.conversation_id)
            );
            if (pending) {
              pending.unread = Number(pending.unread || 0) + 1;
            }
          }

          const contact = this.contacts.find(
            (item) => item.conversationId === Number(event.conversation_id)
          );
          if (contact) {
            contact.last_message = event.message;
            contact.last_message_time = event.created_at;
          }
        }).listen(".messages.read", (event) => {
          // Otro dispositivo del mismo usuario marcó la conversación como leída.
          if (Number(event.reader_id) !== this.myId) {
            return;
          }
          const contact = this.contacts.find(
            (item) => item.conversationId === Number(event.conversation_id)
          );
          if (contact) {
            contact.unread = 0;
          }
        });
      } catch (error) {
        console.warn("No se pudo conectar al canal en tiempo real:", error);
        this.currentChannel = null;
      }
    },

    leaveChannel() {
      if (this.currentChannel && window.Echo) {
        window.Echo.leaveChannel(this.currentChannel.name);
      }
      this.currentChannel = null;
    },

    // Previews en vivo de conversaciones NO abiertas: el canal del chat
    // abierto solo cubre la conversación activa; este canal del usuario
    // actualiza preview y globo del resto en tiempo real.
    joinUserChannel() {
      try {
        if (!this.myId) return;
        const Echo = echoHelper.get();
        this.leavePreviewChannel();
        this.previewChannel = Echo.private(
          `App.Models.User.${this.myId}`
        ).listen(".message.received", (event) => {
          const convId = Number(event.conversation_id);
          // La conversación abierta la maneja su propio canal (.message.sent).
          if (
            this.actualConversation &&
            Number(this.actualConversation.id) === convId
          ) {
            return;
          }
          const contact = this.contacts.find(
            (item) => item.conversationId === convId
          );
          if (!contact) return;
          contact.last_message = event.message;
          contact.last_message_time = event.created_at;
          contact.unread = Number(contact.unread || 0) + 1;
        });
      } catch (error) {
        console.warn("No se pudo suscribir al canal de previews:", error);
        this.previewChannel = null;
      }
    },

    leavePreviewChannel() {
      if (this.previewChannel && window.Echo) {
        window.Echo.leaveChannel(this.previewChannel.name);
      }
      this.previewChannel = null;
    },

    scrollToBottom() {
      const container = this.$refs.chatContent;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },

  async created() {
    this.joinUserChannel();
    this.loading = true;
    try {
      await this.listConversations();

      if (this.contacts.length > 0 && !this.actualConversation) {
        await this.cambiarChat(this.contacts[0].conversationId);
      }
    } catch (error) {
      console.error("Error cargando conversaciones:", error);
    } finally {
      this.loading = false;
    }

    await this.listAvailableCourses();
  },

  beforeDestroy() {
    this.leaveChannel();
    this.leavePreviewChannel();
  },
};
</script>

<style scoped>
@import "./style.css";

/* Badge de mensajes sin leer en la lista de chats */
.unread-badge {
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #18d600;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  flex-shrink: 0;
  margin-left: auto;
}

/* Buscador del sidebar */
.chat-search {
  position: relative;
}
.chat-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #a1a1aa;
  font-size: 0.9rem;
  pointer-events: none;
  z-index: 5;
}
.chat-search-input {
  padding-left: 34px;
  padding-right: 32px;
  border-radius: 18px;
  border-color: #e4e4e7;
  font-size: 0.85rem;
  height: 36px;
}
.chat-search-input:focus {
  border-color: #18d600;
  box-shadow: 0 0 0 0.15rem rgba(24, 214, 0, 0.15);
}
.chat-search-clear {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: #a1a1aa;
  padding: 2px 6px;
  font-size: 0.75rem;
  line-height: 1;
}
.chat-search-clear:hover {
  color: #52525b;
}
.empty-icon {
  font-size: 28px;
  color: #a1a1aa;
  display: block;
  margin-bottom: 4px;
}

/* Icono de tipo (chat existente / nuevo contacto) alineado a la derecha */
.result-meta {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.result-meta .unread-badge {
  margin-left: 0;
}
.kind-icon {
  font-size: 1rem;
  line-height: 1;
}

/* Acordeón de cursos para la vista del profesor */
.course-group {
  margin-bottom: 6px;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fafafa;
}
.course-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  cursor: pointer;
  user-select: none;
  background-color: #f4f4f5;
  transition: background-color 0.15s ease;
}
.course-group-header:hover {
  background-color: #ebebed;
}
.group-chevron {
  font-size: 0.75rem;
  color: #71717a;
  flex-shrink: 0;
}
.group-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #3f3f46;
  min-width: 0;
  flex: 1 1 auto;
}
.group-unread {
  margin-left: 0;
}
.group-count {
  min-width: 22px;
  height: 20px;
  padding: 0 7px;
  border-radius: 10px;
  background-color: #e4e4e7;
  color: #52525b;
  font-size: 0.72rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.course-group-body {
  padding: 4px 4px 4px 10px;
  border-top: 1px solid #ececef;
}
</style>
