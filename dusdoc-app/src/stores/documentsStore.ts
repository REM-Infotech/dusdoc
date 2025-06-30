import { defineStore } from "pinia";
import { ref } from "vue";

interface Solicitacao {
  id: string;
  solicitacao_desc: string;
  data_solicitacao: string;
  prazo: string;
  extension_file: string;
}

const storeDocuments = defineStore("storeDocuments", () => {
  const solicitacoes = ref<Solicitacao[]>([]);
  const files = ref<Record<string, string>[]>([]);
  return { solicitacoes, files };
});

export default storeDocuments;
