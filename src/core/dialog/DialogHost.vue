<!-- src/core/dialog/DialogHost.vue -->
<script setup>
import { useDialogManager } from './dialogManager.store';

const dialog = useDialogManager();
</script>

<template>
  <Teleport to="body">
    <component
      v-if="dialog.component"
      :is="dialog.component"
      v-bind="dialog.props"
      v-model:visible="dialog.visible"
      @close="dialog.close"
    />
  </Teleport>
</template>
