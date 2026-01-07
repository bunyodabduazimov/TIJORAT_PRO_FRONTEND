<script setup>
import { ref, onMounted } from 'vue';
import { useCatalogStore } from '../stores/catalog.store';
import ProductDialog from '../components/ProductDialog.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useCatalogStore();

const dialog = ref(false);
const selected = ref(null);

onMounted(() => store.loadProducts());

</script>

<template>
<div class="card">

    <div class="flex justify-between mb-3">
        <h3>{{ t('catalog.products') }}</h3>
        <Button icon="pi pi-plus" :label="t('catalog.new')" @click="selected=null; dialog=true"/>
    </div>

    <DataTable :value="store.products" :loading="store.loading">
        <Column field="name" :header="t('catalog.name')" />
        <Column field="price" :header="t('catalog.price')" />
        <Column>
            <template #body="{data}">
                <Button icon="pi pi-pencil" text @click="selected=data; dialog=true"/>
            </template>
        </Column>
    </DataTable>

    <ProductDialog v-model="dialog" :item="selected" @saved="store.loadProducts()" />
</div>
</template>
