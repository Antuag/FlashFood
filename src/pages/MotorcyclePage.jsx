import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import MotorcycleForm from '../components/Motorcycle/MotorcycleForm';
import MotorcycleList from '../components/Motorcycle/MotorcycleList';
import { getMotorcycles } from '../services/MotorcycleService';

export default function Motorcycles() {
    const [selectedMoto, setSelectedMoto] = useState(null);
    const [motorcycles, setMotorcycles] = useState([]);

    const loadMotorcycles = async () => {
        try {
            const res = await getMotorcycles();
            setMotorcycles(res.data || res);
        } catch (error) {
            console.error("Error cargando motos:", error);
        }
    };

    useEffect(() => {
        loadMotorcycles();
    }, []);

    return (
        <Box
            minHeight="100vh"
            width="100vw"
            bgcolor="var(--background)"
            color="var(--foreground)"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            pt={{ xs: "100px", sm: "70px", md: "80px" }} // Siempre >= 60px
            px={{ xs: 1, sm: 0 }}
        >
            <Card
                sx={{
                    width: { xs: '100%', sm: 600, md: 900 }, // 100% en xs, responsivo en desktop
                    p: { xs: 1, sm: 2, md: 4 },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    bgcolor: 'var(--card)',
                    borderRadius: 3,
                    boxShadow: 6,
                }}
            >
                {/* Formulario */}
                <Box
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    mb={{ xs: 1, md: 0 }}
                >
                    <h2 className="text-xl font-bold mb-4">Formulario de motocicletas</h2>
                    <Box width={{ xs: "100%", sm: 400, md: 500 }}>
                        <MotorcycleForm
                            selected={selectedMoto}
                            clear={() => setSelectedMoto(null)}
                            reload={loadMotorcycles}
                        />
                    </Box>
                </Box>

                {/* Lista de motos con scroll */}
                <Box
                    width={{ xs: "100%", md: "35%" }}
                    minWidth={0}
                    p={2}
                    borderRight={{ md: "1px solid var(--border)" }}
                    borderBottom={{ xs: "1px solid var(--border)", md: "none" }}
                    className="customers-scrollbar" // <-- agrega esta clase
                    sx={{
                        maxHeight: { xs: 250, md: 500 }, // Ajusta la altura máxima según tu preferencia
                        overflowY: 'auto',
                        mb: { xs: 2, md: 0 }
                    }}
                >
                    <MotorcycleList
                        onEdit={setSelectedMoto}
                        motorcycles={motorcycles}
                        reload={loadMotorcycles}
                    />
                </Box>
            </Card>
        </Box>
    );
}