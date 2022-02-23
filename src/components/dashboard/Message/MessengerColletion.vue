<template>
  <div class="card-message p-4 d-flex flex-column">
    <div class="header d-flex justify-content-between mb-2">
      <p>Mensajes</p>
      <router-link to="/messages" class="text-decoration-none text-success">Todos los Mensajes</router-link>
    </div>

    <div v-if="getLastMessages==0" class="center-element no-result">
      <span>Sin resultados</span>
    </div>

    <div v-else class="message d-flex mb-3" v-for="user in getLastMessages" :key="user.id">
      <b-avatar variant="info" src="https://cdn140.picsart.com/317925775068211.png?type=webp&to=min&r=240"></b-avatar>
      <div class="card-body text-message p-2">
        <p class="card-title mb-1"><b>{{user.fullname}}</b></p>
        <p class="card-text">
          {{user.message}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex' 
export default {
  name: "MessengerColletion",
  data() {
    return {
    };
  },
  computed:{
    ...mapGetters('lastMessage',["getLastMessages"]),
    
  },
  methods: {
    ...mapActions('lastMessage',{
        actionLastMessages: "actionLastMessages"
    }),
  },
  created() {
    this.actionLastMessages();
    //this.$store.dispatch('lastMessage/actionLastMessages')
  },
};
</script>
<style scoped>
.header >a{
  color:  #448F3C;
  font-size: 12px;
}
.card-message{
  background-color: #fff;
  border-radius: 15px;
  width: 80%;
  margin: auto;
}
.message{
  background-color: #99CC93;
  border-radius: 15px;
  align-items: center;
  padding: 6px 12px;
}
.text-message p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  font-size: 10px;
}
.card-text{
  color: #fff;
}

</style>
