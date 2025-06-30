<script setup lang="ts">
import IconExample from "@/components/icons/IconExample.vue";
import StatusAtivo from "@/components/icons/StatusAtivo.vue";
import { StyledDiv } from "@/components/styled";
import { ref } from "vue";
const ativo = ref(true);
</script>

<template>
  <StyledDiv>
    <div class="card justify-content-start">
      <div class="card-body d-flex gap-3">
        <!-- <img
          class="rounded rounded-3"
          src="@/assets/img/favicon.png"
          alt=""
          width="56px"
          height="56px"
        /> -->
        <IconExample width="56px" height="56px" />
        <div class="d-flex flex-column">
          <span class="fw-bold">André Santos</span>
          <div class="d-flex gap-2 text-body-secondary fw-semibold mb-2">
            <span>ID: 12345</span> •
            <span>Analista de TI</span>
          </div>
          <div id="status">
            <StatusAtivo v-if="ativo" />
          </div>
        </div>
      </div>
    </div>
  </StyledDiv>
</template>
