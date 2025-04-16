<template>
  <div class="chat-wrapper">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <!-- Sidebar de contactos -->
        <div class="col-md-4 col-lg-3 sidebar-contacts p-0">
          <!-- Perfil del usuario -->
          <div class="user-profile p-3 border-bottom">
            <div class="d-flex align-items-center">
              <div class="position-relative me-3">
                <img :src="user.photo_user" class="avatar" :alt="session_user_name" />
                <span class="status-badge"></span>
              </div>
              <div class="user-info">
                <h6 class="mb-0">{{ session_user_name }}</h6>
              </div>
            </div>
          </div>

          <!-- Lista de chats -->
          <div class="chat-list-section p-3">
            <h6 class="section-title mb-3">Chats</h6>
            <div v-if="contacts.length > 0" class="chat-list">
              <div v-for="contact in contacts" :key="contact.id" class="chat-item"
                @click="cambiarChat(idOne, contact.id)">
                <div class="d-flex align-items-center">
                  <div class="position-relative">
                    <img :src="contact.photo" class="avatar-sm me-3" :alt="contact.name" />
                    <span class="status-badge-sm"></span>
                  </div>
                  <div class="chat-item-info">
                    <h6 class="mb-1">{{ contact.name }}</h6>
                    <p class="last-message mb-0">{{ contact.last_message }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              <p>¡Comunícate con tus profesores y suscriptores!</p>
            </div>
          </div>

          <!-- Nuevos contactos -->
          <div class="new-contacts-section p-3">
            <h6 class="section-title mb-3">Nuevos contactos</h6>
            <div v-if="contacts2.length > 0" class="new-contacts-list">
              <div v-for="contact in contacts2" :key="contact.id" class="contact-item"
                @click="sendMessage2(contact.id)">
                <div class="d-flex align-items-center">
                  <img :src="contact.photo" class="avatar-sm me-3" :alt="contact.name" />
                  <h6 class="mb-0">{{ contact.name }}</h6>
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              <p>Necesitas estar inscrito en un curso.</p>
            </div>
          </div>
        </div>

        <!-- Área principal del chat -->
        <div class="col-md-8 col-lg-9 main-chat p-0">
          <div v-if="actualContact != null">
            <!-- Encabezado del chat -->
            <div class="chat-header p-3 border-bottom">
              <div class="d-flex align-items-center">
                <img :src="actualContact.photo" class="avatar-sm me-3" :alt="actualContact.name" />
                <h6 class="mb-0">
                  {{ actualContact.name + " " + actualContact.lastname }}
                </h6>
              </div>
            </div>

            <!-- Contenido del chat -->
            <div class="chat-content p-3">
              <div v-if="actualMessageContent.length == 0" class="empty-chat">
                <p>Saluda a {{ actualContact.name }}</p>
              </div>
              <div v-else class="messages-container">
                <div v-for="message in actualMessageContent" :key="message.id" :class="[
                  'message',
                  message.transmitter_id == user.id
                    ? 'message-outgoing'
                    : 'message-incoming',
                ]">
                  <div class="message-content">
                    {{ message.message }}
                  </div>
                  <div class="message-time">
                    {{
                      moment(message.created_at).format("DD/MM/YYYY hh:mm A")
                    }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Input del mensaje -->
            <div class="message-input-wrapper p-3 border-top">
              <div class="input-group">
                <input type="text" class="form-control" v-model="message_input"
                  @keyup.enter="sendMessage(actualContact.id)" placeholder="Escribe un mensaje..." />
                <button class="btn btn-primary" @click="sendMessage(actualContact.id)">
                  <i class="bi bi-send"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echo from "laravel-echo";
import moment from "moment";

window.Pusher = require("pusher-js");

export default {
  props: {
    user: Object,
  },
  name: "message",
  data() {
    return {
      moment: moment,
      actualContact: {
        photo: null,
      },
      actualMessageContent: [],
      chats: null,
      general: [],
      name_user: null,
      email: null,
      idOne: localStorage.getItem("id_user"),
      session_user_name: `${localStorage.getItem(
        "name_user"
      )}  ${localStorage.getItem("last_name_user")}`,
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
    },

    listActualContentMessage(transmitter_id, receiver_id) {
      this.axios
        .post(`messages/content`, {
          transmitter_id: transmitter_id,
          receiver_id: receiver_id,
        })
        .then((r) => {
          this.actualMessageContent = r.data;
          this.idTwo = receiver_id;

          window.Echo = new Echo({
            broadcaster: "pusher",
            key: "PROMOLIDER2021",
            cluster: "mt1",
            wsHost: "crm.promolider.org",
            wsPort: 6001,
            wssPort: 6001,
            forceTLS: false,
            encrypted: false,
            disableStats: true,
            enabledTransports: ["ws", "wss"],
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
        .catch(() => {
          console.log("Error");
        });
    },

    async listContacts() {
      await this.axios
        .get(`messages/listContacts/${this.idOne}`)
        .then((response) => {
          let first_row = response.data[0];
          this.contacts = response.data;
          this.actualContact = first_row;
          this.loading = false;

          if (first_row != undefined && first_row != null) {
            this.listActualContentMessage(this.idOne, first_row.id);
          }
        });
    },

    listContacts2() {
      this.axios
        .get(`messages/listNewContacts/${this.idOne}`)
        .then((response) => {
          this.contacts2 = response.data;
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
