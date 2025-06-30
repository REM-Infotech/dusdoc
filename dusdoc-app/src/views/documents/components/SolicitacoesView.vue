<script setup lang="ts">
import { StyledDiv } from "@/components/styled";
import { piniaState } from "@/main";
import storeDocuments from "@/stores/documentsStore";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import type { Solicitacao } from "../types";

const { solicitacoes } = storeToRefs(storeDocuments(piniaState));

const query = ref("");

const computedFiles = computed(() => {
  return solicitacoes.value.filter((solicitacao) =>
    solicitacao.solicitacao_desc.toLowerCase().includes(query.value.toLowerCase()),
  );
});

function checkPrazo(file: Solicitacao) {
  const data_prazo = new Date(file.prazo);
  const today = new Date();

  return today < data_prazo ? false : true;
}

const classIcons: Record<string, string> = {
  png: "p-1 bg-primary rounded",
  word: "p-1 bg-primary rounded",
  pdf: "p-1 bg-danger rounded",
};

function classIcon(extension_file: string) {
  return classIcons[extension_file] || "p-1 bg-secondary rounded";
}
</script>

<template>
  <StyledDiv class="mt-2" id="solicitacoes">
    <div class="d-flex gap-0 justify-content-between align-items-center">
      <span class="ms-1 fw-semibold">Solicitações</span>
    </div>
    <div
      class="card mt-2 overflow-x-hidden"
      :style="{ height: solicitacoes.length >= 8 ? '150px' : '' }"
    >
      <TransitionGroup
        class="list-group overflow-y-auto overflow-x-hidden"
        name="list"
        tag="ul"
        mode="out-in"
      >
        <li
          class="list-group-item p-2"
          v-for="(file, index) in computedFiles"
          :key="file.solicitacao_desc"
          :data-index="index"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-start align-items-center">
              <div :class="classIcon(file.extension_file)">
                <FontAwesomeIcon :icon="faFileInvoice" size="xl" color="white" />
              </div>
              <div class="d-grid gap-0 ms-2">
                <span class="fw-semibold">{{ file.solicitacao_desc }}</span>
                <span class="text-secondary fw-semibold">
                  Solicitado em {{ file.data_solicitacao }}
                </span>
                <span class="text-secondary fw-semibold"> Prazo {{ file.prazo }} </span>
              </div>
            </div>
            <RouterLink
              v-if="checkPrazo(file)"
              :to="{ name: 'form', params: { typeform: 'admissional', id: file.id } }"
              class="btn btn-primary btn-sm bg-opacity-25 rounded"
            >
              Ver Formulário
            </RouterLink>
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
