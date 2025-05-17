import React, { useEffect, useState } from 'react';
import {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    getAddressById
} from '../../services/addressService';
import AddressForm from '../../components/Address/AddressForm';
import {
    Typography,
    Container,
    Paper,
    IconButton,
    Box,
} from '@mui/material';
import { Edit, Delete, LocationOn } from '@mui/icons-material';

const AddressCRUD = () => {
    const [addresses, setAddresses] = useState([]);
    const [editingAddress, setEditingAddress] = useState(null);

    const fetchAddresses = async () => {
        const res = await getAddresses();
        setAddresses(res.data);
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        if (editingAddress) {
            await updateAddress(editingAddress.id, values);
            setEditingAddress(null);
        } else {
            await createAddress(values);
        }
        fetchAddresses();
        resetForm();
    };

    const handleEdit = async (id) => {
        const res = await getAddressById(id);
        setEditingAddress(res.data);
    };

    const handleDelete = async (id) => {
        await deleteAddress(id);
        fetchAddresses();
    };

    return (
        <Container maxWidth="md" sx={{ py: 4, pt: {xs:50, md:20 } }}>
            <Paper elevation={4} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    align="center"
                    sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}
                >
                    <LocationOn sx={{ color: 'primary.main', mr: 1 }} />
                    CRUD de Direcciones
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 3,
                    }}
                >
                    {/* Formulario */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            {editingAddress ? 'Editar Dirección' : 'Crear Dirección'}
                        </Typography>
                        <AddressForm
                            initialValues={
                                editingAddress || {
                                    order_id: '',
                                    street: '',
                                    city: '',
                                    state: '',
                                    postal_code: '',
                                    additional_info: ''
                                }
                            }
                            onSubmit={handleSubmit}
                        />
                    </Box>

                    {/* Lista de Direcciones con scroll */}
                    <Box
                        sx={{
                            flex: 1.5,
                            maxHeight: 400,
                            overflowY: 'auto',
                            borderLeft: { md: '1px solid #ddd' },
                            pl: { md: 2 },
                        }}
                        className="customers-scrollbar"
                    >
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Lista de Direcciones
                        </Typography>

                        {addresses.length === 0 ? (
                            <Typography variant="body1">No hay direcciones registradas.</Typography>
                        ) : (
                            addresses.map((addr) => (
                                <Box
                                    key={addr.id}
                                    sx={{
                                        borderBottom: '1px solid #eee',
                                        py: 1,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Box sx={{ mr: 1, flex: 1 }}>
                                        <Typography variant="body1" fontWeight="bold">
                                            {addr.street}, {addr.city}, {addr.state}, {addr.postal_code}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Info: {addr.additional_info || 'N/A'} | Orden: {addr.order_id}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton onClick={() => handleEdit(addr.id)} size="small" color="primary">
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(addr.id)} size="small" color="error">
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

    export default AddressCRUD;
