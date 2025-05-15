import React, { useEffect, useState } from "react";
import {
  getPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from "../../services/photoService";
import "../../styles/productoCrud.css";

export default function CrudInconvenientes() {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState({
    caption: "",
    image_url: "",
    issue_id: 1,
    taken_at: "",
    file: null,
  });
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("subir"); // Estado para pestañas

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const data = await getPhotos();
      setPhotos(data);
    } catch (error) {
      console.error("Error al obtener las fotos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPhoto({ ...newPhoto, [name]: value });
  };

  const handleCreatePhoto = async () => {
    if (!newPhoto.caption || !newPhoto.file) {
      setMessage("Debes agregar una descripción y una imagen.");
      return;
    }

    try {
      const photoCreated = await createPhoto(newPhoto);
      setPhotos([...photos, photoCreated]);
      setNewPhoto({
        caption: "",
        image_url: "",
        issue_id: 1,
        taken_at: "",
        file: null,
      });
      setMessage("Inconveniente registrado correctamente.");
    } catch (error) {
      console.error("Error al registrar inconveniente:", error);
      setMessage("Error al registrar inconveniente.");
    }
  };

  const handleUpdateCaption = async (id, newCaption) => {
    if (!newCaption) return;
    try {
      const updated = await updatePhoto(id, { caption: newCaption });
      setPhotos(photos.map((photo) => (photo.id === id ? updated : photo)));
    } catch (error) {
      console.error("Error actualizando la foto:", error);
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await deletePhoto(id);
      setPhotos(photos.filter((photo) => photo.id !== id));
    } catch (error) {
      console.error("Error eliminando la foto:", error);
    }
  };

  return (
    <div className="catalogo-productos-dark">
      <h1>Inconvenientes y Fotografías</h1>

      {/* Navegación de pestañas */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setActiveTab("subir")}
          style={{
            backgroundColor: activeTab === "subir" ? "#4CAF50" : "#ccc",
            color: activeTab === "subir" ? "white" : "black",
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Subir Inconveniente
        </button>
        <button
          onClick={() => setActiveTab("ver")}
          style={{
            backgroundColor: activeTab === "ver" ? "#4CAF50" : "#ccc",
            color: activeTab === "ver" ? "white" : "black",
            padding: "0.5rem 1rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Ver Inconvenientes
        </button>
      </div>

      {/* Contenido pestañas */}
      {activeTab === "subir" && (
        <div>
          <h2>Registrar Inconveniente</h2>
          <input
            type="text"
            name="caption"
            placeholder="Descripción"
            value={newPhoto.caption}
            onChange={handleInputChange}
          />
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setNewPhoto({ ...newPhoto, image_url: imageUrl, file });
              }
            }}
          />

          {newPhoto.image_url && (
            <div>
              <p>Vista previa:</p>
              <img src={newPhoto.image_url} alt="Vista previa" width="200" />
            </div>
          )}

          <input
            type="number"
            name="issue_id"
            placeholder="ID del inconveniente"
            value={newPhoto.issue_id}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="taken_at"
            placeholder="Fecha de la toma"
            value={newPhoto.taken_at}
            onChange={handleInputChange}
          />
          <button onClick={handleCreatePhoto}>Registrar</button>
          {message && <p>{message}</p>}
        </div>
      )}

      {activeTab === "ver" && (
        <div>
          <h2>Lista de Inconvenientes</h2>
          {photos.length === 0 ? (
            <p>No hay inconvenientes registrados.</p>
          ) : (
            <ul>
              {photos.map((photo) => (
                <li key={photo.id}>
                  <p>
                    <strong>{photo.caption}</strong>
                  </p>
                  <img src={photo.image_url} alt="foto" width="200" />
                  <p>Inconveniente ID: {photo.issue_id}</p>
                  <p>
                    Tomada:{" "}
                    {photo.taken_at
                      ? new Date(photo.taken_at).toLocaleString()
                      : "N/A"}
                  </p>
                  <button
                    onClick={() => {
                      const newCaption = prompt(
                        "Nueva descripción:",
                        photo.caption
                      );
                      handleUpdateCaption(photo.id, newCaption);
                    }}
                  >
                    Editar descripción
                  </button>
                  <button onClick={() => handleDeletePhoto(photo.id)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
