// src/components/NavBar.jsx
import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
    const { pathname } = useLocation();

    if (pathname === "/login") return null;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">FlashFood</h1>
                <ul className="navbar-links">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/clientes">Clientes</Link></li>
                    <li><Link to="/motos">Motos</Link></li>
                    <li><Link to="/turnos">Turnos</Link></li>
                    <li><Link to="/mapa">Mapa</Link></li>

                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
