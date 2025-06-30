<script setup lang="ts">
import { useRoute } from "vue-router";
import MainFooter from "./footer/MainFooter.vue";
import LoginFooter from "./footer/LoginFooter.vue";

const route = useRoute();
</script>

<template>
  <Transition name="fade" mode="out-in">
    <MainFooter v-if="route.name !== 'login'" />
    <LoginFooter v-else />
  </Transition>
</template>
