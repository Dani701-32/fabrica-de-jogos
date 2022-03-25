import React, { useState, useEffect } from 'react';
import { Alert, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LayoutPicker from '../../layout/LayoutSelect';
import SuccessDialog from '../../layout/SuccessDialog';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/actionCreators';
import { useParams } from 'react-router-dom';
import { refreshBaseState } from '../../../store/actions';
import Page from './layout/Page';

export default function Edit() {
    const { slug } = useParams();
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const anagram = useSelector((state) => state.game.anagram);
    const [name, setName] = useState(anagram.name);
    const [layout, setLayout] = useState(anagram.layout);
    function sliceIntoChunks(arr, chunkSize) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }
    const [pages, setPages] = useState(sliceIntoChunks(anagram.words, 4));
    const dispatch = useDispatch();
    const { getGame, editGame, setAlert, setClose, refreshBaseState } =
        bindActionCreators(actionCreators, dispatch);
    const handleAddWord = () => {
        if (pages.length >= 8) {
            setAlert('O numero máximo de páginas nesse jogo é 8!');
            return;
        }
        let p = [...pages];
        p.push(['', '', '', '']);
        setPages(p);
    };
    const handleRemoveWord = (index) => {
        if (pages.length === 1) {
            return;
        }
        let p = [...pages];
        p.splice(index, 1);
        setPages(p);
    };
    const handleWordChange = (event, index, i) => {
        let p = [...pages];
        let page = p[index];
        page.splice(i, 1, event.target.value);
        p.splice(index, 1, page);
        setPages(p);
    };
    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleClose = () => {
        setPages([['', '', '', '']]);
        setLayout(1);
        setName('');
        setClose();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (pages.length < 1) {
            setAlert('O jogo deve ter no mínimo 1 página!');
            return;
        }
        let wordsJSON = [];
        pages.map((page) => {
            page.map((word) => {
                wordsJSON.push(word);
            });
        });
        const body = {
            name: name,
            layout: layout,
            words: wordsJSON
        };
        editGame(body, 'anagram', anagram.slug);
    };
    useEffect(() => {
        getGame('anagram', slug);
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
            refreshBaseState();
        }, 2000);
    }, []);
    useEffect(() => {
        anagram.approved_at &&
            setAlert(
                'Esse jogo já foi aprovado, logo não pode mais ser editado!'
            );
        setPages(sliceIntoChunks(anagram.words, 4));
        setName(anagram.name);
        setLayout(anagram.layout);
    }, [anagram.slug]);

    return (
        <>
            <SuccessDialog open={open} handleClose={handleClose} />
            <Grid
                container
                align="center"
                justifyContent="center"
                component="form"
                onSubmit={handleSubmit}
                spacing={3}
            >
                <LayoutPicker
                    handleLayout={handleLayout}
                    selectedLayout={layout}
                />
                <Grid item align="center" xs={12}>
                    <Button
                        onClick={handleAddWord}
                        endIcon={<AddIcon fontSize="small" />}
                        variant="contained"
                    >
                        Adicionar Pagina
                    </Button>
                </Grid>
                <Grid item lg={12}>
                    <Grid
                        container
                        align="center"
                        alignItems="flex-start"
                        justifyContent="center"
                        spacing={3}
                    >
                        {alert && (
                            <Grid item xs={12}>
                                <Alert
                                    severity="warning"
                                    onClick={() => {
                                        setAlert('');
                                    }}
                                >
                                    {alert}
                                </Alert>
                            </Grid>
                        )}
                        {pages.map((page, index) => {
                            return (
                                <Page
                                    key={index}
                                    page={page}
                                    index={index}
                                    onChange={handleWordChange}
                                    handleDelete={handleRemoveWord}
                                />
                            );
                        })}
                    </Grid>
                </Grid>
                <Grid item align="center" xs={12}>
                    <Button
                        size="large"
                        type="submit"
                        variant="outlined"
                        disabled={!!anagram.approved_at}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
