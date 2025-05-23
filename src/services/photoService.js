import api from "../interceptor/api";
const API_URL = '/photos'; // Cambia si es necesario

export const getPhotos = () => api.get(`${API_URL}`);

export const getPhotoById = (id) => api.get(`${API_URL}/${id}`);

export const uploadPhoto = (formData) =>
    api.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updatePhoto = (id, data) =>
    api.put(`${API_URL}/${id}`, data);

export const deletePhoto = (id) =>
    api.delete(`${API_URL}/${id}`);
    