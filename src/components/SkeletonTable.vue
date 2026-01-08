<script setup>
import Skeleton from 'primevue/skeleton';

defineProps({
  rows: { type: Number, default: 10 },
  cols: { type: Number, default: 8 }
});
</script>

<template>
  <div class="card">

    <!-- toolbar skeleton -->
    <div class="flex justify-between mb-4">
      <Skeleton width="10rem" height="2.5rem" borderRadius="10px" />
      <Skeleton width="16rem" height="2.5rem" borderRadius="10px" />
    </div>

    <!-- header -->
    <div class="grid mb-3" :style="{ gridTemplateColumns: `40px repeat(${cols}, 1fr) 60px` }">
      <Skeleton height="1.5rem" />
      <Skeleton v-for="i in cols" :key="'h'+i" height="1.5rem" />
      <Skeleton height="1.5rem" />
    </div>

    <!-- rows -->
    <div v-for="r in rows" :key="r"
         class="grid items-center gap-2 mb-2"
         :style="{ gridTemplateColumns: `40px repeat(${cols}, 1fr) 60px` }">

      <Skeleton shape="circle" size="1.5rem" />

      <Skeleton v-for="c in cols" :key="c" height="1.4rem" />

      <Skeleton shape="circle" size="1.5rem" />
    </div>

    <!-- paginator -->
    <div class="flex justify-center mt-4 gap-2">
      <Skeleton width="2rem" height="2rem" borderRadius="50%" v-for="i in 5" :key="i"/>
    </div>

  </div>
</template>
