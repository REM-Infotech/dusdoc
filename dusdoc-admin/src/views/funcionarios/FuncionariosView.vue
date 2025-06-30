<script setup lang="ts">
import { pinia } from "@/main";
import manager from "@/resouces/socketio";
import funcionariosStore from "@/stores/funcionarios";
import { storeToRefs } from "pinia";
import { onBeforeMount, onUnmounted } from "vue";
import CardsView from "./components/CardsView.vue";

const { dataFuncionarios } = storeToRefs(funcionariosStore(pinia));

const io = manager.socket("/admin_funcionarios_informacoes");
io.connect();

onUnmounted(() => {
  dataFuncionarios.value = [];
});

onBeforeMount(() => {
  funcionarios_data_req();
});

io.on("update_data", () => {
  funcionarios_data_req();
});

function funcionarios_data_req() {
  io.emit("listagem_funcionarios", (dataReturn: Record<string, string[][]>) => {
    const formatted = Array.isArray(dataReturn)
      ? dataReturn.map((item) => Object.values(item).map(String))
      : [];
    dataFuncionarios.value = formatted;
  });
}
</script>

<template>
  <h1 class="mt-4 fw-bold text-body-secondary">Funcionários</h1>
  <ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Visão geral dos Funcionários</li>
  </ol>
  <CardsView />
</template>
