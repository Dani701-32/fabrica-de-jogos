import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../store/actionCreators';

export default function SuccessDialog({ open, handleClose, type, slug }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setClose, setAlert } = bindActionCreators(actionCreators, dispatch);
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
                <Button
                    size="small"
                    onClick={() => {
                        setClose();
                        setAlert('');
                        navigate(`/edit/${type}/${slug}`);
                    }}
                >
                    Editar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
