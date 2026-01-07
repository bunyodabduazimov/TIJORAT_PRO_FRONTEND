import api from '@/core/api/http';

export const unitsApi = {
    get() { return api.get('/units'); },
    create(data) { return api.post('/units', data); },
    update(id, data) { return api.put(`/units/${id}`, data); },
    delete(id) { return api.delete(`/units/${id}`); }
};
