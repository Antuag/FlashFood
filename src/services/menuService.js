// import { menu } from "../models/menu";

const API_URL = `http://127.0.0.1:5000/menus`;


// Obtener todos los Menús
export const getMenus = async () => {
    console.log("aqui " + API_URL);
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener Menús");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un Menú por ID
export const getMenuById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Menú no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo Menú
export const createMenu = async (menu) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                restaurant_id: menu.restaurant_id,
                product_id: menu.product_id,
                price: menu.price,
                availability: menu.availability
            })
        });
        if (!response.ok) throw new Error("Error al crear Menú");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar Menú
export const updateMenu = async (id, menu) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menu),
        });
        if (!response.ok) throw new Error("Error al actualizar Menú");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar Menú
export const deleteMenu = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar Menú");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const menuService = {
    createMenu,
    deleteMenu,
    getMenuById,
    getMenus,
    updateMenu,
};