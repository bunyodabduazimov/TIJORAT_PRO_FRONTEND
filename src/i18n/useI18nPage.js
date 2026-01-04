import i18n from '@/i18n';
import { loadLocale } from '@/i18n/load';

export async function useI18nPage(namespace) {
    const lang = localStorage.getItem('lang') || i18n.global.locale.value || 'ru';

    i18n.global.locale.value = lang;

    if (namespace) {
        await loadLocale(i18n, lang, namespace);
    }
}

export async function changeLanguage(lang, namespaces = []) {
  i18n.global.locale.value = lang;
  localStorage.setItem('lang', lang);

  const list = Array.isArray(namespaces)
    ? namespaces
    : [namespaces];

  for (const ns of list) {
    if (ns) {
      await loadLocale(i18n, lang, ns);
    }
  }
}