import api from '@/core/api/http';

export const referencesApi = {
  getAll(params) {
    return api.get('/references', { params });
  },

  create(data) {
    return api.post('/references', data);
  },

  update(id, data) {
    return api.put(`/references/${id}`, data);
  },

  delete(id) {
    return api.delete(`/references/${id}`);
  }
};
