// src/core/dialog/dialogManager.store.js
import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import { dialogRegistry } from './dialogRegistry';

export const useDialogManager = defineStore('dialogManager', () => {
  const visible = ref(false);
  const component = shallowRef(null);
  const props = ref({});

  function open(name, dialogProps = {}) {
    if (!dialogRegistry[name]) {
      console.error('[DialogManager] Not found:', name);
      return;
    }

    component.value = dialogRegistry[name];
    props.value = dialogProps;
    visible.value = true;
  }

  function close() {
    visible.value = false;
    component.value = null;
    props.value = {};
  }

  return { visible, component, props, open, close };
});
