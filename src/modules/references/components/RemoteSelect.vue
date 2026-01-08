<script setup>
import { ref, watch } from 'vue';
import { referencesApi } from '../api/references.api';

const props = defineProps({
  modelValue: [Number, Object],
  type: { type: String, required: true },
  placeholder: String
});

const emit = defineEmits(['update:modelValue']);

const options = ref([]);
const selected = ref(null);
const loading = ref(false);

const loadDefault = async () => {
  if (options.value.length) return;

  loading.value = true;
  const { data } = await referencesApi.getAll({ type: props.type, limit: 20 });
  options.value = data;
  loading.value = false;
};

const search = async (e) => {
  loading.value = true;
  const { data } = await referencesApi.getAll({
    type: props.type,
    search: e.value,
    limit: 20
  });
  options.value = data;
  loading.value = false;
};

watch(selected, v => emit('update:modelValue', v?.id || null));
</script>

<template>
<Select
  v-model="selected"
  :options="options"
  optionLabel="name"
  filter
  :loading="loading"
  :placeholder="placeholder"
  @show="loadDefault"
  @filter="search"
/>
</template>
