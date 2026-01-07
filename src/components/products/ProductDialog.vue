<template>
    <Dialog v-model:visible="visible" modal header="Product" :style="{ width: '450px' }">
        <div class="flex flex-col gap-4">
            <div>
                <label>Name</label>
                <InputText v-model="product.name" class="w-full" />
            </div>

            <div>
                <label>Description</label>
                <Textarea v-model="product.description" rows="3" class="w-full" />
            </div>

            <div>
                <label>Price</label>
                <InputNumber v-model="product.price" class="w-full" />
            </div>

            <div>
                <label>Quantity</label>
                <InputNumber v-model="product.quantity" class="w-full" />
            </div>
        </div>

        <template #footer>
            <Button label="Cancel" text @click="close" />
            <Button label="Save" @click="save" />
        </template>
    </Dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useProductDialogStore } from '@/core/stores/productDialog';
import productsApi from '@/core/api/products';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const dialog = useProductDialogStore();
const { visible, product } = storeToRefs(dialog);

const close = () => dialog.close();

const save = async () => {
    try {
        if (product.value.id) {
            await productsApi.update(product.value.id, product.value);
        } else {
            await productsApi.create(product.value);
        }

        toast.add({ severity: 'success', summary: 'Saved', life: 3000 });
        dialog.close();
        window.dispatchEvent(new Event('products-updated'));
    } catch (e) {
        console.error(e);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Save failed', life: 4000 });
    }
};
</script>
