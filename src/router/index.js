// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      // -------- DASHBOARD
      {path: '',  name: 'dashboard', component: () => import('@/views/pages/Dashboard.vue')},

      // -------- REFERENCES
      {
        path: 'references',
        children: [
          {path: 'counterparties', name: 'references.counterparties', component: () => import('@/views/references/Counterparties.vue')},
          {path: 'products',name: 'references.products', component: () => import('@/views/references/Products.vue')}
        ]
      },

      // -------- SETTINGS
      {
        path: 'settings',
        children: [
          { path: 'general', name: 'settings.general', component: () => import('@/views/settings/General.vue') },
          { path: 'stores', name: 'settings.stores', component: () => import('@/views/settings/Stores.vue') },
          { path: 'users', name: 'settings.users', component: () => import('@/views/settings/Users.vue') },
          { path: 'currency', name: 'settings.currency', component: () => import('@/views/settings/Currency.vue') },
        ]
      }
    ]
  },
  // -------- AUTH
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/views/auth/Register.vue'),
    meta: { requiresAuth: false }
  },
  // -------- NOT FOUND
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/pages/NotFound.vue')
  }
];

// Создаём роутер
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.user) {
    return { name: 'login' };
  }

  if (to.name === 'login' && auth.user) {
    return { name: 'dashboard' };
  }
});

export default router;
