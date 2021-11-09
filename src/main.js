import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//get token localstorage
const token = localStorage.getItem('access_token');

axios.defaults.baseURL = 'http://promolider.xyz/api/v1'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Vue Use Nodes
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
