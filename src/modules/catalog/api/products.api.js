// frontend/src/modules/catalog/api/products.api.js
import api from '@/core/api/http';

export const productsApi = {
    get(params) {
        return api.get('/products', { params });
    },
    show(id) {
        return api.get(`/products/${id}`);
    },
    create(data) {
        return api.post('/products', data);
    },
    update(id, data) {
        return api.put(`/products/${id}`, data);
    },
    delete(id) {
        return api.delete(`/products/${id}`);
    }
};
