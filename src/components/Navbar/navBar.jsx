import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUtensils, FaChevronDown, FaRobot, FaSignOutAlt } from "react-icons/fa";
import "../../styles/NavBar.css";

const NavBar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openRepartidor, setOpenRepartidor] = useState(false);
    const [openGestion, setOpenGestion] = useState(false);
    const [openTienda, setOpenTienda] = useState(false);

    if (pathname === "/login") return null;

    const handleLogout = () => {
        localStorage.removeItem("customer");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container" style={{ justifyContent: "center" }}>
                <div className="navbar-logo">
                    <FaUtensils style={{ marginRight: 8, color: "#ff9800" }} />
                    FlashFood
                </div>
                <button className="navbar-toggle" onClick={() => setOpen(!open)}>
                    {open ? <FaTimes /> : <FaBars />}
                </button>
                <ul className={`navbar-links ${open ? "open" : ""}`} style={{ alignItems: "center", flex: 1 }}>
                    {/* Repartidor */}
                    <li className="navbar-dropdown">
                        <button
                            className="navbar-dropdown-btn"
                            onClick={() => {
                                setOpenRepartidor(!openRepartidor);
                                setOpenGestion(false);
                                setOpenTienda(false);
                            }}
                        >
                            Repartidor <FaChevronDown style={{ marginLeft: 4 }} />
                        </button>
                        <ul className={`navbar-dropdown-menu${openRepartidor ? " show" : ""}`}>
                            <li>
                                <Link to="/conductores" className={pathname === "/conductores" ? "active" : ""} onClick={() => { setOpen(false); setOpenRepartidor(false); }}>Conductores</Link>
                            </li>
                            <li>
                                <Link to="/motos" className={pathname === "/motos" ? "active" : ""} onClick={() => { setOpen(false); setOpenRepartidor(false); }}>Motos</Link>
                            </li>
                            <li>
                                <Link to="/turnos" className={pathname === "/turnos" ? "active" : ""} onClick={() => { setOpen(false); setOpenRepartidor(false); }}>Turnos</Link>
                            </li>
                            <li>
                                <Link to="/incovenientes" className={pathname === "/incovenientes" ? "active" : ""} onClick={() => { setOpen(false); setOpenRepartidor(false); }}>Incovenientes</Link>
                            </li>
                        </ul>
                    </li>
                    {/* Gestión */}
                    <li className="navbar-dropdown">
                        <button
                            className="navbar-dropdown-btn"
                            onClick={() => {
                                setOpenGestion(!openGestion);
                                setOpenRepartidor(false);
                                setOpenTienda(false);
                            }}
                        >
                            Gestión <FaChevronDown style={{ marginLeft: 4 }} />
                        </button>
                        <ul className={`navbar-dropdown-menu${openGestion ? " show" : ""}`}>
                            <li>
                                <Link to="/clientes" className={pathname === "/clientes" ? "active" : ""} onClick={() => { setOpen(false); setOpenGestion(false); }}>Clientes</Link>
                            </li>
                            <li>
                                <Link to="/ordenes" className={pathname === "/ordenes" ? "active" : ""} onClick={() => { setOpen(false); setOpenGestion(false); }}>Pedidos</Link>
                            </li>
                            <li>
                                <Link to="/direcciones" className={pathname === "/direcciones" ? "active" : ""} onClick={() => { setOpen(false); setOpenGestion(false); }}>Direcciones</Link>
                            </li>
                        </ul>
                    </li>
                    {/* Tienda */}
                    <li className="navbar-dropdown">
                        <button
                            className="navbar-dropdown-btn"
                            onClick={() => {
                                setOpenTienda(!openTienda);
                                setOpenRepartidor(false);
                                setOpenGestion(false);
                            }}
                        >
                            Tienda <FaChevronDown style={{ marginLeft: 4 }} />
                        </button>
                        <ul className={`navbar-dropdown-menu${openTienda ? " show" : ""}`}>
                            <li>
                                <Link to="/restaurantes" className={pathname === "/restaurantes" ? "active" : ""} onClick={() => { setOpen(false); setOpenTienda(false); }}>Restaurantes</Link>
                            </li>
                            <li>
                                <Link to="/menus" className={pathname === "/menus" ? "active" : ""} onClick={() => { setOpen(false); setOpenTienda(false); }}>Menus</Link>
                            </li>
                            <li>
                                <Link to="/productos" className={pathname === "/productos" ? "active" : ""} onClick={() => { setOpen(false); setOpenTienda(false); }}>Productos</Link>
                            </li>
                        </ul>
                    </li>
                    {/* ChatBot */}
                    <li style={{ display: "flex", alignItems: "center" }}>
                        <Link
                            to="/chat"
                            className={pathname === "/chat" ? "active" : ""}
                            onClick={() => {
                                setOpen(false);
                                setOpenRepartidor(false);
                                setOpenGestion(false);
                                setOpenTienda(false);
                            }}
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                        >
                            <FaRobot size={30} style={{ verticalAlign: "middle" }} />
                            <span style={{ fontWeight: 600, color: "#fff" }}>ChatBot</span>
                        </Link>
                    </li>
                </ul>
                {/* Logout al final */}
                <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                    <button
                        className="navbar-dropdown-btn"
                        style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            color: "#fff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center"
                        }}
                        onClick={handleLogout}
                        title="Cerrar sesión"
                    >
                        <FaSignOutAlt size={22} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
