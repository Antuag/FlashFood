// infraccionService.js ajustado para tener estructura similar a motorcycle
import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = `https://b0a53f5d-17f8-4c40-8e11-e179bb3f6795.mock.pstmn.io`;


// Convertimos el servicio para que devuelva la misma estructura que motorcycleService
export const getInfracciones= async () => {
    console.log("Obteniendo infracciones desde:", `${API_URL}/infracciones/1`);
    try {
        // Usamos axios en lugar de fetch para mantener consistencia
        const response = await axios.get(`${API_URL}/infracciones/1`);
        console.log("Respuesta de infracciones:", response);
        return response; // Devolvemos el objeto completo como motorcycleService
    } catch (error) {
        console.error("Error al obtener infracciones:", error);
        // Devolvemos un objeto similar a lo que devolvería axios en caso de éxito pero con array vacío
        return { data: [] };
    }
};

export const getInfraccionById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/infracciones/1${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return { data: null };
    }
};




export const createInfraccion = async (infraccion) => {
    try {
        const response = await axios.post(`${API_URL}/infracciones`, {
            motorcycle_id: infraccion.motorcycle_id,
            tipo_de_infracción: infraccion.tipo_de_infracción,
            fecha: infraccion.fecha
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateInfraccion = async (id, infraccion) => {
    try {
        const response = await axios.put(`${API_URL}/infracciones/${id}`, infraccion);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteInfraccion = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/infracciones/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const infraccionService = {
    createInfraccion,
    deleteInfraccion,
    getInfraccionById,
    getInfracciones,
    updateInfraccion,
};
