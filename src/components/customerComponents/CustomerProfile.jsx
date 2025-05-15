import { useEffect } from "react";
import { useCustomer } from "../../context/CustomerContext";
import { Card, TextField, Avatar, Grid, Typography } from "@mui/material";

const CustomerProfile = () => {
    const { customer } = useCustomer();

    useEffect(() => {
        console.log("Datos del cliente en el perfil:", customer);
    }, [customer]);

    if (!customer) return <div>Cargando perfil...</div>;

    return (
        <Card sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>Perfil</Typography>
            <Grid container spacing={2} alignItems="center" mb={2} flexDirection="column">
                <Grid item>
                    <Avatar
                        alt={customer.name}
                        src={customer.photo || ""}
                        sx={{ width: 80, height: 80 }}
                    />
                </Grid>
                <Grid item xs>
                    <TextField label="Nombre" value={customer.name || ""} fullWidth margin="dense" disabled />
                    <TextField label="Correo" value={customer.email || ""} fullWidth margin="dense" disabled />
                    <TextField label="Teléfono" value={customer.phone || ""} fullWidth margin="dense" disabled />
                </Grid>
            </Grid>
        </Card>
    );
};

export default CustomerProfile;
