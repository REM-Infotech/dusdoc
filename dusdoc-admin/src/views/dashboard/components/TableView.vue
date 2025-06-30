<script setup lang="ts">
import { ref } from "vue";

import DataTablesCore from "datatables.net-bs5";
import DataTable from "datatables.net-vue3";

DataTable.use(DataTablesCore);

const data = ref<(string | number | undefined)[][]>([]);
</script>

<template>
  <div class="table-responsive">
    <DataTable :data="data" class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </thead>
    </DataTable>
  </div>
</template>
