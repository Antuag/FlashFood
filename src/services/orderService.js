import api from "../interceptor/api"
const API = '/orders';

export const getOrders = () => api.get(API);
export const getOrder = (id) => api.get(`${API}/${id}`);
export const createOrder = (order) => api.post(API, order);
export const updateOrder = (id, order) => api.put(`${API}/${id}`, order);
export const deleteOrder = (id) => api.delete(`${API}/${id}`);
