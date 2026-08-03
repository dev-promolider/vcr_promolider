import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueHorizontal from "vue-horizontal";
import VueMeta from "vue-meta";
import VueSocialSharing from "vue-social-sharing";
import vueTimeago from "vue-timeago";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_API_URL + "/api/v1";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

Vue.use(VueAxios, axios);
Vue.use(VueHorizontal);
Vue.use(VueSocialSharing);

Vue.use(vueTimeago, {
  name: "Timeago",
  locale: "es",
  locales: {
    "zh-CN": require("date-fns/locale/zh-CN"),
    ja: require("date-fns/locale/ja"),
    es: require("date-fns/locale/es"),
  },
});

import "./assets/styles/tailwind.css";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
