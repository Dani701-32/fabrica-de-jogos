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
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import LayoutPicker from './layout/layoutPicker';
import createGame from './utils/createGame';
import userInfo from './utils/userInfo';

const theme = createTheme();

export default function CreateAnagram() {
    let user_info = {};
    useEffect(() => {
        user_info = userInfo();
    }, []);
    const navigate = useNavigate();
    const [pages, setPages] = useState([['', '', '', '']]);
    const handleAddWord = () => {
        if (pages.length >= 8) {
            setAlert('O numero máximo de palavras nesse jogo é 8!');
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

    const [layout, setLayout] = useState(1);

    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (pages.length < 1) {
            setAlert('O jogo deve ter no mínimo 1 tela!');
            return;
        }
        const data = new FormData(event.currentTarget);
        let name = data.get('name');
        let wordsJSON = [];
        pages.map((page, index) => {
            page.map((word, i) => {
                wordsJSON.push(word);
            });
        });
        const body = JSON.stringify({
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
            'anagram',
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
                                                    spacing={3}
                                                    align="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item xs={10}>
                                                        <Typography variant="subtitle1">
                                                            Pag {index + 1}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
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
                                                            <DeleteIcon />
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
