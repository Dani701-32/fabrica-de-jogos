import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';

type Props = {
    open: boolean;
    handleClose: Function;
};

export default function SuccessDialog({ open, handleClose }: Props) {
    return (
        <Dialog open={open} onClose={() => handleClose()}>
            <DialogTitle>Jogo salvo com sucesso</DialogTitle>
            <DialogContent>
                Ele ja está salvo na sua lista de objetos e pode ser adicionado
                a uma aula ou trilha de aprendizado!
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={() => handleClose()}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
