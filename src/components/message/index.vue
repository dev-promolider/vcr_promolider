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
                :key="contact.id"
                :class="['chat-item', { active: actualContact && actualContact.id === contact.id }]"
                @click="cambiarChat(idOne, contact.id)"
              >
                <div class="d-flex align-items-center">
                  <div class="position-relative mr-3 flex-shrink-0">
                    <img :src="contact.photo || defaultAvatar" class="avatar-sm" :alt="contact.name" @error="onAvatarError" />
                    <span class="status-badge-sm"></span>
                  </div>
                  <div class="chat-item-info overflow-hidden">
                    <h6 class="contact-name mb-1 text-truncate">{{ contact.name }}</h6>
                    <p class="last-message mb-0 text-truncate">{{ contact.last_message || 'Sin mensajes anteriores' }}</p>
                  </div>
                </div>
              </div>
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
              <div v-for="contact in contacts2" :key="contact.id" class="contact-item" @click="sendMessage2(contact.id)">
                <div class="d-flex align-items-center">
                  <img :src="contact.photo || defaultAvatar" class="avatar-sm mr-3 flex-shrink-0" :alt="contact.name" @error="onAvatarError" />
                  <h6 class="contact-name mb-0 text-truncate">{{ contact.name }}</h6>
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
                    <span class="status-dot mr-1"></span> Activo ahora
                  </span>
                </div>
              </div>
            </div>

            <!-- Contenido del chat -->
            <div class="chat-content p-4">
              <div v-if="actualMessageContent.length == 0" class="empty-chat text-center my-auto py-5">
                <v-icon color="#10B981" size="48" class="mb-2">mdi-hand-wave-outline</v-icon>
                <h5 class="empty-chat-title mb-1">¡Saluda a {{ actualContact.name }}!</h5>
                <p class="empty-chat-sub mb-0">Envía un mensaje para iniciar la conversación</p>
              </div>

              <div v-else class="messages-container">
                <div
                  v-for="message in actualMessageContent"
                  :key="message.id"
                  :class="[
                    'message-group d-flex flex-column',
                    message.transmitter_id == user.id ? 'message-outgoing' : 'message-incoming'
                  ]"
                >
                  <!-- Nombre del remitente -->
                  <span class="sender-name mb-1">
                    {{ message.transmitter_id == user.id ? 'Tú' : actualContact.name }}
                  </span>

                  <!-- Burbuja de mensaje -->
                  <div class="message-bubble shadow-sm">
                    <div class="message-text">
                      {{ message.message }}
                    </div>
                  </div>

                  <!-- Estampa de tiempo -->
                  <span class="message-time mt-1">
                    {{ moment(message.created_at).format("hh:mm A") }}
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
                  @keyup.enter="sendMessage(actualContact.id)"
                  placeholder="Escribe un mensaje..."
                />
                <button class="btn send-btn ml-2" @click="sendMessage(actualContact.id)">
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
import Echo from "laravel-echo";
import moment from "moment";
import { authGet } from "@/helpers/authStorage";

window.Pusher = require("pusher-js");

export default {
  props: {
    user: Object,
  },
  name: "message",
  data() {
    return {
      moment: moment,
      defaultAvatar: "https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240",
      actualContact: {
        photo: null,
      },
      actualMessageContent: [],
      chats: null,
      general: [],
      name_user: null,
      email: null,
      idOne: authGet("id_user"),
      session_user_name: `${authGet(
        "name_user"
      )} ${authGet("last_name_user")}`,
      idTwo: null,
      message_input: null,
      mensaje: "",
      newMessage: false,
      mostrar: true,
      contacts: [],
      contacts2: [],
      loading: true,
      cod1: null,
      cod2: null,
    };
  },
  methods: {
    onAvatarError(e) {
      if (e && e.target) {
        e.target.src = this.defaultAvatar;
      }
    },
    sendMessage(receiver_id) {
      this.axios
        .post("messages/add", {
          receiver_id: receiver_id,
          message: this.message_input,
        })
        .then(() => {
          this.listActualContentMessage(this.idOne, receiver_id);
          this.message_input = "";
        })
        .catch(() => {
          console.log("Error en enviar");
        });
    },

    cambiarChat(transmitter_id, receiver_id) {
      window.Echo.leave("chat." + this.usersID());
      this.listActualContentMessage(transmitter_id, receiver_id);

      // Actualizar el contacto actual basado en el ID
      const selectedContact = this.contacts.find(contact => contact.id === receiver_id);
      if (selectedContact) {
        this.actualContact = selectedContact;
      }
    },

    listActualContentMessage(transmitter_id, receiver_id) {
      this.axios
        .post(`messages/content`, {
          transmitter_id: transmitter_id,
          receiver_id: receiver_id,
        })
        .then((r) => {
          // ✅ CAMBIO: Acceder a r.data.data en lugar de r.data
          this.actualMessageContent = r.data.data;
          this.idTwo = receiver_id;
        
          window.Echo = new Echo({
            broadcaster: "pusher",
            key: "PROMOLIDER2021",
            cluster: "mt1",
            wsHost: "crm.promolider.email",
            wsPort: 6001,
            wssPort: 443,
            forceTLS: true,
            encrypted: true,
            disableStats: true,
            enabledTransports: ["wss"],
            auth: {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers":
                  "Content-Type, X-Auth-Token, Origin, Authorization",
              },
            },
          });
        
          window.Echo.channel("chat." + this.usersID()).listen(
            "MessageSentEvent",
            (e) => {
              console.log(e);
              this.actualMessageContent.push(e.message);
            }
          );
          
          for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id == receiver_id) {
              this.actualContact = this.contacts[i];
            }
          }
        
          if (transmitter_id > receiver_id) {
            this.cod1 = receiver_id;
            this.cod2 = transmitter_id;
          } else {
            this.cod2 = receiver_id;
            this.cod1 = transmitter_id;
          }
        })
        .catch((error) => {
          console.log("Error al cargar mensajes:", error);
          // ✅ MEJORA: Manejo de errores más específico
          if (error.response && error.response.status === 403) {
            console.error("No tienes permiso para ver estos mensajes");
          }
        });
    },

    async listContacts() {
      try {
        const response = await this.axios.get(`messages/listContacts`);

        // La nueva API devuelve un objeto con 'data' y 'total'
        const contactsData = response.data.data || [];

        this.contacts = contactsData;
        this.loading = false;

        // Seleccionar el primer contacto si existe
        if (contactsData.length > 0) {
          const firstContact = contactsData[0];
          this.actualContact = firstContact;
          this.listActualContentMessage(this.idOne, firstContact.id);
        }

        console.log('Contactos cargados:', contactsData.length);

      } catch (error) {
        console.error('Error al cargar contactos:', error);

        // Si no hay contactos (404), manejarlo graciosamente
        if (error.response && error.response.status === 404) {
          this.contacts = [];
          this.actualContact = null;
        }

        this.loading = false;
      }
    },

    listContacts2() {
      this.axios
        .get(`messages/listNewContacts/${this.idOne}`)
        .then((response) => {
          this.contacts2 = response.data;
        })
        .catch(() => {
          this.contacts2 = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },

    sendMessage2(id2) {
      this.axios
        .post("messages/sendNewMessage", {
          id: this.idOne,
          id2: id2,
        })
        .then(() => {
          this.listContacts();
          this.listContacts2();
        })
        .catch(() => {
          console.log("Error en enviar");
        });
    },

    usersID() {
      let ids;
      if (this.idOne > this.idTwo) {
        ids = this.idTwo + "" + this.idOne;
        return ids;
      } else {
        ids = this.idOne + "" + this.idTwo;
        return ids;
      }
    },
    mostrara() {
      this.mostrar = !this.mostrar;
    },
  },

  created() {
    this.listContacts();
    this.listContacts2();
  },
};
</script>

<style scoped>
@import "./style.css";
</style>