import api from "../interceptor/api"

const API = '/issues'; // Ajusta según tu backend

export const getIssues = () => api.get(`${API}`);

export const createIssue = (data) => api.post(`${API}`, data);

export const updateIssue = (id, data) => api.put(`${API}/${id}`, data);

export const deleteIssue = (id) => api.delete(`${API}/${id}`);

export const uploadPhoto = (formData) =>
    api.post(`${API}/photos/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const getPhotoUrl = (photoPath) => {
    return `http://localhost:5000/${photoPath}`;
};
