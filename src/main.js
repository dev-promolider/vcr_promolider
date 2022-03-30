import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'
import VueHorizontal from 'vue-horizontal';


import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//get token localstorage
const token = localStorage.getItem('access_token');

axios.defaults.baseURL = 'http://promolider.xyz/api/v1'
<<<<<<< HEAD
//axios.defaults.baseURL = 'https://bb68-177-91-253-9.ngrok.io/promolider/public/api/v1'
=======
// axios.defaults.baseURL = 'http://eef6-177-91-253-9.ngrok.io/promolider/public/api/v1'
>>>>>>> 8a835bf7ce7ec89da250b3b3b6729f946c1941f3
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Vue Use Nodes
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VueHorizontal)


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import Echo from 'laravel-echo'
// window.Pusher = require('pusher-js')


// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: 'PROMOLIDER2021',
//   wsHost:'localhost',
//   wsPort: 6001,
//   disableStats: true,
//   enableTransports: ['ws','wss'],
//   forceTLS: false,
//   cluster:'mt1',
//   encrypted:true
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
