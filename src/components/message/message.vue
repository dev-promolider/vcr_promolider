<template>
  <div class="contenedor">
    <div class="container-message">
      <div class="colum-contacts">
        <div class="header-search">
          <div class="user">
            <img
              src="../../assets/logo-perfil.png"
            />
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
            <div class="item-chat">
              <div class="user">
                <img
                  src="../../assets/contacto.svg"
                />
                <span></span>
              </div>
              <div class="user-message">
                <p class="user-name"><b>Gabriela Casas</b></p>
                <p class="message-inline">Hola! El curso viene con evaluación</p>
              </div>
              <div class="time-message">
                <p class="hora">4:14PM</p>
              </div>
            </div>
            <div
              class="item-chat"
              :class="{ 'item-chat-activity': cambiarFondo() }"
            >
              <div class="user">
                <img
                  src="https://www.clarin.com/img/2020/08/16/avatar-the-last-airbender-foto___pck4_8liS_1256x620__2.jpg"
                />
                <span></span>
              </div>
              <div class="user-message">
                <p class="user-name"><b>Gabriela Casas</b></p>
                <p class="message-inline">Hola! El curso viene con evaluación</p>
              </div>
              <div class="time-message">
                <p class="hora">4:14PM</p>
              </div>
            </div>
            
            <div class="item-chat">
              <div class="user">
                <img
                  src="https://www.clarin.com/img/2020/08/16/avatar-the-last-airbender-foto___pck4_8liS_1256x620__2.jpg"
                />
                <span></span>
              </div>
              <div class="user-message">
                <p class="user-name"><b>Gabriela Casas</b></p>
                <p class="message-inline">Hola! El curso viene con evaluación</p>
              </div>
              <div class="time-message">
                <p class="hora">4:14PM</p>
              </div>
            </div>
            <div class="item-chat">
              <div class="user">
                <img
                  src="https://www.clarin.com/img/2020/08/16/avatar-the-last-airbender-foto___pck4_8liS_1256x620__2.jpg"
                />
                <span></span>
              </div>
              <div class="user-message">
                <p class="user-name"><b>Gabriela Casas</b></p>
                <p class="message-inline">Hola! El curso viene con evaluación</p>
              </div>
              <div class="time-message">
                <p class="hora">4:14PM</p>
              </div>
            </div>
            <div class="item-chat">
              <div class="user">
                <img
                  src="https://www.clarin.com/img/2020/08/16/avatar-the-last-airbender-foto___pck4_8liS_1256x620__2.jpg"
                />
                <span></span>
              </div>
              <div class="user-message">
                <p class="user-name"><b>Gabriela Casas</b></p>
                <p class="message-inline">Hola! El curso viene con evaluación</p>
              </div>
              <div class="time-message">
                <p class="hora">4:14PM</p>
              </div>
            </div>
            <div class="item-chat">
              <div class="user">
                <img
                  src="https://www.clarin.com/img/2020/08/16/avatar-the-last-airbender-foto___pck4_8liS_1256x620__2.jpg"
                />
                <span></span>
              </div>
              <div class="user-message">
                <p class="user-name"><b>Gabriela Casas</b></p>
                <p class="message-inline">Hola! El curso viene con evaluación</p>
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
            <img
              src="../../assets/contacto.svg"
            />
            <span></span>
          </div>
          <p>Gabriela Casas</p>
          <button class="btn-options">
            <img src="../../assets/Menuchat.svg" alt="">
          </button>
        </div>
        <div class="body-chat">
          
        </div>
        <div class="parallel footer">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolores
          ducimus reiciendis si suscipi?
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  methods: {
    cambiarFondo() {
      return (this.fondo = true);
    },
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
.header p{
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  margin: 0;
  padding-left: 10px;
}
.btn-options{
  position: absolute;
  top: 15px;
  right:10px;
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
.header-search {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  min-height: 60px;
  padding: 14px 15px;
}
.header-search input{
  color:#9D9D9D;
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
.chat-all{
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
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  -webkit-line-clamp: 1;
  overflow: hidden;
  padding-right: 5px;
}
.hora {
  font-size: 9px;
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