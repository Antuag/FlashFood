import "../src/styles/App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CustomerProvider } from "./context/CustomerContext";
import { Toaster } from "react-hot-toast";
import Login from "./pages/LoginPage";
import CustomersPage from "./pages/CustomersPage";
import MotorcyclePage from "./pages/MotorcyclePage";
import ShiftsPage from "./pages/ShiftsPage";
import NavBar from "./components/navBar";
import MotoMapRealtime from "./components/MotoMap"
import ProductosCrud from './pages/productos/productosCrud';
import AddressCRUD from './pages/Address/AddressCrud'
import IssuePage from './pages/Issue/IssuePage';
import Chat from './pages/Chatbot/Chatbot';
import ListRestaurants from './pages/Restaurant/List';
import ListMenus from './pages/Menu/List';
import ListDrivers from './pages/Driver/List';
import OrdersPage from './pages/Orders/OrdersPage'
// MUI Theme
import { ThemeProvider, CssBaseline } from "@mui/material";
import darkTheme from "./theme"; // Asegúrate que el path sea correcto

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Aplica el modo oscuro y normaliza estilos */}
      <div className="App">
        <Router>
          <CustomerProvider>
            <NavBar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/clientes" element={<CustomersPage />} />
              <Route path="/motos" element={<MotorcyclePage />} />
              <Route path="/turnos" element={<ShiftsPage />} />
              <Route path="/mapa" element={<MotoMapRealtime plate="DEL009" />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/productos" element={<ProductosCrud />} />
              <Route path="/ordenes" element={<OrdersPage />} />
              <Route path="/direcciones" element={<AddressCRUD />} />
              <Route path="/incovenientes" element={<IssuePage />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/restaurantes" element={<ListRestaurants />} />
              <Route path="/menus" element={<ListMenus />} />
              <Route path="/conductores" element={<ListDrivers />} />

            </Routes>
            <Toaster position="top-right" />
          </CustomerProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
