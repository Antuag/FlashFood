import api from "../interceptor/api"

const API = '/motorcycles'; // Cambia si el backend está en otro puerto

export const getMotorcycles = () => api.get(`${API}`);
export const getMotorcycleById = (id) => api.get(`${API}/${id}`);
export const createMotorcycle = (data) => api.post(`${API}`, data);
export const updateMotorcycle = (id, data) => api.put(`${API}/${id}`, data);
export const deleteMotorcycle = (id) => api.delete(`${API}/${id}`);
