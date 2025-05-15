// src/components/CatalogoProductos.jsx
import React from 'react';

export default function CatalogoProductos({ productosFiltrados, setModalDetalles, handleAgregarAlCarrito }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {productosFiltrados.map(producto => (
        <div
          key={producto.id}
          style={{ border: '1px solid #ccc', padding: '12px', width: '220px', borderRadius: '8px' }}
        >

          <h3>{producto.name}</h3>
          <p><b>Categoría:</b> {producto.category}</p>
          <p><b>Precio:</b> ${producto.price}</p>

          <button onClick={() => setModalDetalles({ abierto: true, producto })} style={{ marginRight: '8px' }}>
            Ver detalles
          </button>

          <button onClick={() => handleAgregarAlCarrito(producto)}>
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}
