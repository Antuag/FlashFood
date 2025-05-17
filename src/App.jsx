// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './styles/App.css';
import { ProveedorGlobal } from './contextoGlobal';
import { ProveedorNotificaciones } from './contextoNotificaciones'; // IMPORTANTE

import Login from './components/login';
import ProductosCrud from './pages/productos/productosCrud';
import PedidosCrud from './pages/pedidos/pedidosCrud';
import Inconveniente from './pages/Inconvenientes/CrudInconvenientes';
import Chat from './pages/Chatbot/Chatbot';
import ListRestaurants from './pages/Restaurant/List';
import ListMenus from './pages/Menu/List';
import Notificaciones from './pages/Notificaciones/NotificacionesPedidos';
import NotificacionFlotante from './pages/Notificaciones/ToastManager'; // Mensaje flotante

function AppContent() {
  const location = useLocation();

  return (
    <div className="page-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProductosCrud />} />
        <Route path="/pedidos" element={<PedidosCrud />} />
        <Route path="/inconvenientes" element={<Inconveniente />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/restaurants" element={<ListRestaurants />} />
        <Route path="/menus" element={<ListMenus />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
      </Routes>
      <NotificacionFlotante /> {/* mensaje emergente */}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ProveedorGlobal>
        <ProveedorNotificaciones> {/* AQUÍ SE USA */}
          <AppContent />
        </ProveedorNotificaciones>
      </ProveedorGlobal>
    </Router>
  );
}
