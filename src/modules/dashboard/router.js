export default [
  {
    path: '',
    name: 'dashboard',
    component: () => import('./pages/Dashboard.vue'),
    meta: { requiresAuth: true, module: 'global' }
  }
];
