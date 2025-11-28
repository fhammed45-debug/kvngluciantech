import api from './api';

export const orderAPI = {
  getAll: () => api.get('/orders'),

  getById: (id: number) => api.get(`/orders/${id}`),

  create: (orderData: {
    user_id: number;
    product_id: number;
    quantity: number;
    total_price: number;
    status?: string;
  }) => api.post('/orders', orderData),

  update: (id: number, orderData: object) =>
    api.put(`/orders/${id}`, orderData),

  delete: (id: number) => api.delete(`/orders/${id}`),
};