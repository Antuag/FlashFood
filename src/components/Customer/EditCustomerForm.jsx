import { Box, Grid, TextField, Typography, IconButton, Card } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio").min(2, "El nombre debe tener al menos 2 caracteres"),
    email: Yup.string().email("Email inválido").required("El email es obligatorio"),
    phone: Yup.string().required("El teléfono es obligatorio").matches(/^\d+$/, "El teléfono solo puede contener números").min(10, "El teléfono debe tener al menos 10 dígitos"),
});

const EditCustomerForm = ({ formData, onSave, onCancel }) => {
    return (
        <Formik
            initialValues={formData}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onSave(values); // aquí mandas los datos validados
            }}
        >
            {({ errors, touched }) => (
                <Card>
                    <Form>
                        <Box p={3} borderRadius={2}>
                            <Typography variant="h6" gutterBottom>
                                Editar Mis Datos
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        as={TextField}
                                        name="name"
                                        label="Nombre"
                                        fullWidth
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        disabled
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        as={TextField}
                                        name="phone"
                                        label="Teléfono"
                                        fullWidth
                                        error={touched.phone && Boolean(errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" gap={2}>
                                        <IconButton type="submit" sx={{ color: "#6b8e23" }}>
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton onClick={onCancel} sx={{ color: "#d2691e" }}>
                                            <CancelIcon />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                </Card>
            )}
        </Formik>
    );
};

export default EditCustomerForm;
