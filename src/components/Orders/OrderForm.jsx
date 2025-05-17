import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem } from '@mui/material';

export default function OrderForm({
    onSubmit,
    initialValues,
    menus = [],        // ← Fallbacks: si la prop viene undefined será []
    customers = [],
    motorcycles = []
}) {


    const formik = useFormik({
        initialValues: initialValues || {
            customer_id: '',
            menu_id: '',
            motorcycle_id: '',
            quantity: 1,
            status: 'pending'
        },
        validationSchema: Yup.object({
            customer_id: Yup.number().required('Cliente requerido'),
            menu_id: Yup.number().required('Menú requerido'),
            motorcycle_id: Yup.number(),
            quantity: Yup.number().min(1).required('Cantidad requerida'),
            status: Yup.string().required()
        }),
        // —— convierte "" a null para motorcycle_id antes de enviar ——
        onSubmit: (values) =>
            onSubmit({
                ...values,
                motorcycle_id: values.motorcycle_id || null,
                customer_id: values.customer_id || null,
                menu_id: values.menu_id || null
            }),
        enableReinitialize: true
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {/* ─────────── Cliente ─────────── */}
            <TextField
                select
                fullWidth
                label="Cliente"
                name="customer_id"
                value={formik.values.customer_id}
                onChange={(e) =>
                    formik.setFieldValue("customer_id", e.target.value === '' ? null : Number(e.target.value))
                }
                error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
                helperText={formik.touched.customer_id && formik.errors.customer_id}
                margin="normal"
            >
                <MenuItem value="">Seleccione un cliente</MenuItem>
                {Array.isArray(customers) && customers.length > 0 ? (
                    customers.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                            {c.name || c.nombre || `Cliente ${c.id}`}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No hay clientes disponibles</MenuItem>
                )}
            </TextField>

            {/* ─────────── Menú ─────────── */}
            <TextField
                select
                fullWidth
                label="Menú"
                name="menu_id"
                value={formik.values.menu_id}
                onChange={(e) =>
                    formik.setFieldValue("menu_id", e.target.value === '' ? null : Number(e.target.value))
                }
                error={formik.touched.menu_id && Boolean(formik.errors.menu_id)}
                helperText={formik.touched.menu_id && formik.errors.menu_id}
                margin="normal"
            >
                <MenuItem value="">Seleccione un menú</MenuItem>
                {Array.isArray(menus) && menus.length > 0 ? (
                    menus.map((m) => (
                        <MenuItem key={m.id} value={m.id}>
                            {m.name || `Menú ${m.id}`}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No hay menús disponibles</MenuItem>
                )}
            </TextField>

            {/* ─────────── Moto ─────────── */}
            <TextField
                select
                fullWidth
                label="Moto"
                name="motorcycle_id"
                value={formik.values.motorcycle_id || ''}
                onChange={(e) =>
                    formik.setFieldValue("motorcycle_id", e.target.value === '' ? null : Number(e.target.value))
                }
                margin="normal"
            >
                <MenuItem value="">Seleccione una moto</MenuItem>
                {Array.isArray(motorcycles) && motorcycles.length > 0 ? (
                    motorcycles.map((m) => (
                        <MenuItem key={m.id} value={m.id}>
                            {m.license_plate || `Moto ${m.id}`}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No hay motos disponibles</MenuItem>
                )}
            </TextField>

            {/* ─────────── Cantidad ─────────── */}
            <TextField
                fullWidth
                label="Cantidad"
                name="quantity"
                type="number"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                margin="normal"
            />

            {/* ─────────── Estado ─────────── */}
            <TextField
                select
                fullWidth
                label="Estado"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                margin="normal"
            >
                <MenuItem value="pending">Pendiente</MenuItem>
                <MenuItem value="in_progress">En progreso</MenuItem>
                <MenuItem value="delivered">Entregado</MenuItem>
                <MenuItem value="cancelled">Cancelado</MenuItem>
            </TextField>

            <Button variant="contained" color="primary" fullWidth type="submit" className="mt-4">
                {initialValues ? 'Actualizar' : 'Crear Pedido'}
            </Button>
        </form>
    );
}