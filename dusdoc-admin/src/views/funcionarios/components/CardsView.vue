<script setup lang="ts">
import { api, pinia } from "@/main";
import manager from "@/resouces/socketio";
import admissionalStore from "@/stores/admissional";
import funcionariosStore from "@/stores/funcionarios";
import {
  faEye,
  faHourglass,
  faPenNib,
  faPlus,
  faPlusMinus,
  faRefresh,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { isAxiosError } from "axios";
import { BTooltip, useModal } from "bootstrap-vue-next";
import DataTablesCore from "datatables.net-bs5";
import DataTable from "datatables.net-vue3";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";
import FormAdmissionalView from "./forms/FormAdmissionalView.vue";
import FormFuncionarioView from "./forms/FormFuncionarioView.vue";

const router = useRouter();

const { dataFuncionarios } = storeToRefs(funcionariosStore(pinia));
const { cellFuncionario } = storeToRefs(admissionalStore(pinia));
const query = ref("");
const clicked = ref(false);
const selectedItem = ref("");
const io = manager.socket("/admin_funcionarios_informacoes");
const { show: showAdmissional } = useModal("FormAdmissional");
const list = [{ msg: "Departamento" }, { msg: "Cargo" }, { msg: "Setor" }, { msg: "Empresa" }];
const computedList = computed(() => {
  return list.filter((item) => item.msg.toLowerCase().includes(query.value.toLowerCase()));
});

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

function classListItem(item: string) {
  return selectedItem.value === item ? "list-group-item active" : "list-group-item";
}

function showModalAdmissional(props: string[]) {
  cellFuncionario.value = props;

  showAdmissional();
}

async function LiberarAcessoApp(funcionario_id: string) {
  let message = "Erro ao liberar acesso";

  try {
    const resp = await api.post("/admin/acesso_app", {
      id: funcionario_id,
    });

    message = resp.data.message;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.data.message) {
      message = err.response.data.message;
    }
  }

  alert(message);
  funcionarios_data_req();

  router.push({ name: "funcionarios" });
}

watch(clicked, () => {
  funcionarios_data_req();
});

DataTable.use(DataTablesCore);
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-3">
      <div class="card" style="height: 75dvh">
        <div class="card-header d-flex">
          <span class="title align-items-center d-flex">
            <IBiPieChartFill />
            <span class="ms-1"> Categorias </span>
          </span>
          <div class="ms-auto">
            <input class="form-control" placeholder="Filtre aqui.." type="text" v-model="query" />
          </div>
        </div>
        <div class="card-body">
          <TransitionGroup name="slide-fade" class="list-group" tag="ul">
            <li
              :class="classListItem(item.msg)"
              v-for="(item, index) in computedList"
              :key="index"
              @click="selectedItem = item.msg"
            >
              {{ item.msg }}
            </li>
          </TransitionGroup>
        </div>
      </div>
    </div>
    <div class="col-md-9">
      <div class="card" style="height: 75dvh">
        <div class="card-header d-flex justify-content-between">
          <span class="fw-semibold"> Lista De Funcionários </span>
          <div class="d-flex ms-auto gap-2">
            <button class="btn btn-sm btn-outline-warning" @click="clicked = !clicked">
              <span class="d-flex allign-items-center">
                <FontAwesomeIcon
                  :icon="faRefresh"
                  class="me-1 rounded border border-1 p-1 border-warning"
                />
                <span class="align-self-center fw-bold">Recarregar Usuários</span>
              </span>
            </button>
            <!-- <button v-b-modal.FormAdmissional class="btn btn-sm btn-outline-blue-chill">
              <span class="d-flex allign-items-center">
                <FontAwesomeIcon
                  :icon="faPlus"
                  class="me-1 rounded border border-1 p-1 border-blue-chill"
                />
                <span class="align-self-center fw-bold">Nova Admissão</span>
              </span>
            </button> -->
            <button v-b-modal.FormFuncionario class="btn btn-sm btn-outline-primary">
              <span class="d-flex allign-items-center">
                <FontAwesomeIcon
                  :icon="faPlus"
                  class="me-1 rounded border border-1 p-1 border-primary"
                />
                <span class="align-self-center fw-bold">Cadastrar Funcionário</span>
              </span>
            </button>
          </div>
        </div>
        <div class="card-body">
          <DataTable
            :data="dataFuncionarios"
            class="display table table-striped table-hover"
            :options="{
              pageLength: 10,
              lengthChange: false, // Remove a opção de alterar quantidade por página
            }"
          >
            <thead>
              <tr>
                <th>
                  <strong> # </strong>
                </th>
                <th>Nome</th>
                <th>Código Identificação</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <template #column-4="props">
              <div class="d-flex">
                <BTooltip v-if="props.rowData[4] === 'PENDENTE'">
                  <template #target>
                    <button class="btn btn-outline-danger2">
                      <FontAwesomeIcon :icon="faWarning" />
                    </button>
                  </template>
                  Admissão Pendente
                </BTooltip>
                <BTooltip v-else-if="props.rowData[4] === 'EM ANDAMENTO'">
                  <template #target>
                    <button class="btn btn-outline-secondary2">
                      <FontAwesomeIcon :icon="faHourglass" />
                    </button>
                  </template>
                  Admissão em Andamento
                </BTooltip>
                <BTooltip v-else-if="props.rowData[4] === 'AGUARDANDO ANÁLISE'">
                  <template #target>
                    <button class="btn btn-outline-warning2">
                      <FontAwesomeIcon :icon="faHourglass" />
                    </button>
                  </template>
                  Aguardando Análise
                </BTooltip>
              </div>
            </template>
            <template #column-5="props">
              <div class="d-flex gap-2">
                <BTooltip v-if="props.rowData[4] === 'PENDENTE'">
                  <template #target>
                    <button
                      class="btn btn-outline-blue-chill"
                      @click="showModalAdmissional(props.rowData)"
                    >
                      <FontAwesomeIcon :icon="faPenNib" />
                    </button>
                  </template>
                  Realizar Admissão
                </BTooltip>
                <BTooltip v-else-if="props.rowData[4] === 'EM ANDAMENTO'">
                  <template #target>
                    <button
                      class="btn btn-outline-warning"
                      @click="
                        router.push({
                          name: 'validacao',
                          params: { funcionario_id: 1 },
                        })
                      "
                    >
                      <FontAwesomeIcon :icon="faEye" />
                    </button>
                  </template>
                  Realizar Análise
                </BTooltip>
                <BTooltip>
                  <template #target>
                    <button
                      class="btn btn-outline-blue-chill"
                      @click="LiberarAcessoApp(props.rowData[0])"
                    >
                      <FontAwesomeIcon :icon="faPlusMinus" />
                    </button>
                  </template>
                  Liberar acesso App
                </BTooltip>
              </div>
            </template>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <FormFuncionarioView />
  <FormAdmissionalView />
</template>

<style lang="css" scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
