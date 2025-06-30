<script setup lang="ts">
import { api, pinia } from "@/main";
import manager from "@/resouces/socketio";
import admissionalStore from "@/stores/admissional";
import funcionariosStore from "@/stores/funcionarios";
import { isAxiosError } from "axios";
import { BButton, BFormFile, BFormGroup, BFormInput, BModal, useModal } from "bootstrap-vue-next";
import { storeToRefs } from "pinia";
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const io = manager.socket("/admin_funcionarios_informacoes");
const router = useRouter();
const { hide: HideModal } = useModal("FormAdmissional");
const Form = reactive({
  contrato: null,
  prazo: "",
  funcionario_id: "",
});

const overlayAdmissional = ref(false);
const { cellFuncionario } = storeToRefs(admissionalStore(pinia));
const opacity = ref(0.18);

const { dataFuncionarios } = storeToRefs(funcionariosStore(pinia));

onBeforeMount(() => {
  io.connect();
});

async function funcionarios_data_req() {
  io.emit("listagem_funcionarios", (dataReturn: Record<string, string>[]) => {
    const formatted = Array.isArray(dataReturn)
      ? dataReturn.map((item) => Object.values(item).map(String))
      : [];
    dataFuncionarios.value = formatted;
  });
}

async function handleSubmit(e: Event) {
  e.preventDefault();

  Form.funcionario_id = cellFuncionario.value[0];

  overlayAdmissional.value = true;
  let message = "Erro ao cadastrar funcionário!";
  try {
    const response = await api.post("/forms/funcionario/admissional", Form);

    message = response.data.message || "Erro ao cadastrar funcionário";
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.data && err.response.data.message) {
        message = err.response.data.message;
      }
    }
  }
  alert(message);
  HideModal();
  funcionarios_data_req();
  overlayAdmissional.value = false;
  router.push({ name: "funcionarios" });
}

const minDate = () => {
  return new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
};
</script>

<template>
  <BModal
    size="lg"
    id="FormAdmissional"
    centered
    @hide="cellFuncionario = ['']"
    :title="`Admissão Funcionário -- ${cellFuncionario[1]} --`"
    footer-class="d-flex"
    no-footer
  >
    <BOverlay class="p-3" :show="overlayAdmissional" :opacity="opacity" rounded="md">
      <form @submit="handleSubmit">
        <div class="row g-1">
          <div class="col-12 d-flex flex-column gap-4">
            <!-- <BFormSelect
            size="md"
            v-model="selected"
            :options="exFieldNamesOptions"
            value-field="item"
            text-field="name"
          >
            <template #first>
              <BFormSelectOption :value="null" disabled>
                -- Selecione um Funcionário --
              </BFormSelectOption>
            </template>
          </BFormSelect> -->
            <div>
              <BFormFile
                size="md"
                v-model="Form.contrato"
                label="Contrato de Trabalho"
                label-class="fw-bold"
                accept=".pdf"
                required
              >
              </BFormFile>
            </div>
            <BFormGroup
              id="fieldset-prazo"
              label="Data Prazo"
              v-model="Form.prazo"
              label-for="input-floating-prazo"
              label-class="mb-5"
              floating
            >
              <BFormInput
                type="date"
                id="input-floating-prazo"
                :state="null"
                trim
                placeholder="..."
                :min="minDate()"
                v-model="Form.prazo"
                required
              />
            </BFormGroup>
          </div>
        </div>
        <hr class="mt-5" />
        <div class="d-flex flex-column">
          <BButton type="submit" variant="success" size="md">
            <strong> Salvar </strong>
          </BButton>
        </div>
      </form>
    </BOverlay>
  </BModal>
</template>
