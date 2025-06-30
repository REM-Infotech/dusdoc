import { defineStore } from "pinia";
import { ref } from "vue";

const funcionariosStore = defineStore("funcionariosStore", () => {
  const dataFuncionarios = ref<string[][]>([]);

  return { dataFuncionarios };
});

export default funcionariosStore;
