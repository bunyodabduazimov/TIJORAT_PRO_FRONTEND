// src/stores/auth.js
import { defineStore } from 'pinia';
import api from '@/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        initialized: false
    }),

    actions: {
        async init() {
            if (this.initialized) return;

            try {
                const res = await api.get('/api/v1/me');
                this.user = res.data;
            } catch (e) {
                this.user = null;
            } finally {
                this.initialized = true;
            }
        },

        async logout() {
            this.user = null;
            this.initialized = true;
        }
    }
});
