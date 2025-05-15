import { deleteShift } from '../../services/ShiftService';
import {
    Card, CardContent, Typography, Button, Grid, Box
} from '@mui/material';

export default function ShiftList({ shifts, onEdit, reload }) {
    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar este turno?")) {
            await deleteShift(id);
            reload();
        }
    };

    return (
        <Box sx={{
                width: '100%',
            maxHeight: { xs: 200, sm: 500 },
            overflowY: 'auto',
            px: { xs: 0, sm: 2 }, // padding horizontal opcional para que no toque los bordes
        }}>
            <Typography variant="h5" mb={2} sx={{ color: '#eee', textAlign: 'center' }}>
                Lista de Turnos
            </Typography>
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                width="100%"
            >
                {shifts.map((shift) => (
                    <Grid item xs={12} sm={12} md={10} key={shift.id} display="flex" justifyContent="center">
                        <Card sx={{
                            color: '#eee',
                            width: '100%',
                            maxWidth: 420, // más ancho para pantallas grandes
                            mx: "auto",    // centra el card
                        }}>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    Turno ID: {shift.id}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Conductor ID: {shift.driver_id}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Moto ID: {shift.motorcycle_id}
                                </Typography>
                                <Typography variant="body2">
                                    Inicio: {shift.start_time}
                                </Typography>
                                <Typography variant="body2">
                                    Fin: {shift.end_time || '—'}
                                </Typography>
                                <Typography variant="body2">
                                    Estado: {shift.status}
                                </Typography>
                                <Box mt={2}>
                                    <Button
                                        onClick={() => onEdit(shift)}
                                        sx={{ mr: 1 }}
                                        variant="outlined"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="outlined"
                                        onClick={() => handleDelete(shift.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}