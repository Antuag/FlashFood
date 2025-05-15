// src/components/ProductosCrud.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from './productService';
import CatalogoProductos from './CatalogoProductos';
import ModalDetalles from './ModalDetalles';
import Carrito from './Carrito';

export default function ProductosCrud() {
  const [products, setProducts] = useState([]);
  const [busquedaGlobal, setBusquedaGlobal] = useState('');
  const [modalDetalles, setModalDetalles] = useState({ abierto: false, producto: null });
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  // ✅ Filtrado ajustado a los campos reales del backend
  const productosFiltrados = products.filter(p =>
    busquedaGlobal === '' ||
    p.name.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(busquedaGlobal.toLowerCase()))
  );

  const handleAgregarAlCarrito = (producto) => {
    setCarrito(prev => [...prev, producto]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Catálogo de Productos</h1>

      <input
        type="text"
        placeholder="Buscar productos por nombre o categoría"
        value={busquedaGlobal}
        onChange={e => setBusquedaGlobal(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
      />

      <CatalogoProductos
        productosFiltrados={productosFiltrados}
        setModalDetalles={setModalDetalles}
        handleAgregarAlCarrito={handleAgregarAlCarrito}
      />

      {modalDetalles.abierto && (
        <ModalDetalles
          producto={modalDetalles.producto}
          onClose={() => setModalDetalles({ abierto: false, producto: null })}
          handleAgregarAlCarrito={handleAgregarAlCarrito}
        />
      )}

      <Carrito carrito={carrito} setCarrito={setCarrito} />

    </div>
  );
}