<script setup lang="ts">
import { useRoute } from "vue-router";
import MainHeader from "./header/MainHeader.vue";
import LoginHeader from "./header/LoginHeader.vue";

const route = useRoute();
</script>

<template>
  <Transition name="fade" mode="out-in">
    <MainHeader v-if="route.name !== 'login'" />
    <LoginHeader v-else />
  </Transition>
</template>
