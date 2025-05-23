import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Box } from "@mui/material";

const InfraccionesFormValidator = ({
  mode,
  handleCreate,
  handleUpdate,
  infracciones,
  onCancel,
}) => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [form, setForm] = useState({
    motorcycle_id: "",
    tipo_de_infracción: "",
    fecha: "",
  });

  // Función para cargar motos desde backend
  const fetchMotorcycles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/motorcycles");
      if (!response.ok) throw new Error("Error al cargar motos");
      const data = await response.json();
      setMotorcycles(data);
    } catch (error) {
      console.error(error);
      // Aquí podrías mostrar mensaje de error en UI si quieres
    }
  };

  useEffect(() => {
    fetchMotorcycles();
  }, []);

  useEffect(() => {
    if (mode === 2 && infracciones) {
      setForm({
        motorcycle_id: infracciones.motorcycle_id || "",
        tipo_de_infracción: infracciones.tipo_de_infracción || "",
        fecha: infracciones.fecha ? infracciones.fecha.slice(0, 10) : "",
      });
    } else {
      setForm({
        motorcycle_id: "",
        tipo_de_infracción: "",
        fecha: "",
      });
    }
  }, [mode, infracciones]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 1) {
      handleCreate(form);
    } else if (mode === 2) {
      handleUpdate({ ...form, id: infracciones.id });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
    >
      <TextField
        select
        label="Moto"
        name="motorcycle_id"
        value={form.motorcycle_id}
        onChange={handleChange}
        required
      >
        {motorcycles.map((moto) => (
          <MenuItem key={moto.id} value={moto.id}>
            {moto.license_plate}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Tipo de infracción"
        name="tipo_de_infracción"
        value={form.tipo_de_infracción}
        onChange={handleChange}
        required
      />

      <TextField
        label="Fecha"
        type="date"
        name="fecha"
        value={form.fecha}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />

      <Box>
        <Button type="submit" variant="contained" color="primary">
          {mode === 1 ? "Crear" : "Actualizar"}
        </Button>
        {mode === 2 && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={onCancel}
            sx={{ ml: 2 }}
          >
            Cancelar
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default InfraccionesFormValidator;
