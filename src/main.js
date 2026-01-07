import { createApp, watch } from 'vue';
import App from './App.vue';
import router from './core/router';

import { createPinia } from 'pinia';
import { useAuthStore } from '@/core/stores/auth.store';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/tailwind.css';
import '@/assets/styles.scss';

import i18n  from '@/i18n';
import { loadLocale } from '@/i18n/load';

async function bootstrap() {
    const app = createApp(App);

    const pinia = createPinia();
    app.use(pinia);

    // 🔐 auth preload
    const auth = useAuthStore();
    await auth.init();

    // 🌍 i18n
    const locale = localStorage.getItem('lang') || i18n.global.locale.value || 'ru';
    i18n.global.locale.value = locale;

    await loadLocale(i18n, locale, 'global');
    await loadLocale(i18n, locale, 'menu');

    watch(() => i18n.global.locale.value, async (newLocale) => {
        localStorage.setItem('lang', newLocale);
        await loadLocale(i18n, newLocale, 'global');
        await loadLocale(i18n, newLocale, 'menu');
    });

    app.use(i18n);
    app.use(router);

    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: { darkModeSelector: '.app-dark' }
        }
    });

    app.use(ToastService);
    app.use(ConfirmationService);

    app.mount('#app');
}

bootstrap();
