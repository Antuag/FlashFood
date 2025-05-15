import React, { useState } from 'react';

export default function ModalDetalles({ producto, onClose, handleAgregarAlCarrito }) {
  const [extrasSeleccionados, setExtrasSeleccionados] = useState([]);

  if (!producto) return null;

  const toggleExtra = (extra) => {
    if (extrasSeleccionados.includes(extra)) {
      setExtrasSeleccionados(extrasSeleccionados.filter(e => e !== extra));
    } else {
      setExtrasSeleccionados([...extrasSeleccionados, extra]);
    }
  };

  const agregarConExtras = () => {
    const precioExtras = extrasSeleccionados.reduce((acc, e) => acc + e.price, 0);
    const productoConExtras = {
      ...producto,
      extras: extrasSeleccionados,
      precioTotal: producto.price + precioExtras,
    };
    handleAgregarAlCarrito(productoConExtras);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
      
    }}>
      <div style={{ backgroundColor: 'white', padding: 20, borderRadius: '8px', width: 400, color: 'black' }}>
        <h2>{producto.name}</h2>
        <p><b>Descripción:</b> {producto.description}</p>
        <p><b>Categoría:</b> {producto.category}</p>
        <p><b>Precio base:</b> ${producto.price}</p>
        <p><b>Fecha de creación:</b> {new Date(producto.created_at).toLocaleString()}</p>

        <h3>Extras:</h3>
        {producto.extras && producto.extras.length > 0 ? (
          producto.extras.map((extra, i) => (
            <div key={i}>
              <label>
                <input
                  type="checkbox"
                  checked={extrasSeleccionados.includes(extra)}
                  onChange={() => toggleExtra(extra)}
                />
                {extra.name} (+${extra.price})
              </label>
            </div>
          ))
        ) : (
          <p>No hay extras disponibles.</p>
        )}

        <div style={{ marginTop: 20 }}>
          <button onClick={agregarConExtras} style={{ marginRight: '10px' }}>
            Agregar al carrito
          </button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
