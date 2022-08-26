<template>
  <div class="card-message p-2 d-flex flex-column bg-white">
    
    <div class="header d-flex justify-content-between mb-2">
      <p style="font-size: 1em">Mensajes</p>
      <router-link
        to="/messages"
        class="text-decoration-none"
        style="font-size: 1em"
        >Todos los mensajes</router-link
      >
    </div>

    <div>
      <span v-if="getLastMessages == null" class="text-center">
        <div class="cajita d-flex align-items-center justify-content-center">
          cargando datos...
        </div>
        <div class="cajita d-flex align-items-center justify-content-center">
          cargando datos...
        </div>
        <div class="cajita d-flex align-items-center justify-content-center">
          cargando datos...
        </div>
      </span>

      <div v-if="getLastMessages == 0" class="center-element no-result mt-5">
        <span>Sin resultados</span>
      </div>

      <div
        v-else
        class="message d-flex px-5 mb-3"
        v-for="user in getLastMessages"
        :key="user.id"
      >
        <b-avatar
          variant="info"
          src="https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240"
        ></b-avatar>
        <div class="card-body text-message p-2">
          <p class="card-title mb-1">
            <b>{{ user.fullname }}</b>
          </p>
          <p class="card-text">
            {{ user.message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MessengerColletion",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("lastMessage", ["getLastMessages"]),
  },
  methods: {
    ...mapActions("lastMessage", {
      actionLastMessages: "actionLastMessages",
    }),
  },
  created() {
    this.actionLastMessages();
    //this.$store.dispatch('lastMessage/actionLastMessages')
  },
};
</script>
<style scoped>
.header > a {
  color: #111111;
  font-size: 15px;
}
.card-message {
  border-radius: 15px;
  width: 100%;
  height: 350px;
  margin: auto;
}
.message {
  background-color: #1AE800;
  border-radius: 15px;
  align-items: center;
}
.text-message p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  font-size: 15px;
}
.card-text {
  color: rgb(0, 0, 0);
}

.cajita {
  width: 100%;
  height: 70px;
  border-radius: 0.9rem;
  max-width: 95%;
  margin: 10px;
  animation: pulsos 1s infinite;
}

@keyframes pulsos {
  0% {
    background: #eee;
  }
  50% {
    background: #bfbfbf;
  }
  100% {
    background: #eee;
  }
}
</style>
