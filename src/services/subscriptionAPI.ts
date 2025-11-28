import api from './api';

export const subscriptionAPI = {
  getAll: () => api.get('/subscriptions'),

  getById: (id: number) => api.get(`/subscriptions/${id}`),

  create: (subscriptionData: {
    user_id: number;
    plan_name: string;
    status?: string;
  }) => api.post('/subscriptions', subscriptionData),

  update: (id: number, subscriptionData: object) =>
    api.put(`/subscriptions/${id}`, subscriptionData),

  cancel: (id: number) =>
    api.put(`/subscriptions/${id}`, { status: 'cancelled' }),

  // ADD THIS METHOD
  subscribe: (data: { email: string; plan: string }) =>
    api.post('/subscriptions', data),
};