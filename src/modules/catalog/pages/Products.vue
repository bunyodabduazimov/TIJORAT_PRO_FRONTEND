<script setup>
import { ref, onMounted } from 'vue';
import { productsApi } from '../api/products.api';
import { useProductDialogStore } from '../stores/productDialog.store';

import BaseTable from '@/components/BaseTable.vue';
import ProductDialog from '../components/ProductDialog.vue';

const dialog = useProductDialogStore();

const products = ref([]);
const total = ref(0);
const loading = ref(true);

const page = ref(1);
const rows = ref(10);
const search = ref('');

const load = async () => {
  loading.value = true;

  const { data } = await productsApi.getAll({
    page: page.value,
    rows: rows.value,
    search: search.value
  });

  products.value = data.data;
  total.value = data.total;

  loading.value = false;
};

onMounted(load);
</script>

<template>

<BaseTable :loading="loading" :skeleton-cols="7">

  <!-- toolbar -->
  <div class="flex justify-between mb-4">
    <div class="flex gap-2">
      <Button icon="pi pi-plus" label="Новый" @click="dialog.openNew()" />
      <Button icon="pi pi-trash" severity="danger" label="Удалить" disabled />
    </div>

    <InputText v-model="search" placeholder="Поиск..." @input="load" />
  </div>

  <!-- table -->
  <DataTable
    :value="products"
    lazy paginator
    :rows="rows"
    :totalRecords="total"
    :rowsPerPageOptions="[10,25,100,1000]"
    @page="e => { page=e.page+1; rows=e.rows; load() }"
  >

    <Column selectionMode="multiple" style="width:40px"/>

    <Column field="name" header="Название"/>
    <Column field="barcode" header="Штрихкод"/>
    <Column field="sku" header="Артикул"/>
    <Column field="type" header="Тип"/>

    <Column header="Группа">
      <template #body="{data}">{{ data.group?.name }}</template>
    </Column>

    <Column header="Бренд">
      <template #body="{data}">{{ data.brand?.name }}</template>
    </Column>

    <Column header="Ед. изм">
      <template #body="{data}">{{ data.unit?.name }}</template>
    </Column>

    <Column style="width:60px">
      <template #body="{data}">
        <Button icon="pi pi-pencil" text @click="dialog.openEdit(data)" />
      </template>
    </Column>

  </DataTable>

</BaseTable>

<ProductDialog />

</template>
