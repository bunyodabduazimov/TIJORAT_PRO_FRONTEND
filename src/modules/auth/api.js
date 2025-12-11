// src/modules/auth/api.js
import api, { API_VERSION } from '@/api'
import { getCookie } from '@/utils/cookies'
import { setAuthUser, resetAuthCache } from '@/router'

/**
 * Грузим CSRF-cookie для Sanctum
 */
async function ensureCsrfCookie() {
  await api.get('/sanctum/csrf-cookie')
}

/**
 * Логин
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 * @param {boolean} [payload.remember]
 */
export async function loginRequest({ email, password, remember = false }) {
  await ensureCsrfCookie()

  const xsrfToken = getCookie('XSRF-TOKEN')

  const { data } = await api.post(
    `${API_VERSION}/login`,
    { email, password, remember },
    {
      headers: {
        'X-XSRF-TOKEN': xsrfToken
      }
    }
  )

  // предполагаем, что backend возвращает { user: {...} }
  if (data.user) {
    setAuthUser(data.user)
  }

  return data
}

/**
 * Получить текущего пользователя
 */
export async function fetchCurrentUser() {
  const { data } = await api.get(`${API_VERSION}/me`)
  if (data) {
    setAuthUser(data)
  }
  return data
}

/**
 * Logout
 */
export async function logoutRequest() {
  try {
    await api.post(`${API_VERSION}/logout`)
  } finally {
    resetAuthCache()
  }
}
