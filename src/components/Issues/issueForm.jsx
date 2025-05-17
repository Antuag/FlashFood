import { useState, useEffect } from 'react';
import { createIssue, updateIssue, uploadPhoto } from '../../services/issueService';
import {
    Box, TextField, Select, MenuItem, Button, Stack, InputLabel, FormControl
} from '@mui/material';

export default function IssueForm({ onIssueSaved, editingIssue }) {
    const [form, setForm] = useState({
        motorcycle_id: '',
        description: '',
        issue_type: '',
        date_reported: '',
        status: 'open',
        image: null,
    });

    useEffect(() => {
        if (editingIssue) {
            setForm({
                ...editingIssue,
                date_reported: editingIssue.date_reported?.slice(0, 16),
                image: null,
            });
        }
    }, [editingIssue]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setForm((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const issueData = {
            motorcycle_id: form.motorcycle_id,
            description: form.description,
            issue_type: form.issue_type,
            date_reported: form.date_reported,
            status: form.status,
        };

        try {
            const res = editingIssue
                ? await updateIssue(editingIssue.id, issueData)
                : await createIssue(issueData);

            if (form.image) {
                const photoData = new FormData();
                photoData.append('file', form.image);
                photoData.append('issue_id', res.data.id || res.data[0].id);
                photoData.append('caption', 'Foto del inconveniente');
                photoData.append('taken_at', new Date().toISOString());

                await uploadPhoto(photoData);
            }

            setForm({
                motorcycle_id: '',
                description: '',
                issue_type: '',
                date_reported: '',
                status: 'open',
                image: null,
            });

            onIssueSaved();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    label="ID de la moto"
                    name="motorcycle_id"
                    value={form.motorcycle_id}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Descripción"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Tipo"
                    name="issue_type"
                    value={form.issue_type}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Fecha del reporte"
                    type="datetime-local"
                    name="date_reported"
                    value={form.date_reported}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <FormControl>
                    <InputLabel>Estado</InputLabel>
                    <Select
                        name="status"
                        value={form.status}
                        label="Estado"
                        onChange={handleChange}
                    >
                        <MenuItem value="open">Abierto</MenuItem>
                        <MenuItem value="closed">Cerrado</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" component="label">
                    Subir Imagen
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    {editingIssue ? 'Actualizar' : 'Crear'}
                </Button>
            </Stack>
        </Box>
    );
}
