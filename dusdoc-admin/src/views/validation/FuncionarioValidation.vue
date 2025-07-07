<script setup lang="ts">
import { BFormGroup, BFormInput } from "bootstrap-vue-next";
import { reactive } from "vue";

const form = reactive({
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

const arquivos = reactive({
  rg_cnh: "",
  ctps: "",
  comprovante_residencia: "",
  titulo_eleitor: "",
  certidao_reservista: "",
  certidao_casamento: "",
  certidao_divorcio: "",
});

function handleSubmit(e: Event) {
  e.preventDefault();
}

function validState(data: unknown) {
  return data ? false : null;
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
          <div class="files-list">
            <div v-for="(file, key) in arquivos" :key="key" class="file-item">
              <a v-if="file && typeof file === 'string'" :href="file" target="_blank">Visualizar</a>
              <span v-else>Nenhum arquivo enviado</span>
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
