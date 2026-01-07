<template>
<Dialog v-model:visible="visible" modal style="width:500px" :header="t('catalog.item')">

<div class="flex flex-col gap-3">

    <Dropdown v-model="form.type" :options="types" optionLabel="label" optionValue="value"/>

    <InputText v-model="form.name" :placeholder="t('catalog.name')" />

    <Dropdown v-model="form.group_id" :options="store.groups" optionLabel="name" optionValue="id"/>
    <Dropdown v-model="form.brand_id" :options="store.brands" optionLabel="name" optionValue="id"/>
    <Dropdown v-model="form.unit_id" :options="store.units" optionLabel="name" optionValue="id"/>

    <InputNumber v-model="form.price" />

    <Textarea v-model="form.description" rows="3"/>

</div>

<template #footer>
    <Button text :label="t('global.cancel')" @click="visible=false"/>
    <Button :label="t('global.save')" @click="save"/>
</template>

</Dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useCatalogStore } from '../stores/catalog.store';
import { productsApi } from '../api/products.api';
import { useI18n } from 'vue-i18n';

const props = defineProps({ modelValue:Boolean, item:Object });
const emit = defineEmits(['update:modelValue','saved']);

const { t } = useI18n();
const store = useCatalogStore();

const visible = ref(false);
const form = ref({ type:'product' });

const types = [
    {label:'Product', value:'product'},
    {label:'Service', value:'service'}
];

watch(() => props.modelValue, async v => {
    visible.value = v;
    if(v){
        await store.loadReferences();
        form.value = props.item ? {...props.item} : {type:'product'};
    }
});

const save = async () => {
    if(form.value.id){
        await productsApi.update(form.value.id, form.value);
    } else {
        await productsApi.create(form.value);
    }
    emit('saved');
    emit('update:modelValue', false);
};
</script>
