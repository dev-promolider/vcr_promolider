<template>
  <div class="chat-container">
    <div class="row g-0">
      <!-- Lista de contactos -->
      <div class="col-md-3 chat-border-top-left">
        <!-- Perfil del usuario -->
        <div class="d-flex align-items-center mb-4">
          <div class="user me-3">
            <img :src="user.photo_user" class="rounded-circle" width="40" alt="User photo" />
          </div>
          <div class="user-info">
            <h6 class="mb-0">{{ session_user_name }}</h6>
          </div>
        </div>

        <!-- Sección de chats -->
        <div class="chat-section mb-4">
          <h6 class="text-muted mb-3">Chats</h6>
          <div v-if="contacts.length > 0">
            <div v-for="contact in contacts" :key="contact.id" class="chat-item d-flex align-items-center"
              @click="cambiarChat(idOne, contact.id)">
              <img :src="contact.photo" class="rounded-circle me-3" width="40" alt="Contact photo" />
              <div class="contact-info flex-grow-1">
                <p class="mb-1 fw-medium">{{ contact.name }}</p>
                <p class="text-muted small text-truncate mb-0">
                  {{ contact.last_message }}
                </p>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-muted">
            <p>¡Comunícate con tus profesores y suscriptores!</p>
          </div>
        </div>

        <!-- Nuevos contactos -->
        <div class="new-contacts-section">
          <h6 class="text-muted mb-3">Nuevos contactos</h6>
          <div v-if="contacts2.length > 0">
            <div v-for="contact in contacts2" :key="contact.id" class="chat-item d-flex align-items-center"
              @click="sendMessage2(contact.id)">
              <img :src="contact.photo" class="rounded-circle me-3" width="40" alt="Contact photo" />
              <p class="mb-0">{{ contact.name }}</p>
            </div>
          </div>
          <div v-else class="text-center text-muted">
            <p>Necesitas estar inscrito en un curso.</p>
          </div>
        </div>
      </div>

      <!-- Área de chat -->
      <div class="col-md-9 chat-border-top-right">
        <div v-if="actualContact != null">
          <!-- Cabecera del chat -->
          <div class="d-flex align-items-center bg-white p-3 rounded-top">
            <img :src="actualContact.photo" class="rounded-circle me-3" width="40" alt="Contact photo" />
            <h6 class="mb-0">
              {{ actualContact.name + " " + actualContact.lastname }}
            </h6>
          </div>

          <!-- Mensajes -->
          <div class="chat-content py-4 px-3">
            <div v-if="actualMessageContent.length == 0" class="text-center my-5">
              <p>Saluda a {{ actualContact.name }}</p>
            </div>
            <div v-else>
              <div v-for="message in actualMessageContent" :key="message.id" :class="[
                'chat-item-message',
                message.transmitter_id == user.id ? 'ms-auto' : '',
              ]">
                <div :class="[
                  'p-3',
                  message.transmitter_id == user.id
                    ? 'bg-primary text-white'
                    : 'bg-white',
                ]">
                  {{ message.message }}
                </div>
                <p :class="[
                  'small text-muted mt-1',
                  message.transmitter_id == user.id ? 'text-end' : '',
                ]">
                  {{ moment(message.created_at).format("DD/MM/YYYY hh:mm A") }}
                </p>
              </div>
            </div>
          </div>

          <!-- Input de mensaje -->
          <div class="input-message">
            <div class="d-flex align-items-center">
              <input type="text" class="form-control me-3" v-model="message_input"
                @keyup.enter="sendMessage(actualContact.id)" placeholder="Escribe un mensaje" />
              <img src="../../assets/send.svg" @click="sendMessage(actualContact.id)" alt="Send message"
                class="send-button" />
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
            encrypted: false,
            wsHost: "crm.promolider.org",
            wsPort: 6001,
            disableStats: true,
            enableTransports: ["ws", "wss"],
            forceTLS: false,
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
        // console.log(ids);
        return ids;
      } else {
        ids = this.idOne + "" + this.idTwo;
        // console.log(ids);
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

/* Contenedor principal */
.chat-container {
  min-height: 100vh;
  background-color: #f9f9fa;
  padding: 2rem;
}

/* Sección de contactos */
.chat-border-top-left {
  border-radius: 12px 0 0 12px;
  background-color: #ffffff;
  padding: 1.5rem;
}

/* Sección de mensajes */
.chat-border-top-right {
  border-radius: 0 12px 12px 0;
  padding: 1.5rem;
  position: relative;
}

/* Input de mensaje */
.input-message {
  background-color: #ffffff;
  border-radius: 0 0 12px 12px;
  padding: 1rem;
  width: 100%;
  bottom: 0;
  left: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.input-message input {
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  padding: 0.75rem 1rem;
  transition: border-color 0.2s;
}

.input-message input:focus {
  border-color: #006aff;
  outline: none;
}

/* Botón de enviar */
.input-message img {
  cursor: pointer;
  transition: transform 0.2s;
  width: 32px;
  height: 32px;
}

.input-message img:hover {
  transform: scale(1.1);
}

/* Items de chat */
.chat-item {
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
}

.chat-item:hover {
  background-color: rgba(53, 66, 74, 0.05);
}

/* Mensajes */
.chat-item-message {
  max-width: 80%;
  margin-bottom: 1rem;
}

.chat-item-message>div {
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

/* Responsivo */
@media (max-width: 768px) {
  .chat-container {
    padding: 1rem;
  }

  .chat-border-top-left,
  .chat-border-top-right {
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .input-message {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 1rem;
    background: #ffffff;
    z-index: 1000;
  }
}

@media (max-width: 576px) {
  .chat-container {
    padding: 0.5rem;
  }

  .chat-item-message {
    max-width: 90%;
  }
}
</style>
