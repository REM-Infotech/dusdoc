<script setup lang="ts">
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<template>
  <div class="rounded rounded-circle border border-4 p-3">
    <FontAwesomeIcon class="rounded" :icon="faUser" size="5x" />
  </div>
</template>
