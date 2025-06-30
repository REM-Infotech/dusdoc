<template>
  <!-- add `data-active` and the event listeners -->
  <div
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <!-- share state with the scoped slot -->
    <slot :dropZoneActive="active"></slot>
  </div>
</template>

<script setup lang="ts">
// make sure to import `ref` from Vue
import { ref } from "vue";
const emit = defineEmits(["files-dropped"]);

// Create `active` state and manage it with functions
const active = ref(false);

function setActive() {
  active.value = true;
}
function setInactive() {
  active.value = false;
}

// Remove DropZoneEvent interface and use DragEvent directly

function onDrop(e: DragEvent) {
  setInactive(); // add this line too
  if (e.dataTransfer && e.dataTransfer.files) {
    emit("files-dropped", [...e.dataTransfer.files]);
  }
}

// ... nothing changed below this
</script>
