// import { departament } from "../models/departament";

const API_URL = ` https://api-colombia.com/api/v1/Department`;


// Obtener todos los departamentoss
export const getDepartament = async () => {
    console.log("aqui " + API_URL);
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener departamentos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un departamentos por ID
export const getDepartamentById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("departamentos no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo departamentos
export const createdepartament = async (departament) => {
    try {
        const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: departament.name,
      })
        });
        if (!response.ok) throw new Error("Error al crear departamentos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar departamentos
export const updatedepartament = async (id, departament) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(departament),
        });
        if (!response.ok) throw new Error("Error al actualizar departamentos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar departamentos
export const deletedepartament = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar departamentos");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const departamentService = {
    createdepartament,
    deletedepartament,
    getDepartamentById,
    getDepartament,
    updatedepartament,
};