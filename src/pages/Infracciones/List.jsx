import { useEffect, useState } from "react";
import { Button, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from "@mui/material";
import InfraccionesFormValidator from "../../components/Infracciones/InfraccionesFormValidator";

// Importa los servicios
import { infraccionService } from "../../services/infraccionService";
import { getMotorcycles } from "../../services/motorcycleService";

const InfraccionesCrud = () => {
  const [infracciones, setInfracciones] = useState([]);
  const [motorcycles, setMotorcycles] = useState([]);
  const [selectedInfraccion, setSelectedInfraccion] = useState(null);
  const [mode, setMode] = useState(1); // 1 = crear, 2 = editar
  const [loadingMotorcycles, setLoadingMotorcycles] = useState(false);

  // Cargar infracciones
  const fetchInfracciones = async () => {
    const res = await infraccionService.getInfracciones();
    setInfracciones(res.data);
  };

  // Cargar motos con localStorage y animación
  const fetchMotorcycles = async () => {
    setLoadingMotorcycles(true);

    const localData = localStorage.getItem("motorcycles");
    if (localData) {
      setMotorcycles(JSON.parse(localData));
      setLoadingMotorcycles(false);
    } else {
      try {
        const res = await getMotorcycles();
        setMotorcycles(res.data);
        localStorage.setItem("motorcycles", JSON.stringify(res.data));
      } catch (error) {
        console.error("Error cargando motos:", error);
      } finally {
        setLoadingMotorcycles(false);
      }
    }
  };

  useEffect(() => {
    fetchInfracciones();
    fetchMotorcycles();
  }, []);

  const handleCreate = async (data) => {
    await infraccionService.createInfraccion(data);
    fetchInfracciones();
    // Actualizar motos por si cambió algo
    localStorage.removeItem("motorcycles");
    fetchMotorcycles();
  };

  const handleUpdate = async (data) => {
    await infraccionService.updateInfraccion(data.id, data);
    setSelectedInfraccion(null);
    setMode(1);
    fetchInfracciones();
    localStorage.removeItem("motorcycles");
    fetchMotorcycles();
  };

  const handleDelete = async (id) => {
    await infraccionService.deleteInfraccion(id);
    fetchInfracciones();
    localStorage.removeItem("motorcycles");
    fetchMotorcycles();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Gestión de Infracciones
      </Typography>

      {/* Formulario */}
      {loadingMotorcycles ? (
        <Box display="flex" justifyContent="center" alignItems="center" my={3}>
          <CircularProgress />
          <Typography ml={2}>Cargando motos...</Typography>
        </Box>
      ) : (
        <InfraccionesFormValidator
          mode={mode}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          infracciones={selectedInfraccion}
          motorcycles={motorcycles}
          onCancel={() => {
            setSelectedInfraccion(null);
            setMode(1);
          }}
        />
      )}

      {/* Tabla de infracciones */}
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Moto (ID)</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {infracciones.map((inf) => (
            <TableRow key={inf.id}>
              <TableCell>{inf.id}</TableCell>
              <TableCell>{inf.motorcycle_id}</TableCell>
              <TableCell>{inf.tipo_de_infracción}</TableCell>
              <TableCell>{inf.fecha ? inf.fecha.slice(0, 10) : ""}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => {
                    setSelectedInfraccion(inf);
                    setMode(2);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(inf.id)}
                  sx={{ ml: 1 }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default InfraccionesCrud;
