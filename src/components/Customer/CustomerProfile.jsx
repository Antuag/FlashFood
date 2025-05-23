import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card, Typography, Avatar, Grid, TextField,
    IconButton, Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validaciones
const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio").min(2, "Mínimo 2 caracteres"),
    phone: Yup.string()
        .required("El teléfono es obligatorio")
        .matches(/^\d+$/, "Solo números")
        .length(10, "Mínimo 10 dígitos"),
});

const CustomerProfile = ({ user, onUpdate, onDelete }) => {
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Datos del cliente en el perfil:", user);
    }, [user]);

    if (!user) return <div>Cargando perfil...</div>;

    return (
        <Card sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Mi Perfil
                {!editMode && (
                    <IconButton onClick={() => setEditMode(true)} sx={{ ml: 2 }}>
                        <EditIcon />
                    </IconButton>
                )}
            </Typography>

            <Grid container spacing={2} alignItems="center" mb={2} flexDirection="column">
                <Grid item>
                    <Avatar
                        alt={user.name}
                        src={user.photo || ""}
                        sx={{ width: 80, height: 80 }}
                    />
                </Grid>

                <Grid item xs style={{ width: "100%" }}>
                    {editMode ? (
                        <Formik
                            initialValues={{
                                name: user.name || "",
                                email: user.email || "",
                                phone: user.phone || "",
                            }}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                onUpdate(values);
                                setEditMode(false);
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        as={TextField}
                                        name="name"
                                        label="Nombre"
                                        fullWidth
                                        margin="dense"
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                    <TextField
                                        label="Correo"
                                        value={user.email || ""}
                                        fullWidth
                                        margin="dense"
                                        disabled
                                    />
                                    <Field
                                        as={TextField}
                                        name="phone"
                                        label="Teléfono"
                                        fullWidth
                                        margin="dense"
                                        error={touched.phone && Boolean(errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />

                                    <Box display="flex" gap={2} mt={2}>
                                        <IconButton type="submit" sx={{ color: "#6b8e23" }}>
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton onClick={() => setEditMode(false)} sx={{ color: "#d2691e" }}>
                                            <CancelIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={async () => {
                                                    await onDelete(user);
                                                    navigate("/login");
                                            }}
                                            sx={{ color: "#b22222" }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <>
                            <TextField label="Nombre" value={user.name || ""} fullWidth margin="dense" disabled />
                            <TextField label="Correo" value={user.email || ""} fullWidth margin="dense" disabled />
                            <TextField label="Teléfono" value={user.phone || ""} fullWidth margin="dense" disabled />
                        </>
                    )}
                </Grid>
            </Grid>
        </Card>
    );
};

export default CustomerProfile;
