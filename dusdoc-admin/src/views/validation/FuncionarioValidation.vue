<script setup lang="ts">
import { api } from "@/defaults/axios";
import type { AxiosResponse } from "axios";
import { BFormGroup, BFormInput } from "bootstrap-vue-next";
import { onBeforeMount, reactive, ref, type IframeHTMLAttributes } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const form = reactive<{ [key: string]: string }>({
  nome: "",
  cpf: "",
  data_nascimento: "",
  email: "",
  telefone: "",
  cep: "",
  endereco: "",
  numero_residencia: "",
  complemento: "",
  cidade: "",
  estado: "",
  genero: "",
  corRaca: "",
  grauEscolaridade: "",
  estadoCivil: "",
});

interface Arquivo {
  id: number;
  filename: string;
  secondary_filename: string;
  filetype: string;
  size: number;
  mimetype: number;
  mimetype_params: Record<string, string>;
}

const currentFile = ref<Arquivo | null>(null);
const fileView = ref<string>("");

interface Arquivos {
  [key: string]: string | Arquivo;
  rg_cnh: string | Arquivo;
  ctps: string | Arquivo;
  comprovante_residencia: string | Arquivo;
  titulo_eleitor: string | Arquivo;
  certidao_reservista: string | Arquivo;
  certidao_casamento: string | Arquivo;
  certidao_divorcio: string | Arquivo;
}

const arquivos = reactive<Arquivos>({
  rg_cnh: "",
  ctps: "",
  comprovante_residencia: "",
  titulo_eleitor: "",
  certidao_reservista: "",
  certidao_casamento: "",
  certidao_divorcio: "",
});

onBeforeMount(async () => {
  let response: AxiosResponse;
  try {
    response = await api.get(`/admin/data/funcionario/${route.params.funcionario_id}`);

    if (response.data.dados) {
      const dataRequest: Record<string, string> = response.data.dados;
      Object.entries(form).map(([key, _]) => {
        form[key] = dataRequest[key];
      });

      (Array.from(response.data.arquivos) as Arquivo[]).map((value: Arquivo) => {
        arquivos[value.filename] = value;
      });
    }
  } catch {
    // alert("Erro ao obter informações de funcionário");
    // router.push({ name: "funcionarios" });
  }
});

function handleSubmit(e: Event) {
  e.preventDefault();
}

function validState(data: unknown) {
  return data ? false : null;
}

function checkType(val: unknown) {
  return typeof val === "string";
}

function setFileView(file: Arquivo) {
  currentFile.value = file;

  (document.getElementById("pdfFrame") as unknown as IframeHTMLAttributes).src =
    import.meta.env.VITE_API_URL + `/admin/file/funcionario/${file.id}`;
}
</script>

<template>
  <h1 class="mt-4 fw-bold text-body-secondary">Validação de Dados do Funcionário</h1>
  <div class="container-fluid bg-dark rounded rounded-4 p-2 mt-4">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="DadosTab"
          data-bs-toggle="tab"
          data-bs-target="#DadosTab-pane"
          type="button"
          role="tab"
          aria-controls="DadosTab-pane"
          aria-selected="true"
        >
          Home
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="ArquivosTab"
          data-bs-toggle="tab"
          data-bs-target="#ArquivosTab-pane"
          type="button"
          role="tab"
          aria-controls="ArquivosTab-pane"
          aria-selected="false"
        >
          Profile
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="DadosTab-pane"
        role="tabpanel"
        aria-labelledby="DadosTab"
        tabindex="0"
      >
        <div class="p-3">
          <form @submit="handleSubmit">
            <BFormGroup
              class="mb-3"
              id="fieldset-nome"
              label="Nome"
              label-for="input-nome"
              label-class="mb-1"
            >
              <BFormInput id="input-nome" v-model="form.nome" trim />
            </BFormGroup>
            <BFormGroup
              class="mb-3"
              id="fieldset-cpf"
              label="CPF"
              label-for="input-CPF"
              label-class="mb-1"
            >
              <BFormInput id="input-CPF" v-model="form.cpf" trim />
            </BFormGroup>
            <BFormGroup
              class="mb-3"
              id="fieldset-data-nascimento"
              label="Data de Nascimento"
              label-for="input-data-nascimento"
              label-class="mb-1"
            >
              <BFormInput
                id="input-data-nascimento"
                type="date"
                v-model="form.data_nascimento"
                trim
              />
            </BFormGroup>
            <BFormGroup
              class="mb-3"
              id="fieldset-telefone"
              label="Telefone"
              label-for="input-telefone"
              label-class="mb-1"
            >
              <BFormInput id="input-telefone" v-model="form.telefone" trim />
            </BFormGroup>
            <BFormGroup
              class="mb-3"
              id="fieldset-cep"
              label="CEP"
              label-for="input-cep"
              label-class="mb-1"
            >
              <BFormInput id="input-cep" v-model="form.cep" trim />
            </BFormGroup>
            <BFormGroup
              class="mb-3"
              id="fieldset-endereco"
              label="Endereço"
              label-for="input-endereco"
              label-class="mb-1"
            >
              <BFormInput id="input-endereco" v-model="form.endereco" trim />
            </BFormGroup>
            <button class="btn btn-success" type="submit">Validar Dados</button>
          </form>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="ArquivosTab-pane"
        role="tabpanel"
        aria-labelledby="ArquivosTab"
        tabindex="0"
      >
        <div>
          <div class="row g-3">
            <div class="col-6">
              <div v-for="(file, key) in arquivos" :key="key" class="file-item">
                <div
                  v-if="!checkType(file)"
                  class="d-flex flex-column rounded rounded-4 border p-3 gap-4"
                >
                  <span>{{ file.filename }}</span>
                  <button class="btn btn-primary" @click="setFileView(file)">Visualizar</button>
                </div>
              </div>
            </div>
            <div class="col-6 p-3">
              <div class="card" style="height: 65dvh">
                <div class="card-body">
                  <iframe
                    id="pdfFrame"
                    src=""
                    frameborder="0"
                    class="w-100 h-100 pdf-frame"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.validation-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.tabs button {
  padding: 0.5rem 1.5rem;
  border: none;
  background: #eee;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
}
.tabs button.active {
  background: #fff;
  border-bottom: 2px solid #27ae60;
  font-weight: bold;
}
.files-list {
  margin-top: 1rem;
}
.file-item {
  margin-bottom: 1rem;
}
input.invalid,
select.invalid {
  border-color: #e74c3c;
}
.error {
  color: #e74c3c;
  font-size: 0.9em;
}
.success {
  color: #27ae60;
  margin-top: 1rem;
}
</style>
