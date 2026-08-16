import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { authGet } from "./authStorage";

window.Pusher = Pusher;

let echo = null;

function createEcho() {
  const apiUrl = process.env.VUE_APP_API_URL || "";
  const token = authGet("access_token");

  echo = new Echo({
    broadcaster: "pusher",
    key: process.env.VUE_APP_PUSHER_APP_KEY || "ABCABC12345",
    cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER || "mt1",
    wsHost: process.env.VUE_APP_PUSHER_HOST || "127.0.0.1",
    wsPort: process.env.VUE_APP_PUSHER_PORT || "6001",
    wssPort: process.env.VUE_APP_PUSHER_PORT || "443",
    forceTLS: false,
    encrypted: false,
    disableStats: true,
    enabledTransports: ["ws"],
    authEndpoint: apiUrl + "/api/v1/broadcasting/auth",
    auth: {
      headers: token ? { Authorization: "Bearer " + token } : {},
    },
  });

  window.Echo = echo;
  return echo;
}

export function getEcho() {
  if (echo) {
    return echo;
  }
  return createEcho();
}

export function disconnectEcho() {
  if (echo) {
    echo.disconnect();
    echo = null;
    window.Echo = undefined;
  }
}

export default {
  get: getEcho,
  disconnect: disconnectEcho,
};
