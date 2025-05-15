import "../src/styles/App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CustomerProvider } from "./context/CustomerContext";
import Login from "./pages/LoginPage";
import CustomersPage from "./pages/CustomersPage";
import MotorcyclePage from "./pages/MotorcyclePage";
import ShiftsPage from "./pages/ShiftsPage";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/navBar";

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
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
            <Toaster position="top-right" />
          </CustomerProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
