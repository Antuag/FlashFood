import {
    Card,
    Typography,
    Box,
    Grid,
    Avatar
} from "@mui/material";


const CustomerList = ({ customers, loggedUser, onEdit, onDelete }) => (
    <Box>
        <Typography variant="h5" gutterBottom align="center">
            Lista de Clientes
        </Typography>
        <Grid container spacing={2} justifyContent="center">
            {customers.map((c) => (
                <Grid item xs={12} sm={12} md={12} key={c.id} display="flex" justifyContent="center">
                    <Card
                        sx={{
                            borderRadius: 2,
                            p: 2,
                            width: 280,
                            minHeight: 140,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            boxShadow: 3,
                            bgcolor: c.id === loggedUser.id ? "primary.light" : "background.paper",
                        }}
                    >
                        <Avatar
                            src={c.photoURL}
                            alt={c.name}
                            sx={{ width: 56, height: 56, mb: 1, bgcolor: "secondary.main" }}
                        />
                        <Typography variant="subtitle1" fontWeight="bold" align="center">
                            {c.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center">
                            {c.email}
                        </Typography>
                        
                          
                        
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default CustomerList;
