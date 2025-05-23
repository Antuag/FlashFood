import api from "../interceptor/api"

const API = "/customers"; // Ya no necesitas el host, api ya tiene la baseURL

// Obtener todos los clientes
export const getCustomers = async () => {
    const res = await api.get(API);
    return res.data;
};

// Obtener cliente por email
export const getCustomerByEmail = async (email) => {
    const customers = await getCustomers();
    return customers.find(c => c.email === email);
};

// Crear un cliente
export const createCustomer = async (data) => {
    const res = await api.post(API, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};

// Eliminar un cliente
export const deleteCustomer = async (id) => {
    return api.delete(`${API}/${id}`);
};

// Actualizar un cliente
export const updateCustomer = async (id, data) => {
    const res = await api.put(`${API}/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};
