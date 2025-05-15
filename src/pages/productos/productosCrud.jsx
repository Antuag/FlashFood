import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

export default function ProductosCrud() {
  const [products, setProducts] = useState([]);
  const [busquedaGlobal, setBusquedaGlobal] = useState("");
  const [formulario, setFormulario] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    id: null,
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const productosFiltrados = products.filter(
    (p) =>
      busquedaGlobal === "" ||
      p.name.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
      (p.category &&
        p.category.toLowerCase().includes(busquedaGlobal.toLowerCase()))
  );

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formulario.id) {
      await updateProduct(formulario.id, formulario);
    } else {
      await createProduct(formulario);
    }
    setFormulario({
      name: "",
      category: "",
      price: "",
      description: "",
      id: null,
    });
    cargarProductos();
  };

  const handleEditar = (producto) => {
    setFormulario(producto);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar este producto?")) {
      await deleteProduct(id);
      cargarProductos();
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Gestión de Productos</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "0.5rem",
          maxWidth: "500px",
          margin: "1rem auto",
          padding: "1rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formulario.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={formulario.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Precio"
          value={formulario.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={formulario.description}
          onChange={handleChange}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem",
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {formulario.id ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* Filtro de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos por nombre o categoría"
        value={busquedaGlobal}
        onChange={(e) => setBusquedaGlobal(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          margin: "2rem 0",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {/* Catálogo en tarjetas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {productosFiltrados.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 0.5rem" }}>{p.name}</h3>
              <p style={{ margin: 0, fontWeight: "bold" }}>{p.category}</p>
              <p style={{ margin: 0 }}>${p.price}</p>{" "}
              {/* Precio ahora con mismo estilo */}
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  marginTop: "0.5rem",
                }}
              >
                {p.description}
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
              <button onClick={() => handleEditar(p)} style={botonSimple}>
                Editar
              </button>
              <button
                onClick={() => handleEliminar(p.id)}
                style={{ ...botonSimple, background: "#e74c3c" }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const botonSimple = {
  padding: "0.4rem 0.8rem",
  background: "#3498db",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
