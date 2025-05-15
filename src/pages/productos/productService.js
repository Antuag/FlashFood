// src/services/productService.js
export async function getProducts() {
  try {
    const response = await fetch('http://127.0.0.1:5000/products');
    if (!response.ok) throw new Error('Error al obtener productos');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getProducts:', error);
    return [];
  }
}
