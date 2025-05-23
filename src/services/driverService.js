import api from "../interceptor/api"
const API = `/drivers`;

// Obtener todos los conductores
export const getDrivers = async () => {
    try {
        const response = await api.get(API);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un conductor por ID
export const getDriverById = async (id) => {
    try {
        const response = await api.get(`${API}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo conductor
export const createDriver = async (driver) => {
    try {
        const response = await api.post(API, {
            name: driver.name,
            license_number: driver.license_number,
            phone: driver.phone,
            email: driver.email,
            status: driver.status
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar conductor
export const updateDriver = async (id, driver) => {
    try {
        const response = await api.put(`${API}/${id}`, driver);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar conductor
export const deleteDriver = async (id) => {
    try {
        await api.delete(`${API}/${id}`);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const driverService = {
    createDriver,
    deleteDriver,
    getDriverById,
    getDrivers,
    updateDriver,
};