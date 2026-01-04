// src/main.js
import { createApp, watch } from 'vue';
import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia';
import { useAuthStore } from '@/stores/auth';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/tailwind.css';
import '@/assets/styles.scss';

import api from './api';

import i18n from '@/i18n';
import { loadLocale } from '@/i18n/load';


async function bootstrap() {
    const app = createApp(App);

    const pinia = createPinia();
    app.use(pinia);

    const auth = useAuthStore();
    await auth.init();

    const locale = localStorage.getItem('lang') || i18n.global.locale.value || 'ru';
    i18n.global.locale.value = locale;

    await loadLocale(i18n, locale, 'global');
    await loadLocale(i18n, locale, 'menu');

    watch(() => i18n.global.locale.value, async (newLocale) => {
        localStorage.setItem('lang', newLocale);
        try {
            await loadLocale(i18n, newLocale, 'global');
            await loadLocale(i18n, newLocale, 'menu');
        } catch (e) {
            console.warn('[i18n] reload failed', e);
        }
    });

    app.config.globalProperties.$api = api;
    app.provide('api', api);

    app.use(i18n);
    app.use(router);

    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.app-dark'
            }
        }
    });

    app.use(ToastService);
    app.use(ConfirmationService);

    app.mount('#app');
}

bootstrap();
