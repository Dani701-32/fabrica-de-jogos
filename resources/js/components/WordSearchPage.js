import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    TextField,
    Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import LayoutPicker from './layout/LayoutPicker';
import RichTextField from './layout/RichTextField';
import { convertToRaw, EditorState } from 'draft-js';
import draftToText from './utils/draftToText';
import userInfo from './utils/userInfo';
import SuccessDialog from './layout/SuccessDialog';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/actionCreators';
import BackFAButton from './layout/BackFAButton';
import Copyright from './layout/Copyright';

const theme = createTheme();

export default function WordSearchPage({ mode }) {
    const { slug } = useParams();
    let user_info = {};
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const wordsearch = useSelector((state) => state.game.wordsearch);
    const [words, setWords] = useState(wordsearch.words);
    const [name, setName] = useState(wordsearch.name);
    const [layout, setLayout] = useState(wordsearch.layout);
    const dispatch = useDispatch();
    const { createGame, getGame, editGame, setAlert, setClose } =
        bindActionCreators(actionCreators, dispatch);
    const handleAddWord = () => {
        if (words.length >= 8) {
            setAlert('O numero máximo de palavras nesse jogo é 8!');
            return;
        }
        let p = [...words];
        p.push({
            word: '',
            tip: EditorState.createEmpty()
        });
        setWords(p);
    };
    const handleRemoveWord = (index) => {
        if (words.length === 1) {
            return;
        }
        let p = [...words];
        p.splice(index, 1);
        setWords(p);
    };
    const handleWordChange = (event, index) => {
        let p = [...words];
        let word = p[index];
        word.word = event.target.value;
        p.splice(index, 1, word);
        setWords(p);
    };
    const handleTipChange = (editorState, index) => {
        let p = [...words];
        let word = p[index];
        word.tip = editorState;
        p.splice(index, 1, word);
        setWords(p);
    };
    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleClose = () => {
        setName('');
        setWords([
            {
                word: '',
                tip: EditorState.createEmpty()
            },
            {
                word: '',
                tip: EditorState.createEmpty()
            },
            {
                word: '',
                tip: EditorState.createEmpty()
            }
        ]);
        setLayout(1);
        setClose();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (words.length < 3) {
            setAlert('O jogo deve ter no mínimo 3 palavras!');
            return;
        }
        let wordsJSON = [];
        words.map((word) => {
            let textJson = convertToRaw(word.tip.getCurrentContent());
            let markup = draftToText(textJson);
            wordsJSON.push({
                tip: markup,
                word: word.word
            });
        });
        let body = JSON.stringify({
            name: name,
            layout: layout,
            words: wordsJSON
        });
        mode === 'EDIT'
            ? editGame(body, 'wordsearch', wordsearch.slug, user_info.token)
            : createGame(body, 'wordsearch', user_info);
    };
    useEffect(() => {
        user_info = userInfo();
        if (mode === 'EDIT') {
            getGame('wordsearch', slug);
            setWords(wordsearch.words);
            setName(wordsearch.name);
            setLayout(wordsearch.layout);
        }
    }, [wordsearch.slug]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <BackFAButton />
                <SuccessDialog
                    open={open}
                    handleClose={handleClose}
                    edit={mode === 'EDIT'}
                    slug={wordsearch.slug}
                    type="wordsearch"
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
                                Adicionar Palavra
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
                                {words.map((item, index) => {
                                    return (
                                        <Grid
                                            item
                                            xs={8}
                                            md={6}
                                            lg={4}
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
                                                    align="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item xs={10}>
                                                        <TextField
                                                            label="Palavra"
                                                            name="word"
                                                            variant="outlined"
                                                            value={item.word}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                handleWordChange(
                                                                    event,
                                                                    index
                                                                );
                                                            }}
                                                            inputProps={{
                                                                maxLength: 10
                                                            }}
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <IconButton
                                                            disabled={
                                                                index <
                                                                    words.length -
                                                                        1 ||
                                                                index === 0
                                                            }
                                                            onClick={() => {
                                                                handleRemoveWord(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid
                                                        align="left"
                                                        item
                                                        xs={10}
                                                    >
                                                        <RichTextField
                                                            editorState={
                                                                item.tip
                                                            }
                                                            handleTextChange={
                                                                handleTipChange
                                                            }
                                                            label={'Dica'}
                                                            index={index}
                                                            maxLength={200}
                                                        />
                                                    </Grid>
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
