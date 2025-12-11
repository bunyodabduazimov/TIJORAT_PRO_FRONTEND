// src/i18n/index.js
import { createI18n } from 'vue-i18n';

const defaultLocale = localStorage.getItem('lang') || 'ru';

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'ru',
  messages: {} // пусто — модули будем добавлять динамически
});

export default i18n;
