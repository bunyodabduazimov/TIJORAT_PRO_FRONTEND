// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

// Модули (разбитые по папкам)
import authRoutes from '@/modules/auth/router.js'
// import referencesRoutes from '@/modules/references/router.js'
// import warehouseRoutes from '@/modules/warehouse/router.js'

import { registerGuards, setAuthUser, resetAuthCache } from './guards'

// -----------------------------------------
// Основные маршруты
// -----------------------------------------
const routes = [
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue')
      },

      // Технические примеры PrimeVue
      {
        path: '/uikit/formlayout',
        name: 'formlayout',
        component: () => import('@/views/uikit/FormLayout.vue')
      },
      {
        path: '/uikit/input',
        name: 'input',
        component: () => import('@/views/uikit/InputDoc.vue')
      }
    ]
  },

  // -----------------------------------------
  // МОДУЛИ (lazy)
  // -----------------------------------------
  ...authRoutes,
  // ...referencesRoutes,
  // ...warehouseRoutes,

  // -----------------------------------------
  // ACCESS DENIED
  // -----------------------------------------
  {
    path: '/auth/access',
    name: 'access-denied',
    meta: { requiresAuth: true },
    component: () => import('@/modules/auth/pages/Access.vue')
  },

  // -----------------------------------------
  // 404
  // -----------------------------------------
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/modules/NotFound.vue')
  }
]

// -----------------------------------------
// Router instance
// -----------------------------------------
const router = createRouter({
  history: createWebHistory(),
  routes
})

// -----------------------------------------
// Подключаем ВСЕ гарды
// -----------------------------------------
registerGuards(router)

// Чтобы Login.vue мог делать import { setAuthUser } from '@/router'
export { setAuthUser, resetAuthCache }

export default router
