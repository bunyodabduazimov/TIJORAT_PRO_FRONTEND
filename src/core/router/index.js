import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '@/core/stores/auth.store';

// modules
import authRoutes from '@/modules/auth/router';
import catalogRoutes from '@/modules/catalog/router';

const routes = [
    {
        path: '/',
        component: AppLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/modules/pages/Dashboard.vue'),
                meta: { requiresAuth: true }
            },

             ...catalogRoutes,
        ]
    },

    // auth module
    ...authRoutes,

    // 404
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/modules/pages/NotFound.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 🔐 guards
router.beforeEach(async (to) => {
    const auth = useAuthStore();

    if (!auth.initialized) {
        await auth.init();
    }

    if (to.meta.requiresAuth && !auth.user) {
        return { name: 'login' };
    }

    if (to.meta.guest && auth.user) {
        return { name: 'dashboard' };
    }
});

export default router;
