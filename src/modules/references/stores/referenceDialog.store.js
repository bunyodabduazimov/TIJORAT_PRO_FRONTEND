import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useReferenceDialogStore = defineStore('referenceDialog', () => {
  const visible = ref(false);
  const type = ref(null);
  const model = ref(null);

  function openNew(t) {
    type.value = t;
    model.value = null;
    visible.value = true;
  }

  function openEdit(t, data) {
    type.value = t;
    model.value = data;
    visible.value = true;
  }

  function close() {
    visible.value = false;
    model.value = null;
  }

  return { visible, type, model, openNew, openEdit, close };
});
