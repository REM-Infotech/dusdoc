import { UploadableFile } from "@/components/dropzone/file_manager";
import api from "@/resources/axios";
import manager from "@/resources/socketio";
import type { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { reactive, watch } from "vue";

interface CepiApiResults extends AxiosResponse {
  data: {
    cep: string;
    address_type: string;
    address_name: string;
    address: string;
    state: string;
    district: string;
    lat: string;
    lng: string;
    city: string;
    city_ibge: string;
    ddd: string;
  };
}

function isOver14(dateString: string) {
  const birthDate = new Date(dateString);
  const today = new Date();

  // Calcula a diferença de anos
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  // Ajusta se ainda não fez aniversário este ano
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 14;
}

function isValidCep(cep: string) {
  return /^\d{5}-?\d{3}$/.test(cep);
}

const admissionalStore = defineStore("formAdmissional", () => {
  const io = manager.socket("/funcionario_forms");
  io.connect();
  const AdmissionalForm = reactive({
    id: "",
    cep: "",
    cpf: "",
    nome: "",
    email: "",
    cidade: "",
    estado: "",
    genero: null,
    corRaca: null,
    endereco: "",
    telefone: "",
    complemento: "",
    estadoCivil: null,
    data_nascimento: "",
    grauEscolaridade: null,
    numero_residencia: "",
  });

  const AdmissionalFormFiles = reactive({
    ctps: null,
    rg_cnh: null,
    titulo_eleitor: null,
    certidao_divorcio: null,
    certidao_casamento: null,
    certidao_reservista: null,
    comprovante_residencia: null,
  });

  watch(AdmissionalForm, async (newValue) => {
    AdmissionalForm.cep = newValue.cep
      .replace(/\D/g, "") // Remove tudo que não é número
      .replace(/^(\d{5})(\d{1,3})/, "$1-$2") // Aplica o formato 99999-999
      .substring(0, 9); // Garante no máximo 9 caracteres
    AdmissionalForm.telefone = newValue.telefone
      .replace(/\D/g, "") // Remove tudo que não for dígito
      .replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4}).*/, "($1) $2 $3-$4")
      .trim();
    AdmissionalForm.cpf = newValue.cpf
      .replace(/\D/g, "") // Remove tudo que não for dígito
      .replace(/^(\d{3})\.?(\d{3})\.?(\d{3})-?(\d{2})/, "$1.$2.$3-$4")
      .trim();

    if (newValue.data_nascimento && !isOver14(newValue.data_nascimento)) {
      alert("Insira uma data de nascimento válida!");
      AdmissionalForm.data_nascimento = "";
    }

    if (isValidCep(newValue.cep)) {
      try {
        const results: CepiApiResults = await api.get(
          `https://cep.awesomeapi.com.br/json/${newValue.cep.replace("-", "")}`,
        );

        AdmissionalForm.endereco = results.data.address;
        AdmissionalForm.estado = results.data.state;
        AdmissionalForm.cidade = results.data.city;
      } catch {
        //
      }
    }
    io.emit("admissional_form", { data: newValue });
  });

  watch(AdmissionalFormFiles, (newvalues) => {
    try {
      const cache_files = Object.entries(newvalues).map(([, file]: [string, File | null]) => {
        if (file) {
          return new UploadableFile(file);
        }
      });
      io.emit("admissional_files", { files: cache_files });
    } catch {
      //
    }
  });

  return {
    AdmissionalForm,
    AdmissionalFormFiles,
  };
});

export default admissionalStore;
