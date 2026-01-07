import api from '@/core/api/http';

export const brandsApi = {
    get() { return api.get('/brands'); },
    create(data) { return api.post('/brands', data); },
    update(id, data) { return api.put(`/brands/${id}`, data); },
    delete(id) { return api.delete(`/brands/${id}`); }
};
