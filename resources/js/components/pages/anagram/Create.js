import React, { useState, useEffect } from 'react';
import { Alert, Button, Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LayoutPicker from '../../layout/LayoutSelect';
import SuccessDialog from '../../layout/SuccessDialog';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/actionCreators';
import FillableSelect from '../../layout/FillableSelect';
import { refreshBaseState } from '../../../store/actions';
import Page from './layout/Page';
import BackFAButton from '../../layout/BackFAButton';
import { Box } from '@mui/system';
import Copyright from '../../layout/Copyright';

const Create = () => {
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const anagram = useSelector((state) => state.game.anagram);
    const series = useSelector((state) => state.base.series);
    const [selectedSerie, setSelectedSerie] = useState('');
    const disciplinas = useSelector((state) => state.base.disciplinas);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
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
    const { createGame, setAlert, setClose, refreshBaseState } =
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
    const seriesChange = (event) => {
        const value = event.target.value;
        if (value !== null && value !== selectedSerie) {
            setSelectedSerie(value);
        }
    };
    const disciplineChange = (event) => {
        const value = event.target.value;
        if (value !== null && value !== selectedDiscipline) {
            setSelectedDiscipline(value);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (pages.length < 1) {
            setAlert('O jogo deve ter no mínimo 1 página!');
            return;
        }
        if (selectedSerie === '') {
            setAlert('Selecione uma série!');
            return;
        }
        if (selectedDiscipline === '') {
            setAlert('Selecione uma disciplina!');
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
        createGame(body, 'anagram', selectedSerie, selectedDiscipline);
    };
    useEffect(() => {
        refreshBaseState();
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
        }, 2000);
    }, []);

    return (
        <>
            <BackFAButton />
            <SuccessDialog open={open} handleClose={handleClose} />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                <Grid
                    container
                    align="center"
                    justifyContent="center"
                    component="form"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    <Grid item align="center" xs={12}>
                        <TextField
                            label="Nome"
                            name="name"
                            variant="outlined"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            required
                        />
                    </Grid>
                    <Grid item align="center" xs={3}>
                        <FillableSelect
                            items={series}
                            name="Ano/Série"
                            value={selectedSerie}
                            callBack={seriesChange}
                        />
                    </Grid>
                    <Grid item align="center" xs={3}>
                        <FillableSelect
                            items={disciplinas}
                            name="Módulo"
                            value={selectedDiscipline}
                            callBack={disciplineChange}
                        />
                    </Grid>
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
                            Criar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Copyright />
        </>
    );
};

export default Create;
