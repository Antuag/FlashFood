import {
    Card, CardContent, Button, Typography, Stack,
    Box, Grid, Divider, Chip, Avatar, Tooltip
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import MotorcycleIcon from '@mui/icons-material/TwoWheeler';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const getStatusColor = (status) => {
    switch (status) {
        case "entregado": return "success";
        case "en progreso": return "info";
        case "pendiente": return "warning";
        case "cancelado": return "error";
        default: return "default";
    }
};

export default function OrderList({ orders, onEdit, onDelete }) {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar este pedido?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await onDelete(id);
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'El pedido ha sido eliminado.',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    return (
        <Box p={1}>
            {Array.isArray(orders) && orders.length > 0 ? (
                orders.map(order => (
                    <Card
                        key={order.id}
                        sx={{
                            mb: 3,
                            boxShadow: 4,
                            borderRadius: 3,
                            transition: "transform 0.15s",
                            '&:hover': { transform: "scale(1.015)", boxShadow: 8 }
                        }}
                    >
                        <CardContent>
                            <Grid container spacing={2}>
                                {/* ID, Estado y Botones juntos */}
                                <Grid item xs={12} md={3}>
                                    <Stack spacing={2}>
                                        {/* ID y Estado */}
                                        <Stack spacing={1} alignItems="flex-start">
                                            <Chip
                                                label={`#${order.id}`}
                                                color="primary"
                                                size="medium"
                                                avatar={<Avatar><FastfoodIcon /></Avatar>}
                                                sx={{ fontWeight: 700 }}
                                            />
                                            <Chip
                                                label={order.status ? order.status.replace('_', ' ') : 'N/A'}
                                                color={getStatusColor(order.status?.toLowerCase())}
                                                size="medium"
                                                sx={{ textTransform: "capitalize", fontWeight: 700 }}
                                            />
                                        </Stack>

                                        {/* Botones */}
                                        <Stack direction="column" spacing={1}>
                                            <Tooltip title="Editar">
                                                <Button variant="outlined" size="small" onClick={() => onEdit(order)}>
                                                    Editar
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Eliminar">
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(order.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Ver Mapa">
                                                <span>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        startIcon={<MapIcon />}
                                                        onClick={() => navigate(`/mapa-moto/${order.motorcycle?.license_plate}`)}
                                                        disabled={!order.motorcycle?.license_plate}
                                                    >
                                                        Mapa
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                        </Stack>
                                    </Stack>
                                </Grid>

                                {/* Información principal */}
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <PersonIcon fontSize="small" color="action" />
                                            <Typography variant="body1" fontWeight={500}>
                                                {order.customer?.name || order.customer?.nombre || `Cliente ${order.customer_id}` || 'N/A'}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <FastfoodIcon fontSize="small" color="action" />
                                            <Typography variant="body2">
                                                {order.menu?.name || `Menú ${order.menu_id}` || 'N/A'}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <MotorcycleIcon fontSize="small" color="action" />
                                            <Typography variant="body2">
                                                {order.motorcycle?.license_plate ||
                                                    (order.motorcycle ? `Moto ${order.motorcycle.id}` : 'Sin moto')}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <PaidIcon fontSize="small" color="action" />
                                            <Typography variant="body2" color="primary" fontWeight="bold">
                                                ${order.total_price || 'N/A'}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <EventIcon fontSize="small" color="action" />
                                            <Typography variant="body2">
                                                {order.created_at ? new Date(order.created_at).toLocaleString() : 'Sin fecha'}
                                            </Typography>
                                        </Stack>

                                        {/* Dirección agregada */}
                                        {order.address && (
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <MapIcon color="action" />
                                                <Typography variant="body2">
                                                    {order.address.street}, {order.address.city}, {order.address.state}
                                                </Typography>
                                            </Stack>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                    </Card>
                ))
            ) : (
                <Typography variant="body1" align="center" color="text.secondary">
                    No hay pedidos para mostrar.
                </Typography>
            )}
        </Box>
    );
}
