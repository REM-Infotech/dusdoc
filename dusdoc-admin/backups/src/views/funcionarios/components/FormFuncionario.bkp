<script setup lang="ts">
import withouImage from "@/assets/img/withouImage.png";
import { BButton, BFormFile, BFormGroup, BFormInput, BModal } from "bootstrap-vue-next";
import { computed, ref } from "vue";
const file = ref(null);

const src_file = computed(() => {
  if (!file.value) return withouImage;
  if (typeof file.value === "string") return file.value;
  return URL.createObjectURL(file.value);
});

async function handleSubmit(e: Event) {
  e.preventDefault();
}
</script>

<template>
  <BModal
    size="xl"
    id="FormFuncionario"
    centered
    title="Cadastro de Funcionário"
    footer-class="d-flex"
  >
    <form @submit="handleSubmit">
      <div class="row g-1">
        <div class="col-md-7 d-flex flex-column justify-content-center align-items-center">
          <div class="rounded rounded-4 border border-3 border-primary">
            <img
              id="fotoFuncionario"
              :src="src_file"
              alt="bottle"
              style="object-fit: contain; width: 300px; height: 300px"
            />
          </div>
        </div>
        <div class="col-md-5 d-flex flex-column gap-4">
          <div>
            <BFormFile v-model="file" label="Foto Funcionário" label-class="fw-bold"> </BFormFile>
          </div>
          <BFormGroup id="fieldset-nome" label="Nome" label-for="input-floating-nome" floating>
            <BFormInput id="input-floating-nome" :state="null" trim placeholder="..." />
          </BFormGroup>
          <BFormGroup id="fieldset-email" label="E-mail" label-for="input-floating-email" floating>
            <BFormInput id="input-floating-email" :state="null" trim placeholder="..." />
          </BFormGroup>
          <BFormGroup id="fieldset-cpf" label="CPF" label-for="input-floating-cpf" floating>
            <BFormInput id="input-floating-cpf" :state="null" trim placeholder="..." />
          </BFormGroup>
        </div>
        <div class="col-12 mt-5 d-flex flex-column gap-4">
          <BFormGroup id="fieldset-setor" label="Setor" label-for="input-floating-setor" floating>
            <BFormInput id="input-floating-setor" :state="null" trim placeholder="..." />
          </BFormGroup>
          <BFormGroup
            id="fieldset-cargo"
            label="Cargo/Função"
            label-for="input-floating-cargo"
            floating
          >
            <BFormInput id="input-floating-cargo" :state="null" trim placeholder="..." />
          </BFormGroup>
          <BFormGroup
            id="fieldset-empresa"
            label="Empresa"
            label-for="input-floating-empresa"
            floating
          >
            <BFormInput id="input-floating-empresa" :state="null" trim placeholder="..." />
          </BFormGroup>
        </div>
      </div>
    </form>

    <template #footer>
      <BButton type="submit" variant="success" size="lg"> Salvar </BButton>
    </template>
  </BModal>
</template>
