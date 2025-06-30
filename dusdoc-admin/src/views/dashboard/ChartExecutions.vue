<!-- filepath: /home/nicholas-silva/VueDusDoc/src/views/dashboard/ChartExecutions.vue -->
<template>
  <div class="canvaRender">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--color-paua-500",
);
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (canvasRef.value) {
    new Chart(canvasRef.value, {
      type: "bar",
      data: {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        datasets: [
          {
            label: "Execuções",
            data: [10, 20, 15, 35, 10, 20, 15, 35, 85, 27, 57, 28],
            backgroundColor: primaryColor,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: "Execuções por mês" },
        },
      },
    });
  }
});
</script>

<style lang="css" scoped>
.canvaRender {
  width: 95%;
  height: 95%;
  transition: 15s;
}
</style>
