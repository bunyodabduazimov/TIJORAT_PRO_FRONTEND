import api   from '@/core/api/http';

export const groupsApi = {
    get() { return api.get('/groups'); },
    create(data) { return api.post('/groups', data); },
    update(id, data) { return api.put(`/groups/${id}`, data); },
    delete(id) { return api.delete(`/groups/${id}`); }
};
