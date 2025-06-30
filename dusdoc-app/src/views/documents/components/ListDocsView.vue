<script setup lang="ts">
import { StyledDiv } from "@/components/styled";
import { piniaState } from "@/main";
import storeDocuments from "@/stores/documentsStore";
import { faDownload, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const { files } = storeToRefs(storeDocuments(piniaState));

const query = ref("");

const computedFiles = computed(() => {
  return files.value.filter((file) =>
    file.file_desc.toLowerCase().includes(query.value.toLowerCase()),
  );
});

const classIcons: Record<string, string> = {
  png: "p-1 bg-secondary rounded",
  word: "p-1 bg-primary rounded",
  pdf: "p-1 bg-danger rounded",
  xml: "p-1 bg-warning rounded",
};

function classIcon(extension_file: string) {
  return classIcons[extension_file] || "p-1 bg-secondary rounded";
}
</script>

<template>
  <StyledDiv class="mt-2" id="files">
    <div class="d-flex gap-0 justify-content-between align-items-center">
      <span class="ms-1 fw-semibold">Meus documentos</span>
      <div>
        <input
          type="text"
          class="form-control form-control-sm"
          id="floatingInput"
          placeholder="Busque aqui..."
          v-model="query"
        />
      </div>
    </div>
    <div class="card mt-2 overflow-x-hidden" :style="{ height: files.length >= 8 ? '400px' : '' }">
      <TransitionGroup
        class="list-group overflow-y-auto overflow-x-hidden"
        name="list"
        tag="ul"
        mode="out-in"
      >
        <li
          class="list-group-item p-2"
          v-for="(file, index) in computedFiles"
          :key="file.file_desc"
          :data-index="index"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-start align-items-center">
              <div :class="classIcon(file.extension_file)">
                <FontAwesomeIcon :icon="faFileInvoice" size="xl" color="white" />
              </div>
              <div class="d-grid gap-0 ms-2">
                <span class="fw-semibold">{{ file.file_desc }}</span>
                <span class="text-secondary fw-semibold" v-if="file.send_date">
                  Atualizado em {{ file.send_date }}</span
                >
                <span class="text-secondary fw-semibold" v-else-if="file.request_date">
                  Solicitado em {{ file.request_date }}</span
                >
              </div>
            </div>
            <a href="#" class="bg-opacity-25 rounded">
              <FontAwesomeIcon :icon="faDownload" size="2x" />
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
