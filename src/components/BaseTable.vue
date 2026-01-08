<script setup>
import SkeletonTable from './SkeletonTable.vue';

defineProps({
  loading: Boolean,
  skeletonRows: { type: Number, default: 10 },
  skeletonCols: { type: Number, default: 8 }
});
</script>

<template>
  <SkeletonTable
    v-if="loading"
    :rows="skeletonRows"
    :cols="skeletonCols"
  />

  <div v-else class="card">
    <slot />
  </div>
</template>
