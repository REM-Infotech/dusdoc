<script setup lang="ts">
import { StyledDiv } from "@/components/styled";
import { ref } from "vue";

const avisos = ref(true);
</script>

<template>
  <StyledDiv id="carouselExample" class="carousel slide" data-bs-ride="carousel">
    <Transition name="fade" mode="out-in">
      <div v-if="!avisos" class="carousel-inner rounded rounded-4">
        <div class="carousel-item active">
          <div class="card bg-primary" style="height: 200px">teste</div>
        </div>
        <div class="carousel-item">
          <div class="card bg-success" style="height: 200px"></div>
        </div>
        <div class="carousel-item">
          <div class="card bg-warning" style="height: 200px"></div>
        </div>
      </div>
      <div v-else class="carousel-inner rounded rounded-4">
        <div class="carousel-item active">
          <div
            class="card bg-secondary d-flex flex-column justify-content-center align-items-center"
            style="height: 200px"
          >
            <span class="fs-4">Sem Avisos</span>
          </div>
        </div>
      </div>
    </Transition>

    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span class="visually-hidden">Next</span>
    </button>
  </StyledDiv>
</template>
