<script setup lang="ts">
import { faBell, faFolderOpen, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const exibir = ref(false);

function classFooter() {
  return exibir.value
    ? "container text-center ps-5 pe-5 py-3 d-flex justify-content-between align-items-start"
    : "container text-center ps-5 pe-5 py-3 d-flex justify-content-center align-items-start gap-5";
}

function routerLinkClass() {
  return exibir.value
    ? "d-flex flex-column gap-2 text-decoration-none link-body-emphasis"
    : "d-flex flex-column gap-2 text-decoration-none link-body-emphasis me-5 ms-5";
}
</script>

<template>
  <footer class="rounded-top-4 shadow-lg mt-auto" style="zoom: 75%">
    <div :class="classFooter()">
      <RouterLink :to="{ name: 'home' }" :class="routerLinkClass()" href="#">
        <FontAwesomeIcon :icon="faHouseLaptop" size="2x" />
        Home
      </RouterLink>
      <RouterLink :to="{ name: 'documents' }" :class="routerLinkClass()" href="#">
        <FontAwesomeIcon :icon="faFolderOpen" size="2x" />
        Dados
      </RouterLink>
      <a
        class="d-flex flex-column gap-2 text-decoration-none link-body-emphasis"
        href="#"
        v-if="exibir"
      >
        <FontAwesomeIcon :icon="faBell" size="2x" />
        Avisos
      </a>
      <a
        class="d-flex flex-column gap-2 text-decoration-none link-body-emphasis"
        href="#"
        v-if="exibir"
      >
        <FontAwesomeIcon :icon="faUser" size="2x" />
        Perfil
      </a>
    </div>
  </footer>
</template>
