// frontend/src/core/stores/auth.store.js
import { defineStore } from 'pinia';
import { authApi } from '@/core/api/auth.api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    initialized: false,
    loading: false
  }),

  getters: {
    isAuth: (state) => !!state.user
  },

  actions: {
    // вызывается при старте приложения
    async init() {
      try {
        const { data } = await authApi.me();
        this.user = data;
      } catch {
        this.user = null;
      } finally {
        this.initialized = true;
      }
    },

    async login(payload) {
      this.loading = true;
      try {
        await authApi.login(payload);
        const { data } = await authApi.me();
        this.user = data;
        return true;
      } catch (e) {
        this.user = null;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async register(payload) {
      this.loading = true;
      try {
        await authApi.register(payload);
        const { data } = await authApi.me();
        this.user = data;
        return true;
      } catch (e) {
        this.user = null;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await authApi.logout();
      } catch {}

      this.user = null;
      this.initialized = true;
    }
  }
});
