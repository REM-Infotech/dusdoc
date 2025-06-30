<script setup lang="ts">
import "@/assets/scss/main.scss";
import { piniaState } from "@/main";
import api from "@/resources/axios";
import authenticationStore from "@/stores/authentication";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { isAxiosError } from "axios";
import { BOverlay } from "bootstrap-vue-next";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import IconExample from "./components/icons/IconExample.vue";
import InputView from "./components/styled/InputView.vue";
import type { LoginResponse } from "./types";

const router = useRouter();
const overlayLogin = ref(false);
const opacity = ref(0.28);

const { form } = storeToRefs(authenticationStore(piniaState));

async function handleSubmit(event: Event) {
  overlayLogin.value = true;

  event.preventDefault();

  try {
    const response: LoginResponse = await api.post("/auth_funcionario/login", form.value);

    // Handle successful login
    alert(response.data?.message);

    localStorage.setItem("token", response.data?.token as string);

    router.push({ name: "home" });
  } catch (err) {
    // Handle login error
    if (isAxiosError(err)) {
      let msg = "Erro ao realizar login";
      if (err.response?.data) {
        msg = err.response?.data.message;
      }

      alert(msg);
    }
    overlayLogin.value = false;
    if (import.meta.env.VITE_IS_DEV) {
      router.push({ name: "home" });
    }
  }
}

watch(form.value, () => {
  //
});
</script>

<template>
  <BOverlay
    class="login-card d-flex flex-column gap-3 shadow-lg me-3 ms-3 p-3 rounded rounded-4 mb-auto mt-auto"
    :show="overlayLogin"
    :opacity="opacity"
    rounded="sm"
  >
    <div class="d-flex gap-4 justify-content-center align-items-center">
      <div class="d-flex flex-column gap-2 justify-content-center align-items-center">
        <IconExample />
      </div>
    </div>

    <form @submit="handleSubmit" class="d-flex flex-column gap-4">
      <div class="d-flex gap-2 flex-column">
        <InputView type="text" label="Email" v-model="form.email" :icon="faEnvelope" />
        <InputView type="password" label="Senha" v-model="form.password" />
      </div>
      <a class="text-decoration-none text-primary fw-semibold" href="#">Esqueceu sua senha?</a>
      <div class="d-grid">
        <button type="submit" class="btn btn-primary">
          <span class="fw-bold">Entrar</span>
        </button>
      </div>
    </form>

    <div class="d-flex flex-column justify-content-center align-items-center grap-5">
      <span class="text-center text-body-tertiary fw-semibold"> Ainda não possui uma conta? </span>
      <a class="text-center text-decoration-none" href="#">
        <span class="fw-bolder text-primary"> Solicite ao RH </span>
      </a>
    </div>
  </BOverlay>
</template>
