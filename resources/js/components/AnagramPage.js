import React, { useState, useEffect } from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import LayoutPicker from './layout/LayoutPicker';
import SuccessDialog from './layout/SuccessDialog';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/actionCreators';
import { useParams } from 'react-router-dom';
import BackFAButton from './layout/BackFAButton';
import Copyright from './layout/Copyright';

const theme = createTheme();

export default function AnagramPage({ mode }) {
    const { slug } = useParams();
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const anagram = useSelector((state) => state.game.anagram);
    const [name, setName] = useState(anagram.name);
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
    const {
        createGame,
        getGame,
        editGame,
        setAlert,
        setClose,
        createEventListener
    } = bindActionCreators(actionCreators, dispatch);
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
    const [layout, setLayout] = useState(anagram.layout);
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
        const body = JSON.stringify({
            name: name,
            layout: layout,
            words: wordsJSON
        });
        mode === 'EDIT'
            ? editGame(body, 'anagram', anagram.slug)
            : createGame(body, 'anagram');
    };
    useEffect(() => {
        createEventListener();
        if (mode === 'EDIT') {
            getGame('anagram', slug);
            setPages(sliceIntoChunks(anagram.words, 4));
            setName(anagram.name);
            setLayout(anagram.layout);
        }
    }, [anagram.slug]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <BackFAButton />
                <SuccessDialog
                    open={open}
                    handleClose={handleClose}
                    edit={mode === 'EDIT'}
                    type="anagram"
                    slug={anagram.slug}
                />
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
                                        <Grid
                                            item
                                            xs={6}
                                            md={4}
                                            lg={3}
                                            key={index}
                                        >
                                            <Paper
                                                elevation={5}
                                                sx={{
                                                    padding: '15px'
                                                }}
                                            >
                                                <Grid
                                                    container
                                                    spacing={3}
                                                    align="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item xs={9}>
                                                        <Typography variant="subtitle1">
                                                            Pag {index + 1}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <IconButton
                                                            disabled={
                                                                index === 0 &&
                                                                index ===
                                                                    pages.length -
                                                                        1
                                                            }
                                                            onClick={() => {
                                                                handleRemoveWord(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Grid>
                                                    {page.map((word, i) => {
                                                        return (
                                                            <Grid
                                                                item
                                                                key={i}
                                                                xs={12}
                                                            >
                                                                <TextField
                                                                    label="Palavra"
                                                                    name="word"
                                                                    variant="outlined"
                                                                    value={word}
                                                                    inputProps={{
                                                                        maxLength: 20
                                                                    }}
                                                                    onChange={(
                                                                        event
                                                                    ) => {
                                                                        handleWordChange(
                                                                            event,
                                                                            index,
                                                                            i
                                                                        );
                                                                    }}
                                                                    fullWidth
                                                                    required
                                                                />
                                                            </Grid>
                                                        );
                                                    })}
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                        <Grid item align="center" xs={12}>
                            <Button
                                size="large"
                                type="submit"
                                variant="outlined"
                            >
                                {mode === 'EDIT' ? 'Editar' : 'Criar'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Copyright />
        </ThemeProvider>
    );
}
