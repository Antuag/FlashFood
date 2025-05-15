// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    OAuthProvider
} from "firebase/auth";
import { Typography, Box, Paper } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { auth, providerGoogle, providerGithub, microsoftProvider } from "../firebase";
import { syncWithBackend } from "../services/authService";
import { useCustomer } from "../context/CustomerContext";
import "../styles/login.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const { setCustomer } = useCustomer();

    const handleSubmit = (values) => {
        const { email, password, name, phone } = values; // Obtienes email y password de Formik

        if (isRegistering) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Registration successful!");
                    const userWithExtras = {
                    ...userCredential.user,
                    displayName: name,
                    phoneNumber: phone,
                };
                    syncWithBackend(userWithExtras, setCustomer, navigate);
                })
                .catch((error) => {
                    alert("Error during registration: " + error.message);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Login successful!");
                    syncWithBackend(userCredential.user, setCustomer, navigate);
                })
                .catch((error) => {
                    alert("Error during login: " + error.message);
                });
        }
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result); 
                const token = credential.accessToken;
                console.log("Google token:", token);
                localStorage.setItem("accessToken", token);
                alert("Google login successful!");
                syncWithBackend(result.user, setCustomer, navigate);
            })
            .catch((error) => {
                alert("Error with Google: " + error.message);
            });
    };

    const handleGithubLogin = () => {
        signInWithPopup(auth, providerGithub)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result); 
                const token = credential.accessToken;
                console.log("Github token:", token);
                localStorage.setItem("accessToken", token);
                alert("Github login successful!");
                syncWithBackend(result.user, setCustomer, navigate);
            })
            .catch((error) => {
                alert("Error with Github: " + error.message);
            });
    };

    const handleMicrosoftLogin = () => {
        signInWithPopup(auth, microsoftProvider)
            .then((result) => {
                const credential = OAuthProvider.credentialFromResult(result); 
                const token = credential.accessToken;
                console.log("Microsoft token:", token);
                localStorage.setItem("accessToken", token);
                alert("Microsoft login successful!");
                syncWithBackend(result.user, setCustomer, navigate);
            })
            .catch((error) => {
                alert("Error with Microsoft: " + error.message);
            });
    };

    const toggleAuthMode = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{ background: "linear-gradient(135deg, #FF5722, #FF9800)" }}
        >
            <Paper elevation={6} sx={{ padding: 4, width: 400, borderRadius: 3 }}>
                <Typography variant="h3" align="center" color="primary" gutterBottom>
                    Flash Food
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    {isRegistering ? "Sign Up" : "Login"}
                </Typography>
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    isRegistering={isRegistering}
                    handleSubmit={handleSubmit} // Ahora pasamos la función `handleSubmit` sin `e`
                    handleGoogleLogin={handleGoogleLogin}
                    handleGithubLogin={handleGithubLogin}
                    handleMicrosoftLogin={handleMicrosoftLogin}
                    toggleAuthMode={toggleAuthMode}
                />
            </Paper>
        </Box>
    );
}

export default LoginPage;
