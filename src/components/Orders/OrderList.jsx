import { Card, CardContent, Button, Typography, Stack, Box } from '@mui/material';

export default function OrderList({ orders, onEdit, onDelete }) {
    return (
        <Box p={2}>
            {Array.isArray(orders) && orders.length > 0 ? (
                orders.map(order => (
                    <Card key={order.id} sx={{ mb: 3, boxShadow: 3 }}>
                        <CardContent>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2" color="text.secondary">ID:</Typography>
                                <Typography variant="body1" fontWeight="bold">{order.id}</Typography>

                                <Typography variant="subtitle2" color="text.secondary">Cliente:</Typography>
                                <Typography variant="body1">
                                    {order.customer?.name || order.customer?.nombre || `Cliente ${order.customer_id}` || 'N/A'}
                                </Typography>

                                <Typography variant="subtitle2" color="text.secondary">Menú:</Typography>
                                <Typography variant="body1">
                                    {order.menu?.name || `Menú ${order.menu_id}` || 'N/A'}
                                </Typography>

                                <Typography variant="subtitle2" color="text.secondary">Moto:</Typography>
                                <Typography variant="body1">    
                                    {order.motorcycle?.license_plate ||
                                        (order.motorcycle ? `Moto ${order.motorcycle.id}` : 'Sin moto')}
                                </Typography>

                                <Typography variant="subtitle2" color="text.secondary">Cantidad:</Typography>
                                <Typography variant="body1">{order.quantity}</Typography>

                                <Typography variant="subtitle2" color="text.secondary">Total:</Typography>
                                <Typography variant="body1" color="primary" fontWeight="bold">
                                    ${order.total_price || 'N/A'}
                                </Typography>

                                <Typography variant="subtitle2" color="text.secondary">Estado:</Typography>
                                <Typography variant="body1" textTransform="capitalize">
                                    {order.status ? order.status.replace('_', ' ') : 'N/A'}
                                </Typography>

                                <Typography variant="subtitle2" color="text.secondary">Fecha pedido:</Typography>
                                <Typography variant="body1">
                                    {order.created_at ? new Date(order.created_at).toLocaleString() : 'Sin fecha'}
                                </Typography>

                                <Stack direction="row" spacing={2} mt={2}>
                                    <Button variant="outlined" size="small" onClick={() => onEdit(order)}>
                                        Editar
                                    </Button>
                                    <Button variant="contained" color="error" size="small" onClick={() => onDelete(order.id)}>
                                        Eliminar
                                    </Button>
                                </Stack>
                            </Stack>
                        </CardContent>
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