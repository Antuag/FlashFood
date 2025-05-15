import axios from 'axios';

const API_URL = 'http://localhost:5000/photos'; // URL base para las peticiones

// Obtener todas las fotos
export const getPhotos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las fotos:', error);
    throw error;
  }
};

// Crear una nueva foto con FormData (imagen y datos)
export const createPhoto = async (photoData) => {
  try {
    const formData = new FormData();
    formData.append('caption', photoData.caption);
    formData.append('issue_id', photoData.issue_id);
    formData.append('taken_at', photoData.taken_at);
    formData.append('image', photoData.file); // archivo real

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear la foto:', error.response?.data || error);
    throw error;
  }
};

// Actualizar datos de una foto (ejemplo actualizar caption)
export const updatePhoto = async (id, photoData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, photoData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la foto:', error);
    throw error;
  }
};

// Eliminar una foto por ID
export const deletePhoto = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar la foto:', error);
    throw error;
  }
};
