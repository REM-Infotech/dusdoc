<script setup lang="ts">
import { BFormGroup, BFormInput } from "bootstrap-vue-next";
import { reactive, ref } from "vue";

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

const errors = ref<any>({});
const success = ref(false);

function handleSubmit(e: Event) {
  e.preventDefault();
  errors.value = {};
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

            <div class="form-group">
              <label for="endereco">Endereço</label>
              <input
                v-model="form.endereco"
                id="endereco"
                type="text"
                :class="{ invalid: errors.endereco }"
              />
              <span v-if="errors.endereco" class="error">{{ errors.endereco }}</span>
            </div>
            <div class="form-group">
              <label for="numero_residencia">Número</label>
              <input
                v-model="form.numero_residencia"
                id="numero_residencia"
                type="text"
                :class="{ invalid: errors.numero_residencia }"
              />
              <span v-if="errors.numero_residencia" class="error">{{
                errors.numero_residencia
              }}</span>
            </div>
            <div class="form-group">
              <label for="complemento">Complemento</label>
              <input v-model="form.complemento" id="complemento" type="text" />
            </div>
            <div class="form-group">
              <label for="cidade">Cidade</label>
              <input
                v-model="form.cidade"
                id="cidade"
                type="text"
                :class="{ invalid: errors.cidade }"
              />
              <span v-if="errors.cidade" class="error">{{ errors.cidade }}</span>
            </div>
            <div class="form-group">
              <label for="estado">Estado</label>
              <input
                v-model="form.estado"
                id="estado"
                type="text"
                :class="{ invalid: errors.estado }"
              />
              <span v-if="errors.estado" class="error">{{ errors.estado }}</span>
            </div>
            <div class="form-group">
              <label for="genero">Gênero</label>
              <select v-model="form.genero" id="genero" :class="{ invalid: errors.genero }">
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
              <span v-if="errors.genero" class="error">{{ errors.genero }}</span>
            </div>
            <div class="form-group">
              <label for="corRaca">Cor/Raça</label>
              <select v-model="form.corRaca" id="corRaca" :class="{ invalid: errors.corRaca }">
                <option value="">Selecione</option>
                <option value="Branco">Branco</option>
                <option value="Preto">Preto</option>
                <option value="Pardo">Pardo</option>
                <option value="Amarelo">Amarelo</option>
                <option value="Indígena">Indígena</option>
              </select>
              <span v-if="errors.corRaca" class="error">{{ errors.corRaca }}</span>
            </div>
            <div class="form-group">
              <label for="grauEscolaridade">Grau de Escolaridade</label>
              <select
                v-model="form.grauEscolaridade"
                id="grauEscolaridade"
                :class="{ invalid: errors.grauEscolaridade }"
              >
                <option value="">Selecione</option>
                <option value="Fundamental Incompleto">Fundamental Incompleto</option>
                <option value="Fundamental Completo">Fundamental Completo</option>
                <option value="Médio Incompleto">Médio Incompleto</option>
                <option value="Médio Completo">Médio Completo</option>
                <option value="Superior Incompleto">Superior Incompleto</option>
                <option value="Superior Completo">Superior Completo</option>
              </select>
              <span v-if="errors.grauEscolaridade" class="error">{{
                errors.grauEscolaridade
              }}</span>
            </div>
            <div class="form-group">
              <label for="estadoCivil">Estado Civil</label>
              <select
                v-model="form.estadoCivil"
                id="estadoCivil"
                :class="{ invalid: errors.estadoCivil }"
              >
                <option value="">Selecione</option>
                <option value="Solteiro">Solteiro</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Viúvo">Viúvo</option>
              </select>
              <span v-if="errors.estadoCivil" class="error">{{ errors.estadoCivil }}</span>
            </div>
            <button class="btn btn-success" type="submit">Validar Dados</button>
          </form>
          <div v-if="success" class="success">Dados validados com sucesso!</div>
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
