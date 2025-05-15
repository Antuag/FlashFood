import React, { useState } from 'react';

export default function ModalFinalizarCompra({ total, carrito, onCerrar, onFinalizar }) {
  const [datosCompra, setDatosCompra] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosCompra(prev => ({ ...prev, [name]: value }));
  };

  const handleEnviar = () => {
    if (!datosCompra.nombre || !datosCompra.telefono || !datosCompra.direccion) {
      alert('Por favor complete todos los campos.');
      return;
    }

    // Construir objeto pedido para guardar en localStorage
    const pedido = {
      id: Date.now(),
      cliente: datosCompra.nombre,
      telefono: datosCompra.telefono,
      direccion: datosCompra.direccion,
      productos: carrito,
      fecha: new Date().toISOString(),
      estado: 'Pendiente',
      total: total
    };

    // Leer pedidos previos
    const pedidosPrevios = JSON.parse(localStorage.getItem('pedidos')) || [];
    // Agregar nuevo pedido
    const pedidosActualizados = [...pedidosPrevios, pedido];
    // Guardar en localStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidosActualizados));

    // Llamar callback para informar que se finalizó (puede limpiar carrito, cerrar modal, etc)
    onFinalizar(datosCompra);

    // Opcional: cerrar modal aquí mismo
    onCerrar();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: 20, 
        borderRadius: '8px', 
        width: 400,
        color: 'black',  // Texto negro
        fontWeight: 'normal'
      }}>
        <h2 style={{ color: 'black' }}>Finalizar Compra</h2>

        <label style={{ color: 'black', fontWeight: 'bold' }}>
          Nombre:<br />
          <input
            type="text"
            name="nombre"
            value={datosCompra.nombre}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: 10, color: 'black' }}
          />
        </label>

        <label style={{ color: 'black', fontWeight: 'bold' }}>
          Teléfono:<br />
          <input
            type="text"
            name="telefono"
            value={datosCompra.telefono}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: 10, color: 'black' }}
          />
        </label>

        <label style={{ color: 'black', fontWeight: 'bold' }}>
          Dirección:<br />
          <textarea
            name="direccion"
            value={datosCompra.direccion}
            onChange={handleInputChange}
            rows={3}
            style={{ width: '100%', marginBottom: 10, color: 'black' }}
          />
        </label>

        <p><b style={{ color: 'black' }}>Total a pagar:</b> ${total}</p>

        <div style={{ marginTop: 20 }}>
          <button onClick={handleEnviar} style={{ marginRight: 10 }}>
            Enviar
          </button>
          <button onClick={onCerrar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
