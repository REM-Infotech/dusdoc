<script setup lang="ts">
import {
  faFileInvoice,
  faDownload,
  faIdCard,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { StyledDiv } from "@/components/styled";
import { ref } from "vue";

const arquivos = ref(false);
</script>

<template>
  <StyledDiv class="mt-2" id="files">
    <div class="d-flex gap-0 justify-content-between align-items-center">
      <span class="ms-1 fw-semibold">Documentos recentes</span>
      <a class="fw-semibold link-offset-3" href="#" @click="arquivos = !arquivos">Ver todos</a>
    </div>
    <div class="card mt-2 overflow-x-hidden">
      <TransitionGroup
        class="list-group overflow-y-auto overflow-x-hidden"
        name="list"
        tag="ul"
        mode="out-in"
        :style="{ 'height: 200px': arquivos }"
      >
        <li class="list-group-item p-2" v-if="arquivos">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-start align-items-center">
              <div class="p-2 bg-primary rounded">
                <FontAwesomeIcon :icon="faFileInvoice" size="lg" color="white" />
              </div>
              <div class="d-grid gap-0 ms-2">
                <span class="fw-semibold">Contracheque Maio/2025</span>
                <span class="text-secondary fw-semibold"> Enviado em 21/05/2024 </span>
              </div>
            </div>
            <a href="#" class="bg-opacity-25 rounded">
              <FontAwesomeIcon :icon="faDownload" size="2x" color="blue" />
            </a>
          </div>
        </li>
        <li class="list-group-item p-2" v-if="arquivos">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-start align-items-center">
              <div class="p-1 bg-success rounded">
                <FontAwesomeIcon :icon="faIdCard" size="lg" color="white" />
              </div>
              <div class="d-grid gap-0 ms-2">
                <span class="fw-semibold">Carteira Identificação</span>
                <span class="text-secondary fw-semibold"> Atualizado em 21/05/2024 </span>
              </div>
            </div>
            <a href="#" class="bg-opacity-25 rounded">
              <FontAwesomeIcon :icon="faDownload" size="2x" color="blue" />
            </a>
          </div>
        </li>
        <li class="list-group-item p-2" v-if="arquivos">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-start align-items-center">
              <div class="p-2 bg-warning rounded" style="">
                <FontAwesomeIcon :icon="faFileContract" size="lg" color="white" />
              </div>
              <div class="d-grid gap-0 ms-2">
                <span class="fw-semibold">Contrato de Experiência</span>
                <span class="text-secondary fw-semibold"> Atualizado em 21/05/2024 </span>
              </div>
            </div>
            <a href="#" class="bg-opacity-25 rounded">
              <FontAwesomeIcon :icon="faDownload" size="2x" color="blue" />
            </a>
          </div>
        </li>
      </TransitionGroup>
    </div>
  </StyledDiv>
</template>

<style lang="css" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
