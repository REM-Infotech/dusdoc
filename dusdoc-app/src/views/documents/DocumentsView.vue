<script setup lang="ts">
import { piniaState } from "@/main";
import manager from "@/resources/socketio";
import storeDocuments from "@/stores/documentsStore";
import { storeToRefs } from "pinia";
import { onBeforeMount, onUnmounted } from "vue";
import ListDocsView from "./components/ListDocsView.vue";
import SolicitacoesView from "./components/SolicitacoesView.vue";

interface Solicitacao {
  id: string;
  solicitacao_desc: string;
  data_solicitacao: string;
  prazo: string;
  extension_file: string;
}

const { solicitacoes, files } = storeToRefs(storeDocuments(piniaState));

const io = manager.socket("/funcionario_informacoes");
io.connect();

function documentos_solicitacoes() {
  io.emit("solicitados", { data: { id: "1" } }, (data: Solicitacao[]) => {
    console.log(data);
    solicitacoes.value = data;
  });

  io.emit("my_docs", { data: { id: "1" } }, (data: Record<string, string>[]) => {
    files.value = data;
  });
}

onBeforeMount(() => {
  documentos_solicitacoes();
});

onUnmounted(() => {
  solicitacoes.value = [];
  files.value = [];
});

io.on("update_data", () => {
  documentos_solicitacoes();
});
</script>

<template>
  <div class="d-flex flex-column gap-4 overflow-y-auto py-2 align-items-center overflow-x-hidden">
    <ListDocsView class="w-100 ps-3 pe-3" />
    <SolicitacoesView class="w-100 ps-3 pe-3" />
  </div>
</template>
