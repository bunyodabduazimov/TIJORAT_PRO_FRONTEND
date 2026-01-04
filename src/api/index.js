import axios from 'axios';

export const BASE_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    withXSRFToken: true
});

export default api;

