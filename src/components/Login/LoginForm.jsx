import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
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
            // Aquí se pasa los valores del formulario al handleSubmit
            handleSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <TextField
                type="email"
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                type="password"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            {isRegistering && (
                <>
                    <TextField
                        type="text"
                        label="Name"
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
                        label="Phone"
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
                {isRegistering ? "Sign Up" : "Login"}
            </Button>

            <Typography style={{ marginTop: "10px", textAlign: "center" }}>
                {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
                <Button onClick={toggleAuthMode} color="secondary">
                    {isRegistering ? "Log In" : "Sign Up"}
                </Button>
            </Typography>

            <hr style={{ margin: "20px 0" }} />

            <Button onClick={handleGoogleLogin} variant="outlined" color="secondary" fullWidth>
                <FcGoogle style={{ marginRight: "8px" }} /> Login with Google
            </Button>
            <hr style={{ margin: "5px 0" }} />
            <Button onClick={handleGithubLogin} variant="outlined" color="secondary" fullWidth>
                <FaGithub style={{ marginRight: "8px" }} /> Login with Github
            </Button>
            <hr style={{ margin: "5px 0" }} />
            <Button onClick={handleMicrosoftLogin} variant="outlined" color="secondary" fullWidth>
                <FaWindows style={{ marginRight: "8px" }} /> Login with Microsoft
            </Button>
        </form>
    );
};

export default LoginForm;
