import api from '@/core/api/http';

export const productsApi = {
  getAll(params) {
    return api.get('/products', { params });
  },
  create(data) {
    return api.post('/products', data);
  },
  update(id, data) {
    return api.put(`/products/${id}`, data);
  },
  delete(id) {
    return api.delete(`/products/${id}`);
  },
  deleteMany(ids) {
    return api.post('/products/delete-many', { ids });
  }
};
