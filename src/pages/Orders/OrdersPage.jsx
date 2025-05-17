import { useEffect, useState } from 'react';
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
            } else {
                await createOrder(values);
            }
            setEditingOrder(null);
            loadAll();
        } catch (err) {
            console.error('Error al guardar el pedido:', err);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id);
            loadAll();
        } catch (err) {
            console.error('Error al eliminar el pedido:', err);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    if (loading) {
        return <Typography variant="h6" align="center" py={4}>Cargando datos...</Typography>;
    }

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
        <Box sx={{ flexGrow: 1, padding: 4 }}>
            <Grid container spacing={4}>
                {/* Formulario */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
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
                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ maxHeight: '82vh', overflowY: 'auto' }}>
                        <CardContent>
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
        </Box>
    );
}