import "@/assets/scripts/color-modes";

import "@/defaults/axios";
import { createBootstrap } from "bootstrap-vue-next";
import { createPinia } from "pinia";
import { createApp } from "vue";
// Add the necessary CSS
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";

import axios from "axios";
import App from "./App.vue";
import "./assets/css/main.css";
import manager from "./resouces/socketio";
import router from "./router";

const app = createApp(App);
const bootstrap = createBootstrap();
export const pinia = createPinia();

app.use(bootstrap);
app.use(pinia);
app.use(router);

export const api = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "X-Xsrf-Token",
  xsrfHeaderName: "X-Xsrf-Token",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

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
    }
    return Promise.reject(error);
  },
);
export const mainSocket = manager.socket("/");

app.mount("#app");
