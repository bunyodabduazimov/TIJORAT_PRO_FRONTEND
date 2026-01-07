import api, { initCsrf } from './http';

export const authApi = {
    async login(data) {
        await initCsrf();
        return api.post('/login', data);
    },

    async register(data) {
        await initCsrf();
        return api.post('/register', data);
    },

    me() {
        return api.get('/me');
    },

    logout() {
        return api.post('/logout');
    }
};
