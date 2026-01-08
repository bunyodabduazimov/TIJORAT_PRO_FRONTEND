import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductDialogStore = defineStore('productDialog', () => {

  const visible = ref(false);
  const product = ref(null); // null = новый, объект = редактирование

  function openNew() {
    product.value = null;
    visible.value = true;
  }

  function openEdit(p) {
    product.value = p;
    visible.value = true;
  }

  function close() {
    visible.value = false;
    product.value = null;
  }

  return {
    visible,
    product,
    openNew,
    openEdit,
    close
  };
});
