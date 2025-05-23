import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Tu base de API
});

api.interceptors.request.use(
    (config) => {
        // Extraer el token para poderlo usar en autenticacion
        const customer = JSON.parse(localStorage.getItem('customer'));
        if (customer && customer.token) {
            config.headers.Authorization = `Bearer ${customer.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;