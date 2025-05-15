import { useEffect } from 'react';
import {
    Button, TextField, Typography, Card, CardContent, Grid, MenuItem,
} from '@mui/material';
import { Formik, Form, Field, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { createShift, updateShift } from '../../services/ShiftService';
import toast from 'react-hot-toast';

function FormObserver({ selected }) {
    const { setValues } = useFormikContext();

    useEffect(() => {
        if (selected) {
            setValues(selected);
        } else {
            setValues({
                driver_id: '',
                motorcycle_id: '',
                start_time: '',
                end_time: '',
                status: 'active',
                id: null,
            });
        }
    }, [selected, setValues]);

    return null;
}

const validationSchema = Yup.object({
    driver_id: Yup.string().required('Conductor obligatorio'),
    motorcycle_id: Yup.string().required('Moto obligatoria'),
    start_time: Yup.string().required('Inicio obligatorio'),
    end_time: Yup.string().required('Fin obligatorio'),
    status: Yup.string().required('Estado obligatorio'),
});

export default function ShiftForm({ selected, clear, reload }) {
    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (values.id) {
                await updateShift(values.id, values);
                toast.success('Turno actualizado');
            } else {
                await createShift(values);
                toast.success('Turno creado');
            }
            reload();
            clear();
            resetForm();
        } catch (error) {
            toast.error('Error al guardar el turno');
        }
    };

    return (
        <Card sx={{ mb: 4, boxShadow: 3, color: '#eee' }}>
            <CardContent>
                <Typography variant="h6" mb={2} textAlign="center">
                    {selected ? 'Editar Turno' : 'Registrar Nuevo Turno'}
                </Typography>
                <Formik
                    initialValues={{
                        driver_id: '',
                        motorcycle_id: '',
                        start_time: '',
                        end_time: '',
                        status: 'active',
                        id: null
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ errors, touched }) => (
                        <Form>
                            <FormObserver selected={selected} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        name="driver_id"
                                        label="ID Conductor"
                                        fullWidth
                                        error={touched.driver_id && Boolean(errors.driver_id)}
                                        helperText={touched.driver_id && errors.driver_id}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        name="motorcycle_id"
                                        label="ID Moto"
                                        fullWidth
                                        error={touched.motorcycle_id && Boolean(errors.motorcycle_id)}
                                        helperText={touched.motorcycle_id && errors.motorcycle_id}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        name="start_time"
                                        label="Hora Inicio"
                                        type="datetime-local"
                                        fullWidth
                                        error={touched.start_time && Boolean(errors.start_time)}
                                        helperText={touched.start_time && errors.start_time}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        name="end_time"
                                        label="Hora Fin"
                                        type="datetime-local"
                                        fullWidth
                                        error={touched.end_time && Boolean(errors.end_time)}
                                        helperText={touched.end_time && errors.end_time}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="status"
                                        label="Estado"
                                        select
                                        fullWidth
                                        error={touched.status && Boolean(errors.status)}
                                        helperText={touched.status && errors.status}
                                    >
                                        <MenuItem value="active">Activo</MenuItem>
                                        <MenuItem value="inactive">Inactivo</MenuItem>
                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" fullWidth variant="contained">
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
}
