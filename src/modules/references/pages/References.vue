<script setup>
import { ref, onMounted } from 'vue';
import { referencesApi } from '../api/references.api';
import { useReferenceDialogStore } from '../stores/referenceDialog.store';
import ReferenceDialog from '../components/ReferenceDialog.vue';

const store = useReferenceDialogStore();

const type = ref('group');
const rows = ref([]);
const loading = ref(false);

const load = async () => {
  loading.value = true;
  const { data } = await referencesApi.getAll({ type: type.value, limit: 50 });
  rows.value = data;
  loading.value = false;
};

onMounted(() => {
  load();
  window.addEventListener('references-updated', load);
});
</script>

<template>
<div class="card">

  <div class="flex justify-between mb-3">
    <Dropdown v-model="type"
      :options="['group','brand','unit']"
      @change="load"/>

    <Button label="Добавить" icon="pi pi-plus"
            @click="store.openNew(type)"/>
  </div>

  <DataTable :value="rows" :loading="loading">
    <Column field="name" header="Название"/>
    <Column field="code" header="Код"/>
    <Column>
      <template #body="{data}">
        <Button icon="pi pi-pencil" text
          @click="store.openEdit(type, data)"/>
      </template>
    </Column>
  </DataTable>
</div>

<ReferenceDialog/>
</template>
