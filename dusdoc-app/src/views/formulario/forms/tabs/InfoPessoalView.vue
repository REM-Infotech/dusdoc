<script setup lang="ts">
import { piniaState } from "@/main";
import admissionalStore from "@/stores/admissional";
import { storeToRefs } from "pinia";
const { AdmissionalForm } = storeToRefs(admissionalStore(piniaState));
</script>

<template>
  <div
    class="tab-pane fade mt-2 show active"
    id="home-tab-pane"
    role="tabpanel"
    aria-labelledby="home-tab"
    tabindex="0"
  >
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="nome"
        placeholder="Digite o nome completo"
        v-model="AdmissionalForm.nome"
      />
      <label for="nome" class="form-label">Nome</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="cpf"
        placeholder="Digite o CPF"
        v-model="AdmissionalForm.cpf"
      />
      <label for="cpf" class="form-label">CPF</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="date"
        class="form-control"
        id="dataNascimento"
        v-model="AdmissionalForm.data_nascimento"
      />
      <label for="dataNascimento" class="form-label">Data de Nascimento</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        id="email"
        placeholder="Digite o email"
        v-model="AdmissionalForm.email"
      />
      <label for="email" class="form-label">E-mail</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="tel"
        class="form-control"
        id="telefone"
        placeholder="Digite o telefone"
        v-model="AdmissionalForm.telefone"
      />
      <label for="telefone" class="form-label">Telefone</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="cep"
        placeholder="Digite o CEP"
        v-model="AdmissionalForm.cep"
      />
      <label for="cep" class0="form-label">CEP</label>
    </div>
    <div class="row">
      <div class="col-8">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="endereco"
            placeholder="Digite o endereço"
            v-model="AdmissionalForm.endereco"
          />
          <label for="endereco" class="form-label">Endereço</label>
        </div>
      </div>
      <div class="col-4">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="numero_residencia"
            placeholder="Digite o endereço"
            v-model="AdmissionalForm.numero_residencia"
          />
          <label for="numero_residencia" class="form-label"> Número </label>
        </div>
      </div>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="complemento"
        placeholder="Digite o endereço"
        v-model="AdmissionalForm.complemento"
      />
      <label for="complemento" class="form-label">Complemento</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="cidade"
        placeholder="Digite a cidade"
        v-model="AdmissionalForm.cidade"
      />
      <label for="cidade" class="form-label">Cidade</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="estado"
        placeholder="Digite o estado"
        v-model="AdmissionalForm.estado"
      />
      <label for="estado" class="form-label">Estado</label>
    </div>
  </div>
</template>
