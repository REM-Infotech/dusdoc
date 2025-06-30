<script setup lang="ts">
import {
  faFileInvoice,
  faIdCard,
  faFileContract,
  faStopwatch,
  faCheckCircle,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { StyledDiv } from "@/components/styled";
import { ref } from "vue";

const arquivos = ref(false);
</script>

<template>
  <StyledDiv class="mt-2" id="files">
    <div class="d-flex gap-0 justify-content-between align-items-center">
      <span class="ms-1 fw-semibold">Documentos Solicitados</span>
      <a class="fw-semibold link-offset-3" href="#" @click="arquivos = !arquivos">Ver todos</a>
    </div>
    <div class="card mt-2">
      <TransitionGroup
        class="list-group"
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
                <span class="fw-semibold">Certidão CDI</span>
                <span class="text-secondary fw-semibold"> Solicitado em 21/02/2024 </span>
              </div>
            </div>
            <div
              class="bg-opacity-10 p-1 bg-success text-decoration-none link-body-emphasis rounded d-flex justify-content-center align-items-center gap-2"
            >
              <FontAwesomeIcon :icon="faCheckCircle" size="1x" class="text-success" />
              <span class="text-success" style="font-size: 0.8rem">Concluido</span>
            </div>
          </div>
        </li>
        <li class="list-group-item p-2" v-if="arquivos">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-start align-items-center">
              <div class="p-1 bg-success rounded">
                <FontAwesomeIcon :icon="faIdCard" size="lg" color="white" />
              </div>
              <div class="d-grid gap-0 ms-2">
                <span class="fw-semibold">Identidade (RG/CNH)</span>
                <span class="text-secondary fw-semibold"> Solicitado em 21/02/2024 </span>
              </div>
            </div>
            <div
              class="bg-opacity-10 p-1 bg-primary text-decoration-none link-body-emphasis rounded d-flex justify-content-center align-items-center gap-2"
            >
              <FontAwesomeIcon :icon="faStopwatch" size="1x" class="text-primary" />
              <span class="text-primary" style="font-size: 0.8rem">Analisando</span>
            </div>
          </div>
        </li>
        <li class="list-group-item p-2" v-if="arquivos">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-start align-items-center">
              <div class="p-2 bg-warning rounded" style="">
                <FontAwesomeIcon :icon="faFileContract" size="lg" color="white" />
              </div>
              <div class="d-grid gap-0 ms-2">
                <span class="fw-semibold">Comprovante de Residência</span>
                <span class="text-secondary fw-semibold"> Solicitado em 21/02/2024 </span>
              </div>
            </div>
            <div
              class="bg-opacity-10 p-1 bg-warning text-decoration-none link-body-emphasis rounded d-flex justify-content-center align-items-center gap-2"
            >
              <FontAwesomeIcon :icon="faWarning" size="1x" class="text-warning" />
              <span class="text-warning" style="font-size: 0.8rem">Pendente</span>
            </div>
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
