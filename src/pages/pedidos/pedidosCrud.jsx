import React, { useState, useEffect } from 'react';
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../../services/orderService';
import { getMenus } from '../../services/menuService';
import '../../styles/pedidosCrud.css';

const PedidosCrud = () => {
  const [orders, setOrders] = useState([]);
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({
    id: null,
    customer_id: '',
    menu_id: '',
    quantity: 1,
    status: 'pending',
    address: {
      street: '',
      additional_info: '',
      city: '',
      state: '',
      postal_code: '',
    },
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchOrdersData = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch {
      alert('Error al cargar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const fetchMenusData = async () => {
    try {
      const data = await getMenus();
      setMenus(data);
    } catch {
      alert('Error al cargar menús');
    }
  };

  useEffect(() => {
    fetchOrdersData();
    fetchMenusData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.address) {
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      customer_id: '',
      menu_id: '',
      quantity: 1,
      status: 'pending',
      address: {
        street: '',
        additional_info: '',
        city: '',
        state: '',
        postal_code: '',
      },
    });
    setEditing(false);
  };

  const handleCreate = async () => {
    if (!form.customer_id || !form.menu_id || form.quantity < 1) {
      alert('Completa todos los campos correctamente');
      return;
    }

    // Asegurar que address nunca sea null o undefined
    const addressToSend = form.address ?? {
      street: '',
      additional_info: '',
      city: '',
      state: '',
      postal_code: '',
    }; // <-- CAMBIO

    // Mostrar lo que se va a enviar para debug
    console.log('Crear pedido - datos enviados:', {
      customer_id: parseInt(form.customer_id),
      menu_id: parseInt(form.menu_id),
      quantity: parseInt(form.quantity),
      status: form.status,
      address: addressToSend, // <-- CAMBIO
    });

    try {
      await createOrder({
        customer_id: parseInt(form.customer_id),
        menu_id: parseInt(form.menu_id),
        quantity: parseInt(form.quantity),
        status: form.status,
        address: addressToSend, // <-- CAMBIO
      });
      await fetchOrdersData(); // refrescar lista completa desde backend
      resetForm();
    } catch {
      alert('Error al crear pedido');
    }
  };

  const handleEditSelect = (order) => {
    setForm({
      id: order.id,
      customer_id: order.customer_id.toString(),
      menu_id: order.menu_id.toString(),
      quantity: order.quantity,
      status: order.status,
      address: order.address ?? { // <-- CAMBIO
        street: '',
        additional_info: '',
        city: '',
        state: '',
        postal_code: '',
      },
    });
    setEditing(true);
  };

  const handleUpdate = async () => {
    if (!form.customer_id || !form.menu_id || form.quantity < 1) {
      alert('Completa todos los campos correctamente');
      return;
    }

    // Asegurar que address nunca sea null o undefined
    const addressToSend = form.address ?? {
      street: '',
      additional_info: '',
      city: '',
      state: '',
      postal_code: '',
    }; // <-- CAMBIO

    // Mostrar lo que se va a enviar para debug
    console.log('Actualizar pedido - datos enviados:', {
      customer_id: parseInt(form.customer_id),
      menu_id: parseInt(form.menu_id),
      quantity: parseInt(form.quantity),
      status: form.status,
      address: addressToSend, // <-- CAMBIO
    });

    try {
      await updateOrder(form.id, {
        customer_id: parseInt(form.customer_id),
        menu_id: parseInt(form.menu_id),
        quantity: parseInt(form.quantity),
        status: form.status,
        address: addressToSend, // <-- CAMBIO
      });
      await fetchOrdersData(); // refrescar lista completa desde backend
      resetForm();
    } catch {
      alert('Error al actualizar pedido');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este pedido?')) return;
    try {
      await deleteOrder(id);
      setOrders(orders.filter((o) => o.id !== id));
    } catch {
      alert('Error al eliminar pedido');
    }
  };

  return (
    <div className="container">
      <h2>Gestión de Pedidos</h2>

      <form className="form-grid">
        <input
          type="number"
          name="customer_id"
          placeholder="ID Cliente"
          value={form.customer_id}
          onChange={handleChange}
        />
        <select name="menu_id" value={form.menu_id} onChange={handleChange}>
          <option value="">Selecciona un menú</option>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.product?.name ?? 'Sin nombre'} - ${menu.price}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="quantity"
          min="1"
          placeholder="Cantidad"
          value={form.quantity}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pendiente</option>
          <option value="delivered">Entregado</option>
          <option value="cancelled">Cancelado</option>
        </select>

        <input
          type="text"
          name="street"
          placeholder="Calle"
          value={form.address.street}
          onChange={handleChange}
        />
        <input
          type="text"
          name="additional_info"
          placeholder="Info adicional"
          value={form.address.additional_info}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={form.address.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="state"
          placeholder="Departamento"
          value={form.address.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Código postal"
          value={form.address.postal_code}
          onChange={handleChange}
        />

        <div className="form-actions">
          {editing ? (
            <>
              <button type="button" onClick={handleUpdate}>
                Guardar Cambios
              </button>
              <button type="button" onClick={resetForm} className="secondary">
                Cancelar
              </button>
            </>
          ) : (
            <button type="button" onClick={handleCreate}>
              Crear Pedido
            </button>
          )}
        </div>
      </form>

      <h3>Lista de pedidos</h3>
      {loading ? (
        <p>Cargando pedidos...</p>
      ) : orders.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Restaurante</th>
              <th>Cantidad</th>
              <th>Dirección</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer?.name ?? 'N/A'}</td>
                <td>{order.menu?.product?.name ?? 'N/A'}</td>
                <td>{order.menu?.restaurant?.name ?? 'N/A'}</td>
                <td>{order.quantity}</td>
                <td>
                  {order.address
                    ? `${order.address.street}, ${order.address.additional_info}, ${order.address.city}, ${order.address.state}, CP: ${order.address.postal_code}`
                    : 'N/A'}
                </td>
                <td>{order.status}</td>
                <td>${order.total_price?.toFixed(2) ?? '0.00'}</td>
                <td>
                  <button onClick={() => handleEditSelect(order)}>Editar</button>
                  <button onClick={() => handleDelete(order.id)} className="danger">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PedidosCrud;
