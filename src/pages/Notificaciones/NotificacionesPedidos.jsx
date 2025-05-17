import React, { useEffect, useState, useRef } from "react";
import "../../styles/notificaciones.css";
import { showToast } from "./ToastManager"; // Asegúrate de que ToastManager esté en la misma carpeta o ajusta la ruta

export default function NotificacionesPedidos({ onNewNotification }) {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(false);
  const latestOrderId = useRef(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/orders");
      const data = await res.json();
      if (!Array.isArray(data)) return;

      const newOrders = data.filter(
        (order) =>
          latestOrderId.current == null || order.id > latestOrderId.current
      );

      if (newOrders.length > 0) {
        const newNotifications = newOrders.map((order) => ({
          id: order.id,
          product: order.menu?.product?.name ?? "Producto desconocido",
          price: order.total_price?.toFixed(2) ?? "0.00",
          timestamp: new Date(),
        }));

        setNotifications((prev) => [...newNotifications, ...prev]);
        latestOrderId.current = Math.max(...data.map((o) => o.id));
        setUnread(true);
        if (onNewNotification) onNewNotification();

        // Mostrar toasts flotantes por cada nuevo pedido
        newNotifications.forEach((n) => {
          showToast(`🛎️ Nuevo pedido: ${n.product} - $${n.price}`);
        });
      }
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const markAllAsRead = () => {
    setUnread(false);
  };

  return (
    <div className="notificaciones-container">
      <div className="header">
        <h2>Notificaciones de Pedidos</h2>
        {notifications.length > 0 && (
          <button onClick={markAllAsRead}>Marcar todo como leído</button>
        )}
      </div>
      {notifications.length === 0 ? (
        <p>No hay notificaciones nuevas.</p>
      ) : (
        <ul className="notificaciones-lista">
          {notifications.map((n) => (
            <li key={n.id} className="notificacion-item">
              <span className="producto">{n.product}</span>
              <span className="precio">${n.price}</span>
              <span className="tiempo">{timeAgo(n.timestamp)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "hace unos segundos";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return `hace ${hours} h`;
}
