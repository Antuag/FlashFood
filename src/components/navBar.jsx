import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUtensils } from "react-icons/fa";
import "../styles/NavBar.css";

const NavBar = () => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    if (pathname === "/login") return null;

    const links = [
        { to: "/login", label: "Login" },
        { to: "/clientes", label: "Clientes" },
        { to: "/motos", label: "Motos" },
        { to: "/turnos", label: "Turnos" },
        { to: "/productos", label: "Productos" },
        { to: "/direcciones", label: "Direcciones" },
        { to: "/incovenientes", label: "Incovenientes" },
        { to: "/chat", label: "Chat" },
        { to: "/restaurantes", label: "Restaurantes" },
        { to: "/menus", label: "Menus" },
        { to: "/conductores", label: "Conductores" },
        { to: "/mapa", label: "Mapa" },
        { to: "/ordenes", label: "Ordenes" },
        
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <FaUtensils style={{ marginRight: 8, color: "#ff9800" }} />
                    FlashFood
                </div>
                <button className="navbar-toggle" onClick={() => setOpen(!open)}>
                    {open ? <FaTimes /> : <FaBars />}
                </button>
                <ul className={`navbar-links ${open ? "open" : ""}`}>
                    {links.map(link => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={pathname === link.to ? "active" : ""}
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
