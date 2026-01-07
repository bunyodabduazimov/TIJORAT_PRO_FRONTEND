<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import productsApi from '@/core/api/products';
import { useToast } from 'primevue/usetoast';
import { useProductDialogStore } from '@/core/stores/productDialog';
import ProductDialog from '@/components/products/ProductDialog.vue';

const toast = useToast();
const productDialog = useProductDialogStore();

const products = ref([]);
const selectedProducts = ref([]);
const loading = ref(false);

const loadProducts = async () => {
    loading.value = true;
    const { data } = await productsApi.getAll();
    products.value = data.data ?? data;
    loading.value = false;
};

const deleteProduct = async (product) => {
    await productsApi.delete(product.id);
    toast.add({ severity: 'success', summary: 'Deleted', life: 3000 });
    loadProducts();
};

onMounted(() => {
    loadProducts();
    window.addEventListener('products-updated', loadProducts);
});

onBeforeUnmount(() => {
    window.removeEventListener('products-updated', loadProducts);
});
</script>

<template>
    <div class="card">
        <Button label="New product" icon="pi pi-plus" @click="productDialog.openCreate()" />

        <DataTable :value="products" :loading="loading" paginator :rows="10">
            <Column field="id" header="ID" />
            <Column field="name" header="Name" />
            <Column field="price" header="Price" />
            <Column field="quantity" header="Qty" />

            <Column>
                <template #body="{ data }">
                    <Button icon="pi pi-pencil" text @click="productDialog.openEdit(data)" />
                    <Button icon="pi pi-trash" text severity="danger" @click="deleteProduct(data)" />
                </template>
            </Column>
        </DataTable>
    </div>

    <ProductDialog />
</template>
