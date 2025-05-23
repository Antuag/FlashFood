import api from "../interceptor/api"

const API = '/menus';

// Convertimos el servicio para que devuelva la misma estructura que motorcycleService
export const getMenus = async () => {
    console.log("Obteniendo menús desde:", `${API}`);
    try {
        // Usamos axios en lugar de fetch para mantener consistencia
        const response = await api.get(`${API}`);
        console.log("Respuesta de menús:", response);
        return response; // Devolvemos el objeto completo como motorcycleService
    } catch (error) {
        console.error("Error al obtener menús:", error);
        // Devolvemos un objeto similar a lo que devolvería api en caso de éxito pero con array vacío
        return { data: [] };
    }
};

export const getMenuById = async (id) => {
    try {
        const response = await api.get(`${API}/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return { data: null };
    }
};

export const createMenu = async (menu) => {
    try {
        const response = await api.post(`${API}`, {
            restaurant_id: menu.restaurant_id,
            product_id: menu.product_id,
            price: menu.price,
            availability: menu.availability
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateMenu = async (id, menu) => {
    try {
        const response = await api.put(`${API}/${id}`, menu);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteMenu = async (id) => {
    try {
        const response = await api.delete(`${API}/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const menuService = {
    createMenu,
    deleteMenu,
    getMenuById,
    getMenus,
    updateMenu,
};
