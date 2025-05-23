import api from "../interceptor/api";
const API_URL = '/shifts';

export const getShifts = () => api.get(API_URL);
export const getShiftById = (id) => api.get(`${API_URL}/${id}`);
export const createShift = (shift) => api.post(API_URL, shift);
export const updateShift = (id, shift) => api.put(`${API_URL}/${id}`, shift);
export const deleteShift = (id) => api.delete(`${API_URL}/${id}`);
