import { deleteMotorcycle } from '../../services/motorcycleService';
import { Card, CardContent, Typography, Button, Grid, Chip, Box } from '@mui/material';

export default function MotorcycleList({ onEdit, motorcycles, reload }) {
    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar esta moto?")) {
            await deleteMotorcycle(id);
            reload();
        }
    };

    return (
        <Box sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h5" mb={2} sx={{ color: '#eee' }}>
                Lista de Motos
            </Typography>
            <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
                {motorcycles.map((moto) => (
                    <Grid item xs={12} sm={6} md={3} key={moto.id}>
                        <Card sx={{ color: '#eee' }}>
                            <CardContent>
                                <Typography variant="h6">{moto.license_plate}</Typography>
                                <Typography variant="subtitle1" sx={{ color: '#bbb' }}>
                                    {moto.brand} - {moto.year}
                                </Typography>
                                <Chip
                                    label={moto.status === "available" ? "Disponible" : "Ocupada"}
                                    color={moto.status === "available" ? "success" : "error"}
                                    sx={{ mt: 1, mb: 2 }}
                                />
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => onEdit(moto)}
                                    sx={{ mr: 1, borderColor: '#64b5f6', color: '#64b5f6' }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="error"
                                    onClick={() => handleDelete(moto.id)}
                                >
                                    Eliminar
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
