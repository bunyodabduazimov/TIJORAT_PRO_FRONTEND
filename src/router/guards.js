// src/router/guards.js
import api, { API_VERSION } from '@/api'
import i18n from '@/i18n'
import { loadModuleLocales } from '@/i18n/loadModuleLocales.js'

// optional helper (если ты создал registerModule.js)
// если у тебя нет этого файла — используй функцию ensureModuleLoaded из примера ниже
import { ensureModuleLoaded, ensureModulesLoaded } from '@/i18n/registerModule.js'

// --- КЭШ ПОЛЬЗОВАТЕЛЯ ---
let cachedUser = null
let userLoaded = false

async function fetchUser() {
  if (userLoaded) return cachedUser

  try {
    const { data } = await api.get(`${API_VERSION}/me`)
    cachedUser = data
  } catch (e) {
    cachedUser = null
  } finally {
    userLoaded = true
  }

  return cachedUser
}

export function setAuthUser(user) {
  cachedUser = user
  userLoaded = true
}

export function resetAuthCache() {
  cachedUser = null
  userLoaded = false
}

/**
 * Регистрируем гарды
 */
export function registerGuards(router) {
  // 1) LAZY I18N guard
  router.beforeEach(async (to, from, next) => {
    try {
      // Приоритет: явно указанные модули в meta -> автоматическое определение по первому сегменту пути
      const metaModules = to.meta?.i18nModules
      const firstSegment = to.path.split('/').filter(Boolean)[0]
      const locale = i18n.global.locale.value || localStorage.getItem('lang') || 'ru'

      if (Array.isArray(metaModules) && metaModules.length > 0) {
        // подгружаем все, указанные в meta
        if (typeof ensureModulesLoaded === 'function') {
          await ensureModulesLoaded(i18n, locale, metaModules)
        } else {
          // fallback: загрузка по одному с помощью loadModuleLocales
          await Promise.all(metaModules.map(async (m) => {
            const msgs = await loadModuleLocales(m, locale)
            if (msgs) {
              if (typeof i18n.global.mergeLocaleMessage === 'function') {
                i18n.global.mergeLocaleMessage(locale, { [m]: msgs })
              } else {
                const cur = i18n.global.getLocaleMessage(locale) || {}
                cur[m] = msgs
                i18n.global.setLocaleMessage(locale, cur)
              }
            }
          }))
        }
      } else if (firstSegment) {
        // если meta не указан — пробуем подгрузить модуль по первому сегменту пути
        const moduleName = firstSegment
        if (typeof ensureModuleLoaded === 'function') {
          await ensureModuleLoaded(i18n, locale, moduleName)
        } else {
          const moduleMessages = await loadModuleLocales(moduleName, locale)
          if (moduleMessages) {
            if (typeof i18n.global.mergeLocaleMessage === 'function') {
              i18n.global.mergeLocaleMessage(locale, { [moduleName]: moduleMessages })
            } else {
              const current = i18n.global.getLocaleMessage(locale) || {}
              current[moduleName] = moduleMessages
              i18n.global.setLocaleMessage(locale, current)
            }
          }
        }
      }
    } catch (e) {
      // не мешаем навигации, логируем опционально
      // console.warn('[i18n] lazy guard failed', e)
    } finally {
      next()
    }
  })

  // 2) AUTH guard
  router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(r => r.meta.requiresAuth !== false)
    const isAuthPage = to.path.startsWith('/auth')

    const user = await fetchUser()

    if (requiresAuth && !user) {
      return next({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      })
    }

    if (isAuthPage && user) {
      return next({ path: '/' })
    }

    return next()
  })

  // 3) ROLE guard
  router.beforeEach(async (to, from, next) => {
    const needRoles = to.meta?.roles
    if (!needRoles || needRoles.length === 0) {
      return next()
    }

    const user = await fetchUser()
    const userRole = user?.role

    if (userRole && needRoles.includes(userRole)) {
      return next()
    }

    return next({ name: 'access-denied' })
  })
}
