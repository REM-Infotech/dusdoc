<script setup lang="ts">
import manager from "@/resources/socketio";
import { ref } from "vue";
import CardEmployee from "./components/CardEmployee.vue";
import CardSolicitacao from "./components/CardSolicitacao.vue";
import ListDocsView from "./components/ListDocsView.vue";
import SolicitacoesView from "./components/SolicitacoesView.vue";

const avisos = ref(false);

const io = manager.socket("/");
io.connect();
io.emit("test", () => {
  //
});
</script>

<template>
  <div class="d-flex flex-column gap-4 overflow-y-auto py-2 align-items-center overflow-x-hidden">
    <CardEmployee class="w-100 ps-3 pe-3" />
    <ListDocsView class="w-100 ps-3 pe-3" />
    <SolicitacoesView class="w-100 ps-3 pe-3" />
    <CardSolicitacao class="w-100 ps-3 pe-3" v-if="avisos" />
  </div>
</template>
