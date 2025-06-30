<script setup lang="ts">
import "@/assets/css/main.css";
import { useRouter } from "vue-router";

import logoSystem from "@/assets/img/favicon.png";
import FooterView from "@/components/FooterView.vue";
import { api } from "@/main";
import type { LoginForm } from "@/types/forms";
import { isAxiosError } from "axios";
import { BOverlay } from "bootstrap-vue-next";
import { reactive, ref } from "vue";
import type { LoginResponse } from "./types";
const router = useRouter();
const showOverlayEx1 = ref(false);
const opacity = ref(0.18);
const FormLogin: LoginForm = reactive({
  email: "",
  password: "",
  remember_me: false,
});

async function handleSubmit(event: Event) {
  showOverlayEx1.value = true;

  event.preventDefault();

  try {
    const response: LoginResponse = await api.post("/auth_admin/login", FormLogin);

    // Handle successful login
    alert(response.data?.message);

    localStorage.setItem("token", response.data?.token as string);

    router.push({ name: "dashboard" });
  } catch (err) {
    // Handle login error
    if (isAxiosError(err)) {
      let msg = "Erro ao realizar login";
      if (err.response?.data) {
        msg = err.response?.data.message;
      }

      alert(msg);
    }
    if (import.meta.env.VITE_IS_DEV) {
      router.push({ name: "home" });
    }
    showOverlayEx1.value = false;
  }
}
</script>

<template>
  <div class="d-flex flex-column justify-content-center" style="height: 100%">
    <div class="mt-auto mb-auto p-3">
      <BOverlay
        class="card bg-body-tertiary bg-opacity-50 ms-auto me-auto d-flex flex-column gap-2 p-5"
        :show="showOverlayEx1"
        :opacity="opacity"
        rounded="md"
        style="width: 35%"
      >
        <form class="card-body" @submit="handleSubmit">
          <div class="header-login d-flex flex-column mb-4 gap-2">
            <img
              class="align-self-between mb-2 rounded rounded-4"
              :src="logoSystem"
              alt=""
              width="98px"
            />
            <div class="brand">
              <span class="fs-3 align-self-center"><small> DusDoc </small></span>
              <span class="fw-semibold fs-5 align-self-center">
                <em> v2.0 </em>
              </span>
            </div>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              v-model="FormLogin.email"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              v-model="FormLogin.password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="d-flex flex-column mt-4">
            <hr />
            <button id="loginButton" class="btn" type="submit">Login</button>
          </div>
        </form>
      </BOverlay>
    </div>
    <FooterView />
  </div>
</template>

<style lang="css" scoped>
#loginButton {
  background-color: var(--color-blue-chill-700);
  transition: 0.5s;
  &:hover {
    background-color: var(--color-blue-chill-900);
    font-weight: bold;
    transition: 0.5s;
  }
  &:active {
    border-color: var(--color-blue-chill-600);
    transition: 0.5s;
  }
}
</style>
