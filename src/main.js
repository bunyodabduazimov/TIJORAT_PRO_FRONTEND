// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { watch } from 'vue';

// PrimeVue и темы
import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/tailwind.css';
import '@/assets/styles.scss';

import api from './api'

import i18n from '@/i18n'
import { ensureModulesLoaded, getAllLoadedModuleNames } from '@/i18n/registerModule'

const GLOBAL_I18N_MODULES = ['global', 'menu']

const initialLocale = localStorage.getItem('lang') || i18n.global.locale.value || 'ru'
i18n.global.locale.value = initialLocale

ensureModulesLoaded(i18n, initialLocale, GLOBAL_I18N_MODULES)
  .catch(e => console.warn('[i18n] preload global modules failed', e))

// при смене locale — перезагружаем глобальные модули (и все ранее загруженные, если хочешь)
watch(() => i18n.global.locale.value, async (newLocale) => {
  try {
    // перезагружаем глобальные
    await ensureModulesLoaded(i18n, newLocale, GLOBAL_I18N_MODULES)

    // опционально: перезагрузить все модули, которые уже были загружены ранее
    // const all = getAllLoadedModuleNames()
    // await ensureModulesLoaded(i18n, newLocale, all)
  } catch (e) {
    console.warn('[i18n] reload modules on locale change failed', e)
  }
})

const app = createApp(App);

app.config.globalProperties.$api = api
app.provide('api', api)
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
