import { Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { driverService } from "../../services/driverService";
import DriversFormValidator from '../../components/Drivers/DriversFormValidator';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ListDrivers = () => {
  const [data, setData] = useState([]);
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const drivers = await driverService.getDrivers();
    setData(drivers);
  };

  const handleView = (id) => {
    console.log(`Ver registro con ID: ${id}`);
  };

  const handleCreate = async (newDriver) => {
    try {
      const created = await driverService.createDriver(newDriver);
      if (created) {
        Swal.fire("¡Creado!", "Conductor agregado correctamente", "success");
        fetchData();
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Error al crear conductor", "error");
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await driverService.updateDriver(editingDriver.id, updatedData);
      Swal.fire("¡Actualizado!", "Información del conductor actualizada correctamente", "success");
      setEditingDriver(null);
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
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await driverService.deleteDriver(id);
        if (success) {
          Swal.fire({
            title: "Eliminado",
            text: "El registro se ha eliminado",
            icon: "success"
          });
          fetchData();
        }
      }
    });
  };

  const handleCancelEdit = () => {
    setEditingDriver(null);
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 4 }, pt: { xs: 60, sm: 8, md: 50 }, maxWidth: 1300, mx: "auto" }}>
      <Grid
        container
        spacing={{ xs: 4, md: 4 }}
        alignItems="flex-start"
        justifyContent="center"
      >
        {/* Formulario */}
        <Grid item xs={12} md={4}>
          <Card sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
            <CardHeader
              title={editingDriver ? "Editar Conductor" : "Agregar Conductor"}
              sx={{ textAlign: "center", pb: 0 }}
            />
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <DriversFormValidator
                mode={editingDriver ? 2 : 1}
                handleCreate={handleCreate}
                handleUpdate={handleUpdate}
                driver={editingDriver}
                onCancel={handleCancelEdit}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Lista de Conductores */}
        <Grid item xs={12} md={8}>
          <Card sx={{ width: "100%", mx: "auto" }}>
            <CardHeader title="Conductores Disponibles" sx={{ textAlign: "center", pb: 0 }} />
            <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
              <TableContainer
                component={Paper}
                sx={{
                  maxHeight: 500,
                  overflowX: "auto",
                  // Hace scroll horizontal en móvil si la tabla es muy ancha
                  '@media (max-width:600px)': {
                    maxWidth: "100vw",
                    p: 0,
                  },
                }}
              >
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Número de Licencia</TableCell>
                      <TableCell>Teléfono</TableCell>
                      <TableCell>Correo</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.license_number}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleView(item.id)}>
                            <Eye size={20} />
                          </IconButton>
                          <IconButton onClick={() => handleEdit(item)}>
                            <Edit size={20} />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(item.id)}>
                            <Trash2 size={20} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListDrivers;
