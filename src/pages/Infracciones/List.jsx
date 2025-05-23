import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CardActions,
  Switch,
  Paper,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { infraccionService } from "../../services/infraccionService";
import { motorcycleService } from "../../services/motorcycleService";
import InfraccionesFormValidator from "../../components/Infracciones/InfraccionesFormValidator"; 

const ListInfraccion = () => {
  const [data, setData] = useState([]);
  const [editingInfraccion, setEditingInfraccion] = useState(null);
  const [motorcycles, setMotorcycles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await infraccionService.getInfracciones();
  const motorcyclesResponse = await motorcycleService.getMotorcycles();    
  setData(response.data);
  setMotorcycles(Array.isArray(motorcyclesResponse.data) ? motorcyclesResponse.data : []);  };

  const handleCreate = async (newInfraccion) => {
    try {
      const created = await infraccionService.createInfraccion(newInfraccion);
      if (created) {
        Swal.fire("¡Creado!", "Infraccion agregado correctamente", "success");
        fetchData();
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Error al crear Infraccion", "error");
    }
  };

  const handleEdit = (infraccion) => {
    setEditingInfraccion(infraccion);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await infraccionService.updateInfraccion(
        editingInfraccion.id,
        updatedData
      );
      Swal.fire("¡Actualizado!", "Infraccion actualizado correctamente", "success");
      setEditingInfraccion(null);
      fetchData();
    } catch (error) {
      Swal.fire("Error", error.message || "Error al actualizar", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro de querer eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await infraccionService.deleteInfraccion(id);
        if (success) {
          Swal.fire("Eliminado", "El registro se ha eliminado", "success");
        }
        fetchData();
      }
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        mt: { xs: 120, md: 20 },
        px: { xs: 1, sm: 2, md: 4 },
        py: 3,
      }}
    >
      <Card sx={{ boxShadow: 4, borderRadius: 3, p: { xs: 1, sm: 2, md: 3 } }}>
        <Grid
          container
          spacing={4}
          direction={{ xs: "column", md: "row" }}
          alignItems="flex-start"
        >
          {/* FORMULARIO */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                boxShadow: 2,
                borderRadius: 2,
                p: { xs: 1, sm: 2 },
                mb: { xs: 2, md: 0 },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom align="center">
                  {editingInfraccion ? "Editar Infraccion" : "Agregar Infraccion"}
                </Typography>
                <InfraccionesFormValidator
                  mode={editingInfraccion ? 2 : 1}
                  infraccion={editingInfraccion}
                  handleCreate={handleCreate}
                  handleUpdate={handleUpdate}
                  motorcycles={motorcycles}
                  onCancel={() => setEditingInfraccion(null)}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* LISTA DE InfraccionS */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                boxShadow: 2,
                borderRadius: 2,
                minHeight: 500,
                maxHeight: { xs: "none", md: "80vh" },
                overflowY: { xs: "visible", md: "auto" },
                p: { xs: 1, sm: 2 },
              }}
              className="customers-scrollbar"
            >
              <CardContent>
                <Typography variant="h6" gutterBottom align="center">
                  Infracciones registrados
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2} direction="column">
                  {data.length === 0 ? (
                    <Grid item>
                      <Typography color="text.secondary" align="center">
                        No hay infracciones registradas.
                      </Typography>
                    </Grid>
                  ) : (
                    data.map((item) => (
                      <Grid item key={item.id}>
                        <Card
                          variant="outlined"
                          sx={{
                            borderRadius: 2,
                            boxShadow: 1,
                            transition: "box-shadow 0.2s",
                            "&:hover": {
                              boxShadow: 4,
                              borderColor: "primary.light",
                            },
                          }}
                        >
                          <CardContent
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              alignItems: { xs: "flex-start", sm: "center" },
                              justifyContent: "space-between",
                              gap: 2,
                            }}
                          >
                            <Box sx={{ flex: 2 }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Motocicleta:{" "}
                                {motorcycles.find(
                                  (r) => r.id === item.motorcycle_id)?.license_plate || "—"}
                              </Typography>
                              <Typography>Tipo de infracción: ${item.tipo_de_infracción}</Typography>
                              <Typography>Fecha: {item.fecha}</Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                                justifyContent: {
                                  xs: "flex-start",
                                  sm: "flex-end",
                                },
                                mt: { xs: 2, sm: 0 },
                              }}
                            >
                              <IconButton
                                color="primary"
                                onClick={() => handleEdit(item)}
                                size="large"
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() => handleDelete(item.id)}
                                size="large"
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ListInfraccion;
