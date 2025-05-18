import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Stack, Divider } from "@mui/material";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaWindows } from 'react-icons/fa';

const LoginForm = ({
    isRegistering, 
    handleSubmit, 
    handleGoogleLogin, 
    handleGithubLogin, 
    handleMicrosoftLogin, 
    toggleAuthMode
}) => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            name: "",
            phone: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Correo electrónico inválido").required("El correo es obligatorio"),
            password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
            ...(isRegistering && {
                name: Yup.string().required("El nombre es obligatorio"),
                phone: Yup.string().required("El número es obligatorio"),
            })
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <TextField
                type="email"
                label="Correo electronico"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                autoComplete="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                type="password"
                label="Contraseña"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                autoComplete="current-password"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            {isRegistering && (
                <>
                    <TextField
                        type="text"
                        label="Nombre"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        fullWidth
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        type="text"
                        label="Telefono"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        fullWidth
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                </>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
                {isRegistering ? "Crear cuenta" : "Iniciar Sesion"}
            </Button>

            <Typography sx={{ mt: 1, textAlign: "center" }}>
                {isRegistering ? "Ya eres cliente nuestro :)" : "No tienes una cuenta ?"}{" "}
                <Button onClick={toggleAuthMode} color="Primary" size="small">
                    {isRegistering ? "Iniciar sesion" : "Registrarse"}
                </Button>
            </Typography>

            <Divider sx={{ my: 2 }}>Tambien puedes ingresar con</Divider>

            <Stack direction="column" spacing={2}>
                <Button
                    onClick={handleGoogleLogin}
                    variant="contained"
                    fullWidth
                    startIcon={<FcGoogle size={22} />}
                    sx={{
                        backgroundColor: "#fff",
                        color: "#222",
                        fontWeight: 600,
                        '&:hover': { backgroundColor: "#f1f1f1" },
                        border: "1px solid #ddd"
                    }}
                >
                    Google
                </Button>
                <Button
                    onClick={handleGithubLogin}
                    variant="contained"
                    fullWidth
                    startIcon={<FaGithub size={20} />}
                    sx={{
                        backgroundColor: "#24292f",
                        color: "#fff",
                        fontWeight: 600,
                        '&:hover': { backgroundColor: "#1b1f23" }
                    }}
                >
                    Github
                </Button>
                <Button
                    onClick={handleMicrosoftLogin}
                    variant="contained"
                    fullWidth
                    startIcon={<FaWindows size={20} />}
                    sx={{
                        backgroundColor: "#2F2FDF",
                        color: "#fff",
                        fontWeight: 600,
                        '&:hover': { backgroundColor: "#2323a0" }
                    }}
                >
                    Microsoft
                </Button>
            </Stack>
        </form>
    );
};

export default LoginForm;
