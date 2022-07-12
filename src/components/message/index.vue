<template>

<div>
    <div class="w-100 backgro px-4 py-2">
      <p class="titulo m-0 ml-3">Mensajes</p>
    </div>

   <div class="colum-contacts " v-if="mostrar">

  <div class="contenedor text aling-center">
    <div class="container-message">
      <div class="colum-contacts" v-if="mostrar">

        <div class="header-search">
          <div class="user">
            <img :src="user.photo_user" />
          </div>
          <!-- <input
            class="search-chat"
            type="text"
            placeholder="Buscar chats o contacto..."
          /> -->
        </div>
        <div class="chats">
          <div class="title-contactos">
            <p>Chats</p>
          </div>
          <div class="chat-all" v-if="contacts.length > 0">
            <div
              class="item-chat"
              v-for="contact in contacts"
              :key="contact.id"
            >
              <div class="user">
                <img :src="contact.photo" />
              </div>
              <div class="user-message">
                <p class="user-name">
                  <b>{{ contact.name }}</b>
                </p>
                <p size="30" class="message-inline">{{ contact.id }}</p>
              </div>
              <!-- <div class="time-message">
                <p class="hora">4:14PM</p>
              </div> -->
            </div>
            <!-- <div
              @click="
                listarMensajes(chat.email, 'firts'),
                  (message_add.id = chat.transmitter_id);
                email = chat.email;
                idTwo = chat.transmitter_id;
              "
              class="item-chat"
              v-for="chat in chats"
              :key="chat.transmitter_id"
            >
              <div class="user">
                <img src="../../assets/contacto.svg" />
                <span></span>
              </div>
              <div class="user-message">
                <p class="user-name">
                  <b>{{ chat.fullname }}</b>
                </p>
                <p size="30" class="message-inline">{{ chat.message }}</p>
              </div>
              <div class="time-message">
                <p class="hora">4:14PM</p>
              </div>
            </div> -->
          </div>

          <div class="chat-all" v-else>
            <div class="text-center">
              <p style="font-size: 0.8em; color: #545454">
                ¡ Comunicate con tus <br />
                profesores y suscriptores !
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="colum-chat" v-if="actualContact != null">
        <div class="parallel header">
          <div class="user">
            <img :src="actualContact.photo" />
          </div>
          <p>{{ actualContact.name + " " + actualContact.last_name }}</p>
          <!-- <button class="btn-options">
            <img src="../../assets/Menuchat.svg" alt="" />
          </button> -->
        </div>
        <div class="body-chat">
          <div v-if="actualMessageContent == null" class="center-spinner">
            <p class="text-secondary">Saluda a {{ actualContact.name }}</p>
          </div>
          <div v-else v-for="message in actualMessageContent" :key="message.id">
            <div v-if="message.transmitter_id == user.id" class="text-right">
              {{ message.message }}
            </div>
          </div>

          <!-- <div v-if="message_add.isLoadingMessage" class="center-spinner">
            <b-spinner class="b-spinner" label="Loading..." variant="success" />
            <p class="text-success">Cargando mensajes ...</p>
          </div> -->
          <!-- <section
            class="message-general"
            v-for="mensa in general"
            :key="mensa.id"
            v-else-if="!message_add.isLoadingMessage"
          >
            <div class="message-contact" v-if="mensa.name != name_user">
              <img src="../../assets/contacto.svg" />
              <p>{{ mensa.message }} {{ mensa.id }}</p>
            </div>
            <div class="message-user" v-else>
              <p>{{ mensa.message }}</p>
              <img src="../../assets/logo-perfil.png" />
            </div>
          </section> -->
          <!-- <div class="message-contact">
            <img src="../../assets/contacto.svg" />
            <div class="escribiendo">
              <div class="isTyping"></div>
            </div>
          </div> -->
        </div>

        <div class="parallel footer">
          <div class="message-send">
            <input
              class="message-wrriten"
              v-model="message_add.message"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Escribe un mensaje"
            />
            <div class="btn-send">
              <img
                @click="sendMessage(actualContact.id)"
                src="../../assets/send.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div class="colum-chat" v-else>
        <div class="parallel header">
          <div class="user">
            <img src="" />
          </div>
          <p>{{ actualContact.name + " " + actualContact.last_name }}</p>
          <!-- <button class="btn-options">
            <img src="../../assets/Menuchat.svg" alt="" />
          </button> -->
        </div>
        <div class="body-chat">
          <div class="center-spinner">
            <p class="text-secondary">Saluda a {{ actualContact.name }}</p>
          </div>
          <div>
            <div v-if="message.transmitter_id == user.id" class="text-right">
              {{ message.message }}
            </div>
          </div>

          <!-- <div v-if="message_add.isLoadingMessage" class="center-spinner">
            <b-spinner class="b-spinner" label="Loading..." variant="success" />
            <p class="text-success">Cargando mensajes ...</p>
          </div> -->
          <!-- <section
            class="message-general"
            v-for="mensa in general"
            :key="mensa.id"
            v-else-if="!message_add.isLoadingMessage"
          >
            <div class="message-contact" v-if="mensa.name != name_user">
              <img src="../../assets/contacto.svg" />
              <p>{{ mensa.message }} {{ mensa.id }}</p>
            </div>
            <div class="message-user" v-else>
              <p>{{ mensa.message }}</p>
              <img src="../../assets/logo-perfil.png" />
            </div>
          </section> -->
          <!-- <div class="message-contact">
            <img src="../../assets/contacto.svg" />
            <div class="escribiendo">
              <div class="isTyping"></div>
            </div>
          </div> -->
        </div>

        <div class="parallel footer">
          <div class="message-send">
            <input
              class="message-wrriten"
              v-model="message_add.message"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Escribe un mensaje"
            />
            <div class="btn-send">
              <img
                @click="sendMessage(actualContact.id)"
                src="../../assets/send.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="colum-chat">
        <div class="parallel header">
          <div class="user">
            <img src="../../assets/contacto.svg" />
            <span></span>
          </div>
          <p>Gabriela Casas</p>
          <button class="btn-options">
            <img src="../../assets/Menuchat.svg" alt="" />
          </button>
        </div>
        <div class="body-chat">
          <div v-if="message_add.isLoadingMessage" class="center-spinner">
            <b-spinner class="b-spinner" label="Loading..." variant="success" />
            <p class="text-success">Cargando mensajes ...</p>
          </div>
          <section
            class="message-general"
            v-for="mensa in general"
            :key="mensa.id"
            v-else-if="!message_add.isLoadingMessage"
          >
            <div class="message-contact" v-if="mensa.name != name_user">
              <img src="../../assets/contacto.svg" />
              <p>{{ mensa.message }} {{ mensa.id }}</p>
            </div>
            <div class="message-user" v-else>
              <p>{{ mensa.message }}</p>
              <img src="../../assets/logo-perfil.png" />
            </div>
          </section>
   
          <div class="message-contact">
            <img src="../../assets/contacto.svg" />
            <div class="escribiendo">
              <div class="isTyping"></div>
            </div>
          </div>
        </div>

        <div class="parallel footer">
          <div class="message-send">
            <input
              class="message-wrriten"
              v-model="message_add.message"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Escribe un mensaje"
            />
            <div class="btn-send">
              <img @click="sendMessage" src="../../assets/send.svg" alt="" />
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
   </div>
</div>
</template>

<script>
import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

export default {
  props: {
    user: Object,
  },
  name: "message",
  data() {
    return {
      actualContact: { photo: null },
      actualMessageContent: null,
      chats: null,
      general: [],
      name_user: null,
      email: null,
      idOne: localStorage.getItem("id_user"),
      idTwo: null,
      message_add: {
        id: null,
        message: null,
        isLoadingMessage: null,
      },
      mensaje: "",
      newMessage: false,
      mostrar: true,
      contacts: [],
    };
  },
  methods: {
    sendMessage() {
      this.axios
        .post("messages/add", this.message_add)
        .then(() => {
          this.message_add.message = "";
        })
        .catch(() => {
          console.log("Error en enviar");
        });
    },
    // cambiarFondo() {
    //   return (this.fondo = true);
    // },

    listActualContentMessage(transmitter_id, receiver_id) {
      this.axios
        .post(`messages/content`, {
          transmitter_id: transmitter_id,
          receiver_id: receiver_id,
        })
        .then((r) => {
          if (r.data.length > 0) {
            this.actualMessageContent = r.data;
          }
        })
        .catch(() => {
          console.log("Error");
        });
    },

    lista() {
      this.axios.get(`messages/listContacts/${this.idOne}`).then((r) => {
        this.contacts = r.data;
        this.actualContact = r.data[0];
        this.message_add.id = r.data[0].id; // receiver_id
        this.listActualContentMessage(this.idOne, r.data[0].id);
      });
      // this.axios.get("messages/listAll").then((r) => {
      //   const res = r.data.data;
      //   this.chats = res;
      // });
    },
    listarMensajes(email, render) {
      this.name_user = localStorage.getItem("name_user");
      if (render === "firts") {
        this.message_add.isLoadingMessage = true;
        this.axios.get("messages/with/" + email).then((r) => {
          const res = r.data.data;
          this.general = res;
          this.message_add.isLoadingMessage = false;
        });
      } else {
        this.axios.get("messages/with/" + email).then((r) => {
          const res = r.data.data;
          this.general = res;
        });
      }
    },
    usersID() {
      var ids;
      if (this.idOne > this.idTwo) {
        ids = this.idTwo + "" + this.idOne;
        console.log(ids);
        return ids;
      } else {
        ids = this.idOne + "" + this.idTwo;
        console.log(ids);
        return ids;
      }
    },
    // Escribiendo
    // typingEvent(){
    //     window.Echo.channel('message').whisper('typing', {message: ""})
    // }

    mostrara() {
      this.mostrar = !this.mostrar;
    },
  },
  created() {
    this.lista();
    //this.listarMensajes();
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "PROMOLIDER2022",
      cluster: "mt1",
      encrypted: false,
      wsHost: "promolider.xyz",
      wsPort: 6001,
      disableStats: true,
      enableTransports: ["ws", "wss"],
      forceTLS: false,
    });

    window.Echo.channel("chat-" + this.usersID()).listen(
      "MessageSentEvent",
      (e) => {
        console.log(e);
        if (e.receiver_id != localStorage.getItem("id_user")) {
          console.log(e.message);
          this.general.push({
            name: localStorage.getItem("name_user"),
            message: e.message,
            created_at: "2022-03-02T22:33:41.000000Z",
          });
        } else {
          this.general.push({
            name: "Otro",
            message: e.message,
            created_at: "2022-03-02T22:33:41.000000Z",
          });
        }
        //this.newMessage=true;
      }
    );
  },
};
</script>

<style scoped>
@import "./style.css";
.contenedor {
  display: block;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 25px 75px;
  background-color: #e5e5e5;
}

.backgro {
  background: #131b1e;
  opacity: 0.9;
  z-index: 10;
}
.titulo {
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: left;
}
</style>
