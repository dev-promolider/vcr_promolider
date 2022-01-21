<template>
  <div class="contenedor">
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
        <!-- <div class="contactos">
          <div class="title-contactos">
            <p>Contactos</p>
          </div>
          <div
            class="item-contacto"
            :class="{ 'item-chat-activity': cambiarFondo() }"
          >
            <div class="user">
              <img src="../../assets/contacto.svg" />
              <span></span>
            </div>
            <div class="user-data">
              <p class="user-name"><b>Gabriela Casas</b></p>
              <p class="user-email">Hola! El curso viene con evaluación</p>
            </div>
          </div>
        </div> -->
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
          <section
              class="message-general"
              v-for="mensa in general"
              :key="mensa.id"
            >
              <div class="message-contact" v-if="mensa.name != name_user">
                <p>{{ mensa.message }}</p>
              </div>
              <div class="message-user" v-else>
                <p>{{ mensa.message }}</p>
              </div>
            <!-- <div class="message-contact">
              <p></p>
            </div>
            <div class="message-user">
              <p></p>
            </div> -->
          </section>
        </div>
        <div class="parallel footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      chats: null,
      general: null,
      name_user: null,
    };
  },
  methods: {
    cambiarFondo() {
      return (this.fondo = true);
    },
    lista() {
      this.axios.get("messages/listAll").then((r) => {
        const res = r.data.data;
        this.chats = res;
        console.log(this.chats);
      });
    },
    listarMensajes() {
      this.name_user = localStorage.getItem("name_user");
      this.axios.get("messages/with/admin@promolider.test").then((r) => {
        const res = r.data.data;
        this.general = res;
        console.log(this.general);
        //console.log('res :>> ', res);
      });
    },
  },
  created() {
    this.lista();
    this.listarMensajes();
  },
};
</script>
<style scoped>
.contenedor {
  width: 100%;
  height: 100%;
  padding: 25px 75px;
  background-color: #e5e5e5;
}
.container-message {
  display: flex;
  gap: 2px;
  padding: 1.5px;
  width: 100%;
  height: 100%;
  max-height: 100%;
  border-radius: 15px;
  background: #efefef;
}
.colum-contacts {
  display: flex;
  flex-direction: column;
  min-width: 260px;
  max-width: 260px;
  height: 100%;
  background: #fff;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.colum-chat {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.parallel {
  widows: 100%;
  background: #fff;
}
.header {
  position: relative;
  border-top-right-radius: 15px;
  display: flex;
  width: 100%;
  min-height: 60px;
  padding: 14px 24px;
}
.header p {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  margin: 0;
  padding-left: 10px;
}
.btn-options {
  position: absolute;
  top: 15px;
  right: 10px;
  border: none;
  background: none;
}
.footer {
  border-bottom-right-radius: 15px;
  height: 60px;
}
.body-chat {
  flex-grow: 1;
}
.message-general{
  width:100%;
}
.message-contact{
  display: flex;
  text-align: left;
  font-size: 13px;
  widows: 100%;
  height: 62px;  
  border: 1px solid #EFEFEF;
}
.message-contact p{
  max-width: 294px;
  background: #FFFFFF;
  border-radius: 0px 15px 15px 15px;   
}
.message-user{
  display: flex;
  justify-content: end;
  font-size: 13px;
  width: 100%;
  min-height: 35px;
  max-height: 62px;
  border: 1px solid #EFEFEF;
}
.message-user p{
  max-width: 294px;
  background: #FFFFFF;
  border-radius: 15px 0px 15px 15px;
}
.header-search {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  min-height: 60px;
  padding: 14px 15px;
}
.header-search input {
  color: #9d9d9d;
}
.user {
  position: relative;
  width: 32px;
  height: 100%;
}
.user img {
  position: relative;
  width: 32px;
  height: 100%;
  border-radius: 50%;
}
.user span {
  position: absolute;
  display: block;
  width: 10px;
  height: 10px;
  background: rgb(14, 197, 14);
  bottom: -1.5px;
  right: -1.5px;
  border-radius: 50%;
}
.search-chat {
  flex-grow: 1;
  height: 100%;
  font-size: 9px;
  text-indent: 8px;
  border: 0.5px solid #9d9d9d;
  border-radius: 30px;
}
.title-contactos {
  display: flex;
  width: 100%;
  height: 45px;
  padding-left: 15px;
}
.title-contactos > p {
  text-align: start;
  align-self: center;
  margin: 0;
  font-size: 12px;
  color: #5cc151;
}
.chats {
  display: flex;
  flex-direction: column;
  max-height: calc(100%-60px);
  /* overflow: auto; */
}
.chat-all {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 80%;
  max-height: calc(100%-55px);
  overflow: auto;
}
.item-chat {
  display: flex;
  width: 100%;
  height: 50px;
  padding: 9px 15px;
  cursor: pointer;
}
.item-chat:hover {
  background: #cbcccba3;
}
.item-chat:active {
  background: linear-gradient(90deg, #5cc151 0%, #97f18d 100%);
}
.user-message {
  display: flex;
  flex-direction: column;
  height: 32px;
  padding-left: 10px;
  font-size: 10px;
}
.user-message p {
  text-align: start;
  margin: 0;
}
.message-inline {
  font-weight: 300;
  display: -webkit-box;
  padding-right: 10px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  -webkit-line-clamp: 1;
  overflow: hidden;
  padding-right: 5px;
}
/* .message-inline{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
  font-size: 10px;
} */
.hora {
  font-size: 9px;
  font-weight: 300;
  font-family: "Roboto";
}
.contactos {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 30%;
  overflow: auto;
}
.item-contacto {
  display: flex;
  width: 100%;
  height: 50px;
  padding: 9px 15px;
  cursor: pointer;
}
.user-data {
  display: flex;
  flex-direction: column;
  height: 32px;
  padding-left: 10px;
  font-size: 10px;
}
.user-data p {
  text-align: start;
  margin: 0;
}
</style>