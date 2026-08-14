import Vue from "vue";
// Trigger HMR
import axios from "axios";
import VueAxios from "vue-axios";
import VueHorizontal from "vue-horizontal";
import VueMeta from "vue-meta";
import VueSocialSharing from "vue-social-sharing";
import vueTimeago from "vue-timeago";
import PortalVue from "portal-vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { authGet, authRemove } from "./helpers/authStorage";

Vue.config.productionTip = false;

const apiUrl = process.env.VUE_APP_API_URL || "";
axios.defaults.baseURL = apiUrl + "/api/v1";

// En producción, exigir HTTPS en la API para evitar robo del bearer por HTTP
if (process.env.NODE_ENV === "production") {
  if (!/^https:\/\//i.test(apiUrl) && !/^\/\/[^/]+$/i.test(apiUrl)) {
    console.error(
      "[Seguridad] La API está configurada con HTTP en producción. " +
        "El token se enviaría sin cifrado. Abortando arranque."
    );
    throw new Error("Configuración insegura: VUE_APP_API_URL debe usar HTTPS en producción.");
  }
}

axios.interceptors.request.use((config) => {
  const token = authGet("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      authRemove("access_token");
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
Vue.use(PortalVue);

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
