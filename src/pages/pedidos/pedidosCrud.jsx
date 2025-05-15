import React, { useState, useEffect } from 'react';

const coloresEstado = {
  Pendiente: '#f8d7da',    // rojo claro
  'En proceso': '#fff3cd', // amarillo claro
  'En camino': '#d1ecf1',  // azul claro
};

const estados = ['Pendiente', 'En proceso', 'En camino', 'Entregado'];

export default function PedidosCrud() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];
    const pedidosConId = comprasGuardadas.map((compra, index) => ({
      id: compra.fecha || index,
      cliente: compra.comprador.nombre,
      telefono: compra.comprador.telefono,
      direccion: compra.comprador.direccion,
      productos: compra.productos,
      fecha: compra.fecha,
      estado: 'Pendiente',  // Estado inicial
    }));
    setPedidos(pedidosConId);
  }, []);

  // Función para actualizar localStorage con el estado actual de pedidos
  const actualizarLocalStorage = (listaPedidos) => {
    // Guardar en localStorage sólo pedidos que no estén entregados
    const comprasParaGuardar = listaPedidos.map(pedido => {
      return {
        comprador: {
          nombre: pedido.cliente,
          telefono: pedido.telefono,
          direccion: pedido.direccion,
        },
        productos: pedido.productos,
        fecha: pedido.fecha,
        estado: pedido.estado,
      };
    });
    localStorage.setItem('compras', JSON.stringify(comprasParaGuardar));
  };

  // Avanzar el estado del pedido o eliminar si está entregado
  const avanzarEstado = (id) => {
    let pedidosActualizados = pedidos.map(pedido => {
      if (pedido.id === id) {
        const indiceEstado = estados.indexOf(pedido.estado);
        const nuevoIndice = indiceEstado + 1;
        if (nuevoIndice >= estados.length) {
          return null; // Para eliminar pedido entregado
        }
        return { ...pedido, estado: estados[nuevoIndice] };
      }
      return pedido;
    });

    // Filtrar los que no son null (los no entregados)
    pedidosActualizados = pedidosActualizados.filter(p => p !== null);
    setPedidos(pedidosActualizados);
    actualizarLocalStorage(pedidosActualizados);
  };

  const pedidosActivos = pedidos.filter(p => p.estado !== 'Entregado');
  const pedidosEntregados = pedidos.filter(p => p.estado === 'Entregado');


  return (
    <div>
      <h2>Gestión de Pedidos</h2>

      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Productos</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(pedido => (
              <tr key={pedido.id} style={{ backgroundColor: coloresEstado[pedido.estado] || '' ,color: 'black'}}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.telefono}</td>
                <td>{pedido.direccion}</td>
                <td>
                  <ul>
                    {pedido.productos.map((prod, i) => (
                      <li key={i}>
                        {prod.name} - ${prod.precioTotal ?? prod.price} x {prod.cantidad ?? 1}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{new Date(pedido.fecha).toLocaleString()}</td>
                <td>{pedido.estado}</td>
                <td>
                  <button onClick={() => avanzarEstado(pedido.id)}>
                    {pedido.estado === 'Entregado' ? 'Eliminar' : 'Siguiente estado'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
