import React from 'react';
import { getPhotoUrl } from '../../services/issueService';
import {
    Card, CardContent, Typography, Button, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const IssueItem = ({ issue, onEdit, onDelete }) => {
    const imageUrl = issue.photos?.length > 0
        ? getPhotoUrl(issue.photos[0].image_url.replace(/\\/g, '/'))
        : null;

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6">{issue.issue_type}</Typography>
                <Typography>{issue.description}</Typography>
                <Typography color="text.secondary">Estado: {issue.status}</Typography>
                <Typography color="text.secondary">
                    Fecha: {new Date(issue.date_reported).toLocaleDateString()}
                </Typography>

                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Foto del inconveniente"
                        style={{ width: '120px', marginTop: '8px', borderRadius: '8px' }}
                    />
                )}

                <Stack direction="row" spacing={2} mt={2} justifyContent="center">
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => onEdit(issue)}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => onDelete(issue.id)}
                    >
                        Eliminar
                    </Button>
                </Stack>

            </CardContent>
        </Card>
    );
};

export default IssueItem;
