import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { departamentService } from "../../services/departamentService";
import DepartamentsFormValidator from '../../components/Departament/DepartamentsFormValidator'
import { Box, Card, CardContent, Typography, IconButton, Button, Grid, Divider } from "@mui/material";
import { Edit, Delete, Visibility, Add } from "@mui/icons-material";

const ListDepartaments = () => {
  const [data, setData] = useState([]);
  const [editingDepartament, setEditingDepartament] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const departaments = await departamentService.getDepartament();
    setData(departaments);
  };

  const handleView = (id) => {
    Swal.fire("Ver", `Ver registro con ID: ${id}`, "info");
  };

  const handleCreateNew = () => {
    setShowCreateModal(true);
  };

  const handleCreate = async (newDepartament) => {
    try {
      const created = await departamentService.createDepartament(newDepartament);
      if (created) {
        Swal.fire("¡Creado!", "departamente agregado correctamente", "success");
        setShowCreateModal(false);
        fetchData();
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Error al crear departamente", "error");
    }
  };

  const handleEdit = (departament) => {
    setEditingDepartament(departament);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await departamentService.updateDepartament(editingDepartament.id, updatedData);
      Swal.fire("¡Actualizado!", "departamente actualizado correctamente", "success");
      setEditingDepartament(null);
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
        const success = await departamentService.deletedepartament(id);
        if (success) {
          Swal.fire({
            title: "Eliminado",
            text: "El registro se ha eliminado",
            icon: "success"
          });
        }
        fetchData();
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        px: { xs: 1, sm: 3, md: 6 },
        pt: { xs: 20, sm: 10, md: 15 },
        pb: 4,
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 1100,
          boxShadow: 4,
          p: { xs: 1, sm: 2, md: 3 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 7 },
        }}
      >
        {/* Formulario */}
        <Box sx={{ flex: 1, minWidth: 400, maxWidth: "100%" }}>
          <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            <Typography variant="h6" gutterBottom>
              {editingDepartament ? "Editar departamente" : "Agregar departamente"}
            </Typography>
            <DepartamentsFormValidator
              mode={editingDepartament ? 2 : 1}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              departament={editingDepartament}
              onClose={() => setEditingDepartament(null)}
            />
          </CardContent>
        </Box>

        {/* Lista de departamentes */}
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
        <Box sx={{ flex: 2, minWidth: 280 }}>
          <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6">departamentes disponibles</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreateNew}
                sx={{ borderRadius: 2 }}
              >
                Nuevo
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                maxHeight: { xs: "45vh", sm: "60vh", md: "70vh" },
                overflowY: "auto",
                pr: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {data.length === 0 ? (
                <Typography color="text.secondary" align="center">
                  No hay departamentes registrados.
                </Typography>
              ) : (
                data.map((item) => (
                  <Card
                    key={item.id}
                    variant="outlined"
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      boxShadow: 2,
                      transition: "box-shadow 0.2s",
                      "&:hover": { boxShadow: 6, borderColor: "primary.light" },
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Grid container alignItems="center">
                      <Grid item xs={12} sm={5} md={4}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3} md={4}>
                        <Box sx={{ display: "flex", gap: 1, justifyContent: { xs: "flex-start", md: "flex-end" }, mt: { xs: 1, md: 0 } }}>
                          <IconButton color="info" onClick={() => handleView(item.id)}>
                            <Visibility />
                          </IconButton>
                          <IconButton color="warning" onClick={() => handleEdit(item)}>
                            <Edit />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDelete(item.id)}>
                            <Delete />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                ))
              )}
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default ListDepartaments;