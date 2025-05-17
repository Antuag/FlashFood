import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Box } from '@mui/material';

const validationSchema = Yup.object({
    order_id: Yup.number().required('Order ID es requerido'),
    street: Yup.string().required('Calle es requerida'),
    city: Yup.string().required('Ciudad es requerida'),
    state: Yup.string().required('Departamento es requerido'),
    postal_code: Yup.string().required('Código postal es requerido'),
    additional_info: Yup.string()
});

const AddressForm = ({ initialValues, onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="order_id"
                        name="order_id"
                        label="ID de Pedido"
                        value={formik.values.order_id}
                        onChange={formik.handleChange}
                        error={formik.touched.order_id && Boolean(formik.errors.order_id)}
                        helperText={formik.touched.order_id && formik.errors.order_id}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="street"
                        name="street"
                        label="Calle"
                        value={formik.values.street}
                        onChange={formik.handleChange}
                        error={formik.touched.street && Boolean(formik.errors.street)}
                        helperText={formik.touched.street && formik.errors.street}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="city"
                        name="city"
                        label="Ciudad"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="state"
                        name="state"
                        label="Departamento"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="postal_code"
                        name="postal_code"
                        label="Código Postal"
                        value={formik.values.postal_code}
                        onChange={formik.handleChange}
                        error={formik.touched.postal_code && Boolean(formik.errors.postal_code)}
                        helperText={formik.touched.postal_code && formik.errors.postal_code}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="additional_info"
                        name="additional_info"
                        label="Información Adicional"
                        value={formik.values.additional_info}
                        onChange={formik.handleChange}
                        error={formik.touched.additional_info && Boolean(formik.errors.additional_info)}
                        helperText={formik.touched.additional_info && formik.errors.additional_info}
                        size="small"
                        multiline
                        minRows={2}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" fullWidth type="submit" sx={{ py: 1.2, fontWeight: 'bold', borderRadius: 2 }}>
                        Guardar Dirección
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddressForm;
