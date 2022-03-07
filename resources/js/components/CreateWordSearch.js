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
    Typography,
    Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import LayoutPicker from './layout/layoutPicker';
import RichTextField from './layout/richTextField';
import { convertToRaw, EditorState } from 'draft-js';
import draftToText from './utils/draftToText';
import userInfo from './utils/userInfo';
import createGame from './utils/createGame';
import SuccessDialog from './layout/successDialog';

const theme = createTheme();

export default function CreateWordSearch() {
    let user_info = {};
    useEffect(() => {
        user_info = userInfo();
    }, []);
    let initialState = [
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
    ];

    const [pages, setPages] = useState([...initialState]);

    const handleAddWord = () => {
        if (pages.length >= 8) {
            setAlert('O numero máximo de palavras nesse jogo é 8!');
            return;
        }
        let p = [...pages];
        p.push({
            word: '',
            tip: EditorState.createEmpty()
        });
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

    const handleWordChange = (event, index) => {
        let p = [...pages];
        let page = p[index];
        page.word = event.target.value;
        p.splice(index, 1, page);
        setPages(p);
    };

    const handleTipChange = (editorState, index) => {
        let p = [...pages];
        let page = p[index];
        page.tip = editorState;
        p.splice(index, 1, page);
        setPages(p);
    };

    const [name, setName] = useState('');

    const [layout, setLayout] = useState(1);

    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setName('');
        setPages([...initialState]);
        setLayout(1);
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (pages.length < 3) {
            setAlert('O jogo deve ter no mínimo 3 palavras!');
            return;
        }
        let wordsJSON = [];
        pages.map((page) => {
            let textJson = convertToRaw(page.tip.getCurrentContent());
            let markup = draftToText(textJson);
            wordsJSON.push({
                tip: markup,
                word: page.word
            });
        });
        let body = JSON.stringify({
            name: name,
            layout: layout,
            words: wordsJSON,
            user_id: user_info.user_id,
            client_id: user_info.client_id,
            origin: user_info.api_address
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user_info.token}`
            }
        };
        createGame(
            'wordsearch',
            body,
            config,
            user_info.api_address,
            setAlert,
            setOpen
        );
    };

    const [alert, setAlert] = useState('');

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
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
                                {pages.map((page, index) => {
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
                                                            value={page.word}
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
                                                                    pages.length -
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
                                                                page.tip
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
                                Criar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <br />
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </ThemeProvider>
    );
}
