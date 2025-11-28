import api from './api';

export const productAPI = {
  getAll: () => api.get('/products'),

  getById: (id: number) => api.get(`/products/${id}`),

  create: (productData: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category?: string;
    image_url?: string;
  }) => api.post('/products', productData),

  update: (id: number, productData: object) =>
    api.put(`/products/${id}`, productData),

  delete: (id: number) => api.delete(`/products/${id}`),
};