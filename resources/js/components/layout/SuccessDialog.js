import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';

export default function SuccessDialog({ open, handleClose }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Jogo salvo com sucesso</DialogTitle>
            <DialogContent>
                Ele ja está salvo na sua lista de objetos e pode ser adicionado
                a uma aula ou trilha de aprendizado!
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={handleClose}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
