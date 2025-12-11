// src/i18n/registerModule.js
import { loadModuleLocales } from './loadModuleLocales.js'
import i18n from '@/i18n' // инстанс i18n

// кэш: { ru: Set('auth','dashboard'), en: Set('auth') }
const loaded = {}

/** helpers */
function markLoaded(locale, moduleName) {
  if (!loaded[locale]) loaded[locale] = new Set()
  loaded[locale].add(moduleName)
}
function isLoaded(locale, moduleName) {
  return !!(loaded[locale] && loaded[locale].has(moduleName))
}

/**
 * Подгружает и мержит модуль в i18n под namespace = moduleName
 * Возвращает true если успешно
 */
export async function ensureModuleLoaded(i18nInstance, locale, moduleName) {
  if (!locale || !moduleName) return false
  if (isLoaded(locale, moduleName)) return true

  const mod = await loadModuleLocales(moduleName, locale)
  if (!mod) return false

  if (typeof i18nInstance.global.mergeLocaleMessage === 'function') {
    i18nInstance.global.mergeLocaleMessage(locale, { [moduleName]: mod })
  } else {
    const cur = i18nInstance.global.getLocaleMessage(locale) || {}
    cur[moduleName] = mod
    i18nInstance.global.setLocaleMessage(locale, cur)
  }

  markLoaded(locale, moduleName)
  return true
}

/** Подгрузить несколько модулей (параллельно) */
export async function ensureModulesLoaded(i18nInstance, locale, modules = []) {
  await Promise.all(modules.map(m => ensureModuleLoaded(i18nInstance, locale, m)))
}

/** Получить текущий кэш (копия) */
export function getLoadedModules() {
  // вернуть plain object: { ru: ['auth','dashboard'], en: [...] }
  const out = {}
  for (const [loc, set] of Object.entries(loaded)) out[loc] = Array.from(set)
  return out
}

/** Получить список всех модулей, которые когда-либо загружались (unique) */
export function getAllLoadedModuleNames() {
  const s = new Set()
  Object.values(loaded).forEach(set => {
    for (const m of set) s.add(m)
  })
  return Array.from(s)
}
