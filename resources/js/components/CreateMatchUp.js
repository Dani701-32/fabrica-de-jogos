import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Grid,
    Container,
    Box,
    CssBaseline,
    IconButton,
    Paper,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import LayoutPicker from './layout/layoutPicker';
import RichTextField from './layout/richTextField';
import draftToText from './utils/draftToText';
import userInfo from './utils/userInfo';
import createGame from './utils/createGame';

const theme = createTheme();

export default function CreateMatchUp() {
    let user_info = {};
    useEffect(() => {
        user_info = userInfo();
    }, []);
    const navigate = useNavigate();
    let initialState = [
        {
            word: '',
            meaning: EditorState.createEmpty()
        },
        {
            word: '',
            meaning: EditorState.createEmpty()
        },
        {
            word: '',
            meaning: EditorState.createEmpty()
        },
        {
            word: '',
            meaning: EditorState.createEmpty()
        }
    ];
    const [pages, setPages] = useState([initialState]);

    const handleCreatePage = () => {
        if (pages.length >= 10) {
            setAlert('O número máximo de páginas para esse jogo é 10!');
            return;
        }
        setPages([...pages, initialState]);
    };

    const handleRemovePage = (index) => {
        let p = [...pages];
        p.splice(index, 1);
        setPages(p);
    };

    const handleWordChange = (event, index, i) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.word = event.target.value;
        page.splice(i, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
    };

    const handleMeaningChange = (editorState, index, i) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.meaning = editorState;
        page.splice(i, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
    };

    const [layout, setLayout] = useState(1);

    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let name = data.get('name');
        let matchUpsJSON = [];
        pages.map((page) => {
            let matchUps = [];
            page.map((matchUp) => {
                let textJson = convertToRaw(
                    matchUp.meaning.getCurrentContent()
                );
                let markup = draftToText(textJson);
                matchUps.push({
                    meaning: markup,
                    word: matchUp.word
                });
            });
            matchUpsJSON.push(matchUps);
        });
        let body = JSON.stringify({
            name: name,
            layout: layout,
            pages: matchUpsJSON,
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
            'matchup',
            body,
            config,
            user_info.api_address,
            setAlert,
            navigate
        );
    };

    const [alert, setAlert] = useState('');

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
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
                                required
                            />
                        </Grid>
                        <LayoutPicker
                            handleLayout={handleLayout}
                            selectedLayout={layout}
                        />
                        <Grid item align="center" xs={12}>
                            <Button
                                onClick={handleCreatePage}
                                endIcon={<AddIcon fontSize="small" />}
                                variant="contained"
                            >
                                Adicionar página
                            </Button>
                        </Grid>
                        <Grid item align="center" xs={12}>
                            <Grid
                                container
                                spacing={3}
                                align="center"
                                alignItems="flex-start"
                                justifyContent="center"
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
                                        <Grid key={index} item md={12} lg={6}>
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
                                                    spacing={2}
                                                >
                                                    <Grid item xs={10}>
                                                        <Typography variant="subtitle1">
                                                            Pag{' '}
                                                            {(
                                                                index + 1
                                                            ).toString()}
                                                        </Typography>
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
                                                                handleRemovePage(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Grid>
                                                    {page.map((matchUp, i) => {
                                                        return (
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                key={i}
                                                            >
                                                                <Grid
                                                                    container
                                                                    align="center"
                                                                    alignItems="center"
                                                                    spacing={2}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={4}
                                                                    >
                                                                        <TextField
                                                                            variant="outlined"
                                                                            label="Palavra"
                                                                            required
                                                                            inputProps={{
                                                                                maxLength: 26
                                                                            }}
                                                                            fullWidth
                                                                            value={
                                                                                matchUp.word
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handleWordChange(
                                                                                    event,
                                                                                    index,
                                                                                    i
                                                                                )
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={1}
                                                                    >
                                                                        <KeyboardDoubleArrowRight fontSize="small" />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        align="left"
                                                                        xs={7}
                                                                    >
                                                                        <RichTextField
                                                                            editorState={
                                                                                matchUp.meaning
                                                                            }
                                                                            handleTextChange={
                                                                                handleMeaningChange
                                                                            }
                                                                            index={
                                                                                index
                                                                            }
                                                                            i={
                                                                                i
                                                                            }
                                                                            label={
                                                                                'Significado...'
                                                                            }
                                                                            maxLength={
                                                                                80
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
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
                                Criar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <br />
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                Edutec {new Date().getFullYear()}
                {'.'}
            </Typography>
        </ThemeProvider>
    );
}
