<script setup>
import { useI18n } from 'vue-i18n';
import { useI18nPage } from '@/i18n/useI18nPage';
const { t } = useI18n();
useI18nPage('settings');

</script>

<template>
    <div>
        <h1>{{ t('menu.settings.title') }}</h1>
        <p>{{ t('settings.users') }}</p>
    </div>
</template>

<style scoped></style>
