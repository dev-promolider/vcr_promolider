import Vue from 'vue'
import ElementUI from "element-ui";
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'
import VueHorizontal from 'vue-horizontal';
import lang from "element-ui/lib/locale/lang/es";
import locale from "element-ui/lib/locale";
import Vuetify from 'vuetify'


import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '../src/plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import VueSocialSharing from 'vue-social-sharing'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

//get token localstorage
const token = localStorage.getItem('access_token');


// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1'
axios.defaults.baseURL = 'https://crm.promolider.org/api/v1'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

locale.use(lang);
Vue.use(ElementUI);

// Vue Use Nodes
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VueHorizontal)
Vue.use(Vuetify)

Vue.use(VueSocialSharing);
Vue.use(vueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'es', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    ja: require('date-fns/locale/ja'),
    'es': require('date-fns/locale/es')
  }
})

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'
import vueTimeago from 'vue-timeago'
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
  vuetify,
  render: h => h(App)
}).$mount('#app')
