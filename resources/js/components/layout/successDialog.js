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
            <DialogTitle>Jogo criado com sucesso</DialogTitle>
            <DialogContent>
                Ele ja foi salvo na sua lista de objetos e agora pode ser
                adicionado a uma aula ou trilha de aprendizado!
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={handleClose}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
