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
                </div>
              </div>
            </div>
            <div v-else-if="loading" class="empty-state py-4 text-center">
              <p class="empty-text mb-0">Cargando chats...</p>
            </div>
            <div v-else class="empty-state py-4 text-center">
              <v-icon color="#A1A1AA" size="28" class="mb-1">mdi-message-text-outline</v-icon>
              <p class="empty-text mb-0">Comunícate con tus profesores y suscriptores</p>
            </div>
          </div>

          <!-- Nuevos contactos -->
          <div class="new-contacts-section p-3 border-top-subtle">
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
      actualConversation: null,
      actualContact: null,
      actualMessageContent: [],
      message_input: "",
      sending: false,
      loading: true,
      messagesLoading: false,
      currentChannel: null,
      session_user_name: `${authGet("name_user") || ""} ${authGet("last_name_user") || ""}`.trim(),
    };
  },
  computed: {
    myId() {
      return Number(this.user && this.user.id);
    },
  },
  methods: {
    onAvatarError(e) {
      if (e && e.target) {
        e.target.src = this.defaultAvatar;
      }
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
          last_message: last ? last.message : "Sin mensajes anteriores",
          last_message_time: last ? last.created_at : null,
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

          if (
            this.actualConversation &&
            Number(this.actualConversation.id) === Number(event.conversation_id)
          ) {
            this.actualMessageContent.push(event);
            this.$nextTick(this.scrollToBottom);
          }

          const contact = this.contacts.find(
            (item) => item.conversationId === Number(event.conversation_id)
          );
          if (contact) {
            contact.last_message = event.message;
            contact.last_message_time = event.created_at;
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

    scrollToBottom() {
      const container = this.$refs.chatContent;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },

  async created() {
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
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
