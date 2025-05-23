// workAreaService.js ajustado para tener estructura similar a driver
import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = `https://232a73cf-847f-4425-9043-4f7d8f6b5543.mock.pstmn.io`;


// Convertimos el servicio para que devuelva la misma estructura que driverService
export const getWorkAreas= async () => {
    console.log("Obteniendo workAreaes desde:", `${API_URL}/workArea/1`);
    try {
        // Usamos axios en lugar de fetch para mantener consistencia
        const response = await axios.get(`${API_URL}/workArea/1`);
        console.log("Respuesta de workAreaes:", response);
        return response; // Devolvemos el objeto completo como driverService
    } catch (error) {
        console.error("Error al obtener workAreas:", error);
        // Devolvemos un objeto similar a lo que devolvería axios en caso de éxito pero con array vacío
        return { data: [] };
    }
};

export const getWorkAreaById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/workArea/1${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return { data: null };
    }
};




export const createWorkArea = async (workArea) => {
    try {
        const response = await axios.post(`${API_URL}/workArea`, {
            driver_id: workArea.driver_id,
            departament_id: workArea.departament_id,
            date: workArea.date
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateWorkArea = async (id, workArea) => {
    try {
        const response = await axios.put(`${API_URL}/workArea/${id}`, workArea);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteWorkArea = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/workArea/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const workAreaService = {
    createWorkArea,
    deleteWorkArea,
    getWorkAreaById,
    getWorkAreas,
    updateWorkArea,
};
