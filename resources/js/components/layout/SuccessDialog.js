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

export default function SuccessDialog({ open, handleClose, edit, type, slug }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setClose, setAlert, setProgress } = bindActionCreators(
        actionCreators,
        dispatch
    );
    return (
        <Dialog open={open} onClose={edit ? setClose : handleClose}>
            <DialogTitle>
                Jogo {edit ? 'editado' : 'criado'} com sucesso
            </DialogTitle>
            <DialogContent>
                Ele ja está salvo na sua lista de objetos e pode ser adicionado
                a uma aula ou trilha de aprendizado!
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={edit ? setClose : handleClose}>
                    OK
                </Button>
                {!edit && (
                    <Button
                        size="small"
                        onClick={() => {
                            setClose();
                            setAlert('');
                            setProgress(0);
                            navigate(`/edit/${type}/${slug}`);
                        }}
                    >
                        Editar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
