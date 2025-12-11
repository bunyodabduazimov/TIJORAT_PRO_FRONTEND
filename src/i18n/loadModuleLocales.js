// src/i18n/loadModuleLocales.js
const modules = import.meta.glob('/src/i18n/languages/*/*.json');

export async function loadModuleLocales(moduleName, locale) {
  if (!moduleName || !locale) return null;
  const path = `/src/i18n/languages/${locale}/${moduleName}.json`;
  const loader = modules[path];
  if (!loader) return null;
  const mod = await loader();
  return mod?.default || mod || null;
}
