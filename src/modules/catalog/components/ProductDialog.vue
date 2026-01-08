<script setup>
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

import { useProductDialogStore } from '../stores/productDialog.store';
import { productsApi } from '../api/products.api';

import RemoteSelect from '@/modules/references/components/RemoteSelect.vue';

const { t } = useI18n();
const toast = useToast();
const dialogStore = useProductDialogStore();

const saving = ref(false);
const product = ref({});

// ========== WATCH OPEN ==========
watch(() => dialogStore.visible, (v) => {
  if (v) {
    if (dialogStore.product) {
      product.value = { ...dialogStore.product };
    } else {
      product.value = {
        name: '',
        barcode: '',
        sku: '',
        type: 'product',
        description: '',
        group_id: null,
        brand_id: null,
        unit_id: null,
        status: true
      };
    }
  }
});

// ========== SAVE ==========
const save = async () => {
  if (!product.value.name) {
    toast.add({ severity:'warn', summary: t('products.validation.name') });
    return;
  }

  saving.value = true;

  try {
    if (product.value.id) {
      await productsApi.update(product.value.id, product.value);
      toast.add({ severity:'success', summary: t('global.updated') });
    } else {
      await productsApi.create(product.value);
      toast.add({ severity:'success', summary: t('global.created') });
    }

    dialogStore.close();
    window.dispatchEvent(new Event('products-updated'));

  } catch (e) {
    toast.add({ severity:'error', summary: t('global.error') });
  } finally {
    saving.value = false;
  }
};
</script>

<template>
<Dialog
  v-model:visible="dialogStore.visible"
  modal
  :header="t('products.dialog.title')"
  style="width:540px"
>

  <div class="flex flex-col gap-3">

    <!-- NAME -->
    <div>
      <label class="font-medium">{{ t('products.fields.name') }}</label>
      <InputText v-model="product.name" class="w-full"/>
    </div>

    <!-- BARCODE / SKU -->
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label>{{ t('products.fields.barcode') }}</label>
        <InputText v-model="product.barcode" class="w-full"/>
      </div>

      <div>
        <label>{{ t('products.fields.sku') }}</label>
        <InputText v-model="product.sku" class="w-full"/>
      </div>
    </div>

    <!-- TYPE -->
    <div>
      <label>{{ t('products.fields.type') }}</label>
      <Dropdown
        v-model="product.type"
        :options="[
          {label: t('products.types.product'), value:'product'},
          {label: t('products.types.service'), value:'service'}
        ]"
        optionLabel="label"
        optionValue="value"
        class="w-full"
      />
    </div>

    <!-- REFERENCES -->
    <RemoteSelect
      type="group"
      v-model="product.group_id"
      :placeholder="t('products.fields.group')"
    />

    <RemoteSelect
      type="brand"
      v-model="product.brand_id"
      :placeholder="t('products.fields.brand')"
    />

    <RemoteSelect
      type="unit"
      v-model="product.unit_id"
      :placeholder="t('products.fields.unit')"
    />

    <!-- DESCRIPTION -->
    <div>
      <label>{{ t('products.fields.description') }}</label>
      <Textarea v-model="product.description" rows="3" class="w-full"/>
    </div>

    <!-- STATUS -->
    <div class="flex items-center gap-2 mt-2">
      <InputSwitch v-model="product.status"/>
      <span>{{ t('products.fields.active') }}</span>
    </div>

  </div>

  <template #footer>
    <Button :label="t('global.cancel')" text @click="dialogStore.close()"/>
    <Button :label="t('global.save')" :loading="saving" @click="save"/>
  </template>

</Dialog>
</template>
