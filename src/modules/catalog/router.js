export default [
    {
        path: '/catalog/products',
        name: 'catalog.products',
        component: () => import('./pages/Products.vue'),
        meta: { requiresAuth: true, module: 'catalog' }
    },
    {
        path: '/catalog/services',
        name: 'catalog.services',
        component: () => import('./pages/Services.vue'),
        meta: { requiresAuth: true, module: 'catalog' }
    }
];
