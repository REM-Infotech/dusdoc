<script setup lang="ts">
import { piniaState } from "@/main";
import admissionalStore from "@/stores/admissional";
import { storeToRefs } from "pinia";
const { AdmissionalForm, AdmissionalFormFiles } = storeToRefs(admissionalStore(piniaState));

import { BFormFile } from "bootstrap-vue-next";
</script>
<template>
  <div
    class="tab-pane fade mt-2"
    id="contact-tab-pane"
    role="tabpanel"
    aria-labelledby="contact-tab"
    tabindex="0"
  >
    <div class="card mb-3">
      <div class="card-header">
        <span> RG ou CNH </span>
      </div>
      <div class="card-body">
        <BFormFile
          v-model="AdmissionalFormFiles.rg_cnh"
          :accept="['.pdf', '.png', '.jpg', '.jpeg']"
        />
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-header">
        <span> CTPS (Carteira de Trabalho) </span>
      </div>
      <div class="card-body">
        <BFormFile
          v-model="AdmissionalFormFiles.ctps"
          :accept="['.pdf', '.png', '.jpg', '.jpeg']"
        />
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-header">
        <span> Comprovante de Residência </span>
      </div>
      <div class="card-body">
        <BFormFile
          v-model="AdmissionalFormFiles.comprovante_residencia"
          :accept="['.pdf', '.png', '.jpg', '.jpeg']"
        />
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-header">
        <span> Titulo Eleitor </span>
      </div>
      <div class="card-body">
        <BFormFile
          v-model="AdmissionalFormFiles.titulo_eleitor"
          :accept="['.pdf', '.png', '.jpg', '.jpeg']"
        />
      </div>
    </div>
    <div class="card mb-3" v-if="AdmissionalForm.genero == 'Masculino'">
      <div class="card-header">
        <span> Certidão Reservista </span>
      </div>
      <div class="card-body">
        <BFormFile
          v-model="AdmissionalFormFiles.certidao_reservista"
          :accept="['.pdf', '.png', '.jpg', '.jpeg']"
        />
      </div>
    </div>
    <div class="card mb-3" v-if="AdmissionalForm.estadoCivil == 'Casado'">
      <div class="card-header">
        <span> Certidão de Casamento </span>
      </div>
      <div class="card-body">
        <BFormFile
          v-model="AdmissionalFormFiles.certidao_casamento"
          :accept="['.pdf', '.png', '.jpg', '.jpeg']"
        />
      </div>
    </div>
    <div class="card mb-3" v-if="AdmissionalForm.estadoCivil == 'Divorciado'">
      <div class="card-header">
        <span> Certidão de Divórcio </span>
      </div>
      <div class="card-body">
        <BFormFile
          v-model="AdmissionalFormFiles.certidao_divorcio"
          :accept="['.pdf', '.png', '.jpg', '.jpeg']"
        />
      </div>
    </div>
  </div>
</template>
