import api from "../interceptor/api"

const API = '/addresses';

export const getAddresses = () => api.get(API);
export const getAddressById = (id) => api.get(`${API}/${id}`);
export const createAddress = (data) => api.post(API, data);
export const updateAddress = (id, data) => api.put(`${API}/${id}`, data);
export const deleteAddress = (id) => api.delete(`${API}/${id}`);
