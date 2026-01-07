<script setup>
import { useI18n } from 'vue-i18n';
import { useI18nPage } from '@/i18n/useI18nPage';
const { t } = useI18n();
useI18nPage('references');

</script>

<template>
    <div>
        <h1>{{ t('menu.references.counterparties') }}</h1>

        <p>{{ t('references.counterparties.title') }}</p>
        <p>{{ t('references.counterparties.phone') }}</p>
        <p>{{ t('references.counterparties.group') }}</p>
        <p>{{ t('references.counterparties.address') }}</p>
        <p>{{ t('references.counterparties.email') }}</p>
        <p>{{ t('references.counterparties.inn') }}</p>
        <p>{{ t('references.counterparties.bank') }}</p>
        <p>{{ t('references.counterparties.account') }}</p>
    </div>
</template>

<style scoped></style>
