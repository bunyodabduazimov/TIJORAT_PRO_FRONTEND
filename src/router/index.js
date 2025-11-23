import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import api, { API_VERSION } from '@/api';

// --- КЭШ ПОЛЬЗОВАТЕЛЯ ---
let cachedUser = null;
let userLoaded = false; // уже пытались грузить или нет

async function fetchUser() {
    // если уже загружали – просто вернуть из памяти
    if (userLoaded) {
        return cachedUser;
    }

    try {
        const { data } = await api.get(`${API_VERSION}/me`);
        cachedUser = data;
    } catch (e) {
        cachedUser = null;
    } finally {
        userLoaded = true;
    }

    return cachedUser;
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            meta: { requiresAuth: true },
            children: [
                { path: '/', name: 'dashboard', component: () => import('@/views/Dashboard.vue') },
                { path: '/uikit/formlayout', name: 'formlayout', component: () => import('@/views/uikit/FormLayout.vue') },
                { path: '/uikit/input', name: 'input', component: () => import('@/views/uikit/InputDoc.vue') },
                // ... остальные роуты
            ]
        },
        {
            path: '/auth/login',
            name: 'login',
            meta: { requiresAuth: false },
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/register',
            name: 'register',
            meta: { requiresAuth: false },
            component: () => import('@/views/pages/auth/Register.vue')
        }
    ]
});

// Гвард
router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(r => r.meta.requiresAuth !== false);
    const isAuthPage = to.path.startsWith('/auth');

    const user = await fetchUser();

    if (requiresAuth && !user) {
        return next({
            path: '/auth/login',
            query: { redirect: to.fullPath }
        });
    }

    if (isAuthPage && user) {
        return next({ path: '/' });
    }

    return next();
});

// 👇 ставим пользователя как залогиненного
export function setAuthUser(user) {
    cachedUser = user;
    userLoaded = true;
}

// 👇 чистим кэш (используем при logout)
export function resetAuthCache() {
    cachedUser = null;
    userLoaded = false;
}

export default router;
