import "@/defaults/axios";
import { createBootstrap } from "bootstrap-vue-next";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "./assets/scss/main.css";
import "./assets/scss/main.scss";

// Add the necessary CSS
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App.vue";
import api from "./resources/axios";
import manager from "./resources/socketio";
import router from "./router";

const app = createApp(App);
export const piniaState = createPinia();
app.use(router);
app.use(piniaState);
app.use(createBootstrap()); // Important
app.mount("#app");

interface ResponseError {
  response?: {
    status?: number;
  };
}

api.interceptors.response.use(
  (response) => response,
  (error: ResponseError) => {
    if (error.response && (error.response.status === 401 || error.response.status == 422)) {
      router.push({ name: "login" });
      alert("Sessão expirada. Faça login novamente.");
    }
    return Promise.reject(error);
  },
);

export const mainSocket = manager.socket("/");

mainSocket.io.on("reconnect_error", () => {
  router.push({ name: "login" });
});
