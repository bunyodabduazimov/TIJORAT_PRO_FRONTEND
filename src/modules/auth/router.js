export default [
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('./pages/Login.vue'),
    meta: { guest: true, module: 'auth' }
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('./pages/Register.vue'),
    meta: { guest: true, module: 'auth' }
  }
];
