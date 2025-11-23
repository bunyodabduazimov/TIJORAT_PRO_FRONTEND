import axios from 'axios';

export const BASE_URL = 'http://localhost:8000';
export const API_VERSION = '/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

api.defaults.withCredentials = true;

export default api;
