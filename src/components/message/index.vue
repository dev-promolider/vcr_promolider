<template>
<div style="min-height: 100vh">
    <div v-if="loading == false" class="row px-4" style="min-height: 630px; margin-top: 0px; padding-top: 0px">
        <div class="col-md-3 chat-border-top-left">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="user">
                                <img :src="user.photo_user" />
                            </div>
                        </div>
                        <div class="col-md-10">
                            {{ session_user_name }}
                        </div>
                    </div>
                </div>

                <div class="col-md-12 text-left" style="padding-bottom: 0px">
                    <p class="text-left">Chats</p>
                    <hr />
                </div>

                <div class="col-md-12" v-if="contacts.length > 0" style="padding-top: 0px">
                    <div v-for="contact in contacts" :key="contact.id">
                        <div class="row d-flex justify-content-center text-center chat-item" v-on:click="cambiarChat(idOne,contact.id)">
                            <div class="col-lg-2">
                                <img :src="contact.photo" class="rounded-circle" style="max-width: 40px" />
                            </div>
                            <div class="col-lg-10">
                                <p class="text-left" style="margin-bottom: 0; font-size: 0.8em">
                                    {{ contact.name }}
                                </p>
                                <p class="text-left chat-last-message">
                                    {{ contact.last_message }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12" v-else>
                    <p class="text-center" style="font-size: 0.8em; color: #545454">
                        ¡ Comunicate con tus <br />
                        profesores y suscriptores !
                    </p>
                </div>

                <div class="col-md-12 text-left" style="padding-bottom: 0px">
                    <p class="text-left">Nuevos contactos</p>
                    <hr />
                </div>

                <div class="col-md-12" v-if="contacts2.length > 0" style="padding-top: 0px">
                    <div v-for="contact in contacts2" :key="contact.id">
                        <div class="row d-flex justify-content-center text-center chat-item" v-on:click="sendMessage2(contact.id)">
                            <div class="col-lg-2">
                                <img :src="contact.photo" class="rounded-circle" style="max-width: 40px" />
                            </div>
                            <div class="col-lg-10">
                                <p class="text-left" style="margin-bottom: 0; font-size: 0.8em">
                                    {{ contact.name }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12" v-else>
                    <p class="text-center" style="font-size: 0.8em; color: #545454">
                        Necesitas estar inscrito en un curso.
                    </p>
                </div>

            </div>
        </div>

        <div class="col-md-9 chat-border-top-right" style="min-height: 500px">
            <div class="row" v-if="actualContact != null">
                <div class="col-md-1" style="background-color: #ffffff">
                    <img :src="actualContact.photo" class="rounded-circle" style="max-width: 50px" />
                </div>

                <div class="col-md-10" style="background-color: #ffffff">
                    <p class="text-left">
                        {{ actualContact.name + " " + actualContact.lastname }}
                    </p>
                </div>

                <div class="col-md-1 text-right" style="background-color: #ffffff">
                    <button class="text-right">
                        <img src="../../assets/Menuchat.svg" alt="button" />
                    </button>
                </div>

                <div class="col-md-12 justify-content-center chat-empty" v-if="actualMessageContent.length == 0">
                    <p class="text-center">Saluda a {{ actualContact.name }}</p>
                </div>

                <div class="col-md-12 chat-content mt-2 pb-9" style="overflow-y: scroll" v-else>
                    <div class="row mb-5 mt-2 px-2" v-for="message in actualMessageContent" :key="message.id">
                        <div v-if="message.transmitter_id == user.id" class="chat-item-message" style="width: max-content; margin-left: auto; margin-right: 0">
                            <div style="
                    background-color: #006aff;
                    color: #ffffff;
                    border-radius: 20px;
                  " class="p-2">
                                {{ message.message }}
                            </div>
                            <p class="text-right" style="margin-left: 20px">
                                {{ moment(message.created_at).format("DD/MM/YYYY hh:mm A") }}
                            </p>
                        </div>

                        <div v-else class="chat-item-message p-2" style="width: max-content margin-right: auto; margin-left: 0;">
                            <div style="
                    background-color: #006aff;
                    color: #ffffff;
                    border-radius: 20px;
                  " class="p-2">
                                {{ message.message }}
                            </div>
                            <p class="text-left" style="margin-left: 20px">
                                {{ moment(message.created_at).format("DD/MM/YYYY hh:mm A") }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 input-message">
                    <div class="row">
                        <div class="col-md-10">
                            <input style="width: 100%; outline: none" v-model="message_input" @keyup.enter="sendMessage(actualContact.id)" type="text" placeholder="Escribe un mensaje" />
                        </div>
                        <div class="col-md-2 text-right">
                            <img class="text-right" @click="sendMessage(actualContact.id)" src="../../assets/send.svg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="row px-4" style="min-height: 600px; margin-top: 0px; padding-top: 0px">
        <div class="col-md-3 chat-border-top-left">
            <div class="row">
                <div class="col-md-12 my-5" style="margin-bottom: 0px; padding-bottom: 0px">
                    <div class="row">
                        <div class="col-md-3">
                            <b-skeleton type="avatar"></b-skeleton>
                        </div>

                        <div class="col-md-9">
                            <b-skeleton animation="fade" width="85%"></b-skeleton>
                            <b-skeleton animation="fade" width="70%"></b-skeleton>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 text-left" style="padding-bottom: 0px">
                    <p class="text-left">Chats</p>
                    <hr />
                </div>

                <div class="col-md-12" style="padding-top: 0px" v-for="index in 5" :key="index">
                    <div class="row">
                        <div class="col-md-2">
                            <b-skeleton type="avatar"></b-skeleton>
                        </div>
                        <div class="col-md-9 mt-1">
                            <b-skeleton animation="fade" width="85%"></b-skeleton>
                            <b-skeleton animation="fade" width="70%"></b-skeleton>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-9 chat-border-top-right" style="min-height: 500px">
            <div class="row">
                <div class="col-md-1" style="background-color: #ffffff">
                    <b-skeleton type="avatar"></b-skeleton>
                </div>

                <div class="col-md-10" style="background-color: #ffffff">
                    <p class="text-left mt-2">
                        <b-skeleton animation="fade" width="45%"></b-skeleton>
                    </p>
                </div>

                <div class="col-md-1 text-right" style="background-color: #ffffff">
                    <button class="text-right">
                        <img src="../../assets/Menuchat.svg" alt="button" />
                    </button>
                </div>

                <div class="col-md-12 justify-content-center chat-empty">
                    <b-spinner label="spinning"></b-spinner>
                </div>

                <div class="col-md-12 input-message">
                    <div class="row">
                        <div class="col-md-10">
                            <input style="width: 100%; outline: none" type="text" placeholder="Escribe un mensaje" />
                        </div>
                        <div class="col-md-2 text-right">
                            <img class="text-right" src="../../assets/send.svg" />
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
// import SectionTitle from "../Navbar/SectionTitle.vue";

window.Pusher = require("pusher-js");

export default {
    // components: { SectionTitle },
    props: {
        user: Object,
    },
    name: "message",
    data() {
        return {
            moment: moment,
            actualContact: {
                photo: null
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
            // message_add: {
            //   id: null,
            //   message: null,
            //   isLoadingMessage: null,
            // },
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

        cambiarChat(transmitter_id, receiver_id){
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
            await this.axios.get(`messages/listContacts/${this.idOne}`).then((response) => {
                let first_row = response.data[0];
                this.contacts = response.data;
                this.actualContact = first_row;
                // this.message_add.id = first_row.id; // receiver_id
                this.loading = false;

                if (first_row != undefined && first_row != null) {
                    this.listActualContentMessage(this.idOne, first_row.id);
                }
            });
        },

        listContacts2() {
            this.axios.get(`messages/listNewContacts/${this.idOne}`).then((response) => {
                this.contacts2 = response.data;
                // this.message_add.id = first_row.id; // receiver_id
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

        // listarMensajes(email, render) {
        //   this.name_user = localStorage.getItem("name_user");
        //   if (render === "firts") {
        //     this.message_add.isLoadingMessage = true;
        //     this.axios.get("messages/with/" + email).then((r) => {
        //       const res = r.data.data;
        //       this.general = res;
        //       this.message_add.isLoadingMessage = false;
        //     });
        //   } else {
        //     this.axios.get("messages/with/" + email).then((r) => {
        //       const res = r.data.data;
        //       this.general = res;
        //     });
        //   }
        // },

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
        // Escribiendo
        // typingEvent(){
        //     window.Echo.channel('message').whisper('typing', {message: ""})
        // }

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

body {
    background-color: #f9f9fa;
}

.chat-item:hover {
    background: #35424a;
}

.chat-border-top-left {
    border: solid #aaaaaa 1px;
    /* border-top-left-radius: 20px;
  border-bottom-left-radius: 20px; */
}

.chat-border-top-right {
    border: solid #aaaaaa 1px;
    /* border-top-right-radius: 20px; */
    /* border-bottom-right-radius: 20px; */
    background-color: #efefef;
    min-height: 400px;
}

.input-message {
    background-color: #ffffff;
    bottom: 0px;
    position: absolute;
}

.chat-empty {
    background-color: #efefef;
    min-height: 400px;
    display: flex;
    align-items: center;
}

.chat-content {
    background-color: #efefef;
}

.chat-last-message {
    margin-bottom: 0;
    font-size: 0.9em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
