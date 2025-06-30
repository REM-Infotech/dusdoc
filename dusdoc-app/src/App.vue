<script setup lang="ts">
import "@/assets/scripts/color-modes.js";
import FooterView from "./components/FooterView.vue";
import HeaderView from "./components/HeaderView.vue";
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

watch(route, (newroute) => {
  document.title = newroute.name as string;
});
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <div class="d-flex flex-column h-100 justify-content-center">
      <HeaderView />
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="route.name" />
      </Transition>
      <FooterView />
    </div>
  </RouterView>
</template>
