import React, { useState } from 'react';
import ModalFinalizarCompra from './ModalFinalizarCompra';

export default function Carrito({ carrito, setCarrito }) {
  const [modalFinalizar, setModalFinalizar] = useState(false);

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  const cambiarCantidad = (index, delta) => {
    const nuevoCarrito = carrito.map((item, i) => {
      if (i === index) {
        const nuevaCantidad = (item.cantidad ?? 1) + delta;
        return {
          ...item,
          cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1,
        };
      }
      return item;
    });
    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce((acc, p) => {
    const precioUnitario = p.precioTotal ?? p.price;
    const cantidad = p.cantidad ?? 1;
    return acc + precioUnitario * cantidad;
  }, 0);

  // Función para cerrar el modal
  const handleCerrarModal = () => {
    setModalFinalizar(false);
  };

  // Función que se llama al finalizar compra desde el modal
  const handleCompraFinalizada = (datosCompra) => {
    const infoCompra = {
      comprador: datosCompra,
      productos: carrito,
      total,
      fecha: new Date().toISOString(),
    };

    // Guardar todas las compras en un array en localStorage
    const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];
    comprasGuardadas.push(infoCompra);
    localStorage.setItem('compras', JSON.stringify(comprasGuardadas));

    alert('Compra realizada con éxito');

    setCarrito([]);
    setModalFinalizar(false);
  };

  return (
    <div style={{ border: '1px solid #333', padding: 12, marginTop: 20, borderRadius: '8px' }}>
      <h2>Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        carrito.map((item, i) => {
          const precioUnitario = item.precioTotal ?? item.price;
          const cantidad = item.cantidad ?? 1;
          return (
            <div key={i} style={{ marginBottom: 10, borderBottom: '1px solid #ccc', paddingBottom: 8 }}>
              <p>
                <b>{item.name}</b> -  ${precioUnitario * cantidad}
              </p>

              {item.extras && item.extras.length > 0 && (
                <ul>
                  {item.extras.map((extra, j) => (
                    <li key={j}>{extra.name} (+${extra.price})</li>
                  ))}
                </ul>
              )}

              <div>
                <button onClick={() => cambiarCantidad(i, -1)}>-</button>
                <span style={{ margin: '0 8px' }}>{cantidad}</span>
                <button onClick={() => cambiarCantidad(i, 1)}>+</button>
                <button onClick={() => eliminarProducto(i)} style={{ marginLeft: 16, color: 'red' }}>
                  Eliminar
                </button>
              </div>
            </div>
          );
        })
      )}

      <h3>Total: ${total}</h3>

      {carrito.length > 0 && (
        <button onClick={() => setModalFinalizar(true)} style={{ marginTop: 10 }}>
          Finalizar compra
        </button>
      )}

      {modalFinalizar && (
        <ModalFinalizarCompra
          total={total}
          onCerrar={handleCerrarModal}
          onFinalizar={handleCompraFinalizada}
        />
      )}
    </div>
  );
}
