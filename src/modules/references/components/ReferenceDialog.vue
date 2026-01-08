<script setup>
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useReferenceDialogStore } from '../stores/referenceDialog.store';
import { referencesApi } from '../api/references.api';

const toast = useToast();
const store = useReferenceDialogStore();

const model = ref({});

watch(() => store.visible, v => {
  if (v) {
    model.value = store.model
      ? { ...store.model }
      : { name: '', code: '', active: true, type: store.type };
  }
});

const save = async () => {
  try {
    if (model.value.id) {
      await referencesApi.update(model.value.id, model.value);
    } else {
      await referencesApi.create({ ...model.value, type: store.type });
    }

    toast.add({ severity: 'success', summary: 'Сохранено' });
    store.close();
    window.dispatchEvent(new Event('references-updated'));
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Ошибка' });
  }
};
</script>

<template>
<Dialog v-model:visible="store.visible" modal style="width:420px"
        :header="`Справочник: ${store.type}`">

  <div class="flex flex-col gap-3">
    <InputText v-model="model.name" placeholder="Название"/>
    <InputText v-model="model.code" placeholder="Код"/>
    <Textarea v-model="model.description" placeholder="Описание"/>
    <div class="flex items-center gap-2">
      <Checkbox v-model="model.active" binary/>
      <label>Активный</label>
    </div>
  </div>

  <template #footer>
    <Button label="Отмена" text @click="store.close()"/>
    <Button label="Сохранить" @click="save"/>
  </template>
</Dialog>
</template>
