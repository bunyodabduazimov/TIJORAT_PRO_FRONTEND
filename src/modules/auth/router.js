
export default [
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('./pages/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('./pages/Register.vue'),
    meta: { requiresAuth: false }
  }
]
