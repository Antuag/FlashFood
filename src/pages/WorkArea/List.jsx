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
import { workAreaService } from "../../services/workAreaService";
import { driverService } from "../../services/driverService";
import WorkAreasFormValidator from "../../components/WorkArea/WorkAreasFormValidator"; 
import { departamentService } from "../../services/departamentService";

const ListWorkArea = () => {
  const [data, setData] = useState([]);
  const [editingWorkArea, setEditingWorkArea] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [departaments, setDepartaments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
        const response = await workAreaService.getWorkAreas();
        const driversResponse = await driverService.getDrivers();  
        const departamentsResponse = await departamentService.getDepartament();  
        setData(response.data);
        setDrivers(Array.isArray(driversResponse.data) ? driversResponse.data : []); 
        setDepartaments(Array.isArray(departamentsResponse.data) ? departamentsResponse.data : []);  
    };
  const handleCreate = async (newWorkArea) => {
    try {
      const created = await workAreaService.createWorkArea(newWorkArea);
      if (created) {
        Swal.fire("¡Creado!", "workArea agregado correctamente", "success");
        fetchData();
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Error al crear workArea", "error");
    }
  };

  const handleEdit = (workArea) => {
    setEditingWorkArea(workArea);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await workAreaService.updateWorkArea(
        editingWorkArea.id,
        updatedData
      );
      Swal.fire("¡Actualizado!", "workArea actualizado correctamente", "success");
      setEditingWorkArea(null);
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
        const success = await workAreaService.deleteWorkArea(id);
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
                  {editingWorkArea ? "Editar workArea" : "Agregar workArea"}
                </Typography>
                <WorkAreasFormValidator
                  mode={editingWorkArea ? 2 : 1}
                  workArea={editingWorkArea}
                  handleCreate={handleCreate}
                  handleUpdate={handleUpdate}
                  drivers={drivers}
                  departaments={departaments}
                  onCancel={() => setEditingWorkArea(null)}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* LISTA DE workAreaS */}
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
                  workAreaes registrados
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2} direction="column">
                  {data.length === 0 ? (
                    <Grid item>
                      <Typography color="text.secondary" align="center">
                        No hay workAreaes registradas.
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
                                {drivers.find(
                                  (r) => r.id === item.driver_id)?.name || "—"}
                              </Typography>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Departamento:{" "}
                                {departaments.find(
                                  (r) => r.id === item.departamet_id)?.name || "—"}
                              </Typography>
                              <Typography>Dato: {item.date}</Typography>
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

export default ListWorkArea;
