// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './styles/App.css';
import { ProveedorGlobal } from './contextoGlobal';

import Login from './components/login';
import ProductosCrud from './pages/productos/productosCrud';
import PedidosCrud from './pages/pedidos/pedidosCrud';
import Inconveniente from './pages/Inconvenientes/CrudInconvenientes';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/productos" element={<ProductosCrud />} />
          <Route path="/pedidos" element={<PedidosCrud />} />
          <Route path="/inconvenientes" element={<Inconveniente />} />
          {/* Agrega más rutas aquí */}
        </Routes>
      </div>

  );
}

export default function App() {
  return (
    <Router>
      <ProveedorGlobal>
      <AppContent />
      </ProveedorGlobal>
    </Router>
  );
}
