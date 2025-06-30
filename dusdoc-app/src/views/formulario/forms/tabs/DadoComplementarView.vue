<script setup lang="ts">
import { piniaState } from "@/main";
import admissionalStore from "@/stores/admissional";
import { BFormSelect } from "bootstrap-vue-next";
import { storeToRefs } from "pinia";
import formSelect from "../resources/formSelect";

const { genOpt, corRacaOpt, grauEscolarOpt, estadoCivilOpt } = formSelect();

const { AdmissionalForm } = storeToRefs(admissionalStore(piniaState));
</script>

<template>
  <div
    class="tab-pane fade mt-2"
    id="profile-tab-pane"
    role="tabpanel"
    aria-labelledby="profile-tab"
    tabindex="0"
  >
    <div class="mb-3 card p-1">
      <label class="form-label p-1" for="genero"> Gênero </label>
      <BFormSelect id="genero" v-model="AdmissionalForm.genero" :options="genOpt"> </BFormSelect>
    </div>
    <div class="mb-3 card p-1">
      <label class="form-label p-1" for="cor-raca"> Cor E Raça </label>
      <BFormSelect id="cor-raca" v-model="AdmissionalForm.corRaca" :options="corRacaOpt">
      </BFormSelect>
    </div>
    <div class="mb-3 card p-1">
      <label class="form-label p-1" for="grau-escolar"> Grau Escolaridade </label>
      <BFormSelect
        id="grau-escolar"
        v-model="AdmissionalForm.grauEscolaridade"
        :options="grauEscolarOpt"
      >
      </BFormSelect>
    </div>
    <div class="mb-3 card p-1">
      <label class="form-label p-1" for="estado-civil"> Estado civil </label>
      <BFormSelect
        id="estado-civil"
        v-model="AdmissionalForm.estadoCivil"
        :options="estadoCivilOpt"
      >
      </BFormSelect>
    </div>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="nome-pai" placeholder="Nome Pai" />
      <label for="nome-pai" class="form-label"> Nome do Pai </label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="nome-mae" placeholder="Nome Mãe" />
      <label for="nome-mae" class="form-label"> Nome da Mãe </label>
    </div>
  </div>
</template>
