import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
    getOrders, createOrder, updateOrder, deleteOrder
} from '../../services/orderService';
import { getCustomers } from '../../services/customerService';
import { getMenus } from '../../services/menuService';
import { getMotorcycles } from '../../services/motorcycleService';

import OrderForm from '../../components/Orders/OrderForm';
import OrderList from '../../components/Orders/OrderList';

import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const attachMotorcycle = (orders, motos) =>
    orders.map(o => ({
        ...o,
        motorcycle: motos.find(m => m.id === o.motorcycle_id) || null
    }));

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [menus, setMenus] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [motorcycles, setMotorcycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const [ordersRes, menusRes, customersRes, motorcyclesRes] = await Promise.all([
                getOrders(),
                getMenus(),
                getCustomers(),
                getMotorcycles()
            ]);
            
            // Depuración de las respuestas
            console.log('API Responses:');
            console.log('Orders:', ordersRes);
            console.log('Menus:', menusRes);
            console.log('Customers:', customersRes);
            console.log('Motorcycles:', motorcyclesRes);
            
            // Verificar que las respuestas tengan la propiedad data
            const ordersData = ordersRes.data || [];
            const menusData = menusRes.data || [];
            const customersData = customersRes || [];//ira sin data ya que la estrucutra que envia el service no me deja usarlo de esa manera
            const motorcyclesData = motorcyclesRes.data || [];
            
            setOrders(attachMotorcycle(ordersData, motorcyclesData));
            setMenus(menusData);
            setCustomers(customersData);
            setMotorcycles(motorcyclesData);
        } catch (err) {
            console.error('Error al cargar datos:', err);
            setError('Error al cargar los datos. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (editingOrder) {
                await updateOrder(editingOrder.id, values);
                Swal.fire({
                    icon: "success",
                    title: "Pedido actualizado",
                    text: "El pedido se actualizó correctamente.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                await createOrder(values);
                Swal.fire({
                    icon: "success",
                    title: "Pedido creado",
                    text: "El pedido se creó correctamente.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
            setEditingOrder(null);
            loadAll();
        } catch (err) {
            console.error('Error al guardar el pedido:', err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo guardar el pedido.",
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id);
            loadAll();
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "El pedido ha sido eliminado.",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error('Error al eliminar el pedido:', err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo eliminar el pedido.",
            });
        }
    };

    if (error) {
        return (
            <Box textAlign="center" py={4}>
                <Typography variant="h6" color="error">{error}</Typography>
                <Button variant="contained" onClick={loadAll} sx={{ mt: 2 }}>
                    Reintentar
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: { xs: 5, sm: 2, md: 10 }, pt: { xs: 90, sm: 10, md: 30 }, maxWidth: 1300, mx: "auto" }}>
            <Card elevation={4} sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
                <Grid container spacing={4} alignItems="stretch">
                    {/* Formulario */}
                    <Grid item xs={12} md={4}>
                        <Card elevation={0} sx={{ boxShadow: "none", height: "100%" }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Formulario de Pedido</Typography>
                                <OrderForm
                                    onSubmit={handleSubmit}
                                    initialValues={editingOrder}
                                    menus={menus}
                                    customers={customers}
                                    motorcycles={motorcycles}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Lista */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card elevation={0} sx={{ boxShadow: "none", height: "100%" }}>
                            <CardContent sx={{ maxHeight: '82vh', overflowY: 'auto' }} className='customers-scrollbar'>
                                <Typography variant="h6" gutterBottom>Lista de Pedidos</Typography>
                                <OrderList
                                    orders={orders}
                                    onEdit={setEditingOrder}
                                    onDelete={handleDelete}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}