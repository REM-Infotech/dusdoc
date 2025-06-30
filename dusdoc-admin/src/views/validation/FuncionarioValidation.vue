<template>
  <h1 class="mt-4 fw-bold text-body-secondary">Validação de Dados do Funcionário</h1>
  <div class="container bg-dark rounded rounded-4 p-2 mt-4">
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
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="nome">Nome</label>
              <input v-model="form.nome" id="nome" type="text" :class="{ invalid: errors.nome }" />
              <span v-if="errors.nome" class="error">{{ errors.nome }}</span>
            </div>
            <div class="form-group">
              <label for="cpf">CPF</label>
              <input
                v-model="form.cpf"
                id="cpf"
                type="text"
                maxlength="14"
                :class="{ invalid: errors.cpf }"
              />
              <span v-if="errors.cpf" class="error">{{ errors.cpf }}</span>
            </div>
            <div class="form-group">
              <label for="data_nascimento">Data de Nascimento</label>
              <input
                v-model="form.data_nascimento"
                id="data_nascimento"
                type="date"
                :class="{ invalid: errors.data_nascimento }"
              />
              <span v-if="errors.data_nascimento" class="error">{{ errors.data_nascimento }}</span>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="form.email"
                id="email"
                type="email"
                :class="{ invalid: errors.email }"
              />
              <span v-if="errors.email" class="error">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <label for="telefone">Telefone</label>
              <input
                v-model="form.telefone"
                id="telefone"
                type="tel"
                :class="{ invalid: errors.telefone }"
              />
              <span v-if="errors.telefone" class="error">{{ errors.telefone }}</span>
            </div>
            <div class="form-group">
              <label for="cep">CEP</label>
              <input
                v-model="form.cep"
                id="cep"
                type="text"
                maxlength="9"
                :class="{ invalid: errors.cep }"
              />
              <span v-if="errors.cep" class="error">{{ errors.cep }}</span>
            </div>
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
              <span>{{ labelArquivo(key) }}:</span>
              <a v-if="file && typeof file === 'string'" :href="file" target="_blank">Visualizar</a>
              <span v-else>Nenhum arquivo enviado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref<"dados" | "arquivos">("dados");

const form = ref({
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

const arquivos = ref({
  rg_cnh: "",
  ctps: "",
  comprovante_residencia: "",
  titulo_eleitor: "",
  certidao_reservista: "",
  certidao_casamento: "",
  certidao_divorcio: "",
});

function labelArquivo(key: string) {
  switch (key) {
    case "rg_cnh":
      return "RG ou CNH";
    case "ctps":
      return "CTPS";
    case "comprovante_residencia":
      return "Comprovante de Residência";
    case "titulo_eleitor":
      return "Título de Eleitor";
    case "certidao_reservista":
      return "Certidão de Reservista";
    case "certidao_casamento":
      return "Certidão de Casamento";
    case "certidao_divorcio":
      return "Certidão de Divórcio";
    default:
      return key;
  }
}

const errors = ref<any>({});
const success = ref(false);

function validateCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
  let sum = 0,
    rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function isOver14(dateString: string) {
  if (!dateString) return false;
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 14;
}

function validateCEP(cep: string) {
  return /^\d{5}-?\d{3}$/.test(cep);
}

function handleSubmit() {
  errors.value = {};
  success.value = false;
  if (!form.value.nome) errors.value.nome = "Nome é obrigatório";
  if (!form.value.cpf || !validateCPF(form.value.cpf)) errors.value.cpf = "CPF inválido";
  if (!form.value.data_nascimento || !isOver14(form.value.data_nascimento))
    errors.value.data_nascimento = "Data inválida ou menor de 14 anos";
  if (!form.value.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.email))
    errors.value.email = "Email inválido";
  if (!form.value.telefone || form.value.telefone.length < 10)
    errors.value.telefone = "Telefone inválido";
  if (!form.value.cep || !validateCEP(form.value.cep)) errors.value.cep = "CEP inválido";
  if (!form.value.endereco) errors.value.endereco = "Endereço é obrigatório";
  if (!form.value.numero_residencia) errors.value.numero_residencia = "Número é obrigatório";
  if (!form.value.cidade) errors.value.cidade = "Cidade é obrigatória";
  if (!form.value.estado) errors.value.estado = "Estado é obrigatório";
  if (!form.value.genero) errors.value.genero = "Gênero é obrigatório";
  if (!form.value.corRaca) errors.value.corRaca = "Cor/Raça é obrigatória";
  if (!form.value.grauEscolaridade) errors.value.grauEscolaridade = "Escolaridade é obrigatória";
  if (!form.value.estadoCivil) errors.value.estadoCivil = "Estado civil é obrigatório";
  if (Object.keys(errors.value).length === 0) {
    success.value = true;
  }
}
</script>

<style scoped>
.validation-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 1rem;
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
