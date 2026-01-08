// src/core/dialog/dialogRegistry.js
import { defineAsyncComponent } from 'vue';

export const dialogRegistry = {
  product: defineAsyncComponent(() =>
    import('@/modules/catalog/components/ProductDialog.vue')
  ),

  reference: defineAsyncComponent(() =>
    import('@/modules/references/components/ReferenceDialog.vue')
  ),
  // productSelect: defineAsyncComponent(() =>
  //   import('@/modules/sales/components/ProductSelectDialog.vue')
  // )
};
