<template>
  <div class="contenedor pb-5">
    <div class="container-message">
      <div class="colum-contacts">
        <div class="header-search">
          <div class="user">
            <img src="../../assets/logo-perfil.png" />
            <span></span>
          </div>
          <input
            class="search-chat"
            type="text"
            placeholder="Buscar chats o contacto..."
          />
        </div>
        <div class="chats">
          <div class="title-contactos">
            <p>Chats</p>
          </div>
          <div class="chat-all">
            <div
              @click="
                listarMensajes(chat.email, 'firts'),
                  (message_add.id = chat.transmitter_id);
                email = chat.email;
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
            </div>
          </div>
        </div>
      </div>

      <div class="colum-chat">
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
          <!-- Mensaje del websocket -->
          <div class="message-contact">
            <img src="../../assets/contacto.svg" />
            <div class="escribiendo">
              <div class="isTyping"></div>
            </div>
          </div>
        </div>
        <div class="parallel footer">
          <div></div>
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
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/components/message/style.css";
import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

export default {
  name: "message",
  data() {
    return {
      chats: null,
      general: [],
      name_user: null,
      email: null,
      message_add: {
        id: 1,
        message: "Probando envio de mensaje 4 :D",
        isLoadingMessage: null,
      },
      mensaje: "",
      newMessage: false,
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
          //console.log("Error en enviar");
        });
    },
    cambiarFondo() {
      return (this.fondo = true);
    },
    lista() {
      this.axios.get("messages/listAll").then((r) => {
        const res = r.data.data;
        this.chats = res;
      });
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
    // Escribiendo
    // typingEvent(){
    //     window.Echo.channel('message').whisper('typing', {message: ""})
    // }
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

    window.Echo.channel("message").listen("Message", (e) => {
      console.log(e);
      if (e.receiver_id != localStorage.getItem("id_user")) {
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
    });
  },
};
</script>
<style scoped>
</style>