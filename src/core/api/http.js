// frontend/src/core/api/http.js
import axios from 'axios';

export const BASE_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: BASE_URL + '/api/v1',
    withCredentials: true,
    withXSRFToken: true
});

// 🔐 interceptors
api.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
             console.warn('Unauthorized');
        }

        if (err.response?.status === 419) {
            console.warn('CSRF token mismatch. Reloading...');
            window.location.reload();
        }

        return Promise.reject(err);
    }
);

export async function initCsrf() {
    await axios.get(BASE_URL + '/sanctum/csrf-cookie', {
        withCredentials: true
    });
}

export default api;
