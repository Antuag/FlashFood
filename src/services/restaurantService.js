import api from "../interceptor/api";
const API_URL = `/restaurants`;

// Obtener todos los restaurantes
export const getRestaurants = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un restaurante por ID
export const getRestaurantById = async (id) => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo restaurante
export const createRestaurant = async (restaurant) => {
    try {
        const response = await api.post(API_URL, {
            name: restaurant.name,
            address: restaurant.address,
            phone: restaurant.phone,
            email: restaurant.email
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar restaurante
export const updateRestaurant = async (id, restaurant) => {
    try {
        const response = await api.put(`${API_URL}/${id}`, restaurant);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar restaurante
export const deleteRestaurant = async (id) => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const restaurantService = {
    createRestaurant,
    deleteRestaurant,
    getRestaurantById,
    getRestaurants,
    updateRestaurant,
};